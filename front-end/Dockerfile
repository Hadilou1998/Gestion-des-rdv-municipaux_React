# Étape 1 : Construction du frontend avec Node.js
FROM node:20 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour éviter les recopiages inutiles
COPY package*.json ./

# Installer les dépendances en mode production
RUN npm install --production

# Copier tout le code source
COPY . .

# Construire l'application React
RUN npm run build

# Nettoyage des fichiers inutiles après le build
RUN rm -rf node_modules

# Étape 2 : Serveur Web Apache pour héberger les fichiers React
FROM httpd:2.4

# Définir ServerName pour éviter l'erreur "Could not reliably determine the server's fully qualified domain name"
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Désactiver les logs Apache dans httpd.conf
RUN echo "LogLevel emerg" >> /usr/local/apache2/conf/httpd.conf

# Désactiver les logs Apache
RUN ln -sf /dev/null /usr/local/apache2/logs/access_log && \
    ln -sf /dev/null /usr/local/apache2/logs/error_log

# Copier les fichiers build générés vers le dossier de service Apache
COPY --from=build /app/build /usr/local/apache2/htdocs/

# Exposer le port HTTP par défaut d'Apache (80)
EXPOSE 80

# Commande pour démarrer Apache en arrière-plan avec les logs en mode émergence
CMD ["httpd", "-D", "FOREGROUND", "-e", "emerg"]