import React, { createContext, useState, useEffect } from "react";

// Création du contexte
export const AuthContext = createContext();

// Provider du contexte
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setAuth(JSON.parse(savedUser));
        }
    }, []);

    // Fonction pour connecter un utilisateur
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setAuth(userData);
    };

    // Fonction pour déconnecter un utilisateur
    const logout = () => {
        localStorage.removeItem("user");
        setAuth(null);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}