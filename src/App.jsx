import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './components/Admin';
import { initialProjects } from './data/initialProjects';
import { initialTeam } from './data/initialTeam';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin'
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [team, setTeam] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Initialize Data from LocalStorage & Handle Path Routing
  useEffect(() => {
    const handleRouting = () => {
      if (window.location.pathname === '/admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('home');
      }
    };
    
    handleRouting();
    window.addEventListener('popstate', handleRouting);

    // 1. Projects
    const localProjects = localStorage.getItem('kassel_projects');
    if (localProjects) {
      setProjects(JSON.parse(localProjects));
    } else {
      localStorage.setItem('kassel_projects', JSON.stringify(initialProjects));
      setProjects(initialProjects);
    }

    // 2. Messages
    const localMessages = localStorage.getItem('kassel_messages');
    if (localMessages) {
      setMessages(JSON.parse(localMessages));
    } else {
      localStorage.setItem('kassel_messages', JSON.stringify([]));
      setMessages([]);
    }

    // 3. Team Members
    const localTeam = localStorage.getItem('kassel_team');
    if (localTeam) {
      setTeam(JSON.parse(localTeam));
    } else {
      localStorage.setItem('kassel_team', JSON.stringify(initialTeam));
      setTeam(initialTeam);
    }

    // 4. Login state
    const loggedInSession = sessionStorage.getItem('kassel_is_logged_in');
    if (loggedInSession === 'true') {
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener('popstate', handleRouting);
  }, []);

  // Prevent right-click context menu (on non-inputs) and image dragging to protect content
  useEffect(() => {
    const handleContextMenu = (e) => {
      // Allow right-click on inputs and textareas so users can copy-paste their own typed content
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }
      e.preventDefault();
    };

    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentView]);

  // Update projects list in state & localstorage
  const updateProjectsInStorage = (updatedList) => {
    setProjects(updatedList);
    localStorage.setItem('kassel_projects', JSON.stringify(updatedList));
  };

  // Update messages list in state & localstorage
  const updateMessagesInStorage = (updatedList) => {
    setMessages(updatedList);
    localStorage.setItem('kassel_messages', JSON.stringify(updatedList));
  };

  // Update team list in state & localstorage
  const updateTeamInStorage = (updatedList) => {
    setTeam(updatedList);
    localStorage.setItem('kassel_team', JSON.stringify(updatedList));
  };

  // View & URL history synchronizer
  const handleViewChange = (view) => {
    setCurrentView(view);
    if (view === 'admin') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  };

  // Login/Logout Handlers
  const handleLogin = () => {
    setIsLoggedIn(true);
    sessionStorage.setItem('kassel_is_logged_in', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('kassel_is_logged_in');
    handleViewChange('home');
  };

  // CRUD for Projects
  const addProject = (newProj) => {
    const projWithId = {
      ...newProj,
      id: 'proj-' + Date.now()
    };
    const newList = [projWithId, ...projects];
    updateProjectsInStorage(newList);
  };

  const editProject = (id, updatedProj) => {
    const newList = projects.map(p => p.id === id ? { ...updatedProj, id } : p);
    updateProjectsInStorage(newList);
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      const newList = projects.filter(p => p.id !== id);
      updateProjectsInStorage(newList);
    }
  };

  // CRUD for Team Members
  const addTeamMember = (newMember) => {
    const memberWithId = {
      ...newMember,
      id: 'tm-' + Date.now()
    };
    const newList = [...team, memberWithId];
    updateTeamInStorage(newList);
  };

  const editTeamMember = (id, updatedMember) => {
    const newList = team.map(t => t.id === id ? { ...updatedMember, id } : t);
    updateTeamInStorage(newList);
  };

  const deleteTeamMember = (id) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      const newList = team.filter(t => t.id !== id);
      updateTeamInStorage(newList);
    }
  };

  // CRUD for Messages
  const addMessage = (newMsg) => {
    const newList = [newMsg, ...messages];
    updateMessagesInStorage(newList);
  };

  const deleteMessage = (id) => {
    if (window.confirm('Delete this message permanently?')) {
      const newList = messages.filter(m => m.id !== id);
      updateMessagesInStorage(newList);
    }
  };

  const markMessageRead = (id) => {
    const newList = messages.map(m => m.id === id ? { ...m, read: true } : m);
    updateMessagesInStorage(newList);
  };

  // System Database Reset
  const resetDatabase = () => {
    localStorage.setItem('kassel_projects', JSON.stringify(initialProjects));
    setProjects(initialProjects);
    localStorage.setItem('kassel_team', JSON.stringify(initialTeam));
    setTeam(initialTeam);
  };

  return (
    <div className="app-root-container">
      <div className="grid-bg-overlay"></div>
      <div className="cyber-scanner"></div>
      
      {/* Floating Animated Cyber Nodes */}
      <div className="cyber-nodes-container">
        <div className="cyber-node" style={{ top: '15%', left: '8%', width: '12px', height: '12px', animationDelay: '0s' }}></div>
        <div className="cyber-node" style={{ top: '45%', left: '88%', width: '8px', height: '8px', animationDelay: '2.5s' }}></div>
        <div className="cyber-node" style={{ top: '75%', left: '15%', width: '16px', height: '16px', animationDelay: '5s' }}></div>
        <div className="cyber-node" style={{ top: '85%', left: '72%', width: '10px', height: '10px', animationDelay: '1.2s' }}></div>
        <div className="cyber-node" style={{ top: '28%', left: '78%', width: '14px', height: '14px', animationDelay: '3.8s' }}></div>
      </div>

      <Header 
        currentView={currentView} 
        setCurrentView={handleViewChange} 
        isLoggedIn={isLoggedIn} 
        handleLogout={handleLogout} 
      />

      {currentView === 'home' ? (
        <main className="main-content-layout">
          <div className="scroll-reveal"><Hero setCurrentView={handleViewChange} /></div>
          <div className="scroll-reveal"><About team={team} /></div>
          <div className="scroll-reveal"><Services /></div>
          <div className="scroll-reveal"><Projects projects={projects} /></div>
          <div className="scroll-reveal"><Contact addMessage={addMessage} /></div>
        </main>
      ) : (
        <main className="main-content-layout">
          <Admin 
            projects={projects}
            messages={messages}
            team={team}
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            onAddProject={addProject}
            onEditProject={editProject}
            onDeleteProject={deleteProject}
            onAddTeamMember={addTeamMember}
            onEditTeamMember={editTeamMember}
            onDeleteTeamMember={deleteTeamMember}
            onDeleteMessage={deleteMessage}
            onMarkMessageRead={markMessageRead}
            onResetDatabase={resetDatabase}
          />
        </main>
      )}

      <Footer setCurrentView={handleViewChange} />

      <style>{`
        .app-root-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: var(--bg-primary);
          background-image: 
            radial-gradient(at 10% 20%, rgba(6, 182, 212, 0.02) 0px, transparent 50%),
            radial-gradient(at 90% 80%, rgba(59, 130, 246, 0.02) 0px, transparent 50%);
        }

        .main-content-layout {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
