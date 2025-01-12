import React, { useEffect, useState } from "react";
import axios from "../../services/api";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error.response?.data || error);
      }
    };

    fetchAppointments();
  }, []);

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
          {appointments.map(appt => (
            <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.user_name || 'Inconnu'}</td>
                <td>{appt.service?.name || 'Service inconnu'}</td> {/* Utilisez l'opérateur ?. pour éviter les erreurs */}
                <td>{appt.appointmentDate}</td>
                <td>{appt.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentList;