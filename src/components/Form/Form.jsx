import style from "./form.module.css"
import { useState } from "react";
import { db } from "../../services/firebase/firebase"
import { setDoc, collection, doc, Timestamp } from "firebase/firestore";

const Form = () => {
    const docRef = doc(collection(db, 'profiles'));

    const [profile, setProfile] = useState({
        name: '',
        email: '',
        notes: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (profile.name && profile.email) {
            await setDoc(docRef, { ...profile, registerTime: Timestamp.now() });
            document.getElementById("register").reset();
            setProfile({
                name: '',
                email: '',
                notes: '',
                registerTime: ''
            })
        } else {
            window.alert("Please fill the name and email fields!")
        }
    }


    return (
        <div style={{ width: "100%", paddingTop: "5%" }}>
            <div className={style.box}>
                <form className={style.form} onSubmit={handleSubmit} id="register">
                    <label htmlFor="name">Name</label>
                    <input className={style.input} type="text" id="name" autoComplete="off" placeholder="John Smith"
                        onChange={e => setProfile({
                            ...profile,
                            name: e.target.value
                        })} />
                    <label htmlFor="email">Email</label>
                    <input className={style.input} type="email" id="email" autoComplete="off" placeholder="john@mail.com"
                        onChange={e => setProfile({
                            ...profile,
                            email: e.target.value
                        })} />
                    <label htmlFor="note">Notes</label>
                    <textarea className={`${style.input} ${style.textArea}`} type="text" id="password" autoComplete="off" rows={5} placeholder="Additional notes"
                        onChange={e => setProfile({
                            ...profile,
                            notes: e.target.value
                        })} />
                    <input className={style.formButton} type="submit" value="Register" />
                </form>
            </div>
        </div>
    )
}

export default Form