import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaSpinner,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { locationsAPI, contactAPI } from '../../services/api';

import {
  ContactContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  ContactSection,
  Container,
  SectionTitle,
  SectionSubtitle,
  ContactGrid,
  ContactInfo,
  InfoCard,
  InfoIcon,
  InfoTitle,
  InfoText,
  ContactForm,
  FormGroup,
  Label,
  Input,
  Textarea,
  Button,
  ErrorMessage,
  SuccessMessage,
  MapContainer,
  MapPlaceholder,
  SocialLinks,
  SocialLink,
  HoursSection,
  HoursGrid,
  HoursCard,
  HoursTitle,
  HoursList,
  HoursItem,
  Day,
  Time
} from './Contact.styles';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Charger les locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await locationsAPI.getAll();
        setLocations(response.data);
      } catch (err) {
        console.error('Erreur lors du chargement des locations:', err);
      }
    };
    fetchLocations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactAPI.sendContactForm(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      toast.success('Votre message a été envoyé avec succès !');
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
      const errorMessage = err.response?.data?.error || 'Erreur lors de l\'envoi du message.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openingHours = [
    { day: 'Lundi', time: '9h00 - 19h00' },
    { day: 'Mardi', time: '9h00 - 19h00' },
    { day: 'Mercredi', time: '9h00 - 19h00' },
    { day: 'Jeudi', time: '9h00 - 19h00' },
    { day: 'Vendredi', time: '9h00 - 20h00' },
    { day: 'Samedi', time: '8h00 - 18h00' },
    { day: 'Dimanche', time: 'Fermé' }
  ];

  return (
    <ContactContainer>
      <Helmet>
        <title>Contact - Barbershop</title>
        <meta name="description" content="Contactez-nous pour toute question ou réservation. Nos salons sont situés dans votre ville avec des horaires d'ouverture adaptés." />
        <meta name="keywords" content="contact, barbershop, adresse, téléphone, email, horaires" />
      </Helmet>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>Contactez-Nous</HeroTitle>
            <HeroSubtitle>
              Nous sommes là pour répondre à toutes vos questions et vous aider à réserver votre rendez-vous
            </HeroSubtitle>
          </motion.div>
        </HeroContent>
      </HeroSection>

      {/* Contact Section */}
      <ContactSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <SectionTitle>Informations de Contact</SectionTitle>
            <SectionSubtitle>
              Retrouvez-nous dans nos salons ou contactez-nous directement
            </SectionSubtitle>

            <ContactGrid>
              {/* Informations de contact */}
              <ContactInfo>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <InfoCard>
                    <InfoIcon>
                      <FaPhone />
                    </InfoIcon>
                    <InfoTitle>Téléphone</InfoTitle>
                    <InfoText>+33 6 12 34 56 78</InfoText>
                    <InfoText>+33 2 99 12 34 56</InfoText>
                  </InfoCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <InfoCard>
                    <InfoIcon>
                      <FaEnvelope />
                    </InfoIcon>
                    <InfoTitle>Email</InfoTitle>
                    <InfoText>contact@barbershop.fr</InfoText>
                    <InfoText>reservation@barbershop.fr</InfoText>
                  </InfoCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  <InfoCard>
                    <InfoIcon>
                      <FaMapMarkerAlt />
                    </InfoIcon>
                    <InfoTitle>Adresses</InfoTitle>
                    {locations.length > 0 ? (
                      locations.map((location, index) => (
                        <InfoText key={location.id}>
                          <strong>{location.name}</strong><br />
                          {location.address}<br />
                          {location.city} {location.postalCode}
                        </InfoText>
                      ))
                    ) : (
                      <InfoText>
                        <strong>Salon Principal</strong><br />
                        12 Rue de la Barbe<br />
                        Votre ville
                      </InfoText>
                    )}
                  </InfoCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <InfoCard>
                    <InfoIcon>
                      <FaClock />
                    </InfoIcon>
                    <InfoTitle>Horaires d'ouverture</InfoTitle>
                    <InfoText>
                      Lun - Ven: 9h00 - 19h00<br />
                      Samedi: 8h00 - 18h00<br />
                      Dimanche: Fermé
                    </InfoText>
                  </InfoCard>
                </motion.div>

                {/* Réseaux sociaux */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <InfoCard>
                    <InfoTitle>Suivez-nous</InfoTitle>
                    <SocialLinks>
                      <SocialLink href="#" target="_blank" aria-label="Facebook">
                        <FaFacebook />
                      </SocialLink>
                      <SocialLink href="#" target="_blank" aria-label="Instagram">
                        <FaInstagram />
                      </SocialLink>
                      <SocialLink href="#" target="_blank" aria-label="Twitter">
                        <FaTwitter />
                      </SocialLink>
                    </SocialLinks>
                  </InfoCard>
                </motion.div>
              </ContactInfo>

              {/* Formulaire de contact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <ContactForm onSubmit={handleSubmit}>
                  <h3>Envoyez-nous un message</h3>
                  
                  {error && (
                    <ErrorMessage>
                      <FaExclamationTriangle />
                      {error}
                    </ErrorMessage>
                  )}

                  {success && (
                    <SuccessMessage>
                      <FaCheckCircle />
                      Votre message a été envoyé avec succès !
                    </SuccessMessage>
                  )}

                  <FormGroup>
                    <Label htmlFor="name">Nom complet *</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Votre nom complet"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="votre@email.com"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+33 6 12 34 56 78"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Sujet de votre message"
                    />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="Votre message..."
                    />
                  </FormGroup>

                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                        Envoi en cours...
                      </>
                    ) : (
                      'Envoyer le message'
                    )}
                  </Button>
                </ContactForm>
              </motion.div>
            </ContactGrid>
          </motion.div>
        </Container>
      </ContactSection>

      {/* Carte et horaires détaillés */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Nos Emplacements</SectionTitle>
          <SectionSubtitle>
            Retrouvez-nous dans nos différents salons
          </SectionSubtitle>

          <MapContainer>
            <MapPlaceholder>
              <FaMapMarkerAlt />
              <p>Carte interactive des emplacements</p>
              <small>Intégration Google Maps à venir</small>
            </MapPlaceholder>
          </MapContainer>

          <HoursSection>
            <HoursGrid>
              {locations.length > 0 ? (
                locations.map((location, index) => (
                  <motion.div
                    key={location.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <HoursCard>
                      <HoursTitle>{location.name}</HoursTitle>
                      <HoursList>
                        {openingHours.map((schedule, idx) => (
                          <HoursItem key={idx}>
                            <Day>{schedule.day}</Day>
                            <Time>{schedule.time}</Time>
                          </HoursItem>
                        ))}
                      </HoursList>
                    </HoursCard>
                  </motion.div>
                ))
              ) : (
                <HoursCard>
                  <HoursTitle>Salon Principal</HoursTitle>
                  <HoursList>
                    {openingHours.map((schedule, idx) => (
                      <HoursItem key={idx}>
                        <Day>{schedule.day}</Day>
                        <Time>{schedule.time}</Time>
                      </HoursItem>
                    ))}
                  </HoursList>
                </HoursCard>
              )}
            </HoursGrid>
          </HoursSection>
        </motion.div>
      </Container>
    </ContactContainer>
  );
};

export default Contact;