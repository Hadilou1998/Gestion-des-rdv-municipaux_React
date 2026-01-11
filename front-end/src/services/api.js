import axios from "axios";

// Création d'un client axios avec des paramètres par défaut
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // URL de l'API
    headers: {
        "Content-Type": "application/json",
    }
});

// Interceptor : Ajout automatique du token dans les requêtes
api.interceptors.request.use((config) => {
    try {
        const userData = localStorage.getItem("user");

        if (userData) {
            const parsedUser = JSON.parse(userData); // Extraction de l'objet JSON
            if (parsedUser.token) {
                config.headers["Authorization"] = `Bearer ${parsedUser.token}`; // Ajout du token
            }
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du token :", error);
    }
    return config;
});

// Interceptor : Gestion automatique des erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error(`Erreur API ${error.response.status}:`, error.response.data);

            if (error.response.status === 401) {
                console.warn("Token expiré ou invalide. Déconnexion...");
                localStorage.removeItem("user");
                window.location.href = "/login";
            }
        }
        return Promise.reject(error);
    }
);

export default api;