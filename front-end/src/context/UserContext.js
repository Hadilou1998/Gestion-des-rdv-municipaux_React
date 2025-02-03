import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadUser = useCallback(async () => {
        setLoading(true);
        try {
            const userData = localStorage.getItem("user");
            if (!userData) {
                setUser(null);
                setLoading(false);
                return;
            }

            let parsedUser;
            try {
                parsedUser = JSON.parse(userData);
                if (!parsedUser || !parsedUser.token) {
                    throw new Error("Données utilisateur invalides.");
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
            if (!response.data.user || !response.data.token) {
                throw new Error("Réponse invalide du serveur.");
            }

            const userData = { ...response.data.user, token: response.data.token };
            localStorage.setItem("user", JSON.stringify(userData));
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

            // ✅ Met à jour immédiatement `user`
            setUser(userData);

            // ✅ Ajout d'un délai pour laisser React mettre à jour `Navbar`
            setTimeout(() => {
                if (userData.role === "admin" || userData.role === "agent") {
                    navigate("/dashboard");
                } else {
                    navigate("/appointments/my");
                }
            }, 100);

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
        navigate("/login");
    };

    return (
        <UserContext.Provider value={{ user, loading, login, logout, loadUser }}>
            {children}
        </UserContext.Provider>
    );
};