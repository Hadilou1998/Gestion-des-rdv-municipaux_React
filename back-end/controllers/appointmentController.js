const { Appointment, Service, User } = require("../models");

/**
 * 🔹 Récupérer tous les rendez-vous (Admin uniquement)
 */
exports.getAllAppointments = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(403).json({ message: "Accès interdit. Seuls les administrateurs peuvent voir tous les rendez-vous." });
        }

        const appointments = await Appointment.findAll({
            include: [
                { model: Service, attributes: ["id", "name"] },
                { model: User, attributes: ["id", "firstName", "lastName", "email", "role"] }
            ],
            order: [["date", "ASC"]]
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des rendez-vous :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * 🔹 Récupérer les rendez-vous d'un citoyen spécifique (citizen uniquement)
 */
exports.getCitizenAppointments = async (req, res) => {
    try {
        if (req.user.role !== "citizen") {
            return res.status(403).json({ message: "Accès interdit. Seuls les citoyens peuvent voir leurs rendez-vous." });
        }

        const appointments = await Appointment.findAll({
            where: { userId: req.user.id },
            include: [{ model: Service, attributes: ["id", "name"] }],
            order: [["date", "ASC"]]
        });

        if (!appointments.length) {
            return res.status(404).json({ message: "Aucun rendez-vous trouvé." });
        }

        res.status(200).json(appointments);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des rendez-vous :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * 🔹 Récupérer un rendez-vous par son ID
 */
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                { model: Service, attributes: ["id", "name"] },
                { model: User, attributes: ["id", "firstName", "lastName", "email", "role"] }
            ]
        });

        if (!appointment) {
            return res.status(404).json({ message: "Rendez-vous introuvable." });
        }

        // Vérifier que l'utilisateur a le droit de voir ce rendez-vous
        if (req.user.role === "citizen" && appointment.userId !== req.user.id) {
            return res.status(403).json({ message: "Accès interdit à ce rendez-vous." });
        }

        res.status(200).json(appointment);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération du rendez-vous :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * 🔹 Prendre un rendez-vous (citizen uniquement)
 */
exports.createAppointment = async (req, res) => {
    try {
        if (req.user.role !== "citizen") {
            return res.status(403).json({ message: "Seuls les citoyens peuvent prendre un rendez-vous." });
        }

        const { date, serviceId } = req.body;

        if (!date || !serviceId) {
            return res.status(400).json({ message: "Date et Service ID requis." });
        }

        const newAppointment = await Appointment.create({
            date,
            userId: req.user.id,
            serviceId
        });

        res.status(201).json({ message: "Rendez-vous créé avec succès", appointment: newAppointment });
    } catch (error) {
        console.error("❌ Erreur lors de la création du rendez-vous :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * 🔹 Mettre à jour un rendez-vous (Admin ou Citoyen Propriétaire)
 */
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { date, serviceId } = req.body;

        const appointment = await Appointment.findByPk(id);
        if (!appointment) {
            return res.status(404).json({ message: "Rendez-vous introuvable." });
        }

        if (req.user.role !== "admin" && appointment.userId !== req.user.id) {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de modifier ce rendez-vous." });
        }

        appointment.date = date || appointment.date;
        appointment.serviceId = serviceId || appointment.serviceId;
        await appointment.save();

        res.status(200).json({ message: "Rendez-vous mis à jour avec succès", appointment });
    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour du rendez-vous :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

/**
 * 🔹 Supprimer un rendez-vous (Admin ou Citoyen Propriétaire)
 */
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ message: "Rendez-vous introuvable." });
        }

        if (req.user.role !== "admin" && appointment.userId !== req.user.id) {
            return res.status(403).json({ message: "Vous n'avez pas l'autorisation de supprimer ce rendez-vous." });
        }

        await appointment.destroy();
        res.status(200).json({ message: "Rendez-vous supprimé avec succès" });
    } catch (error) {
        console.error("❌ Erreur lors de la suppression du rendez-vous :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};