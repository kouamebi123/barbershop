import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../../config/seo';

const StructuredData = ({ type = 'business', additionalData = {} }) => {
  const getStructuredData = () => {
    const baseData = SEO_CONFIG.structuredData;

    switch (type) {
      case 'business':
        return baseData;
      
      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Services Barbershop Rennes",
          "description": "Coupe homme, taille barbe, dégradé et rasage traditionnel à Rennes",
          "provider": {
            "@type": "HairSalon",
            "name": "Barbershop Rennes",
            "address": baseData.address[0]
          },
          "areaServed": {
            "@type": "City",
            "name": "Rennes",
            "containedInPlace": {
              "@type": "Country",
              "name": "France"
            }
          },
          "hasOfferCatalog": baseData.hasOfferCatalog,
          ...additionalData
        };

      case 'localBusiness':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Barbershop Rennes",
          "description": "Meilleur barbershop à Rennes spécialisé en coiffure homme",
          "url": baseData.url,
          "telephone": baseData.telephone,
          "email": baseData.email,
          "address": baseData.address,
          "openingHours": baseData.openingHours,
          "priceRange": baseData.priceRange,
          "aggregateRating": baseData.aggregateRating,
          ...additionalData
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": additionalData.items || []
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": additionalData.questions || []
        };

      default:
        return baseData;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData(), null, 2)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
