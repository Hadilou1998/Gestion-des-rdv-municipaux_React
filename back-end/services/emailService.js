const nodemailer = require("nodemailer");
require("dotenv").config();

// Vérifier que toutes les variables d'environnement sont bien chargées
if (!process.env.MAIL_HOST || !process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
    console.error("❌ Erreur : Les variables d'environnement Mailtrap ne sont pas définies !");
    process.exit(1);
}

// Configurer le transporteur SMTP
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT || 587, // Port SMTP de Mailtrap
    secure: false, // Utiliser `true` pour le port 465
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Vérifier la connexion SMTP avant d'envoyer un email
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Erreur de connexion SMTP:", error);
    } else {
        console.log("✅ Connexion SMTP réussie, prêt à envoyer des emails !");
    }
});

/**
 * Envoie un email via Mailtrap.
 * @param {string} to - Adresse email du destinataire.
 * @param {string} subject - Sujet de l'email.
 * @param {string} text - Contenu texte brut de l'email.
 * @param {string} html - Contenu HTML de l'email (facultatif).
 */
exports.sendEmail = async (to, subject, text, html = "") => {
    try {
        const info = await transporter.sendMail({
            from: `"Service Municipal" <${process.env.MAIL_FROM || process.env.MAIL_USERNAME}>`,
            to,
            subject,
            text,
            html: html || `<p>${text}</p>`, // Si pas d'HTML fourni, utiliser le texte brut
        });

        console.log("✅ Email envoyé avec succès:", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email:", error);
        return { success: false, error: error.message };
    }
};

// Test rapide de l'envoi d'un email (optionnel)
if (require.main === module) {
    (async () => {
        console.log("📨 Test d'envoi d'email en cours...");
        await exports.sendEmail(
            "test@example.com",
            "Test Email",
            "Ceci est un test de Mailtrap via Nodemailer."
        );
    })();
}