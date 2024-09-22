import style from "./table.module.css"
import { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
    const [profiles, setProfiles] = useState([]);
    const fetchProfiles = async () => {
        const response = await axios.get("http://localhost:3000/obtainProfiles", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        setProfiles(response.data)
    }

    useEffect(() => {
        fetchProfiles()
    }, [])
    return (
        <div style={{ width: "100%" }}>
            {
                profiles.length > 0 ?
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                profiles.map((profile) => (
                                    <tr key={profile.key.replace("profiles:", "")}>
                                        <th scope="row">{profile.key.replace("profiles:", "")}</th>
                                        <td>{profile.data.name}</td>
                                        <td>{profile.data.email}</td>
                                        <td>{profile.data.notes}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    :
                    <center style={{ marginTop: "10%" }}>Loading...</center>
            }
        </div >
    )
}

export default Table