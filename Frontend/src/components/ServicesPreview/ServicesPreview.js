import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaCut, FaUserTie, FaSpa, FaSpinner } from 'react-icons/fa';
import { servicesAPI } from '../../services/api';

import {
  Section,
  Container,
  SectionTitle,
  SectionSubtitle,
  Grid,
  ServiceCard,
  ServiceIcon,
  ServiceTitle,
  ServiceDescription,
  ServicePrice,
  ViewAllButton
} from './ServicesPreview.styles';

const ServicesPreview = () => {
  const [services, setServices] = useState([]);
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

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔍 [ServicesPreview] Fetching services...');
        const response = await servicesAPI.getAll();
        console.log('🔍 [ServicesPreview] API Response:', {
          success: response.data.success,
          message: response.data.message,
          dataType: typeof response.data.data,
          dataKeys: response.data.data ? Object.keys(response.data.data) : 'No data',
          servicesCount: response.data.data?.services ? response.data.data.services.length : 'No services property'
        });
        
        // Prendre seulement les 3 premiers services pour l'aperçu
        const servicesData = response.data.data?.services || response.data.data || [];
        console.log('🔍 [ServicesPreview] Services data:', servicesData);
        setServices(Array.isArray(servicesData) ? servicesData.slice(0, 3) : []);
      } catch (err) {
        console.error('❌ [ServicesPreview] Erreur lors du chargement des services:', err);
        setError('Impossible de charger les services.');
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Nos services</SectionTitle>
          <SectionSubtitle>
            Découvrez notre gamme complète de services de coiffure et de soins
          </SectionSubtitle>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <FaSpinner style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '1rem' }} />
              <div style={{ fontSize: '1.2rem' }}>Chargement des services...</div>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
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
          ) : services.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '1.2rem' }}>Aucun service trouvé.</div>
            </div>
          ) : (
            <Grid>
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <ServiceCard>
                    <ServiceIcon>{getServiceIcon(service.category)}</ServiceIcon>
                    <ServiceTitle>{service.name}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                    <ServicePrice>{service.price}€</ServicePrice>
                  </ServiceCard>
                </motion.div>
              ))}
            </Grid>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginTop: '3rem' }}
          >
            <ViewAllButton as={Link} to="/services">
              Voir tous les services
              <FaArrowRight />
            </ViewAllButton>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default ServicesPreview;
