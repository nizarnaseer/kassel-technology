import React from 'react';
import { Cpu, Phone, Mail, MapPin, Landmark, Award } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const handleNavClick = (sectionId) => {
    setCurrentView('home');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-brand-column">
          <div className="footer-logo">
            <img src="/apple-touch-icon.png" alt="Kassel Technology Logo" className="logo-icon" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
            <div className="footer-logo-text">
              <span className="footer-logo-title">KASSEL</span>
              <span className="footer-logo-subtitle">TECHNOLOGY</span>
            </div>
          </div>
          <p className="footer-brand-desc">
            Your best automation solution partner. Delivering state-of-the-art integrated automation and control solutions in Malaysia since 2021.
          </p>
          <div className="company-reg-badge">
            <Award size={14} className="text-cyan" />
            <span>Reg. No: 003252852-K</span>
          </div>
        </div>

        <div className="footer-links-column">
          <h4 className="footer-column-title">Quick Links</h4>
          <ul className="footer-links-list">
            <li><button onClick={() => handleNavClick('hero')} className="footer-link">Home</button></li>
            <li><button onClick={() => handleNavClick('about')} className="footer-link">About Us</button></li>
            <li><button onClick={() => handleNavClick('services')} className="footer-link">Services</button></li>
            <li><button onClick={() => handleNavClick('projects')} className="footer-link">Projects</button></li>
            <li><button onClick={() => handleNavClick('contact')} className="footer-link">Contact Us</button></li>
          </ul>
        </div>

        <div className="footer-contact-column">
          <h4 className="footer-column-title">Contact Channels</h4>
          <ul className="footer-contact-list">
            <li>
              <Phone size={16} className="text-cyan" />
              <a href="tel:+60144003060" className="footer-contact-value">+60 14-400 3060</a>
            </li>
            <li>
              <Mail size={16} className="text-cyan" />
              <a href="mailto:kasseltechnology@gmail.com" className="footer-contact-value">kasseltechnology@gmail.com</a>
            </li>
            <li>
              <MapPin size={18} className="text-cyan footer-icon-top" />
              <div>
                <span className="footer-address-label">Business Office:</span>
                <p className="footer-address-text">
                  No.26, Ground Level, Putri Park Plaza,<br />
                  Jalan 28, Taman Putra, 68000 Ampang,<br />
                  Selangor, Malaysia
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="footer-billing-column">
          <h4 className="footer-column-title">Corporate Info</h4>
          <ul className="footer-contact-list">
            <li>
              <MapPin size={18} className="text-amber footer-icon-top" />
              <div>
                <span className="footer-address-label">Registered Office:</span>
                <p className="footer-address-text">
                  4, Jalan Saga 24, Taman Saga,<br />
                  68000 Ampang, Selangor
                </p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Kassel Technology. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <span className="footer-motto">Your Best Automation Partner</span>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: #05080e;
          border-top: 1px solid var(--border-color);
          padding-top: 5rem;
          position: relative;
          z-index: 10;
        }

        .footer-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem 4rem 2rem;
          display: grid;
          grid-template-columns: 1.5fr 0.8fr 1.2fr 1.2fr;
          gap: 3rem;
        }

        .footer-brand-column {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-logo-text {
          display: flex;
          flex-direction: column;
        }

        .footer-logo-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.35rem;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }

        .footer-logo-subtitle {
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--accent-cyan);
          letter-spacing: 0.25em;
        }

        .footer-brand-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .company-reg-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.75rem;
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.15);
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-cyan);
          width: fit-content;
        }

        .footer-column-title {
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.75rem;
          color: var(--text-primary);
          position: relative;
        }

        .footer-column-title::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -8px;
          width: 30px;
          height: 2px;
          background: var(--accent-cyan);
        }

        .footer-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .footer-link {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          padding: 0;
          transition: var(--transition-smooth);
        }

        .footer-link:hover {
          color: var(--text-primary);
          transform: translateX(4px);
        }

        .footer-contact-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .footer-contact-list li {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .footer-contact-value {
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .footer-contact-value:hover {
          color: var(--text-primary);
        }

        .footer-icon-top {
          margin-top: 3px;
          flex-shrink: 0;
        }

        .footer-address-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .footer-address-text {
          font-size: 0.85rem;
          line-height: 1.5;
        }

        .banking-details-li {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 0.75rem;
          border-radius: 8px;
        }

        .banking-text {
          font-size: 0.8rem;
          line-height: 1.4;
          margin-top: 0.25rem;
        }

        .footer-bottom {
          border-top: 1px solid var(--border-color);
          padding: 1.5rem 0;
          background: #030509;
        }

        .footer-bottom-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copyright {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .footer-motto {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .footer-container {
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 600px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .footer-bottom-container {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
