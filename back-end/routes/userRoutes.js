const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate, authorize } = require("../middleware/authMiddleware"); // Middleware de protection

// ✅ Récupérer tous les utilisateurs (ADMIN uniquement)
router.get("/", authenticate, authorize(["admin"]), userController.getAllUsers);

// ✅ Récupérer un utilisateur par ID (ADMIN uniquement)
router.get("/:id", authenticate, authorize(["admin"]), userController.getUserById);

// ✅ Mettre à jour un utilisateur (ADMIN uniquement)
router.put("/:id", authenticate, authorize(["admin"]), userController.updateUser);

// ✅ Supprimer un utilisateur (ADMIN uniquement)
router.delete("/:id", authenticate, authorize(["admin"]), userController.deleteUser);

module.exports = router;