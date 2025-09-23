import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';

import Hero from '../../components/Hero/Hero';
import ServicesPreview from '../../components/ServicesPreview/ServicesPreview';
import AboutPreview from '../../components/AboutPreview/AboutPreview';
import LocationsPreview from '../../components/LocationsPreview/LocationsPreview';
import Testimonials from '../../components/Testimonials/Testimonials';
import CTA from '../../components/CTA/CTA';

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
  const features = [
    {
      icon: <FaStar />,
      title: 'Qualité Premium',
      description: 'Des services de haute qualité avec des produits professionnels et une expertise reconnue.'
    },
    {
      icon: <FaClock />,
      title: 'Réservation Facile',
      description: 'Réservez votre créneau en quelques clics, 24h/24, depuis votre smartphone ou ordinateur.'
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'Multi-Adresses',
      description: 'Plusieurs adresses pour vous offrir plus de flexibilité et de proximité.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Clients satisfaits' },
    { number: '3', label: 'Adresses disponibles' },
    { number: '5', label: 'Années d\'expérience' },
    { number: '98%', label: 'Taux de satisfaction' }
  ];

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

