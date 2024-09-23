import style from "./table.module.css"
import { db } from "../../services/firebase/firebase"
import { collection, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";

const Table = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const collectionRef = collection(db, 'profiles');
                const collectionSnapshot = await getDocs(collectionRef);
                const fetchedUsers = collectionSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })).sort((userA, userB) => userB.registerTime.seconds - userA.registerTime.seconds);
                setUsers(fetchedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);
    return (
        <div style={{ width: "100%" }}>
            {
                users.length > 0 ?
                    <table className={style.table}>
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Register Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <th scope="row">{user.name}</th>
                                        <td>{user.email}</td>
                                        <td>{user.notes}</td>
                                        <td>{user.registerTime.toDate().toString()}</td>
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