import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaClock, FaSpinner } from 'react-icons/fa';
import { locationsAPI } from '../../services/api';
import { formatOpeningHours, getTodayHours } from '../../utils/formatHours';

import {
  Section,
  Container,
  SectionTitle,
  SectionSubtitle,
  Grid,
  LocationCard,
  LocationImage,
  LocationContent,
  LocationName,
  LocationAddress,
  LocationInfo,
  LocationDetail,
  Button
} from './LocationsPreview.styles';

const LocationsPreview = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🔍 [LocationsPreview] Fetching locations...');
        const response = await locationsAPI.getAll();
        console.log('🔍 [LocationsPreview] API Response:', {
          success: response.data.success,
          message: response.data.message,
          dataType: typeof response.data.data,
          dataKeys: response.data.data ? Object.keys(response.data.data) : 'No data',
          locationsCount: response.data.data?.locations ? response.data.data.locations.length : 'No locations property'
        });
        
        const locationsData = response.data.data?.locations || response.data.data || [];
        console.log('🔍 [LocationsPreview] Locations data:', locationsData);
        setLocations(Array.isArray(locationsData) ? locationsData : []);
      } catch (err) {
        console.error('❌ [LocationsPreview] Erreur lors du chargement des locations:', err);
        setError('Impossible de charger les locations.');
        setLocations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
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
          <SectionTitle>Nos adresses</SectionTitle>
          <SectionSubtitle>
            Retrouvez-nous dans nos différents salons
          </SectionSubtitle>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <FaSpinner style={{ animation: 'spin 1s linear infinite', fontSize: '2rem', marginBottom: '1rem' }} />
              <div style={{ fontSize: '1.2rem' }}>Chargement des salons...</div>
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
          ) : locations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '1.2rem' }}>Aucun salon trouvé.</div>
            </div>
          ) : (
            <Grid>
              {locations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <LocationCard>
                  <LocationImage>
                    <div className="location-placeholder">
                      <FaMapMarkerAlt />
                    </div>
                  </LocationImage>
                  <LocationContent>
                    <LocationName>{location.name}</LocationName>
                    <LocationAddress>{location.address}, {location.city} {location.postalCode}</LocationAddress>
                    <LocationInfo>
                      <LocationDetail>
                        <FaPhone />
                        <span>{location.phone}</span>
                      </LocationDetail>
                      <LocationDetail>
                        <FaClock />
                        <span>{formatOpeningHours(location.openingHours)}</span>
                      </LocationDetail>
                    </LocationInfo>
                  </LocationContent>
                </LocationCard>
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
            <Button as={Link} to="/locations">
              Voir toutes les adresses
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default LocationsPreview;

