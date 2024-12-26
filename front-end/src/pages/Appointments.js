import React, { useEffect, useState } from "react";
import AppointmentForm from "../components/AppointmentForm";
import axios from "axios";

function Appointments() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchServices = async () => {
            const response = await axios.get("http://localhost:5000/api/services");
            setServices(response.data);
        };
        fetchServices();
    }, []);

    const handleAppointmentSubmit = async (data) => {
        const response = await axios.post("http://localhost:5000/api/appointments", data);
        setServices(response.data);
        alert("Rendez-vous pris avec succès!");
    };

    return (
        <div className="container">
            <h1>Prendre Rendez-vous</h1>
            <AppointmentForm services={services} onSubmit={handleAppointmentSubmit} />
        </div>
    );   
};

export default Appointments;