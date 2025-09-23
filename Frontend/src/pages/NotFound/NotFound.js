import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaHome, FaArrowLeft, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import {
  NotFoundContainer,
  NotFoundContent,
  NotFoundIcon,
  NotFoundTitle,
  NotFoundSubtitle,
  NotFoundDescription,
  NotFoundActions,
  Button,
  ButtonSecondary,
  SearchSection,
  SearchTitle,
  SearchSuggestions,
  SuggestionItem,
  SuggestionLink
} from './NotFound.styles';

const NotFound = () => {
  const suggestions = [
    { path: '/', label: 'Accueil' },
    { path: '/services', label: 'Nos Services' },
    { path: '/booking', label: 'Réserver' },
    { path: '/locations', label: 'Nos Salons' },
    { path: '/about', label: 'À Propos' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <NotFoundContainer>
      <Helmet>
        <title>Page Non Trouvée - Barbershop</title>
        <meta name="description" content="La page que vous recherchez n'existe pas. Retournez à l'accueil ou explorez nos services." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <NotFoundContent>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <NotFoundIcon>
            <FaExclamationTriangle />
          </NotFoundIcon>
          
          <NotFoundTitle>404</NotFoundTitle>
          <NotFoundSubtitle>Page Non Trouvée</NotFoundSubtitle>
          <NotFoundDescription>
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            <br />
            Retournez à l'accueil ou explorez nos services.
          </NotFoundDescription>

          <NotFoundActions>
            <Button as={Link} to="/">
              <FaHome />
              Retour à l'accueil
            </Button>
            <ButtonSecondary onClick={() => window.history.back()}>
              <FaArrowLeft />
              Page précédente
            </ButtonSecondary>
          </NotFoundActions>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SearchSection>
            <SearchTitle>Pages Populaires</SearchTitle>
            <SearchSuggestions>
              {suggestions.map((suggestion, index) => (
                <SuggestionItem key={index}>
                  <SuggestionLink as={Link} to={suggestion.path}>
                    <FaSearch />
                    {suggestion.label}
                  </SuggestionLink>
                </SuggestionItem>
              ))}
            </SearchSuggestions>
          </SearchSection>
        </motion.div>
      </NotFoundContent>
    </NotFoundContainer>
  );
};

export default NotFound;