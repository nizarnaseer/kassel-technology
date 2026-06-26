import React, { useState } from 'react';
import { Cpu, Zap, Activity, BookOpen, Layers, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);

  const servicesData = [
    {
      title: "PLC, HMI, & SCADA Design",
      subtitle: "Systems Programming & Architecture",
      icon: <Cpu size={28} />,
      badge: "Industry 4.0 Core",
      summary: "Custom logic design and visualizations using state-of-the-art platforms to automate processes, reduce downtime, and improve telemetry.",
      details: [
        "Specializes in PLC code structure that emphasizes flexibility, debugging speed, and modular expandability.",
        "Proficient in industrial network protocols and factory intelligence matching (Modbus, PROFINET, EtherNet/IP).",
        "Expertise in designing user-friendly SCADA (WinCC) and HMI interfaces for detailed system telemetry and operator control."
      ],
      platforms: [
        { brand: "Siemens", models: "S7-300, S7-1200, S7-1500, WinCC SCADA" },
        { brand: "Allen Bradley", models: "ControlLogix, CompactLogix, MicroLogix, SLC 500, PLC 5" },
        { brand: "Mitsubishi", models: "Q-Series, FX-Series, Melsec" },
        { brand: "Omron", models: "CJ1, CJ2, CS1G, CP1E, CP1H, CP1L" }
      ]
    },
    {
      title: "Control Panel Wiring",
      subtitle: "Custom Cabinet & Panel Fabrication",
      icon: <Layers size={28} />,
      badge: "Certified Assembly",
      summary: "Manufacturing and assembling high-durability electrical control panels, SPM machines control panels, and PLC/DCS cabinets.",
      details: [
        "Fabricated using high-grade components compliant with international electrical and safety standards.",
        "Fitted with critical safety subsystems: single phasing protections, overload relays, circuit fuses, and sequence interlocks.",
        "Cabinet layouts structured for heat dissipation, ease of inspection, and future scalability."
      ],
      platforms: [
        { brand: "Application", models: "Special Purpose Machines (SPM), Conveyors, Machining Units" },
        { brand: "Protections", models: "Overload breakers, safety relays, phase fail safes, lightning isolators" },
        { brand: "Cabinets", models: "Dust-proof (IP54/IP65), air-conditioned, printer-integrated, mechanical interlocking" }
      ]
    },
    {
      title: "Breakdown & Troubleshooting",
      subtitle: "Emergency Diagnostics & Maintenance",
      icon: <Activity size={28} />,
      badge: "24/7 Rapid Response",
      summary: "Comprehensive diagnostics and repair services to resolve mechanical, electrical, and software faults in industrial machinery.",
      details: [
        "Rapid response protocol to minimize production loss and equipment downtime.",
        "Technicians trace mechanical linkages, electrical wiring, and online PLC state to isolate root causes.",
        "Quality assurance guarantee on parts replacements and code corrections. Fully transparent costing."
      ],
      platforms: [
        { brand: "Industries Served", models: "Manufacturing, Agriculture, Feed Mills, Food Processing, Logistics" },
        { brand: "Equipment Types", models: "Heavy machinery, packaging lines, conveyors, battery chargers, pump controllers" },
        { brand: "Support Line", models: "24/7 Emergency helpline active across Selangor and surrounding industrial states" }
      ],
      emergencyAlert: true
    },
    {
      title: "Technical Trainings",
      subtitle: "Industrial PLC & HMI Courses",
      icon: <BookOpen size={28} />,
      badge: "Practical Oriented",
      summary: "Comprehensive technical training courses designed to upskill technicians, engineers, and lecturers in PLC design and maintenance.",
      details: [
        "Syllabus focuses heavily on hands-on practical exercises using real PLC and HMI hardware kits.",
        "Courses cater to all levels: from absolute beginners with no coding experience to experts looking for protocol matching skills.",
        "Training covers Simatic S7/S5, WinCC Flexible, GX Developer/Works 2, and GT Works 3 software suites."
      ],
      platforms: [
        { brand: "PLC Labs", models: "Siemens S7 kit exercises, Mitsubishi FX/Q labs, Omron programming labs" },
        { brand: "HMI Design", models: "Operator screen configurations, alarm handling, data trends logging" },
        { brand: "Reference Cases", models: "Courses delivered for lecturers at UNITEN Mechatronics and industry staff" }
      ]
    }
  ];

  return (
    <section id="services" className="services-section">
      <div className="section-header">
        <span className="section-subtitle">What We Do Best</span>
        <h2 className="section-title">Our Professional Services</h2>
        <p className="section-description">
          End-to-end industrial automation expertise, from code development and cabinet wiring to emergency breakdown repair and vocational training.
        </p>
      </div>

      <div className="services-layout">
        
        {/* Left Side: Services Navigation Tabs */}
        <div className="services-tabs">
          {servicesData.map((service, idx) => {
            const isActive = activeTab === idx;
            return (
              <React.Fragment key={idx}>
                <div 
                  className={`service-tab-item glass-card ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(isActive ? -1 : idx)}
                >
                  <div className={`tab-icon-box ${isActive ? 'cyan-bg' : ''}`}>
                    {service.icon}
                  </div>
                  <div className="tab-text-box">
                    <span className="tab-badge">{service.badge}</span>
                    <h4 className="tab-title">{service.title}</h4>
                  </div>
                  <ChevronRight size={18} className="tab-chevron" />
                </div>

                {/* Mobile description panel: nested inline */}
                {isActive && (
                  <div className="services-detail-mobile glass-card animated">
                    <div className="detail-panel-header">
                      <span className="panel-badge-top">{service.badge}</span>
                      <h3 className="panel-main-title text-cyan">{service.title}</h3>
                      <span className="panel-subtitle">{service.subtitle}</span>
                    </div>

                    <p className="panel-summary">{service.summary}</p>
                    
                    <div className="panel-divider"></div>

                    <div className="panel-content-grid">
                      
                      <div className="panel-list-section">
                        <h4 className="panel-section-title">Capabilities & Scope</h4>
                        <ul className="capabilities-ul">
                          {service.details.map((detail, dIdx) => (
                            <li key={dIdx}>
                              <CheckCircle2 size={16} className="text-cyan text-align-top" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="panel-tech-section">
                        <h4 className="panel-section-title">Systems & Platforms</h4>
                        <div className="platforms-container">
                          {service.platforms.map((platform, pIdx) => (
                            <div key={pIdx} className="platform-row">
                              <span className="platform-brand">{platform.brand}</span>
                              <span className="platform-models">{platform.models}</span>
                            </div>
                          ))}
                        </div>

                        {service.emergencyAlert && (
                          <div className="emergency-alert-box">
                            <AlertTriangle className="text-amber animate-pulse" size={24} />
                            <div>
                              <h5 className="alert-box-title text-amber">Emergency Helpline</h5>
                              <p className="alert-box-desc">Call <strong>+6014-4003060</strong> for immediate breakdown deployment. Available 24/7.</p>
                            </div>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Side: Active Service Details Panel (Desktop Only) */}
        {activeTab !== -1 && (
          <div className="services-detail-panel glass-card animated" key={activeTab}>
            <div className="detail-panel-header">
              <span className="panel-badge-top">{servicesData[activeTab].badge}</span>
              <h3 className="panel-main-title text-cyan">{servicesData[activeTab].title}</h3>
              <span className="panel-subtitle">{servicesData[activeTab].subtitle}</span>
            </div>

            <p className="panel-summary">{servicesData[activeTab].summary}</p>
            
            <div className="panel-divider"></div>

            <div className="panel-content-grid">
              
              <div className="panel-list-section">
                <h4 className="panel-section-title">Capabilities & Scope</h4>
                <ul className="capabilities-ul">
                  {servicesData[activeTab].details.map((detail, dIdx) => (
                    <li key={dIdx}>
                      <CheckCircle2 size={16} className="text-cyan text-align-top" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel-tech-section">
                <h4 className="panel-section-title">Systems & Platforms</h4>
                <div className="platforms-container">
                  {servicesData[activeTab].platforms.map((platform, pIdx) => (
                    <div key={pIdx} className="platform-row">
                      <span className="platform-brand">{platform.brand}</span>
                      <span className="platform-models">{platform.models}</span>
                    </div>
                  ))}
                </div>

                {servicesData[activeTab].emergencyAlert && (
                  <div className="emergency-alert-box">
                    <AlertTriangle className="text-amber animate-pulse" size={24} />
                    <div>
                      <h5 className="alert-box-title text-amber">Emergency Helpline</h5>
                      <p className="alert-box-desc">Call <strong>+6014-4003060</strong> for immediate breakdown deployment. Available 24/7.</p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </div>

      <style>{`
        .services-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          align-items: start;
        }

        .services-tabs {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .service-tab-item {
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.25rem;
          cursor: pointer;
          border-color: var(--border-color);
        }

        .service-tab-item:hover, .service-tab-item.active {
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.03);
        }

        .service-tab-item.active {
          box-shadow: var(--glow-cyan);
          background: rgba(6, 182, 212, 0.06);
        }

        .tab-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: var(--transition-smooth);
        }

        .service-tab-item:hover .tab-icon-box {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
        }

        .service-tab-item.active .tab-icon-box {
          background: rgba(6, 182, 212, 0.15);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .tab-text-box {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex: 1;
        }

        .tab-badge {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }

        .service-tab-item.active .tab-badge {
          color: var(--accent-cyan);
        }

        .tab-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .tab-chevron {
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }

        .service-tab-item:hover .tab-chevron, .service-tab-item.active .tab-chevron {
          color: var(--accent-cyan);
          transform: translateX(4px);
        }

        /* Detail Panel */
        .services-detail-panel {
          padding: 3rem;
          min-height: 500px;
          display: flex;
          flex-direction: column;
          border-color: var(--border-color);
        }

        .detail-panel-header {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          margin-bottom: 1.5rem;
        }

        .panel-badge-top {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--accent-cyan);
        }

        .panel-main-title {
          font-size: 2rem;
          font-weight: 800;
        }

        .panel-subtitle {
          font-size: 0.95rem;
          color: var(--text-muted);
        }

        .panel-summary {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .panel-divider {
          height: 1px;
          background: var(--border-color);
          margin-bottom: 2rem;
        }

        .panel-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2.5rem;
        }

        .panel-section-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .capabilities-ul {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .capabilities-ul li {
          display: flex;
          gap: 0.85rem;
          align-items: flex-start;
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.5;
        }

        .text-align-top {
          margin-top: 3px;
          flex-shrink: 0;
        }

        .platforms-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .platform-row {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-color);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .platform-brand {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--accent-cyan);
        }

        .platform-models {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .emergency-alert-box {
          margin-top: 1.5rem;
          padding: 1rem;
          background: rgba(245, 158, 11, 0.05);
          border: 1px solid rgba(245, 158, 11, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .alert-box-title {
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .alert-box-desc {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .services-detail-mobile {
          display: none;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 1024px) {
          .services-layout {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .services-detail-panel {
            display: none;
          }
          .services-detail-mobile {
            display: flex;
            flex-direction: column;
            padding: 2.25rem 2rem;
            margin-top: -1.25rem;
            margin-bottom: 0.5rem;
            border-top: none;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-color: var(--accent-cyan);
            background: rgba(6, 182, 212, 0.02);
            animation: slideDown 0.3s ease-out forwards;
          }
          .service-tab-item.active {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom-color: transparent;
            box-shadow: none;
          }
          .service-tab-item.active .tab-chevron {
            transform: rotate(90deg) !important;
          }
        }

        @media (max-width: 600px) {
          .services-detail-mobile {
            padding: 1.5rem;
          }
          .panel-content-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
