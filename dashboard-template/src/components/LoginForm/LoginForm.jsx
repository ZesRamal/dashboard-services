import style from "./loginForm.module.css";
import { useState } from "react";
import axios from "axios";

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        username: 'admin',
        password: 'secret',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loginData.username && loginData.password) {
            await checkLogin()
            document.getElementById("login").reset();
            setLoginData({
                username: '',
                password: '',
            })
        } else {
            window.alert("Please fill the username and password fields!")
        }


    }

    async function checkLogin() {
        try {
            const response = await axios.post("http://localhost:3000/checkLogin", {
                username: loginData.username,
                password: loginData.password,
            });
            const data = await response.data;
            localStorage.setItem('token', data.token);
            console.log('Login successful');
            window.location.reload()
        } catch (error) {
            console.error('Registration error:', error);
            window.alert("Incorrect username or password")
        }
    }
    return (
        <div style={{ width: "100%" }}>
            <div className={style.box}>
                <div className={style.title}>Login</div>
                <form className={style.form} onSubmit={handleSubmit} id="login">
                    <label htmlFor="username">Username</label>
                    <input className={style.input} type="text" id="username" autoComplete="off" placeholder="Admin"
                        onChange={e => setLoginData({
                            ...loginData,
                            username: e.target.value
                        })} />
                    <label htmlFor="password">Password</label>
                    <input className={style.input} type="password" id="password" autoComplete="off" placeholder="Secret"
                        onChange={e => setLoginData({
                            ...loginData,
                            password: e.target.value
                        })} />
                    <input className={style.formButton} type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

export default LoginForm