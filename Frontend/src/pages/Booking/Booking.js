import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { FaCalendarAlt, FaClock, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCheck, FaSpinner, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { genderAPI, servicesAPI, locationsAPI, bookingsAPI } from '../../services/api';
import BookingConfirmationModal from '../../components/BookingConfirmationModal/BookingConfirmationModal';
import GenderSelection from '../../components/GenderSelection/GenderSelection';
import HaircutTypeSelection from '../../components/HaircutTypeSelection/HaircutTypeSelection';

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
  TimeSlot,
  TimeSlotButton,
  SummaryCard,
  SummaryItem,
  SummaryTotal,
  ErrorMessage,
  SuccessMessage,
  LoadingSpinnerContainer,
  ErrorContainer,
  NavigationButtons,
  StepIndicator,
  StepNumber,
  StepLabel,
  ProgressBar,
  ProgressFill
} from './Booking.styles';

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();

  // Données du formulaire
  const [formData, setFormData] = useState({
    gender: '',
    haircutType: '',
    serviceIds: [],
    locationId: '',
    appointmentDate: '',
    appointmentTime: '',
    customerFirstName: '',
    customerLastName: '',
    customerEmail: '',
    customerPhone: '',
    notes: ''
  });

  // Données de l'API
  const [genders, setGenders] = useState([]);
  const [haircutTypes, setHaircutTypes] = useState([]);
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // État du modal de confirmation
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  // Charger les genres disponibles
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await genderAPI.getGenders();
        setGenders(response.data.data?.genders || []);
      } catch (err) {
        console.error('Erreur lors du chargement des genres:', err);
      }
    };
    fetchGenders();
  }, []);

  // Charger les types de coupes quand le genre est sélectionné
  useEffect(() => {
    const fetchHaircutTypes = async () => {
      if (formData.gender) {
        try {
          const response = await genderAPI.getHaircutTypes(formData.gender);
          setHaircutTypes(response.data.data?.haircutTypes || []);
        } catch (err) {
          console.error('Erreur lors du chargement des types de coupes:', err);
        }
      }
    };
    fetchHaircutTypes();
  }, [formData.gender]);

  // Charger les services quand le genre et le type de coupe sont sélectionnés
  useEffect(() => {
    const fetchServices = async () => {
      if (formData.gender && formData.haircutType) {
        try {
          const response = await genderAPI.getServices(formData.gender, formData.haircutType);
          setServices(response.data.data?.services || []);
        } catch (err) {
          console.error('Erreur lors du chargement des services:', err);
        }
      }
    };
    fetchServices();
  }, [formData.gender, formData.haircutType]);

  // Charger les salons quand le genre et le type de coupe sont sélectionnés
  useEffect(() => {
    const fetchLocations = async () => {
      if (formData.gender && formData.haircutType) {
        try {
          const response = await genderAPI.getLocations(formData.gender, formData.haircutType);
          setLocations(response.data.data?.locations || []);
        } catch (err) {
          console.error('Erreur lors du chargement des salons:', err);
        }
      }
    };
    fetchLocations();
  }, [formData.gender, formData.haircutType]);


  // Charger les créneaux disponibles
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (formData.locationId && formData.appointmentDate) {
        try {
          setLoading(true);
          const response = await bookingsAPI.getAvailability(
            formData.locationId,
            formData.appointmentDate
          );
          setAvailableSlots(response.data.data || []);
        } catch (err) {
          console.error('Erreur lors du chargement des créneaux disponibles:', err);
          setError(err.response?.data?.message || 'Impossible de charger les créneaux disponibles.');
          setAvailableSlots([]);
        } finally {
          setLoading(false);
        }
      } else {
        setAvailableSlots([]);
      }
    };
    fetchAvailableSlots();
  }, [formData.locationId, formData.appointmentDate, formData.serviceIds]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData(prev => ({
      ...prev,
      gender,
      haircutType: '',
      serviceIds: [],
      locationId: '',
      appointmentDate: '',
      appointmentTime: ''
    }));
    setSelectedService(null);
    setSelectedLocation(null);
    setAvailableSlots([]);
    setCurrentStep(2);
  };

  const handleHaircutTypeSelect = (haircutType) => {
    setFormData(prev => ({
      ...prev,
      haircutType,
      serviceIds: [],
      locationId: '',
      appointmentDate: '',
      appointmentTime: ''
    }));
    setSelectedService(null);
    setSelectedLocation(null);
    setAvailableSlots([]);
    setCurrentStep(3);
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setFormData(prev => ({ ...prev, serviceIds: [service.id] }));
    setCurrentStep(4);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setFormData(prev => ({
      ...prev,
      locationId: location.id,
      appointmentTime: '',
      appointmentDate: ''
    }));
    setAvailableSlots([]);
    setCurrentStep(5);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ne traiter que si on est à la dernière étape (confirmation)
    if (currentStep !== 7) {
      return;
    }
    
    try {
      setLoading(true);
      setError(null);

      // Validation complète avant soumission
      if (!formData.customerFirstName || !formData.customerLastName || !formData.customerEmail || !formData.customerPhone) {
        setError('Veuillez remplir tous les champs obligatoires.');
        setLoading(false);
        return;
      }

      if (!formData.serviceIds || formData.serviceIds.length === 0) {
        setError('Veuillez sélectionner un service.');
        setLoading(false);
        return;
      }

      if (!formData.locationId) {
        setError('Veuillez sélectionner un salon.');
        setLoading(false);
        return;
      }

      if (!formData.appointmentDate || !formData.appointmentTime) {
        setError('Veuillez sélectionner une date et une heure.');
        setLoading(false);
        return;
      }

      const bookingData = {
        customerName: `${formData.customerFirstName} ${formData.customerLastName}`,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        services: formData.serviceIds,
        locationId: formData.locationId,
        notes: formData.notes
      };

      console.log('Données de réservation envoyées:', bookingData);
      console.log('Services IDs:', formData.serviceIds);
      console.log('Location ID:', formData.locationId);
      const response = await bookingsAPI.create(bookingData);
      
      if (response.data) {
        const bookingConfirmation = {
          ...response.data,
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          locationName: selectedLocation ? selectedLocation.name : 'Non spécifié',
          services: formData.serviceIds.map(id => {
            const service = services.find(s => s.id === id);
            return service ? { name: service.name } : { name: 'Service' };
          })
        };
        
        setConfirmedBooking(bookingConfirmation);
        setShowConfirmationModal(true);
        setIsBookingConfirmed(true);
      }
    } catch (err) {
      console.error('Erreur lors de la création de la réservation:', err);
      setError(err.response?.data?.message || 'Erreur lors de la création de la réservation.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 7) {
      setError(null); // Effacer les erreurs lors de la navigation
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setError(null); // Effacer les erreurs lors de la navigation
      setCurrentStep(currentStep - 1);
    }
  };

  const getStepTitle = () => {
    const titles = {
      1: '',
      2: '',
      3: 'Choisissez votre service',
      4: 'Sélectionnez votre salon',
      5: 'Sélectionnez la date et l\'heure',
      6: 'Vos informations',
      7: 'Confirmation'
    };
    return titles[currentStep] || '';
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <GenderSelection
            onGenderSelect={handleGenderSelect}
            selectedGender={formData.gender}
          />
        );
      
      case 2:
        return (
          <HaircutTypeSelection
            gender={formData.gender}
            haircutTypes={haircutTypes}
            onHaircutTypeSelect={handleHaircutTypeSelect}
            selectedHaircutType={formData.haircutType}
          />
        );
      
      case 3:
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  $isSelected={formData.serviceIds.includes(service.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <ServiceIcon>✂️</ServiceIcon>
                  <ServiceInfo>
                    <ServiceName>{service.name}</ServiceName>
                    <ServicePrice>{service.price} €</ServicePrice>
                    <ServiceDuration>{service.duration} min</ServiceDuration>
                  </ServiceInfo>
                </ServiceCard>
              ))}
            </div>
          </div>
        );
      
      case 4:
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
              {locations.map((location) => (
                <LocationCard
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  $isSelected={formData.locationId === location.id}
                  style={{ cursor: 'pointer' }}
                >
                  <LocationInfo>
                    <LocationName>{location.name}</LocationName>
                    <LocationAddress>
                      <FaMapMarkerAlt /> {location.address}, {location.city} {location.postalCode}
                    </LocationAddress>
                    <div style={{ marginTop: '10px' }}>
                      <FaPhone /> {location.phone}
                    </div>
                  </LocationInfo>
                </LocationCard>
              ))}
            </div>
          </div>
        );
      
      case 5:
        return (
          <div>
            <FormGroup>
              <Label htmlFor="appointmentDate">Date</Label>
              <Input
                type="date"
                id="appointmentDate"
                name="appointmentDate"
                value={formData.appointmentDate}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </FormGroup>
            
            {formData.appointmentDate && (
              <div style={{ marginTop: '20px' }}>
                <h4>Créneaux disponibles</h4>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '20px' }}>
                    <FaSpinner className="spinner" />
                    <p>Chargement des créneaux...</p>
                  </div>
                ) : availableSlots.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px', marginTop: '10px' }}>
                    {availableSlots.map((slot) => (
                      <TimeSlotButton
                        key={slot.id}
                        onClick={() => setFormData(prev => ({ ...prev, appointmentTime: slot.time }))}
                        $isSelected={formData.appointmentTime === slot.time}
                      >
                        {slot.time}
                      </TimeSlotButton>
                    ))}
                  </div>
                ) : (
                  <p>Aucun créneau disponible pour cette date.</p>
                )}
              </div>
            )}
          </div>
        );
      
      case 6:
        return (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <FormGroup>
                <Label htmlFor="customerFirstName">Prénom</Label>
                <Input
                  type="text"
                  id="customerFirstName"
                  name="customerFirstName"
                  value={formData.customerFirstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="customerLastName">Nom</Label>
                <Input
                  type="text"
                  id="customerLastName"
                  name="customerLastName"
                  value={formData.customerLastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
              <FormGroup>
                <Label htmlFor="customerEmail">Email</Label>
                <Input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="customerPhone">Téléphone</Label>
                <Input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </div>
            <FormGroup style={{ marginTop: '20px' }}>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <TextArea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                placeholder="Informations supplémentaires..."
              />
            </FormGroup>
          </div>
        );
      
      case 7:
        return (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ marginBottom: '20px', color: '#666', fontSize: '16px' }}>
              Veuillez vérifier les informations ci-dessous avant de confirmer votre réservation.
            </p>
            </div>
            <SummaryCard>
              <SummaryItem>
                <strong>Service:</strong> {selectedService?.name}
              </SummaryItem>
              <SummaryItem>
                <strong>Prix:</strong> {selectedService?.price} €
              </SummaryItem>
              <SummaryItem>
                <strong>Durée:</strong> {selectedService?.duration} min
              </SummaryItem>
              <SummaryItem>
                <strong>Salon:</strong> {selectedLocation?.name}
              </SummaryItem>
              <SummaryItem>
                <strong>Adresse:</strong> {selectedLocation?.address}, {selectedLocation?.city}
              </SummaryItem>
              <SummaryItem>
                <strong>Date:</strong> {formData.appointmentDate}
              </SummaryItem>
              <SummaryItem>
                <strong>Heure:</strong> {formData.appointmentTime}
              </SummaryItem>
              <SummaryItem>
                <strong>Client:</strong> {formData.customerFirstName} {formData.customerLastName}
              </SummaryItem>
              <SummaryItem>
                <strong>Email:</strong> {formData.customerEmail}
              </SummaryItem>
              <SummaryItem>
                <strong>Téléphone:</strong> {formData.customerPhone}
              </SummaryItem>
              {formData.notes && (
                <SummaryItem>
                  <strong>Notes:</strong> {formData.notes}
                </SummaryItem>
              )}
            </SummaryCard>
          </div>
        );
      
      default:
        return null;
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1: return formData.gender !== '';
      case 2: return formData.haircutType !== '';
      case 3: return formData.serviceIds.length > 0;
      case 4: return formData.locationId !== '';
      case 5: return formData.appointmentDate !== '' && formData.appointmentTime !== '';
      case 6: return formData.customerFirstName !== '' && formData.customerLastName !== '' && formData.customerEmail !== '' && formData.customerPhone !== '';
      case 7: return !isBookingConfirmed;
      default: return false;
    }
  };

  return (
    <BookingContainer>
      <Helmet>
        <title>Réservation - Barbershop</title>
        <meta name="description" content="Réservez votre rendez-vous en ligne. Choisissez votre service, salon, coiffeur et créneau." />
      </Helmet>

      <HeroSection>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroTitle>Réservation en ligne</HeroTitle>
            <HeroSubtitle>
              Réservez votre rendez-vous en quelques clics
            </HeroSubtitle>
          </motion.div>
        </Container>
      </HeroSection>

      <BookingSection>
        <Container>
          <BookingForm onSubmit={handleSubmit}>
            <StepIndicator>
              <ProgressBar>
                <ProgressFill $progress={(currentStep / 7) * 100} />
              </ProgressBar>
              {[1, 2, 3, 4, 5, 6, 7].map((step) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <StepNumber $isActive={currentStep >= step}>{step}</StepNumber>
                  <StepLabel $isActive={currentStep >= step}>
                    {step === 1 && 'Genre'}
                    {step === 2 && 'Type'}
                    {step === 3 && 'Service'}
                    {step === 4 && 'Salon'}
                    {step === 5 && 'Date/Heure'}
                    {step === 6 && 'Infos'}
                    {step === 7 && 'Confirmation'}
                  </StepLabel>
                </div>
              ))}
            </StepIndicator>

            <FormStep>
              <StepTitle>{getStepTitle()}</StepTitle>
              <StepContent>
                {getStepContent()}
              </StepContent>
            </FormStep>

            <NavigationButtons>
              {currentStep > 1 && !isBookingConfirmed && (
                <ButtonSecondary onClick={prevStep}>
                  <FaArrowLeft /> Précédent
                </ButtonSecondary>
              )}
              
              {isBookingConfirmed && (
                <ButtonSecondary onClick={() => window.location.reload()}>
                  <FaArrowLeft /> Nouvelle réservation
                </ButtonSecondary>
              )}
              
              {currentStep < 7 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceedToNext()}
                >
                  Suivant <FaArrowRight />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canProceedToNext() || loading || isBookingConfirmed}
                >
                  {loading ? <FaSpinner className="spinner" /> : <FaCheck />} 
                  {isBookingConfirmed ? 'Réservation confirmée' : 'Confirmer la réservation'}
                </Button>
              )}
            </NavigationButtons>

            {error && <ErrorMessage>{error}</ErrorMessage>}
          </BookingForm>
        </Container>
      </BookingSection>

      {showConfirmationModal && confirmedBooking && (
        <BookingConfirmationModal
          isOpen={showConfirmationModal}
          bookingData={confirmedBooking}
          onClose={() => setShowConfirmationModal(false)}
          onNewBooking={() => {
            setShowConfirmationModal(false);
            setConfirmedBooking(null);
            setIsBookingConfirmed(false);
            setCurrentStep(1);
            setFormData({
              gender: '',
              haircutType: '',
              serviceIds: [],
              locationId: '',
              appointmentDate: '',
              appointmentTime: '',
              customerFirstName: '',
              customerLastName: '',
              customerEmail: '',
              customerPhone: '',
              notes: ''
            });
            setSelectedService(null);
            setSelectedLocation(null);
            setAvailableSlots([]);
          }}
        />
      )}
    </BookingContainer>
  );
};

export default Booking;