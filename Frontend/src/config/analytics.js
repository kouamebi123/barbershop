// Configuration Analytics et Tracking SEO

export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  googleAnalytics: {
    measurementId: process.env.REACT_APP_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    enabled: process.env.NODE_ENV === 'production'
  },

  // Google Tag Manager
  googleTagManager: {
    gtmId: process.env.REACT_APP_GTM_ID || 'GTM-XXXXXXX',
    enabled: process.env.NODE_ENV === 'production'
  },

  // Facebook Pixel
  facebookPixel: {
    pixelId: process.env.REACT_APP_FB_PIXEL_ID || 'XXXXXXXXXXXXXXX',
    enabled: process.env.NODE_ENV === 'production'
  },

  // Événements de conversion à tracker
  conversionEvents: {
    // Réservations
    bookingCompleted: 'booking_completed',
    bookingStarted: 'booking_started',
    
    // Pages vues
    pageView: 'page_view',
    servicePageView: 'service_page_view',
    locationPageView: 'location_page_view',
    
    // Interactions
    phoneClick: 'phone_click',
    emailClick: 'email_click',
    directionsClick: 'directions_click',
    
    // Recherches
    searchPerformed: 'search_performed',
    filterApplied: 'filter_applied'
  },

  // Mots-clés SEO à tracker
  seoKeywords: [
    'barbershop rennes',
    'barber rennes',
    'coiffeur homme rennes',
    'coupe dégradé rennes',
    'taille barbe rennes',
    'meilleur barbershop rennes',
    'barber tendance rennes',
    'coiffeur homme stylé rennes',
    'barber pas cher rennes',
    'barber afro rennes',
    'barber hipster rennes'
  ]
};

// Fonction pour initialiser Google Analytics
export const initGoogleAnalytics = () => {
  if (!ANALYTICS_CONFIG.googleAnalytics.enabled) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.googleAnalytics.measurementId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', ANALYTICS_CONFIG.googleAnalytics.measurementId, {
    page_title: document.title,
    page_location: window.location.href
  });
};

// Fonction pour tracker les conversions
export const trackConversion = (eventName, parameters = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters.label || eventName,
      value: parameters.value || 0,
      ...parameters
    });
  }
};

// Fonction pour tracker les pages vues
export const trackPageView = (pageName, pagePath) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', ANALYTICS_CONFIG.googleAnalytics.measurementId, {
      page_title: pageName,
      page_location: window.location.origin + pagePath,
      page_path: pagePath
    });
  }
};

// Fonction pour tracker les recherches
export const trackSearch = (searchTerm, resultsCount) => {
  trackConversion(ANALYTICS_CONFIG.conversionEvents.searchPerformed, {
    search_term: searchTerm,
    results_count: resultsCount,
    event_category: 'search'
  });
};

// Fonction pour tracker les clics sur les liens
export const trackLinkClick = (linkText, linkUrl, linkType = 'internal') => {
  trackConversion('link_click', {
    link_text: linkText,
    link_url: linkUrl,
    link_type: linkType,
    event_category: 'engagement'
  });
};
