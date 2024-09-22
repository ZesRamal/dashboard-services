import express from "express"
import cors from "cors"
import { createClient } from 'redis';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = 3000
const corsOptions = {
    origin: "http://localhost:5173"
}
const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: 13347
    }
});

client.on('error', err => console.log('Redis Client Error', err));
await client.connect();

// Crea usuario de ejemplo en la base de datos
if (await client.exists("users:admin") == false) {
  await client.set("users:admin", "secret");
}

app.use(cors(corsOptions));
app.use(express.json())
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function connect() {
    if (!client.isReady) {
        await client.connect();
    }
} 

app.post('/registerProfile',authenticateToken, async (req, res) => {
    try {
        await connect();
        const { name, email, notes} = req.body;
        const profileData = {
          name,
          email,
          notes,
        };
        let id = generateID();
        do {
            id = generateID();
            try {
              const exists = await client.exists("profiles:" + id);
              if (!exists) {
                break;
              }
            } catch (err) {
              console.error('Error checking ID existence:', err);
            }
          } while (true);
        await client.json.set("profiles:" + id, "$", profileData);
        res.json({ message: 'Registration successful!' });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal Server Error'   
     });
    }
});

app.post('/checkLogin', async (req, res) => {
  try {
      await connect();
      const { username, password} = req.body;
      if (await client.exists("users:" + username) == false){
        return res.status(401).json({message: "User not found"})
      }
      const isPasswordMatch = await client.get("users:" + username) == password;
      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }
      if (isPasswordMatch) {
        const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ message: 'Logged In', token });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal Server Error'});
  }
});

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
  });
}

function generateID() {
  const date = new Date();
  const seed = date.getTime();
  Math.random.seed = seed;
  const randomNumber = Math.random();
  const scaledRandomNumber = Math.round(randomNumber * 100000000);
  return scaledRandomNumber;
}

app.get('/obtainProfiles', authenticateToken, async (req, res) => {
  await connect()
  const keys = await client.keys('profiles:*');

  const profiles = await Promise.all(keys.map(async (key) => {
    const data = await client.json.get(key);
    return {key, data};
  }));

  res.json(profiles);
})