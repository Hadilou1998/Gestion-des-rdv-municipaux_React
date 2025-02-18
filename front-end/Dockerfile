# Étape 1 : Construction du frontend avec Node.js
FROM node:20 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source
COPY . .

# Construire l'application React
RUN npm run build

# Nettoyage des dépendances après le build
RUN rm -rf node_modules

# Étape 2 : Serveur Web Apache pour héberger les fichiers React
FROM httpd:2.4

# Définir ServerName pour éviter l'erreur "Could not reliably determine the server's fully qualified domain name"
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Activer mod_rewrite pour gérer React Router et SPA
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Copier les fichiers build générés vers le dossier de service Apache
COPY --from=build /app/build /usr/local/apache2/htdocs/

# Exposer le port HTTP par défaut d'Apache (80 au lieu de 3000)
EXPOSE 80

# Lancer Apache en mode foreground avec niveau de log minimal
CMD ["httpd", "-D", "FOREGROUND", "-e", "crit"]