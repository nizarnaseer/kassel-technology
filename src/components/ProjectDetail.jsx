import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Cpu, ClipboardList, CheckCircle2, ChevronRight, AlertCircle, ChevronLeft } from 'lucide-react';

export default function ProjectDetail({ projects }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (projects.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050810]">
        <div className="loader"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="section-padding container-custom text-center min-h-screen flex flex-col justify-center items-center">
        <h2 className="section-title">Project Not Found</h2>
        <p className="text-muted mt-4 mb-8">The case study you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/')} className="btn-primary">Return Home</button>
      </div>
    );
  }

  // Generate Article JSON-LD Schema for this specific project
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": project.title,
    "description": project.overview || project.description.substring(0, 150),
    "image": `https://www.kasseltech.com${project.image}`,
    "datePublished": project.date,
    "author": {
      "@type": "Organization",
      "name": "Kassel Technology"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Kassel Technology",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.kasseltech.com/kassel_logo.png"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>{project.title} | Case Study | Kassel Technology</title>
        <meta name="description" content={project.overview || project.description.substring(0, 150)} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <section className="projects-section" style={{ paddingTop: '8rem', minHeight: '100vh' }}>
        <div className="container-custom">
          
          <button onClick={() => navigate('/')} className="btn-read-specs" style={{ marginBottom: '2rem', display: 'inline-flex', padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '20px' }}>
            <ChevronLeft size={16} style={{ marginRight: '8px' }} />
            <span>Back to Projects</span>
          </button>

          <div className="modal-container glass-card animated" style={{ position: 'relative', width: '100%', maxWidth: '1100px', margin: '0 auto', maxHeight: 'none', transform: 'none' }}>
            <div className="modal-scroll-body" style={{ maxHeight: 'none', overflowY: 'visible', padding: '2rem' }}>
              <div className="modal-grid">
                
                {/* Left side info */}
                <div className="modal-primary-info">
                  <div className="modal-header">
                    <span className="modal-category">{project.category}</span>
                    <h2 className="modal-title text-cyan">{project.title}</h2>
                  </div>
                  
                  <div className="modal-metadata">
                    <div className="meta-item">
                      <User size={16} className="text-cyan" />
                      <div>
                        <span className="meta-label">Client / System Integrator</span>
                        <span className="meta-val">{project.client}</span>
                      </div>
                    </div>
                    <div className="meta-item">
                      <Calendar size={16} className="text-cyan" />
                      <div>
                        <span className="meta-label">Commissioned Date</span>
                        <span className="meta-val">{project.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="modal-desc-text">{project.description}</p>

                  <div className="tech-badge-container modal-techs">
                    <span className="tech-heading-label">Integrated Technologies:</span>
                    <div className="tech-badges-row">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-badge-large">{tech}</span>
                      ))}
                    </div>
                  </div>

                  {/* Before & After retrofits */}
                  {(project.beforeSpec || project.afterSpec) && (
                    <div className="retrofit-comparison-box">
                      <h3 className="modal-section-title">Retrofit Transition Details</h3>
                      <div className="comparison-cols">
                        <div className="comparison-card before">
                          <span className="comparison-badge before">Before Retrofit</span>
                          <p>{project.beforeSpec}</p>
                        </div>
                        <div className="comparison-card after">
                          <span className="comparison-badge after">After Commissioning</span>
                          <p>{project.afterSpec}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side info (Scope, Features, Outcomes) */}
                <div className="modal-secondary-info">
                  <img src={project.image} alt={project.title} className="modal-feature-img" />

                  {project.scopeOfWork && project.scopeOfWork.length > 0 && (
                    <div className="modal-list-section">
                      <h3 className="modal-section-title">
                        <ClipboardList size={16} className="text-cyan" />
                        <span>Scope of Work</span>
                      </h3>
                      <ul className="modal-bullets">
                        {project.scopeOfWork.map((item, idx) => (
                          <li key={idx}>
                            <ChevronRight size={12} className="text-cyan text-align-top-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.features && project.features.length > 0 && (
                    <div className="modal-list-section">
                      <h3 className="modal-section-title">
                        <Cpu size={16} className="text-cyan" />
                        <span>Core Features Implemented</span>
                      </h3>
                      <ul className="modal-bullets">
                        {project.features.map((item, idx) => (
                          <li key={idx}>
                            <CheckCircle2 size={12} className="text-cyan text-align-top-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.outcomes && project.outcomes.length > 0 && (
                    <div className="modal-list-section">
                      <h3 className="modal-section-title">
                        <CheckCircle2 size={16} className="text-amber" />
                        <span>Project Outcomes</span>
                      </h3>
                      <ul className="modal-bullets font-semibold">
                        {project.outcomes.map((item, idx) => (
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
            
            <div className="modal-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem', marginTop: '1.5rem' }}>
              <button onClick={() => navigate('/#contact')} className="btn-primary">Consult on Similar Project</button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
