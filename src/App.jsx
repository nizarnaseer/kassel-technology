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
import QuickInquire from './components/QuickInquire';
import { initialTeam } from './data/initialTeam';
import { db, isFirebaseEnabled } from './firebase';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs } from 'firebase/firestore';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'admin'
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [team, setTeam] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeToast, setActiveToast] = useState(null);
  const [adminActiveTab, setAdminActiveTab] = useState('projects');
  const [adminActiveMessage, setAdminActiveMessage] = useState(null);

  // Initialize Routing & Handle Path Routing
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

    // Login state session recovery
    const loggedInSession = sessionStorage.getItem('kassel_is_logged_in');
    if (loggedInSession === 'true') {
      setIsLoggedIn(true);
    }

    return () => window.removeEventListener('popstate', handleRouting);
  }, []);

  // Initialize Database: Firebase Firestore with local LocalStorage fallback
  useEffect(() => {
    if (!isFirebaseEnabled) {
      // 1. Projects local storage
      const localProjects = localStorage.getItem('kassel_projects');
      if (localProjects) {
        setProjects(JSON.parse(localProjects));
      } else {
        localStorage.setItem('kassel_projects', JSON.stringify(initialProjects));
        setProjects(initialProjects);
      }

      // 2. Messages local storage
      const localMessages = localStorage.getItem('kassel_messages');
      if (localMessages) {
        setMessages(JSON.parse(localMessages));
      } else {
        localStorage.setItem('kassel_messages', JSON.stringify([]));
        setMessages([]);
      }

      // 3. Team local storage
      const localTeam = localStorage.getItem('kassel_team');
      if (localTeam) {
        setTeam(JSON.parse(localTeam));
      } else {
        localStorage.setItem('kassel_team', JSON.stringify(initialTeam));
        setTeam(initialTeam);
      }
      return;
    }

    // Firebase is enabled
    let isCancelled = false;
    let cleanupListeners = () => {};

    const initializeFirebaseAndListen = async () => {
      try {
        // A. Seed Projects if collection is empty
        const projectsRef = collection(db, 'projects');
        const projectsSnap = await getDocs(projectsRef);
        if (projectsSnap.empty && !isCancelled) {
          console.log('Firebase Database: Seeding default projects...');
          for (const proj of initialProjects) {
            await setDoc(doc(db, 'projects', proj.id), proj);
          }
        }

        // B. Seed Team if collection is empty
        const teamRef = collection(db, 'team');
        const teamSnap = await getDocs(teamRef);
        if (teamSnap.empty && !isCancelled) {
          console.log('Firebase Database: Seeding default team structure...');
          for (const member of initialTeam) {
            await setDoc(doc(db, 'team', member.id), member);
          }
        }
      } catch (error) {
        console.error('Firebase initialization seeding error:', error);
      }

      if (isCancelled) return;

      // C. Set up real-time sync listeners
      const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
        const projs = [];
        snapshot.forEach((doc) => {
          projs.push({ id: doc.id, ...doc.data() });
        });
        setProjects(projs);
      });

      const unsubTeam = onSnapshot(collection(db, 'team'), (snapshot) => {
        const members = [];
        snapshot.forEach((doc) => {
          members.push({ id: doc.id, ...doc.data() });
        });
        setTeam(members);
      });

      const unsubMessages = onSnapshot(collection(db, 'messages'), (snapshot) => {
        const msgs = [];
        snapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() });
        });
        msgs.sort((a, b) => new Date(b.date) - new Date(a.date));
        setMessages(msgs);
      });

      cleanupListeners = () => {
        unsubProjects();
        unsubTeam();
        unsubMessages();
      };
    };

    initializeFirebaseAndListen();

    return () => {
      isCancelled = true;
      cleanupListeners();
    };
  }, []);

  // Prevent right-click context menu (on non-inputs) and image dragging to protect content
  useEffect(() => {
    const handleContextMenu = (e) => {
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

  // Synthesize a high-tech notification chime in code to avoid loading mp3 files
  const playNotificationSound = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const playNote = (freq, startTime, duration) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);
        gainNode.gain.setValueAtTime(0.06, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      const now = audioCtx.currentTime;
      playNote(523.25, now, 0.25); // C5
      playNote(659.25, now + 0.12, 0.35); // E5
    } catch (err) {
      console.warn('AudioContext chime blocked by browser autoplay rules:', err);
    }
  };

  // Monitor new messages for Toast Notifications
  useEffect(() => {
    if (messages.length === 0 || !isLoggedIn) return;

    const latestMsg = messages[0];
    const msgTime = new Date(latestMsg.date).getTime();
    const nowTime = Date.now();
    const isRecent = (nowTime - msgTime) < 15000;

    if (!latestMsg.read && isRecent && (!activeToast || activeToast.id !== latestMsg.id)) {
      setActiveToast({
        id: latestMsg.id,
        sender: latestMsg.name,
        subject: latestMsg.subject,
        message: latestMsg.message
      });
      playNotificationSound();
    }
  }, [messages, isLoggedIn, activeToast]);

  // Local storage synchronization helpers (used as fallback when Firebase is disabled)
  const updateProjectsInStorage = (updatedList) => {
    setProjects(updatedList);
    localStorage.setItem('kassel_projects', JSON.stringify(updatedList));
  };

  const updateMessagesInStorage = (updatedList) => {
    setMessages(updatedList);
    localStorage.setItem('kassel_messages', JSON.stringify(updatedList));
  };

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
  const addProject = async (newProj) => {
    const projId = 'proj-' + Date.now();
    const projectData = { ...newProj, id: projId };
    
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'projects', projId), projectData);
      } catch (err) {
        console.error('Error adding project to Firebase:', err);
      }
    } else {
      const newList = [projectData, ...projects];
      updateProjectsInStorage(newList);
    }
  };

  const editProject = async (id, updatedProj) => {
    const projectData = { ...updatedProj, id };
    
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'projects', id), projectData);
      } catch (err) {
        console.error('Error updating project in Firebase:', err);
      }
    } else {
      const newList = projects.map(p => p.id === id ? projectData : p);
      updateProjectsInStorage(newList);
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      if (isFirebaseEnabled) {
        try {
          await deleteDoc(doc(db, 'projects', id));
        } catch (err) {
          console.error('Error deleting project from Firebase:', err);
        }
      } else {
        const newList = projects.filter(p => p.id !== id);
        updateProjectsInStorage(newList);
      }
    }
  };

  // CRUD for Team Members
  const addTeamMember = async (newMember) => {
    const tmId = 'tm-' + Date.now();
    const memberData = { ...newMember, id: tmId };
    
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'team', tmId), memberData);
      } catch (err) {
        console.error('Error adding team member to Firebase:', err);
      }
    } else {
      const newList = [...team, memberData];
      updateTeamInStorage(newList);
    }
  };

  const editTeamMember = async (id, updatedMember) => {
    const memberData = { ...updatedMember, id };
    
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'team', id), memberData);
      } catch (err) {
        console.error('Error updating team member in Firebase:', err);
      }
    } else {
      const newList = team.map(t => t.id === id ? memberData : t);
      updateTeamInStorage(newList);
    }
  };

  const deleteTeamMember = async (id) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      if (isFirebaseEnabled) {
        try {
          await deleteDoc(doc(db, 'team', id));
        } catch (err) {
          console.error('Error deleting team member from Firebase:', err);
        }
      } else {
        const newList = team.filter(t => t.id !== id);
        updateTeamInStorage(newList);
      }
    }
  };

  // CRUD for Messages
  const addMessage = async (newMsg) => {
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'messages', newMsg.id), newMsg);
      } catch (err) {
        console.error('Error adding message to Firebase:', err);
      }
    } else {
      const newList = [newMsg, ...messages];
      updateMessagesInStorage(newList);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Delete this message permanently?')) {
      if (isFirebaseEnabled) {
        try {
          await deleteDoc(doc(db, 'messages', id));
        } catch (err) {
          console.error('Error deleting message from Firebase:', err);
        }
      } else {
        const newList = messages.filter(m => m.id !== id);
        updateMessagesInStorage(newList);
      }
    }
  };

  const markMessageRead = async (id) => {
    const originalMsg = messages.find(m => m.id === id);
    if (!originalMsg) return;
    const updatedMsg = { ...originalMsg, read: true };
    
    if (isFirebaseEnabled) {
      try {
        await setDoc(doc(db, 'messages', id), updatedMsg);
      } catch (err) {
        console.error('Error updating message in Firebase:', err);
      }
    } else {
      const newList = messages.map(m => m.id === id ? updatedMsg : m);
      updateMessagesInStorage(newList);
    }
  };

  // System Database Reset
  const resetDatabase = async () => {
    if (isFirebaseEnabled) {
      try {
        // Reset Projects: delete existing and write initial
        const projectsRef = collection(db, 'projects');
        const projectsSnap = await getDocs(projectsRef);
        for (const docItem of projectsSnap.docs) {
          await deleteDoc(doc(db, 'projects', docItem.id));
        }
        for (const proj of initialProjects) {
          await setDoc(doc(db, 'projects', proj.id), proj);
        }

        // Reset Team: delete existing and write initial
        const teamRef = collection(db, 'team');
        const teamSnap = await getDocs(teamRef);
        for (const docItem of teamSnap.docs) {
          await deleteDoc(doc(db, 'team', docItem.id));
        }
        for (const member of initialTeam) {
          await setDoc(doc(db, 'team', member.id), member);
        }

        console.log('Database successfully reset to default values.');
      } catch (err) {
        console.error('Error resetting database in Firebase:', err);
      }
    } else {
      localStorage.setItem('kassel_projects', JSON.stringify(initialProjects));
      setProjects(initialProjects);
      localStorage.setItem('kassel_team', JSON.stringify(initialTeam));
      setTeam(initialTeam);
    }
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
            activeTab={adminActiveTab}
            setActiveTab={setAdminActiveTab}
            activeMessage={adminActiveMessage}
            setActiveMessage={setAdminActiveMessage}
          />
        </main>
      )}

      <Footer setCurrentView={handleViewChange} />

      {currentView === 'home' && (
        <QuickInquire addMessage={addMessage} isToastActive={!!activeToast} />
      )}

      {/* Real-time Holographic Toast Alert */}
      {activeToast && (
        <div className="toast-notification glass-card" onClick={() => { 
          handleViewChange('admin'); 
          setAdminActiveTab('inbox');
          const msg = messages.find(m => m.id === activeToast.id);
          if (msg) {
            setAdminActiveMessage(msg);
            markMessageRead(msg.id);
          }
          setActiveToast(null); 
        }}>
          <div className="toast-header" onClick={(e) => e.stopPropagation()}>
            <span className="toast-indicator pulse"></span>
            <span className="toast-title">New Message Received</span>
            <button className="toast-close-btn" onClick={() => setActiveToast(null)}>×</button>
          </div>
          <div className="toast-body">
            <p className="toast-sender"><strong>From:</strong> {activeToast.sender}</p>
            <p className="toast-subject"><strong>Subject:</strong> {activeToast.subject}</p>
            <p className="toast-desc">{activeToast.message.length > 55 ? activeToast.message.substring(0, 52) + '...' : activeToast.message}</p>
          </div>
        </div>
      )}

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

        /* Toast Notification Styling */
        .toast-notification {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 320px;
          padding: 1.25rem;
          border-radius: var(--border-radius);
          box-shadow: 0 10px 40px rgba(0,0,0,0.5), var(--glow-cyan);
          border: 1px solid rgba(6, 182, 212, 0.4);
          z-index: 9999;
          animation: slide-in-toast 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          background: rgba(8, 12, 20, 0.9);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          cursor: pointer;
        }

        @keyframes slide-in-toast {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        .toast-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 0.5rem;
        }

        .toast-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-cyan);
          box-shadow: 0 0 8px var(--accent-cyan);
        }

        .toast-indicator.pulse {
          animation: toast-blink 1.2s infinite;
        }

        @keyframes toast-blink {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .toast-title {
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--accent-cyan);
          flex-grow: 1;
        }

        .toast-close-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 1.2rem;
          cursor: pointer;
          line-height: 1;
          padding: 0 4px;
        }

        .toast-close-btn:hover {
          color: var(--text-primary);
        }

        .toast-body {
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .toast-sender, .toast-subject {
          color: var(--text-primary);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .toast-desc {
          color: var(--text-secondary);
          margin-top: 0.25rem;
          font-size: 0.8rem;
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
