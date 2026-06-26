import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Cpu, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function Hero({ setCurrentView }) {
  const [uptime, setUptime] = useState('');
  
  // Telemetry Widget state
  const [telemetry, setTelemetry] = useState({
    frequency: '50.00',
    scanRate: 12,
    voltage: '230.1',
    status: 'NOMINAL',
    logs: [
      '[04:12:01] SYS_INIT: SUCCESS',
      '[04:12:03] MODBUS_LINK: ACTIVE',
      '[04:12:05] PLC_READY: TRUE'
    ]
  });
  const [wavePhase, setWavePhase] = useState(0);

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

  // SCADA Telemetry simulator effect
  useEffect(() => {
    // 1. Cycle telemetry numerical stats
    const statsInterval = setInterval(() => {
      setTelemetry(prev => {
        const newFreq = (50.00 + (Math.random() - 0.5) * 0.08).toFixed(2);
        const newVolt = (230.0 + (Math.random() - 0.5) * 0.4).toFixed(1);
        const newScan = Math.floor(10 + Math.random() * 4);
        
        // Cycle logs occasionally
        let newLogs = [...prev.logs];
        if (Math.random() > 0.6) {
          const events = [
            `PLC_IN_0${Math.floor(Math.random()*8)}: HIGH`,
            `PLC_IN_0${Math.floor(Math.random()*8)}: LOW`,
            `MODBUS_TX: OK`,
            `SCADA_POLL: ${newScan}ms`,
            `FREQ_STABLE: ${newFreq}Hz`,
            `VOLT_OK: ${newVolt}V`
          ];
          const time = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
          newLogs.push(`[${time}] ${events[Math.floor(Math.random() * events.length)]}`);
          if (newLogs.length > 3) newLogs.shift();
        }
        
        return {
          frequency: newFreq,
          voltage: newVolt,
          scanRate: newScan,
          status: 'NOMINAL',
          logs: newLogs
        };
      });
    }, 1800);

    // 2. Cycle wavePhase for scrolling sine wave (smooth animation)
    const waveInterval = setInterval(() => {
      setWavePhase(prev => prev + 0.15);
    }, 70);

    return () => {
      clearInterval(statsInterval);
      clearInterval(waveInterval);
    };
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

  // Generate SVG waveform path
  const generateWavePath = () => {
    const width = 180;
    const height = 40;
    const points = [];
    const amplitude = 12;
    const frequency = 0.08;
    
    for (let x = 0; x <= width; x += 4) {
      const y = height / 2 + Math.sin(x * frequency - wavePhase) * amplitude;
      points.push(`${x},${y}`);
    }
    
    return `M ${points.join(' L ')}`;
  };

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

            {/* Live SCADA Telemetry Widget */}
            <div className="telemetry-widget glass-card">
              <div className="telemetry-header">
                <div className="led-indicator green pulse"></div>
                <span className="telemetry-title">SCADA FEED: PLC_01</span>
                <span className="telemetry-status text-cyan">{telemetry.status}</span>
              </div>
              <div className="telemetry-grid">
                <div className="telemetry-stat">
                  <span className="stat-label">GRID FREQ</span>
                  <span className="stat-val text-cyan">{telemetry.frequency} Hz</span>
                </div>
                <div className="telemetry-stat">
                  <span className="stat-label">SCAN RATE</span>
                  <span className="stat-val text-cyan">{telemetry.scanRate} ms</span>
                </div>
              </div>
              
              <div className="telemetry-chart-container">
                <svg width="100%" height="40" viewBox="0 0 180 40" className="telemetry-svg">
                  <line x1="0" y1="20" x2="180" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                  <line x1="45" y1="0" x2="45" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                  <line x1="90" y1="0" x2="90" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                  <line x1="135" y1="0" x2="135" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="3,3" />
                  <path d={generateWavePath()} fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" className="glow-stroke-cyan" />
                </svg>
              </div>
              
              <div className="telemetry-logs">
                {telemetry.logs.map((log, i) => (
                  <div key={i} className="telemetry-log-line">{log}</div>
                ))}
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
          position: relative;
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

        /* Canvas Particle Background */
        .hero-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        /* SCADA Telemetry Widget */
        .telemetry-widget {
          position: absolute;
          top: -40px;
          right: -45px;
          width: 230px;
          padding: 1rem;
          border-radius: var(--border-radius);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
          z-index: 15;
          animation: float-reverse 5s ease-in-out infinite;
          border: 1px solid rgba(6, 182, 212, 0.25);
          background: rgba(11, 15, 25, 0.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        @keyframes float-reverse {
          0% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
          100% { transform: translateY(0px); }
        }

        .telemetry-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 0.5rem;
        }

        .led-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .led-indicator.green {
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .led-indicator.pulse {
          animation: led-blink 1.5s infinite;
        }

        @keyframes led-blink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .telemetry-title {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          flex-grow: 1;
        }

        .telemetry-status {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .telemetry-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
        }

        .telemetry-stat {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .stat-label {
          font-size: 0.55rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .stat-val {
          font-size: 0.8rem;
          font-weight: 700;
          font-family: monospace;
        }

        .telemetry-chart-container {
          background: rgba(0, 0, 0, 0.35);
          border-radius: 4px;
          padding: 0.25rem;
          border: 1px solid rgba(255, 255, 255, 0.03);
          margin-bottom: 0.75rem;
          height: 44px;
          display: flex;
          align-items: center;
        }

        .telemetry-svg {
          display: block;
          overflow: visible;
        }

        .glow-stroke-cyan {
          filter: drop-shadow(0px 0px 3px rgba(6, 182, 212, 0.6));
        }

        .telemetry-logs {
          font-family: monospace;
          font-size: 0.55rem;
          color: var(--text-muted);
          background: rgba(0, 0, 0, 0.45);
          padding: 0.35rem 0.5rem;
          border-radius: 4px;
          height: 52px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }

        .telemetry-log-line {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
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
          .telemetry-widget {
            position: relative;
            top: 0;
            right: 0;
            margin-top: 1rem;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
