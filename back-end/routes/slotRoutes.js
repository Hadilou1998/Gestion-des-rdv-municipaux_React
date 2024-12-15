const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const auth = require('../middleware/auth');

// Liste des créneaux disponibles
router.get('/', slotController.getAllSlots);

// Création d'un créneau
router.post('/', auth, slotController.createSlot);

// Consultation d'un créneau par son ID
router.get('/:id', slotController.getSlotById);

// Modification d'un créneau par son ID
router.put('/:id', auth, slotController.updateSlot);

// Suppression d'un créneau par son ID
router.delete('/:id', auth, slotController.deleteSlot);

module.exports = router;