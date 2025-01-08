import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    
    useEffect(() => {
        localStorage.removeItem("user");
        navigate("/login");
    }, [navigate]);

    return <div>Déconnexion en cours...</div>;
};

export default Logout;