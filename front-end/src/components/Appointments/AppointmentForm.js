import React, { useState, useEffect } from "react";
import axios from "../../services/api";

function AppointmentForm() {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const [date, setDate] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // Récupération de la liste des services depuis l'API
    useEffect(() => {
        axios.get("/services")
            .then((response) => setServices(response.data))
            .catch((error) => {
                console.error("Erreur lors de la récupération des services : ", error);
                setError("Une erreur est survenue lors de la récupération des services. Veuillez réessayer.");
            });
    }, []);

    const isValidDate = (dateString) => {
        // Regex pour valider le format AAAA-MM-JJ
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(dateString)) return false;

        // Vérifier que la date est valide
        const date = new Date(dateString);
        return !isNaN(date.getTime());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        // Validation locale des champs
        if (!isValidDate(date)) {
            setError("La date doit être au format AAAA-MM-JJ.");
            return;
        }
        if (!selectedService) {
            setError("Veuillez sélectionner un service.");
            return;
        }
        if (!timeSlot) {
            setError("Veuillez sélectionner un créneau horaire.");
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

        // Données à envoyer à l'API
        const appointmentData = {
            service_id: parseInt(selectedService, 10),
            appointment_date: date,
            time_slot: formattedTimeSlot,
        };

        console.log("Données envoyées : ", appointmentData);

        try {
            const response = await axios.post("/appointments", appointmentData);
            console.log("Réponse de l'API : ", response.data);
            setMessage("Rendez-vous pris avec succès !");
            setSelectedService("");
            setDate("");
            setTimeSlot("");
        } catch (error) {
            console.error("Erreur lors de la prise du rendez-vous : ", error);
            if (error.response) {
                console.error("Réponse de l'API : ", error.response.data);
                const apiErrors = error.response.data.errors || [];
                const errorMessages = apiErrors
                    .map((err) => `${err.field ? `${err.field}: ` : ""}${err.message}`)
                    .join(", ");
                setError(`Erreurs : ${errorMessages}`);
            } else {
                setError("Une erreur réseau est survenue. Veuillez vérifier votre connexion.");
            }
        }
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
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        id="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
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
                            <option key={slot} value={slot}>{slot}</option>
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