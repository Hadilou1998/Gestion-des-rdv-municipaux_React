import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function ServiceList() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // État pour le chargement
    const { user } = useContext(UserContext) || {};
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("/services");
                setServices(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des services :", err);
                setError("Impossible de charger les services. Veuillez réessayer plus tard.");
            } finally {
                setLoading(false); // Fin du chargement
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (serviceId) => {
        if (user?.role === "admin") {
            try {
                await axios.delete(`/services/${serviceId}`);
                setServices(services.filter((s) => s.id !== serviceId));
            } catch (err) {
                console.error("Erreur lors de la suppression du service :", err);
                setError("Échec de la suppression du service. Veuillez réessayer.");
            }
        } else {
            alert("Vous n'avez pas les autorisations nécessaires pour supprimer un service.");
        }
    };

    const handleUnauthorizedAccess = () => {
        navigate("/unauthorized");
    };

    if (loading) {
        return <div className="container mt-4">Chargement des services...</div>;
    }

    if (error) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">
                    <h4>Erreur</h4>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2>Liste des services</h2>
            <Link to="/dashboard" className="btn btn-secondary mb-3">
                Retour au tableau de bord
            </Link>
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
                                {/* Lien Voir - Accessible à tous */}
                                <Link to={`/services/${service.id}`} className="btn btn-info btn-sm">
                                    Voir
                                </Link>

                                {/* Lien Modifier - Accessible aux agents et admin */}
                                {(user?.role === "agent" || user?.role === "admin") && (
                                    <Link
                                        to={`/services/edit/${service.id}`}
                                        className="btn btn-warning btn-sm mx-2"
                                    >
                                        Modifier
                                    </Link>
                                )}

                                {/* Lien Supprimer - Accessible uniquement à l'admin */}
                                {user?.role === "admin" && (
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(service.id)}
                                    >
                                        Supprimer
                                    </button>
                                )}

                                {/* Citoyen tente d'accéder à une action non autorisée */}
                                {user?.role === "citizen" && (
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={handleUnauthorizedAccess}
                                    >
                                        Accès refusé
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceList;