import React from 'react';
import { motion as Motion } from 'framer-motion';

const About = () => {
  return (
    <section className="relative w-full min-h-screen bg-darkBg text-white py-24 sm:py-32 overflow-hidden border-t border-textDark/20">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <Motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-sm font-bold mb-4">Behind The Code</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl uppercase tracking-tight text-metallic">About Me</h2>
        </Motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          {/* Left: Text Content */}
          <Motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
            }}
            className="md:col-span-7 font-sans text-lg md:text-xl text-textMuted leading-relaxed"
          >
            <Motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-6">
              I am a Frontend Developer based in Eldoret, Kenya, specializing in building exceptional digital experiences. I believe that web design should not just be functional, but deeply memorable.
            </Motion.p>
            <Motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mb-6">
              With a Bachelor of Science in Information Technology, I blend technical precision with creative problem-solving. My goal is always the same: bringing complex solutions to life through clean code and intuitive user interfaces.
            </Motion.p>
            <Motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
              When I'm not pushing pixels or wrangling React components, I am constantly exploring new modern frameworks to ensure my tech stack is always on the cutting edge.
            </Motion.p>
          </Motion.div>

          {/* Right: Image */}
          <Motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="md:col-span-5"
          >
            <div className="w-full aspect-[4/5] bg-[#1a1c23] border border-textDark/30 p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2370&auto=format&fit=crop" 
                alt="Workspace" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </Motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
