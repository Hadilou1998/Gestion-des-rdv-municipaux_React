const { Appointment, Service, User } = require('../models');

// Création de rendez-vous
exports.createAppointment = async (req, res) => {
    const { userId, serviceId, appointmentDate, notes } = req.body;
    try {
        const appointment = await Appointment.create({ userId, serviceId, appointmentDate, notes });
        res.status(201).json({ message: 'Rendez-vous créé', appointment });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du rendez-vous', details: error.message });
    }
};

// Liste des rendez-vous (avec authentification)
exports.getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            where: { user_id: req.user.id },
            include: [
                {
                    model: User,
                    as: 'user', // Utilisez l'alias défini dans le modèle
                    attributes: ['first_name', 'last_name'], // Sélectionnez uniquement les champs souhaités
                },
                {
                    model: Service,
                    as: 'service', // Utilisez l'alias défini dans le modèle
                    attributes: ['name'], // Sélectionnez uniquement le nom du service
                },
            ],
        });
        res.status(200).json(appointments);
    } catch (error) {
        console.error("Erreur lors de la récupération des rendez-vous :", error);
        res.status(500).json({
            error: 'Erreur lors de la récupération des rendez-vous',
            details: error.message,
        });
    }
};

// Consultation d'un rendez-vous par son ID
exports.getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ error: 'Rendez-vous introuvable' });

        await appointment.save();
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération du rendez-vous', details: error.message });
    }
};

// Modification d'un rendez-vous par son ID
exports.updateAppointment = async (req, res) => {
    // Vérification du rôle (renforcement de la sécurité)
    if (!['admin', 'agent'].includes(req.user.role)) {
        return res.status(403).json({ error: 'Accès interdit : rôle insuffisant.' });
    }
    
    const { id } = req.params;
    const { appointmentDate, status, notes } = req.body;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ error: 'Rendez-vous introuvable' });

        await appointment.update({ appointmentDate, status, notes });
        res.status(200).json({ message: 'Rendez-vous mis à jour', appointment });
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la modification du rendez-vous', details: error.message });
    }
};

// Suppression d'un rendez-vous par son ID
exports.deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await Appointment.findByPk(id);
        if (!appointment) return res.status(404).json({ error: 'Rendez-vous introuvable' });

        await appointment.destroy();
        res.status(200).json({ message: 'Rendez-vous supprimé' });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la suppression du rendez-vous', details: error.message });
    }
};