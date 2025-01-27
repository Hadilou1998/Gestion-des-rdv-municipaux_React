import React, { useState, useEffect, useCallback, useContext } from "react";  
import axios from "../../services/api";  
import { useNavigate } from "react-router-dom";  
import { UserContext } from "../../context/UserContext";  

function AppointmentList() {  
    const { user } = useContext(UserContext) || {};  // Valeur par défaut si `user` est null
    const [appointments, setAppointments] = useState([]);  
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState(null);  
    const navigate = useNavigate();  

    const hasRole = useCallback(  
        (roles) => {  
            return roles.includes(user?.role); // Vérification du rôle  
        },  
        [user]  
    );  

    useEffect(() => {  
        if (!user) {  // Vérifiez si `user` est défini avant de continuer
            return;
        }

        const fetchAppointments = async () => {  
            setLoading(true);  
            setError(null);  

            try {  
                const url = hasRole(["admin", "agent"]) ? "/appointments/all" : "/appointments/my";  
                const response = await axios.get(url);  

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

    const cancelAppointment = async (appointmentId) => {  
        if (!window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {  
            return;  
        }  
        try {  
            await axios.delete(`/appointments/${appointmentId}`);  
            setAppointments((prev) =>  
                prev.map((appt) =>  
                    appt.id === appointmentId ? { ...appt, status: "CANCELLED" } : appt  
                )  
            );  
        } catch (err) {  
            console.error("Erreur lors de l'annulation du rendez-vous:", err);  
            setError(err.response?.data?.message || "Impossible d'annuler le rendez-vous.");  
        }  
    };  

    const editAppointment = (appointmentId) => {  
        navigate(`/appointments/edit/${appointmentId}`);  
    };  

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
            <div className="d-flex justify-content-between align-items-center mb-4">  
                <h2>Liste des rendez-vous</h2>  
                <button  
                    className="btn btn-primary"  
                    onClick={() => navigate('/appointments/new')}  
                >  
                    Nouveau rendez-vous  
                </button>  
            </div>  

            {error ? (  
                <div className="alert alert-danger">  
                    <h4>Erreur</h4>  
                    <p>{error}</p>  
                    <button  
                        className="btn btn-primary mt-2"  
                        onClick={() => window.location.reload()}  
                    >  
                        Réessayer  
                    </button>  
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
                                <th>Actions</th>  
                            </tr>  
                        </thead>  
                        <tbody>  
                            {appointments.length > 0 ? (  
                                appointments.map((appt) => (  
                                    <tr key={appt.id}>  
                                        <td>{appt.id}</td>  
                                        {hasRole(["admin", "agent"]) && (  
                                            <td>  
                                                {appt.user  
                                                    ? `${appt.user.first_name} ${appt.user.last_name}`  
                                                    : "Utilisateur inconnu"}  
                                            </td>  
                                        )}  
                                        <td>{appt.service?.name || "Service inconnu"}</td>  
                                        <td>{formatDate(appt.appointmentDate)}</td>  
                                        <td>{appt.status}</td>  
                                        <td>  
                                            <div className="d-flex gap-2">  
                                                {appt.status !== "CANCELLED" && (  
                                                    <button  
                                                        className="btn btn-danger"  
                                                        onClick={() => cancelAppointment(appt.id)}  
                                                    >  
                                                        Annuler  
                                                    </button>  
                                                )}  
                                                {hasRole(["admin", "agent"]) && appt.status !== "CANCELLED" && (  
                                                    <button  
                                                        className="btn btn-primary"  
                                                        onClick={() => editAppointment(appt.id)}  
                                                    >  
                                                        Modifier  
                                                    </button>  
                                                )}  
                                            </div>  
                                        </td>  
                                    </tr>  
                                ))  
                            ) : (  
                                <tr>  
                                    <td  
                                        colSpan={hasRole(["admin", "agent"]) ? 6 : 5}  
                                        className="text-center text-muted"  
                                    >  
                                        Aucun rendez-vous trouvé pour le moment.  
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