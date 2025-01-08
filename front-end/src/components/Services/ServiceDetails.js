import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../services/api";

function ServiceDetails() {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        axios.get(`/services/${id}`)
        .then(response => setService(response.data))
        .catch(error => console.error(error));
    }, [id]);

    if (!service) return <div>Chargement...</div>;

    return (
        <div className="container mt-4">
            <h2>Détails du service</h2>
            <ul className="list-group">
                <li className="list-group-item"><strong>ID :</strong> {service.id}</li>
                <li className="list-group-item"><strong>Nom :</strong> {service.name}</li>
                <li className="list-group-item"><strong>Description :</strong> {service.description}</li>
                <li className="list-group-item"><strong>Durée (en minutes) :</strong> {service.duration}</li>
                <li className="list-group-item"><strong>Département :</strong> {service.department}</li>
                <li className="list-group-item"><strong>Statut :</strong> {service.is_active ? "Actif" : "Inactif"}</li>
            </ul>
        </div>
    );
};

export default ServiceDetails;