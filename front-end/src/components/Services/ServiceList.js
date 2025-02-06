import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "../../services/api";
import { UserContext } from "../../context/UserContext";

function ServiceList() {
    const [services, setServices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext) || {};

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            setError(null);

            try {
                // ✅ Vérification et affichage du token avant l'appel API
                console.log("📡 Token JWT utilisé :", axios.defaults.headers.common["Authorization"]);

                const response = await axios.get("/services");
                setServices(response.data);
            } catch (err) {
                console.error("❌ Erreur lors de la récupération des services :", err);

                if (err.response) {
                    // Erreur côté serveur (API)
                    if (err.response.status === 401) {
                        setError("Accès non autorisé. Veuillez vous reconnecter.");
                    } else if (err.response.status === 403) {
                        setError("Vous n'avez pas les permissions nécessaires pour voir les services.");
                    } else {
                        setError("Impossible de charger les services. Veuillez réessayer plus tard.");
                    }
                } else {
                    // Erreur réseau
                    setError("Erreur réseau. Vérifiez votre connexion.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleDelete = async (serviceId) => {
        if (user?.role === "admin" && window.confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) {
            try {
                await axios.delete(`/services/${serviceId}`);
                setServices(services.filter((s) => s.id !== serviceId));
            } catch (err) {
                console.error("❌ Erreur lors de la suppression du service :", err);
                setError("Échec de la suppression du service. Veuillez réessayer.");
            }
        }
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

    const renderActionButtons = (service) => {
        if (user?.role === "admin") {
            return (
                <div className="d-flex gap-2">
                    <Link to={`/services/${service.id}`} className="btn btn-info btn-sm">
                        Voir
                    </Link>
                    <Link to={`/services/edit/${service.id}`} className="btn btn-warning btn-sm">
                        Modifier
                    </Link>
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(service.id)}
                    >
                        Supprimer
                    </button>
                </div>
            );
        } else if (user?.role === "agent") {
            return (
                <div className="d-flex gap-2">
                    <Link to={`/services/${service.id}`} className="btn btn-info btn-sm">
                        Voir
                    </Link>
                    <Link to={`/services/edit/${service.id}`} className="btn btn-warning btn-sm">
                        Modifier
                    </Link>
                </div>
            );
        } else {
            return (
                <Link to={`/services/${service.id}`} className="btn btn-info btn-sm">
                    Voir
                </Link>
            );
        }
    };

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
                            <td>{renderActionButtons(service)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceList;