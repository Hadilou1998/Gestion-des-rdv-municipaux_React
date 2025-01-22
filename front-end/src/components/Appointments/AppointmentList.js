import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  const hasRole = useCallback((roles) => {
    return roles.includes(user?.role);
  }, [user?.role]);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        let response;
        if (hasRole(["admin", "agent"])) {
          response = await axios.get("/appointments/all");
        } else {
          response = await axios.get("/appointments/my");
        }
        setAppointments(response.data);
      } catch (err) {
        console.error("Détails de l'erreur:", err);
        setError(
          `Une erreur est survenue lors du chargement des rendez-vous: ${
            err.response?.data?.message || err.message
          }`
        );
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
      setAppointments(appointments.filter((appt) => appt.id !== appointmentId));
    } catch (err) {
      console.error("Erreur lors de l'annulation:", err);
      setError(
        `Une erreur est survenue lors de l'annulation du rendez-vous: ${
          err.response?.data?.message || err.message
        }`
      );
    }
  };

  const editAppointment = (appointmentId) => {
    navigate(`/appointments/edit/${appointmentId}`);
  };

  if (loading) {
    return <div className="text-center mt-4">Chargement des rendez-vous...</div>;
  }

  if (error) {
    return (
      <div className="container mt-4">
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
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString("fr-FR");
    } catch {
      return "Date invalide";
    }
  };

  return (
    <div className="container mt-4">
      <h2>Liste des rendez-vous</h2>
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
                      : "Erreur : Utilisateur introuvable"}
                  </td>
                )}
                <td>{appt.service?.name || "Service inconnu"}</td>
                <td>{formatDate(appt.appointmentDate)}</td>
                <td>{appt.status}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => cancelAppointment(appt.id)}
                    >
                      Annuler
                    </button>
                    {hasRole(["admin", "agent"]) && (
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
                className="text-center"
              >
                Aucun rendez-vous trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;