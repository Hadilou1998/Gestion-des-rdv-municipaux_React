import React, { useEffect, useState } from "react";
import axios from "../../services/api"; // Assurez-vous que ce chemin est correct

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/appointments");
        const appointmentsWithUser = await Promise.all(
          response.data.map(async (appt) => {
            if (appt.userId) {
              const userResponse = await axios.get(`/users/${appt.userId}`);
              return { ...appt, user: userResponse.data };
            } else {
              return { ...appt, user: { firstName: "Nom", lastName: "Inconnu" } };
            }
          })
        );
        setAppointments(appointmentsWithUser);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors de la récupération des rendez-vous.");
        console.error("Erreur lors de la récupération des rendez-vous :", err);
      } finally {
        setLoading(false);
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
                <td>
                  {appt.user.firstName} {appt.user.lastName}
                </td>
                <td>{appt.service?.name || "Service inconnu"}</td>
                <td>{new Date(appt.appointmentDate).toLocaleString("fr-FR")}</td>
                <td>{appt.status}</td>
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