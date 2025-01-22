import axios from "axios";

// Création d'un client axios avec des paramètres par défaut
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // URL de l'API
    headers: {
        "Content-Type": "application/json",
    }
});

// Ajouter un interceptor pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("user");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config
});

// Ajouter un interceptor pour gérer les erreurs de réponse
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;