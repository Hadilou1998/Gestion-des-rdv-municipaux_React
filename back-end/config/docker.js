const { Sequelize } = require('sequelize');  

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {  
    host: process.env.DB_HOST || 'mysql_db',
    port: process.env.DB_PORT || 3306,  // Ajout de cette ligne
    dialect: 'mysql',  
});  

// Test de la connexion
sequelize.authenticate()  
    .then(() => {  
        console.log('Connexion à MySQL réussie!');  
    })  
    .catch(err => {  
        console.error('Erreur durant la connexion à la base de données:', err);  
    });