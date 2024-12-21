const express = require('express');
const router = express.Router();
const slotController = require('../controllers/slotController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


// Créer un créneau (accessible uniquement par les administrateurs ou agents)
router.post('/', authMiddleware, roleMiddleware(['admin', 'agent']), slotController.createSlot);

// Obtenir tous les créneaux
router.get('/', authMiddleware, slotController.getAllSlots);

// Consulter un créneau
router.get('/:id', authMiddleware, slotController.getSlotById);

// Modifier un créneau (accessible uniquement par les administrateurs ou agents)
router.put('/:id', authMiddleware, roleMiddleware(['admin', 'agent']), slotController.updateSlot);

// Supprimer un créneau (accessible uniquement par les administrateurs ou agents)
router.delete('/:id', authMiddleware, roleMiddleware(['admin', 'agent']), slotController.deleteSlot);

module.exports = router;