import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function ServiceForm({ onServiceSaved }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        duration: "",
        department: "",
        is_active: true,
    });
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Vérifier si l'utilisateur est autorisé à créer un service
        if (user.role === "citizen") {
            console.log("Vous n'avez pas les autorisations nécessaires pour créer un service.");
            alert("Vous n'avez pas les autorisations nécessaires pour créer un service.");
            navigate("/unauthorized");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/services", formData)
        .then((response) => {
            onServiceSaved();
            alert("Service créé avec succès!");
        })        
        .catch(error => console.error("Erreur lors de la création du service:", error));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange} rows="3" required></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Durée (en minutes)</label>
                <input type="number" id="duration" name="duration" className="form-control" value={formData.duration} onChange={handleChange} required/>
            </div>
            <div className="mb-3">
                <label htmlFor="department" className="form-label">Département</label>
                <input type="text" id="department" name="department" className="form-control" value={formData.department} onChange={handleChange} required/>
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default ServiceForm;