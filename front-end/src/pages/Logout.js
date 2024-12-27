import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Logout() {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
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