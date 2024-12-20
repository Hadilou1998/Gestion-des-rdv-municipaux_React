const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middlewares/authMiddleware');

// Liste des rendez-vous (tous ou pour un utilisateur spécifique)
router.get('/', auth, appointmentController.getAllAppointments);

// Création de rendez-vous
router.post('/', auth, appointmentController.createAppointment);

// Consultation d'un rendez-vous par son ID
router.get('/:id', auth, appointmentController.getAppointmentById);

// Modification d'un rendez-vous par son ID
router.put('/:id', auth, appointmentController.updateAppointment);

// Suppression d'un rendez-vous par son ID
router.delete('/:id', auth, appointmentController.deleteAppointment);

module.exports = router;