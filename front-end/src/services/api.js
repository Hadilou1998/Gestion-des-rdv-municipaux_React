import axios from "axios";

// Création d'un client axios avec des paramètres par défaut
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // URL de l'API
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;