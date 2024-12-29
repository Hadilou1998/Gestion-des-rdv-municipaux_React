import React, { useState, useEffect } from "react";

function DashboardPage() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch("/api/appointments");
            const data = await response.json();
            setAppointments(data);
        };

        fetchAppointments();
    }, []);

    return (
        <div className="container">
            <h2 className="mt-4">Tableau de bord des rendez-vous</h2>
            <div className="mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Nom</th>
                            <th scope="col">Service</th>
                            <th scope="col">Date</th>
                            <th scope="col">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.user.first_name} {appointment.user.last_name}</td>
                                <td>{appointment.service.name}</td>
                                <td>{new Date(appointment.appointment_date).toLocaleString()}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardPage;