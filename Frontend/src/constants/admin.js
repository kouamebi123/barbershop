// Constantes pour l'administration
export const ADMIN_LOGIN = {
  title: 'Connexion Administrateur',
  subtitle: 'Accédez à l\'espace d\'administration',
  description: 'Connectez-vous pour accéder au tableau de bord d\'administration et gérer votre barbershop.',
  form: {
    username: {
      label: 'Nom d\'utilisateur',
      placeholder: 'admin',
      type: 'text',
      required: true
    },
    password: {
      label: 'Mot de passe',
      placeholder: 'Votre mot de passe',
      type: 'password',
      required: true
    },
    remember: {
      label: 'Se souvenir de moi',
      type: 'checkbox'
    },
    submit: {
      text: 'Se connecter',
      loading: 'Connexion en cours...'
    }
  },
  errors: {
    invalidCredentials: 'Email ou mot de passe incorrect',
    required: 'Tous les champs sont requis',
    network: 'Erreur de connexion. Veuillez réessayer.'
  }
};

export const ADMIN_DASHBOARD = {
  title: 'Tableau de Bord',
  subtitle: 'Gestion de votre barbershop',
  description: 'Surveillez les performances et gérez votre barbershop depuis ce tableau de bord.',
  stats: {
    totalBookings: {
      title: 'Réservations Total',
      icon: 'FaCalendarAlt',
      color: '#3498db'
    },
    totalRevenue: {
      title: 'Chiffre d\'Affaires',
      icon: 'FaDollarSign',
      color: '#27ae60'
    },
    totalClients: {
      title: 'Clients Uniques',
      icon: 'FaUsers',
      color: '#e74c3c'
    },
    totalLocations: {
      title: 'Salons Actifs',
      icon: 'FaMapMarkerAlt',
      color: '#f39c12'
    }
  },
  sections: {
    recentBookings: {
      title: 'Réservations Récentes',
      subtitle: 'Les dernières réservations enregistrées'
    },
    popularServices: {
      title: 'Services Populaires',
      subtitle: 'Les services les plus demandés'
    },
    locations: {
      title: 'Salons',
      subtitle: 'Gestion de vos salons'
    },
  }
};

export const ADMIN_NAVIGATION = [
  {
    id: 'dashboard',
    title: 'Tableau de Bord',
    icon: 'FaTachometerAlt',
    path: '/admin/dashboard'
  },
  {
    id: 'bookings',
    title: 'Réservations',
    icon: 'FaCalendarAlt',
    path: '/admin/bookings'
  },
  {
    id: 'clients',
    title: 'Clients',
    icon: 'FaUsers',
    path: '/admin/clients'
  },
  {
    id: 'services',
    title: 'Services',
    icon: 'FaCut',
    path: '/admin/services'
  },
  {
    id: 'locations',
    title: 'Salons',
    icon: 'FaMapMarkerAlt',
    path: '/admin/locations'
  },
  {
    id: 'testimonials',
    title: 'Témoignages',
    icon: 'FaQuoteLeft',
    path: '/admin/testimonials'
  },
  {
    id: 'settings',
    title: 'Paramètres',
    icon: 'FaCog',
    path: '/admin/settings'
  }
];

export const ADMIN_ACTIONS = {
  create: 'Créer',
  edit: 'Modifier',
  delete: 'Supprimer',
  view: 'Voir',
  export: 'Exporter',
  import: 'Importer',
  refresh: 'Actualiser',
  search: 'Rechercher',
  filter: 'Filtrer',
  sort: 'Trier'
};

export const ADMIN_STATUS = {
  active: 'Actif',
  inactive: 'Inactif',
  pending: 'En attente',
  confirmed: 'Confirmé',
  cancelled: 'Annulé',
  completed: 'Terminé'
};
