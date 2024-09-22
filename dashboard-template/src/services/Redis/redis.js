import { createClient } from 'redis';

export default async function startConnection(){
    const client = createClient({
        password: import.meta.env.VITE_REDIS_PASSWORD,
        socket: {
            host: 'redis-13347.c60.us-west-1-2.ec2.redns.redis-cloud.com',
            port: 13347
        }
    });
    
    client.on('error', (err) => console.log('Redis Client Error', err));
    
    await client.connect();
}