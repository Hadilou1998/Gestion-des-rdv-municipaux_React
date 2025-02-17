const db = require("../models"); // Modèle Sequelize (si vous utilisez Sequelize)
const User = db.User; // Assurez-vous d'avoir un modèle `User`

// ✅ Récupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ["password"] } });
        res.json(users);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des utilisateurs :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// ✅ Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, { attributes: { exclude: ["password"] } });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        res.json(user);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// ✅ Mettre à jour un utilisateur (ADMIN uniquement)
exports.updateUser = async (req, res) => {
    try {
        const { first_name, last_name, email, role } = req.body;
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        await user.update({ first_name, last_name, email, role });
        res.json({ message: "Utilisateur mis à jour avec succès", user });
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};

// ✅ Supprimer un utilisateur (ADMIN uniquement)
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        await user.destroy();
        res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression de l'utilisateur :", error);
        res.status(500).json({ message: "Erreur serveur" });
    }
};