// Constantes pour la page de réservation
export const BOOKING_HERO = {
  title: 'Réservez Votre Rendez-vous',
  subtitle: 'Choisissez votre service, votre coiffeur et votre créneau en quelques clics',
  description: 'Réservez facilement votre rendez-vous chez Barbershop. Choisissez votre service, votre coiffeur et votre créneau.'
};

export const BOOKING_STEPS = [
  {
    id: 1,
    title: 'Choisir un service',
    description: 'Sélectionnez le ou les services que vous souhaitez',
    icon: 'FaCut'
  },
  {
    id: 2,
    title: 'Sélectionner un salon',
    description: 'Choisissez le salon le plus proche de chez vous',
    icon: 'FaMapMarkerAlt'
  },
  {
    id: 3,
    title: 'Choisir un coiffeur',
    description: 'Sélectionnez votre coiffeur préféré',
    icon: 'FaUserTie'
  },
  {
    id: 4,
    title: 'Sélectionner une date',
    description: 'Choisissez la date et l\'heure de votre rendez-vous',
    icon: 'FaCalendarAlt'
  },
  {
    id: 5,
    title: 'Confirmer',
    description: 'Vérifiez vos informations et confirmez votre réservation',
    icon: 'FaCheck'
  }
];

export const BOOKING_FORM = {
  personalInfo: {
    title: 'Informations personnelles',
    fields: {
      firstName: {
        label: 'Prénom',
        placeholder: 'Votre prénom',
        required: true
      },
      lastName: {
        label: 'Nom',
        placeholder: 'Votre nom',
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
        type: 'tel',
        required: true
      }
    }
  },
  appointment: {
    title: 'Détails du rendez-vous',
    fields: {
      date: {
        label: 'Date du rendez-vous',
        placeholder: 'Sélectionnez une date',
        required: true
      },
      time: {
        label: 'Heure du rendez-vous',
        placeholder: 'Sélectionnez une heure',
        required: true
      },
      notes: {
        label: 'Notes (optionnel)',
        placeholder: 'Des informations particulières ?',
        type: 'textarea'
      }
    }
  }
};

export const BOOKING_SUCCESS = {
  title: 'Réservation Confirmée !',
  subtitle: 'Votre rendez-vous a été réservé avec succès',
  description: 'Vous recevrez un email de confirmation avec tous les détails de votre rendez-vous.',
  actions: {
    newBooking: 'Nouvelle réservation',
    viewBooking: 'Voir ma réservation',
    home: 'Retour à l\'accueil'
  }
};

export const BOOKING_ERRORS = {
  required: 'Ce champ est requis',
  email: 'Veuillez entrer une adresse email valide',
  phone: 'Veuillez entrer un numéro de téléphone valide',
  date: 'Veuillez sélectionner une date valide',
  time: 'Veuillez sélectionner une heure valide',
  service: 'Veuillez sélectionner au moins un service',
  location: 'Veuillez sélectionner un salon',
};

export const BOOKING_VALIDATION = {
  minNameLength: 2,
  maxNameLength: 50,
  minPhoneLength: 10,
  maxPhoneLength: 15,
  maxNotesLength: 500
};
