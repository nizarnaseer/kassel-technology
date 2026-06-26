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

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin'
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
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

    // 3. Login state
    const loggedInSession = sessionStorage.getItem('kassel_is_logged_in');
    if (loggedInSession === 'true') {
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener('popstate', handleRouting);
  }, []);

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
  };

  return (
    <div className="app-root-container">
      <div className="grid-bg-overlay"></div>
      <div className="cyber-scanner"></div>
      <Header 
        currentView={currentView} 
        setCurrentView={handleViewChange} 
        isLoggedIn={isLoggedIn} 
        handleLogout={handleLogout} 
      />

      {currentView === 'home' ? (
        <main className="main-content-layout">
          <Hero setCurrentView={handleViewChange} />
          <About />
          <Services />
          <Projects projects={projects} />
          <Contact addMessage={addMessage} />
        </main>
      ) : (
        <main className="main-content-layout">
          <Admin 
            projects={projects}
            messages={messages}
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            onAddProject={addProject}
            onEditProject={editProject}
            onDeleteProject={deleteProject}
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
