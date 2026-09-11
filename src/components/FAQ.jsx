import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What PLC programming brands do you support in Malaysia?",
    answer: "We specialize in programming, upgrading, and troubleshooting all major PLC brands including Siemens (S7-1200, S7-1500), Allen-Bradley, Omron, and Mitsubishi. We also handle legacy system migrations."
  },
  {
    question: "Do you provide industrial automation services outside of Selangor?",
    answer: "Yes! While headquartered in Ampang, Selangor, Kassel Technology provides nationwide on-site deployment, SCADA integration, and breakdown support across West Malaysia (Penang, Johor, etc.) and East Malaysia (Sabah & Sarawak)."
  },
  {
    question: "What is included in your control panel wiring service?",
    answer: "We provide end-to-end electrical control panel fabrication. This includes electrical CAD schematic design, proper component sizing (breakers, contactors, VFDs), neat industrial wiring, and rigorous Factory Acceptance Testing (FAT) prior to site installation."
  },
  {
    question: "Do you offer 24/7 machine breakdown troubleshooting?",
    answer: "Yes, we understand that factory downtime is incredibly expensive. We offer rapid-response emergency troubleshooting for PLC faults, HMI screen failures, safety interlocks, and inverter/drive issues to get your production line running immediately."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding relative">
      <div className="container-custom relative z-10">
        <div className="faq-header scroll-reveal">
          <span className="cyber-badge mb-4">&gt;&gt; Knowledge Base</span>
          <h2 className="section-title">Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Questions</span></h2>
          <p className="faq-subtitle">
            Common inquiries about our industrial automation, PLC, and engineering services.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="glass-card faq-card scroll-reveal"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button 
                  className="faq-button"
                  onClick={() => toggleFaq(index)}
                >
                  <h3>{faq.question}</h3>
                  <ChevronDown 
                    className={`faq-chevron ${isOpen ? 'open' : ''}`} 
                    size={24}
                  />
                </button>
                <div className={`faq-answer-container ${isOpen ? 'open' : ''}`}>
                  <p className="faq-answer">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
