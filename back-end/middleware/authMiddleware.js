const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        // Vérifie si l'en-tête Authorization contient un token
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Accès refusé. Token manquant." });
        }

        // Vérification du token avec la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Vérifie si l'utilisateur existe dans la base de données
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non trouvé." });
        }

        // Convertir l'utilisateur en objet JS pur pour éviter les problèmes Sequelize
        req.user = user.toJSON();

        // Passe au middleware suivant
        next();
    } catch (error) {
        console.error("Erreur d'authentification :", error);
        res.status(401).json({ message: "Token invalide ou expiré." });
    }
};