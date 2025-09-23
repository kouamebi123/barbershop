# Barbershop Website

Un site web moderne pour un barbershop avec système de réservation en ligne.

## 🚀 Fonctionnalités

- **Frontend React** : Interface utilisateur moderne et responsive
- **Backend Node.js/Express** : API RESTful avec authentification
- **Base de données PostgreSQL** : Stockage des données avec Sequelize ORM
- **Système de réservation** : Réservation en ligne avec créneaux disponibles
- **Gestion des témoignages** : Système de témoignages avec modération
- **Dashboard administrateur** : Interface d'administration complète
- **Notifications** : Email et SMS pour les réservations

## 🛠️ Technologies

### Frontend
- React 18
- React Router
- Styled Components
- Framer Motion
- React Helmet Async
- Axios
- React Toastify

### Backend
- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL
- JWT Authentication
- Nodemailer
- Twilio (SMS)
- Node-cron

## 📁 Structure du projet

```
barbershop-website/
├── Backend/                 # API Backend
│   ├── config/             # Configuration base de données
│   ├── controllers/        # Contrôleurs MVC
│   ├── middleware/         # Middleware d'authentification
│   ├── models/            # Modèles Sequelize
│   ├── routes/            # Routes API
│   ├── services/          # Services (notifications, scheduler)
│   ├── scripts/           # Scripts de gestion des données
│   └── server.js          # Point d'entrée du serveur
├── Frontend/              # Application React
│   ├── public/            # Fichiers statiques
│   ├── src/               # Code source React
│   │   ├── components/    # Composants réutilisables
│   │   ├── contexts/      # Contextes React
│   │   ├── pages/         # Pages de l'application
│   │   ├── services/      # Services API
│   │   ├── styles/        # Styles globaux
│   │   └── utils/         # Utilitaires
│   └── package.json
└── README.md
```

## 🚀 Installation

### Prérequis
- Node.js (v16 ou supérieur)
- PostgreSQL (v12 ou supérieur)
- npm ou yarn

### 1. Cloner le repository
```bash
git clone <repository-url>
cd barbershop-website
```

### 2. Configuration de la base de données
```bash
# Créer une base de données PostgreSQL
createdb barbershop_db

# Configurer les variables d'environnement
cp Backend/env.example Backend/.env
# Éditer Backend/.env avec vos paramètres de base de données
```

### 3. Installation des dépendances
```bash
# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 4. Initialisation de la base de données
```bash
cd Backend
npm run migrate
npm run seed
```

### 5. Démarrage des serveurs
```bash
# Terminal 1 - Backend (port 5001)
cd Backend
npm start

# Terminal 2 - Frontend (port 3000)
cd Frontend
npm start
```

## 🌐 URLs

- **Frontend** : http://localhost:3000
- **Backend API** : http://localhost:5001
- **Dashboard Admin** : http://localhost:3000/admin/dashboard

## 📊 API Endpoints

### Public
- `GET /api/locations` - Liste des salons
- `GET /api/services` - Liste des services
- `GET /api/barbers` - Liste des coiffeurs
- `GET /api/bookings/availability/:barberId` - Créneaux disponibles
- `POST /api/bookings` - Créer une réservation
- `POST /api/testimonials` - Soumettre un témoignage
- `POST /api/contact` - Formulaire de contact

### Admin (Authentifié)
- `GET /api/admin/bookings` - Gestion des réservations
- `GET /api/admin/testimonials` - Gestion des témoignages
- `GET /api/admin/stats` - Statistiques
- `POST /api/admin/login` - Connexion admin

## 🔧 Scripts disponibles

### Backend
```bash
npm start              # Démarrer le serveur
npm run migrate        # Migrer la base de données
npm run seed           # Peupler la base de données
npm run clean          # Nettoyer les données de test
npm run reset          # Réinitialiser la base de données
```

### Frontend
```bash
npm start              # Démarrer en mode développement
npm run build          # Build de production
npm test               # Lancer les tests
```

## 🔐 Authentification

### Admin
- **Email** : admin@barbershop.com
- **Mot de passe** : admin123

## 📱 Fonctionnalités principales

### Pour les clients
- ✅ Navigation intuitive
- ✅ Réservation en ligne
- ✅ Sélection de services et coiffeurs
- ✅ Créneaux disponibles en temps réel
- ✅ Soumission de témoignages
- ✅ Formulaire de contact
- ✅ Design responsive

### Pour les administrateurs
- ✅ Dashboard complet
- ✅ Gestion des réservations
- ✅ Gestion des témoignages
- ✅ Statistiques en temps réel
- ✅ Notifications automatiques

## 🚀 Déploiement

### Variables d'environnement requises

#### Backend (.env)
```env
PORT=5001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=barbershop_db
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

#### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5001/api
```