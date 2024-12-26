import React, { useState } from "react";

function AppointmentForm({ onSubmit }) {
    const [serviceId, setServiceId] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [notes, setNotes] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit({ serviceId, appointmentDate, notes });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="serviceId">Service</label>
                <input type="text" className="form-control" id="serviceId" value={serviceId} onChange={(e) => setServiceId(e.target.value)} required />
            </div>
            <div className="form-group">
                <label htmlFor="appointmentDate">Date de rendez-vous</label>
                <input type="datetime-local" className="form-control" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="notes">Notes</label>
                <textarea className="form-control" id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary">Prendre Rendez-vous</button>
        </form>
    );
};

export default AppointmentForm;