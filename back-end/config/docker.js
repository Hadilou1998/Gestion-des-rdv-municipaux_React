require("dotenv").config({ path: "../../docker/config/backend.env" }); // Charger les variables depuis Docker

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST || "mysql_db", // ✅ Utilisation du service MySQL de Docker
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        timezone: "+01:00",
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        pool: {
            max: 10,
            min: 2,
            acquire: 30000,
            idle: 10000,
        },
        timezone: "+01:00",
    },
};