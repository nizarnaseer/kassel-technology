import React, { useState } from 'react';
import { Eye, Target, Sparkles, Users, Award, Shield, MessageSquare, ChevronDown, Check } from 'lucide-react';

export default function About({ team = [] }) {
  const [selectedMember, setSelectedMember] = useState(null);

  const corePrinciples = [
    {
      title: "United",
      icon: <Users className="text-cyan" size={24} />,
      desc: "We pursue and reach our goals always and only in team. We put individuality at the service of the group always keeping in mind that no one is irreplaceable and that all are fundamental for the success of our business."
    },
    {
      title: "Liability",
      icon: <Shield className="text-cyan" size={24} />,
      desc: "We carry out our commitments with the utmost care; our sense of responsibility prevents us from delivering incomplete or partial work and guiding us to always seek the best solution. We do not just propose an effective solution but we strive and we are pleased to always propose the most efficient solution."
    },
    {
      title: "Desire for Innovation",
      icon: <Sparkles className="text-cyan" size={24} />,
      desc: "We are thirsty for novelty, new features and new technologies. We pursue the change and are ready to continually innovate our structure and our services, adapting ourselves to the demands of the market and of the customers."
    },
    {
      title: "Strength of Communication",
      icon: <MessageSquare className="text-cyan" size={24} />,
      desc: "We are convinced that at the base of every success there is always a high level of communication; we strive to share our ideas and proposals because we are convinced that only in this way they can become the patrimony of the whole team."
    }
  ];

  const directors = team.filter(t => t.level === 1);
  const managers = team.filter(t => t.level === 2);
  const staff = team.filter(t => t.level === 3);

  const handleMemberClick = (member) => {
    if (selectedMember && selectedMember.id === member.id) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
    }
  };

  return (
    <section id="about" className="about-section">
      <div className="bg-glow-dot-2"></div>
      
      <div className="section-header">
        <span className="section-subtitle">Who We Are</span>
        <h2 className="section-title">About Kassel Technology</h2>
        <p className="section-description">
          A rising leader for Industrial Automation Services in the Malaysia market. 
          Founded in 2021 with the mission of delivering technical and service excellence.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-text-content glass-card">
          <h3 className="about-subheading">Our Journey</h3>
          <p className="about-paragraph">
            With the knowledge and experience accumulated from working in a top Automation System Integrator Company, 
            our founder decided to start his own startup in 2021 to extend the reach of industrial automation solutions in Malaysia. 
            Kassel Technology focuses on providing advanced engineering services. We have gained a reputation in the industry for 
            technical and service excellence by implementing our mission of <strong>Quality Solutions</strong>.
          </p>
          <p className="about-paragraph">
            Working along with mentor <strong>Mr. Yasir Amzad Ali</strong>, a seasoned specialist in the Automation Industry Business, 
            has given our team the privilege to experience and learn from the best. Together, we have accomplished many successful 
            automation projects for various clients, improving outputs and reducing downtime.
          </p>
        </div>

        <div className="mission-vision-wrapper">
          <div className="mission-card glass-card">
            <div className="mv-header">
              <div className="mv-icon-wrapper cyan">
                <Target size={24} />
              </div>
              <h3 className="mv-title">Our Mission</h3>
            </div>
            <p className="mv-text">
              We deliver state-of-the-art integrated automation and control solutions and we strive optimally to deliver superior quality projects to our clients.
            </p>
          </div>

          <div className="vision-card glass-card">
            <div className="mv-header">
              <div className="mv-icon-wrapper amber">
                <Eye size={24} />
              </div>
              <h3 className="mv-title">Our Vision</h3>
            </div>
            <p className="mv-text">
              Be the top premier automation solution provider for various industries in Malaysia.
            </p>
          </div>
        </div>
      </div>

      {/* Core Principles */}
      <div className="principles-section">
        <h3 className="sub-section-title">Core Principles</h3>
        <div className="principles-grid">
          {corePrinciples.map((p, idx) => (
            <div key={idx} className="principle-card glass-card">
              <div className="principle-header">
                {p.icon}
                <h4>{p.title}</h4>
              </div>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Team Org Chart */}
      <div className="team-section">
        <h3 className="sub-section-title">Organizational Structure</h3>
        <p className="team-intro-text">
          Click on any team member below to view their professional profile and project responsibilities.
        </p>

        <div className="org-chart-container">
          
          {/* Level 1: Directors */}
          {directors.length > 0 && (
            <div className="org-row level-1">
              {directors.map((d, idx) => (
                <div key={d.id || idx} className="org-col">
                  <div 
                    className={`team-member-node director-node ${selectedMember?.id === d.id ? 'active' : ''}`}
                    onClick={() => handleMemberClick(d)}
                  >
                    <div className="node-badge">Director</div>
                    <span className="node-name">{d.name}</span>
                    <span className="node-role">{d.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {directors.length > 0 && managers.length > 0 && <div className="org-connector-vertical"></div>}

          {/* Level 2: Managers */}
          {managers.length > 0 && (
            <div className="org-row level-2">
              {managers.map((m, idx) => (
                <div key={m.id || idx} className="org-col">
                  <div 
                    className={`team-member-node manager-node ${selectedMember?.id === m.id ? 'active' : ''}`}
                    onClick={() => handleMemberClick(m)}
                  >
                    <div className="node-badge">Manager</div>
                    <span className="node-name">{m.name}</span>
                    <span className="node-role">{m.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {managers.length > 0 && staff.length > 0 && <div className="org-connector-vertical"></div>}

          {/* Level 3: Staff */}
          {staff.length > 0 && (
            <div className="org-row level-3">
              {staff.map((s, idx) => (
                <div key={s.id || idx} className="org-col">
                  <div 
                    className={`team-member-node staff-node ${selectedMember?.id === s.id ? 'active' : ''}`}
                    onClick={() => handleMemberClick(s)}
                  >
                    <div className="node-badge">{s.role.toLowerCase().includes('engineer') ? 'Technical' : 'Sales'}</div>
                    <span className="node-name">{s.name}</span>
                    <span className="node-role">{s.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Selected Member Detail Card */}
        {selectedMember && (
          <div className="member-detail-modal glass-card animated">
            <div className="detail-modal-header">
              <div>
                <h4 className="detail-name text-cyan">{selectedMember.name}</h4>
                <span className="detail-role">{selectedMember.role}</span>
              </div>
              <button className="btn-close-detail" onClick={() => setSelectedMember(null)}>&times;</button>
            </div>
            <p className="detail-bio">{selectedMember.bio}</p>
            <div className="detail-meta">
              <Check className="text-cyan" size={14} />
              <span>Full-time Personnel • Kassel Technology Malaysia</span>
            </div>
          </div>
        )}

      </div>

      <style>{`
        .about-section {
          position: relative;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 2.5rem;
          margin-bottom: 5rem;
        }

        .about-text-content {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .about-subheading {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .about-paragraph {
          color: var(--text-secondary);
          line-height: 1.7;
          font-size: 1rem;
        }

        .mission-vision-wrapper {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .mission-card, .vision-card {
          padding: 2rem;
          height: 100%;
        }

        .mv-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .mv-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .mv-icon-wrapper.cyan {
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
        }

        .mv-icon-wrapper.amber {
          background: rgba(245, 158, 11, 0.08);
          border: 1px solid rgba(245, 158, 11, 0.2);
          color: var(--accent-amber);
        }

        .mv-title {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .mv-text {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Principles grid */
        .principles-section, .team-section {
          margin-top: 5rem;
        }

        .sub-section-title {
          font-size: 2rem;
          text-align: center;
          margin-bottom: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .principle-card {
          padding: 2rem;
        }

        .principle-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .principle-header h4 {
          font-size: 1.15rem;
          font-weight: 700;
        }

        .principle-card p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* Interactive Org Chart Layout */
        .team-intro-text {
          text-align: center;
          color: var(--text-secondary);
          margin-top: -1.5rem;
          margin-bottom: 3rem;
          font-size: 0.95rem;
        }

        .org-chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 3rem 1.5rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .org-row {
          display: flex;
          justify-content: center;
          gap: 2rem;
          width: 100%;
          flex-wrap: wrap;
        }

        .org-col {
          display: flex;
          justify-content: center;
        }

        .org-connector-vertical {
          width: 1px;
          height: 30px;
          background: var(--border-color);
          margin: 0.5rem 0;
        }

        .team-member-node {
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 8px;
          padding: 1rem 1.5rem;
          text-align: center;
          cursor: pointer;
          transition: var(--transition-smooth);
          width: 220px;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          position: relative;
        }

        .team-member-node:hover {
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.05);
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(6, 182, 212, 0.1);
        }

        .team-member-node.active {
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.1);
          box-shadow: var(--glow-cyan);
        }

        .director-node {
          width: 260px;
          border-color: rgba(6, 182, 212, 0.3);
        }

        .node-badge {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          color: var(--text-muted);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          padding: 0.1rem 0.6rem;
          border-radius: 10px;
          letter-spacing: 0.05em;
        }

        .director-node .node-badge {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .node-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.25rem;
        }

        .node-role {
          font-size: 0.75rem;
          color: var(--accent-cyan);
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        /* Detail Modal */
        .member-detail-modal {
          margin: 2rem auto 0 auto;
          max-width: 600px;
          padding: 1.75rem;
          border-color: var(--accent-cyan);
          position: relative;
        }

        .detail-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .detail-name {
          font-size: 1.25rem;
          font-weight: 700;
        }

        .detail-role {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .btn-close-detail {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.5rem;
          cursor: pointer;
          line-height: 1;
        }

        .btn-close-detail:hover {
          color: var(--text-primary);
        }

        .detail-bio {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
          margin-bottom: 1.25rem;
        }

        .detail-meta {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
          .principles-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .org-row {
            flex-direction: column;
            align-items: center;
            gap: 2.25rem;
          }
          .org-connector-vertical {
            display: none;
          }
          .org-chart-container {
            padding: 2rem 1rem;
            gap: 2.25rem;
          }
        }
      `}</style>
    </section>
  );
}
