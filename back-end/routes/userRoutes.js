const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// ✅ Récupérer tous les utilisateurs (ADMIN uniquement)
router.get("/", authMiddleware, roleMiddleware(["admin"]), userController.getAllUsers);

// ✅ Récupérer un utilisateur par ID (ADMIN uniquement)
router.get("/:id", authMiddleware, roleMiddleware(["admin"]), userController.getUserById);

// ✅ Mettre à jour un utilisateur (ADMIN uniquement)
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), userController.updateUser);

// ✅ Supprimer un utilisateur (ADMIN uniquement)
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), userController.deleteUser);

module.exports = router;