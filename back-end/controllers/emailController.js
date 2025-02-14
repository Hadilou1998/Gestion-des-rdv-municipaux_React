const { sendEmail } = require("../services/emailService");

exports.sendTestEmail = async (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const result = await sendEmail(email, subject, message, `<p>${message}</p>`);

    if (result.success) {
        res.status(200).json({ message: "Email envoyé avec succès." });
    } else {
        res.status(500).json({ error: "Erreur lors de l'envoi de l'email." });
    }
};