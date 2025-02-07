const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST, // ✅ Utilisation correcte du nom de service Docker
    dialect: 'mysql',
    port: 3306, // ✅ MySQL dans Docker écoute sur le port 3306 (et non 3307)
    logging: console.log, // ✅ Activez pour voir les logs SQL
  }
);

module.exports = sequelize;