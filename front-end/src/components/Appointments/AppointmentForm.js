import React, { useState, useEffect } from "react";
import axios from "../../services/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AppointmentForm() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [date, setDate] = useState(null); // Initialisation avec null
    const [timeSlot, setTimeSlot] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Récupération des services
    useEffect(() => {
        axios.get("/services")
        .then((response) => setServices(response.data))
        .catch((error) => {
            console.error("Erreur lors de la récupération des services : ", error);
            setError("Une erreur est survenue lors de la récupération des services. Veuillez réessayer.");
        });
    }, []);

    const handleDateChange = (selectedDate) => {
        setDate(selectedDate ? selectedDate.toISOString().split("T")[0] : null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        // Validation des données
        if (!selectedService) {
            setError("Le service est requis.");
            return;
        }
        if (!date) {
            setError("La date est requise.");
            return;
        }
        if (!timeSlot) {
            setError("Le créneau horaire est requis.");
            return;
        }

        // Mapping des créneaux horaires
        const slotsMap = {
            "9h-10h": "09:00-10:00",
            "10h-11h": "10:00-11:00",
            "11h-12h": "11:00-12:00",
            "14h-15h": "14:00-15:00",
            "15h-16h": "15:00-16:00",
            "16h-17h": "16:00-17:00",
        };
        const formattedTimeSlot = slotsMap[timeSlot] || timeSlot;

        const appointmentData = {
            service_id: parseInt(selectedService, 10), // Assurez-vous que c'est un entier
            appointment_date: date, // Format 'YYYY-MM-DD'
            time_slot: formattedTimeSlot, // Format horaire
        };

        console.log("Données envoyées à l'API : ", appointmentData); // Débogage des données

        await axios.post("/appointments", appointmentData)
            .then((response) => {
                console.log("Réponse de l'API : ", response.data); // Débogage de la réponse de l'API
                setMessage("Rendez-vous pris avec succès !");
                setSelectedService("");
                setDate(null);
                setTimeSlot("")
            .catch((error) => {
                console.error("Erreur lors de la prise du rendez-vous : ", error);
                setError("Une erreur est survenue lors de la prise du rendez-vous. Veuillez réessayer.");
            });
        });
    };

    return (
        <div className="container mt-4">
            <h2>Prendre un rendez-vous</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">Service</label>
                    <select
                        id="service"
                        className="form-control"
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        required
                    >
                        <option value="">-- Choisissez un service --</option>
                        {services.map((service) => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <DatePicker
                        className="form-control"
                        selected={date ? new Date(date) : null}
                        onChange={handleDateChange}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Sélectionnez une date"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Créneau horaire</label>
                    <select
                        className="form-control"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        required
                    >
                        <option value="">-- Choisissez une heure --</option>
                        {["9h-10h", "10h-11h", "11h-12h", "14h-15h", "15h-16h", "16h-17h"].map((slot) => (
                            <option key={slot} value={slot}>
                                {slot}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!selectedService || !date || !timeSlot}
                >
                    Confirmer
                </button>
            </form>
        </div>
    );
}

export default AppointmentForm;