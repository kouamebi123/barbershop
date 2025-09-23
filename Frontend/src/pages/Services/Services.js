import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaCut, FaUserTie, FaSpa, FaClock, FaStar, FaCheck, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { servicesAPI } from '../../services/api';

import {
  ServicesContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  ServicesSection,
  Container,
  SectionTitle,
  SectionSubtitle,
  ServicesGrid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceDescription,
  ServicePrice,
  ServiceDuration,
  ServiceFeatures,
  FeatureItem,
  CTAButton,
  CategoriesSection,
  CategoryTabs,
  CategoryTab,
  PricingSection,
  PricingCard,
  PricingTitle,
  PricingPrice,
  PricingFeatures,
  BookButton
} from './Services.styles';

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour obtenir l'icône selon la catégorie
  const getServiceIcon = (category) => {
    switch (category) {
      case 'coupe':
        return <FaCut />;
      case 'barbe':
        return <FaUserTie />;
      case 'soins':
        return <FaSpa />;
      default:
        return <FaCut />;
    }
  };

  // Charger les services depuis l'API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Récupérer les services et les catégories en parallèle
        const [servicesResponse, categoriesResponse] = await Promise.all([
          servicesAPI.getAll(),
          servicesAPI.getCategories()
        ]);

        setServices(servicesResponse.data.data?.services || []);
        setCategories(servicesResponse.data.data?.servicesByCategory ? Object.keys(servicesResponse.data.data.servicesByCategory).map(key => ({ id: key, name: key })) : []);
      } catch (err) {
        console.error('Erreur lors du chargement des services:', err);
        setError('Impossible de charger les services. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <ServicesContainer>
      <Helmet>
        <title>Services - Votre Barbershop</title>
        <meta name="description" content="Découvrez nos services de coiffure, taille de barbe et soins du visage. Qualité premium, prix compétitifs." />
        <meta name="keywords" content="coiffure, barbe, soins, rasage, barbershop" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>Nos Services</HeroTitle>
            <HeroSubtitle>
              Découvrez notre gamme complète de services de coiffure et de soins, 
              réalisés par des professionnels expérimentés
            </HeroSubtitle>
          </motion.div>
        </HeroContent>
      </HeroSection>

      {/* Services Section */}
      <ServicesSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Services Disponibles</SectionTitle>
            <SectionSubtitle>
              Choisissez parmi nos services professionnels adaptés à vos besoins
            </SectionSubtitle>

            {/* Category Tabs */}
            <CategoryTabs>
              {categories.map((category) => (
                <CategoryTab
                  key={category.id}
                  active={activeCategory === category.id}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.name}
                </CategoryTab>
              ))}
            </CategoryTabs>

            {/* Services Grid */}
            <ServicesGrid>
              {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>
                  <FaSpinner style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '1rem' }} />
                  <div style={{ fontSize: '1.2rem' }}>Chargement des services...</div>
                </div>
              ) : error ? (
                <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '1.2rem', color: '#e74c3c', marginBottom: '1rem' }}>{error}</div>
                  <button 
                    onClick={() => window.location.reload()} 
                    style={{ 
                      padding: '0.5rem 1rem', 
                      background: '#d4af37', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Réessayer
                  </button>
                </div>
              ) : filteredServices.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem', gridColumn: '1 / -1' }}>
                  <div style={{ fontSize: '1.2rem' }}>Aucun service trouvé pour cette catégorie.</div>
                </div>
              ) : (
                filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ServiceCard>
                      <ServiceIcon>{getServiceIcon(service.category)}</ServiceIcon>
                      <ServiceTitle>{service.name}</ServiceTitle>
                      <ServiceDescription>{service.description}</ServiceDescription>
                      <ServicePrice>{service.price}€</ServicePrice>
                      <ServiceDuration>
                        <FaClock /> {service.duration} min
                      </ServiceDuration>
                      <ServiceFeatures>
                        <FeatureItem>
                          <FaCheck /> Service professionnel
                        </FeatureItem>
                        <FeatureItem>
                          <FaCheck /> Matériel de qualité
                        </FeatureItem>
                        <FeatureItem>
                          <FaCheck /> Réservation facile
                        </FeatureItem>
                      </ServiceFeatures>
                      <CTAButton as={Link} to={`/booking?service=${service.id}`}>
                        Réserver maintenant
                        <FaArrowRight />
                      </CTAButton>
                    </ServiceCard>
                  </motion.div>
                ))
              )}
            </ServicesGrid>
          </motion.div>
        </Container>
      </ServicesSection>

      {/* Pricing Section - Supprimée car les tarifs sont maintenant dynamiques */}
    </ServicesContainer>
  );
};

export default Services;

