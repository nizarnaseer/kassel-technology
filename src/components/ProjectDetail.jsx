import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, ChevronLeft, CheckCircle2 } from 'lucide-react';

export default function ProjectDetail({ projects }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

      <section className="pt-32 pb-20">
        <div className="container-custom">
          
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mb-8">
            <ChevronLeft size={20} />
            <span>Back to Projects</span>
          </button>

          <div className="glass-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-slate-700/50 flex flex-col justify-center">
                <span className="cyber-badge self-start mb-6">{project.category}</span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {project.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-slate-400 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-cyan-400" />
                    <span>{project.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-400 font-semibold">Client:</span>
                    <span>{project.client}</span>
                  </div>
                </div>

                <div className="space-y-6 text-slate-300 leading-relaxed">
                  <p>{project.description}</p>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-700/50">
                  <h3 className="font-heading text-xl font-semibold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative min-h-[300px] md:min-h-full">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-80" />
              </div>
            </div>

            <div className="p-8 md:p-12 bg-[#0d131f]">
              <div className="grid md:grid-cols-3 gap-8">
                
                <div className="glass-panel p-6 rounded-xl border border-slate-700/50">
                  <h4 className="font-heading text-lg font-semibold text-cyan-400 mb-4 border-b border-slate-700/50 pb-2">Before Kassel</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{project.beforeSpec}</p>
                </div>
                
                <div className="glass-panel p-6 rounded-xl border border-slate-700/50">
                  <h4 className="font-heading text-lg font-semibold text-green-400 mb-4 border-b border-slate-700/50 pb-2">After Kassel</h4>
                  <p className="text-sm text-slate-300 leading-relaxed">{project.afterSpec}</p>
                </div>

                <div className="glass-panel p-6 rounded-xl border border-slate-700/50">
                  <h4 className="font-heading text-lg font-semibold text-white mb-4 border-b border-slate-700/50 pb-2">Scope of Work</h4>
                  <ul className="space-y-3">
                    {project.scopeOfWork && project.scopeOfWork.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                        <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {project.features && project.outcomes && (
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="glass-panel p-6 rounded-xl border border-slate-700/50">
                    <h4 className="font-heading text-lg font-semibold text-white mb-4 border-b border-slate-700/50 pb-2">Key Features Engineered</h4>
                    <ul className="space-y-3">
                      {project.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                          <CheckCircle2 size={16} className="text-cyan-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="glass-panel p-6 rounded-xl border border-slate-700/50">
                    <h4 className="font-heading text-lg font-semibold text-white mb-4 border-b border-slate-700/50 pb-2">Project Outcomes</h4>
                    <ul className="space-y-3">
                      {project.outcomes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                          <CheckCircle2 size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
