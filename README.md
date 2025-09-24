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

## 🔒 Sécurité

Ce projet implémente plusieurs couches de sécurité pour protéger les données et l'infrastructure, démontrant une approche professionnelle de la cybersécurité.

### 🛡️ Mesures de Sécurité Implémentées

#### 1. **Authentification et Autorisation**
- **JWT (JSON Web Tokens)** : Authentification stateless avec expiration (24h)
- **Hachage bcrypt professionnel** : Salt rounds (12) pour une sécurité maximale
- **Gestion des rôles** : Système de permissions granulaire (super_admin, admin, manager)
- **Validation des tokens** : Vérification de l'existence et de l'état actif des utilisateurs
- **Protection des routes** : Middleware d'authentification sur toutes les routes sensibles
- **Hooks automatiques** : Hachage automatique des mots de passe à la création/mise à jour

#### 2. **Protection contre les Attaques Web**
- **Helmet.js** : Protection des en-têtes HTTP (XSS, Clickjacking, etc.)
- **CORS configuré** : Restriction des origines autorisées
- **Rate Limiting** : Protection contre les attaques par déni de service (100 req/15min)
- **Validation des entrées** : Schémas Joi pour valider toutes les données utilisateur
- **Protection CSRF** : Configuration CORS avec credentials

#### 3. **Sécurité des Données**
- **Validation côté serveur** : Double validation (frontend + backend) avec schémas Joi
- **Échappement des données** : Protection contre l'injection SQL via Sequelize ORM
- **Chiffrement des mots de passe** : Hachage bcrypt avec salt automatique (12 rounds)
- **Gestion des erreurs** : Messages d'erreur sécurisés (pas d'exposition d'informations sensibles)
- **Logs sécurisés** : Gestion des erreurs sans exposition de données sensibles
- **UUID pour les clés primaires** : Identifiants non séquentiels pour éviter l'énumération

#### 4. **Sécurité de l'Infrastructure**
- **Variables d'environnement** : Séparation des secrets de configuration
- **Base de données sécurisée** : Connexions chiffrées PostgreSQL
- **Gestion des sessions** : Tokens JWT avec expiration automatique
- **Monitoring** : Logs d'erreurs et de sécurité

#### 5. **Bonnes Pratiques de Développement**
- **Principe du moindre privilège** : Permissions granulaires par rôle
- **Validation stricte** : Contrôles de type et de format sur toutes les entrées
- **Gestion d'erreurs robuste** : Try-catch avec messages d'erreur appropriés
- **Code sécurisé** : Pas d'exposition de données sensibles dans les réponses
- **Architecture en couches** : Séparation claire des responsabilités (MVC)
- **Tests de sécurité** : Validation des entrées et gestion des cas d'erreur

### 🔐 Implémentation Technique

#### Middleware de Sécurité
```javascript
// Protection des en-têtes HTTP
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite de 100 requêtes par IP
});

// CORS sécurisé
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

#### Authentification JWT
```javascript
// Génération de token sécurisé
const token = jwt.sign(
  { id: admin.id, username: admin.username, role: admin.role },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);

// Vérification et validation
const decoded = jwt.verify(token, process.env.JWT_SECRET);
const admin = await Admin.findByPk(decoded.id);
if (!admin || !admin.isActive) {
  return res.status(401).json({ error: 'Token invalide' });
}
```

#### Hachage des Mots de Passe
```javascript
// Hachage automatique avec bcrypt (salt rounds: 12)
hooks: {
  beforeCreate: async (admin) => {
    if (admin.password) {
      admin.password = await bcrypt.hash(admin.password, 12);
    }
  },
  beforeUpdate: async (admin) => {
    if (admin.changed('password')) {
      admin.password = await bcrypt.hash(admin.password, 12);
    }
  }
}

// Méthode de vérification sécurisée
Admin.prototype.checkPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};
```

#### Validation des Données
```javascript
// Schéma de validation Joi
const contactSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).max(1000).required()
});
```

### 🚨 Gestion des Menaces

#### Protection contre les Vulnérabilités OWASP Top 10
1. **Injection** : Protection via Sequelize ORM et validation Joi
2. **Authentification défaillante** : JWT + bcrypt + validation stricte
3. **Exposition de données sensibles** : Filtrage des données dans les réponses
4. **XML External Entities** : Pas d'utilisation de XML
5. **Contrôle d'accès défaillant** : Système de rôles et permissions
6. **Configuration de sécurité défaillante** : Variables d'environnement + Helmet
7. **Cross-Site Scripting** : Protection via Helmet et validation
8. **Désérialisation non sécurisée** : Utilisation de JSON sécurisé
9. **Composants avec vulnérabilités** : Dépendances mises à jour
10. **Journalisation et monitoring insuffisants** : Logs d'erreurs et monitoring

### 📊 Monitoring et Audit

- **Logs de sécurité** : Enregistrement des tentatives d'authentification
- **Gestion des erreurs** : Logs détaillés sans exposition de données sensibles
- **Monitoring des performances** : Rate limiting et gestion des ressources
- **Audit des accès** : Traçabilité des actions administrateur
- **Health checks** : Endpoint `/api/health` pour monitoring
- **Métriques de sécurité** : Suivi des échecs d'authentification et tentatives d'intrusion

### 🔧 Recommandations de Déploiement

#### Variables d'Environnement Sécurisées
```env
# Secrets de production
JWT_SECRET=your_very_strong_secret_key_here
DB_PASSWORD=strong_database_password
EMAIL_PASS=app_specific_password
TWILIO_AUTH_TOKEN=twilio_auth_token
```

#### Configuration de Production
- Utiliser HTTPS en production
- Configurer un reverse proxy (Nginx)
- Mettre en place un firewall
- Utiliser des certificats SSL/TLS valides
- Implémenter un système de backup sécurisé

### 🎯 **Compétences en Cybersécurité Démontrées**

Ce projet illustre une maîtrise des concepts fondamentaux de la cybersécurité :

- **🔐 Cryptographie** : Implémentation JWT et hachage bcrypt professionnel
- **🛡️ Sécurité Web** : Protection contre les vulnérabilités OWASP Top 10
- **🔒 Authentification** : Système d'authentification robuste avec gestion des rôles
- **📊 Monitoring** : Logs de sécurité et audit des accès
- **⚡ Développement Sécurisé** : Bonnes pratiques de codage sécurisé

Cette implémentation démontre une compréhension approfondie des enjeux de cybersécurité et l'application de bonnes pratiques professionnelles pour protéger les données et l'infrastructure.

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