import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaEye, FaEyeSlash, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authAPI } from '../../services/api';
import { ADMIN_LOGIN } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';

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
  const navigate = useNavigate();
  const { login, clearAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleClearAuth = () => {
    clearAuth();
    setError('');
    toast.info('Données d\'authentification nettoyées');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData);
      
      if (result.success) {
        toast.success('Connexion réussie !');
        navigate('/admin/dashboard');
      } else {
        setError(result.error);
        toast.error(result.error);
      }
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
        <title>{ADMIN_LOGIN.title}</title>
        <meta name="description" content={ADMIN_LOGIN.description} />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LoginCard>
          <LoginHeader>
            <LoginTitle>{ADMIN_LOGIN.title}</LoginTitle>
            <LoginSubtitle>
              {ADMIN_LOGIN.subtitle}
            </LoginSubtitle>
          </LoginHeader>

          <LoginForm onSubmit={handleSubmit}>
            {error && (
              <ErrorMessage>
                <FaExclamationTriangle /> {error}
              </ErrorMessage>
            )}

            <FormGroup>
              <Label htmlFor="username">Nom d'utilisateur</Label>
              <Input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Entrez votre nom d'utilisateur"
                required
                autoComplete="username"
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
              Barbershop
            </FooterLink>
            <div style={{ marginTop: '1rem' }}>
              <button 
                type="button" 
                onClick={handleClearAuth}
                style={{
                  background: 'transparent',
                  border: '1px solid #ccc',
                  color: '#666',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                Nettoyer les données
              </button>
            </div>
          </LoginFooter>
        </LoginCard>
      </motion.div>
    </LoginContainer>
  );
};

export default AdminLogin;