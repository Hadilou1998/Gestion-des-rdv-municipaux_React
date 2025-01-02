import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                const response = await axios.post("http://localhost:5000/api/auth/logout");
                console.log("Déconnexion réussie : ", response.data);
            } catch (error) {
                console.error("Erreur lors de la déconnexion : ", error);
            } finally {
                localStorage.removeItem("user");
                navigate("/login");
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="container">
            <h2 className="my-4">Déconnexion</h2>
            <button className="btn btn-danger">Déconnexion</button>
        </div>
        
    );
}

export default Logout;