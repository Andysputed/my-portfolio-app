import React from 'react';
import { motion as Motion } from 'framer-motion';

const Hero = () => {
  // Define subtle animation variants for reusability
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }
  };

  return (
    <section className="relative w-full min-h-screen pt-20 sm:pt-24 pb-10 sm:pb-12 flex items-center justify-center overflow-hidden bg-darkBg">
      
      {/* Subtle Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full relative z-10 mt-10 sm:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          
          {/* Left Column: Stats */}
          <Motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.2 } }
            }}
            className="flex flex-col gap-16 text-center md:text-right font-sans relative z-30"
          >
            <Motion.div variants={fadeUpVariant}>
              <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-2">Expertise</h3>
              <p className="text-textMuted">UI UX , Web Development & Web Design</p>
            </Motion.div>
            <Motion.div variants={fadeUpVariant}>
              <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-2">Date of Birth</h3>
              <p className="text-textMuted">8 September, 2003</p>
            </Motion.div>
            <Motion.div variants={fadeUpVariant}>
              <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-2">Best Skill</h3>
              <p className="text-textMuted">Problem Solving(Bringing Solutions into Life)</p>
            </Motion.div>
          </Motion.div>

          {/* Center Column: Portrait Image */}
          <Motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="relative flex justify-center"
          >
            {/* The Capsule Shape Container */}
            <div className="w-full max-w-[320px] aspect-[1/1.5] rounded-[160px] bg-[#1a1c23] border-t border-textDark/30 overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.5)] z-10">
              <img 
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop" 
                alt="Portrait" 
                fetchPriority='high'
                className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              />
            </div>
          </Motion.div>

          {/* Right Column: Stats */}
          <Motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.6 } }
            }}
            className="flex flex-col gap-16 text-center md:text-left font-sans relative z-30"
          >
            <Motion.div variants={fadeUpVariant}>
              <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-2">Born In</h3>
              <p className="text-textMuted">Eldoret, Kenya</p>
            </Motion.div>
            <Motion.div variants={fadeUpVariant}>
              <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-2">Education</h3>
              <p className="text-textMuted">Bachelors of Science & Information Technology</p>
            </Motion.div>
            <Motion.div variants={fadeUpVariant}>
              <h3 className="text-white text-lg font-bold tracking-widest uppercase mb-2">Specialization</h3>
              <p className="text-textMuted">Frontend Developer</p>
            </Motion.div>
          </Motion.div>
        </div>

        {/* The Massive Overlay Text */}
        <Motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 1 }}
          className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 text-[clamp(4rem,11vw,11rem)] font-display font-extrabold text-metallic z-20 pointer-events-none uppercase tracking-normal text-center w-full leading-none"
        >
          DRE LABS
        </Motion.h1>

      </div>
    </section>
  );
};

export default Hero;
