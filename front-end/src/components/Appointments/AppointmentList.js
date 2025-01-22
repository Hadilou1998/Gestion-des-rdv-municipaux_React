import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user, loading: userLoading } = useContext(UserContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoading) {
      console.log("Chargement du contexte utilisateur en cours...");
      return;
    }

    if (!user) {
      console.log("Utilisateur non authentifié, redirection vers la page de connexion");
      navigate('/login', { 
        state: { from: window.location.pathname },
        replace: true 
      });
      return;
    }

    console.log("Contexte utilisateur chargé:", {
      id: user.id,
      role: user.role,
      isAuthenticated: true
    });
  }, [user, userLoading, navigate]);

  const hasRole = useCallback((roles) => {
    if (!user?.role) {
      console.warn("Avertissement: Rôle utilisateur non défini");
      return false;
    }
    const hasAccess = roles.includes(user.role);
    console.log(`Vérification des rôles - Attendus: ${roles.join(", ")}, Actuel: ${user.role}, Accès autorisé: ${hasAccess}`);
    return hasAccess;
  }, [user?.role]);

  useEffect(() => {
    const fetchAppointments = async () => {
      // Si le contexte utilisateur est en cours de chargement, on ne fait rien
      if (userLoading) return;
      
      // Si pas d'utilisateur authentifié, on ne fait rien
      if (!user) return;

      setLoading(true);
      setError(null);

      try {
        console.log("Début de la récupération des rendez-vous");
        const url = hasRole(["admin", "agent"]) ? "/appointments/all" : "/appointments/my";
        console.log(`URL de l'API utilisée: ${url}`);

        const response = await axios.get(url);
        console.log("Données reçues de l'API:", response.data);

        if (!Array.isArray(response.data)) {
          throw new Error("Format de données invalide reçu de l'API");
        }

        setAppointments(response.data);
        console.log(`${response.data.length} rendez-vous chargés avec succès`);
      } catch (err) {
        console.error("Erreur détaillée:", {
          message: err.message,
          response: err.response,
          status: err.response?.status
        });

        let errorMessage = "Une erreur est survenue lors du chargement des rendez-vous";
        
        if (err.response?.status === 401) {
          console.log("Session expirée, redirection vers la page de connexion");
          navigate('/login', { 
            state: { from: window.location.pathname },
            replace: true 
          });
          return;
        } else if (err.response?.status === 403) {
          errorMessage = "Vous n'avez pas les permissions nécessaires pour accéder à ces données.";
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, userLoading, hasRole, navigate]);

  const cancelAppointment = async (appointmentId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
      return;
    }

    try {
      console.log(`Tentative d'annulation du rendez-vous ${appointmentId}`);
      await axios.delete(`/appointments/${appointmentId}`);
      console.log(`Rendez-vous ${appointmentId} annulé avec succès`);
      
      setAppointments(prevAppointments => 
        prevAppointments.map(appt => 
          appt.id === appointmentId 
            ? { ...appt, status: 'CANCELLED' }
            : appt
        )
      );
    } catch (err) {
      console.error("Erreur lors de l'annulation:", err);
      
      let errorMessage = "Une erreur est survenue lors de l'annulation du rendez-vous";
      
      if (err.response?.status === 404) {
        errorMessage = "Ce rendez-vous n'existe plus ou a déjà été annulé.";
      } else if (err.response?.status === 401) {
        navigate('/login', { 
          state: { from: window.location.pathname },
          replace: true 
        });
        return;
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
    }
  };

  const editAppointment = (appointmentId) => {
    console.log(`Redirection vers l'édition du rendez-vous ${appointmentId}`);
    navigate(`/appointments/edit/${appointmentId}`);
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("fr-FR", {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (err) {
      console.error("Erreur de formatage de date:", dateString, err);
      return "Date invalide";
    }
  };

  const getStatusLabel = (status) => {
    const statusMap = {
      PENDING: "En attente",
      CONFIRMED: "Confirmé",
      CANCELLED: "Annulé",
      COMPLETED: "Terminé"
    };
    return statusMap[status] || status;
  };

  const getStatusClass = (status) => {
    const statusClasses = {
      PENDING: "text-warning",
      CONFIRMED: "text-success",
      CANCELLED: "text-danger",
      COMPLETED: "text-info"
    };
    return `fw-bold ${statusClasses[status] || ""}`;
  };

  if (userLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 mt-4">
        <div className="spinner-border text-primary me-2" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <span>Chargement de votre profil...</span>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 mt-4">
        <div className="spinner-border text-primary me-2" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <span>Chargement des rendez-vous...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4 className="alert-heading">Erreur</h4>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-outline-danger"
              onClick={() => window.location.reload()}
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
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

      {appointments.length === 0 ? (
        <div className="alert alert-info">
          <h4 className="alert-heading">Aucun rendez-vous</h4>
          <p>
            Vous n'avez aucun rendez-vous pour le moment. 
            Vous pouvez créer un nouveau rendez-vous en cliquant sur le bouton "Nouveau rendez-vous".
          </p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-light">
              <tr>
                <th scope="col">#</th>
                {hasRole(["admin", "agent"]) && <th scope="col">Citoyen</th>}
                <th scope="col">Service</th>
                <th scope="col">Date</th>
                <th scope="col">Statut</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.id}</td>
                  {hasRole(["admin", "agent"]) && (
                    <td>
                      {appt.user ? (
                        `${appt.user.first_name} ${appt.user.last_name}`
                      ) : (
                        <span className="text-danger">Utilisateur introuvable</span>
                      )}
                    </td>
                  )}
                  <td>{appt.service?.name || "Service inconnu"}</td>
                  <td>{formatDate(appt.appointmentDate)}</td>
                  <td>
                    <span className={getStatusClass(appt.status)}>
                      {getStatusLabel(appt.status)}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      {appt.status !== "CANCELLED" && appt.status !== "COMPLETED" && (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => cancelAppointment(appt.id)}
                        >
                          Annuler
                        </button>
                      )}
                      {hasRole(["admin", "agent"]) && 
                       appt.status !== "CANCELLED" && 
                       appt.status !== "COMPLETED" && (
                        <button
                          className="btn btn-sm btn-primary ms-1"
                          onClick={() => editAppointment(appt.id)}
                        >
                          Modifier
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AppointmentList;