import React, { useEffect, useState, useContext } from "react";
import axios from "../../services/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let response;
        // Si l'utilisateur est admin ou agent, récupère tous les rendez-vous
        if (user?.role === "admin" || user?.role === "agent") {
          response = await axios.get("/appointments/all"); // Endpoint pour tous les rendez-vous
        } else {
          // Sinon, récupère uniquement les rendez-vous de l'utilisateur connecté
          response = await axios.get("/appointments/my"); // Endpoint pour les rendez-vous de l'utilisateur
        }
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Détails de l'erreur:", error);
        setError(
          `Une erreur est survenue lors du chargement des rendez-vous: ${
            error.response?.data?.message || error.message
          }`
        );
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const cancelAppointment = async (appointmentId) => {
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

  return (
    <div className="container mt-4">
      <h2>Liste des rendez-vous</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Citoyen</th>
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
                <td>
                  {appt.user
                    ? `${appt.user.first_name} ${appt.user.last_name}`
                    : "Erreur : Utilisateur introuvable"}
                </td>
                <td>{appt.service?.name || "Service inconnu"}</td>
                <td>{new Date(appt.appointmentDate).toLocaleString("fr-FR")}</td>
                <td>{appt.status}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => cancelAppointment(appt.id)}
                    >
                      Annuler
                    </button>
                    {(user?.role === "agent" || user?.role === "admin") && (
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
              <td colSpan="6" className="text-center">
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