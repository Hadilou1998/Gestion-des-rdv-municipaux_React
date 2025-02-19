#!/bin/bash

STATUS_FILE="/usr/local/apache2/frontend_status"

# Vérifier si le message a déjà été affiché
if [ ! -f "$STATUS_FILE" ]; then
    echo "🚀 Frontend lancé avec succès ! Accédez à 👉 http://localhost:3001/"
    touch "$STATUS_FILE"
fi