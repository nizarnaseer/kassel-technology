import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Terminal, CornerDownLeft } from 'lucide-react';

export default function QuickInquire({ addMessage, isToastActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0); // 0: Name, 1: Contact, 2: Selection, 3: Message, 4: Completed
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    subject: '',
    message: ''
  });
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([
    { sender: 'bot', text: 'System diagnostics online. Welcome to Kassel Quick Link.' },
    { sender: 'bot', text: 'Please enter your name to initiate session.' }
  ]);

  const logEndRef = useRef(null);

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatLog, isOpen, step]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const cleanVal = inputValue.trim();
    if (!cleanVal) return;

    // Add user message to log
    setChatLog(prev => [...prev, { sender: 'user', text: cleanVal }]);
    setInputValue('');

    if (step === 0) {
      setFormData(prev => ({ ...prev, name: cleanVal }));
      setChatLog(prev => [
        ...prev,
        { sender: 'bot', text: `System acknowledged, operator ${cleanVal}.` },
        { sender: 'bot', text: 'Please enter your phone number or email address.' }
      ]);
      setStep(1);
    } else if (step === 1) {
      setFormData(prev => ({ ...prev, contact: cleanVal }));
      setChatLog(prev => [
        ...prev,
        { sender: 'bot', text: 'Contact channel registered.' },
        { sender: 'bot', text: 'Please select the category that best fits your inquiry below.' }
      ]);
      setStep(2);
    } else if (step === 3) {
      const finalMsg = cleanVal;
      setFormData(prev => ({ ...prev, message: finalMsg }));

      // Complete and submit
      const newInquiry = {
        id: 'msg-' + Date.now(),
        name: formData.name,
        email: formData.contact.includes('@') ? formData.contact : '',
        phone: !formData.contact.includes('@') ? formData.contact : '',
        company: 'Web Quick Link',
        subject: formData.subject || 'Quick Callback Request',
        message: finalMsg,
        date: new Date().toISOString(),
        read: false
      };

      addMessage(newInquiry);

      setChatLog(prev => [
        ...prev,
        { sender: 'bot', text: 'Processing telemetry payload...' },
        { sender: 'bot', text: 'Secure transmission success! Connection established.' },
        { sender: 'bot', text: 'Kassel engineering response team has been paged. We will contact you shortly.' }
      ]);
      setStep(4);
    }
  };

  const handleCategorySelect = (category) => {
    setChatLog(prev => [...prev, { sender: 'user', text: `Selected: ${category}` }]);
    setFormData(prev => ({ ...prev, subject: category }));

    let aiPrompt = '';
    if (category === 'PLC / HMI Troubleshooting') {
      aiPrompt = '[DIAG] PLC Module selected. We support Siemens, Beckhoff, Omron, Mitsubishi, and Allen-Bradley. Please enter your PLC model and describe the error or fault codes.';
    } else if (category === 'SCADA & Data Integration') {
      aiPrompt = '[DIAG] SCADA/Telemetry selected. We specialize in Ignition, WinCC, and Cloud IoT. Please describe your system architecture or data tracking requirements.';
    } else if (category === 'Nationwide Consultation') {
      aiPrompt = '[DIAG] Scoping selected. We cover Selangor, KL, Sabah, Sarawak and nationwide. What is your project location and approximate timeline?';
    } else {
      aiPrompt = '[DIAG] General Inquiry queue. Please detail how our engineering division can assist you.';
    }

    setChatLog(prev => [
      ...prev,
      { sender: 'bot', text: aiPrompt }
    ]);
    setStep(3);
  };

  const handleReset = () => {
    setStep(0);
    setFormData({ name: '', contact: '', subject: '', message: '' });
    setInputValue('');
    setChatLog([
      { sender: 'bot', text: 'Diagnostic link restarted.' },
      { sender: 'bot', text: 'Please enter your name to initiate session.' }
    ]);
  };

  return (
    <div className="quick-inquire-container">
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <button className="chat-bubble-btn glass-card pulse-glow" onClick={() => setIsOpen(true)}>
          <MessageSquare size={22} className="chat-icon" />
          <span className="chat-bubble-badge">Quick Link</span>
        </button>
      )}

      {/* Terminal Chat Window */}
      {isOpen && (
        <div className="terminal-chat-box glass-card animated">
          <div className="terminal-header">
            <div className="terminal-status">
              <span className="status-dot pulsing"></span>
              <Terminal size={14} className="terminal-icon" />
              <span className="terminal-title">Kassel_Auto_Link.sh</span>
            </div>
            <button className="terminal-close-btn" onClick={() => setIsOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="terminal-body">
            <div className="terminal-log">
              {chatLog.map((log, index) => (
                <div key={index} className={`log-entry ${log.sender}`}>
                  {log.sender === 'bot' ? (
                    <span className="bot-prompt">&gt; {log.text}</span>
                  ) : (
                    <span className="user-input-line">operator$ {log.text}</span>
                  )}
                </div>
              ))}

              {step === 2 && (
                <div className="terminal-options">
                  <button type="button" onClick={() => handleCategorySelect('PLC / HMI Troubleshooting')} className="terminal-option-btn">
                    [1] PLC / HMI Troubleshooting
                  </button>
                  <button type="button" onClick={() => handleCategorySelect('SCADA & Data Integration')} className="terminal-option-btn">
                    [2] SCADA & Data Integration
                  </button>
                  <button type="button" onClick={() => handleCategorySelect('Nationwide Consultation')} className="terminal-option-btn">
                    [3] Project Scoping & Consulting
                  </button>
                  <button type="button" onClick={() => handleCategorySelect('General Callback')} className="terminal-option-btn">
                    [4] General Callback Request
                  </button>
                </div>
              )}

              <div ref={logEndRef} />
            </div>

            {step < 4 ? (
              <form onSubmit={handleSend} className="terminal-input-bar">
                <span className="input-indicator">&gt;&gt;</span>
                <input
                  type="text"
                  className="terminal-input"
                  placeholder={
                    step === 0 ? "Enter your name..." : 
                    step === 1 ? "Enter phone / email..." : 
                    step === 2 ? "Click a selection option above..." :
                    "Type description and hit Enter..."
                  }
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={step === 2}
                  autoFocus
                />
                <button type="submit" className="terminal-send-btn" disabled={step === 2}>
                  <CornerDownLeft size={14} />
                </button>
              </form>
            ) : (
              <div className="terminal-reset-footer">
                <button onClick={handleReset} className="btn-terminal-restart">
                  Open New Diagnostic Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .quick-inquire-container {
          position: fixed;
          bottom: ${isToastActive ? '200px' : '30px'};
          right: 30px;
          z-index: 999;
          transition: bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Option selection styles */
        .terminal-options {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          margin-top: 0.65rem;
          margin-bottom: 0.65rem;
          animation: fade-in-options 0.3s ease-out forwards;
        }

        @keyframes fade-in-options {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .terminal-option-btn {
          background: rgba(6, 182, 212, 0.04);
          border: 1px solid rgba(6, 182, 212, 0.2);
          color: var(--accent-cyan);
          font-family: monospace;
          font-size: 0.72rem;
          padding: 0.4rem 0.65rem;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }

        .terminal-option-btn:hover {
          background: rgba(6, 182, 212, 0.15);
          border-color: var(--accent-cyan);
          color: var(--text-primary);
        }

        .chat-bubble-btn {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.85rem 1.25rem;
          border-radius: 30px;
          border: 1px solid rgba(6, 182, 212, 0.3);
          background: rgba(8, 12, 20, 0.85);
          box-shadow: 0 5px 25px rgba(0,0,0,0.4), var(--glow-cyan);
          cursor: pointer;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s;
        }

        .chat-bubble-btn:hover {
          transform: translateY(-3px) scale(1.02);
          border-color: var(--accent-cyan);
        }

        .chat-icon {
          color: var(--accent-cyan);
        }

        .chat-bubble-badge {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-primary);
        }

        /* Pulsing Glow Effect */
        .pulse-glow {
          animation: floating-chatter 3s infinite ease-in-out;
        }

        @keyframes floating-chatter {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        /* Terminal Window styling */
        .terminal-chat-box {
          width: 340px;
          height: 380px;
          border-radius: var(--border-radius);
          border: 1px solid rgba(6, 182, 212, 0.4);
          box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6), var(--glow-cyan);
          background: rgba(4, 6, 10, 0.95);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: scale-up-chat 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes scale-up-chat {
          0% { transform: scale(0.8) translateY(20px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        .terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.65rem 1rem;
          background: rgba(0, 0, 0, 0.5);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .terminal-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-dot {
          width: 6px;
          height: 6px;
          background-color: var(--accent-cyan);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--accent-cyan);
        }

        .status-dot.pulsing {
          animation: status-pulsing 1.2s infinite;
        }

        @keyframes status-pulsing {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .terminal-icon {
          color: var(--text-secondary);
        }

        .terminal-title {
          font-family: monospace;
          font-size: 0.75rem;
          color: var(--text-secondary);
          letter-spacing: 0.02em;
        }

        .terminal-close-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.2s;
        }

        .terminal-close-btn:hover {
          color: var(--text-primary);
        }

        .terminal-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          overflow: hidden;
        }

        .terminal-log {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding-right: 0.25rem;
          font-family: monospace;
          font-size: 0.8rem;
          line-height: 1.4;
          margin-bottom: 1rem;
        }

        /* Scrollbar styles */
        .terminal-log::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-log::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.2);
          border-radius: 2px;
        }

        .log-entry.bot {
          color: var(--accent-cyan);
        }

        .log-entry.user {
          color: var(--text-primary);
          text-align: right;
        }

        .user-input-line {
          display: inline-block;
          background: rgba(255,255,255,0.05);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }

        .terminal-input-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 0.75rem;
        }

        .input-indicator {
          color: var(--accent-cyan);
          font-family: monospace;
          font-weight: 700;
          font-size: 0.85rem;
        }

        .terminal-input {
          flex: 1;
          background: none;
          border: none;
          color: var(--text-primary);
          font-family: monospace;
          font-size: 0.8rem;
          outline: none;
        }

        .terminal-send-btn {
          background: none;
          border: none;
          color: var(--accent-cyan);
          cursor: pointer;
          padding: 2px;
        }

        .terminal-send-btn:hover {
          color: var(--text-primary);
        }

        .terminal-reset-footer {
          border-top: 1px solid rgba(255,255,255,0.05);
          padding-top: 0.75rem;
          display: flex;
          justify-content: center;
        }

        .btn-terminal-restart {
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          color: var(--accent-cyan);
          font-family: monospace;
          font-size: 0.75rem;
          padding: 0.4rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s;
        }

        .btn-terminal-restart:hover {
          background: rgba(6, 182, 212, 0.2);
          border-color: var(--accent-cyan);
        }
      `}</style>
    </div>
  );
}
