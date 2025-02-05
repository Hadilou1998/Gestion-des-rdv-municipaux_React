const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Accès refusé. Token manquant." });
        }

        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findByPk(decoded.id);

            if (!user || user.token !== token) {
                return res.status(401).json({ message: "Utilisateur introuvable ou token non valide." });
            }

            req.user = user;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Token invalide ou expiré." });
        }

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la vérification du token." });
    }
};