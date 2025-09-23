import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { servicesAPI, locationsAPI, barbersAPI, bookingsAPI } from '../../services/api';

import {
  BookingContainer,
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  BookingSection,
  Container,
  BookingForm,
  FormStep,
  StepTitle,
  StepContent,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  Button,
  ButtonSecondary,
  ButtonGroup,
  ServiceCard,
  ServiceIcon,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceDuration,
  LocationCard,
  LocationInfo,
  LocationName,
  LocationAddress,
  BarberCard,
  BarberInfo,
  BarberName,
  BarberSpecialties,
  TimeSlot,
  TimeSlotButton,
  SummaryCard,
  SummaryItem,
  SummaryTotal,
  ErrorMessage,
  SuccessMessage,
  LoadingSpinner
} from './Booking.styles';

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Données du formulaire
  const [formData, setFormData] = useState({
    serviceIds: searchParams.get('service') ? [searchParams.get('service')] : [],
    locationId: '',
    barberId: '',
    appointmentDate: '',
    appointmentTime: '',
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });

  // Données de l'API
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [barbers, setBarbers] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);

  // Charger les données initiales
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [servicesRes, locationsRes] = await Promise.all([
          servicesAPI.getAll(),
          locationsAPI.getAll()
        ]);

        setServices(servicesRes.data.data?.services || []);
        setLocations(locationsRes.data.data?.locations || []);

        // Si un service est pré-sélectionné
        if (formData.serviceIds.length > 0) {
          const services = servicesRes.data.data?.services || [];
          const service = services.find(s => s.id === formData.serviceIds[0]);
          if (service) {
            setSelectedService(service);
            setFormData(prev => ({ ...prev, serviceIds: [service.id] }));
          }
        }
      } catch (err) {
        console.error('Erreur lors du chargement des données:', err);
        setError('Impossible de charger les données. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  // Charger les coiffeurs quand une location est sélectionnée
  useEffect(() => {
    console.log('🔍 [Booking] useEffect barbers - formData.locationId:', formData.locationId);
    
    if (formData.locationId) {
      const fetchBarbers = async () => {
        try {
          console.log('🔍 [Booking] Fetching barbers for location:', formData.locationId);
          const response = await barbersAPI.getByLocation(formData.locationId);
          console.log('🔍 [Booking] Barbers response:', response.data.data?.barbers?.length, 'barbers');
          setBarbers(response.data.data?.barbers || []);
        } catch (err) {
          console.error('❌ [Booking] Erreur lors du chargement des coiffeurs:', err);
        }
      };
      fetchBarbers();
    }
  }, [formData.locationId]);

  // Charger les créneaux disponibles
  useEffect(() => {
    console.log('🔍 [Booking] useEffect availability - formData:', {
      locationId: formData.locationId,
      barberId: formData.barberId,
      appointmentDate: formData.appointmentDate
    });
    
    if (formData.locationId && formData.barberId && formData.appointmentDate) {
      const fetchAvailability = async () => {
        try {
          console.log('🔍 [Booking] Fetching availability for:', {
            locationId: formData.locationId,
            barberId: formData.barberId,
            appointmentDate: formData.appointmentDate
          });
          
          const response = await bookingsAPI.getAvailability(
            formData.locationId,
            formData.barberId,
            formData.appointmentDate
          );
          console.log('🔍 [Booking] Availability response:', response.data);
          setAvailableSlots(response.data.data || []);
        } catch (err) {
          console.error('❌ [Booking] Erreur lors du chargement des créneaux:', err);
        }
      };
      fetchAvailability();
    }
  }, [formData.locationId, formData.barberId, formData.appointmentDate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, serviceIds: [service.id] }));
    setCurrentStep(2);
  };

  const handleLocationSelect = (location) => {
    console.log('🔍 [Booking] handleLocationSelect - Before reset:', {
      locationId: formData.locationId,
      barberId: formData.barberId,
      selectedBarber: selectedBarber?.id
    });
    
    setSelectedLocation(location);
    setFormData(prev => ({ ...prev, locationId: location.id, barberId: '', appointmentTime: '', appointmentDate: '' }));
    setSelectedBarber(null);
    setAvailableSlots([]);
    setCurrentStep(3);
    
    console.log('🔍 [Booking] handleLocationSelect - After reset:', {
      locationId: location.id,
      barberId: '',
      selectedBarber: null
    });
  };

  const handleBarberSelect = (barber) => {
    setSelectedBarber(barber);
    setFormData(prev => ({ ...prev, barberId: barber.id, appointmentTime: '', appointmentDate: '' }));
    setAvailableSlots([]);
    setCurrentStep(4);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      // Transformer les données pour correspondre à l'API backend
      const bookingData = {
        customerName: `${formData.customerFirstName} ${formData.customerLastName}`,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        services: formData.serviceIds, // Renommer serviceIds en services
        locationId: formData.locationId,
        barberId: formData.barberId,
        notes: formData.notes
      };

      console.log('🔍 [Booking] Sending booking data:', bookingData);

      const response = await bookingsAPI.create(bookingData);
      
      if (response.data) {
        setSuccess(true);
        setCurrentStep(6);
      }
    } catch (err) {
      console.error('Erreur lors de la création de la réservation:', err);
      setError(err.response?.data?.message || 'Erreur lors de la création de la réservation');
    } finally {
      setLoading(false);
    }
  };

  const getServiceIcon = (category) => {
    switch (category) {
      case 'coupe': return '✂️';
      case 'barbe': return '🧔';
      case 'soins': return '🧴';
      default: return '✂️';
    }
  };

  const steps = [
    { id: 1, title: 'Service', description: 'Choisissez votre service' },
    { id: 2, title: 'Lieu', description: 'Sélectionnez votre salon' },
    { id: 3, title: 'Coiffeur', description: 'Choisissez votre coiffeur' },
    { id: 4, title: 'Date & Heure', description: 'Planifiez votre rendez-vous' },
    { id: 5, title: 'Informations', description: 'Vos coordonnées' },
    { id: 6, title: 'Confirmation', description: 'Récapitulatif' }
  ];

  if (success) {
    return (
      <BookingContainer>
        <Helmet>
          <title>Réservation confirmée - Barbershop Rennes</title>
        </Helmet>
        
        <SuccessMessage>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{ textAlign: 'center', padding: '4rem 2rem' }}
          >
            <FaCheck style={{ fontSize: '4rem', color: '#27ae60', marginBottom: '2rem' }} />
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#1a1a1a' }}>
              Réservation confirmée !
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
              Votre rendez-vous a été pris avec succès. Vous recevrez un email de confirmation.
            </p>
            <ButtonGroup>
              <Button as={Link} to="/">
                Retour à l'accueil
              </Button>
              <ButtonSecondary as={Link} to="/booking">
                Nouvelle réservation
              </ButtonSecondary>
            </ButtonGroup>
          </motion.div>
        </SuccessMessage>
      </BookingContainer>
    );
  }

  return (
    <BookingContainer>
      <Helmet>
        <title>Réserver un rendez-vous - Barbershop Rennes</title>
        <meta name="description" content="Réservez facilement votre rendez-vous chez Barbershop Rennes. Choisissez votre service, votre coiffeur et votre créneau." />
      </Helmet>

      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>Réserver un rendez-vous</HeroTitle>
            <HeroSubtitle>
              Choisissez votre service, votre coiffeur et planifiez votre visite
            </HeroSubtitle>
          </motion.div>
        </HeroContent>
      </HeroSection>

      {/* Booking Section */}
      <BookingSection>
        <Container>
          <BookingForm onSubmit={handleSubmit}>
            {/* Progress Steps */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              {steps.map((step) => (
                <div
                  key={step.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: step.id <= currentStep ? 1 : 0.5,
                    cursor: step.id < currentStep ? 'pointer' : 'default'
                  }}
                  onClick={() => step.id < currentStep && setCurrentStep(step.id)}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      background: step.id <= currentStep ? '#d4af37' : '#e9ecef',
                      color: step.id <= currentStep ? 'white' : '#666',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {step.id}
                  </div>
                  <div style={{ textAlign: 'center', fontSize: '0.9rem' }}>
                    <div style={{ fontWeight: '600' }}>{step.title}</div>
                    <div style={{ color: '#666' }}>{step.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <ErrorMessage>
                {error}
              </ErrorMessage>
            )}

            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <FormStep>
                <StepTitle>Choisissez votre service</StepTitle>
                <StepContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {services.map((service) => (
                      <ServiceCard
                        key={service.id}
                        onClick={() => handleServiceSelect(service)}
                        style={{ cursor: 'pointer' }}
                      >
                        <ServiceIcon>{getServiceIcon(service.category)}</ServiceIcon>
                        <ServiceInfo>
                          <ServiceName>{service.name}</ServiceName>
                          <ServicePrice>{service.price}€</ServicePrice>
                          <ServiceDuration>{service.duration} min</ServiceDuration>
                        </ServiceInfo>
                      </ServiceCard>
                    ))}
                  </div>
                </StepContent>
              </FormStep>
            )}

            {/* Step 2: Location Selection */}
            {currentStep === 2 && (
              <FormStep>
                <StepTitle>Sélectionnez votre salon</StepTitle>
                <StepContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {locations.map((location) => (
                      <LocationCard
                        key={location.id}
                        onClick={() => handleLocationSelect(location)}
                        style={{ cursor: 'pointer' }}
                      >
                        <LocationInfo>
                          <LocationName>{location.name}</LocationName>
                          <LocationAddress>
                            <FaMapMarkerAlt /> {location.address}, {location.city}
                          </LocationAddress>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <FaPhone /> {location.phone}
                          </div>
                        </LocationInfo>
                      </LocationCard>
                    ))}
                  </div>
                </StepContent>
              </FormStep>
            )}

            {/* Step 3: Barber Selection */}
            {currentStep === 3 && (
              <FormStep>
                <StepTitle>Choisissez votre coiffeur</StepTitle>
                <StepContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                    {barbers.map((barber) => (
                      <BarberCard
                        key={barber.id}
                        onClick={() => handleBarberSelect(barber)}
                        style={{ cursor: 'pointer' }}
                      >
                        <BarberInfo>
                          <BarberName>{barber.firstName} {barber.lastName}</BarberName>
                          <BarberSpecialties>
                            {barber.specializations?.join(', ')}
                          </BarberSpecialties>
                          <div style={{ marginTop: '0.5rem', color: '#666' }}>
                            ⭐ {barber.rating || 'Nouveau'} • {barber.totalBookings || 0} réservations
                          </div>
                        </BarberInfo>
                      </BarberCard>
                    ))}
                  </div>
                </StepContent>
              </FormStep>
            )}

            {/* Step 4: Date & Time Selection */}
            {currentStep === 4 && (
              <FormStep>
                <StepTitle>Planifiez votre rendez-vous</StepTitle>
                <StepContent>
                  <FormGroup>
                    <Label>Date du rendez-vous</Label>
                    <Input
                      type="date"
                      name="appointmentDate"
                      value={formData.appointmentDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </FormGroup>

                  {formData.appointmentDate && (
                    <FormGroup>
                      <Label>Heure du rendez-vous</Label>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
                        {availableSlots.map((slot) => (
                          <TimeSlotButton
                            key={slot.id}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, appointmentTime: slot.time }))}
                            selected={formData.appointmentTime === slot.time}
                          >
                            {slot.time}
                          </TimeSlotButton>
                        ))}
                      </div>
                    </FormGroup>
                  )}

                  <ButtonGroup>
                    <ButtonSecondary onClick={() => setCurrentStep(3)}>
                      <FaArrowLeft /> Précédent
                    </ButtonSecondary>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      disabled={!formData.appointmentDate || !formData.appointmentTime}
                    >
                      Suivant
                    </Button>
                  </ButtonGroup>
                </StepContent>
              </FormStep>
            )}

            {/* Step 5: Customer Information */}
            {currentStep === 5 && (
              <FormStep>
                <StepTitle>Vos informations</StepTitle>
                <StepContent>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <FormGroup>
                      <Label>Prénom *</Label>
                      <Input
                        type="text"
                        name="customerFirstName"
                        value={formData.customerFirstName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Nom *</Label>
                      <Input
                        type="text"
                        name="customerLastName"
                        value={formData.customerLastName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Email *</Label>
                      <Input
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Label>Téléphone *</Label>
                      <Input
                        type="tel"
                        name="customerPhone"
                        value={formData.customerPhone}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </div>

                  <FormGroup>
                    <Label>Notes (optionnel)</Label>
                    <TextArea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Informations supplémentaires pour votre coiffeur..."
                      rows="4"
                    />
                  </FormGroup>

                  <ButtonGroup>
                    <ButtonSecondary onClick={() => setCurrentStep(4)}>
                      <FaArrowLeft /> Précédent
                    </ButtonSecondary>
                    <Button
                      type="button"
                      onClick={() => setCurrentStep(6)}
                      disabled={!formData.customerFirstName || !formData.customerLastName || !formData.customerEmail || !formData.customerPhone}
                    >
                      Récapitulatif
                    </Button>
                  </ButtonGroup>
                </StepContent>
              </FormStep>
            )}

            {/* Step 6: Summary */}
            {currentStep === 6 && (
              <FormStep>
                <StepTitle>Récapitulatif de votre réservation</StepTitle>
                <StepContent>
                  <SummaryCard>
                    <SummaryItem>
                      <strong>Service :</strong> {selectedService?.name} - {selectedService?.price}€
                    </SummaryItem>
                    <SummaryItem>
                      <strong>Lieu :</strong> {selectedLocation?.name}, {selectedLocation?.address}
                    </SummaryItem>
                    <SummaryItem>
                      <strong>Coiffeur :</strong> {selectedBarber?.firstName} {selectedBarber?.lastName}
                    </SummaryItem>
                    <SummaryItem>
                      <strong>Date :</strong> {new Date(formData.appointmentDate).toLocaleDateString('fr-FR')}
                    </SummaryItem>
                    <SummaryItem>
                      <strong>Heure :</strong> {formData.appointmentTime}
                    </SummaryItem>
                    <SummaryItem>
                      <strong>Client :</strong> {formData.customerFirstName} {formData.customerLastName}
                    </SummaryItem>
                    <SummaryItem>
                      <strong>Email :</strong> {formData.customerEmail}
                    </SummaryItem>
                    <SummaryItem>
                      <strong>Téléphone :</strong> {formData.customerPhone}
                    </SummaryItem>
                    {formData.notes && (
                      <SummaryItem>
                        <strong>Notes :</strong> {formData.notes}
                      </SummaryItem>
                    )}
                    <SummaryTotal>
                      <strong>Total : {selectedService?.price}€</strong>
                    </SummaryTotal>
                  </SummaryCard>

                  <ButtonGroup>
                    <ButtonSecondary onClick={() => setCurrentStep(5)}>
                      <FaArrowLeft /> Modifier
                    </ButtonSecondary>
                    <Button type="submit" disabled={loading}>
                      {loading ? <FaSpinner style={{ animation: 'spin 1s linear infinite' }} /> : 'Confirmer la réservation'}
                    </Button>
                  </ButtonGroup>
                </StepContent>
              </FormStep>
            )}
          </BookingForm>
        </Container>
      </BookingSection>
    </BookingContainer>
  );
};

export default Booking;