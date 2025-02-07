const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST || 'mysql_db', // ✅ Remplacez '127.0.0.1' par 'mysql_db'
    dialect: 'mysql',
    port: 3306,
    logging: false
  }
);

module.exports = sequelize;