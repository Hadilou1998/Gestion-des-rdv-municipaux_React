import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  // Fonction pour récupérer le rôle utilisateur en toute sécurité
  const getUserRole = useCallback(() => {
    try {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        return user?.role; // Si pas d'utilisateur dans localStorage, utiliser le contexte
      }

      // Vérifier si c'est un JSON valide
      if (storedUser.startsWith("{") && storedUser.endsWith("}")) {
        const parsedUser = JSON.parse(storedUser);
        return parsedUser?.role || user?.role;
      }

      // Si ce n'est pas un objet JSON valide, avertir et retourner le rôle du contexte
      console.warn("Donnée stockée dans localStorage.user n'est pas un objet JSON.");
      return user?.role;
    } catch (error) {
      console.error("Erreur lors du parsing de l'utilisateur depuis localStorage:", error);
      return user?.role; // Retourne le rôle du contexte en cas d'échec
    }
  }, [user?.role]);

  // Vérifie si l'utilisateur a un rôle spécifique
  const hasRole = useCallback(
    (roles) => {
      const role = getUserRole();
      return roles.includes(role);
    },
    [getUserRole]
  );

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        // Déterminer l'URL API en fonction du rôle utilisateur
        const url = hasRole(["admin", "agent"]) ? "/appointments/all" : "/appointments/my";
        console.log(`Fetching appointments from: ${url}`);

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
  }, [hasRole]);

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