import React, { useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";

function Logout() {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);

    const handleLogout = useCallback(async () => {
        try {
            await api.post("http://localhost:5000/api/auth/logout");
            logout();
            navigate("/login");
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
        }
    }, [logout, navigate]);

    useEffect(() => {
        handleLogout();
    }, [handleLogout]);

    return (
        <div className="container">
            <h2 className="my-4">Déconnexion</h2>
            <button className="btn btn-danger" onClick={handleLogout}>Déconnexion</button>
        </div>
    );
}
export default Logout;