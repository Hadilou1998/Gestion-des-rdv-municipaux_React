const express = require('express');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const slotRoutes = require('./routes/slots');

app.use('/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/slots', slotRoutes);

// Initialisation du Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect:'mysql',
});

// Connection à la base de données
sequelize.authenticate().then(() => {
    console.log('Connexion à la base de données réussie');
}).catch((error) => {
    console.error('Erreur lors de la connexion à la base de données:', error);
});

// Démarrage du serveur
const port = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
});