import React, { useEffect, useState } from "react";
import axios from "axios";

function TimeSlots() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [timeSlots, setTimeSlots] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    useEffect(() => {
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
            const res = await axios.get(`/api/slots?service_id=${serviceId}`);
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

    const handleAddTimeSlot = async () => {
        if (!startTime || !endTime || !selectedService) {
            alert("Veuillez remplir tous les champs.");
            return;
        }
        try {
            await axios.post("/api/slots", {
                service_id: selectedService,
                start_time: startTime,
                end_time: endTime,
            });
            alert("Créneau ajouté avec succès.");
            fetchTimeSlots(selectedService);
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'ajout du créneau.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Gestion des créneaux</h2>
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
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Début</th>
                            <th>Fin</th>
                            <th>Disponible</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((slot) => (
                            <tr key={slot.id}>
                                <td>{slot.id}</td>
                                <td>{new Date(slot.start_time).toLocaleString()}</td>
                                <td>{new Date(slot.end_time).toLocaleString()}</td>
                                <td>{slot.is_available ? "Oui" : "Non"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="mb-3">
                <label className="form-label">Début</label>
                <input type="datetime-local" className="form-control" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                <label className="form-label">Fin</label>
                <input type="datetime-local" className="form-control" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                <button className="btn btn-success mt-3" onClick={handleAddTimeSlot}>
                    Ajouter un créneau
                </button>
            </div>
        </div>
    );
};

export default TimeSlots;