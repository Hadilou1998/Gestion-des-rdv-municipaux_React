const TOKEN_KEY = "token";

// Stocke le token dans le localStorage
export const setToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

// Récupère le token du localStorage
export const getToken = (token) => {
    return localStorage.getItem(TOKEN_KEY);
};

// Supprime le token
export const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
};

// Vérifie si l'utilisateur est connecté
export const isAuthenticated = () => {
    return !!getToken();
};