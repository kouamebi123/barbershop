import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../../services/api';

import {
  LoginContainer,
  LoginCard,
  LoginHeader,
  LoginTitle,
  LoginSubtitle,
  LoginForm,
  FormGroup,
  Label,
  Input,
  PasswordInput,
  PasswordToggle,
  Button,
  ErrorMessage,
  LoginFooter,
  FooterText,
  FooterLink,
  LoadingSpinner
} from './AdminLogin.styles';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est déjà connecté
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error on input change
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(formData);
      const { token, admin } = response.data;

      // Stocker le token et les informations admin
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

      toast.success('Connexion réussie !');
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Erreur de connexion:', err);
      const errorMessage = err.response?.data?.error || 'Erreur de connexion. Vérifiez vos identifiants.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <Helmet>
        <title>Connexion Admin - Barbershop Rennes</title>
        <meta name="description" content="Espace d'administration pour la gestion du barbershop" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LoginCard>
          <LoginHeader>
            <LoginTitle>Espace Administration</LoginTitle>
            <LoginSubtitle>
              Connectez-vous pour accéder au tableau de bord
            </LoginSubtitle>
          </LoginHeader>

          <LoginForm onSubmit={handleSubmit}>
            {error && (
              <ErrorMessage>
                <FaExclamationTriangle /> {error}
              </ErrorMessage>
            )}

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Entrez votre email"
                required
                autoComplete="email"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Mot de passe</Label>
              <PasswordInput>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Entrez votre mot de passe"
                  required
                  autoComplete="current-password"
                />
                <PasswordToggle onClick={togglePasswordVisibility}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </PasswordToggle>
              </PasswordInput>
            </FormGroup>

            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoadingSpinner>
                  <FaSpinner />
                  Connexion...
                </LoadingSpinner>
              ) : (
                <>
                  <FaLock />
                  Se connecter
                </>
              )}
            </Button>
          </LoginForm>

          <LoginFooter>
            <FooterText>
              Retour au site public
            </FooterText>
            <FooterLink as={Link} to="/">
              Barbershop Rennes
            </FooterLink>
          </LoginFooter>
        </LoginCard>
      </motion.div>
    </LoginContainer>
  );
};

export default AdminLogin;