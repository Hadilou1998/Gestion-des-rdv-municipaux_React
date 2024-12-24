import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.role) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const response = await axios.post("api/auth/register", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                role: formData.role,
            });

            if (response.status === 201) {
                setSuccess(true);
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (error) {
            setError("Une erreur est survenue lors de l'inscription.");
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">Inscription</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">Inscription réussie ! Vous allez être redirigé vers la page de connexion.</div>}
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label htmlFor="firstName" className="form-label">Prénom</label>
                    <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="lastName" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Rôle</label>
                    <select className="form-select" id="role" name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">-- Sélectionnez un rôle --</option>
                        <option value="citizen">Citoyen</option>
                        <option value="agent">Agent</option>
                        <option value="admin">Administrateur</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">S'inscrire</button>
                <p>Déjà inscrit? <a href="/login">Connectez-vous ici</a></p>
            </form>
        </div>
    );
};

export default Register;