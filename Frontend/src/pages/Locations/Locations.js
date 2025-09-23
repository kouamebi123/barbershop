import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaClock, 
  FaCar, 
  FaBus, 
  FaSubway, 
  FaWifi, 
  FaParking, 
  FaCoffee, 
  FaSpinner,
  FaExclamationTriangle,
  FaDirections,
  FaStar,
  FaCheckCircle
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { locationsAPI } from '../../services/api';
import { formatOpeningHours, getTodayHours } from '../../utils/formatHours';

import {
  LocationsContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  LocationsSection,
  Container,
  SectionTitle,
  SectionSubtitle,
  LocationsGrid,
  LocationCard,
  LocationImage,
  LocationInfo,
  LocationName,
  LocationAddress,
  LocationDetails,
  LocationFeature,
  LocationFeatureIcon,
  LocationFeatureText,
  LocationActions,
  Button,
  ButtonSecondary,
  MapContainer,
  MapPlaceholder,
  FeaturesSection,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  LocationHours,
  HoursTitle,
  HoursList,
  HoursItem,
  Day,
  Time,
  LocationContact,
  ContactItem,
  ContactIcon,
  ContactText
} from './Locations.styles';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await locationsAPI.getAll();
        setLocations(response.data.data?.locations || []);
      } catch (err) {
        console.error('Erreur lors du chargement des locations:', err);
        setError('Impossible de charger les informations des salons.');
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, []);

  const getLocationFeatures = (location) => {
    const features = [];
    
    if (location.parking) features.push({ icon: FaParking, text: 'Parking gratuit' });
    if (location.wifi) features.push({ icon: FaWifi, text: 'WiFi gratuit' });
    if (location.coffee) features.push({ icon: FaCoffee, text: 'Café offert' });
    if (location.accessibility) features.push({ icon: FaCheckCircle, text: 'Accessible PMR' });
    
    return features;
  };

  const getTransportIcon = (transportType) => {
    switch (transportType) {
      case 'metro': return FaSubway;
      case 'bus': return FaBus;
      case 'car': return FaCar;
      default: return FaCar;
    }
  };


  return (
    <LocationsContainer>
      <Helmet>
        <title>Nos Salons - Votre Barbershop</title>
        <meta name="description" content="Découvrez nos différents salons. Emplacements, horaires, services et informations pratiques pour chaque salon." />
        <meta name="keywords" content="salons, barbershop, adresses, horaires, emplacements, parking" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>Nos Salons</HeroTitle>
            <HeroSubtitle>
              Retrouvez-nous dans nos différents emplacements
            </HeroSubtitle>
          </motion.div>
        </HeroContent>
      </HeroSection>

      {/* Locations Section */}
      <LocationsSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Nos Emplacements</SectionTitle>
            <SectionSubtitle>
              Chaque salon a sa propre personnalité, mais tous partagent notre engagement envers l'excellence
            </SectionSubtitle>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <LoadingSpinner>
                  <FaSpinner />
                  Chargement des salons...
                </LoadingSpinner>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <ErrorMessage>
                  <FaExclamationTriangle />
                  {error}
                </ErrorMessage>
              </div>
            ) : locations.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                <EmptyState>
                  Aucun salon trouvé.
                </EmptyState>
              </div>
            ) : (
              <LocationsGrid>
                {locations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <LocationCard>
                      <LocationImage>
                        <img 
                          src={location.imageUrl || `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIyNTAiIGZpbGw9IiNmOGY5ZmEiLz48dGV4dCB4PSIyMDAiIHk9IjEyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2NiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE4Ij5TYWxvbiBQbGFjZWhvbGRlcjwvdGV4dD48L3N2Zz4=`} 
                          alt={location.name}
                        />
                      </LocationImage>
                      
                      <LocationInfo>
                        <LocationName>{location.name}</LocationName>
                        <LocationAddress>
                          <FaMapMarkerAlt />
                          {location.address}, {location.city} {location.postalCode}
                        </LocationAddress>

                        <LocationContact>
                          <ContactItem>
                            <ContactIcon>
                              <FaPhone />
                            </ContactIcon>
                            <ContactText>{location.phone || '+33 6 12 34 56 78'}</ContactText>
                          </ContactItem>
                        </LocationContact>

                        <LocationDetails>
                          {getLocationFeatures(location).map((feature, idx) => (
                            <LocationFeature key={idx}>
                              <LocationFeatureIcon>
                                <feature.icon />
                              </LocationFeatureIcon>
                              <LocationFeatureText>{feature.text}</LocationFeatureText>
                            </LocationFeature>
                          ))}
                        </LocationDetails>

                        <LocationHours>
                          <HoursTitle>Horaires d'ouverture</HoursTitle>
                          <HoursList>
                            {location.openingHours && Object.entries(location.openingHours).map(([day, hours]) => (
                              <HoursItem key={day}>
                                <Day>
                                  {day === 'monday' ? 'Lundi' :
                                   day === 'tuesday' ? 'Mardi' :
                                   day === 'wednesday' ? 'Mercredi' :
                                   day === 'thursday' ? 'Jeudi' :
                                   day === 'friday' ? 'Vendredi' :
                                   day === 'saturday' ? 'Samedi' :
                                   day === 'sunday' ? 'Dimanche' : day}
                                </Day>
                                <Time>
                                  {hours.closed ? 'Fermé' : `${hours.open} - ${hours.close}`}
                                </Time>
                              </HoursItem>
                            ))}
                          </HoursList>
                        </LocationHours>

                        <LocationActions>
                          <Button as={Link} to={`/booking?location=${location.id}`}>
                            Réserver maintenant
                          </Button>
                          <ButtonSecondary>
                            <FaDirections />
                            Itinéraire
                          </ButtonSecondary>
                        </LocationActions>
                      </LocationInfo>
                    </LocationCard>
                  </motion.div>
                ))}
              </LocationsGrid>
            )}
          </motion.div>
        </Container>
      </LocationsSection>

      {/* Map Section */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Plan des Emplacements</SectionTitle>
          <SectionSubtitle>
            Trouvez le salon le plus proche de chez vous
          </SectionSubtitle>

          <MapContainer>
            <MapPlaceholder>
              <FaMapMarkerAlt />
              <p>Carte interactive des emplacements</p>
              <small>Intégration Google Maps à venir</small>
            </MapPlaceholder>
          </MapContainer>
        </motion.div>
      </Container>

      {/* Features Section */}
      <FeaturesSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Services Disponibles</SectionTitle>
            <SectionSubtitle>
              Tous nos salons offrent les mêmes services de qualité
            </SectionSubtitle>

            <FeaturesGrid>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureCard>
                  <FeatureIcon>
                    <FaParking />
                  </FeatureIcon>
                  <FeatureTitle>Parking Gratuit</FeatureTitle>
                  <FeatureDescription>
                    Places de parking disponibles gratuitement pour tous nos clients
                  </FeatureDescription>
                </FeatureCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <FeatureCard>
                  <FeatureIcon>
                    <FaWifi />
                  </FeatureIcon>
                  <FeatureTitle>WiFi Gratuit</FeatureTitle>
                  <FeatureDescription>
                    Connexion internet gratuite pendant votre visite
                  </FeatureDescription>
                </FeatureCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <FeatureCard>
                  <FeatureIcon>
                    <FaCoffee />
                  </FeatureIcon>
                  <FeatureTitle>Boissons Gratuites</FeatureTitle>
                  <FeatureDescription>
                    Café, thé et boissons fraîches offerts
                  </FeatureDescription>
                </FeatureCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <FeatureCard>
                  <FeatureIcon>
                    <FaCheckCircle />
                  </FeatureIcon>
                  <FeatureTitle>Accessibilité</FeatureTitle>
                  <FeatureDescription>
                    Tous nos salons sont accessibles aux personnes à mobilité réduite
                  </FeatureDescription>
                </FeatureCard>
              </motion.div>
            </FeaturesGrid>
          </motion.div>
        </Container>
      </FeaturesSection>
    </LocationsContainer>
  );
};

export default Locations;