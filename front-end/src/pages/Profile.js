import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Profile() {
    const { user } = useContext(UserContext);

    if (!user) {
        return <p>Chargement du profil...</p>;
    }

    return (
        <div className="container mt-5">
            <h2>Profil</h2>
            <p><strong>Nom :</strong> {user.lastName}</p>
            <p><strong>Prénom :</strong> {user.firstName}</p>
            <p><strong>Email :</strong> {user.email}</p>
            <p><strong>Rôle :</strong> {user.role}</p>
        </div>
    );
};

export default Profile;