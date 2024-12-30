import React, { useEffect, useState } from "react";
import axios from "axios";

function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/services");
        setServices(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération du service.");
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, []);

  if (loading) {
    return <div>Chargement des services...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }
  
  return (
    <div className="container">
      <h1 className="mt-4">Services</h1>
      <p>Voici la liste des services municipaux :</p>
      <div className="row">
        {services.map((service) => (
          <div key={service.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{service.name}</h5>
                <p className="card-text">{service.description}</p>
                <p><strong>Durée :</strong> {service.duration} minutes</p>
                <p><strong>Département :</strong> {service.department}</p>
                <button className="btn btn-primary" onClick={() => alert(`Service sélectionné : ${service.name}`)}>Prendre rendez-vous</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;