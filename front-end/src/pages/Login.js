import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (credentials) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
            const { token, user } = response.data; // Extraire le token et le profil utilisateur
            localStorage.setItem("user", JSON.stringify({ token, ...user })); // Enregistrer le token utilisateur dans le local storage
            navigate("/dashboard");
        } catch (error) {
            console.error("Erreur lors de la connexion : ", error);
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de Passe</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Se connecter</button>
                    <a href="/register" className="btn btn-link">Pas encore inscrit? Inscrivez-vous</a>
                </form>
            </div>
        </div>
    );
};

export default Login;