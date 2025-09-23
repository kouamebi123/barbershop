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
  FaDownload,
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

import { adminAPI } from '../../services/api';
import { ADMIN_DASHBOARD, ADMIN_ACTIONS, ADMIN_STATUS } from '../../constants';
import { useAuth } from '../../contexts/AuthContext';
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar';
import BookingActions from '../../components/BookingActions/BookingActions';

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
  StatusBadge,
  ActionButton,
  LoadingSpinner,
  ErrorMessage,
  EmptyState,
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
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Protection d'authentification
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      console.log('🔍 [AdminDashboard] Not authenticated, redirecting to login');
      navigate('/admin/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Charger les données du tableau de bord
  useEffect(() => {
    if (!isAuthenticated || authLoading) return;
    
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminAPI.getDashboardStats();
        console.log('🔍 [AdminDashboard] API Response:', response.data);
        setDashboardData(response.data.data || response.data);
      } catch (err) {
        console.error('Erreur lors du chargement du tableau de bord:', err);
        setError('Impossible de charger les données du tableau de bord.');
        toast.error('Erreur lors du chargement des données.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAuthenticated, authLoading]);


  const handleBookingStatusUpdate = (bookingId, newStatus) => {
    setDashboardData(prevData => ({
      ...prevData,
      recentBookings: prevData.recentBookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      ),
      bookingsByStatus: {
        ...prevData.bookingsByStatus,
        [newStatus]: (prevData.bookingsByStatus[newStatus] || 0) + 1,
        [prevData.recentBookings.find(b => b.id === bookingId)?.status]: 
          (prevData.bookingsByStatus[prevData.recentBookings.find(b => b.id === bookingId)?.status] || 1) - 1
      }
    }));
  };

  const handleViewBooking = (booking) => {
    // TODO: Implémenter la vue détaillée
    console.log('Voir réservation:', booking);
    toast.info('Fonctionnalité en cours de développement');
  };

  const handleEditBooking = (booking) => {
    // TODO: Implémenter l'édition
    console.log('Éditer réservation:', booking);
    toast.info('Fonctionnalité en cours de développement');
  };

  // Afficher un loader pendant la vérification d'authentification
  if (authLoading) {
    console.log('🔍 [AdminDashboard] Auth loading...');
    return (
      <DashboardContainer>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <FaSpinner className="fa-spin" size={32} />
        </div>
      </DashboardContainer>
    );
  }

  // Rediriger si pas authentifié
  if (!isAuthenticated) {
    console.log('🔍 [AdminDashboard] Not authenticated, returning null');
    return null;
  }

  console.log('🔍 [AdminDashboard] Authenticated, rendering dashboard');

  const handleExportBookings = async () => {
    try {
      const response = await adminAPI.exportBookings({
        status: undefined,
        search: undefined
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
      confirmed: { color: '#28a745', icon: FaCheckCircle, text: ADMIN_STATUS.confirmed },
      pending: { color: '#ffc107', icon: FaClock, text: ADMIN_STATUS.pending },
      cancelled: { color: '#dc3545', icon: FaTimesCircle, text: ADMIN_STATUS.cancelled },
      completed: { color: '#17a2b8', icon: FaCheckCircle, text: ADMIN_STATUS.completed }
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
    recentBookings,
    bookingsByStatus,
  } = dashboardData;

  return (
    <>
      <AdminNavbar />
      <DashboardContainer>
        <Helmet>
          <title>{ADMIN_DASHBOARD.title}</title>
          <meta name="description" content={ADMIN_DASHBOARD.description} />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        {/* Header */}
        <DashboardHeader>
          <HeaderContent>
            <div>
              <HeaderTitle>{ADMIN_DASHBOARD.title}</HeaderTitle>
              <HeaderSubtitle>
                {ADMIN_DASHBOARD.subtitle}
              </HeaderSubtitle>
            </div>
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
              <StatLabel>{ADMIN_DASHBOARD.stats.totalBookings.title}</StatLabel>
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
              <StatLabel>{ADMIN_DASHBOARD.stats.totalRevenue.title}</StatLabel>
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
              <StatLabel>{ADMIN_DASHBOARD.stats.totalClients.title}</StatLabel>
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
              <StatLabel>{ADMIN_DASHBOARD.stats.totalLocations.title}</StatLabel>
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
                <CardTitle>{ADMIN_DASHBOARD.sections.recentBookings.title}</CardTitle>
                <CardAction>
                  <ActionButton onClick={handleExportBookings}>
                    <FaDownload />
                    {ADMIN_ACTIONS.export}
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
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                            {booking.locationName}
                          </div>
                        </div>
                        <BookingActions
                          booking={booking}
                          onStatusUpdate={handleBookingStatusUpdate}
                          onView={handleViewBooking}
                          onEdit={handleEditBooking}
                        />
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
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span>Services populaires</span>
                  <span>En cours de développement</span>
                </div>
              </div>
            </div>
          </ContentCard>
        </motion.div>
      </DashboardContent>
      </DashboardContainer>
    </>
  );
};

export default AdminDashboard;