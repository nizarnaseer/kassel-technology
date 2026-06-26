import React, { useState } from 'react';
import { Calendar, User, Cpu, ClipboardList, CheckCircle2, ChevronRight, X, AlertCircle } from 'lucide-react';

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  const categories = ['All', 'PLC & HMI Retrofit', 'Industrial Machinery', 'SCADA & Data Systems', 'Embedded & Gateways'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <span className="section-subtitle">Our Track Record</span>
        <h2 className="section-title">Successful Case Studies</h2>
        <p className="section-description">
          Explore a selection of industrial engineering projects completed for manufacturers and system providers across Malaysia.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="filter-bar">
        {categories.map((cat, idx) => (
          <button 
            key={idx}
            className={`filter-btn ${filter === cat ? 'active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((p) => (
          <div key={p.id} className="project-card glass-card">
            <div className="project-img-wrapper">
              <img src={p.image} alt={p.title} className="project-img" />
              <div className="project-category-overlay">{p.category}</div>
            </div>
            
            <div className="project-info">
              <span className="project-date">
                <Calendar size={12} />
                <span>{p.date}</span>
              </span>
              <h3 className="project-card-title">{p.title}</h3>
              <p className="project-summary">{p.overview || p.description.substring(0, 120) + '...'}</p>
              
              <div className="tech-badge-container">
                {p.technologies.slice(0, 3).map((tech, tIdx) => (
                  <span key={tIdx} className="tech-badge">{tech}</span>
                ))}
                {p.technologies.length > 3 && (
                  <span className="tech-badge-more">+{p.technologies.length - 3} more</span>
                )}
              </div>

              <button 
                onClick={() => setActiveProject(p)} 
                className="btn-read-specs"
              >
                <span>Technical Specifications</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="empty-state-box glass-card">
          <AlertCircle size={36} className="text-amber" />
          <h4>No projects published in this category yet.</h4>
          <p className="text-muted">Go to the admin console to publish a new project in this category.</p>
        </div>
      )}

      {/* Project Details Modal */}
      {activeProject && (
        <div className="modal-overlay" onClick={() => setActiveProject(null)}>
          <div className="modal-container glass-card animated" onClick={(e) => e.stopPropagation()}>
            
            <button className="modal-close-btn" onClick={() => setActiveProject(null)}>
              <X size={20} />
            </button>

            <div className="modal-scroll-body">
              <div className="modal-grid">
                
                {/* Left side info */}
                <div className="modal-primary-info">
                  <div className="modal-header">
                    <span className="modal-category">{activeProject.category}</span>
                    <h2 className="modal-title text-cyan">{activeProject.title}</h2>
                  </div>
                  
                  <div className="modal-metadata">
                    <div className="meta-item">
                      <User size={16} className="text-cyan" />
                      <div>
                        <span className="meta-label">Client / System Integrator</span>
                        <span className="meta-val">{activeProject.client}</span>
                      </div>
                    </div>
                    <div className="meta-item">
                      <Calendar size={16} className="text-cyan" />
                      <div>
                        <span className="meta-label">Commissioned Date</span>
                        <span className="meta-val">{activeProject.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="modal-desc-text">{activeProject.description}</p>

                  <div className="tech-badge-container modal-techs">
                    <span className="tech-heading-label">Integrated Technologies:</span>
                    <div className="tech-badges-row">
                      {activeProject.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-badge-large">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Before & After retrofits */}
                  {(activeProject.beforeSpec || activeProject.afterSpec) && (
                    <div className="retrofit-comparison-box">
                      <h4 className="modal-section-title">Retrofit Transition Details</h4>
                      <div className="comparison-cols">
                        <div className="comparison-card before">
                          <span className="comparison-badge before">Before Retrofit</span>
                          <p>{activeProject.beforeSpec}</p>
                        </div>
                        <div className="comparison-card after">
                          <span className="comparison-badge after">After Commissioning</span>
                          <p>{activeProject.afterSpec}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side info (Scope, Features, Outcomes) */}
                <div className="modal-secondary-info">
                  <img src={activeProject.image} alt={activeProject.title} className="modal-feature-img" />

                  {activeProject.scopeOfWork && activeProject.scopeOfWork.length > 0 && (
                    <div className="modal-list-section">
                      <h4 className="modal-section-title">
                        <ClipboardList size={16} className="text-cyan" />
                        <span>Scope of Work</span>
                      </h4>
                      <ul className="modal-bullets">
                        {activeProject.scopeOfWork.map((item, idx) => (
                          <li key={idx}>
                            <ChevronRight size={12} className="text-cyan text-align-top-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeProject.features && activeProject.features.length > 0 && (
                    <div className="modal-list-section">
                      <h4 className="modal-section-title">
                        <Cpu size={16} className="text-cyan" />
                        <span>Core Features Implemented</span>
                      </h4>
                      <ul className="modal-bullets">
                        {activeProject.features.map((item, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={12} className="text-cyan text-align-top-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeProject.outcomes && activeProject.outcomes.length > 0 && (
                    <div className="modal-list-section">
                      <h4 className="modal-section-title">
                        <CheckCircle2 size={16} className="text-amber" />
                        <span>Project Outcomes</span>
                      </h4>
                      <ul className="modal-bullets font-semibold">
                        {activeProject.outcomes.map((item, idx) => (
                          <li key={idx}>
                            <div className="outcome-bullet"></div>
                            <span className="text-white">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        .filter-bar {
          display: flex;
          justify-content: center;
          gap: 0.75rem;
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1.25rem;
          border-radius: 20px;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .filter-btn:hover {
          border-color: var(--accent-cyan);
          color: var(--text-primary);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-blue) 100%);
          border-color: transparent;
          color: white;
          box-shadow: var(--glow-cyan);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
        }

        .project-card {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .project-img-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
          background: #000;
        }

        .project-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .project-img {
          transform: scale(1.05);
        }

        .project-category-overlay {
          position: absolute;
          top: 1rem;
          left: 1rem;
          background: rgba(8, 12, 20, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid var(--border-color);
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-cyan);
          text-transform: uppercase;
        }

        .project-info {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          flex: 1;
        }

        .project-date {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.75rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .project-card-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.3;
          color: var(--text-primary);
        }

        .project-summary {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          flex: 1;
        }

        .tech-badge-container {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
          margin-top: 0.25rem;
        }

        .tech-badge {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-color);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .tech-badge-more {
          font-size: 0.75rem;
          color: var(--text-muted);
          align-self: center;
        }

        .btn-read-specs {
          margin-top: 0.5rem;
          background: none;
          border: none;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--accent-cyan);
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          padding: 0.5rem 0;
          width: fit-content;
          transition: var(--transition-smooth);
        }

        .btn-read-specs:hover {
          color: var(--accent-blue);
          transform: translateX(4px);
        }

        .empty-state-box {
          text-align: center;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        /* Modal Overlay */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(4, 6, 10, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          padding: 2rem;
        }

        .modal-container {
          width: 100%;
          max-width: 1100px;
          max-height: 90vh;
          border-color: var(--accent-cyan);
          position: relative;
          background: rgba(15, 21, 36, 0.95);
          overflow: hidden;
          box-shadow: 0 0 50px rgba(6, 182, 212, 0.15);
        }

        .modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-color);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-smooth);
          z-index: 10;
        }

        .modal-close-btn:hover {
          color: var(--text-primary);
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.05);
        }

        .modal-scroll-body {
          max-height: 85vh;
          overflow-y: auto;
          padding: 3rem;
        }

        .modal-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
        }

        .modal-primary-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .modal-category {
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent-cyan);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .modal-title {
          font-size: 2rem;
          font-weight: 800;
          margin-top: 0.25rem;
          line-height: 1.2;
        }

        .modal-metadata {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          background: rgba(0, 0, 0, 0.2);
          padding: 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .meta-item {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
        }

        .meta-label {
          display: block;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .meta-val {
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 600;
        }

        .modal-desc-text {
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .modal-techs {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .tech-heading-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
          text-transform: uppercase;
        }

        .tech-badges-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tech-badge-large {
          background: rgba(6, 182, 212, 0.05);
          border: 1px solid rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
          padding: 0.25rem 0.75rem;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .modal-section-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Retrofit comparative styling */
        .retrofit-comparison-box {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        .comparison-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          margin-top: 0.75rem;
        }

        .comparison-card {
          padding: 1rem 1.25rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          font-size: 0.85rem;
          line-height: 1.5;
          position: relative;
        }

        .comparison-card.before {
          background: rgba(239, 68, 68, 0.02);
          border-color: rgba(239, 68, 68, 0.15);
        }

        .comparison-card.after {
          background: rgba(16, 185, 129, 0.02);
          border-color: rgba(16, 185, 129, 0.15);
        }

        .comparison-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.1rem 0.5rem;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .comparison-badge.before {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }

        .comparison-badge.after {
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
        }

        /* Secondary side */
        .modal-secondary-info {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .modal-feature-img {
          width: 100%;
          height: 280px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .modal-list-section {
          background: rgba(0, 0, 0, 0.15);
          padding: 1.5rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
        }

        .modal-bullets {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .modal-bullets li {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .text-align-top-2 {
          margin-top: 4px;
          flex-shrink: 0;
        }

        .outcome-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--accent-amber);
          box-shadow: var(--glow-amber);
          margin-top: 8px;
          flex-shrink: 0;
        }

        .font-semibold span {
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          .modal-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .modal-scroll-body {
            padding: 1.5rem;
          }
          .modal-overlay {
            padding: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
