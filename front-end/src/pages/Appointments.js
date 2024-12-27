import React, { useState } from "react";
import ServiceList from "../components/ServiceList";
import TimeSlotList from "../components/TimeSlotList";
import AppointmentForm from "../components/AppointmentForm";
import axios from "axios";

function Appointments() {
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    const handleServiceSelect = (serviceId) => {
        setSelectedServiceId(serviceId);
    };

    const handleAppointmentSubmit = async (data) => {
        const response = await axios.post("http://localhost:5000/api/appointments", { ...data, serviceId: selectedServiceId });
        if (response.status === 201) {
            alert("Rendez-vous pris avec succès!");
        } else {
            alert("Erreur lors du pris de rendez-vous.");
        }
    };

    return (
        <div className="container">
            <h1>Prendre Rendez-vous</h1>
            <ServiceList onSelectService={handleServiceSelect} />
            {selectedServiceId && <TimeSlotList serviceId={selectedServiceId} />}
            <AppointmentForm onSubmit={handleAppointmentSubmit} />
        </div>
    );   
};

export default Appointments;