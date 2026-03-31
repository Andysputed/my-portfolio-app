import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Services = () => {
  // Deep-dive services data
  const servicesData = [
    {
      title: "Frontend Development",
      description: "I build fast, scalable, and accessible web applications using modern JavaScript frameworks. Every line of code is optimized for performance and maintainability.",
      deliverables: ["React & Next.js Single Page Apps", "Tailwind CSS Architecture", "API Integration & State Management", "Progressive Web Apps (PWA)"],
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2370&auto=format&fit=crop"
    },
    {
      title: "UI/UX & Web Design",
      description: "Design is more than just aesthetics; it's about solving problems. I craft intuitive user interfaces that guide users effortlessly while maintaining a striking visual identity.",
      deliverables: ["Figma Wireframing & Prototyping", "Design System Creation", "User Journey Mapping", "Responsive & Mobile-First Design"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
    },
    {
      title: "Creative Coding & Animation",
      description: "Bring your digital presence to life. I implement complex, buttery-smooth animations that elevate your brand from a standard website to an unforgettable interactive experience.",
      deliverables: ["Framer Motion Scroll Effects", "GSAP Timeline Animations", "Interactive 3D Elements", "Micro-interactions"],
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2370&auto=format&fit=crop"
    }
  ];

  // The Process Steps
  const processSteps = [
    { num: "01", title: "Discovery", desc: "We start by understanding your goals, target audience, and the core problem we need to solve." },
    { num: "02", title: "Strategy", desc: "Wireframing the user journey and establishing the technical stack needed for optimal performance." },
    { num: "03", title: "Execution", desc: "Writing clean, efficient code and crafting pixel-perfect designs with constant feedback loops." },
    { num: "04", title: "Launch", desc: "Rigorous testing, optimization, and final deployment to the live server. Hand-off and training." }
  ];

  return (
    <div className="relative w-full min-h-screen bg-darkBg text-white overflow-hidden pt-24 sm:pt-32 pb-20 sm:pb-24">
      
      {/* Background Grid Lines */}
      <div className="fixed inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 1. PAGE HERO */}
        <Motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 mt-10 md:mt-20"
        >
          <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-sm font-bold mb-6">Expertise</p>
          <h1 className="font-display font-extrabold text-[14vw] sm:text-[12vw] md:text-[8vw] leading-[0.85] uppercase tracking-tight text-white mix-blend-difference">
            What I <br /> <span className="text-metallic">Deliver</span>
          </h1>
        </Motion.div>

        {/* 2. DETAILED SERVICES LIST */}
        <div className="flex flex-col gap-20 sm:gap-32 mb-32 sm:mb-40">
          {servicesData.map((service, index) => (
            <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 !== 0 ? 'lg:rtl' : ''}`}>
              
              {/* Image Column */}
              <Motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`w-full aspect-square md:aspect-video lg:aspect-square bg-[#1a1c23] p-4 border border-textDark/20 shadow-2xl ${index % 2 !== 0 ? 'lg:ltr' : ''}`}
                style={{ direction: 'ltr' }}
              >
                <img src={service.image} alt={service.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </Motion.div>

              {/* Text Column */}
              <Motion.div 
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={`flex flex-col justify-center ${index % 2 !== 0 ? 'lg:ltr' : ''}`}
                style={{ direction: 'ltr' }}
              >
                <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tight mb-8">
                  {service.title}
                </h2>
                <p className="font-sans text-lg text-textMuted leading-relaxed mb-10">
                  {service.description}
                </p>
                
                <h4 className="font-sans text-white text-sm font-bold tracking-widest uppercase mb-6 border-b border-textDark/30 pb-4">
                  Deliverables
                </h4>
                <ul className="flex flex-col gap-4 font-sans text-textMuted">
                  {service.deliverables.map((item, i) => (
                    <li key={i} className="flex items-center gap-4">
                      <span className="w-1.5 h-1.5 bg-brandBlue rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </Motion.div>

            </div>
          ))}
        </div>

        {/* 3. THE PROCESS SECTION */}
        <Motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="border-t border-textDark/30 pt-24 sm:pt-32 mb-24 sm:mb-32"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-20">
            <div className="md:col-span-5">
              <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-sm font-bold mb-4">Methodology</p>
              <h2 className="font-display text-5xl md:text-6xl font-extrabold uppercase tracking-tight">The Process</h2>
            </div>
            <div className="md:col-span-7 flex items-end">
              <p className="font-sans text-lg text-textMuted leading-relaxed">
                A structured approach ensures that every project is delivered on time, within scope, and exceeds expectations. No guesswork, just results.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, idx) => (
              <Motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#16181d] border border-textDark/30 p-8 hover:border-brandBlue transition-colors group cursor-default"
              >
                <div className="font-display text-5xl font-extrabold text-textDark mb-8 group-hover:text-brandBlue transition-colors">
                  {step.num}
                </div>
                <h3 className="font-display text-xl uppercase tracking-wide mb-4 text-white">
                  {step.title}
                </h3>
                <p className="font-sans text-textMuted text-sm leading-relaxed">
                  {step.desc}
                </p>
              </Motion.div>
            ))}
          </div>
        </Motion.div>

        {/* 4. CALL TO ACTION */}
        <Motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-brandBlue text-white p-10 sm:p-12 md:p-20 text-center flex flex-col items-center justify-center relative overflow-hidden"
        >
          {/* Subtle background glow/overlay for the CTA */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tight mb-8 relative z-10">
            Ready to start <br/> your project?
          </h2>
          <Link to="/contact-page" className="relative z-10 bg-white text-black font-display uppercase tracking-widest text-sm py-5 px-10 hover:bg-darkBg hover:text-white transition-colors duration-300">
            Get In Touch
          </Link>
        </Motion.div>

      </div>
    </div>
  );
};

export default Services;
