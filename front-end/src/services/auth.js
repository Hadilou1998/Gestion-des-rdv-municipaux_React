import axios from "axios";

const API_URL = "/api/auth";

export const login = (email, password) => axios.post(`${API_URL}/login`, { email, password });
export const register = (userData) => axios.post(`${API_URL}/register`, userData);