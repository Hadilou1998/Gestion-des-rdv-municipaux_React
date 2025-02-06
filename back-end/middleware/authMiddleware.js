const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Accès refusé. Token manquant ou malformé." });
        }

        // ✅ Extraire uniquement la chaîne de caractères du token
        const token = authHeader.split(" ")[1].trim();

        console.log("📡 Token reçu dans le middleware:", token);

        // ✅ Vérifier que le token est bien une chaîne et non un objet JSON
        if (!token || typeof token !== "string") {
            return res.status(400).json({ message: "Format du token invalide." });
        }

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