const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Accès refusé. Token manquant ou malformé." });
        }

        const token = authHeader.split(" ")[1];

        console.log("📡 Token reçu:", token); // Vérification du token reçu

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            console.error("❌ Erreur JWT:", err);
            return res.status(401).json({ message: "Token invalide ou expiré." });
        }

        const user = await User.findByPk(decoded.id, {
            attributes: ["id", "firstName", "lastName", "email", "role"]
        });

        if (!user) {
            return res.status(401).json({ message: "Utilisateur introuvable." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Erreur authMiddleware:", error);
        res.status(500).json({ message: "Erreur serveur lors de la vérification du token." });
    }
};