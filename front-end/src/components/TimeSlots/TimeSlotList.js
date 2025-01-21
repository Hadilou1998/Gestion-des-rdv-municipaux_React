import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/UserContext"; // Contexte utilisateur

function TimeSlotList() {
    const navigate = useNavigate();
    const [timeSlots, setTimeSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [selectedService, setSelectedService] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [services, setServices] = useState([]);
    const [reservationLoading, setReservationLoading] = useState(false);

    const { user } = useContext(UserContext) || {}; // Récupérer les informations utilisateur

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
                const response = await axios.get("/slots", {
                    params: { serviceId: selectedService, date: selectedDate },
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

        fetchTimeSlots();
    }, [selectedService, selectedDate]);

    const handleDateChange = (selectedDate) => {
        if (selectedDate) {
            setSelectedDate(selectedDate.toISOString().split("T")[0]);
        } else {
            setSelectedDate("");
        }
    };

    const formatTimeSlot = (startTime, endTime) => {
        return `${new Date(startTime).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        })} - ${new Date(endTime).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    };

    const handleReservation = async (slotId) => {
        try {
            setReservationLoading(true);
            setError(null);
            setSuccessMessage(null);

            const response = await axios.post(`/slots/${slotId}/reserve`);

            if (response.data && response.data.message) {
                setSuccessMessage(response.data.message);

                // Mise à jour locale du statut du créneau
                setTimeSlots((prevSlots) =>
                    prevSlots.map((slot) =>
                        slot.id === slotId ? { ...slot, isAvailable: false } : slot
                    )
                );
            }
        } catch (err) {
            console.error("Erreur lors de la réservation:", err);
            const errorMessage = err.response?.data?.error || "Une erreur est survenue lors de la réservation";
            setError(errorMessage);
        } finally {
            setReservationLoading(false);
        }
    };

    const handleDelete = async (slotId) => {
        try {
            setError(null);
            await axios.delete(`/slots/${slotId}`);
            setTimeSlots((prevSlots) => prevSlots.filter((slot) => slot.id !== slotId));
            setSuccessMessage("Créneau supprimé avec succès.");
        } catch (err) {
            console.error("Erreur lors de la suppression du créneau:", err);
            const errorMessage = err.response?.data?.error || "Une erreur est survenue lors de la suppression";
            setError(errorMessage);
        }
    };

    // Gérer l'affichage des messages selon le rôle de l'utilisateur
    const getRoleMessage = () => {
        if (user?.role === "client") {
            return "Vous n'avez pas les droits pour modifier ou supprimer un créneau.";
        } else if (user?.role === "agent") {
            return "Vous n'avez pas le droit de supprimer un créneau.";
        }
        return null;
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
                        {services.map((service) => (
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
                                            className="btn btn-primary btn-sm me-2"
                                            onClick={() => handleReservation(slot.id)}
                                            disabled={reservationLoading}
                                        >
                                            {reservationLoading ? "Réservation..." : "Réserver"}
                                        </button>
                                    )}
                                    {(user?.role === "admin" || user?.role === "agent") ? (
                                        <>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => navigate(`/slots/edit/${slot.id}`)}
                                            >
                                                Modifier
                                            </button>
                                            {user?.role === "admin" && (
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(slot.id)}
                                                >
                                                    Supprimer
                                                </button>
                                            )}
                                        </>
                                    ) : (
                                        <div className="text-warning">{getRoleMessage()}</div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {!loading && !error && timeSlots.length === 0 && (
                <div className="alert alert-info">Aucun créneau disponible pour le service sélectionné.</div>
            )}
        </div>
    );
}

export default TimeSlotList;