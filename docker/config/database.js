const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST || 'mysql_db',  // ✅ Assurez-vous que c'est bien "mysql_db"
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,  // ✅ Vérifiez que le port est correct
    logging: false,
  }
);

module.exports = sequelize;