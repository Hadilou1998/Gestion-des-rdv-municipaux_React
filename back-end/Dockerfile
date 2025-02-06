# Utiliser une image officielle de Node.js comme base
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# ✅ Installation propre des dépendances
RUN npm install --legacy-peer-deps \
    && npm rebuild bcrypt --build-from-source \
    && npm cache clean --force

# Copier le reste du code source dans le conteneur
COPY . .

# Exposer le port sur lequel l'application sera accessible
EXPOSE 5000

# Commande pour démarrer l'application
CMD ["npm", "start"]