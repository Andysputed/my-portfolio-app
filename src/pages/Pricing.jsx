import React from 'react';
import { motion as Motion } from 'framer-motion';

const Pricing = () => {
  const plans = [
    {
      name: "Landing Page",
      price: "$900",
      description: "Perfect for a quick online presence or product launch.",
      features: ["Single Page Website", "Responsive Mobile Design", "Basic SEO Setup", "Contact Form Integration", "1 Week Delivery"],
      isPopular: false
    },
    {
      name: "Full Website",
      price: "$2,500",
      description: "A complete, multi-page experience for growing businesses.",
      features: ["Up to 5 Pages", "Custom UI/UX Design", "Framer Motion Animations", "Advanced SEO & Analytics", "3 Weeks Delivery"],
      isPopular: true
    },
    {
      name: "Web Application",
      price: "Custom",
      description: "Complex, data-driven platforms built from the ground up.",
      features: ["React / Next.js Framework", "Firebase / Supabase Backend", "User Authentication", "Custom Dashboard", "Ongoing Maintenance"],
      isPopular: false
    }
  ];

  // SVG Checkmark for the feature list
  const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-brandBlue flex-shrink-0">
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
    </svg>
  );

  return (
    <section className="relative w-full min-h-screen py-24 sm:py-32 bg-darkBg text-white overflow-hidden border-t border-textDark/20 z-20">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <Motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-sm font-bold mb-4">Investment</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-metallic">
            Pricing Plans
          </h2>
        </Motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              className={`relative flex flex-col p-8 md:p-10 bg-[#16181d] border transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,96,255,0.1)] group ${
                plan.isPopular 
                  ? 'border-brandBlue/50 lg:scale-105 shadow-[0_0_30px_rgba(0,96,255,0.05)] z-10' 
                  : 'border-textDark/30 hover:border-textMuted/50 z-0'
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brandBlue text-white font-sans text-xs font-bold tracking-widest uppercase py-2 px-6 rounded-full">
                  Most Popular
                </div>
              )}

              <h3 className="font-display text-2xl tracking-wide uppercase mb-2">{plan.name}</h3>
              <p className="text-textMuted font-sans text-sm h-10 mb-8">{plan.description}</p>
              
              <div className="font-display text-5xl font-extrabold text-white mb-10 group-hover:text-brandBlue transition-colors duration-300">
                {plan.price}
              </div>

              <ul className="flex flex-col gap-4 font-sans text-textMuted flex-grow mb-12">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckIcon />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 font-display uppercase tracking-widest text-sm transition-all duration-300 ${
                plan.isPopular 
                  ? 'bg-brandBlue text-white hover:bg-white hover:text-black' 
                  : 'bg-transparent border border-textDark/50 text-white hover:border-white hover:bg-white hover:text-black'
              }`}>
                Start Project
              </button>
            </Motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;
