const Sequelize = require('sequelize');
const User = require('./User');
const Service = require('./Service');
const Appointment = require('./Appointment');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const models = {
  User: User(sequelize, Sequelize.DataTypes),
  Service: Service(sequelize, Sequelize.DataTypes),
  Appointment: Appointment(sequelize, Sequelize.DataTypes),
};

module.exports = models;