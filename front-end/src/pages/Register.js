import React, { useState } from "react";
import axios from "axios";


function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/register", formData);
            console.log("Inscription réussie : ", response.data);
        } catch (error) {
            console.error("Erreur lors de l'inscription : ", error.response.data);
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Prénom</label>
                        <input type="text" className="form-control" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Nom</label>
                        <input type="text" className="form-control" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mot de Passe</label>
                        <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Rôle</label>
                        <select className="form-select" name="role" value={formData.role} onChange={handleChange} required>
                            <option value="">Sélectionnez un rôle</option>
                            <option value="admin">Administrateur</option>
                            <option value="citizen">Utilisateur</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">S'inscrire</button>
                    <a href="/login" className="btn btn-link">Déjà inscrit? Connectez-vous</a>
                </form>
            </div>
        </div>
    );
};

export default Register;