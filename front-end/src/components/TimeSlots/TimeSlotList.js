import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TimeSlotList() {
    const navigate = useNavigate();
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [services, setServices] = useState([]);
    const [reservationLoading, setReservationLoading] = useState(false); // Etat pour le chargement de la réservation

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
        const fetchTimeSlots = async () => {
            if (!selectedService || !selectedDate) return;

            setLoading(true);
            try {
                const response = await axios.get("/slots", { // Requête GET à "/slots" (corrigé)
                    params: {
                        serviceId: selectedService,
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
        if (selectedDate) {
            setSelectedDate(selectedDate.toISOString().split("T")[0]);
        } else {
            setSelectedDate(""); // Gérer le cas où la date est null
        }
    };

    const formatTimeSlot = (startTime, endTime) => {
        return `${new Date(startTime).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        })} - ${new Date(endTime).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit"
        })}`;
    };

    const handleReservation = async (slotId) => {
        try {
            setReservationLoading(true);
            setError(null);
            setSuccessMessage(null);
    
            // Correction de la route pour la réservation
            const response = await axios.post(`/slots/${slotId}/reserve`);
    
            if (response.status === 200 || response.status === 201) {
                setSuccessMessage("Réservation effectuée avec succès !");
                
                // Mise à jour du statut du créneau localement
                setTimeSlots(prevSlots => 
                    prevSlots.map(slot => 
                        slot.id === slotId 
                            ? { ...slot, isAvailable: false }
                            : slot
                    )
                );
    
                // Redirection après un court délai
                setTimeout(() => {
                    navigate(`/slots/${slotId}`);
                }, 1500);
            }
    
        } catch (err) {
            console.error("Erreur détaillée de réservation:", err);
            setError(
                `Erreur lors de la réservation : ${
                    err.response?.data?.error || "Une erreur est survenue"
                }`
            );
        } finally {
            setReservationLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Créneaux Disponibles</h2>

            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    {successMessage}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setSuccessMessage(null)}
                    ></button>
                </div>
            )}

            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setError(null)}
                    ></button>
                </div>
            )}

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
                                    <span className={`badge ${slot.isAvailable ? "bg-success" : "bg-danger"}`}>
                                        {slot.isAvailable ? "Disponible" : "Indisponible"}
                                    </span>
                                </td>
                                <td>
                                    {slot.isAvailable && (
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleReservation(slot.id)}
                                            disabled={reservationLoading} // Désactive pendant la réservation
                                        >
                                            {reservationLoading ? "Réservation..." : "Réserver"}
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
}

export default TimeSlotList;