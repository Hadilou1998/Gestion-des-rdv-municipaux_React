import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const { register } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(firstName, lastName, email, password, role);
        if (response.ok) {
            navigate("/login");
        }
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>Inscription</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">Prénom</label>
                        <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Nom</label>
                        <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Rôle</label>
                        <select className="form-select" id="role" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">-- Sélectionnez un rôle --</option>
                            <option value="admin">Admin</option>
                            <option value="citizen">Citoyen</option>
                            <option value="agent">Agent</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">S'inscrire</button>
                    <p>Déjà inscrit? <a href="/login">Connectez-vous ici</a></p>
                </form>
            </div>
        </div>
    );
};

export default Register;