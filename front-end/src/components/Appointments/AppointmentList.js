import React, { useState, useEffect, useContext } from "react";  
import axios from "../../services/api";  
import { UserContext } from "../../context/UserContext";  

function AppointmentList() {  
    const { user } = useContext(UserContext) || {};  
    const [appointments, setAppointments] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  

    useEffect(() => {  
        if (!user) return;  

        const fetchAppointments = async () => {  
            try {  
                // Tous les utilisateurs connectés peuvent voir leurs rendez-vous
                // Les admin et agents voient tous les rendez-vous
                const response = await axios.get("/appointments");  

                console.log("Données reçues :", response.data);

                if (!Array.isArray(response.data)) {  
                    throw new Error("Format de données invalide reçu de l'API");  
                }  

                setAppointments(response.data);  
            } catch (err) {  
                console.error("Erreur de récupération des rendez-vous :", err);  
                setError(err.response?.data?.message || "Une erreur est survenue.");  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchAppointments();  
    }, [user]);  

    const formatDate = (dateString) => {  
        try {  
            return new Date(dateString).toLocaleString("fr-FR", {  
                year: "numeric",  
                month: "long",  
                day: "numeric",  
                hour: "2-digit",  
                minute: "2-digit",  
            });  
        } catch {  
            return "Date invalide";  
        }  
    };  

    if (loading) {  
        return <div className="text-center mt-4">Chargement des rendez-vous...</div>;  
    }  

    return (  
        <div className="container mt-4">  
            <h2>Liste des rendez-vous</h2>  

            {error ? (  
                <div className="alert alert-danger">  
                    <h4>Erreur</h4>  
                    <p>{error}</p>  
                </div>  
            ) : (  
                <div className="table-responsive">  
                    <table className="table table-striped">  
                        <thead>  
                            <tr>  
                                <th>#</th>  
                                <th>Citoyen</th>  
                                <th>Service</th>  
                                <th>Date</th>  
                                <th>Status</th>  
                            </tr>  
                        </thead>  
                        <tbody>  
                            {appointments.length > 0 ? (  
                                appointments.map((appt) => (  
                                    <tr key={appt.id}>  
                                        <td>{appt.id}</td>  
                                        <td>{appt.user ? `${appt.user.first_name} ${appt.user.last_name}` : "Utilisateur inconnu"}</td>  
                                        <td>{appt.service?.name || "Service inconnu"}</td>  
                                        <td>{formatDate(appt.appointmentDate)}</td>  
                                        <td>{appt.status}</td>  
                                    </tr>  
                                ))  
                            ) : (  
                                <tr>  
                                    <td colSpan={5} className="text-center text-muted">  
                                        Aucun rendez-vous trouvé.  
                                    </td>  
                                </tr>  
                            )}  
                        </tbody>  
                    </table>  
                </div>  
            )}  
        </div>  
    );  
}

export default AppointmentList;