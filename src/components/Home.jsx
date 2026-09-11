import React, { useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import FAQ from './FAQ';
import Contact from './Contact';

export default function Home({ team, projects, addMessage }) {
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
  }, []);

  return (
    <>
      <div className="scroll-reveal"><Hero /></div>
      <div className="scroll-reveal"><About team={team} /></div>
      <div className="scroll-reveal"><Services /></div>
      <div className="scroll-reveal"><Projects projects={projects} /></div>
      <div className="scroll-reveal"><FAQ /></div>
      <div className="scroll-reveal"><Contact addMessage={addMessage} /></div>
    </>
  );
}
