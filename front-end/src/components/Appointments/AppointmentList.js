import React, { useEffect, useState } from "react";
import axios from "../../services/api";

function AppointmentList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("/appointments")
    .then(response => setAppointments(response.data))
    .catch(error => console.error(error));
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
                    <td>{appt.service_name}</td>
                    <td>{appt.appointment_date}</td>
                    <td>{appt.status}</td>
                </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;