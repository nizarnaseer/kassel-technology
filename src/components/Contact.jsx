import React, { useState } from 'react';
import { Phone, Mail, MapPin, Landmark, Clock, Send, CheckCircle } from 'lucide-react';

export default function Contact({ addMessage }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Create new message object
      const newMessage = {
        id: 'msg-' + Date.now(),
        ...formData,
        date: new Date().toISOString(),
        read: false
      };
      
      // Call parent action
      addMessage(newMessage);

      // Reset form
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <span className="section-subtitle">Get in Touch</span>
        <h2 className="section-title">Connect With Our Team</h2>
        <p className="section-description">
          Ready to optimize your production output or resolve an urgent machine breakdown? Drop us a message or call our support line.
        </p>
      </div>

      <div className="contact-grid">
        
        {/* Contact Info Details Panel */}
        <div className="contact-info-panel glass-card">
          <h3 className="panel-title-large">Direct Channels</h3>
          <p className="info-intro-text">
            Reach out via phone or email for immediate replies, or visit our Ampang office during standard operating hours.
          </p>

          <div className="info-items-container">
            <div className="contact-info-item">
              <div className="info-icon text-cyan"><Phone size={20} /></div>
              <div>
                <span className="info-label">Phone Hotline</span>
                <a href="tel:+60144003060" className="info-val">+60 14-400 3060</a>
                <span className="info-sub-val text-amber">Emergency support active 24/7</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon text-cyan"><Mail size={20} /></div>
              <div>
                <span className="info-label">Email Support</span>
                <a href="mailto:kasseltechnology@gmail.com" className="info-val">kasseltechnology@gmail.com</a>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon text-cyan"><Clock size={20} /></div>
              <div>
                <span className="info-label">Office Hours</span>
                <span className="info-val">Mon - Fri: 9:00 AM - 6:00 PM</span>
                <span className="info-sub-val">Saturday: 9:00 AM - 1:00 PM • Sunday: Closed</span>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="info-icon text-cyan"><MapPin size={20} /></div>
              <div>
                <span className="info-label">Office Address</span>
                <p className="info-val-address">
                  No.26, Ground Level, Putri Park Plaza,<br />
                  Jalan 28, Taman Putra, 68000 Ampang,<br />
                  Selangor, Malaysia
                </p>
              </div>
            </div>
          </div>
          
          {/* Quick CTA Buttons */}
          <div className="contact-quick-cta-group">
            <a 
              href="https://wa.me/60144003060?text=Hi%20Kassel%20Technology,%20I'm%20interested%20in%20your%20automation%20services." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-quick-whatsapp"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="btn-icon-wa">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.963C16.528 2.022 14.07 1 11.993 1.002 6.561 1.002 2.137 5.372 2.133 10.8c-.001 1.73.476 3.414 1.381 4.896l-.999 3.647 3.734-.972c1.42.776 2.946 1.185 4.5 1.187zm11.75-6.82c-.3-.15-1.77-.874-2.04-.974-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-1.125-.56-1.92-1.024-2.674-2.318-.2-.34.2-.315.572-.888.07-.15.035-.28-.018-.38-.052-.1-.47-1.13-.644-1.553-.171-.41-.344-.35-.47-.35-.12 0-.26-.05-.4-.05-.14 0-.37.05-.56.26-.19.21-.73.71-.73 1.73s.74 2.01 1.07 2.45c.34.44 2.82 4.3 6.83 6.03.954.412 1.7.66 2.28.845.96.305 1.83.26 2.52.16.77-.11 2.38-.97 2.72-1.9.34-.93.34-1.73.24-1.9-.1-.17-.3-.27-.6-.42z"/>
              </svg>
              <span>WhatsApp Chat</span>
            </a>
            <a href="tel:+60144003060" className="btn-quick-call">
              <Phone size={18} />
              <span>Call Hotline</span>
            </a>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div className="contact-form-panel glass-card">
          <h3 className="panel-title-large">Send a Message</h3>
          
          {isSubmitted ? (
            <div className="success-banner animated">
              <CheckCircle size={40} className="text-cyan" />
              <div>
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for reaching out. A Kassel Technology engineer will contact you shortly.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-name">Your Name *</label>
                  <input 
                    type="text" 
                    id="contact-name"
                    name="name" 
                    className={`form-input ${errors.name ? 'error-border' : ''}`} 
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-text">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-company">Company Name</label>
                  <input 
                    type="text" 
                    id="contact-company"
                    name="company" 
                    className="form-input" 
                    placeholder="e.g. Acme Corp"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="contact-email">Email Address *</label>
                  <input 
                    type="email" 
                    id="contact-email"
                    name="email" 
                    className={`form-input ${errors.email ? 'error-border' : ''}`} 
                    placeholder="e.g. john@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-phone">Phone / WhatsApp Number *</label>
                  <input 
                    type="text" 
                    id="contact-phone"
                    name="phone" 
                    className={`form-input ${errors.phone ? 'error-border' : ''}`} 
                    placeholder="e.g. +60123456789"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && <span className="error-text">{errors.phone}</span>}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-subject">Inquiry Subject</label>
                <select 
                  id="contact-subject"
                  name="subject" 
                  className="form-input select-input"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="PLC & SCADA Development">PLC & SCADA Development</option>
                  <option value="Control Panel Wiring">Control Panel Wiring</option>
                  <option value="Emergency Breakdown Service">Emergency Breakdown Service</option>
                  <option value="Vocational Training">Vocational Training</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="contact-message">Detailed Requirements *</label>
                <textarea 
                  id="contact-message"
                  name="message" 
                  rows="5" 
                  className={`form-input textarea-input ${errors.message ? 'error-border' : ''}`} 
                  placeholder="Tell us about your machine models, required integrations, or issue description..."
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                {errors.message && <span className="error-text">{errors.message}</span>}
              </div>

              <button type="submit" className="btn-primary btn-submit-form">
                <span>Send Message</span>
                <Send size={16} />
              </button>

            </form>
          )}

        </div>

      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 3rem;
          align-items: start;
        }

        .contact-info-panel, .contact-form-panel {
          padding: 3rem;
        }

        .panel-title-large {
          font-size: 1.75rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
        }

        .info-intro-text {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }

        .info-items-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2.5rem;
        }

        .contact-info-item {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .info-icon {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }

        .info-val {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        a.info-val:hover {
          color: var(--accent-cyan);
          text-decoration: underline;
        }

        .info-sub-val {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.1rem;
        }

        .info-val-address {
          font-size: 0.95rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .contact-quick-cta-group {
          display: flex;
          gap: 1rem;
          margin-top: 2rem;
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;
        }

        .btn-quick-whatsapp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(37, 211, 102, 0.05);
          border: 1px solid rgba(37, 211, 102, 0.2);
          border-radius: 6px;
          color: #25d366;
          font-family: var(--font-heading);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
          flex: 1;
        }

        .btn-quick-whatsapp:hover {
          background: rgba(37, 211, 102, 0.15);
          border-color: #25d366;
          box-shadow: 0 0 15px rgba(37, 211, 102, 0.3);
          transform: translateY(-2px);
        }

        .btn-quick-call {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.2);
          border-radius: 6px;
          color: var(--accent-cyan);
          font-family: var(--font-heading);
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
          flex: 1;
        }

        .btn-quick-call:hover {
          background: rgba(6, 182, 212, 0.15);
          border-color: var(--accent-cyan);
          box-shadow: var(--glow-cyan);
          transform: translateY(-2px);
        }

        .btn-icon-wa {
          margin-top: 1px;
        }

        .contact-bank-card {
          background: rgba(6, 182, 212, 0.03);
          border: 1px solid rgba(6, 182, 212, 0.1);
          padding: 1.25rem;
          border-radius: 8px;
        }

        .bank-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 0.5rem;
        }

        .bank-header h4 {
          font-size: 0.95rem;
          font-weight: 700;
        }

        .bank-body p {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        /* Form Details */
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .select-input {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem center;
          background-size: 1.2em;
          padding-right: 2.5rem;
        }

        .select-input option {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .textarea-input {
          resize: vertical;
        }

        .btn-submit-form {
          margin-top: 1rem;
          align-self: flex-start;
          width: auto;
        }

        .error-border {
          border-color: #ef4444 !important;
        }

        .error-text {
          font-size: 0.75rem;
          color: #ef4444;
          display: block;
          margin-top: 0.35rem;
          font-weight: 500;
        }

        .success-banner {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid var(--accent-cyan);
          padding: 2rem;
          border-radius: 8px;
          margin-top: 2rem;
        }

        .success-banner h4 {
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--accent-cyan);
          margin-bottom: 0.25rem;
        }

        .success-banner p {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .form-row-2 {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .contact-info-panel, .contact-form-panel {
            padding: 1.5rem;
          }
          .btn-submit-form {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
