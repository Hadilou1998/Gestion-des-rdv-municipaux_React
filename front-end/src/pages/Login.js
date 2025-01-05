import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("http://localhost:5000/api/auth/login", { email, password });
            const { token, user } = response.data; // Extraire le token et le profil utilisateur

            if (token) {
                localStorage.setItem("user", JSON.stringify({ token, user }));
                console.log("Connexion réussie : ", user);
                navigate("/dashboard");
            } else {
                setError("Erreur : Aucun token reçu.");
            }
        } catch (error) {
            console.error("Erreur lors de la connexion : " + (error.response ? error.response.data.message : error.message));
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>Connexion</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de Passe</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                    <a href="/register" className="btn btn-link">Pas encore inscrit? Inscrivez-vous</a>
                </form>
            </div>
        </div>
    );
};

export default Login;