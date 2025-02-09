# Utiliser l'image officielle de Node.js
FROM node:20 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier les fichiers du projet
COPY . .

# Construire l'application React
RUN npm run build

# Utiliser l'image officielle Apache pour servir les fichiers
FROM httpd:2.4

# Copier les fichiers build dans Apache
COPY --from=build /app/build /usr/local/apache2/htdocs/

# Exposer le port 3000
EXPOSE 3000

# Lancer Apache
CMD ["httpd", "-D", "FOREGROUND"]