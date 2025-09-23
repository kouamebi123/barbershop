// Constantes pour la page de contact
export const CONTACT_HERO = {
  title: 'Contactez-nous',
  subtitle: 'Nous sommes là pour répondre à toutes vos questions',
  description: 'N\'hésitez pas à nous contacter pour toute question, réservation ou information. Notre équipe est à votre disposition.'
};

export const CONTACT_INFO = {
  phone: {
    title: 'Téléphone',
    value: '06 12 34 56 78',
    icon: 'FaPhone',
    description: 'Appelez-nous pour toute question ou réservation'
  },
  email: {
    title: 'Email',
    value: 'contact@barbershop.fr',
    icon: 'FaEnvelope',
    description: 'Envoyez-nous un email à tout moment'
  },
  reservationEmail: {
    title: 'Réservations',
    value: 'reservation@barbershop.fr',
    icon: 'FaCalendarAlt',
    description: 'Email dédié aux réservations'
  },
  address: {
    title: 'Adresse',
    value: 'Rennes',
    icon: 'FaMapMarkerAlt',
    description: 'Retrouvez-nous dans nos différents salons'
  }
};

export const CONTACT_FORM = {
  title: 'Envoyez-nous un message',
  subtitle: 'Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais',
  fields: {
    name: {
      label: 'Nom complet',
      placeholder: 'Votre nom complet',
      required: true
    },
    email: {
      label: 'Email',
      placeholder: 'votre@email.com',
      type: 'email',
      required: true
    },
    phone: {
      label: 'Téléphone',
      placeholder: 'Votre numéro de téléphone',
      type: 'tel'
    },
    subject: {
      label: 'Sujet',
      placeholder: 'Sujet de votre message',
      required: true
    },
    message: {
      label: 'Message',
      placeholder: 'Votre message...',
      type: 'textarea',
      required: true
    }
  },
  submit: {
    text: 'Envoyer le message',
    loading: 'Envoi en cours...',
    success: 'Message envoyé avec succès !',
    error: 'Erreur lors de l\'envoi du message'
  }
};

export const CONTACT_SUGGESTIONS = [
  {
    id: 1,
    title: 'Réservation',
    description: 'Réservez votre rendez-vous en ligne ou par téléphone',
    icon: 'FaCalendarAlt',
    action: 'Réserver maintenant'
  },
  {
    id: 2,
    title: 'Informations sur les services',
    description: 'Découvrez tous nos services et tarifs',
    icon: 'FaCut',
    action: 'Voir nos services'
  },
  {
    id: 3,
    title: 'Localisation des salons',
    description: 'Trouvez le salon le plus proche de chez vous',
    icon: 'FaMapMarkerAlt',
    action: 'Voir nos salons'
  },
  {
    id: 4,
    title: 'Questions fréquentes',
    description: 'Consultez nos réponses aux questions les plus courantes',
    icon: 'FaQuestionCircle',
    action: 'Voir les FAQ'
  }
];

export const CONTACT_HOURS = {
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

export const CONTACT_LOCATIONS = {
  title: 'Nos Emplacements',
  subtitle: 'Retrouvez-nous dans nos différents salons',
  description: 'Trouvez le salon le plus proche de chez vous et découvrez nos différents emplacements.'
};
