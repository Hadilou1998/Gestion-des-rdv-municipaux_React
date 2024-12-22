import React, { useState, useEffect } from "react";
import api from "../services/api";
import { authHeader } from "../utils/auth";

function ServiceList() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Utilisation de authHeader pour ajouter le token aux en-têtes de la requête
        api.get('http://localhost:5000/api/services', { headers: authHeader() })
        .then(response => {
            setServices(response.data);
        })
        .catch(err => {
            if (err.response) {
                setError(`Erreur: ${err.response.status} - ${err.response.data.message || err.response.statusText}`);
            } else if (err.request) {
                setError("Erreur: Aucune réponse du serveur");
            } else {
                setError(`Erreur: ${err.message}`);
            }
        });
    }, []);

    if (error) {
        return (
            <div className="alert alert-danger">
                <strong>Erreur :</strong> {error}
            </div>
        );
    };

    return (
        <div>
            <h2>Services disponibles</h2>
            <ul className="list-group">
                {services.map((service) => (
                    <li key={service.id} className="list-group-item">
                        <strong>{service.name}</strong>
                        <br />
                        {service.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;