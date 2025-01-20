const Appointment = require('../models/Appointment'); // Exemple de modèle
const User = require('../models/User'); // Exemple de modèle utilisateur

// Créer un nouveau rendez-vous
exports.createAppointment = async (req, res) => {
    try {
        const { user, service, appointmentDate } = req.body;
        const newAppointment = new Appointment({ user, service, appointmentDate });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: 'Erreur lors de la création du rendez-vous', details: error.message });
    }
};

// Obtenir les rendez-vous de l'utilisateur connecté
exports.getMyAppointments = async (req, res) => {
    try {
        const user = req.user; // Utilisateur connecté (injecté par authMiddleware)
        const appointments = await Appointment.find({ user: user.id }).populate('service');
        res.status(200).json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous.' });
    }
}

// Obtenir tous les rendez-vous
exports.getAllAppointments = async (req, res) => {
    try {
        const user = req.user; // Utilisateur connecté (injecté par authMiddleware)

        let appointments;
        if (user.role === 'admin' || user.role === 'agent') {
            // Admin et agents peuvent voir tous les rendez-vous
            appointments = await Appointment.find().populate('user service');
        } else {
            // Utilisateurs normaux voient uniquement leurs propres rendez-vous
            appointments = await Appointment.find({ user: user.id }).populate('service');
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
        const appointment = await Appointment.findById(req.params.id).populate('user service');

        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }

        // Vérifier si l'utilisateur a les droits pour voir ce rendez-vous
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user.toString() !== user.id) {
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
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }

        // Vérifier les droits pour modifier ce rendez-vous
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user.toString() !== user.id) {
            return res.status(403).json({ message: 'Accès interdit.' });
        }

        Object.assign(appointment, req.body);
        await appointment.save();

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
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Rendez-vous introuvable.' });
        }

        // Vérifier les droits pour supprimer ce rendez-vous
        if (user.role !== 'admin' && user.role !== 'agent' && appointment.user.toString() !== user.id) {
            return res.status(403).json({ message: 'Accès interdit.' });
        }

        await appointment.deleteOne();

        res.status(200).json({ message: 'Rendez-vous supprimé avec succès.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erreur lors de la suppression du rendez-vous.' });
    }
};