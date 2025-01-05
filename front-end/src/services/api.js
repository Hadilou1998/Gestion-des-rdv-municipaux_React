import axios from "axios";

// Création d'un client axios avec des paramètres par défaut
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api", // URL de l'API
    timeout: 10000, // Temps d'attente avant expiration de la requête
    headers: {
        "Content-Type": "application/json",
    }
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem("user");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Intercepteur pour gérer les erreurs et les messages d'erreur
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Utilisateur non connecté, redirection vers la page de connexion
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

// Fonctions d'appel à l'API pour les différents services

// Authentification
export const login = (credentials) => api.post(`${api.baseURL}/auth/login`, credentials);
export const register = (userData) => api.post(`${api.baseURL}/auth/register`, userData);
export const logout = () => api.post(`${api.baseURL}/auth/logout`);

// Profil utilisateur
export const getUserProfile = () => api.get(`${api.baseURL}/user/profile`);
export const updateUserProfile = (data) => api.put(`${api.baseURL}/user/profile`, data);

// Gestion des rendez-vous
export const getAppointments = () => api.get(`${api.baseURL}/appointments`);
export const createAppointment = (data) => api.post(`${api.baseURL}/appointments`, data);
export const updateAppointment = (id, data) => api.put(`${api.baseURL}/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`${api.baseURL}/appointments/${id}`);
export const getAppointmentById = (id) => api.get(`${api.baseURL}/appointments/${id}`);

// Gestion des services
export const getServices = () => api.get(`${api.baseURL}/services`);
export const createService = (data) => api.post(`${api.baseURL}/services`, data);
export const updateService = (id, data) => api.put(`${api.baseURL}/services/${id}`, data);
export const deleteService = (id) => api.delete(`${api.baseURL}/services/${id}`);
export const getServiceById = (id) => api.get(`${api.baseURL}/services/${id}`);

// Gestion des créneaux
export const getTimeSlots = () => api.get(`${api.baseURL}/slots`);
export const getSlotById = (id) => api.get(`${api.baseURL}/slots/${id}`);
export const createTimeSlot = (data) => api.post(`${api.baseURL}/slots`, data);
export const updateTimeSlot = (id, data) => api.put(`${api.baseURL}/slots/${id}`, data);
export const deleteTimeSlot = (id) => api.delete(`${api.baseURL}/slots/${id}`);

// Contact
export const sendContactMessage = (data) => api.post(`${api.baseURL}/contact`, data);

// Statistiques dashboard
export const getDashboardStats = () => api.get(`${api.baseURL}/dashboard/stats`);

export default api;