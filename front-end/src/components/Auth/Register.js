import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";

function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/auth/register", formData)
       .then(() => navigate("/login"))
       .catch(error => setError("Une erreur est survenue lors de l'inscription."));
    };

    return (
        <div className="container mt-4">
            <h2>Inscription</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">Prénom</label>
                    <input type="text" id="first_name" name="first_name" className="form-control" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Nom</label>
                    <input type="text" id="last_name" name="last_name" className="form-control" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" id="password" name="password" className="form-control" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Rôle</label>
                    <select id="role" name="role" className="form-control" value={formData.role} onChange={handleChange} required>
                        <option value="">-- Sélectionner un rôle --</option>
                        <option value="admin">Administrateur</option>
                        <option value="citizen">Citoyen</option>
                        <option value="agent">Agent</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">S'inscrire</button>
                <p className="mt-3">Déjà inscrit? <a href="/login">Connectez-vous</a></p>
            </form>
        </div>
    );
};

export default Register;