import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            login(response.data.token);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                alert("Email ou mot de passe incorrect");
            } else {
                alert("Erreur lors de la connexion");
            }
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>Connexion</h2>
                <form onSubmit={handleSubmit}>
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
        </div>           
    );
};
export default Login;