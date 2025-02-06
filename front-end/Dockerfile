# Utiliser une image officielle de Node.js comme base pour la construction
FROM node:20 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source dans le conteneur
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser une image officielle d'Apache comme serveur web
FROM httpd:2.4

# Copier les fichiers de build de l'application React dans le conteneur Apache
COPY --from=build /app/build /usr/local/apache2/htdocs

# Exposer le port 80 pour le serveur web Apache
EXPOSE 80

# Démarrer le serveur web Apache
CMD ["apache2-foreground"]