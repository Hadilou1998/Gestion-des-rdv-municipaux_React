import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Service() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/services/${id}`);
        setService(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération du service.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) return <p>Chargement du service...</p>;
  if (error) return <p>Une erreur s'est produite: {error}</p>;
  
  return (
    <div className="container">
      <h2>Détail du Service</h2>
      <h3>{service.name}</h3>
      <p><strong>Description :</strong>{service.description}</p>
      <p><strong>Durée :</strong>{service.duration} minutes</p>
      <p><strong>Département :</strong>{service.department}</p>
    </div>
  );
};

export default Service;