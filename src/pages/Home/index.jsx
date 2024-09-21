import style from "./home.module.css"

const index = () => {
    return (
        <div className={style.home}>
            <center className={style.title}>Home</center>
            <div className={style.text}>
                <div className={style.flexRow}>
                    <div style={{ width: "40%" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel a quis consectetur eum quisquam iure laborum, et sapiente qui facilis, deleniti sint! Tenetur sapiente omnis vitae atque ab. Incidunt, eligendi!</div>
                    <img src="src\assets\images\firebaseIcon.png"></img>
                </div>
            </div>
            <div className={style.text}>
                <div className={style.flexRow}>
                    <img src="src\assets\images\firebaseIcon.png"></img>
                    <div style={{ width: "40%" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel a quis consectetur eum quisquam iure laborum, et sapiente qui facilis, deleniti sint! Tenetur sapiente omnis vitae atque ab. Incidunt, eligendi!</div>
                </div>
            </div>
        </div>
    )
}

export default index