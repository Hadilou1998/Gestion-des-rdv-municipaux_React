import React, { useEffect, useState } from "react";
import axios from "axios";

function TimeSlotList({ serviceId }) {
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/slots?serviceId=${serviceId}`);
        setTimeSlots(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des créneaux.");
      } finally {
        setLoading(false);
      }
    };
    fetchTimeSlots();
  }, [serviceId]);

  if (loading) return <p>Chargement des créneaux...</p>;
  if (error) return <p>Une erreur s'est produite: {error}</p>;

  return (
    <div className="mb-4">
        <h3>Créneaux Disponibles</h3>
        <ul className="list-group">
            {timeSlots.map((slot) => (
                <li key={slot.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {new Date(slot.start_time).toLocaleTimeString()} - {new Date(slot.end_time).toLocaleTimeString()}
                    <button className="btn btn-success">Réserver</button>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default TimeSlotList;