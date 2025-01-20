const { Appointment, Service, User } = require('../models');

// Créer un nouveau rendez-vous
exports.createAppointment = async (req, res) => {
    try {
        const { user, service, appointmentDate } = req.body;

        const newAppointment = await Appointment.create({ 
            user_id: user, 
            service_id: service, 
            appointmentDate 
        });
        
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du rendez-vous', details: error.message });
    }
};

// Obtenir les rendez-vous de l'utilisateur connecté
exports.getMyAppointments = async (req, res) => {
    try {
        const user = req.user; // Utilisateur connecté (injecté par authMiddleware)

        // Utilisez Sequelize pour obtenir les rendez-vous avec les associations
        const appointments = await Appointment.findAll({
            where: { user_id: user.id },
            include: [
                { model: Service, as: 'service' },  // Assurez-vous d'inclure le modèle "Service"
            ]
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous.' });
    }
};

// Obtenir tous les rendez-vous
exports.getAllAppointments = async (req, res) => {
    try {
        const user = req.user; // Utilisateur connecté (injecté par authMiddleware)

        let appointments;
        if (user.role === 'admin' || user.role === 'agent') {
            // Admin et agents peuvent voir tous les rendez-vous
            appointments = await Appointment.findAll({
                include: [
                    { model: User, as: 'user' },
                    { model: Service, as: 'service' }
                ]
            });
        } else {
            // Utilisateurs normaux voient uniquement leurs propres rendez-vous
            appointments = await Appointment.findAll({
                where: { user_id: user.id },
                include: [
                    { model: Service, as: 'service' }
                ]
            });
        }

        res.status(200).json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous.' });
    }
};

// Consulter un rendez-vous
exports.getAppointmentById = async (req, res) => {
    try {
        const user = req.user;

        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user' },
                { model: Service, as: 'service' }
            ]
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }

        // Vérifier si l'utilisateur a les droits pour voir ce rendez-vous
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user_id !== user.id) {
            return res.status(403).json({ message: 'Accès interdit.' });
        }

        res.status(200).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la récupération du rendez-vous.' });
    }
};

// Mettre à jour un rendez-vous
exports.updateAppointment = async (req, res) => {
    try {
        const user = req.user;
        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }

        // Vérifier les droits pour modifier ce rendez-vous
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user_id !== user.id) {
            return res.status(403).json({ message: 'Accès interdit.' });
        }

        // Mise à jour des champs de l'appointment
        await appointment.update(req.body);

        res.status(200).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la mise à jour du rendez-vous.' });
    }
};

// Supprimer un rendez-vous
exports.deleteAppointment = async (req, res) => {
    try {
        const user = req.user;
        const appointment = await Appointment.findByPk(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }

        // Vérifier les droits pour supprimer ce rendez-vous
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user_id !== user.id) {
            return res.status(403).json({ message: 'Accès interdit.' });
        }

        await appointment.destroy();

        res.status(200).json({ message: 'Rendez-vous supprimé avec succès.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la suppression du rendez-vous.' });
    }
};