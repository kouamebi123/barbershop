import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCut, FaMapMarkerAlt, FaCalendarAlt, FaStar, FaUserTie } from 'react-icons/fa';

import {
  InternalLinksContainer,
  LinksGrid,
  LinkCard,
  LinkIcon,
  LinkTitle,
  LinkDescription,
  LinkButton,
  SEOKeywords
} from './InternalLinks.styles';

const InternalLinks = () => {
  const internalLinks = [
    {
      icon: <FaCut />,
      title: "Services Barbershop Rennes",
      description: "Découvrez nos services : coupe homme, taille barbe, dégradé et rasage traditionnel à Rennes.",
      link: "/services",
      keywords: ["services barbershop rennes", "coupe homme rennes", "taille barbe rennes", "coupe dégradé rennes"]
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Où Nous Trouver à Rennes",
      description: "Barbershop Rennes centre-ville et sud. Barber proche gare avec parking gratuit.",
      link: "/locations", 
      keywords: ["barbershop rennes centre", "barber proche gare rennes", "salon coiffeur rennes"]
    },
    {
      icon: <FaCalendarAlt />,
      title: "Réservation en Ligne",
      description: "Prenez rendez-vous facilement pour votre coupe homme ou taille barbe à Rennes.",
      link: "/booking",
      keywords: ["réservation barbershop rennes", "rdv coiffeur rennes", "barber avec réservation en ligne rennes"]
    },
    {
      icon: <FaStar />,
      title: "Avis Clients Barbershop",
      description: "Découvrez pourquoi nous sommes le top barbershop de Rennes selon nos clients.",
      link: "/testimonials",
      keywords: ["top barbershop rennes avis", "avis barbershop rennes", "meilleur barbershop rennes"]
    },
    {
      icon: <FaUserTie />,
      title: "Barber Afro Spécialisé",
      description: "Spécialiste coiffure cheveux afro à Rennes. Barber expert en cheveux bouclés et crépus.",
      link: "/services?category=afro",
      keywords: ["barber spécialisé afro rennes", "coiffeur cheveux afro rennes", "barber afro rennes"]
    }
  ];

  const seoKeywords = [
    "meilleur barbershop rennes",
    "barber tendance rennes", 
    "coiffeur homme stylé rennes",
    "barber pas cher rennes",
    "coupe dégradé homme rennes",
    "taille barbe moustache rennes",
    "barber hipster rennes",
    "où trouver un bon barbershop à rennes"
  ];

  return (
    <InternalLinksContainer>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2rem', 
          marginBottom: '1rem',
          color: '#1a1a1a',
          fontWeight: '700'
        }}>
          Explorez Notre Barbershop à Rennes
        </h2>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '1.1rem', 
          marginBottom: '2rem',
          color: '#666',
          maxWidth: '600px',
          margin: '0 auto 2rem'
        }}>
          Découvrez tous nos services et informations pour le meilleur barbershop de Rennes
        </p>

        <LinksGrid>
          {internalLinks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <LinkCard>
                <LinkIcon>{item.icon}</LinkIcon>
                <LinkTitle>{item.title}</LinkTitle>
                <LinkDescription>{item.description}</LinkDescription>
                <LinkButton as={Link} to={item.link}>
                  Découvrir
                </LinkButton>
              </LinkCard>
            </motion.div>
          ))}
        </LinksGrid>

        <SEOKeywords>
          <h3>Mots-clés recherchés :</h3>
          <div className="keywords-list">
            {seoKeywords.map((keyword, index) => (
              <span key={index} className="keyword-tag">
                {keyword}
              </span>
            ))}
          </div>
        </SEOKeywords>
      </motion.div>
    </InternalLinksContainer>
  );
};

export default InternalLinks;
