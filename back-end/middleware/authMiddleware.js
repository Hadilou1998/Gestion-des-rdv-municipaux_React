const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        // ✅ Vérifier si l'en-tête Authorization contient un token valide
        const authHeader = req.header("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            req.user = null; // ✅ On laisse l'utilisateur accéder en "non authentifié"
            return next();
        }

        // ✅ Extraire et vérifier le token
        const token = authHeader.split(" ")[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ expired: true, message: "Session expirée. Veuillez vous reconnecter." });
            }
            return res.status(401).json({ invalid: true, message: "Token invalide." });
        }

        // ✅ Vérifier si l'utilisateur existe toujours dans la base de données
        const user = await User.findByPk(decoded.id);
        if (!user) {
            return res.status(401).json({ invalid: true, message: "Utilisateur introuvable ou supprimé." });
        }

        // ✅ Ajouter l'utilisateur à la requête pour le prochain middleware
        req.user = user.toJSON();

        next();
    } catch (error) {
        console.error("⚠️ Erreur d'authentification :", error);
        res.status(500).json({ message: "Erreur serveur lors de la vérification du token." });
    }
};