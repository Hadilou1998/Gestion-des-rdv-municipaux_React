const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Inscription
router.post('/api/auth/register', authController.register);

// Connexion
router.post('/api/auth/login', authController.login);

// Déconnexion
router.post('/api/auth/logout', authController.logout);

module.exports = router;