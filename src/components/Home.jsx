import React from 'react';
import Hero from './Hero';
import About from './About';
import Services from './Services';
import Projects from './Projects';
import FAQ from './FAQ';
import Contact from './Contact';

export default function Home({ team, projects, addMessage }) {
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
