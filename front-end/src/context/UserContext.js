import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from '../services/api';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        setLoading(true);
        try {
            const userData = localStorage.getItem("user");

            // ✅ Vérifier si userData est valide JSON avant de le parser
            if (!userData) {
                setUser(null);
                setLoading(false);
                return;
            }

            let parsedUser;
            try {
                parsedUser = JSON.parse(userData);
                if (!parsedUser || !parsedUser.token) {
                    throw new Error("Données utilisateur invalides dans le stockage local.");
                }
            } catch (err) {
                console.error("Erreur de parsing JSON:", err);
                localStorage.removeItem("user");
                setUser(null);
                setLoading(false);
                return;
            }

            axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
            const response = await axios.get('/auth/me');

            if (!response.data.role) {
                throw new Error("Le rôle de l'utilisateur est introuvable.");
            }

            const loggedInUser = { ...response.data, token: parsedUser.token };
            setUser(loggedInUser);

        } catch (error) {
            console.error("Erreur lors du chargement de l'utilisateur :", error);
            localStorage.removeItem("user");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUser();
    }, [loadUser]);

    const login = async (credentials) => {
        try {
            const response = await axios.post('/auth/login', credentials);
            
            // ✅ Vérification de la structure avant stockage
            if (!response.data.user || !response.data.token) {
                throw new Error("Réponse invalide du serveur lors de la connexion.");
            }

            const userData = { ...response.data.user, token: response.data.token };
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || "Erreur de connexion"
            };
        }
    };

    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout, loadUser }}>
            {children}
        </UserContext.Provider>
    );
};