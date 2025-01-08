import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("/users")
        .then(response => setUsers(response.data))
        .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Liste des utilisateurs</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.last_name}, {user.first_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/users/${user.id}`} className="btn btn-primary btn-sm me-2">Voir</Link>
                                <Link to={`/users/edit/${user.id}`} className="btn btn-warning btn-sm">Modifier</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;