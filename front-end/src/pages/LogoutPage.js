import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const logout = () => {
            localStorage.removeItem("authToken");
            alert("Vous avez été déconnecté.");
            navigate("/login");
        };

        logout();
    }, [navigate]);

    return (
        <div className="container">
            <h2 className="my-4">Déconnexion</h2>
            <button className="btn btn-danger">Déconnexion</button>
        </div>
        
    );
}

export default Logout;