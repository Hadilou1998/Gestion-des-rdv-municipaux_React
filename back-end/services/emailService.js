const nodemailer = require("nodemailer");

// Configurer le transporteur SMTP
const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 587,
    secure: false, // set to true for 465 port
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
    },
});

// Envoyer un email
exports.sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: `"Service Municipal" <${process.env.MAIL_USERNAME}>`, // Expediteur
            to,
            subject: "Hello", // Sujet
            text: "Hello world?", // Contenu texte du email
            html: "<b>Hello World?</b>", // Contenu HTML du email
        });
        console.log("Email envoyé avec succès:", info.messageId);
        return { success: true, message: info.messageId };
    } catch (error) {
        console.error("Erreur lors de l'envoi de l'email:", error);
    }
};