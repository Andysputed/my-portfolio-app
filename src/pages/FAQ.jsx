import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  // State to track which accordion item is currently open
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    // If clicking the already open one, close it. Otherwise, open the new one.
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Standard premium agency questions
  const faqs = [
    {
      question: "What is your typical project timeline?",
      answer: "Depending on the scope and complexity, a standard website takes about 4 to 6 weeks from initial wireframes to final deployment. More complex web applications or custom platforms can take 2 to 3 months."
    },
    {
      question: "Do you only do frontend development?",
      answer: "While frontend and UI/UX are my core specializations (React, Tailwind, Next.js), I frequently build full-stack solutions by integrating powerful backend-as-a-service platforms like Firebase and Supabase."
    },
    {
      question: "How do you handle project pricing?",
      answer: "I work on a flat, per-project rate rather than billing hourly. This ensures you know exactly what you are paying upfront with no surprise fees. After our initial discovery call, I will provide a detailed proposal with tiered options."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely. I work with clients all over the world. We can easily coordinate across different time zones using asynchronous tools like Slack, Notion, and scheduled Zoom calls to keep the project moving smoothly."
    }
  ];

  return (
    <section className="relative w-full min-h-screen py-24 sm:py-32 bg-darkBg text-white overflow-hidden border-t border-textDark/20">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <Motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20 text-center"
        >
          <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-sm font-bold mb-4">The Details</p>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-metallic">
            Common Questions
          </h2>
        </Motion.div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col border-t border-textDark/30">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <Motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-b border-textDark/30"
              >
                {/* Accordion Header (Clickable) */}
                <button 
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="w-full py-8 flex justify-between items-center text-left group focus:outline-none"
                >
                  <span className={`font-display text-lg sm:text-xl md:text-2xl uppercase tracking-wide transition-colors duration-300 ${isOpen ? 'text-brandBlue' : 'text-white group-hover:text-textMuted'}`}>
                    {faq.question}
                  </span>
                  
                  {/* Plus/Minus Icon */}
                  <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0 ml-4">
                    <span className="absolute w-full h-[2px] bg-white transition-colors group-hover:bg-brandBlue"></span>
                    <span className={`absolute w-full h-[2px] bg-white transition-all duration-300 group-hover:bg-brandBlue ${isOpen ? 'rotate-0' : 'rotate-90'}`}></span>
                  </div>
                </button>

                {/* Accordion Body (Animated) */}
                <AnimatePresence>
                  {isOpen && (
                    <Motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-8 font-sans text-base sm:text-lg text-textMuted leading-relaxed pr-4 sm:pr-8">
                        {faq.answer}
                      </p>
                    </Motion.div>
                  )}
                </AnimatePresence>

              </Motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
