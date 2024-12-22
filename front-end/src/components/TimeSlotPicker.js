import React, { useState, useEffect } from "react";
import api from "../services/api";

function TimeSlotPicker({ serviceId }) {
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        api.get(`/slots?service_id=${serviceId}`).then((response) => {
            setTimeSlots(response.data);
        });
    }, [serviceId]);

    return (
        <div>
            <h3>Choisissez un créneau horaire</h3>
            <ul className="list-group">
                {timeSlots.map((slot) => (
                    <li key={slot.id} className="list-group-item">
                        {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TimeSlotPicker;