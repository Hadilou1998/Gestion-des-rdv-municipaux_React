# ✅ Utiliser Node.js 20
FROM node:20

# ✅ Définir le répertoire de travail dans le conteneur
WORKDIR /app

# ✅ Copier uniquement package.json et package-lock.json
COPY package*.json ./

# ✅ Installer les dépendances AVANT de copier le reste
RUN npm install --legacy-peer-deps

# ✅ Copier les fichiers du backend (y compris index.js)
COPY . .

# ✅ Exposer le port 5000
EXPOSE 5000

# ✅ Lancer l'application
CMD ["npm", "start"]