# Gestion des Données - Barbershop API

## 📋 Scripts Disponibles

### 🗄️ Gestion de la Base de Données

```bash
# Créer la base de données
npm run db:create

# Supprimer la base de données
npm run db:drop

# Réinitialiser complètement la base de données
npm run db:reset

# Appliquer les migrations
npm run migrate
```

### 🌱 Gestion des Données

```bash
# Insérer des données de test
npm run seed

# Nettoyer les données de test
npm run clean

# Réinitialiser complètement la base de données
npm run reset
```

## 🔄 Workflow Recommandé

### 1. **Développement Initial**
```bash
# Créer et configurer la base de données
npm run db:create
npm run migrate
npm run seed
```

### 2. **Nettoyage des Données de Test**
```bash
# Supprimer les données de test
npm run clean

# Réinsérer des données propres
npm run seed
```

### 3. **Réinitialisation Complète**
```bash
# Supprimer et recréer tout
npm run reset
npm run seed
```

## 📊 Données de Test Incluses

### 👨‍💼 Admin
- **Username**: `admin`
- **Email**: `admin@barbershop-rennes.fr`
- **Password**: `admin123`
- **Role**: `super_admin`

### 🏢 Locations (3 salons)
1. **Salon Centre-Ville** - 12 Rue de la Barbe, Rennes
2. **Salon Nord** - 45 Avenue de Bretagne, Rennes
3. **Salon Sud** - 78 Rue de Nantes, Rennes

### 👨‍💼 Coiffeurs (3 professionnels)
1. **Jean Dupont** - Spécialiste coupe classique et moderne
2. **Pierre Martin** - Expert taille de barbe et rasage
3. **Marc Bernard** - Spécialiste coupe tendance et coloration

### ✂️ Services (6 services)
1. **Coupe de cheveux** - 25€ (30 min)
2. **Taille de barbe** - 20€ (25 min)
3. **Rasage traditionnel** - 30€ (40 min)
4. **Coupe + Barbe** - 40€ (50 min)
5. **Soins du visage** - 35€ (45 min)
6. **Coloration** - 45€ (60 min)

## 🚨 Important

- **Ne jamais** exécuter `npm run reset` en production
- **Toujours** sauvegarder les données importantes avant le nettoyage
- Les données de test sont **uniquement** pour le développement

## 🔧 Configuration

Assurez-vous que votre fichier `.env` contient les bonnes informations de connexion à la base de données :

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=barbershop_db
DB_USER=barbershop_user
DB_PASSWORD=your_password
```
