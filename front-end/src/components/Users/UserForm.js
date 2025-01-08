import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../services/api";

function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        role: "",
    });

    useEffect(() => {
        if (id) {
            axios.get(`/users/${id}`)
            .then(response => setFormData(response.data))
            .catch(error => console.error(error));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = id 
        ? axios.put(`/users/${id}`, formData) 
        : axios.post("/users", formData);

        apiCall
        .then(() => navigate("/users"))
        .catch(error => console.error());
    };

    return (
        <div className="container mt-4">
            <h2>{id? "Modifier" : "Créer"} un utilisateur</h2>
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
                    <label htmlFor="role" className="form-label">Rôle</label>
                    <select id="role" name="role" className="form-select" value={formData.role} onChange={handleChange} required>
                        <option value="">Sélectionnez un rôle</option>
                        <option value="admin">Admin</option>
                        <option value="citizen">Citoyen</option>
                        <option value="agent">Agent</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">{id? "Modifier" : "Créer"}</button>
            </form>
        </div>
    );
};

export default UserForm;