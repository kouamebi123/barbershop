import axios from 'axios';

// Configuration de base de l'API
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Services API
export const servicesAPI = {
  // Récupérer tous les services
  getAll: () => api.get('/services'),
  
  // Récupérer les services par catégorie
  getByCategory: (category) => api.get(`/services?category=${category}`),
  
  // Récupérer un service par ID
  getById: (id) => api.get(`/services/${id}`),
  
  // Récupérer les catégories de services
  getCategories: () => api.get('/services/categories'),
};

export const locationsAPI = {
  // Récupérer toutes les locations
  getAll: () => api.get('/locations'),
  
  // Récupérer une location par ID
  getById: (id) => api.get(`/locations/${id}`),
};


export const bookingsAPI = {
  // Récupérer toutes les réservations
  getAll: (params = {}) => api.get('/bookings', { params }),
  
  // Récupérer une réservation par ID
  getById: (id) => api.get(`/bookings/${id}`),
  
  // Créer une nouvelle réservation
  create: (bookingData) => api.post('/bookings', bookingData),
  
  // Mettre à jour une réservation
  update: (id, bookingData) => api.put(`/bookings/${id}`, bookingData),
  
  // Annuler une réservation
  cancel: (id, reason) => api.put(`/bookings/${id}`, { status: 'cancelled', cancellationReason: reason }),
  
  // Récupérer les disponibilités
  getAvailability: (locationId, date) => api.get(`/bookings/availability?locationId=${locationId}&date=${date}`),
};

export const authAPI = {
  // Connexion admin
  login: (credentials) => api.post('/auth/login', credentials),
  
  // Récupérer le profil admin
  getProfile: () => api.get('/auth/me'),
  
  // Mettre à jour le profil admin
  updateProfile: (profileData) => api.put('/auth/profile', profileData),
  
  // Inscription admin (super_admin seulement)
  registerAdmin: (adminData) => api.post('/auth/register-admin', adminData),
};

export const contactAPI = {
  // Envoyer le formulaire de contact
  sendContactForm: (formData) => api.post('/contact', formData),
};

export const statsAPI = {
  // Récupérer les statistiques générales (publiques)
  getGeneralStats: () => api.get('/stats/general'),
  
  // Récupérer les statistiques du dashboard (admin)
  getDashboardStats: () => api.get('/stats/dashboard'),
};

export const adminAPI = {
  // Récupérer les statistiques du tableau de bord
  getDashboardStats: () => api.get('/admin/dashboard'),
  
  // Récupérer les réservations pour l'admin
  getBookings: (params = {}) => api.get('/admin/bookings', { params }),
  
  // Exporter les réservations
  exportBookings: (params = {}) => api.get('/admin/export/bookings', { params, responseType: 'blob' }),
  
  // Mettre à jour le statut d'une réservation
  updateBookingStatus: (id, status, cancellationReason = null) => 
    api.patch(`/bookings/${id}/status`, { status, cancellationReason }),
};

export const testimonialsAPI = {
  // Récupérer tous les témoignages (public)
  getAll: (params = {}) => api.get('/testimonials', { params }),
  
  // Créer un nouveau témoignage
  create: (data) => api.post('/testimonials', data),
  
  // Récupérer tous les témoignages (admin)
  getAllAdmin: (params = {}) => api.get('/testimonials/admin', { params }),
  
  // Mettre à jour le statut d'un témoignage (admin)
  updateStatus: (id, data) => api.patch(`/testimonials/${id}/status`, data),
  
  // Supprimer un témoignage (admin)
  delete: (id) => api.delete(`/testimonials/${id}`),
  
  // Récupérer les statistiques des témoignages (admin)
  getStats: () => api.get('/testimonials/admin/stats'),
};

// API pour le système de genres
export const genderAPI = {
  // Récupérer tous les genres disponibles
  getGenders: () => api.get('/gender/genders'),
  
  // Récupérer les types de coupes par genre
  getHaircutTypes: (gender) => api.get(`/gender/haircut-types/${gender}`),
  
  // Récupérer les services par genre et type de coupe
  getServices: (gender, haircutType) => api.get(`/gender/services/${gender}/${haircutType}`),
  
  // Récupérer les salons par genre et type de coupe
  getLocations: (gender, haircutType) => api.get(`/gender/locations/${gender}/${haircutType}`),
  
  // Récupérer les coiffeurs par salon, genre et type de coupe
};

export default api;
