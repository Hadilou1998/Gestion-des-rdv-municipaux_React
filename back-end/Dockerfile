# Utilisation d'une image officielle Node.js
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Installer les dépendances nécessaires pour compiler `bcrypt`
RUN apt-get update && apt-get install -y python3 g++ make && rm -rf /var/lib/apt/lists/*

# Copier uniquement package.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances **avec recompilation de bcrypt**
RUN npm install --legacy-peer-deps \
    && npm rebuild bcrypt --build-from-source \
    && npm cache clean --force

# Copier le reste du code dans le conteneur
COPY . .

# Exposer le port utilisé par le backend
EXPOSE 5000

# Démarrer l'application avec `npm start`
CMD ["npm", "start"]