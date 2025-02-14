const nodemailer = require("nodemailer");
require("dotenv").config();

// Vérification des variables
if (!process.env.MAIL_HOST || !process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD) {
    console.error("❌ Erreur : Les variables d'environnement Mailtrap ne sont pas définies !");
    process.exit(1);
}

// Looking to send emails in production? Check out our Email API/SMTP product!
const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,  // ✅ Assurer que le port est un nombre
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Vérifier la connexion SMTP
transporter.verify((error, success) => {
    if (error) {
        console.error("❌ Erreur de connexion SMTP:", error);
    } else {
        console.log("✅ Connexion SMTP réussie, prêt à envoyer des emails !");
    }
});

/**
 * Envoie un email de test.
 */
async function sendTestEmail() {
    try {
        const info = await transporter.sendMail({
            from: process.env.MAIL_FROM || `"Service Municipal" <${process.env.MAIL_USERNAME}>`,
            to: "test@example.com",
            subject: "Test Email via Nodemailer",
            text: "Ceci est un test d'envoi d'email via Mailtrap.",
        });

        console.log("✅ Email envoyé avec succès:", info.messageId);
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email:", error);
    }
}

// Exécuter l'envoi de l'email uniquement si ce fichier est lancé directement
if (require.main === module) {
    sendTestEmail();
}