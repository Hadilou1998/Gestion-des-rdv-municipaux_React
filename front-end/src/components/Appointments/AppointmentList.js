import React, { useEffect, useState } from "react";
import axios from "../../services/api"; // Assurez-vous que la bonne URL d'API est utilisée

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("/appointments");
        console.log("Réponse des rendez-vous : ", response.data);
        setAppointments(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error.response?.data || error);
        console.log("Erreur complète :", error);
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
                    <td>{appt.user_name}</td>
                    <td>{appt.service ? appt.service.name : 'Service non trouvé'}</td> {/* Utilisation correcte du service */}
                    <td>{appt.appointmentDate}</td> {/* Assurez-vous que l'attribut est 'appointmentDate' */}
                    <td>{appt.status}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;