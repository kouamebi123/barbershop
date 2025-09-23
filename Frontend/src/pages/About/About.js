import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaStar, FaAward, FaUsers, FaClock, FaHeart, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { barbersAPI } from '../../services/api';

import {
  AboutContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  AboutSection,
  Container,
  SectionTitle,
  SectionSubtitle,
  AboutContent,
  AboutText,
  AboutImage,
  StatsSection,
  StatsGrid,
  StatItem,
  StatNumber,
  StatLabel,
  TeamSection,
  TeamGrid,
  TeamCard,
  TeamImage,
  TeamInfo,
  TeamName,
  TeamRole,
  TeamSpecialties,
  TeamBio,
  ValuesSection,
  ValuesGrid,
  ValueCard,
  ValueIcon,
  ValueTitle,
  ValueDescription,
  CTAButton,
  LoadingSpinner,
  ErrorMessage
} from './About.styles';

const About = () => {
  const [barbers, setBarbers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarbers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await barbersAPI.getAll();
        setBarbers(response.data.data?.barbers || []);
      } catch (err) {
        console.error('Erreur lors du chargement des coiffeurs:', err);
        setError('Impossible de charger les informations de l\'équipe. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchBarbers();
  }, []);

  const stats = [
    { number: '500+', label: 'Clients satisfaits' },
    { number: '5+', label: 'Années d\'expérience' },
    { number: '3', label: 'Salons à Rennes' },
    { number: '15+', label: 'Coiffeurs professionnels' }
  ];

  const values = [
    {
      icon: <FaHeart />,
      title: 'Passion',
      description: 'Nous sommes passionnés par notre métier et nous nous efforçons de vous offrir le meilleur service possible.'
    },
    {
      icon: <FaAward />,
      title: 'Excellence',
      description: 'Nous visons l\'excellence dans chaque coupe, chaque taille de barbe et chaque service que nous proposons.'
    },
    {
      icon: <FaUsers />,
      title: 'Communauté',
      description: 'Nous créons un espace où chacun se sent bienvenu et où la communauté se retrouve.'
    },
    {
      icon: <FaClock />,
      title: 'Ponctualité',
      description: 'Nous respectons votre temps et nous nous efforçons d\'être toujours à l\'heure pour vos rendez-vous.'
    }
  ];

  return (
    <AboutContainer>
      <Helmet>
        <title>À propos - Votre Barbershop</title>
        <meta name="description" content="Découvrez l'histoire de notre barbershop, notre équipe de coiffeurs professionnels et nos valeurs. Plus de 5 ans d'expérience au service de votre style." />
        <meta name="keywords" content="à propos, barbershop, équipe, coiffeurs, histoire, valeurs" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>À Propos de Nous</HeroTitle>
            <HeroSubtitle>
              Découvrez l'histoire de notre barbershop et notre passion pour l'art de la coiffure masculine
            </HeroSubtitle>
          </motion.div>
        </HeroContent>
      </HeroSection>

      {/* About Section */}
      <AboutSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Notre Histoire</SectionTitle>
            <SectionSubtitle>
              Depuis 2018, notre barbershop redéfinit l'art de la coiffure masculine
            </SectionSubtitle>

            <AboutContent>
              <AboutText>
                <p>
                  Fondé en 2018, notre barbershop est né de la passion de ses créateurs pour l'art traditionnel 
                  de la coiffure masculine. Notre vision était simple : créer un espace où les hommes peuvent 
                  se détendre, prendre soin d'eux et repartir avec un style qui leur correspond parfaitement.
                </p>
                <p>
                  Aujourd'hui, avec plusieurs salons et une équipe de coiffeurs professionnels, 
                  nous continuons à honorer cette tradition tout en intégrant les techniques modernes et les 
                  tendances contemporaines.
                </p>
                <p>
                  Chaque coupe, chaque taille de barbe, chaque soin est réalisé avec le plus grand soin et 
                  l'attention aux détails qui nous caractérisent. Nous croyons que prendre soin de soi n'est 
                  pas un luxe, mais un droit pour chaque homme.
                </p>
              </AboutText>
              <AboutImage>
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmOGY5ZmEiLz48dGV4dCB4PSIzMDAiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2NiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij5Ob3RyZSBTYWxvbjwvdGV4dD48L3N2Zz4="
                  alt="Notre salon"
                />
              </AboutImage>
            </AboutContent>
          </motion.div>
        </Container>
      </AboutSection>

      {/* Stats Section */}
      <StatsSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <StatsGrid>
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
            </StatsGrid>
          </motion.div>
        </Container>
      </StatsSection>

      {/* Team Section */}
      <TeamSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Notre Équipe</SectionTitle>
            <SectionSubtitle>
              Des professionnels passionnés à votre service
            </SectionSubtitle>

            {loading ? (
              <LoadingSpinner>
                <FaSpinner style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '1rem' }} />
                <div>Chargement de l'équipe...</div>
              </LoadingSpinner>
            ) : error ? (
              <ErrorMessage>
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
              </ErrorMessage>
            ) : (
              <TeamGrid>
                {barbers.map((barber, index) => (
                  <motion.div
                    key={barber.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <TeamCard>
                      <TeamImage>
                        <img 
                          src={barber.avatar || `https://via.placeholder.com/300x300?text=${barber.firstName}+${barber.lastName}`} 
                          alt={`${barber.firstName} ${barber.lastName}`}
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMTUwIiByPSIxNTAiIGZpbGw9IiNmOGY5ZmEiLz48dGV4dCB4PSIxNTAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2NiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0Ij5BdmF0YXI8L3RleHQ+PC9zdmc+';
                          }}
                        />
                      </TeamImage>
                      <TeamInfo>
                        <TeamName>{barber.firstName} {barber.lastName}</TeamName>
                        <TeamRole>Coiffeur Professionnel</TeamRole>
                        <TeamSpecialties>
                          {barber.specializations?.join(', ') || 'Spécialiste polyvalent'}
                        </TeamSpecialties>
                        <TeamBio>
                          {barber.bio || 'Passionné par son métier, il met tout son savoir-faire au service de votre style.'}
                        </TeamBio>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                          <FaStar style={{ color: '#d4af37' }} />
                          <span>{barber.rating || 'Nouveau'}</span>
                          <span style={{ color: '#666', marginLeft: '0.5rem' }}>
                            • {barber.totalBookings || 0} réservations
                          </span>
                        </div>
                      </TeamInfo>
                    </TeamCard>
                  </motion.div>
                ))}
              </TeamGrid>
            )}
          </motion.div>
        </Container>
      </TeamSection>

      {/* Values Section */}
      <ValuesSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Nos Valeurs</SectionTitle>
            <SectionSubtitle>
              Les principes qui guident notre travail au quotidien
            </SectionSubtitle>

            <ValuesGrid>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ValueCard>
                    <ValueIcon>{value.icon}</ValueIcon>
                    <ValueTitle>{value.title}</ValueTitle>
                    <ValueDescription>{value.description}</ValueDescription>
                  </ValueCard>
                </motion.div>
              ))}
            </ValuesGrid>
          </motion.div>
        </Container>
      </ValuesSection>

      {/* CTA Section */}
      <div style={{ 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)', 
        padding: '80px 0', 
        textAlign: 'center' 
      }}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              color: 'white', 
              marginBottom: '1rem' 
            }}>
              Prêt à découvrir notre univers ?
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'rgba(255, 255, 255, 0.8)', 
              marginBottom: '2rem',
              maxWidth: '600px',
              margin: '0 auto 2rem'
            }}>
              Réservez votre rendez-vous et laissez-nous prendre soin de votre style
            </p>
            <CTAButton as={Link} to="/booking">
              Réserver maintenant
            </CTAButton>
          </motion.div>
        </Container>
      </div>
    </AboutContainer>
  );
};

export default About;