import React, { useEffect, useState } from "react";
import axios from "../../services/api"; // Assurez-vous que ce chemin est correct

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true); // Indique que les données sont en cours de chargement
        const response = await axios.get("/appointments");
        setAppointments(response.data); // Charge les rendez-vous dans l'état
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors de la récupération des rendez-vous.");
        console.error("Erreur lors de la récupération des rendez-vous :", err);
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchAppointments();
  }, []);

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
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.user?.name || "Inconnu"}</td> {/* Récupère le nom du citoyen */}
                <td>{appt.service?.name || "Service inconnu"}</td> {/* Récupère le nom du service */}
                <td>{new Date(appt.appointmentDate).toLocaleString()}</td> {/* Affiche la date au format lisible */}
                <td>{appt.status}</td> {/* Statut du rendez-vous */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">Aucun rendez-vous trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;