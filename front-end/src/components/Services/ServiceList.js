import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";

function ServiceList() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get("/services")
        .then((response) => setServices(response.data))
        .catch(error => console.log("Erreur lors de la récupération des services:", error));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Liste des services</h2>
            <Link to="/dashboard" className="btn btn-secondary mb-3">Retour au tableau de bord</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Durée (minutes)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.duration} min</td>
                            <td>
                                <Link to={`/services/${service.id}`} className="btn btn-info btn-sm">Voir</Link>
                                <Link to={`/services/edit/${service.id}`} className="btn btn-warning btn-sm mx-2">Modifier</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceList;