import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

import Hero from '../../components/Hero/Hero';
import ServicesPreview from '../../components/ServicesPreview/ServicesPreview';
import AboutPreview from '../../components/AboutPreview/AboutPreview';
import LocationsPreview from '../../components/LocationsPreview/LocationsPreview';
import Testimonials from '../../components/Testimonials/Testimonials';
import CTA from '../../components/CTA/CTA';

import { FEATURES, STATS, VALUES } from '../../constants';

import {
  HomeContainer,
  Section,
  Container,
  SectionTitle,
  SectionSubtitle,
  Grid,
  Card,
  CardIcon,
  CardTitle,
  CardDescription,
  StatsContainer,
  StatItem,
  StatNumber,
  StatLabel
} from './Home.styles';

const Home = () => {
  // Utilisation des constantes importées
  const features = FEATURES.map(feature => ({
    ...feature,
    icon: <FaStar /> // Remplacer par l'icône appropriée selon le type
  }));

  const stats = STATS;

  return (
    <HomeContainer>
      <Hero />
      
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Pourquoi nous choisir ?</SectionTitle>
            <SectionSubtitle>
              Nous combinons tradition et modernité pour vous offrir une expérience de coiffure exceptionnelle
            </SectionSubtitle>
            
            <Grid>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <CardIcon>{feature.icon}</CardIcon>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </Card>
                </motion.div>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Section>

      <Section style={{ background: '#f8f9fa' }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Nos chiffres parlent d'eux-mêmes</SectionTitle>
            
            <StatsContainer>
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
            </StatsContainer>
          </motion.div>
        </Container>
      </Section>

      <ServicesPreview />
      <AboutPreview />
      <LocationsPreview />
      <Testimonials />
      <CTA />
    </HomeContainer>
  );
};

export default Home;

