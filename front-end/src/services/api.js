import axios from "axios";

const API_URL = "http://localhost:5000/api";

const api = {
    // Authentification
    register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
    login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
    logout: () => axios.delete(`${API_URL}/auth/logout`),

    // Rendez-vous
    getAppointments: () => axios.get(`${API_URL}/appointments`),
    getAppointment: (id) => axios.get(`${API_URL}/appointments/${id}`),
    createAppointment: (appointmentData) => axios.post(`${API_URL}/appointments`, appointmentData),
    updateAppointment: (id, appointmentData) => axios.put(`${API_URL}/appointments/${id}`, appointmentData),
    deleteAppointment: (id) => axios.delete(`${API_URL}/appointments/${id}`),

    // Services
    getServices: () => axios.get(`${API_URL}/services`),
    getService: (id) => axios.get(`${API_URL}/services/${id}`),
    createService: (serviceData) => axios.post(`${API_URL}/services`, serviceData),
    updateService: (id, serviceData) => axios.put(`${API_URL}/services/${id}`, serviceData),
    deleteService: (id) => axios.delete(`${API_URL}/services/${id}`),

    // Time slots
    getTimeslots: () => axios.get(`${API_URL}/timeslots`),
    getTimeslot: (id) => axios.get(`${API_URL}/timeslots/${id}`),
    createTimeslot: (timeslotData) => axios.post(`${API_URL}/timeslots`, timeslotData),
    updateTimeslot: (id, timeslotData) => axios.put(`${API_URL}/timeslots/${id}`, timeslotData),
    deleteTimeslot: (id) => axios.delete(`${API_URL}/timeslots/${id}`),
}

export default api;