import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { APP_CONFIG } from '../../constants';
import { useNavbar } from '../../contexts/NavbarContext';
import { 
  NavbarContainer, 
  NavbarWrapper, 
  Logo, 
  NavLinks, 
  NavLink, 
  MobileMenuButton, 
  MobileMenu, 
  MobileNavLink,
  ContactInfo,
  CTAButton
} from './Navbar.styles';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isExtending, setNavbarExtending } = useNavbar();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    // Gérer l'extension de la navbar quand on essaie de scroller vers le haut
    const handleWheel = (e) => {
      if (window.scrollY <= 0 && e.deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        
        setNavbarExtending(true);
        
        // Arrêter l'extension après un délai
        setTimeout(() => {
          setNavbarExtending(false);
        }, 200);
      }
    };

    // Gérer le touch pour mobile
    let startY = 0;
    let isTouching = false;
    
    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
      isTouching = true;
    };

    const handleTouchMove = (e) => {
      if (!isTouching) return;
      
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      
      // Si on essaie de scroller vers le haut depuis le top
      if (window.scrollY <= 0 && deltaY < 0) {
        e.preventDefault();
        e.stopPropagation();
        
        setNavbarExtending(true);
        
        setTimeout(() => {
          setNavbarExtending(false);
        }, 200);
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    // Ajouter les event listeners avec les bonnes options
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/about', label: 'À propos' },
    { path: '/services', label: 'Services' },
    { path: '/locations', label: 'Nos adresses' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <NavbarContainer isScrolled={isScrolled} isExtending={isExtending}>
      <NavbarWrapper isExtending={isExtending}>
        <Logo to="/">
          <span>BARBERSHOP</span>
          <span>BARBERSHOP</span>
        </Logo>

        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $isActive={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>

        <ContactInfo>
          <div>
            <FaPhone />
            <span>06 12 34 56 78</span>
          </div>
          <div>
            <FaMapMarkerAlt />
            <span>Rennes</span>
          </div>
        </ContactInfo>

        <CTAButton to="/booking">
          Réserver
        </CTAButton>

        <MobileMenuButton onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </NavbarWrapper>

      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <MobileNavLink
                key={item.path}
                to={item.path}
                $isActive={location.pathname === item.path}
              >
                {item.label}
              </MobileNavLink>
            ))}
            <MobileNavLink to="/booking" $isCTA>
              Réserver maintenant
            </MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavbarContainer>
  );
};

export default Navbar;
