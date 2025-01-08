import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../services/api";

function ServiceEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState({
        name: "",
        description: "",
        duration: ""
    });

    useEffect(() => {
        axios.get(`/services/${id}`)
        .then((response) => setService(response.data))
        .catch((error) => console.log("Erreur lors de la récupération du service:", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setService({ ...service, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/services/${id}`, service)
        .then(() => navigate("/services"))
        .catch((error) => console.log("Erreur lors de la mise à jour du service:", error));
    };

    return (
        <div className="container mt-4">
            <h2>Modifier le service</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name">Nom</label>
                    <input type="text" className="form-control" name="name" value={service.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" name="description" value={service.description} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="duration">Durée (minutes)</label>
                    <input type="number" className="form-control" name="duration" value={service.duration} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer</button>
                <button type="button" onClick={() => navigate("/services")} className="btn btn-secondary mx-2">Annuler</button>
            </form>
        </div>
    );
};

export default ServiceEdit;