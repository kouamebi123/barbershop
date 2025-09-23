import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaSpinner, FaPlus, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { testimonialsAPI, servicesAPI, locationsAPI } from '../../services/api';
import { TESTIMONIALS_PREVIEW } from '../../constants';

import {
  Section,
  Container,
  SectionTitle,
  SectionSubtitle,
  TestimonialsGrid,
  TestimonialCard,
  TestimonialContent,
  TestimonialQuote,
  TestimonialAuthor,
  TestimonialName,
  TestimonialRating,
  LoadingMessage,
  EmptyMessage,
  AddTestimonialButton,
  TestimonialForm,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  FormButton,
  FormButtonGroup,
  CloseButton,
  StarRating
} from './Testimonials.styles';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    rating: 5,
    comment: '',
    serviceId: '',
    locationId: '',
  });
  const [services, setServices] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchTestimonials();
    fetchFormData();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      console.log('🔍 [Testimonials] Fetching testimonials...');
      
      const response = await testimonialsAPI.getAll();
      console.log('🔍 [Testimonials] API Response:', response.data);
      
      if (response.data.success) {
        setTestimonials(response.data.data.testimonials || []);
      } else {
        console.error('❌ [Testimonials] API Error:', response.data.message);
        setTestimonials([]);
      }
    } catch (error) {
      console.error('❌ [Testimonials] Error fetching testimonials:', error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchFormData = async () => {
    try {
      // Charger les services et locations pour le formulaire
      const [servicesRes, locationsRes] = await Promise.all([
        servicesAPI.getAll(),
        locationsAPI.getAll()
      ]);

      if (servicesRes.data.success) {
        setServices(servicesRes.data.data.services || []);
      }
      if (locationsRes.data.success) {
        setLocations(locationsRes.data.data.locations || []);
      }
    } catch (error) {
      console.error('❌ [Testimonials] Error fetching form data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      console.log('🔍 [Testimonials] Submitting testimonial:', formData);

      const response = await testimonialsAPI.create(formData);
      console.log('🔍 [Testimonials] Submit response:', response.data);
      
      if (response.data.success) {
        toast.success('Témoignage soumis avec succès ! Il sera validé avant publication.');
        setShowForm(false);
        setFormData({
          customerName: '',
          customerEmail: '',
          rating: 5,
          comment: '',
          serviceId: '',
          locationId: '',
        });
        // Rafraîchir la liste des témoignages
        fetchTestimonials();
      } else {
        toast.error(response.data.message || 'Erreur lors de la soumission du témoignage');
      }
    } catch (error) {
      console.error('❌ [Testimonials] Error submitting testimonial:', error);
      toast.error('Erreur lors de la soumission du témoignage');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Section>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle>Témoignages</SectionTitle>
            <SectionSubtitle>Ce que disent nos clients de notre service</SectionSubtitle>
            <LoadingMessage>
              <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '10px' }} />
              Chargement des témoignages...
            </LoadingMessage>
          </motion.div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>Témoignages</SectionTitle>
          <SectionSubtitle>Ce que disent nos clients de notre service</SectionSubtitle>
          
          {!showForm && (
            <AddTestimonialButton onClick={() => setShowForm(true)}>
              <FaPlus />
              Ajouter un témoignage
            </AddTestimonialButton>
          )}

          {showForm && (
            <TestimonialForm onSubmit={handleSubmit}>
              <CloseButton onClick={() => setShowForm(false)}>
                <FaTimes />
              </CloseButton>
              
              <h3>Partagez votre expérience</h3>
              
              <FormGroup>
                <FormLabel>Nom complet *</FormLabel>
                <FormInput
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                  minLength={2}
                  maxLength={100}
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Email *</FormLabel>
                <FormInput
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Note *</FormLabel>
                <StarRating>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      onClick={() => handleRatingChange(star)}
                      style={{
                        color: star <= formData.rating ? '#d4af37' : '#ddd',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        marginRight: '5px'
                      }}
                    />
                  ))}
                  <span>({formData.rating}/5)</span>
                </StarRating>
              </FormGroup>

              <FormGroup>
                <FormLabel>Commentaire *</FormLabel>
                <FormTextarea
                  name="comment"
                  value={formData.comment}
                  onChange={handleInputChange}
                  required
                  minLength={10}
                  maxLength={1000}
                  rows={4}
                  placeholder="Décrivez votre expérience avec notre service..."
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Service (optionnel)</FormLabel>
                <FormSelect
                  name="serviceId"
                  value={formData.serviceId}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner un service</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} - {service.price}€
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel>Salon (optionnel)</FormLabel>
                <FormSelect
                  name="locationId"
                  value={formData.locationId}
                  onChange={handleInputChange}
                >
                  <option value="">Sélectionner un salon</option>
                  {locations.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.name} - {location.city}
                    </option>
                  ))}
                </FormSelect>
              </FormGroup>


              <FormButtonGroup>
                <FormButton type="button" onClick={() => setShowForm(false)}>
                  Annuler
                </FormButton>
                <FormButton type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '5px' }} />
                      Envoi...
                    </>
                  ) : (
                    'Envoyer le témoignage'
                  )}
                </FormButton>
              </FormButtonGroup>
            </TestimonialForm>
          )}

          {testimonials.length === 0 && !showForm ? (
            <EmptyMessage>
              Aucun témoignage disponible pour le moment.
            </EmptyMessage>
          ) : (
            <TestimonialsGrid>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <TestimonialCard>
                    <TestimonialContent>
                      <TestimonialQuote>
                        <FaQuoteLeft />
                        {testimonial.comment}
                      </TestimonialQuote>
                      <TestimonialAuthor>
                        <TestimonialName>{testimonial.customerName}</TestimonialName>
                        <TestimonialRating>
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              style={{
                                color: i < testimonial.rating ? '#d4af37' : '#ddd',
                                marginRight: '2px'
                              }}
                            />
                          ))}
                        </TestimonialRating>
                      </TestimonialAuthor>
                    </TestimonialContent>
                  </TestimonialCard>
                </motion.div>
              ))}
            </TestimonialsGrid>
          )}
        </motion.div>
      </Container>
    </Section>
  );
};

export default Testimonials;