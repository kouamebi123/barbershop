import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import { 
  FaUsers, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaCut, 
  FaChartLine, 
  FaSpinner,
  FaDownload,
  FaPlus,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaEdit,
  FaUser,
  FaTimes,
  FaEuroSign,
  FaChartBar,
  FaCalendarCheck
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
  QuickActions,
  ActionCard,
  ActionIcon,
  ActionTitle,
  ActionDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalActions,
  ModalButton,
  BookingDetail,
  BookingDetailIcon,
  BookingDetailContent,
  BookingDetailLabel,
  BookingDetailValue,
  FormGroup,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextarea,
  DetailedStatsGrid,
  StatSection,
  StatSectionTitle,
  StatItem,
  StatItemInfo,
  StatItemName,
  StatItemDetails,
  StatItemValue,
  StatItemMain,
  StatItemSecondary,
  TrendChart
} from './AdminDashboard.styles';

moment.locale('fr');

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showEditBookingModal, setShowEditBookingModal] = useState(false);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);


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
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setShowEditBookingModal(true);
  };

  // Handlers pour les actions rapides
  const handleNewBooking = () => {
    setShowNewBookingModal(true);
  };

  const handleManageStaff = () => {
    setShowStaffModal(true);
  };

  const handleManageLocations = () => {
    setShowLocationModal(true);
  };

  const handleManageServices = () => {
    setShowServiceModal(true);
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
                <ActionCard onClick={handleNewBooking}>
                  <ActionIcon color="#d4af37">
                    <FaPlus />
                  </ActionIcon>
                  <ActionTitle>Nouvelle Réservation</ActionTitle>
                  <ActionDescription>Créer une réservation manuellement</ActionDescription>
                </ActionCard>
                
                <ActionCard onClick={handleManageStaff}>
                  <ActionIcon color="#28a745">
                    <FaUsers />
                  </ActionIcon>
                  <ActionTitle>Gérer les Coiffeurs</ActionTitle>
                  <ActionDescription>Ajouter ou modifier les coiffeurs</ActionDescription>
                </ActionCard>
                
                <ActionCard onClick={handleManageLocations}>
                  <ActionIcon color="#17a2b8">
                    <FaMapMarkerAlt />
                  </ActionIcon>
                  <ActionTitle>Gérer les Salons</ActionTitle>
                  <ActionDescription>Configurer les emplacements</ActionDescription>
                </ActionCard>
                
                <ActionCard onClick={handleManageServices}>
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
              <CardTitle>Analyse Détaillée & Performance</CardTitle>
            </CardHeader>
            
            <DetailedStatsGrid>
              {/* Réservations par Statut */}
              <StatSection>
                <StatSectionTitle>
                  <FaCalendarAlt />
                  Réservations par Statut
                </StatSectionTitle>
                {bookingsByStatus && Object.entries(bookingsByStatus).map(([status, count]) => (
                  <StatItem key={status}>
                    <StatItemInfo>
                      <StatItemName style={{ 
                        color: status === 'confirmed' ? '#27ae60' : 
                               status === 'pending' ? '#f39c12' : '#e74c3c',
                        textTransform: 'capitalize'
                      }}>
                        {status === 'confirmed' ? 'Confirmées' :
                         status === 'pending' ? 'En attente' :
                         status === 'cancelled' ? 'Annulées' :
                         status === 'completed' ? 'Terminées' : status}
                      </StatItemName>
                      <StatItemDetails>
                        <span><FaCalendarCheck /> {count} réservations</span>
                      </StatItemDetails>
                    </StatItemInfo>
                    <StatItemValue>
                      <StatItemMain>{count}</StatItemMain>
                      <StatItemSecondary>
                        {Math.round((count / Object.values(bookingsByStatus).reduce((a, b) => a + b, 0)) * 100)}%
                      </StatItemSecondary>
                    </StatItemValue>
                  </StatItem>
                ))}
                <TrendChart>
                  <FaChartBar style={{ marginRight: '8px' }} />
                  Répartition des statuts de réservation
                </TrendChart>
              </StatSection>

              {/* Réservations Récentes - Statistiques */}
              <StatSection>
                <StatSectionTitle>
                  <FaUsers />
                  Activité Récente
                </StatSectionTitle>
                <StatItem>
                  <StatItemInfo>
                    <StatItemName>Total des Réservations</StatItemName>
                    <StatItemDetails>
                      <span>Toutes les réservations confondues</span>
                    </StatItemDetails>
                  </StatItemInfo>
                  <StatItemValue>
                    <StatItemMain>{totalBookings}</StatItemMain>
                    <StatItemSecondary>Réservations</StatItemSecondary>
                  </StatItemValue>
                </StatItem>

                <StatItem>
                  <StatItemInfo>
                    <StatItemName>Chiffre d'Affaires</StatItemName>
                    <StatItemDetails>
                      <span>Revenus totaux</span>
                    </StatItemDetails>
                  </StatItemInfo>
                  <StatItemValue>
                    <StatItemMain><FaEuroSign />{totalRevenue}</StatItemMain>
                    <StatItemSecondary>Revenus</StatItemSecondary>
                  </StatItemValue>
                </StatItem>

                <StatItem>
                  <StatItemInfo>
                    <StatItemName>Clients Uniques</StatItemName>
                    <StatItemDetails>
                      <span>Nombre de clients distincts</span>
                    </StatItemDetails>
                  </StatItemInfo>
                  <StatItemValue>
                    <StatItemMain>{totalCustomers}</StatItemMain>
                    <StatItemSecondary>Clients</StatItemSecondary>
                  </StatItemValue>
                </StatItem>

                <TrendChart>
                  <FaChartLine style={{ marginRight: '8px' }} />
                  Évolution des réservations
                </TrendChart>
              </StatSection>

              {/* Services et Locations */}
              <StatSection>
                <StatSectionTitle>
                  <FaCut />
                  Services & Emplacements
                </StatSectionTitle>
                <StatItem>
                  <StatItemInfo>
                    <StatItemName>Services Disponibles</StatItemName>
                    <StatItemDetails>
                      <span>Nombre de services proposés</span>
                    </StatItemDetails>
                  </StatItemInfo>
                  <StatItemValue>
                    <StatItemMain>À définir</StatItemMain>
                    <StatItemSecondary>Services</StatItemSecondary>
                  </StatItemValue>
                </StatItem>

                <StatItem>
                  <StatItemInfo>
                    <StatItemName>Emplacements Actifs</StatItemName>
                    <StatItemDetails>
                      <span>Nombre de salons</span>
                    </StatItemDetails>
                  </StatItemInfo>
                  <StatItemValue>
                    <StatItemMain>À définir</StatItemMain>
                    <StatItemSecondary>Salons</StatItemSecondary>
                  </StatItemValue>
                </StatItem>

                <TrendChart>
                  <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                  Répartition par emplacement
                </TrendChart>
              </StatSection>

              {/* Analytics Basiques */}
              <StatSection>
                <StatSectionTitle>
                  <FaChartLine />
                  Analytics
                </StatSectionTitle>
                <StatItem>
                  <StatItemInfo>
                    <StatItemName>Réservations Récentes</StatItemName>
                    <StatItemDetails>
                      <span>Dernières réservations enregistrées</span>
                    </StatItemDetails>
                  </StatItemInfo>
                  <StatItemValue>
                    <StatItemMain>{recentBookings?.length || 0}</StatItemMain>
                    <StatItemSecondary>Récentes</StatItemSecondary>
                  </StatItemValue>
                </StatItem>

                <StatItem>
                  <StatItemInfo>
                    <StatItemName>Statut Actuel</StatItemName>
                    <StatItemDetails>
                      <span>Répartition des statuts</span>
                    </StatItemDetails>
                  </StatItemInfo>
                  <StatItemValue>
                    <StatItemMain>
                      {bookingsByStatus && Object.entries(bookingsByStatus).map(([status, count]) => (
                        <div key={status} style={{ fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                          {status === 'confirmed' ? '✓' : status === 'pending' ? '⏳' : '✗'} {count}
                        </div>
                      ))}
                    </StatItemMain>
                  </StatItemValue>
                </StatItem>

                <TrendChart>
                  <FaChartBar style={{ marginRight: '8px' }} />
                  Données en temps réel
                </TrendChart>
              </StatSection>
            </DetailedStatsGrid>
          </ContentCard>
        </motion.div>
      </DashboardContent>
      </DashboardContainer>

      {/* Modal de visualisation de réservation */}
      {showBookingModal && selectedBooking && createPortal(
        <Modal>
          <ModalOverlay onClick={() => setShowBookingModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Détails de la réservation</ModalTitle>
                <ModalCloseButton onClick={() => setShowBookingModal(false)}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <BookingDetail>
                  <BookingDetailIcon color="#3498db">
                    <FaUser />
                  </BookingDetailIcon>
                  <BookingDetailContent>
                    <BookingDetailLabel>Client</BookingDetailLabel>
                    <BookingDetailValue>
                      {selectedBooking.customerFirstName} {selectedBooking.customerLastName}
                    </BookingDetailValue>
                  </BookingDetailContent>
                </BookingDetail>

                <BookingDetail>
                  <BookingDetailIcon color="#27ae60">
                    <FaCalendarAlt />
                  </BookingDetailIcon>
                  <BookingDetailContent>
                    <BookingDetailLabel>Date et heure</BookingDetailLabel>
                    <BookingDetailValue>
                      {moment(selectedBooking.appointmentDate).format('DD/MM/YYYY')} à {selectedBooking.appointmentTime}
                    </BookingDetailValue>
                  </BookingDetailContent>
                </BookingDetail>

                <BookingDetail>
                  <BookingDetailIcon color="#e74c3c">
                    <FaCut />
                  </BookingDetailIcon>
                  <BookingDetailContent>
                    <BookingDetailLabel>Service</BookingDetailLabel>
                    <BookingDetailValue>{selectedBooking.serviceName}</BookingDetailValue>
                  </BookingDetailContent>
                </BookingDetail>

                <BookingDetail>
                  <BookingDetailIcon color="#f39c12">
                    <FaMapMarkerAlt />
                  </BookingDetailIcon>
                  <BookingDetailContent>
                    <BookingDetailLabel>Salon</BookingDetailLabel>
                    <BookingDetailValue>{selectedBooking.locationName}</BookingDetailValue>
                  </BookingDetailContent>
                </BookingDetail>

                <BookingDetail>
                  <BookingDetailIcon color="#9b59b6">
                    <FaClock />
                  </BookingDetailIcon>
                  <BookingDetailContent>
                    <BookingDetailLabel>Statut</BookingDetailLabel>
                    <BookingDetailValue style={{ 
                      color: selectedBooking.status === 'confirmed' ? '#27ae60' : 
                            selectedBooking.status === 'pending' ? '#f39c12' : '#e74c3c',
                      textTransform: 'capitalize'
                    }}>
                      {selectedBooking.status === 'confirmed' ? 'Confirmée' :
                       selectedBooking.status === 'pending' ? 'En attente' :
                       selectedBooking.status === 'cancelled' ? 'Annulée' : selectedBooking.status}
                    </BookingDetailValue>
                  </BookingDetailContent>
                </BookingDetail>
              </ModalBody>
              <ModalActions>
                <ModalButton onClick={() => setShowBookingModal(false)}>
                  Fermer
                </ModalButton>
                <ModalButton 
                  className="primary"
                  onClick={() => {
                    setShowBookingModal(false);
                    handleEditBooking(selectedBooking);
                  }}
                >
                  <FaEdit style={{ marginRight: '8px' }} />
                  Modifier
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        </Modal>,
        document.body
      )}

      {/* Modal d'édition de réservation */}
      {showEditBookingModal && selectedBooking && createPortal(
        <Modal>
          <ModalOverlay onClick={() => setShowEditBookingModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Modifier la réservation</ModalTitle>
                <ModalCloseButton onClick={() => setShowEditBookingModal(false)}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Date</FormLabel>
                  <FormInput 
                    type="date" 
                    defaultValue={moment(selectedBooking.appointmentDate).format('YYYY-MM-DD')}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Heure</FormLabel>
                  <FormInput 
                    type="time" 
                    defaultValue={selectedBooking.appointmentTime}
                  />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Statut</FormLabel>
                  <FormSelect defaultValue={selectedBooking.status}>
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="cancelled">Annulée</option>
                    <option value="completed">Terminée</option>
                  </FormSelect>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Notes (optionnel)</FormLabel>
                  <FormTextarea placeholder="Ajouter des notes pour cette réservation..." />
                </FormGroup>
              </ModalBody>
              <ModalActions>
                <ModalButton onClick={() => setShowEditBookingModal(false)}>
                  Annuler
                </ModalButton>
                <ModalButton 
                  className="primary"
                  onClick={() => {
                    toast.success('Réservation mise à jour avec succès');
                    setShowEditBookingModal(false);
                  }}
                >
                  Sauvegarder
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        </Modal>,
        document.body
      )}

      {/* Modal nouvelle réservation */}
      {showNewBookingModal && createPortal(
        <Modal>
          <ModalOverlay onClick={() => setShowNewBookingModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Nouvelle réservation</ModalTitle>
                <ModalCloseButton onClick={() => setShowNewBookingModal(false)}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <FormGroup>
                  <FormLabel>Prénom</FormLabel>
                  <FormInput type="text" placeholder="Prénom du client" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Nom</FormLabel>
                  <FormInput type="text" placeholder="Nom du client" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Téléphone</FormLabel>
                  <FormInput type="tel" placeholder="Numéro de téléphone" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <FormInput type="email" placeholder="Email du client" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Date</FormLabel>
                  <FormInput type="date" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Heure</FormLabel>
                  <FormInput type="time" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Service</FormLabel>
                  <FormSelect>
                    <option value="">Sélectionner un service</option>
                    <option value="coupe">Coupe de cheveux</option>
                    <option value="barbe">Coupe de barbe</option>
                    <option value="combo">Coupe + Barbe</option>
                  </FormSelect>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Salon</FormLabel>
                  <FormSelect>
                    <option value="">Sélectionner un salon</option>
                    <option value="centre">Centre-ville</option>
                    <option value="nord">Nord</option>
                    <option value="sud">Sud</option>
                  </FormSelect>
                </FormGroup>
              </ModalBody>
              <ModalActions>
                <ModalButton onClick={() => setShowNewBookingModal(false)}>
                  Annuler
                </ModalButton>
                <ModalButton 
                  className="primary"
                  onClick={() => {
                    toast.success('Nouvelle réservation créée avec succès');
                    setShowNewBookingModal(false);
                  }}
                >
                  Créer la réservation
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        </Modal>,
        document.body
      )}

      {/* Modal gestion des coiffeurs */}
      {showStaffModal && createPortal(
        <Modal>
          <ModalOverlay onClick={() => setShowStaffModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Gestion des coiffeurs</ModalTitle>
                <ModalCloseButton onClick={() => setShowStaffModal(false)}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>Coiffeurs actuels</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span>Jean Dupont</span>
                    <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Supprimer</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span>Marie Martin</span>
                    <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Supprimer</button>
                  </div>
                </div>
                
                <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>Ajouter un coiffeur</h4>
                
                <FormGroup>
                  <FormLabel>Nom complet</FormLabel>
                  <FormInput type="text" placeholder="Nom du coiffeur" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Spécialité</FormLabel>
                  <FormSelect>
                    <option value="">Sélectionner une spécialité</option>
                    <option value="coupe">Coupe de cheveux</option>
                    <option value="barbe">Coupe de barbe</option>
                    <option value="coloration">Coloration</option>
                    <option value="soin">Soins capillaires</option>
                  </FormSelect>
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Expérience (années)</FormLabel>
                  <FormInput type="number" placeholder="Années d'expérience" />
                </FormGroup>
              </ModalBody>
              <ModalActions>
                <ModalButton onClick={() => setShowStaffModal(false)}>
                  Fermer
                </ModalButton>
                <ModalButton 
                  className="primary"
                  onClick={() => {
                    toast.success('Coiffeur ajouté avec succès');
                  }}
                >
                  Ajouter le coiffeur
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        </Modal>,
        document.body
      )}

      {/* Modal gestion des salons */}
      {showLocationModal && createPortal(
        <Modal>
          <ModalOverlay onClick={() => setShowLocationModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Gestion des salons</ModalTitle>
                <ModalCloseButton onClick={() => setShowLocationModal(false)}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>Salons actuels</h4>
                  <div style={{ marginBottom: '12px' }}>
                    <strong>Centre-ville</strong><br />
                    <small>123 Rue de la Paix, 75001 Paris</small><br />
                    <small>Ouvert: 9h00 - 19h00</small>
                  </div>
                  <div style={{ marginBottom: '12px' }}>
                    <strong>Nord</strong><br />
                    <small>456 Avenue du Nord, 75018 Paris</small><br />
                    <small>Ouvert: 9h00 - 19h00</small>
                  </div>
                </div>
                
                <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>Ajouter un salon</h4>
                
                <FormGroup>
                  <FormLabel>Nom du salon</FormLabel>
                  <FormInput type="text" placeholder="Nom du salon" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Adresse</FormLabel>
                  <FormInput type="text" placeholder="Adresse complète" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Heure d'ouverture</FormLabel>
                  <FormInput type="time" defaultValue="09:00" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Heure de fermeture</FormLabel>
                  <FormInput type="time" defaultValue="19:00" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Nombre de fauteuils</FormLabel>
                  <FormInput type="number" placeholder="Nombre de fauteuils" />
                </FormGroup>
              </ModalBody>
              <ModalActions>
                <ModalButton onClick={() => setShowLocationModal(false)}>
                  Fermer
                </ModalButton>
                <ModalButton 
                  className="primary"
                  onClick={() => {
                    toast.success('Salon ajouté avec succès');
                  }}
                >
                  Ajouter le salon
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        </Modal>,
        document.body
      )}

      {/* Modal gestion des services */}
      {showServiceModal && createPortal(
        <Modal>
          <ModalOverlay onClick={() => setShowServiceModal(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>Gestion des services</ModalTitle>
                <ModalCloseButton onClick={() => setShowServiceModal(false)}>
                  <FaTimes />
                </ModalCloseButton>
              </ModalHeader>
              <ModalBody>
                <div style={{ marginBottom: '20px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>Services actuels</h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span><strong>Coupe de cheveux</strong> - 25€</span>
                    <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Supprimer</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span><strong>Coupe de barbe</strong> - 15€</span>
                    <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Supprimer</button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span><strong>Coupe + Barbe</strong> - 35€</span>
                    <button style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px' }}>Supprimer</button>
                  </div>
                </div>
                
                <h4 style={{ margin: '0 0 16px 0', color: '#333' }}>Ajouter un service</h4>
                
                <FormGroup>
                  <FormLabel>Nom du service</FormLabel>
                  <FormInput type="text" placeholder="Nom du service" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Prix (€)</FormLabel>
                  <FormInput type="number" placeholder="Prix du service" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Durée (minutes)</FormLabel>
                  <FormInput type="number" placeholder="Durée estimée" />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Description</FormLabel>
                  <FormTextarea placeholder="Description du service..." />
                </FormGroup>
                
                <FormGroup>
                  <FormLabel>Catégorie</FormLabel>
                  <FormSelect>
                    <option value="">Sélectionner une catégorie</option>
                    <option value="coupe">Coupe</option>
                    <option value="barbe">Barbe</option>
                    <option value="coloration">Coloration</option>
                    <option value="soin">Soin</option>
                  </FormSelect>
                </FormGroup>
              </ModalBody>
              <ModalActions>
                <ModalButton onClick={() => setShowServiceModal(false)}>
                  Fermer
                </ModalButton>
                <ModalButton 
                  className="primary"
                  onClick={() => {
                    toast.success('Service ajouté avec succès');
                  }}
                >
                  Ajouter le service
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </ModalOverlay>
        </Modal>,
        document.body
      )}
    </>
  );
};

export default AdminDashboard;