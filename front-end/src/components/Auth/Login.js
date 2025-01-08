import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("/auth/login", formData)
        .then(response => {
            localStorage.setItem("user", response.data.token);
            navigate("/dashboard");
        })
        .catch(error => setError("Informations d'identification non valides."));
    };

    return (
        <div className="container mt-4">
            <h2>Connexion</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Se connecter</button>
                <p className="mt-3">Pas encore de compte? <a href="/register">Inscrivez-vous</a></p>
            </form>
        </div>
    );
};

export default Login;