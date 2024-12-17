const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./models');

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Importer les routes
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const slotRoutes = require('./routes/slotRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/slots', slotRoutes);

// Démarrage du serveur
const port = process.env.PORT || 5000;

db.sequelize.sync({ alter: true }).then(() => {
    console.log('Base de données synchronisée.');
    app.listen(port, () => console.log(`Serveur en écoute sur le port ${port}`));
}).catch((error) => {
    console.error('Erreur de connexion à la base de données :', error);
});