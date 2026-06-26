import React, { useState, useEffect } from 'react';
import { ArrowRight, Cpu, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Hero({ setCurrentView }) {
  const [uptime, setUptime] = useState('');

  useEffect(() => {
    const startDate = new Date('2021-01-01T00:00:00Z');
    const updateTimer = () => {
      const diff = Date.now() - startDate.getTime();
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setUptime(`${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      <div className="bg-glow-dot-1"></div>
      <div className="hero-container">
        
        <div className="hero-content animated">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span className="badge-text">Pioneering Industrial IR 4.0 in Malaysia</span>
          </div>
          
          <h1 className="hero-title">
            Your Trusted <br />
            <span className="glow-text-cyan">Industrial Automation</span> <br />
            & SCADA Partner
          </h1>
          
          <p className="hero-description">
            Kassel Technology delivers state-of-the-art integrated automation and control solutions. 
            We specialize in high-efficiency PLC, HMI, and SCADA programming, custom control panels, 
            and 24/7 breakdown troubleshooting.
          </p>

          <div className="hero-details-row">
            <div className="hero-detail-item">
              <CheckCircle2 className="text-cyan" size={18} />
              <span>Registered Company (003252852-K)</span>
            </div>
            <div className="hero-detail-item">
              <CheckCircle2 className="text-cyan" size={18} />
              <span>Est. 2021 in Malaysia</span>
            </div>
          </div>

          <div className="hero-cta-group">
            <button onClick={() => handleScrollTo('projects')} className="btn-primary">
              <span>View Past Projects</span>
              <ArrowRight size={16} />
            </button>
            <button onClick={() => handleScrollTo('contact')} className="btn-secondary">
              <span>Request Callback</span>
            </button>
          </div>
        </div>

        <div className="hero-visual animated">
          <div className="visual-card-wrapper">
            <div className="visual-card glass-card">
              <div className="card-header-bar">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
                <span className="terminal-title">kassel-tech-console.sh</span>
              </div>
              <div className="terminal-body">
                <p className="term-line cmd">kasseltech --status</p>
                <p className="term-line output text-muted">[System Integrator Startup: Active since 2021]</p>
                <p className="term-line output">
                  <span className="term-label">Location:</span> Ampang, Selangor, Malaysia
                </p>
                <p className="term-line output">
                  <span className="term-label">Platforms:</span> Siemens S7, Allen Bradley, Omron, Mitsubishi
                </p>
                <p className="term-line output">
                  <span className="term-label">Uptime:</span> <span className="text-cyan animate-pulse">{uptime || 'Calculating...'}</span>
                </p>
                <p className="term-line output">
                  <span className="term-label">Status:</span> <span className="term-badge success">READY FOR INTEGRATION</span>
                </p>
                <p className="term-line cmd">kasseltech --capabilities</p>
                <div className="capabilities-bar-chart">
                  <div className="bar-item">
                    <span className="bar-label">PLC/SCADA</span>
                    <div className="bar-track"><div className="bar-fill cyan" style={{ width: '95%' }}></div></div>
                  </div>
                  <div className="bar-item">
                    <span className="bar-label">Panel Wiring</span>
                    <div className="bar-track"><div className="bar-fill blue" style={{ width: '90%' }}></div></div>
                  </div>
                  <div className="bar-item">
                    <span className="bar-label">Troubleshoot</span>
                    <div className="bar-track"><div className="bar-fill amber" style={{ width: '100%' }}></div></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay mini widget */}
            <div className="mini-widget glass-card">
              <div className="mini-widget-header">
                <ShieldAlert className="text-amber animate-pulse" size={20} />
                <div>
                  <span className="widget-label">Emergency Support</span>
                  <span className="widget-val text-amber">Active (24/7)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: calc(var(--header-height) + 40px);
          overflow: hidden;
          background: radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.03) 0%, transparent 50%);
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 1rem;
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.15);
          border-radius: 20px;
          color: var(--accent-cyan);
          font-size: 0.85rem;
          font-weight: 600;
          width: fit-content;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background-color: var(--accent-cyan);
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.6; }
          50% { transform: scale(1.2); opacity: 1; }
          100% { transform: scale(0.9); opacity: 0.6; }
        }

        .hero-title {
          font-size: 3.5rem;
          line-height: 1.15;
          font-weight: 800;
        }

        .hero-description {
          font-size: 1.1rem;
          color: var(--text-secondary);
          max-width: 600px;
          line-height: 1.6;
        }

        .hero-details-row {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 0.5rem;
        }

        .hero-detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .hero-cta-group {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }

        /* Hero Visual Console Card */
        .hero-visual {
          position: relative;
        }

        .visual-card-wrapper {
          position: relative;
          width: 100%;
          perspective: 1000px;
        }

        .visual-card {
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), var(--glow-card);
        }

        .card-header-bar {
          background: rgba(15, 21, 36, 0.9);
          padding: 0.75rem 1rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .card-header-bar .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          display: inline-block;
        }

        .dot.red { background-color: #ef4444; }
        .dot.yellow { background-color: #f59e0b; }
        .dot.green { background-color: #10b981; }

        .terminal-title {
          margin-left: 0.75rem;
          font-size: 0.75rem;
          font-family: monospace;
          color: var(--text-secondary);
        }

        .terminal-body {
          padding: 1.5rem;
          font-family: monospace;
          font-size: 0.85rem;
          color: #f1f5f9;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .term-line {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .term-line.cmd::before {
          content: '$';
          color: var(--accent-cyan);
          font-weight: bold;
        }

        .term-label {
          color: var(--accent-cyan);
        }

        .term-badge.success {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.3);
          color: #10b981;
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
          font-weight: bold;
          font-size: 0.75rem;
        }

        .capabilities-bar-chart {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
          margin-top: 0.5rem;
          background: rgba(0,0,0,0.2);
          padding: 0.75rem;
          border-radius: 6px;
        }

        .bar-item {
          display: grid;
          grid-template-columns: 80px 1fr;
          align-items: center;
          gap: 1rem;
        }

        .bar-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .bar-track {
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: 3px;
        }

        .bar-fill.cyan { background: var(--accent-cyan); }
        .bar-fill.blue { background: var(--accent-blue); }
        .bar-fill.amber { background: var(--accent-amber); }

        /* Floating mini widget */
        .mini-widget {
          position: absolute;
          bottom: -20px;
          left: -30px;
          padding: 0.85rem 1.25rem;
          border-radius: var(--border-radius);
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          z-index: 15;
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        .mini-widget-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .widget-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        .widget-val {
          display: block;
          font-weight: 700;
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }
          .hero-badge, .hero-cta-group, .hero-details-row {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .hero-description {
            margin-left: auto;
            margin-right: auto;
          }
          .mini-widget {
            left: 20px;
          }
        }

        @media (max-width: 600px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .mini-widget {
            position: relative;
            bottom: 0;
            left: 0;
            margin-top: 1rem;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
