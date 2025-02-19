#!/bin/bash

# Lancer Apache en arrière-plan
httpd -D FOREGROUND -e crit &

# Attendre qu'Apache démarre
sleep 2

# Afficher le message de succès
echo "🚀 Frontend lancé avec succès ! Accédez à 👉 http://localhost:3001/"