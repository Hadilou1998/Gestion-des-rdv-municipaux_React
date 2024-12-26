import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Création du context utilisateur
export const UserContext = createContext();

// Fournisseur du context utilisateur
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Utilisateur connecté

    const register = async (userData) => {
        const response = await axios.post("/api/auth/register", userData);
        setUser(response.data.user);
    };

    const login = async (userData) => {
        const response = await axios.post("/api/auth/login", userData);
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.token));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Récupération des informations utilisateur depuis le localStorage
    useEffect(() => {
        const token = localStorage.getItem("user");
        if (token) {
            setUser(JSON.parse(token));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, register, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};