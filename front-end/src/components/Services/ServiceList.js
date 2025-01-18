import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function ServiceList() {
    const [services, setServices] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        axios.get("/services")
        .then((response) => setServices(response.data))
        .catch(error => console.log("Erreur lors de la récupération des services:", error));
    }, []);

    const handleDelete = (serviceId) => {
        if (user.role === "admin") {
            axios.delete(`/services/${serviceId}`)
            .then(() => setServices(services.filter((s) => s.id !== serviceId)))
            .catch(error => console.log("Erreur lors de la suppression du service:", error));
        } else {
            console.log("Vous n'avez pas les autorisations nécessaires pour supprimer un service.");
            alert("Vous n'avez pas les autorisations nécessaires pour supprimer un service.");
        }
    };

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
                                {user.role !== "citizen" && (
                                    <Link to={`/services/edit/${service.id}`} className={`btn btn-warning btn-sm mx-2 ${
                                        user.role === "citizen" ? "disabled" : ""
                                    }`}
                                    onClick={(e) => {
                                        if (user.role === "citizen") {
                                            e.preventDefault();
                                            console.log("Vous n'avez pas les autorisations nécessaires pour modifier un service.");
                                            alert("Vous n'avez pas les autorisations nécessaires pour modifier un service.");
                                        }
                                    }}
                                    >Modifier</Link>
                                )}
                                {user.role === "admin" && (
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(service.id)}>Supprimer</button>
                                )}
                                {user.role === "agent" && (
                                    <button className="btn btn-warning btn-sm disabled" title="Les agents ne peuvent pas supprimer les services.">Supprimer</button>
                                )}
                                {user.role === "citizen" && (
                                    <button className="btn btn-warning btn-sm disabled" title="Les citoyens ne peuvent pas modifier ou supprimer les services.">Modifier</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceList;