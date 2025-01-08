import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../services/api";

function ServiceDetails() {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        axios.get(`/services/${id}`)
        .then((response) => setService(response.data))
        .catch((error) => console.log("Erreur lors de la récupération du service:", error));
    }, [id]);

    if (!service) return <div>Chargement...</div>;

    return (
        <div className="container mt-4">
            <h2>Détails du service</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{service.name}</h5>
                    <p className="card-text"><strong>Description :</strong> {service.description}</p>
                    <p className="card-text"><strong>Durée :</strong> {service.duration} minutes</p>
                    <Link to="/services" className="btn btn-secondary">Retour à la liste des services</Link>
                    <Link to={`/services/edit/${service.id}`} className="btn btn-warning mx-2">Modifier</Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;