import axios from "axios";

// Création d'un client axios avec des paramètres par défaut
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    }
});

// Ajouter un interceptor pour ajouter le token d'authentification à chaque requête
api.interceptors.request.use((config) => {
    const userData = localStorage.getItem("user");
    if (userData) {
        try {
            const parsedUser = JSON.parse(userData); // Extraire correctement l'objet user
            if (parsedUser?.token) {
                config.headers["Authorization"] = `Bearer ${parsedUser.token}`;
            }
        } catch (error) {
            console.error("❌ Erreur lors de la récupération du token :", error);
        }
    }
    return config;
});

// Ajouter un interceptor pour gérer les erreurs de réponse
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.warn("⏳ Token expiré. Déconnexion automatique.");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;