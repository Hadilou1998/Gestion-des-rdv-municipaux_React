import React, { createContext, useState, useEffect } from 'react';
import axios from '../services/api';

export const UserContext = createContext(null);  // ✅ Exporter correctement

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        setLoading(true);
        try {
            const storedUser = localStorage.getItem("user");
            if (!storedUser) {
                setUser(null);
                return;
            }

            let parsedUser;
            try {
                parsedUser = JSON.parse(storedUser);
            } catch (err) {
                console.error("Données corrompues dans localStorage.");
                localStorage.removeItem("user");
                setUser(null);
                return;
            }

            if (!parsedUser.token) {
                localStorage.removeItem("user");
                setUser(null);
                return;
            }

            axios.defaults.headers.common["Authorization"] = `Bearer ${parsedUser.token}`;
            const response = await axios.get('/auth/me');
            setUser({ ...response.data, token: parsedUser.token });
        } catch (error) {
            console.error("Erreur de récupération de l'utilisateur :", error);
            localStorage.removeItem("user");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading, login: () => {}, logout: () => {} }}>
            {children}
        </UserContext.Provider>
    );
};