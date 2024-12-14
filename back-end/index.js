const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const slotRoutes = require('./routes/slotRoutes');
const helmet = require('helmet');
const cors = require('cors');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const Sequelize = require('sequelize');
const sequelize = require('./models');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'API de gestion de rendez-vous municipaux',
            version: '1.0.0',
            description: 'Documentation sur l\'API',
        },
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: 'https://localhost:5000' }));

// Documentation avec Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/slots', slotRoutes);

// Middleware d'erreur
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Connection à la base de données
sequelize
    .authenticate()
    .then(() => console.log("Connexion à la base de données réussie"))
    .catch(err => console.error("Erreur de connexion à la base de données:", err));

// Démarrage du serveur
const port = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Serveur démarré sur le port ${port}`);
    });
});