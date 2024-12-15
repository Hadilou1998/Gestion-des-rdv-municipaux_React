import React, { useEffect, useState } from "react";
import axios from "axios";

function Appointments() {
    const [services, setServices] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    
    useEffect(() => {
        // Charger la liste des services
        const fetchServices = async () => {
            try {
                const res = await axios.get("/api/services");
                setServices(res.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchServices();
    }, []);

    const fetchTimeSlots = async (serviceId) => {
        try {
            const res = await axios.get(`/api/slots?service_id${serviceId}`);
            setTimeSlots(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleServiceSelect = (e) => {
        const serviceId = e.target.value;
        setSelectedService(serviceId);
        fetchTimeSlots(serviceId);
    };

    const handleAppointmentBooking = async () => {
        if (!selectedService || !selectedSlot) {
            alert("Veuillez selectionner un service et un créneau.");
            return;
        }
        try {
            await axios.post("/api/appointments", {
                service_id: selectedService,
                time_slot_id: selectedSlot,
            });
            alert("Rendez-vous pris avec succès !");
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la prise de rendez-vous.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Prise de rendez-vous</h2>
            <div className="mb-3">
                <label className="form-label">Service</label>
                <select className="form-select" onChange={handleServiceSelect}>
                    <option value="">-- Sélectionnez un service --</option>
                    {services.map((service) => (
                        <option key={service.id} value={service.id}>
                            {service.name}
                        </option>
                    ))}
                </select>
            </div>
            {timeSlots.length > 0 && (
                <div className="mb-3">
                    <label className="form-label">Créneaux disponibles</label>
                    <select
                        className="form-select"
                        onChange={(e) => setSelectedSlot(e.target.value)}
                    >
                        <option value="">-- Sélectionnez un créneau --</option>
                        {timeSlots.map((slot) => (
                            <option key={slot.id} value={slot.id}>
                                {new Date(slot.start_time).toLocaleString()} -{' '}
                                {new Date(slot.end_time).toLocaleString()}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <button className="btn btn-primary" onClick={handleAppointmentBooking}>
                Prendre rendez-vous
            </button>
        </div>
    );
};

export default Appointments;