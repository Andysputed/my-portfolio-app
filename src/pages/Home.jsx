import React from 'react';
import Hero from '../components/HeroSection';
import Skills from '../components/SkillsSection';
import About from '../components/AboutSection';
import Portfolio from '../components/PortfolioSection';
import Contact from '../pages/ContactPage';
import Footer from '../components/Footer';
const Home = () => {
  return (
    <main>
      <Hero/>
      <Skills />
      <About/>
      <Portfolio/>
      <Contact />
      <Footer/>
    </main>
  );
};

export default Home;