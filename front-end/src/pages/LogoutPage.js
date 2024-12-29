import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Logout() {
    const history = useHistory();

    useEffect(() => {
        const logout = () => {
            localStorage.removeItem("authToken");
            alert("Vous avez été déconnecté.");
            history.push("/login");
        };

        logout();
    }, [history]);

    return (
        <div className="container">
            <h2 className="my-4">Déconnexion</h2>
            <button className="btn btn-danger">Déconnexion</button>
        </div>
        
    );
}

export default Logout;