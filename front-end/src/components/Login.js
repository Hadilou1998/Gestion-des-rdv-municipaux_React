import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Envoyer la requête de connexion
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
    
            console.log("Utilisateur connecté avec succès:", response.data.user);
    
            if (response.status === 200) { // Vérifie si le statut est "200 OK"
                setUser(response.data.user); // Utilise directement les données déjà parsées
                navigate("/dashboard");
            } else if (response.status === 401) { // Mauvais identifiants
                alert("Identifiants incorrects");
            } else { // Autres erreurs
                alert("Erreur lors de la connexion : " + response.data.message || "Erreur inconnue");
            }
        } catch (error) {
            // Gestion des erreurs réseau ou autres
            console.error("Erreur réseau ou autre :", error);
            if (error.response) {
                // Le serveur a répondu avec un statut différent de 2xx
                alert("Erreur serveur : " + error.response.data.message || "Erreur inconnue");
            } else if (error.request) {
                // La requête a été envoyée mais aucune réponse reçue
                alert("Aucune réponse du serveur. Veuillez réessayer plus tard.");
            } else {
                // Une erreur s'est produite lors de la configuration de la requête
                alert("Une erreur s'est produite : " + error.message);
            }
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