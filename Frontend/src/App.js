import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Contexts
import { AuthProvider } from './contexts/AuthContext';
import { NavbarProvider } from './contexts/NavbarContext';

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
      <AuthProvider>
        <NavbarProvider>
          <AppContainer>
          <GlobalStyles />
          <Helmet>
            <title>Barbershop - Votre coiffeur de confiance</title>
            <meta name="description" content="Barbershop moderne. Réservation en ligne, services professionnels, équipe expérimentée. Prenez rendez-vous facilement !" />
          </Helmet>
        
        <ScrollToTop />
        
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
            </>
          } />
          <Route path="/about" element={
            <>
              <Navbar />
              <About />
              <Footer />
            </>
          } />
          <Route path="/services" element={
            <>
              <Navbar />
              <Services />
              <Footer />
            </>
          } />
          <Route path="/booking" element={
            <>
              <Navbar />
              <Booking />
              <Footer />
            </>
          } />
          <Route path="/locations" element={
            <>
              <Navbar />
              <Locations />
              <Footer />
            </>
          } />
          <Route path="/contact" element={
            <>
              <Navbar />
              <Contact />
              <Footer />
            </>
          } />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={
            <>
              <Navbar />
              <NotFound />
              <Footer />
            </>
          } />
        </Routes>
        </AppContainer>
        </NavbarProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
