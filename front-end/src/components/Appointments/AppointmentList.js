import React, { useEffect, useState } from "react";
import axios from "../../services/api";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointments");
        setAppointments(response.data); // Récupère tous les rendez-vous
        setLoading(false);
      } catch (err) {
        console.error("Détails de l'erreur:", err);
        setError(
          `Une erreur est survenue lors du chargement des rendez-vous: ${
            err.response?.data?.message || err.message
          }`
        );
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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
                  <button
                    className="btn btn-danger"
                    onClick={() => cancelAppointment(appt.id)}
                  >
                    Annuler
                  </button>
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