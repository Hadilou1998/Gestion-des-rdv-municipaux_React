import React, { useState, useEffect } from "react";
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from "../services/api";

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({ 
        service_id: "", 
        appointment_date: "",
        notes: "",
    });

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getAppointments();
                setAppointments(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des rendez-vous : ", error);
            }
        };
        fetchAppointments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment({...newAppointment, [name]: value });
    };

    const handleCreateAppointment = async (e) => {
        e.preventDefault();
        try {
            const response = await createAppointment(newAppointment);
            if (response.data.success) {
                alert("Rendez-vous enregistré avec succès!");
                setAppointments([...appointments, response.data.appointment]);
                setNewAppointment({ service_id: "", appointment_date: "", notes: "" });
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du rendez-vous : ", error);
        }
    };

    const handleUpdateAppointment = async (id, updatedAppointment) => {
        try {
            const response = await updateAppointment(id, updatedAppointment);
            if (response.data.success) {
                alert("Rendez-vous mis à jour avec succès!");
                setAppointments(appointments.map(appointment => appointment.id === id ? response.data.appointment : appointment));
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la mise à jour du rendez-vous : ", error);
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            const response = await deleteAppointment(id);
            if (response.data.success) {
                alert("Rendez-vous supprimé avec succès!");
                setAppointments(appointments.filter(appointment => appointment.id !== id));
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du rendez-vous : ", error);
        }
    };

    return (
        <div>
            <h2 className="mb-4">Rendez-vous</h2>
            <form onSubmit={handleCreateAppointment} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Service ID</label>
                    <input type="text" className="form-control" name="service_id" value={newAppointment.service_id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date et heure</label>
                    <input type="datetime-local" className="form-control" name="appointment_date" value={newAppointment.appointment_date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Notes</label>
                    <textarea className="form-control" name="notes" value={newAppointment.notes} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Créer un rendez-vous</button>
            </form>

            <h3>Liste des rendez-vous</h3>
            <ul className="list-group">
                {appointments.map(appointment => (
                    <li key={appointment.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>Service ID:</strong> {appointment.service_id}<br />
                            <strong>Date et heure:</strong> {appointment.appointment_date}<br />
                            <strong>Notes:</strong> {appointment.notes}
                        </div>
                        <div>
                            <button className="btn btn-primary btn-sm me-2" onClick={() => handleUpdateAppointment(appointment.id, { ...appointment, notes: "Nouvelles notes" })}>Modifier</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteAppointment(appointment.id)}>Supprimer</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointment;