const { Sequelize } = require('sequelize');

// Afficher les valeurs des variables d'environnement pour débogage
console.log('Configuration de la base de données :');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('✅ Connexion à la base de données réussie'))
  .catch((err) => console.error('❌ Erreur de connexion à la base de données :', err));