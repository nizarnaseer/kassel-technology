import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, User, Settings, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Header({ currentView, setCurrentView, isLoggedIn, handleLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    handleNavClick(sectionId);
  };

  const activeLinkStyle = (viewName) => {
    return location.pathname === `/${viewName}` ? 'active' : '';
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section" onClick={() => handleNavClick('hero')}>
          <div className="logo-icon-wrapper">
            <img src="/favicon-32x32.png" alt="Kassel Technology - PLC Programming, SCADA & Control Panel Wiring Services Malaysia" className="logo-icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-title">KASSEL</span>
            <span className="logo-subtitle">TECHNOLOGY</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <a href="/#hero" onClick={(e) => handleLinkClick(e, 'hero')} className="nav-link">Home</a>
          <a href="/#about" onClick={(e) => handleLinkClick(e, 'about')} className="nav-link">About</a>
          <a href="/#services" onClick={(e) => handleLinkClick(e, 'services')} className="nav-link">Services</a>
          <a href="/#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="nav-link">Projects</a>
          <a href="/#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="nav-link">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <a href="/#hero" onClick={(e) => handleLinkClick(e, 'hero')} className="mobile-nav-link">Home</a>
          <a href="/#about" onClick={(e) => handleLinkClick(e, 'about')} className="mobile-nav-link">About Us</a>
          <a href="/#services" onClick={(e) => handleLinkClick(e, 'services')} className="mobile-nav-link">Our Services</a>
          <a href="/#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="mobile-nav-link">Projects</a>
          <a href="/#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="mobile-nav-link">Contact</a>
        </div>
      </div>

      
    </header>
  );
}
