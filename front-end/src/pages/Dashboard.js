import React, { useEffect, useState } from "react";
import { Table, Container, Button } from "react-bootstrap";
import api from "../services/api";

const Dashboard = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await api.get("/appointments");
            setAppointments(response.data);
        };
        fetchAppointments();
    }, []);

    return (
        <Container className="mt-5">
            <h3>Mes Rendez-vous</h3>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Service</th>
                        <th>Date</th>
                        <th>Heure</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appt) => (
                        <tr key={appt.id}>
                            <td>{appt.service_name}</td>
                            <td>{new Date(appt.appointment_date).toLocaleDateString()}</td>
                            <td>{appt.status}</td>
                            <td>
                                <Button variant="danger" onClick={() => console.log("Annuler")}>Annuler</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default Dashboard;