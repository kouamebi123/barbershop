import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCut, 
  FaChartLine, 
  FaSignOutAlt, 
  FaSpinner,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaFilter,
  FaSearch,
  FaPlus,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import 'moment/locale/fr';

import { adminAPI, authAPI } from '../../services/api';

import {
  DashboardContainer,
  DashboardHeader,
  HeaderContent,
  HeaderTitle,
  HeaderSubtitle,
  LogoutButton,
  DashboardContent,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  StatChange,
  ContentGrid,
  ContentCard,
  CardHeader,
  CardTitle,
  CardAction,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHeaderCell,
  StatusBadge,
  ActionButton,
  ButtonGroup,
  SearchInput,
  FilterSelect,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
  ChartContainer,
  RecentBookings,
  BookingItem,
  BookingInfo,
  BookingStatus,
  QuickActions,
  ActionCard,
  ActionIcon,
  ActionTitle,
  ActionDescription
} from './AdminDashboard.styles';

moment.locale('fr');

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Vérifier l'authentification
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
  }, [navigate]);

  // Charger les données du tableau de bord
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminAPI.getDashboardStats();
        setDashboardData(response.data);
      } catch (err) {
        console.error('Erreur lors du chargement du tableau de bord:', err);
        setError('Impossible de charger les données du tableau de bord.');
        toast.error('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      toast.success('Déconnexion réussie');
      navigate('/admin/login');
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err);
      toast.error('Erreur lors de la déconnexion');
    }
  };

  const handleExportBookings = async () => {
    try {
      const response = await adminAPI.exportBookings({
        status: statusFilter !== 'all' ? statusFilter : undefined,
        search: searchTerm || undefined
      });
      
      // Créer un lien de téléchargement
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reservations-${moment().format('YYYY-MM-DD')}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      
      toast.success('Export des réservations réussi');
    } catch (err) {
      console.error('Erreur lors de l\'export:', err);
      toast.error('Erreur lors de l\'export des réservations');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { color: '#28a745', icon: FaCheckCircle, text: 'Confirmé' },
      pending: { color: '#ffc107', icon: FaClock, text: 'En attente' },
      cancelled: { color: '#dc3545', icon: FaTimesCircle, text: 'Annulé' },
      completed: { color: '#17a2b8', icon: FaCheckCircle, text: 'Terminé' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const IconComponent = config.icon;
    
    return (
      <StatusBadge color={config.color}>
        <IconComponent />
        {config.text}
      </StatusBadge>
    );
  };

  if (loading) {
    return (
      <DashboardContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <LoadingSpinner>
            <FaSpinner />
            Chargement du tableau de bord...
          </LoadingSpinner>
        </div>
      </DashboardContainer>
    );
  }

  if (error) {
    return (
      <DashboardContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <ErrorMessage>
            <FaExclamationTriangle />
            {error}
          </ErrorMessage>
        </div>
      </DashboardContainer>
    );
  }

  if (!dashboardData) {
    return (
      <DashboardContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <EmptyState>
            Aucune donnée disponible
          </EmptyState>
        </div>
      </DashboardContainer>
    );
  }

  const {
    totalBookings,
    totalRevenue,
    totalCustomers,
    totalBarbers,
    recentBookings,
    bookingsByStatus,
    monthlyRevenue,
    topBarbers
  } = dashboardData;

  return (
    <DashboardContainer>
      <Helmet>
        <title>Tableau de Bord Admin - Barbershop Rennes</title>
        <meta name="description" content="Tableau de bord d'administration pour la gestion du barbershop" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Header */}
      <DashboardHeader>
        <HeaderContent>
          <div>
            <HeaderTitle>Tableau de Bord</HeaderTitle>
            <HeaderSubtitle>
              Bienvenue dans l'espace d'administration
            </HeaderSubtitle>
          </div>
          <LogoutButton onClick={handleLogout}>
            <FaSignOutAlt />
            Déconnexion
          </LogoutButton>
        </HeaderContent>
      </DashboardHeader>

      <DashboardContent>
        {/* Statistiques principales */}
        <StatsGrid>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <StatCard>
              <StatIcon color="#d4af37">
                <FaCalendarAlt />
              </StatIcon>
              <StatValue>{totalBookings}</StatValue>
              <StatLabel>Réservations</StatLabel>
              <StatChange positive>+12% ce mois</StatChange>
            </StatCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <StatCard>
              <StatIcon color="#28a745">
                <FaChartLine />
              </StatIcon>
              <StatValue>{totalRevenue}€</StatValue>
              <StatLabel>Chiffre d'affaires</StatLabel>
              <StatChange positive>+8% ce mois</StatChange>
            </StatCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <StatCard>
              <StatIcon color="#17a2b8">
                <FaUsers />
              </StatIcon>
              <StatValue>{totalCustomers}</StatValue>
              <StatLabel>Clients</StatLabel>
              <StatChange positive>+5% ce mois</StatChange>
            </StatCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <StatCard>
              <StatIcon color="#6f42c1">
                <FaCut />
              </StatIcon>
              <StatValue>{totalBarbers}</StatValue>
              <StatLabel>Coiffeurs</StatLabel>
              <StatChange>Actifs</StatChange>
            </StatCard>
          </motion.div>
        </StatsGrid>

        {/* Contenu principal */}
        <ContentGrid>
          {/* Réservations récentes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <ContentCard>
              <CardHeader>
                <CardTitle>Réservations Récentes</CardTitle>
                <CardAction>
                  <ActionButton onClick={handleExportBookings}>
                    <FaDownload />
                    Exporter
                  </ActionButton>
                </CardAction>
              </CardHeader>
              
              <RecentBookings>
                {recentBookings && recentBookings.length > 0 ? (
                  recentBookings.map((booking, index) => (
                    <BookingItem key={booking.id}>
                      <BookingInfo>
                        <div>
                          <strong>{booking.customerFirstName} {booking.customerLastName}</strong>
                          <div>{booking.serviceName}</div>
                          <div>{moment(booking.appointmentDate).format('DD/MM/YYYY')} à {booking.appointmentTime}</div>
                        </div>
                        <BookingStatus>
                          {getStatusBadge(booking.status)}
                        </BookingStatus>
                      </BookingInfo>
                    </BookingItem>
                  ))
                ) : (
                  <EmptyState>Aucune réservation récente</EmptyState>
                )}
              </RecentBookings>
            </ContentCard>
          </motion.div>

          {/* Actions rapides */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <ContentCard>
              <CardHeader>
                <CardTitle>Actions Rapides</CardTitle>
              </CardHeader>
              
              <QuickActions>
                <ActionCard>
                  <ActionIcon color="#d4af37">
                    <FaPlus />
                  </ActionIcon>
                  <ActionTitle>Nouvelle Réservation</ActionTitle>
                  <ActionDescription>Créer une réservation manuellement</ActionDescription>
                </ActionCard>
                
                <ActionCard>
                  <ActionIcon color="#28a745">
                    <FaUsers />
                  </ActionIcon>
                  <ActionTitle>Gérer les Coiffeurs</ActionTitle>
                  <ActionDescription>Ajouter ou modifier les coiffeurs</ActionDescription>
                </ActionCard>
                
                <ActionCard>
                  <ActionIcon color="#17a2b8">
                    <FaMapMarkerAlt />
                  </ActionIcon>
                  <ActionTitle>Gérer les Salons</ActionTitle>
                  <ActionDescription>Configurer les emplacements</ActionDescription>
                </ActionCard>
                
                <ActionCard>
                  <ActionIcon color="#6f42c1">
                    <FaCut />
                  </ActionIcon>
                  <ActionTitle>Gérer les Services</ActionTitle>
                  <ActionDescription>Modifier les services disponibles</ActionDescription>
                </ActionCard>
              </QuickActions>
            </ContentCard>
          </motion.div>
        </ContentGrid>

        {/* Statistiques détaillées */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <ContentCard>
            <CardHeader>
              <CardTitle>Statistiques Détaillées</CardTitle>
            </CardHeader>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
              {/* Réservations par statut */}
              <div>
                <h4>Réservations par Statut</h4>
                {bookingsByStatus && Object.entries(bookingsByStatus).map(([status, count]) => (
                  <div key={status} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>
              
              {/* Top coiffeurs */}
              <div>
                <h4>Top Coiffeurs</h4>
                {topBarbers && topBarbers.map((barber, index) => (
                  <div key={barber.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>{barber.firstName} {barber.lastName}</span>
                    <span>{barber.totalBookings} réservations</span>
                  </div>
                ))}
              </div>
            </div>
          </ContentCard>
        </motion.div>
      </DashboardContent>
    </DashboardContainer>
  );
};

export default AdminDashboard;