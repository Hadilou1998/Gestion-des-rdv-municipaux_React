// Fonction pour obtenir le token d'authentification depuis le localStorage
export const getToken = () => {
    return localStorage.getItem('auth_token'); // ou un autre nom que vous utilisez
};

// Fonction pour définir le token d'authentification dans le localStorage
export const setToken = (token) => {
    localStorage.setItem('auth_token', token);
};

// Fonction pour supprimer le token d'authentification du localStorage (déconnexion)
export const removeToken = () => {
    localStorage.removeItem('auth_token');
};

// Fonction pour vérifier si un utilisateur est authentifié (en vérifiant la présence du token)
export const isAuthenticated = () => {
    const token = getToken();
    // Ici vous pouvez ajouter une vérification supplémentaire si nécessaire, comme la validation du JWT
    return token ? true : false;
};

// Fonction pour ajouter le token dans les en-têtes d'une requête Axios
export const authHeader = () => {
    const token = getToken();
    // Si le token existe, le retourner sous forme d'en-tête d'authentification
    if (token) {
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
};