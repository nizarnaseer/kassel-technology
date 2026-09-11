import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Hero({ setCurrentView: _setCurrentView }) {
  const [uptime, setUptime] = useState('');

  // Canvas Node-Network refs
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null, active: false });

  // Uptime ticker effect
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

  // Canvas interactive particle network animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const particles = [];
    const particleCount = 45;
    const connectionDistance = 110;
    
    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 0.8;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.45)';
        ctx.fill();
      }
    }
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update & draw particles
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      
      // Draw lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        // Draw connection to mouse if active
        if (mouseRef.current.active && mouseRef.current.x !== null) {
          const dx = p1.x - mouseRef.current.x;
          const dy = p1.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
            const alpha = (1 - dist / 130) * 0.3;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / connectionDistance) * 0.18;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);



  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section" ref={heroRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <canvas ref={canvasRef} className="hero-canvas" />
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

      
    </section>
  );
}
