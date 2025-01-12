import React, { useEffect, useState } from "react";
import axios from "../../services/api"; // Assurez-vous que ce chemin est correct

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointments");
        const appointmentsWithUser = await Promise.all(
          response.data.map(async (appt) => {
            if (appt.userId) {
              try {
                const userResponse = await axios.get(`/users/${appt.userId}`);
                return { ...appt, user: userResponse.data };
              } catch (userErr) {
                console.error(`Erreur lors de la récupération de l'utilisateur ${appt.userId}:`, userErr);
                return { ...appt, user: {} }; // Utilisateur vide
              }
            } else {
              return { ...appt, user: {} }; // Utilisateur vide
            }
          })
        );
        setAppointments(appointmentsWithUser);
      } catch (err) {
        setError("Une erreur est survenue lors du chargement des rendez-vous.");
        console.error("Erreur lors de la récupération des rendez-vous :", err);
      } finally {
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
      setError("Une erreur est survenue lors de l'annulation du rendez-vous.");
      console.error("Erreur lors de l'annulation du rendez-vous :", err);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Chargement des rendez-vous...</div>;
  }

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
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
                <td>{appt.user.firstName || ""} {appt.user.lastName || ""}</td>
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
              <td colSpan="6" className="text-center">Aucun rendez-vous trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;