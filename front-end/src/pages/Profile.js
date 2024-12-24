import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

function Profile() {
    const { user } = useContext(UserContext);

    return (
        <div className="container">
            <h2 className="my-4">Mon Profil</h2>
            {user ? (
                <div>
                    <p>Email : {user.email}</p>
                    <p>Rôle : {user.role}</p>
                </div>
            ) : (
                <p>Vous devez être connecté pour accéder à votre profil.</p>
            )}
        </div>
    );
};

export default Profile;