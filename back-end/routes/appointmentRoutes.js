const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authMiddleware = require('../middlewares/authMiddleware');

// Liste des rendez-vous (tous ou pour un utilisateur spécifique)
router.get('/', authMiddleware, appointmentController.getAllAppointments);

// Création de rendez-vous
router.post('/', authMiddleware, appointmentController.createAppointment);

// Consultation d'un rendez-vous par son ID
router.get('/:id', authMiddleware, appointmentController.getAppointmentById);

// Modification d'un rendez-vous par son ID
router.put('/:id', authMiddleware, appointmentController.updateAppointment);

// Suppression d'un rendez-vous par son ID
router.delete('/:id', authMiddleware, appointmentController.deleteAppointment);

module.exports = router;