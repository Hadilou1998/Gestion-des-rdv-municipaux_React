const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const slotRoutes = require("./routes/slotRoutes");
const db = require("./models");

// 🔧 Charger les variables d'environnement
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Vérification du JWT_SECRET chargé
if (!process.env.JWT_SECRET) {
    console.error("❌ ERREUR: JWT_SECRET est introuvable dans .env !");
    process.exit(1);
}

// Middlewares
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/slots", slotRoutes);

// Connexion à la base de données
db.sequelize.sync({ alter: true }).then(() => {
    console.log("✅ Connexion à la base de données réussie.");
}).catch((error) => {
    console.error("❌ Erreur de connexion à la base de données :", error);
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});