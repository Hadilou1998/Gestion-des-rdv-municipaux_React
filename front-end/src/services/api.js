import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // URL du backend
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;