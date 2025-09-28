import React from 'react';
import { motion } from 'framer-motion';
import { FaCut, FaUserTie, FaMapMarkerAlt, FaStar, FaCheck, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
  SEOContainer,
  SEOGrid,
  SEOItem,
  SEOIcon,
  SEOTitle,
  SEODescription,
  SEOFeatures,
  FeatureItem,
  CTAButton,
  SEOStats,
  StatItem,
  StatNumber,
  StatLabel
} from './SEOContent.styles';

const SEOContent = () => {
  const longTailKeywords = [
    {
      keyword: "où trouver un bon barbershop à rennes",
      title: "Où Trouver un Bon Barbershop à Rennes ?",
      description: "Découvrez les meilleurs barbershops de Rennes avec notre guide complet. Salon spécialisé coupe homme, taille barbe et dégradé.",
      icon: <FaMapMarkerAlt />,
      features: [
        "Barber centre-ville Rennes",
        "Barber proche gare Rennes", 
        "Réservation en ligne facile",
        "Prix compétitifs"
      ]
    },
    {
      keyword: "coupe dégradé homme rennes",
      title: "Coupe Dégradé Homme à Rennes",
      description: "Spécialiste coupe dégradé homme à Rennes. Barber tendance avec techniques modernes pour un style unique et contemporain.",
      icon: <FaCut />,
      features: [
        "Techniques modernes",
        "Styles tendance 2025",
        "Coiffeurs expérimentés",
        "Résultat garanti"
      ]
    },
    {
      keyword: "barber spécialisé afro rennes",
      title: "Barber Spécialisé Afro à Rennes",
      description: "Barber afro Rennes expert en coiffure cheveux bouclés et crépus. Soins spécialisés et coupes adaptées à tous types de cheveux.",
      icon: <FaUserTie />,
      features: [
        "Expertise cheveux afro",
        "Produits spécialisés",
        "Techniques adaptées",
        "Conseils personnalisés"
      ]
    },
    {
      keyword: "taille barbe moustache rennes",
      title: "Taille Barbe & Moustache à Rennes",
      description: "Spécialiste taille barbe et moustache à Rennes. Entretien professionnel, formes tendance et soins barbe personnalisés.",
      icon: <FaUserTie />,
      features: [
        "Taille précise",
        "Formes tendance",
        "Soins barbe",
        "Conseils entretien"
      ]
    },
    {
      keyword: "barber avec réservation en ligne rennes",
      title: "Barber avec Réservation en Ligne à Rennes",
      description: "Réservation en ligne facile pour votre barbershop Rennes. Planifiez votre coupe homme, taille barbe en quelques clics.",
      icon: <FaClock />,
      features: [
        "Réservation 24h/24",
        "Annulation gratuite",
        "Rappels automatiques",
        "Historique des RDV"
      ]
    },
    {
      keyword: "top barbershop rennes avis",
      title: "Top Barbershop Rennes - Avis Clients",
      description: "Découvrez pourquoi nous sommes le top barbershop de Rennes selon nos clients. Avis authentiques et témoignages clients.",
      icon: <FaStar />,
      features: [
        "4.8/5 étoiles",
        "127 avis clients",
        "Satisfaction garantie",
        "Clients fidèles"
      ]
    }
  ];

  const stats = [
    { number: "500+", label: "Clients satisfaits" },
    { number: "4.8/5", label: "Note moyenne" },
    { number: "2", label: "Salons à Rennes" },
    { number: "24/7", label: "Réservation en ligne" }
  ];

  return (
    <SEOContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          color: '#1a1a1a',
          fontWeight: '700'
        }}>
          Guide Complet Barbershop Rennes
        </h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.2rem', 
          marginBottom: '3rem',
          color: '#666',
          maxWidth: '800px',
          margin: '0 auto 3rem'
        }}>
          Tout ce que vous devez savoir sur le meilleur barbershop à Rennes : 
          coupe homme, taille barbe, dégradé et réservation en ligne.
        </p>

        <SEOGrid>
          {longTailKeywords.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SEOItem>
                <SEOIcon>{item.icon}</SEOIcon>
                <SEOTitle>{item.title}</SEOTitle>
                <SEODescription>{item.description}</SEODescription>
                <SEOFeatures>
                  {item.features.map((feature, featureIndex) => (
                    <FeatureItem key={featureIndex}>
                      <FaCheck /> {feature}
                    </FeatureItem>
                  ))}
                </SEOFeatures>
                <CTAButton as={Link} to="/booking">
                  Réserver maintenant
                </CTAButton>
              </SEOItem>
            </motion.div>
          ))}
        </SEOGrid>

        <SEOStats>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <StatItem>
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            </motion.div>
          ))}
        </SEOStats>
      </motion.div>
    </SEOContainer>
  );
};

export default SEOContent;
