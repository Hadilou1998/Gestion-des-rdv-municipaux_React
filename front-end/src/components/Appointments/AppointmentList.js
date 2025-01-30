import React, { useState, useEffect, useCallback, useContext } from "react";  
import axios from "../../services/api";  
import { UserContext } from "../../context/UserContext";  

function AppointmentList() {  
    const { user } = useContext(UserContext) || {};  
    const [appointments, setAppointments] = useState([]);  
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);  

    const hasRole = useCallback((roles) => roles.includes(user?.role), [user]);  

    useEffect(() => {  
        if (!user) return;

        const fetchAppointments = async () => {  
            setLoading(true);  
            setError(null);  

            try {  
                const url = hasRole(["admin", "agent"]) ? "/appointments/all" : "/appointments/my";  
                
                console.log("Requête envoyée à:", url);
                
                const response = await axios.get(url);  
                console.log("Réponse de l'API:", response.data);

                if (!Array.isArray(response.data)) {  
                    throw new Error("Format de données invalide reçu de l'API");  
                }  

                setAppointments(response.data);  
            } catch (err) {  
                console.error("Erreur lors de la récupération des rendez-vous:", err);  
                setError(err.response?.data?.message || "Une erreur est survenue.");  
            } finally {  
                setLoading(false);  
            }  
        };  

        fetchAppointments();  
    }, [hasRole, user]);  

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
                                {hasRole(["admin", "agent"]) && <th>Citoyen</th>}  
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
                                        {hasRole(["admin", "agent"]) && (  
                                            <td>{appt.user ? `${appt.user.first_name} ${appt.user.last_name}` : "Utilisateur inconnu"}</td>  
                                        )}  
                                        <td>{appt.service?.name || "Service inconnu"}</td>  
                                        <td>{new Date(appt.appointmentDate).toLocaleString("fr-FR")}</td>  
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