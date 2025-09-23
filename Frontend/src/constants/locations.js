// Constantes pour la page des localisations
export const LOCATIONS_HERO = {
  title: 'Nos Salons',
  subtitle: 'Découvrez nos différents emplacements',
  description: 'Trouvez le salon le plus proche de chez vous et découvrez nos différents emplacements avec leurs horaires et services.'
};

export const LOCATION_FEATURES = [
  {
    id: 1,
    title: 'Emplacements Stratégiques',
    description: 'Nos salons sont situés dans des emplacements facilement accessibles.',
    icon: 'FaMapMarkerAlt'
  },
  {
    id: 2,
    title: 'Horaires Flexibles',
    description: 'Nous sommes ouverts 7 jours sur 7 pour s\'adapter à votre emploi du temps.',
    icon: 'FaClock'
  },
  {
    id: 3,
    title: 'Services Complets',
    description: 'Chaque salon propose la gamme complète de nos services.',
    icon: 'FaCut'
  },
  {
    id: 4,
    title: 'Équipe Qualifiée',
    description: 'Des professionnels expérimentés dans chaque salon.',
    icon: 'FaUsers'
  }
];

export const LOCATION_AMENITIES = [
  {
    id: 1,
    title: 'Parking Gratuit',
    description: 'Parking disponible gratuitement pour tous nos clients.',
    icon: 'FaParking'
  },
  {
    id: 2,
    title: 'WiFi Gratuit',
    description: 'Accès WiFi gratuit pendant votre visite.',
    icon: 'FaWifi'
  },
  {
    id: 3,
    title: 'Boissons Gratuites',
    description: 'Café, thé et boissons fraîches offerts.',
    icon: 'FaCoffee'
  },
  {
    id: 4,
    title: 'Magazines et Presse',
    description: 'Large sélection de magazines et journaux.',
    icon: 'FaNewspaper'
  },
  {
    id: 5,
    title: 'Climatisation',
    description: 'Environnement climatisé pour votre confort.',
    icon: 'FaSnowflake'
  },
  {
    id: 6,
    title: 'Accessibilité',
    description: 'Salons accessibles aux personnes à mobilité réduite.',
    icon: 'FaWheelchair'
  }
];

export const LOCATION_HOURS = {
  title: 'Horaires d\'ouverture',
  subtitle: 'Nous sommes ouverts 7 jours sur 7',
  schedule: [
    { day: 'Lundi', hours: '9h00 - 19h00' },
    { day: 'Mardi', hours: '9h00 - 19h00' },
    { day: 'Mercredi', hours: '9h00 - 19h00' },
    { day: 'Jeudi', hours: '9h00 - 19h00' },
    { day: 'Vendredi', hours: '9h00 - 19h00' },
    { day: 'Samedi', hours: '9h00 - 19h00' },
    { day: 'Dimanche', hours: '9h00 - 19h00' }
  ]
};

export const LOCATION_CONTACT = {
  title: 'Nous Contacter',
  subtitle: 'Des questions sur nos salons ?',
  description: 'N\'hésitez pas à nous contacter pour toute question concernant nos salons, leurs services ou leurs horaires.',
  contactInfo: {
    phone: '06 12 34 56 78',
    email: 'contact@barbershop.fr',
    address: 'Rennes'
  }
};

export const LOCATION_BOOKING = {
  title: 'Réservez dans ce salon',
  subtitle: 'Choisissez votre service et réservez votre créneau',
  description: 'Sélectionnez le service qui vous intéresse et réservez votre créneau dans ce salon.',
  ctaText: 'Réserver maintenant'
};
