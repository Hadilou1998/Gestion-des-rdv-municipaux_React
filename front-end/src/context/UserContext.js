import React, { createContext, useState, useEffect } from "react";
import axios from "../services/api"; // Vérifie que le chemin est correct

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState([]); // Stocker les rendez-vous
    const [fetchingAppointments, setFetchingAppointments] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/auth/me"); // Vérifie que cet endpoint fonctionne
                setUser(response.data.user);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Charger les rendez-vous si l'utilisateur est admin ou agent
    useEffect(() => {
        if (!user || (user.role !== "admin" && user.role !== "agent")) return;

        const fetchAppointments = async () => {
            setFetchingAppointments(true);
            try {
                const response = await axios.get("/appointments"); // Récupérer tous les rendez-vous
                setAppointments(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des rendez-vous :", error);
                setAppointments([]);
            } finally {
                setFetchingAppointments(false);
            }
        };

        fetchAppointments();
    }, [user]); // Exécuté dès que `user` est défini

    return (
        <UserContext.Provider value={{ user, loading, appointments, fetchingAppointments }}>
            {children}
        </UserContext.Provider>
    );
};