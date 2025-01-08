import React, { useState } from "react";
import axios from "../../services/api";

function ServiceForm({ onServiceSaved }) {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        duration: "",
        department: "",
        is_active: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/services", formData)
        .then(response => onServiceSaved())
        .catch(error => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom</label>
                <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" name="description" className="form-control" value={formData.description} onChange={handleChange} rows="3"></textarea>
            </div>
            <div className="mb-3">
                <label htmlFor="duration" className="form-label">Durée (en minutes)</label>
                <input type="number" id="duration" name="duration" className="form-control" value={formData.duration} onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="department" className="form-label">Département</label>
                <input type="text" id="department" name="department" className="form-control" value={formData.department} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
    );
};

export default ServiceForm;