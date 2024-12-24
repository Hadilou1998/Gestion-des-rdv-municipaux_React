import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Supprime le token du localStorage
        setUser(null); // Supprime les informations utilisateur
        alert("Vous êtes déconnecté"); // Affiche un message de déconnexion
        navigate("/login"); // Redirige vers la page de connexion
    };

    return (
        <div className="container">
            <h2 className="my-4">Déconnexion</h2>
            <button className="btn btn-danger" onClick={handleLogout}>
                Déconnexion
            </button>
        </div>
        
    );
}

export default Logout;