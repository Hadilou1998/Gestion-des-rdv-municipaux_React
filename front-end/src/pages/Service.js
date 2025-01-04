import React, { useEffect, useState } from "react";
import { getServices, createService, updateService, deleteService } from "../services/api";

function Service() {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    duration: "",
    department: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getServices();
        setServices(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération du service :", error);
      }
    };
    fetchServices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const response = await createService(newService);
      if (response.data.success) {
        alert("Service créé avec succès!");
        setServices([...services, response.data.service]);
        setNewService({ name: "", description: "", duration: "", department: "" });
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la création du service : ", error);
    }
  };

  const handleUpdateService = async (id, updatedService) => {
    try {
      const response = await updateService(id, updatedService);
      if (response.data.success) {
        alert("Service mis à jour avec succès!");
        setServices(services.map(service => service.id === id ? response.data.service : service));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du service : ", error);
    }
  };

  const handleDeleteService = async (id) => {
    try {
      const response = await deleteService(id);
      if (response.data.success) {
        alert("Service supprimé avec succès!");
        setServices(services.filter(service => service.id !== id));
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du service : ", error);
    }
  };
  
  return (
    <div>
      <h2 className="mb-4">Gestion des services</h2>
      <form onSubmit={handleCreateService} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={newService.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={newService.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Durée (en minutes)</label>
          <input
            type="number"
            className="form-control"
            name="duration"
            value={newService.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Département</label>
          <input
            type="text"
            className="form-control"
            name="department"
            value={newService.department}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Créer un service</button>
      </form>

      <h3>Liste des services</h3>
      <ul className="list-group">
        {services.map(service => (
          <li key={service.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>Nom:</strong> {service.name}<br />
              <strong>Description:</strong> {service.description}<br />
              <strong>Durée:</strong> {service.duration} minutes<br />
              <strong>Département:</strong> {service.department}
            </div>
            <div>
              <button className="btn btn-primary btn-sm me-2" onClick={() => handleUpdateService(service.id, {...service, name: "Nouveau nom" })}>Modifier</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteService(service.id)}>Supprimer</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Service;