import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token"); // Supprime le token du localStorage
        setUser(null); // Supprime les informations utilisateur
        navigate("/login"); // Redirige vers la page de connexion
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Déconnexion
        </button>
    );
}

export default Logout;
