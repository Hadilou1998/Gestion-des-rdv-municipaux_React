# Utiliser Node.js 20
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement package.json et package-lock.json pour optimiser le cache
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier les fichiers de l'application
COPY . .

# Exposer le port 5000
EXPOSE 5000

# Lancer l'application
CMD ["npm", "start"]