import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
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
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
    <NavbarContainer isScrolled={isScrolled}>
      <NavbarWrapper>
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
            <span>02 99 12 34 56</span>
          </div>
          <div>
            <FaMapMarkerAlt />
            <span>Votre ville</span>
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
