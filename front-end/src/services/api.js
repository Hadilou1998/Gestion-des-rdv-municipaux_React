import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

// Authentification
export const register = async (userData) => {
    const response = await api.post(`/auth/register`, userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await api.post(`/auth/login`, userData);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("user");
}

// Services
export const getServices = async () => {
    const response = await api.get(`/services`);
    return response.data;
};

export const getServiceById = async (id) => {
    const response = await api.get(`/services/${id}`);
    return response.data;
};

// Rendez-vous
export const createAppointment = async (appointmentData) => {
    const response = await api.post(`/appointments`, appointmentData);
    return response.data;
};

export const getAppointmentsByServiceId = async (serviceId) => {
    const response = await api.get(`/appointments?serviceId=${serviceId}`);
    return response.data;
};

// Créneaux
export const getTimeSlots = async (serviceId) => {
    const response = await api.get(`/slots?serviceId=${serviceId}`);
    return response.data;
};

const apiServices = { register, login, logout, getServices, getServiceById, createAppointment, getAppointmentsByServiceId, getTimeSlots };

export default apiServices;