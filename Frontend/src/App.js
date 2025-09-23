import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Services from './pages/Services/Services';
import Booking from './pages/Booking/Booking';
import Locations from './pages/Locations/Locations';
import Contact from './pages/Contact/Contact';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import NotFound from './pages/NotFound/NotFound';

// Styles
import GlobalStyles from './styles/GlobalStyles';
import { AppContainer } from './App.styles';

function App() {
  return (
    <HelmetProvider>
      <AppContainer>
        <GlobalStyles />
        <Helmet>
          <title>Barbershop Rennes - Votre coiffeur de confiance</title>
          <meta name="description" content="Barbershop moderne à Rennes. Réservation en ligne, services professionnels, équipe expérimentée. Prenez rendez-vous facilement !" />
        </Helmet>
      
      <ScrollToTop />
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <Footer />
      </AppContainer>
    </HelmetProvider>
  );
}

export default App;
