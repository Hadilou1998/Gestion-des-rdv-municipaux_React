import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = {
    // Authentification
    register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
    login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),

    // Rendez-vous
    getAppointments: () => axios.get(`${API_URL}/appointments`),
    createAppointment: (appointmentData) => axios.post(`${API_URL}/appointments`, appointmentData),
    updateAppointment: (id, appointmentData) => axios.put(`${API_URL}/appointments/${id}`, appointmentData),
    deleteAppointment: (id) => axios.delete(`${API_URL}/appointments/${id}`),

    // Services
    getServices: () => axios.get(`${API_URL}/services`),
}

export default api;