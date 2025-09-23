import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    console.log('🔍 [AuthContext] Initializing auth context...');
    const rawToken = localStorage.getItem('token');
    // Normaliser le token: éviter la chaîne 'undefined' enregistrée par erreur
    const token = rawToken && rawToken !== 'undefined' ? rawToken : null;
    const adminData = localStorage.getItem('admin');
    
    console.log('🔍 [AuthContext] Token exists:', !!token);
    console.log('🔍 [AuthContext] Admin data exists:', !!adminData);
    
    // Nettoyer le localStorage si les données sont incohérentes
    if (!token && adminData) {
      console.log('🔍 [AuthContext] Cleaning inconsistent localStorage data');
      localStorage.removeItem('admin');
    }
    
    if (token && adminData) {
      try {
        const admin = JSON.parse(adminData);
        console.log('🔍 [AuthContext] Parsed admin data:', admin);
        setUser(admin);
        setIsAuthenticated(true);
        console.log('🔍 [AuthContext] User authenticated');
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('admin');
      }
    } else {
      console.log('🔍 [AuthContext] No token or admin data found');
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      // Les réponses backend sont enveloppées: { success, message, data: { token, admin } }
      const payload = response?.data?.data || response?.data;
      const token = payload?.token;
      const admin = payload?.admin;

      if (!token || !admin) {
        throw new Error("Réponse de connexion invalide");
      }
      
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));
      
      setUser(admin);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || error.message || 'Erreur de connexion' 
      };
    }
  };

  const logout = () => {
    console.log('🔍 [AuthContext] Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setUser(null);
    setIsAuthenticated(false);
  };

  const clearAuth = () => {
    console.log('🔍 [AuthContext] Clearing auth data...');
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await authAPI.updateProfile(profileData);
      // Peut renvoyer { data: { admin } } selon le contrôleur
      const updatedAdmin = response?.data?.data?.admin || response?.data?.data || response?.data;
      
      localStorage.setItem('admin', JSON.stringify(updatedAdmin));
      setUser(updatedAdmin);
      
      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Erreur lors de la mise à jour' 
      };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    clearAuth,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};