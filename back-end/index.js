const express = require('express');
const { sequelize } = require('sequelize');
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