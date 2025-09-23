import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlay, FaSpinner } from 'react-icons/fa';
import { statsAPI } from '../../services/api';
import { HERO_DATA } from '../../constants';

import {
  HeroContainer,
  HeroContent,
  HeroText,
  HeroTitle,
  HeroSubtitle,
  HeroDescription,
  HeroButtons,
  Button,
  ButtonSecondary,
  HeroImage,
  HeroStats,
  StatItem,
  StatNumber,
  StatLabel
} from './Hero.styles';

const Hero = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les statistiques depuis l'API
    const fetchStats = async () => {
      try {
        console.log('🔍 [Hero] Fetching stats...');
        const response = await statsAPI.getGeneralStats();
        console.log('🔍 [Hero] Stats API Response:', {
          success: response.data.success,
          message: response.data.message,
          dataType: typeof response.data.data,
          dataKeys: response.data.data ? Object.keys(response.data.data) : 'No data'
        });
        
        const data = response.data.data; // Accéder à la propriété 'data' de la réponse
        console.log('🔍 [Hero] Stats data:', data);
        
        // Transformer les données en format d'affichage
        const statsData = [
          { number: `${data.totalBookings}+`, label: 'Réservations' },
          { number: data.totalLocations, label: 'Salons' },
        ];
        
        console.log('🔍 [Hero] Processed stats:', statsData);
        setStats(statsData);
      } catch (error) {
        console.error('❌ [Hero] Erreur lors du chargement des statistiques:', error);
        setStats([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <HeroContainer>
      <HeroContent>
        <HeroText>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>
              Votre <span>coiffeur de confiance</span>
            </HeroTitle>
            <HeroSubtitle>
              L'art de la coiffure masculine moderne
            </HeroSubtitle>
            <HeroDescription>
              Découvrez une expérience de coiffure exceptionnelle avec nos maîtres barbiers. 
              Services premium, ambiance moderne et réservation en ligne simple et rapide.
            </HeroDescription>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <HeroButtons>
              <Button as={Link} to="/booking">
                Réserver maintenant
                <FaArrowRight />
              </Button>
              <ButtonSecondary>
                <FaPlay />
                Voir la vidéo
              </ButtonSecondary>
            </HeroButtons>
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ textAlign: 'center', padding: '2rem' }}
            >
              <FaSpinner style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '1rem' }} />
              <div style={{ fontSize: '1.2rem' }}>Chargement des statistiques...</div>
            </motion.div>
          ) : stats.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <HeroStats>
                {stats.map((stat, index) => (
                  <StatItem key={index}>
                    <StatNumber>{stat.number}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                  </StatItem>
                ))}
              </HeroStats>
            </motion.div>
          ) : null}
        </HeroText>

        <HeroImage>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="hero-image-placeholder">
              <div className="image-content">
                <h3>Votre Barbershop</h3>
                <p>L'excellence de la coiffure masculine</p>
              </div>
            </div>
          </motion.div>
        </HeroImage>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;

