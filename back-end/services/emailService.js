const nodemailer = require("nodemailer");
require("dotenv").config();

// Création du transporteur SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Vérifier la connexion SMTP
transporter.verify((error, success) => {
    if (error) {
        console.error("Erreur de connexion SMTP:", error);
    } else {
        console.log("Connexion SMTP réussie, prêt à envoyer des emails !");
    }
});

/**
 * Fonction pour envoyer un email
 * @param {string} to - Adresse email du destinataire
 * @param {string} subject - Sujet de l'email
 * @param {string} text - Contenu texte brut
 * @param {string} html - Contenu HTML facultatif
 */
async function sendEmail(to, subject, text, html = "") {
    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM || `"Service Municipal" <${process.env.MAIL_USERNAME}>`,
            to,
            subject,
            text,
            html: html || `<p>${text}</p>`,
        });

        console.log("Email envoyé avec succès:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
        return { success: false, error: error.message };
    }
}

// Vérifier que l'export est bien fait sous forme d'objet
module.exports = { sendEmail };