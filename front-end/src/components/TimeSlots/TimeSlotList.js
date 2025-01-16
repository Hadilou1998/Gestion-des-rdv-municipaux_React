import React, { useEffect, useState } from "react";
import axios from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimeSlotList() {
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [services, setServices] = useState([]);

    // Récupération des services depuis l'API
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get("/services");
                setServices(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des services:", err);
                setError(
                    `Une erreur est survenue lors du chargement des services: ${
                        err.response?.data?.message || err.message
                    }`
                );
            }
        };
        fetchServices();
    }, []);

    useEffect(() => {
        // Récupération des créneaux horaires depuis l'API
        const fetchTimeSlots = async () => {
            if (!selectedService || !selectedDate) return;

            setLoading(true);
            try {
                const response = await axios.get("/slots", {
                    params: {
                        service_id: selectedService,
                        date: selectedDate,
                    },
                });
                setTimeSlots(response.data);
                setError(null);
            } catch (err) {
                console.error("Erreur lors de la récupération des créneaux:", err);
                setError(
                    `Une erreur est survenue lors du chargement des créneaux: ${
                        err.response?.data?.message || err.message
                    }`
                );
            } finally {
                setLoading(false);
            }
        };

        if (selectedService && selectedDate) {
            fetchTimeSlots();
        }
    }, [selectedService, selectedDate]);

    const handleDateChange = (selectedDate) => {
        setSelectedDate(selectedDate.toISOString().split("T")[0]);
    };

    const formatTimeSlot = (startTime, endTime) => {
        return `${new Date(startTime).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })} - ${new Date(endTime).toLocaleTimeString("fr-FR"
                , { hour: "2-digit", minute: "2-digit" })}`;
    };

    return (
        <div className="container mt-4">
            <h2>Créneaux Disponibles</h2>
            <div className="row mb-4">
                <div className="col-md-6">
                    <label className="form-label">Service</label>
                    <select
                        className="form-select"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                    >
                        <option value="">-- Choisir un service --</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <DatePicker
                        className="form-control"
                        selected={selectedDate ? new Date(selectedDate) : null}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        minDate={new Date()}
                        placeholderText="Sélectionnez une date"
                        required
                    />
                </div>
            </div>

            {loading && <div className="text-center">Chargement des créneaux...</div>}

            {error && <div className="alert alert-danger mt-4">{error}</div>}

            {!loading && !error && timeSlots.length > 0 && (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Horaire</th>
                            <th>Statut</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map((slot) => (
                            <tr key={slot.id}>
                                <td>{formatTimeSlot(slot.startTime, slot.endTime)}</td>
                                <td>
                                    <span className={`badge ${slot.is_available ? "bg-success" : "bg-danger"}`}>
                                        {slot.is_available ? "Disponible" : "Indisponible"}
                                    </span>
                                </td>
                                <td>
                                    {slot.is_available && (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => {
                                                // Ajoutez ici la logique pour gérer la réservation du créneau
                                            }}
                                        >
                                            Réserver
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loading && !error && timeSlots.length === 0 && (
                <div className="alert alert-info">
                    Aucun créneau disponible pour le service sélectionné.
                </div>
            )}
        </div>
    );
};export default TimeSlotList;