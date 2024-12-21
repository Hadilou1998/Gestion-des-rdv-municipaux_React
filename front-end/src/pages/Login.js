import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                navigate("/dashboard");
            } else if (response.status === 401) {
                alert("Identifiants incorrects");
            } else {
                const errorMessage = await response.text();
                alert("Erreur lors de la connexion : " + errorMessage);
            }
        } catch (error) {
            console.error("Erreur réseau ou autre :", error);
            alert("Impossible de se connecter pour le moment. Veuillez réessayer plus tard.");
        }
    };    
    
    const handleLogout = async () => {
        setUser(null);
        navigate("/login");
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                {user ? (
                    <div>
                        <h2>Bienvenue, {user.firstName} {user.lastName} !</h2>
                        <button className="btn btn-secondary" onClick={handleLogout}>Se déconnecter</button>
                    </div>
                ) : (
                    <div>
                        <h2>Connexion</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Mot de passe</label>
                                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Se connecter</button>
                            <p>Pas encore inscrit ? <a href="/register">Inscrivez-vous ici</a></p>
                        </form>
                    </div>
                )}
            </div>
        </div>           
    );
};

export default Login;