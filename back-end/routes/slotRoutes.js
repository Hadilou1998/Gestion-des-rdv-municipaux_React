const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const authMiddleware = require('../middlewares/authMiddleware');

// Liste des créneaux disponibles
router.get('/', slotController.getAllSlots);

// Création d'un créneau
router.post('/', authMiddleware, slotController.createSlot);

// Consultation d'un créneau par son ID
router.get('/:id', slotController.getSlotById);

// Modification d'un créneau par son ID
router.put('/:id', authMiddleware, slotController.updateSlot);

// Suppression d'un créneau par son ID
router.delete('/:id', authMiddleware, slotController.deleteSlot);

module.exports = router;