# Utiliser Node.js officiel
FROM node:20

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances nécessaires pour compiler bcrypt
RUN apt-get update && apt-get install -y python3 g++ make && rm -rf /var/lib/apt/lists/*

# Copier uniquement package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances **sans utiliser `node_modules` du système**
RUN npm install --legacy-peer-deps && npm rebuild bcrypt --build-from-source

# Copier le reste des fichiers
COPY . .

# Exposer le port du backend
EXPOSE 5001

# Démarrer l'application
CMD ["npm", "start"]