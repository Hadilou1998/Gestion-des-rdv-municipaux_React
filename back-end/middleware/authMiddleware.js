const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        // Vérifie si l'en-tête Authorization contient un token
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Accès refusé. Token manquant ou malformé." });
        }

        // Extraire le token
        const token = authHeader.split(" ")[1];

        // Vérification du token avec la clé secrète
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Session expirée. Veuillez vous reconnecter." });
            }
            return res.status(401).json({ message: "Token invalide." });
        }

        // Vérifie si l'utilisateur existe dans la base de données
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Utilisateur introuvable ou supprimé." });
        }

        // Ajouter les informations utilisateur dans la requête
        req.user = user.toJSON();

        // Passe au middleware suivant
        next();
    } catch (error) {
        console.error("⚠️ Erreur d'authentification :", error);
        res.status(500).json({ message: "Erreur serveur lors de la vérification du token." });
    }
};