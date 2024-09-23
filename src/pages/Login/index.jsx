import style from "./login.module.css"
import LoginForm from "../../components/LoginForm/LoginForm"

const index = () => {
    return (
        <div className={style.loginBase}>
            <LoginForm />
        </div>
    )
}

export default index