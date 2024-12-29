import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "/api",
});

// Authentification
export const register = async (userData) => {
    const response = await api.post(`${api.baseURL}/auth/register`, userData);
    return response.data;
};

export const login = async (userData) => {
    const response = await api.post(`${api.baseURL}/auth/login`, userData);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("user");
}

// Services
export const getServices = async () => {
    const response = await api.get(`${api.baseURL}/services`);
    return response.data;
};

export const getServiceById = async (id) => {
    const response = await api.get(`${api.baseURL}/services/${id}`);
    return response.data;
};

// Rendez-vous
export const createAppointment = async (appointmentData) => {
    const response = await api.post(`${api.baseURL}/appointments`, appointmentData);
    return response.data;
};

export const getAppointmentsByServiceId = async (serviceId) => {
    const response = await api.get(`${api.baseURL}/appointments?serviceId=${serviceId}`);
    return response.data;
};

// Créneaux
export const getTimeSlots = async (serviceId) => {
    const response = await api.get(`${api.baseURL}/slots?serviceId=${serviceId}`);
    return response.data;
};

const apiServices = { register, login, logout, getServices, getServiceById, createAppointment, getAppointmentsByServiceId, getTimeSlots };

export default apiServices;