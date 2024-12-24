import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            alert("Connexion réussie !");
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            alert("Erreur lors de la connexion.");
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Connexion</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
                <p>Pas encore inscrit ? <a href="/register">Inscrivez-vous ici</a></p>
            </form>
        </div>           
    );
};

export default Login;