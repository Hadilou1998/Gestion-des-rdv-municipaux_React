import React, { useEffect, useState } from "react";
import axios from "axios";

function ServiceList({ onSelectService}) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        setServices(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <p>Chargement des services...</p>;
  if (error) return <p>Une erreur s'est produite: {error}</p>;

  return (
    <div className="mb-4">
        <h3>Services Disponibles</h3>
        <ul className="list-group">
            {services.map((service) => (
                <li key={service.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {service.name}
                    <button className="btn btn-primary" onClick={() => onSelectService(service.id)}>Sélectionner</button>
                </li>
            ))}
        </ul>
    </div>
  );
};

export default ServiceList;