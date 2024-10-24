const express = require('express');
const { Appointment, Service, User } = require('./models');
const router = express.Router();

// Prendre un rendez-vous
router.post('/', async (req, res) => {
    const { userId, serviceId, appointmentDate } = req.body;
    try {
        const appointment = await Appointment.create({ userId, serviceId, appointmentDate });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la prise du rendez-vous.' });
    }
});

// Obtenir tous les rendez-vous d'un utilisateur
router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const appointment = await Appointment.findAll({ where: { userId }, include: [Service, User] });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous.' });
    }
});

// Voir un rendez-vous
router.get('/:appointmentId', async (req, res) => {
    const { appointmentId } = req.params;
    try {
        const appointment = await Appointment.findByPk(appointmentId, { include: [Service, User] });
        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération du rendez-vous.' });
    }
});

// Modifier un rendez-vous
router.put('/:appointmentId', async (req, res) => {
    const { appointmentId } = req.params;
    const { appointmentDate, status, notes } = req.body;
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }
        await appointment.update({ appointmentDate, status, notes });
        res.json(appointment);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la modification du rendez-vous.' });
    }
});

// Supprimer un rendez-vous
router.delete('/:appointmentId', async (req, res) => {
    const { appointmentId } = req.params;
    try {
        const appointment = await Appointment.findByPk(appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }
        await appointment.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la suppression du rendez-vous.' });
    }
});

module.exports = router;