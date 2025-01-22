const { Appointment, Service, User } = require('../models');

// Créer un nouveau rendez-vous
exports.createAppointment = async (req, res) => {
    try {
        const { service, appointmentDate } = req.body;
        const user = req.user; // Récupérer l'utilisateur connecté

        const newAppointment = await Appointment.create({ 
            user_id: user.id, 
            service_id: service, 
            appointmentDate 
        });

        res.status(201).json(newAppointment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Erreur lors de la création du rendez-vous', details: error.message });
    }
};

// Obtenir les rendez-vous de l'utilisateur connecté
exports.getMyAppointments = async (req, res) => {
    try {
        const user = req.user; 

        const appointments = await Appointment.findAll({
            where: { user_id: user.id },
            include: [
                { model: Service, as: 'service', attributes: ['id', 'name'] }
            ],
            order: [['appointmentDate', 'ASC']]
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous.' });
    }
};

// Obtenir tous les rendez-vous (admin et agent uniquement)
exports.getAllAppointments = async (req, res) => {
    try {
        const user = req.user;

        if (user.role !== 'admin' && user.role !== 'agent') {
            return res.status(403).json({ message: "Accès interdit." });
        }

        const appointments = await Appointment.findAll({
            include: [
                { model: User, as: 'user', attributes: ['id', 'first_name', 'last_name', 'email'] },
                { model: Service, as: 'service', attributes: ['id', 'name'] }
            ],
            order: [['appointmentDate', 'ASC']]
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous.' });
    }
};

// Consulter un rendez-vous par ID
exports.getAppointmentById = async (req, res) => {
    try {
        const user = req.user;

        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user', attributes: ['id', 'first_name', 'last_name', 'email'] },
                { model: Service, as: 'service', attributes: ['id', 'name'] }
            ]
        });

        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }

        // Vérification des droits d'accès
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user_id !== user.id) {
            return res.status(403).json({ message: 'Accès interdit.' });
        }

        res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
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

        // Vérification des droits d'accès
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user_id !== user.id) {
            return res.status(403).json({ message: 'Accès interdit.' });
        }

        await appointment.update(req.body);

        res.status(200).json(appointment);
    } catch (error) {
        console.error(error);
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

        // Vérification des droits d'accès
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user_id !== user.id) {
            return res.status(403).json({ message: 'Accès interdit.' });
        }

        await appointment.destroy();

        res.status(200).json({ message: 'Rendez-vous supprimé avec succès.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la suppression du rendez-vous.' });
    }
};