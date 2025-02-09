const sequelize = require("./database"); // Import du fichier database.js

sequelize.sync({ force: false }) // Crée les tables si elles n'existent pas
  .then(() => console.log("✅ Synchronisation des modèles réussie"))
  .catch(err => console.error("❌ Erreur lors de la synchronisation des modèles :", err));

// Démarrage du serveur
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});