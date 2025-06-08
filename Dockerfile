# Image Node.js "alpine" (minimal) de base
FROM node:24-alpine3.21 AS base

# Placement dans le dossier de l'application
WORKDIR /app

# Copie du code dans le dossier
COPY . .

# Port 5173 ouvert
EXPOSE 3000

# Commande lorsque l'app se lance
ENTRYPOINT ["npm", "run"]


# Image secondaire depuis l'image de base pour l'environnement de dev
FROM base AS development
# Téléchargement des dépendances Node
RUN npm i
# Argument de la commande de lancement pour lancer le profil de dev avec Nodemon (hot reload)
CMD ["dev"]

# Image secondaire depuis l'image de base pour l'environnement de prod
FROM base AS production
# Téléchargement des dépendances Node uniquement pour la production
RUN npm i --only=production
ENV LOG_LEVEL=error
# Argument de la commande de lancement pour lancer le profil de prod sans Nodemon
CMD ["start"]
