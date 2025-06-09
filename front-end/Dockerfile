# Étape 1 : Construction du frontend avec Node.js
FROM node:20 AS build

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement package.json et package-lock.json pour optimiser la mise en cache
COPY package*.json ./

# Installer les dépendances
RUN npm install --legacy-peer-deps

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application React
RUN npm run build

# Nettoyage des dépendances après le build pour réduire la taille de l'image
RUN rm -rf node_modules

# Étape 2 : Serveur Web Apache pour héberger les fichiers React
FROM httpd:2.4

# Définir ServerName pour éviter le warning "Could not reliably determine the server's fully qualified domain name"
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf

# Activer mod_rewrite pour gérer React Router et les SPA (évite les erreurs 404)
RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

# Ajouter la configuration pour gérer React Router (Format Correct)
# Crée un nouveau fichier de configuration et ajoute la balise d'ouverture Directory
RUN echo '<Directory "/usr/local/apache2/htdocs/">' > /usr/local/apache2/conf/extra/react-app.conf \
    # Permet la surcharge de toutes les directives Apache dans ce répertoire
    && echo '    AllowOverride All' >> /usr/local/apache2/conf/extra/react-app.conf \
    # Autorise l'accès à tous les utilisateurs pour ce répertoire
    && echo '    Require all granted' >> /usr/local/apache2/conf/extra/react-app.conf \
    # Active le moteur de réécriture d'URL pour ce répertoire
    && echo '    RewriteEngine On' >> /usr/local/apache2/conf/extra/react-app.conf \
    # Condition : applique la règle seulement si le répertoire demandé n'existe pas
    && echo '    RewriteCond %{REQUEST_FILENAME} !-f' >> /usr/local/apache2/conf/extra/react-app.conf \
    # Condition : applique la règle seulement si le répertoire demandé n'existe pas
    && echo '    RewriteCond %{REQUEST_FILENAME} !-d' >> /usr/local/apache2/conf/extra/react-app.conf \
    # Règle : redirige toutes les requêtes vers index.html en préservant les paramètres de requête
    && echo '    RewriteRule ^ /index.html [QSA,L]' >> /usr/local/apache2/conf/extra/react-app.conf \
    # Ferme la balise Directory
    && echo '</Directory>' >> /usr/local/apache2/conf/extra/react-app.conf \
    # Inclure le nouveau fichier de configuration dans la configuration principale d'Apache
    && echo "Include conf/extra/react-app.conf" >> /usr/local/apache2/conf/httpd.conf

# Copier les fichiers build générés vers le dossier de service Apache
COPY --from=build /app/build /usr/local/apache2/htdocs/

# Ajouter un script d'initialisation pour afficher le message de succès
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Exposer le port HTTP d'Apache (80 au lieu de 3000)
EXPOSE 80

# Lancer Apache avec le message de succès
CMD ["/usr/local/bin/docker-entrypoint.sh"]