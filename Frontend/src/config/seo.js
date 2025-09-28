// Configuration SEO centralisée pour le Barbershop Rennes

export const SEO_CONFIG = {
  // Site principal
  site: {
    name: "Barbershop Rennes",
    url: "https://barbershop-blush-iota.vercel.app",
    description: "Meilleur barbershop à Rennes - Coupe homme, taille barbe, dégradé. Barber tendance avec réservation en ligne.",
    keywords: [
      "barbershop rennes",
      "barber rennes", 
      "coiffeur homme rennes",
      "coiffeur barbe rennes",
      "taille barbe rennes",
      "coupe dégradé rennes",
      "meilleur barbershop rennes",
      "barber tendance rennes",
      "coiffeur homme stylé rennes",
      "barber pas cher rennes",
      "barber afro rennes",
      "barber hipster rennes",
      "coupe homme rennes",
      "coiffure homme tendance rennes",
      "rasage traditionnel rennes",
      "soin barbe rennes",
      "entretien barbe rennes",
      "coupe cheveux barbe rennes"
    ],
    author: "Barbershop Rennes",
    geo: {
      region: "FR-35",
      placename: "Rennes",
      position: "48.1173;-1.6778"
    }
  },

  // Pages avec meta tags spécifiques
  pages: {
    home: {
      title: "Meilleur Barbershop Rennes | Coupe Homme & Taille Barbe | Barber Tendance",
      description: "Meilleur barbershop à Rennes - Coupe homme, taille barbe, dégradé. Barber tendance avec réservation en ligne. Spécialisé coiffure homme stylé Rennes.",
      keywords: [
        "meilleur barbershop rennes",
        "barber rennes",
        "coupe homme rennes",
        "taille barbe rennes",
        "coupe dégradé rennes",
        "barber tendance rennes",
        "coiffeur homme stylé rennes",
        "barber pas cher rennes",
        "barber afro rennes",
        "barber hipster rennes"
      ]
    },
    services: {
      title: "Services Barbershop Rennes | Coupe Homme, Taille Barbe & Soins",
      description: "Services barbershop à Rennes : coupe homme, taille barbe, coupe dégradé, rasage traditionnel, soins barbe. Barber tendance avec réservation en ligne.",
      keywords: [
        "services barbershop rennes",
        "coupe homme rennes",
        "taille barbe rennes", 
        "coupe dégradé rennes",
        "rasage traditionnel rennes",
        "soin barbe rennes",
        "entretien barbe rennes",
        "coupe cheveux barbe rennes",
        "barber tendance rennes",
        "coiffure homme tendance rennes"
      ]
    },
    locations: {
      title: "Barbershop Rennes Centre & Sud | Où Nous Trouver",
      description: "Barbershop Rennes centre-ville et sud. Barber proche gare Rennes, parking gratuit, réservation en ligne. Adresses et horaires des salons.",
      keywords: [
        "barbershop rennes centre",
        "barbershop rennes sud",
        "barber proche gare rennes",
        "barber rennes centre-ville",
        "salon coiffeur rennes",
        "adresse barbershop rennes",
        "horaires barbershop rennes"
      ]
    },
    booking: {
      title: "Réservation Barbershop Rennes | Prendre RDV en Ligne",
      description: "Réservation en ligne facile pour votre barbershop à Rennes. Planifiez votre coupe homme, taille barbe et dégradé en quelques clics.",
      keywords: [
        "réservation barbershop rennes",
        "rdv coiffeur rennes",
        "prendre rendez-vous barbershop rennes",
        "réservation en ligne rennes",
        "barber avec réservation en ligne rennes"
      ]
    },
    about: {
      title: "À Propos | Meilleur Barbershop Rennes - Notre Histoire",
      description: "Découvrez l'histoire du meilleur barbershop de Rennes. Équipe professionnelle, expertise coupe homme et taille barbe depuis des années.",
      keywords: [
        "à propos barbershop rennes",
        "histoire barbershop rennes",
        "équipe barbershop rennes",
        "expertise coiffeur rennes",
        "maître barbier rennes"
      ]
    },
    contact: {
      title: "Contact Barbershop Rennes | Adresse & Téléphone",
      description: "Contactez le meilleur barbershop de Rennes. Adresses, téléphones, horaires et formulaire de contact pour vos questions.",
      keywords: [
        "contact barbershop rennes",
        "adresse barbershop rennes",
        "téléphone barbershop rennes",
        "horaires barbershop rennes",
        "barbershop rennes contact"
      ]
    }
  },

  // Mots-clés longue traîne
  longTailKeywords: [
    "où trouver un bon barbershop à rennes",
    "coupe dégradé homme rennes",
    "barber spécialisé afro rennes", 
    "taille barbe moustache rennes",
    "barber avec réservation en ligne rennes",
    "barber rennes centre-ville",
    "barber proche gare rennes",
    "top barbershop rennes avis",
    "conseils entretien barbe rennes",
    "idées coiffure homme rennes",
    "tendance coupe homme 2025 rennes"
  ],

  // Données structurées Schema.org
  structuredData: {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "name": "Barbershop Rennes",
    "alternateName": "Meilleur Barbershop Rennes",
    "description": "Meilleur barbershop à Rennes spécialisé en coupe homme, taille barbe et dégradé. Barber tendance avec services modernes et équipe professionnelle.",
    "url": "https://barbershop-blush-iota.vercel.app",
    "telephone": "+33 2 99 12 34 56",
    "email": "contact@barbershop-rennes.fr",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "15 Rue de la Paix",
        "addressLocality": "Rennes",
        "postalCode": "35000",
        "addressCountry": "FR"
      },
      {
        "@type": "PostalAddress", 
        "streetAddress": "42 Avenue de Bretagne",
        "addressLocality": "Rennes",
        "postalCode": "35000",
        "addressCountry": "FR"
      }
    ],
    "openingHours": "Mo-Fr 09:00-19:00,Sa 09:00-18:00,Su 10:00-17:00",
    "priceRange": "€€",
    "paymentAccepted": "Cash, Credit Card",
    "currenciesAccepted": "EUR",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Barbershop",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Coupe Homme",
            "description": "Coupe dégradé moderne pour homme"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Taille Barbe",
            "description": "Taille et entretien de barbe professionnel"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Rasage Traditionnel", 
            "description": "Rasage à l'ancienne avec blaireau et savon"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    },
    "sameAs": [
      "https://www.facebook.com/barbershoprennes",
      "https://www.instagram.com/barbershoprennes"
    ]
  }
};

// Fonction utilitaire pour générer les meta tags
export const generateMetaTags = (page = 'home') => {
  const config = SEO_CONFIG.pages[page] || SEO_CONFIG.pages.home;
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    'og:title': config.title,
    'og:description': config.description,
    'og:url': `${SEO_CONFIG.site.url}${page === 'home' ? '' : `/${page}`}`,
    'twitter:title': config.title,
    'twitter:description': config.description
  };
};
