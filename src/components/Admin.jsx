import React, { useState } from 'react';
import { Lock, Unlock, LogOut, FilePlus, Eye, Trash2, CheckCircle2, RotateCcw, AlertTriangle, FileText, Mail, BarChart3, Edit, Upload, Users, Sliders } from 'lucide-react';

export default function Admin({
  projects,
  messages,
  team = [],
  isLoggedIn,
  handleLogin,
  handleLogout,
  onAddProject,
  onEditProject,
  onDeleteProject,
  onAddTeamMember,
  onEditTeamMember,
  onDeleteTeamMember,
  onDeleteMessage,
  onMarkMessageRead,
  onResetDatabase,
  activeTab,
  setActiveTab,
  activeMessage,
  setActiveMessage
}) {
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active Tab is controlled by parent App.jsx

  // Project Form States
  const [isEditing, setIsEditing] = useState(false);
  const [editProjectId, setEditProjectId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  
  const [projectForm, setProjectForm] = useState({
    title: '',
    client: '',
    category: 'PLC & HMI Retrofit',
    date: '',
    technologies: '',
    description: '',
    overview: '',
    beforeSpec: '',
    afterSpec: '',
    scopeOfWork: '',
    features: '',
    outcomes: '',
    image: '/assets/projects/pumphouse.jpg'
  });

  // Message Detail State is controlled by parent App.jsx

  // Team Member Form States
  const [teamFormOpen, setTeamFormOpen] = useState(false);
  const [isEditingTeam, setIsEditingTeam] = useState(false);
  const [editTeamMemberId, setEditTeamMemberId] = useState(null);
  const [teamForm, setProjectTeamForm] = useState({
    name: '',
    role: '',
    bio: '',
    level: 3
  });

  // Load drafts on mount
  React.useEffect(() => {
    const savedProjectDraft = localStorage.getItem('kassel_project_draft');
    if (savedProjectDraft) {
      try {
        const parsed = JSON.parse(savedProjectDraft);
        setProjectForm({
          title: parsed.title || '',
          client: parsed.client || '',
          category: parsed.category || 'PLC & HMI Retrofit',
          date: parsed.date || '',
          technologies: parsed.technologies || '',
          description: parsed.description || '',
          overview: parsed.overview || '',
          beforeSpec: parsed.beforeSpec || '',
          afterSpec: parsed.afterSpec || '',
          scopeOfWork: parsed.scopeOfWork || '',
          features: parsed.features || '',
          outcomes: parsed.outcomes || '',
          image: parsed.image || '/assets/projects/pumphouse.jpg'
        });
        setIsEditing(parsed.isEditing || false);
        setEditProjectId(parsed.editProjectId || null);
        setImagePreview(parsed.imagePreview || null);
        setFormOpen(true);
      } catch (e) {
        console.error('Failed to restore project draft:', e);
      }
    }

    const savedTeamDraft = localStorage.getItem('kassel_team_draft');
    if (savedTeamDraft) {
      try {
        const parsed = JSON.parse(savedTeamDraft);
        setProjectTeamForm({
          name: parsed.name || '',
          role: parsed.role || '',
          bio: parsed.bio || '',
          level: parsed.level || 3
        });
        setIsEditingTeam(parsed.isEditingTeam || false);
        setEditTeamMemberId(parsed.editTeamMemberId || null);
        setTeamFormOpen(true);
      } catch (e) {
        console.error('Failed to restore team draft:', e);
      }
    }
  }, []);

  // Save drafts on change
  React.useEffect(() => {
    if (formOpen) {
      localStorage.setItem('kassel_project_draft', JSON.stringify({
        ...projectForm,
        isEditing,
        editProjectId,
        imagePreview
      }));
    }
  }, [projectForm, formOpen, isEditing, editProjectId, imagePreview]);

  React.useEffect(() => {
    if (teamFormOpen) {
      localStorage.setItem('kassel_team_draft', JSON.stringify({
        ...teamForm,
        isEditingTeam,
        editTeamMemberId
      }));
    }
  }, [teamForm, teamFormOpen, isEditingTeam, editTeamMemberId]);

  const openAddTeamForm = () => {
    setProjectTeamForm({
      name: '',
      role: '',
      bio: '',
      level: 3
    });
    setIsEditingTeam(false);
    setTeamFormOpen(true);
  };

  const openEditTeamForm = (member) => {
    setProjectTeamForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      level: member.level
    });
    setIsEditingTeam(true);
    setEditTeamMemberId(member.id);
    setTeamFormOpen(true);
  };

  const handleTeamFormSubmit = (e) => {
    e.preventDefault();
    if (!teamForm.name.trim() || !teamForm.role.trim() || !teamForm.bio.trim()) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    const finalMember = {
      name: teamForm.name,
      role: teamForm.role,
      bio: teamForm.bio,
      level: parseInt(teamForm.level)
    };

    if (isEditingTeam) {
      onEditTeamMember(editTeamMemberId, finalMember);
    } else {
      onAddTeamMember(finalMember);
    }

    setTeamFormOpen(false);
    localStorage.removeItem('kassel_team_draft');
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'kassel2026') {
      handleLogin();
      setLoginError('');
      setUsername('');
      setPassword('');
    } else {
      setLoginError('Invalid Administrator credentials.');
    }
  };

  // Image Upload Handler (Converts to Base64 to save in LocalStorage)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProjectForm({ ...projectForm, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Form for Adding
  const openAddForm = () => {
    setProjectForm({
      title: '',
      client: '',
      category: 'PLC & HMI Retrofit',
      date: new Date().toISOString().substring(0, 7), // YYYY-MM
      technologies: '',
      description: '',
      overview: '',
      beforeSpec: '',
      afterSpec: '',
      scopeOfWork: '',
      features: '',
      outcomes: '',
      image: '/assets/projects/pumphouse.jpg'
    });
    setImagePreview(null);
    setIsEditing(false);
    setFormOpen(true);
  };

  // Open Form for Editing
  const openEditForm = (proj) => {
    setProjectForm({
      title: proj.title,
      client: proj.client,
      category: proj.category,
      date: proj.date,
      technologies: proj.technologies.join(', '),
      description: proj.description,
      overview: proj.overview || '',
      beforeSpec: proj.beforeSpec || '',
      afterSpec: proj.afterSpec || '',
      scopeOfWork: proj.scopeOfWork ? proj.scopeOfWork.join('\n') : '',
      features: proj.features ? proj.features.join('\n') : '',
      outcomes: proj.outcomes ? proj.outcomes.join('\n') : '',
      image: proj.image
    });
    setImagePreview(proj.image.startsWith('data:') ? proj.image : null);
    setIsEditing(true);
    setEditProjectId(proj.id);
    setFormOpen(true);
  };

  // Submit Project Form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!projectForm.title.trim() || !projectForm.client.trim() || !projectForm.description.trim()) {
      alert('Please fill in all mandatory fields.');
      return;
    }

    const techArray = projectForm.technologies
      .split(',')
      .map(item => item.trim())
      .filter(item => item !== '');

    const scopeArray = projectForm.scopeOfWork
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');

    const featuresArray = projectForm.features
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');

    const outcomesArray = projectForm.outcomes
      .split('\n')
      .map(item => item.trim())
      .filter(item => item !== '');

    const finalProject = {
      title: projectForm.title,
      client: projectForm.client,
      category: projectForm.category,
      date: projectForm.date,
      technologies: techArray,
      description: projectForm.description,
      overview: projectForm.overview,
      beforeSpec: projectForm.beforeSpec,
      afterSpec: projectForm.afterSpec,
      scopeOfWork: scopeArray,
      features: featuresArray,
      outcomes: outcomesArray,
      image: projectForm.image
    };

    if (isEditing) {
      onEditProject(editProjectId, finalProject);
    } else {
      onAddProject(finalProject);
    }

    setFormOpen(false);
    localStorage.removeItem('kassel_project_draft');
  };

  const handleMsgClick = (msg) => {
    setActiveMessage(msg);
    if (!msg.read) {
      onMarkMessageRead(msg.id);
    }
  };

  // Login View
  if (!isLoggedIn) {
    return (
      <section className="admin-section login-view">
        <div className="login-box glass-card animated">
          <div className="login-header">
            <div className="login-icon-box">
              <Lock className="text-cyan" size={28} />
            </div>
            <h2>Admin Login Panel</h2>
            <p>Access the Kassel Technology console to publish projects and view inquiries.</p>
          </div>

          <form onSubmit={onSubmitLogin} className="login-form">
            {loginError && <div className="login-error-alert">{loginError}</div>}
            
            <div className="form-group">
              <label className="form-label" htmlFor="admin-username">Administrator ID</label>
              <input 
                type="text" 
                id="admin-username"
                className="form-input" 
                placeholder="Username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="admin-password">Console Password</label>
              <input 
                type="password" 
                id="admin-password"
                className="form-input" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary btn-login-submit">
              <Unlock size={16} />
              <span>Authenticate Console</span>
            </button>
            <div className="admin-credentials-hint">
              <span>Default Credentials: admin / kassel2026</span>
            </div>
          </form>
        </div>

        <style>{`
          .login-view {
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: calc(var(--header-height) + 20px);
          }

          .login-box {
            width: 100%;
            max-width: 480px;
            padding: 3rem;
            border-color: var(--border-color);
          }

          .login-header {
            text-align: center;
            margin-bottom: 2rem;
          }

          .login-icon-box {
            width: 58px;
            height: 58px;
            background: rgba(6, 182, 212, 0.05);
            border: 1px solid rgba(6, 182, 212, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.25rem auto;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.1);
          }

          .login-header h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
          }

          .login-header p {
            font-size: 0.85rem;
            color: var(--text-secondary);
            line-height: 1.5;
          }

          .login-form {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }

          .login-error-alert {
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #f87171;
            padding: 0.75rem 1rem;
            border-radius: 6px;
            font-size: 0.85rem;
            text-align: center;
            font-weight: 500;
          }

          .btn-login-submit {
            justify-content: center;
            width: 100%;
          }

          .admin-credentials-hint {
            text-align: center;
            font-size: 0.75rem;
            color: var(--text-muted);
            margin-top: 0.25rem;
          }
        `}</style>
      </section>
    );
  }

  // Admin Dashboard view
  const unreadMessagesCount = messages.filter(m => !m.read).length;

  // Get inquiry count for the last 7 days
  const getDailyMessageStats = () => {
    const stats = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const label = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
      stats.push({ dateStr, label, count: 0 });
    }
    messages.forEach(msg => {
      if (msg.date) {
        const msgDateStr = new Date(msg.date).toISOString().split('T')[0];
        const dayStat = stats.find(s => s.dateStr === msgDateStr);
        if (dayStat) {
          dayStat.count += 1;
        }
      }
    });
    return stats;
  };

  const dailyStats = getDailyMessageStats();
  const maxCount = Math.max(...dailyStats.map(s => s.count), 4);
  const width = 600;
  const height = 220;
  const paddingX = 40;
  const paddingY = 30;

  const points = dailyStats.map((stat, index) => {
    const x = paddingX + (index * (width - 2 * paddingX)) / 6;
    const y = height - paddingY - (stat.count * (height - 2 * paddingY)) / maxCount;
    return { x, y, label: stat.label, count: stat.count };
  });

  const linePath = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const fillPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const totalInquiries = messages.length;
  const readInquiries = messages.filter(m => m.read).length;
  const responseRate = totalInquiries > 0 ? Math.round((readInquiries / totalInquiries) * 100) : 100;
  
  const busiestDay = () => {
    if (totalInquiries === 0) return 'N/A';
    const dayCounts = [0,0,0,0,0,0,0];
    messages.forEach(m => {
      if (m.date) {
        const d = new Date(m.date).getDay();
        dayCounts[d]++;
      }
    });
    const maxIdx = dayCounts.indexOf(Math.max(...dayCounts));
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dayNames[maxIdx];
  };

  return (
    <section className="admin-section console-view">
      <div className="bg-glow-dot-1"></div>
      
      <div className="console-layout">
        
        {/* Console Sidebar */}
        <aside className="console-sidebar glass-card">
          <div className="sidebar-brand">
            <div className="sidebar-brand-title">KASSEL SYSTEM</div>
            <span className="sidebar-brand-badge text-cyan">Admin Console</span>
          </div>

          <div className="sidebar-nav">
            <button 
              className={`sidebar-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
              onClick={() => { setActiveTab('projects'); setFormOpen(false); }}
            >
              <FileText size={18} />
              <span>Project Publisher</span>
              <span className="count-badge">{projects.length}</span>
            </button>

            <button 
              className={`sidebar-nav-item ${activeTab === 'team' ? 'active' : ''}`}
              onClick={() => { setActiveTab('team'); setFormOpen(false); }}
            >
              <Users size={18} />
              <span>Org Structure</span>
              <span className="count-badge">{team.length}</span>
            </button>

            <button 
              className={`sidebar-nav-item ${activeTab === 'inbox' ? 'active' : ''}`}
              onClick={() => { setActiveTab('inbox'); setActiveMessage(null); }}
            >
              <Mail size={18} />
              <span>Contact Inbox</span>
              {unreadMessagesCount > 0 && (
                <span className="count-badge unread-bg">{unreadMessagesCount}</span>
              )}
            </button>

            <button 
              className={`sidebar-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
              onClick={() => { setActiveTab('analytics'); setFormOpen(false); }}
            >
              <BarChart3 size={18} />
              <span>Inquiry Analytics</span>
            </button>

            <button 
              className={`sidebar-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => { setActiveTab('settings'); setFormOpen(false); }}
            >
              <Sliders size={18} />
              <span>Console Settings</span>
            </button>
          </div>

          <button onClick={handleLogout} className="btn-logout-sidebar">
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
        </aside>

        {/* Console Main Workspace */}
        <main className="console-workspace">
          
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div className="tab-pane animated">
              <div className="workspace-header">
                <div>
                  <h2 className="workspace-title">Published Case Studies</h2>
                  <p className="workspace-desc">Add, edit, or delete the project case studies displayed in the main portfolio section.</p>
                </div>
                {!formOpen && (
                  <button onClick={openAddForm} className="btn-primary">
                    <FilePlus size={16} />
                    <span>Publish Case Study</span>
                  </button>
                )}
              </div>

              {formOpen ? (
                <div className="form-container-card glass-card animated">
                  <div className="form-header-bar">
                    <h3 className="form-title text-cyan">{isEditing ? 'Modify Case Study' : 'Publish New Case Study'}</h3>
                    <button onClick={() => { setFormOpen(false); localStorage.removeItem('kassel_project_draft'); }} className="btn-close-form">&times;</button>
                  </div>

                  <form onSubmit={handleFormSubmit} className="project-editor-form">
                    
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label">Project Title *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Weighing Panel Commissioning"
                          value={projectForm.title}
                          onChange={(e) => setProjectForm({...projectForm, title: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Client Name *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Formtech Sdn Bhd"
                          value={projectForm.client}
                          onChange={(e) => setProjectForm({...projectForm, client: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row-3">
                      <div className="form-group">
                        <label className="form-label">Classification Category</label>
                        <select 
                          className="form-input select-input"
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({...projectForm, category: e.target.value})}
                        >
                          <option value="PLC & HMI Retrofit">PLC & HMI Retrofit</option>
                          <option value="Industrial Machinery">Industrial Machinery</option>
                          <option value="SCADA & Data Systems">SCADA & Data Systems</option>
                          <option value="Embedded & Gateways">Embedded & Gateways</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Date (YYYY-MM)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. 2024-08"
                          value={projectForm.date}
                          onChange={(e) => setProjectForm({...projectForm, date: e.target.value})}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Technology Stack (Comma separated)</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Siemens S7-1200, Modbus, SCADA"
                          value={projectForm.technologies}
                          onChange={(e) => setProjectForm({...projectForm, technologies: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Visual Cover Asset</label>
                      <div className="file-upload-wrapper">
                        <label className="file-upload-btn">
                          <Upload size={16} />
                          <span>Upload Project Image</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageChange} 
                            style={{ display: 'none' }} 
                          />
                        </label>
                        <div className="file-upload-path text-muted">
                          {imagePreview ? 'Custom Image Loaded' : 'Using default image: pumphouse.jpg'}
                        </div>
                      </div>
                      {imagePreview && (
                        <div className="form-image-preview">
                          <img src={imagePreview} alt="Preview" />
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Project Summary (One-sentence overview)</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        placeholder="e.g. Commissioning of a PLC-based SCADA network for region water pumps."
                        value={projectForm.overview}
                        onChange={(e) => setProjectForm({...projectForm, overview: e.target.value})}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Full Case Description *</label>
                      <textarea 
                        rows="4" 
                        className="form-input" 
                        placeholder="Provide details about the machine's legacy state, the retrofit process, and how it operates now..."
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({...projectForm, description: e.target.value})}
                        required
                      ></textarea>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label">Before Specs (Legacy State Details)</label>
                        <textarea 
                          rows="2" 
                          className="form-input" 
                          placeholder="e.g. Locked LOGO controllers, push-buttons wiring with no operator diagnostics."
                          value={projectForm.beforeSpec}
                          onChange={(e) => setProjectForm({...projectForm, beforeSpec: e.target.value})}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label className="form-label">After Specs (Upgraded State Details)</label>
                        <textarea 
                          rows="2" 
                          className="form-input" 
                          placeholder="e.g. Siemens S7-1214 with OP700 HMI, automated priority scheduling, open-source code."
                          value={projectForm.afterSpec}
                          onChange={(e) => setProjectForm({...projectForm, afterSpec: e.target.value})}
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-row-3">
                      <div className="form-group">
                        <label className="form-label">Scope of Work (One task per line)</label>
                        <textarea 
                          rows="3" 
                          className="form-input" 
                          placeholder="Decommissioning wiring&#10;Mounting S7-1200&#10;SCADA configuration"
                          value={projectForm.scopeOfWork}
                          onChange={(e) => setProjectForm({...projectForm, scopeOfWork: e.target.value})}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Key Features (One feature per line)</label>
                        <textarea 
                          rows="3" 
                          className="form-input" 
                          placeholder="Automatic pump rotation&#10;Dry-run safety interlocks&#10;Flow trends SCADA page"
                          value={projectForm.features}
                          onChange={(e) => setProjectForm({...projectForm, features: e.target.value})}
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Outcomes & KPIs (One outcome per line)</label>
                        <textarea 
                          rows="3" 
                          className="form-input" 
                          placeholder="Reduced breakdown rate by 50%&#10;Equalized motor runtimes&#10;Full telemetry report export"
                          value={projectForm.outcomes}
                          onChange={(e) => setProjectForm({...projectForm, outcomes: e.target.value})}
                        ></textarea>
                      </div>
                    </div>

                    <div className="form-actions-group">
                      <button type="submit" className="btn-primary">
                        <span>Save Case Study</span>
                      </button>
                      <button type="button" onClick={() => { setFormOpen(false); localStorage.removeItem('kassel_project_draft'); }} className="btn-secondary">
                        <span>Cancel</span>
                      </button>
                    </div>

                  </form>
                </div>
              ) : (
                <div className="published-projects-list">
                  {projects.map((proj) => (
                    <div key={proj.id} className="project-admin-row glass-card">
                      <img src={proj.image} alt={proj.title} className="proj-row-thumb" />
                      <div className="proj-row-info">
                        <span className="proj-row-cat text-cyan">{proj.category}</span>
                        <h4 className="proj-row-title">{proj.title}</h4>
                        <span className="proj-row-client text-muted">Client: {proj.client} • {proj.date}</span>
                      </div>
                      <div className="proj-row-actions">
                        <button onClick={() => openEditForm(proj)} className="btn-row-action edit" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => onDeleteProject(proj.id)} className="btn-row-action delete" title="Delete">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {projects.length === 0 && (
                    <div className="empty-state-list text-center">
                      <AlertTriangle size={32} className="text-amber" />
                      <p>No projects published. Click "Publish Case Study" to add one.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Team Members Management Tab */}
          {activeTab === 'team' && (
            <div className="tab-pane animated">
              <div className="workspace-header">
                <div>
                  <h2 className="workspace-title">Organizational Directory</h2>
                  <p className="workspace-desc">Manage your staff directory and configure their position/level in the company hierarchy.</p>
                </div>
                {!teamFormOpen && (
                  <button onClick={openAddTeamForm} className="btn-primary">
                    <FilePlus size={16} />
                    <span>Add Staff Member</span>
                  </button>
                )}
              </div>

              {teamFormOpen ? (
                <div className="form-container-card glass-card animated">
                  <div className="form-header-bar">
                    <h3 className="form-title text-cyan">{isEditingTeam ? 'Modify Staff Member' : 'Add New Staff Member'}</h3>
                    <button onClick={() => { setTeamFormOpen(false); localStorage.removeItem('kassel_team_draft'); }} className="btn-close-form">&times;</button>
                  </div>

                  <form onSubmit={handleTeamFormSubmit} className="project-editor-form">
                    
                    <div className="form-row-2">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Faizah Binti Naseeruteen"
                          value={teamForm.name}
                          onChange={(e) => setProjectTeamForm({...teamForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Job Title / Role *</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g. Sales Manager"
                          value={teamForm.role}
                          onChange={(e) => setProjectTeamForm({...teamForm, role: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Hierarchy Level (Determines position in Org Chart) *</label>
                      <select 
                        className="form-input select-input"
                        value={teamForm.level}
                        onChange={(e) => setProjectTeamForm({...teamForm, level: parseInt(e.target.value)})}
                        required
                      >
                        <option value="1">Director (Level 1 - Top)</option>
                        <option value="2">Manager (Level 2 - Mid)</option>
                        <option value="3">Staff / Engineer (Level 3 - Bottom)</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Professional Biography *</label>
                      <textarea 
                        rows="3" 
                        className="form-input" 
                        placeholder="Provide details about their field of study, responsibilities, and experience at Kassel..."
                        value={teamForm.bio}
                        onChange={(e) => setProjectTeamForm({...teamForm, bio: e.target.value})}
                        required
                      ></textarea>
                    </div>

                    <div className="form-actions-group">
                      <button type="submit" className="btn-primary">
                        <span>Save Personnel Settings</span>
                      </button>
                      <button type="button" onClick={() => { setTeamFormOpen(false); localStorage.removeItem('kassel_team_draft'); }} className="btn-secondary">
                        <span>Cancel</span>
                      </button>
                    </div>

                  </form>
                </div>
              ) : (
                <div className="published-projects-list">
                  {team.map((member) => (
                    <div key={member.id} className="project-admin-row glass-card">
                      <div className="proj-row-info">
                        <span className="proj-row-cat text-cyan">
                          {member.level === 1 ? 'Director (Level 1)' : member.level === 2 ? 'Manager (Level 2)' : 'Staff (Level 3)'}
                        </span>
                        <h4 className="proj-row-title">{member.name}</h4>
                        <span className="proj-row-client text-muted">Title: {member.role}</span>
                        <p className="msg-snippet text-muted mt-1">{member.bio.substring(0, 100)}...</p>
                      </div>
                      <div className="proj-row-actions">
                        <button onClick={() => openEditTeamForm(member)} className="btn-row-action edit" title="Edit Profile">
                          <Edit size={16} />
                        </button>
                        <button onClick={() => onDeleteTeamMember(member.id)} className="btn-row-action delete" title="Remove Profile">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {team.length === 0 && (
                    <div className="empty-state-list text-center">
                      <AlertTriangle size={32} className="text-amber" />
                      <p>No staff directory exists. Reset DB to restore defaults.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Inbox Tab */}
          {activeTab === 'inbox' && (
            <div className="tab-pane animated">
              <div className="workspace-header">
                <div>
                  <h2 className="workspace-title">Client Inquiries</h2>
                  <p className="workspace-desc">Manage submitted contact forms and technical callback requests.</p>
                </div>
              </div>

              <div className="inbox-layout">
                
                {/* Messages List */}
                <div className="inbox-list-column">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`msg-list-item glass-card ${!msg.read ? 'unread' : ''} ${activeMessage?.id === msg.id ? 'selected' : ''}`}
                      onClick={() => handleMsgClick(msg)}
                    >
                      <div className="msg-item-top">
                        <span className="msg-sender-name">{msg.name}</span>
                        <span className="msg-date-badge">
                          {new Date(msg.date).toLocaleDateString()} {new Date(msg.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <span className="msg-sender-company text-muted">{msg.company || 'Private Inquiry'}</span>
                      <h5 className="msg-subject-line">{msg.subject}</h5>
                      <p className="msg-snippet">{msg.message.substring(0, 70)}...</p>
                    </div>
                  ))}
                  {messages.length === 0 && (
                    <div className="empty-inbox-placeholder text-center glass-card">
                      <Mail size={32} className="text-muted" />
                      <p className="text-muted mt-2">Inbox is currently empty.</p>
                    </div>
                  )}
                </div>

                {/* Message Detail Viewer */}
                <div className="inbox-viewer-column">
                  {activeMessage ? (
                    <div className="message-detail-card glass-card animated" key={activeMessage.id}>
                      <div className="msg-viewer-header">
                        <div>
                          <span className="msg-detail-cat text-cyan">{activeMessage.subject}</span>
                          <h3 className="msg-detail-sender">{activeMessage.name}</h3>
                          <span className="msg-detail-company text-muted">{activeMessage.company || 'No Company Name'}</span>
                        </div>
                        <button 
                          onClick={() => { onDeleteMessage(activeMessage.id); setActiveMessage(null); }} 
                          className="btn-delete-msg"
                          title="Delete message"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="msg-viewer-divider"></div>

                      <div className="msg-contact-fields">
                        <div className="contact-field">
                          <span className="field-title">Email Address:</span>
                          <a href={`mailto:${activeMessage.email}`} className="field-val">{activeMessage.email}</a>
                        </div>
                        <div className="contact-field">
                          <span className="field-title">Phone Number:</span>
                          <a href={`tel:${activeMessage.phone}`} className="field-val">{activeMessage.phone}</a>
                        </div>
                        <div className="contact-field">
                          <span className="field-title">Submitted Time:</span>
                          <span className="field-val">{new Date(activeMessage.date).toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="msg-viewer-body">
                        <span className="body-title">Message Body:</span>
                        <div className="body-content-box">
                          {activeMessage.message}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="viewer-empty-state glass-card">
                      <Mail size={36} className="text-muted animate-pulse" />
                      <p className="text-muted">Select an inquiry from the inbox sidebar to view full details.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="tab-pane analytics-tab animated">
              <div className="workspace-header">
                <div>
                  <h2 className="workspace-title">Inquiry Analytics Dashboard</h2>
                  <p className="workspace-desc">Real-time statistics on customer inquiries and communication trends.</p>
                </div>
              </div>

              <div className="analytics-grid">
                
                {/* SVG Chart */}
                <div className="analytics-card glass-card chart-container">
                  <h3 className="widget-title">7-Day Inquiry Volume</h3>
                  <div className="chart-wrapper">
                    <svg viewBox={`0 0 ${width} ${height}`} className="analytics-svg" width="100%" height="100%">
                      <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      <line x1={paddingX} y1={paddingY} x2={paddingX} y2={height - paddingY} stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                      
                      {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
                        const y = paddingY + ratio * (height - 2 * paddingY);
                        const val = Math.round(maxCount - ratio * maxCount);
                        return (
                          <g key={idx}>
                            <line x1={paddingX} y1={y} x2={width - paddingX} y2={y} stroke="rgba(255,255,255,0.03)" strokeDasharray="4,4" />
                            <text x={paddingX - 10} y={y + 4} fill="var(--text-muted)" fontSize="9" textAnchor="end">{val}</text>
                          </g>
                        );
                      })}

                      <path d={fillPath} fill="url(#chartGrad)" />
                      <path d={linePath} fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" className="glow-stroke-cyan" />

                      {points.map((p, idx) => (
                        <g key={idx} className="chart-point-group">
                          <circle cx={p.x} cy={p.y} r="4" fill="var(--accent-cyan)" stroke="var(--bg-primary)" strokeWidth="1.5" />
                          <text x={p.x} y={p.y - 10} fill="var(--accent-cyan)" fontSize="9" fontWeight="bold" textAnchor="middle">{p.count}</text>
                          <text x={p.x} y={height - paddingY + 16} fill="var(--text-secondary)" fontSize="9" textAnchor="middle">{p.label}</text>
                        </g>
                      ))}

                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="var(--accent-cyan)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>

                {/* Metrics Sidebar */}
                <div className="analytics-metrics-sidebar">
                  <div className="metric-box-small glass-card">
                    <span className="metric-val">{totalInquiries}</span>
                    <span className="metric-label">Total Inquiries</span>
                  </div>
                  <div className="metric-box-small glass-card">
                    <span className="metric-val text-cyan">{unreadMessagesCount}</span>
                    <span className="metric-label">Pending Review</span>
                  </div>
                  <div className="metric-box-small glass-card">
                    <span className="metric-val text-amber">{responseRate}%</span>
                    <span className="metric-label">Read / Review Rate</span>
                  </div>
                  <div className="metric-box-small glass-card">
                    <span className="metric-val text-cyan">{busiestDay()}</span>
                    <span className="metric-label">Peak Activity Day</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="tab-pane settings-tab animated">
              <div className="workspace-header">
                <div>
                  <h2 className="workspace-title">Console Settings & Database</h2>
                  <p className="workspace-desc">System configuration, databases backups, and stats overview.</p>
                </div>
              </div>

              <div className="settings-grid">
                
                {/* Stats Widget */}
                <div className="settings-widget glass-card">
                  <h3 className="widget-title">Database Overview</h3>
                  <div className="stats-row-4">
                    <div className="stat-box">
                      <span className="stat-val">{projects.length}</span>
                      <span className="stat-label">Total Case Studies</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-val">{team.length}</span>
                      <span className="stat-label">Staff Personnel</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-val">{messages.length}</span>
                      <span className="stat-label">Total Messages</span>
                    </div>
                    <div className="stat-box">
                      <span className="stat-val text-cyan">{unreadMessagesCount}</span>
                      <span className="stat-label">Unread Messages</span>
                    </div>
                  </div>
                </div>

                {/* Reset DB Widget */}
                <div className="settings-widget glass-card reset-card">
                  <div className="widget-alert-header">
                    <AlertTriangle className="text-amber" size={24} />
                    <h3 className="widget-title text-amber">Database Reset Operation</h3>
                  </div>
                  <p className="widget-alert-desc">
                    Resetting the system database will clear all published additions and modifications 
                    from the local cache, reloading the default 4 case studies extracted from the corporate PDF. 
                    This operation is irreversible.
                  </p>
                  <button 
                    onClick={() => {
                      if (window.confirm('Are you sure you want to reset the database and restore default projects?')) {
                        onResetDatabase();
                        alert('System database reset to initial values.');
                      }
                    }} 
                    className="btn-secondary btn-reset-db text-amber"
                  >
                    <RotateCcw size={16} />
                    <span>Reset Database to Defaults</span>
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>

      </div>

      <style>{`
        .console-view {
          padding-top: calc(var(--header-height) + 20px);
          min-height: 90vh;
        }

        .console-layout {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 2.5rem;
          margin-top: 1rem;
          align-items: start;
        }

        /* Sidebar Styles */
        .console-sidebar {
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          border-color: var(--border-color);
          position: sticky;
          top: calc(var(--header-height) + 20px);
        }

        .sidebar-brand-title {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 1.15rem;
          letter-spacing: 0.05em;
        }

        .sidebar-brand-badge {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .sidebar-nav-item {
          background: none;
          border: 1px solid transparent;
          border-radius: 6px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
          width: 100%;
          text-align: left;
        }

        .sidebar-nav-item:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.02);
        }

        .sidebar-nav-item.active {
          background: rgba(6, 182, 212, 0.05);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
          font-weight: 600;
        }

        .count-badge {
          margin-left: auto;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.1rem 0.5rem;
          background: var(--bg-tertiary);
          color: var(--text-secondary);
          border-radius: 10px;
          border: 1px solid var(--border-color);
        }

        .sidebar-nav-item.active .count-badge {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .count-badge.unread-bg {
          background: rgba(239, 68, 68, 0.15);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .btn-logout-sidebar {
          margin-top: auto;
          background: rgba(239, 68, 68, 0.03);
          border: 1px solid rgba(239, 68, 68, 0.15);
          padding: 0.75rem 1rem;
          border-radius: 6px;
          color: #ef4444;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
          width: 100%;
        }

        .btn-logout-sidebar:hover {
          background: rgba(239, 68, 68, 0.12);
          border-color: #ef4444;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.1);
        }

        /* Workspace Styles */
        .console-workspace {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .workspace-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1.25rem;
          margin-bottom: 1rem;
        }

        .workspace-title {
          font-size: 1.75rem;
          font-weight: 700;
        }

        .workspace-desc {
          color: var(--text-secondary);
          font-size: 0.85rem;
          margin-top: 0.15rem;
        }

        /* Form Editor Card */
        .form-container-card {
          padding: 2.5rem;
          border-color: var(--accent-cyan);
        }

        .form-header-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 1rem;
        }

        .form-title {
          font-size: 1.35rem;
          font-weight: 700;
        }

        .btn-close-form {
          background: none;
          border: none;
          color: var(--text-muted);
          font-size: 1.75rem;
          cursor: pointer;
          line-height: 1;
        }

        .btn-close-form:hover {
          color: var(--text-primary);
        }

        .project-editor-form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-row-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }

        .file-upload-wrapper {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          background: rgba(0,0,0,0.2);
          border: 1px dashed var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 6px;
        }

        .file-upload-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: var(--transition-smooth);
        }

        .file-upload-btn:hover {
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }

        .file-upload-path {
          font-size: 0.8rem;
        }

        .form-image-preview {
          margin-top: 1rem;
          width: 140px;
          height: 100px;
          border: 1px solid var(--border-color);
          border-radius: 6px;
          overflow: hidden;
        }

        .form-image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .form-actions-group {
          display: flex;
          gap: 1rem;
          margin-top: 1.5rem;
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        /* Projects List Rows */
        .project-admin-row {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 1.25rem;
          margin-bottom: 1rem;
          border-color: var(--border-color);
        }

        .proj-row-thumb {
          width: 72px;
          height: 52px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid var(--border-color);
        }

        .proj-row-info {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
        }

        .proj-row-cat {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .proj-row-title {
          font-size: 1.05rem;
          font-weight: 700;
        }

        .proj-row-client {
          font-size: 0.8rem;
        }

        .proj-row-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-row-action {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.02);
          transition: var(--transition-smooth);
        }

        .btn-row-action.edit {
          color: var(--text-secondary);
        }

        .btn-row-action.edit:hover {
          color: var(--accent-cyan);
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.05);
        }

        .btn-row-action.delete {
          color: #ef4444;
        }

        .btn-row-action.delete:hover {
          color: white;
          background: #ef4444;
          border-color: transparent;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
        }

        /* Inbox Layout */
        .inbox-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 2rem;
          align-items: start;
        }

        .inbox-list-column {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 70vh;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .msg-list-item {
          padding: 1.25rem;
          cursor: pointer;
          border-color: var(--border-color);
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .msg-list-item:hover {
          border-color: var(--accent-cyan);
          background: rgba(255, 255, 255, 0.01);
        }

        .msg-list-item.selected {
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.04);
        }

        .msg-list-item.unread {
          border-left: 3px solid var(--accent-cyan);
        }

        .msg-item-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .msg-sender-name {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .msg-list-item.unread .msg-sender-name {
          color: var(--accent-cyan);
        }

        .msg-date-badge {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .msg-sender-company {
          font-size: 0.8rem;
        }

        .msg-subject-line {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-top: 0.25rem;
        }

        .msg-snippet {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .empty-inbox-placeholder {
          padding: 3rem 1.5rem;
          border-color: var(--border-color);
        }

        /* Message Viewer Details */
        .message-detail-card {
          padding: 2rem;
          border-color: var(--border-color);
        }

        .msg-viewer-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .msg-detail-cat {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .msg-detail-sender {
          font-size: 1.35rem;
          font-weight: 700;
          margin-top: 0.15rem;
        }

        .msg-detail-company {
          font-size: 0.85rem;
        }

        .btn-delete-msg {
          width: 36px;
          height: 36px;
          border-radius: 6px;
          border: 1px solid rgba(239, 68, 68, 0.15);
          background: rgba(239, 68, 68, 0.03);
          color: #ef4444;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .btn-delete-msg:hover {
          background: #ef4444;
          color: white;
          border-color: transparent;
        }

        .msg-viewer-divider {
          height: 1px;
          background: var(--border-color);
          margin: 1.5rem 0;
        }

        .msg-contact-fields {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.15);
          padding: 1.25rem;
          border-radius: 6px;
          border: 1px solid var(--border-color);
          margin-bottom: 1.5rem;
        }

        .contact-field {
          display: flex;
          font-size: 0.85rem;
        }

        .field-title {
          width: 130px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .field-val {
          color: var(--text-primary);
          font-weight: 600;
        }

        a.field-val:hover {
          color: var(--accent-cyan);
          text-decoration: underline;
        }

        .msg-viewer-body {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .body-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .body-content-box {
          background: rgba(0,0,0,0.1);
          border: 1px solid var(--border-color);
          padding: 1.25rem;
          border-radius: 6px;
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-secondary);
          white-space: pre-wrap;
        }

        .viewer-empty-state {
          padding: 5rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.25rem;
          border-color: var(--border-color);
        }

        /* Settings View Styles */
        .settings-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .settings-widget {
          padding: 2.5rem;
          border-color: var(--border-color);
        }

        .widget-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }

        .stats-row-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .stats-row-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .stat-box {
          background: rgba(0,0,0,0.2);
          border: 1px solid var(--border-color);
          padding: 1.5rem;
          border-radius: 8px;
          text-align: center;
        }

        .stat-val {
          display: block;
          font-size: 2.5rem;
          font-weight: 800;
          line-height: 1;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
        }

        .stat-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--text-muted);
        }

        .reset-card {
          border-color: rgba(245, 158, 11, 0.2);
        }

        .widget-alert-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .widget-alert-desc {
          color: var(--text-secondary);
          font-size: 0.9rem;
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .btn-reset-db:hover {
          border-color: var(--accent-amber);
          background: rgba(245, 158, 11, 0.08);
        }

        @media (max-width: 1024px) {
          .console-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .console-sidebar {
            position: relative;
            top: 0;
            flex-direction: row;
            flex-wrap: wrap;
            padding: 1.5rem;
          }
          .sidebar-brand {
            width: 100%;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1rem;
            margin-bottom: 0;
          }
          .sidebar-nav {
            flex-direction: row;
            flex-wrap: wrap;
            width: 100%;
          }
          .sidebar-nav-item {
            width: auto;
            flex: 1;
            justify-content: center;
          }
          .btn-logout-sidebar {
            width: auto;
            margin-top: 0;
          }
          .inbox-layout {
            grid-template-columns: 1fr;
          }
          .inbox-list-column {
            max-height: 40vh;
          }
        }

        @media (max-width: 600px) {
          .sidebar-nav {
            flex-direction: column;
          }
          .sidebar-nav-item {
            width: 100%;
          }
          .form-row-2, .form-row-3, .stats-row-3, .stats-row-4 {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
          .form-container-card {
            padding: 1.5rem;
          }
          .project-admin-row {
            flex-direction: column;
            text-align: center;
          }
        }

        /* Analytics Tab Styles */
        .analytics-grid {
          display: grid;
          grid-template-columns: 1fr 240px;
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .analytics-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          min-height: 300px;
        }

        .chart-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .analytics-svg {
          overflow: visible;
        }

        .analytics-metrics-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .metric-box-small {
          padding: 1rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .metric-box-small .metric-val {
          font-size: 1.5rem;
          font-weight: 700;
          font-family: var(--font-heading);
        }

        .metric-box-small .metric-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        @media (max-width: 900px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }
          .analytics-metrics-sidebar {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 500px) {
          .analytics-metrics-sidebar {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
