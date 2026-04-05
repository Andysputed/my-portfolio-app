import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <section id="page" className="relative w-full py-24 sm:py-32 bg-darkBg overflow-hidden">
      
      {/* Continuing the Background Grid */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        
        {/* Left Side: Rotated Text & Capsule Image */}
        <div className="flex items-center gap-10 md:w-1/2">
          
          {/* Vertical Text */}
          <div className="hidden md:block">
            <h2 className="text-white font-sans text-2xl tracking-widest font-bold whitespace-nowrap -rotate-90 origin-center translate-y-12">
              About DRE LABS
            </h2>
          </div>

          {/* Capsule Image (Matching the screenshot) */}
          <div className="w-full max-w-[350px] aspect-[4/5] rounded-[200px] border border-brandBlue/30 bg-[#1a1c23] p-2 relative shadow-[0_0_50px_rgba(0,96,255,0.1)]">
            <div className="w-full h-full rounded-[200px] overflow-hidden">
              {/* Insert your own image here */}
            </div>
            {/* Top inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/4 bg-brandBlue/20 rounded-full blur-[40px] pointer-events-none"></div>
          </div>
        </div>

        {/* Right Side: Circular Stat & Text */}
        <div className="flex flex-col items-center text-center md:w-1/2 gap-10">
          
          {/* Massive Glowing Circle */}
          <div className="w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-textDark/30 bg-[#16181d] flex items-center justify-center relative shadow-[inset_0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 w-3/4 h-1/4 bg-brandBlue/30 rounded-full blur-[30px] pointer-events-none"></div>
            
            <div className="flex flex-col items-center">
              <span className="text-white font-display text-5xl sm:text-6xl font-bold">2</span>
              <span className="text-textMuted font-sans text-sm tracking-widest uppercase mt-2">
                Years of Experience
              </span>
            </div>
          </div>

          {/* Description Text */}
          <p className="text-textMuted font-sans text-lg max-w-md leading-relaxed">
           I'm a passionate web developer and IT student who enjoys turning ideas into functional digital products. I specialize in building responsive websites and systems using modern tools like React, Node.js, and JavaScript.

Currently focused on improving my skills through real projects, I aim to build software that is efficient, scalable, and impactful.
          </p>

          {/* Read More Button */}
         <Link 
  to="/about" 
          className="text-white font-sans text-sm font-bold tracking-[0.2em] uppercase hover:text-brandBlue transition-colors duration-300 inline-block"
      >
              Read More
        </Link>

        </div>

      </div>
    </section>
  );
};

export default About;
