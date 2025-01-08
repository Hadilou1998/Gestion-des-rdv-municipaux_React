import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";

function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`/users/${id}`)
        .then(response => setUser(response.data))
        .catch(error => console.error(error));
    }, [id]);

    if (!user) return <div>Chargement...</div>;

    return (
        <div className="container mt-4">
            <h2>Détails de l'utilisateur</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>Prénom :</strong> {user.first_name}</li>
                <li className="list-group-item"><strong>Nom :</strong> {user.last_name}</li>
                <li className="list-group-item"><strong>Email :</strong> {user.email}</li>
                <li className="list-group-item"><strong>Rôle :</strong> {user.role}</li>
            </ul>
        </div>
    );
};

export default UserDetails;