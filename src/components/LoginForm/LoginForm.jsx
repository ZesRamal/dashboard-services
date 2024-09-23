import style from "./loginForm.module.css";
import { useState } from "react";
import { login } from "../../services/firebase/firebase"

const LoginForm = () => {
    const [loginData, setLoginData] = useState({
        email: 'admin',
        password: 'secret',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loginData.email && loginData.password) {
            await login(loginData.email, loginData.password)
            // window.location.reload();
        } else {
            window.alert("Please fill the name and email fields!")
        }
    }

    return (
        <div style={{ width: "100%" }}>
            <div className={style.box}>
                <div className={style.title}>Login</div>
                <form className={style.form} onSubmit={handleSubmit} id="login">
                    <label htmlFor="email">Email</label>
                    <input className={style.input} type="text" id="email" autoComplete="off" placeholder="Admin@mail.com"
                        onChange={e => setLoginData({
                            ...loginData,
                            email: e.target.value
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