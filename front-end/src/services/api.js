import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // URL de mon back-end
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;