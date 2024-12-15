import React, { useState } from "react";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/auth/login", { email, password });
            alert("Connexion réussie");
            console.log(res.data);           
        } catch (error) {
            console.log(error);
            alert("Erreur lors de la connexion");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Connexion</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Connexion</button>
            </form>
        </div>           
    );
};

export default Login;