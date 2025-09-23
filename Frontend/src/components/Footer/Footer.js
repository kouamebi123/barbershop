import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt,
  FaClock,
  FaArrowUp
} from 'react-icons/fa';
import { APP_CONFIG, SOCIAL_LINKS, OPENING_HOURS } from '../../constants';

import {
  FooterContainer,
  FooterContent,
  FooterSection,
  FooterTitle,
  FooterLink,
  FooterText,
  FooterIcon,
  FooterBottom,
  FooterCopyright,
  SocialLinks,
  SocialLink,
  BackToTop,
  FooterGrid,
  ContactInfo,
  ContactItem,
  QuickLinks,
  QuickLink,
  NewsletterSection,
  NewsletterTitle,
  NewsletterDescription,
  NewsletterForm,
  NewsletterInput,
  NewsletterButton
} from './Footer.styles';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* Logo et description */}
          <FooterSection>
            <FooterTitle>Votre Barbershop</FooterTitle>
            <FooterText>
              Votre barbershop de confiance. Nous offrons des services de coiffure 
              et de soins de qualité dans une ambiance chaleureuse et professionnelle.
            </FooterText>
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
          </FooterSection>

          {/* Liens rapides */}
          <FooterSection>
            <FooterTitle>Liens Rapides</FooterTitle>
            <QuickLinks>
              <QuickLink as={Link} to="/">Accueil</QuickLink>
              <QuickLink as={Link} to="/about">À Propos</QuickLink>
              <QuickLink as={Link} to="/services">Services</QuickLink>
              <QuickLink as={Link} to="/booking">Réserver</QuickLink>
              <QuickLink as={Link} to="/locations">Nos Salons</QuickLink>
              <QuickLink as={Link} to="/contact">Contact</QuickLink>
            </QuickLinks>
          </FooterSection>

          {/* Services */}
          <FooterSection>
            <FooterTitle>Nos Services</FooterTitle>
            <QuickLinks>
              <QuickLink as={Link} to="/services">Coupe de cheveux</QuickLink>
              <QuickLink as={Link} to="/services">Taille de barbe</QuickLink>
              <QuickLink as={Link} to="/services">Soins du visage</QuickLink>
              <QuickLink as={Link} to="/services">Rasage traditionnel</QuickLink>
              <QuickLink as={Link} to="/services">Coloration</QuickLink>
              <QuickLink as={Link} to="/services">Soins capillaires</QuickLink>
            </QuickLinks>
          </FooterSection>

          {/* Contact */}
          <FooterSection>
            <FooterTitle>Contact</FooterTitle>
            <ContactInfo>
              <ContactItem>
                <FooterIcon>
                  <FaMapMarkerAlt />
                </FooterIcon>
                <FooterText>
                  Adresse principale<br />
                  Rennes, France
                </FooterText>
              </ContactItem>
              <ContactItem>
                <FooterIcon>
                  <FaPhone />
                </FooterIcon>
                <FooterText>+33 6 12 34 56 78</FooterText>
              </ContactItem>
              <ContactItem>
                <FooterIcon>
                  <FaEnvelope />
                </FooterIcon>
                <FooterText>contact@votre-barbershop.fr</FooterText>
              </ContactItem>
              <ContactItem>
                <FooterIcon>
                  <FaClock />
                </FooterIcon>
                <FooterText>
                  Lun - Ven: 9h00 - 19h00<br />
                  Samedi: 8h00 - 18h00<br />
                  Dimanche: Fermé
                </FooterText>
              </ContactItem>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <NewsletterSection>
            <NewsletterTitle>Restez Informé</NewsletterTitle>
            <NewsletterDescription>
              Recevez nos dernières actualités et offres spéciales
            </NewsletterDescription>
            <NewsletterForm>
              <NewsletterInput
                type="email"
                placeholder="Votre adresse email"
                required
              />
              <NewsletterButton type="submit">
                S'abonner
              </NewsletterButton>
            </NewsletterForm>
          </NewsletterSection>
        </motion.div>
      </FooterContent>

      <FooterBottom>
        <FooterCopyright>
          © {currentYear} Votre Barbershop. Tous droits réservés.
        </FooterCopyright>
        <BackToTop onClick={scrollToTop}>
          <FaArrowUp />
        </BackToTop>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;