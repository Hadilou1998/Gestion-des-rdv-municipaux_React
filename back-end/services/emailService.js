require("dotenv").config();
const nodemailer = require("nodemailer");

// Création du transporteur SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // false pour le port 587
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Fonction pour envoyer un email
exports.sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_FORM, // Expéditeur
            to,
            subject,
            text,
            html,
        });
        console.log("✅ Email envoyé avec succès:", info.messageId);
        return { success: true, message: info.messageId };
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email:", error);
        return { success: false, error };
    }
};
