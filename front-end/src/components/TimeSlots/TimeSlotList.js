import React, { useEffect, useState } from "react";
import axios from "../../services/api";

function TimeSlotList() {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        axios.get("/slots")
       .then(response => setSlots(response.data))
       .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mt-4">
            <h2>Liste des créneaux horaires</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Service</th>
                        <th>Début</th>
                        <th>Fin</th>
                        <th>Disponibilité</th>
                    </tr>
                </thead>
                <tbody>
                    {slots.map(slot => (
                        <tr key={slot.id}>
                            <td>{slot.id}</td>
                            <td>{slot.service_name}</td>
                            <td>{slot.start_time}</td>
                            <td>{slot.end_time}</td>
                            <td>{slot.is_available? "Disponible" : "Indisponible"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimeSlotList;