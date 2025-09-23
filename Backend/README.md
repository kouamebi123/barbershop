# Barbershop Backend API

API backend moderne pour le site web de barbershop avec système de réservation multi-adresses.

## 🚀 Fonctionnalités

- **Système de réservation** : Interface complète pour la prise de rendez-vous
- **Gestion multi-adresses** : Support de plusieurs salons
- **Gestion des coiffeurs** : Profils, spécialisations, horaires
- **Services dynamiques** : Catalogue de services par location
- **Panneau d'administration** : Backoffice sécurisé
- **Authentification JWT** : Système de sécurité robuste
- **Notifications** : Email et SMS automatiques
- **Analytics** : Tableaux de bord et statistiques

## 🛠️ Stack Technique

- **Node.js** + **Express.js**
- **PostgreSQL** + **Sequelize ORM**
- **JWT** pour l'authentification
- **Joi** pour la validation
- **Nodemailer** pour les emails
- **Twilio** pour les SMS
- **Moment.js** pour les dates

## 📋 Prérequis

- Node.js (v16+)
- PostgreSQL (v12+)
- npm ou yarn

## 🔧 Installation

1. **Cloner le projet**
```bash
cd Backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp env.example .env
```

4. **Configurer la base de données**
```bash
# Créer la base de données PostgreSQL
createdb barbershop_db

# Créer l'utilisateur (optionnel)
psql -c "CREATE USER barbershop_user WITH PASSWORD 'your_password';"
psql -c "GRANT ALL PRIVILEGES ON DATABASE barbershop_db TO barbershop_user;"
```

5. **Configurer le fichier .env**
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=barbershop_db
DB_USER=barbershop_user
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_jwt_key_here
# ... autres configurations
```

6. **Exécuter les migrations**
```bash
npm run migrate
```

7. **Démarrer le serveur**
```bash
# Développement
npm run dev

# Production
npm start
```

## 📚 API Endpoints

### Authentification
- `POST /api/auth/login` - Connexion admin
- `POST /api/auth/register` - Création admin (super_admin)
- `GET /api/auth/me` - Profil admin connecté
- `PUT /api/auth/profile` - Mise à jour profil
- `POST /api/auth/logout` - Déconnexion

### Réservations
- `POST /api/bookings` - Créer une réservation
- `GET /api/bookings` - Lister les réservations (admin)
- `GET /api/bookings/:id` - Détails d'une réservation
- `PUT /api/bookings/:id` - Modifier une réservation
- `DELETE /api/bookings/:id` - Supprimer une réservation
- `GET /api/bookings/availability/:barberId` - Créneaux disponibles

### Locations
- `GET /api/locations` - Lister les locations
- `GET /api/locations/:id` - Détails d'une location
- `POST /api/locations` - Créer une location (admin)
- `PUT /api/locations/:id` - Modifier une location (admin)
- `DELETE /api/locations/:id` - Supprimer une location (admin)

### Services
- `GET /api/services` - Lister les services
- `GET /api/services/:id` - Détails d'un service
- `POST /api/services` - Créer un service (admin)
- `PUT /api/services/:id` - Modifier un service (admin)
- `DELETE /api/services/:id` - Supprimer un service (admin)

### Coiffeurs
- `GET /api/barbers` - Lister les coiffeurs
- `GET /api/barbers/:id` - Détails d'un coiffeur
- `POST /api/barbers` - Créer un coiffeur (admin)
- `PUT /api/barbers/:id` - Modifier un coiffeur (admin)
- `DELETE /api/barbers/:id` - Supprimer un coiffeur (admin)

### Administration
- `GET /api/admin/dashboard` - Tableau de bord
- `GET /api/admin/analytics/bookings` - Analytics réservations
- `GET /api/admin/export/bookings` - Export CSV
- `GET /api/admin/settings` - Paramètres
- `PUT /api/admin/settings` - Mettre à jour paramètres

## 🔐 Authentification

L'API utilise JWT pour l'authentification. Inclure le token dans l'en-tête :

```http
Authorization: Bearer <your_jwt_token>
```

## 📊 Base de Données

### Modèles principaux

- **Location** : Salons/Adresses
- **Barber** : Coiffeurs
- **Service** : Services proposés
- **Booking** : Réservations
- **Admin** : Administrateurs

### Relations

- Barber ↔ Location (Many-to-Many)
- Booking → Location (Many-to-One)
- Booking → Barber (Many-to-One)
- Booking ↔ Service (Many-to-Many)
- Service → Location (Many-to-One)

## 🧪 Tests

```bash
# Lancer les tests
npm test

# Tests avec couverture
npm run test:coverage
```

## 📈 Monitoring

- **Health Check** : `GET /api/health`
- **Logs** : Console + fichiers (production)
- **Métriques** : Analytics intégrées

## 🚀 Déploiement

### Variables d'environnement requises

```env
# Base de données
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=barbershop_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASS=your_app_password

# SMS
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone

# Google Maps
GOOGLE_MAPS_API_KEY=your_google_maps_key

# Serveur
PORT=5001
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

### Docker (optionnel)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5001
CMD ["npm", "start"]
```

## 📝 Scripts Disponibles

- `npm start` - Démarrer en production
- `npm run dev` - Démarrer en développement
- `npm run migrate` - Exécuter les migrations
- `npm test` - Lancer les tests
- `npm run lint` - Vérifier le code

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

MIT License - voir le fichier LICENSE pour plus de détails.

## 🆘 Support

Pour toute question ou problème :
- Créer une issue sur GitHub
- Email : support@barbershop-rennes.fr

---

**Développé avec ❤️ pour Barbershop Moderne Rennes**
