import React, { useState, useEffect, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaJs, FaReact } from "react-icons/fa";
import { SiFirebase, SiSupabase } from "react-icons/si";

// Keep your AnimatedNumber component exactly the same
const AnimatedNumber = ({ value }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTimestamp = null;
    const duration = 1500;
    const target = parseInt(value);

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (2 - progress) * target)); 
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [isVisible, value]);

  return <span ref={ref}>{count}%</span>;
};

const Skills = () => {
  const skillData = [
    { name: 'HTML', percent: '90', color: '#e34f26', icon: <FaHtml5 className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: 'CSS', percent: '85', color: '#1572B6', icon: <FaCss3Alt className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: 'JAVASCRIPT', percent: '82', color: '#F7DF1E', icon: <FaJs className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: 'REACT', percent: '78', color: '#61DAFB', icon: <FaReact className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: 'FIREBASE', percent: '75', color: '#FFCA28', icon: <SiFirebase className="w-8 h-8 sm:w-10 sm:h-10" /> },
    { name: 'SUPABASE', percent: '72', color: '#3ECF8E', icon: <SiSupabase className="w-8 h-8 sm:w-10 sm:h-10" /> },
  ];

  // Container variants for the stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15 // Time between each pill animating in
      }
    }
  };

  // Individual pill variants
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="relative w-full py-20 bg-darkBg border-t border-textDark/20 z-20">
      
      {/* Background Grid */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      {/* motion.div handles the scroll-triggered stagger */}
      <Motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-wrap justify-center gap-6 md:gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} // Triggers slightly before it fully hits the screen
      >
        
        {skillData.map((skill, index) => (
          <Motion.div key={index} variants={itemVariants} className="flex flex-col items-center gap-6 group">
            
            {/* The Pill Container */}
            <div className="w-[100px] h-[160px] sm:w-[120px] sm:h-[180px] rounded-full border border-textDark/30 bg-[#16181d] flex flex-col items-center justify-center gap-4 relative overflow-hidden transition-all duration-500 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] group-hover:border-brandBlue/50 group-hover:shadow-[inset_0_20px_40px_rgba(0,96,255,0.15)] perspective-1000">
              
              {/* Top glowing orb effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-brandBlue/20 rounded-full blur-xl transition-opacity duration-500 opacity-50 group-hover:opacity-100"></div>

              {/* The Rotating Icon Container */}
              <div 
                className="w-14 h-14 flex items-center justify-center z-10 transition-all duration-[800ms] transform-style-3d group-hover:[transform:rotateY(360deg)]"
              >
                <div 
                  className="text-textMuted transition-colors duration-[400ms] delay-100 flex items-center justify-center"
                  style={{ transitionProperty: 'color' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = skill.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  {skill.icon}
                </div>
              </div>

              {/* Animated Percentage */}
              <span className="text-white font-display text-xl font-bold z-10">
                <AnimatedNumber value={skill.percent} />
              </span>
            </div>

            {/* Label Below the Pill */}
            <span className="text-textMuted text-xs font-sans tracking-widest uppercase">
              {skill.name}
            </span>
            
          </Motion.div>
        ))}

      </Motion.div>
    </section>
  );
};

export default Skills;
