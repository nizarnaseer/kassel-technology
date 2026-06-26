import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, User, Settings, LogOut } from 'lucide-react';

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

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      setCurrentView('home');
      // Wait for React to render the home view before scrolling
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const activeLinkStyle = (viewName) => {
    return currentView === viewName ? 'nav-link active' : 'nav-link';
  };

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-section" onClick={() => handleNavClick('hero')}>
          <div className="logo-icon-wrapper">
            <img src="/apple-touch-icon.png" alt="Kassel Technology Logo" className="logo-icon" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
          </div>
          <div className="logo-text-wrapper">
            <span className="logo-title">KASSEL</span>
            <span className="logo-subtitle">TECHNOLOGY</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <button onClick={() => handleNavClick('hero')} className="nav-link">Home</button>
          <button onClick={() => handleNavClick('about')} className="nav-link">About</button>
          <button onClick={() => handleNavClick('services')} className="nav-link">Services</button>
          <button onClick={() => handleNavClick('projects')} className="nav-link">Projects</button>
          <button onClick={() => handleNavClick('contact')} className="nav-link">Contact</button>
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
          <button onClick={() => handleNavClick('hero')} className="mobile-nav-link">Home</button>
          <button onClick={() => handleNavClick('about')} className="mobile-nav-link">About Us</button>
          <button onClick={() => handleNavClick('services')} className="mobile-nav-link">Our Services</button>
          <button onClick={() => handleNavClick('projects')} className="mobile-nav-link">Projects</button>
          <button onClick={() => handleNavClick('contact')} className="mobile-nav-link">Contact</button>
        </div>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--header-height);
          z-index: 1000;
          transition: var(--transition-smooth);
          border-bottom: 1px solid transparent;
        }
        
        .header-scrolled {
          background: rgba(8, 12, 20, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-color);
          height: 70px;
        }

        .header-container {
          max-width: 1300px;
          height: 100%;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-section {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }

        .logo-icon-wrapper {
          width: 42px;
          height: 42px;
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition-smooth);
          box-shadow: 0 0 10px rgba(6, 182, 212, 0.05);
        }

        .logo-section:hover .logo-icon-wrapper {
          border-color: var(--accent-cyan);
          box-shadow: var(--glow-cyan);
          background: rgba(6, 182, 212, 0.15);
        }

        .logo-text-wrapper {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.25rem;
          letter-spacing: 0.05em;
          line-height: 1.1;
          background: linear-gradient(to right, #ffffff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .logo-subtitle {
          font-size: 0.65rem;
          font-weight: 600;
          color: var(--accent-cyan);
          letter-spacing: 0.25em;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }

        .nav-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-weight: 500;
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.5rem 0;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-cyan);
          transition: var(--transition-smooth);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-divider {
          width: 1px;
          height: 20px;
          background: var(--border-color);
        }

        .btn-login-nav, .btn-admin-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          border-radius: 6px;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-login-nav:hover, .btn-admin-nav:hover, .btn-admin-nav.active {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.05);
        }

        .admin-status-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-logout-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          background: rgba(239, 68, 68, 0.05);
          border: 1px solid rgba(239, 68, 68, 0.15);
          border-radius: 6px;
          color: #ef4444;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-logout-nav:hover {
          background: rgba(239, 68, 68, 0.15);
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }

        .mobile-menu-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
        }

        /* Mobile Nav Drawer */
        .mobile-nav-drawer {
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 100%;
          height: 0;
          background: var(--bg-primary);
          overflow: hidden;
          transition: height 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 999;
          border-bottom: 0px solid var(--border-color);
        }

        .mobile-nav-drawer.open {
          height: calc(100vh - var(--header-height));
          border-bottom: 1px solid var(--border-color);
        }

        .mobile-nav-links {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: 100%;
          background: radial-gradient(circle at bottom right, rgba(6, 182, 212, 0.03) 0%, transparent 60%);
        }

        .mobile-nav-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.25rem;
          font-weight: 600;
          text-align: left;
          padding: 0.5rem 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: var(--transition-smooth);
        }

        .mobile-nav-link:hover {
          color: var(--text-primary);
          padding-left: 0.5rem;
        }

        .mobile-nav-divider {
          height: 1px;
          background: var(--border-color);
          margin: 0.5rem 0;
        }

        .admin-active-link {
          color: var(--accent-cyan);
        }

        .logout-active-link {
          color: #ef4444;
        }

        @media (max-width: 768px) {
          .desktop-nav {
            display: none;
          }
          .mobile-menu-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
