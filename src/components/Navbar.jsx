import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Motion.nav className="fixed w-full top-0 z-50 bg-darkBg/95 border-b border-textDark/30 backdrop-blur-sm" initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      >
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 md:h-24 flex justify-between items-center relative">
        
        {/* Subtle Vertical Grid Lines */}
        <div className="absolute left-1/4 top-0 h-full border-l border-textDark/20 hidden lg:block"></div>
        <div className="absolute right-1/4 top-0 h-full border-l border-textDark/20 hidden lg:block"></div>

        {/* Left: Logo */}
        <Link to="/" className="text-metallic font-display text-2xl md:text-3xl font-extrabold tracking-[0.2em] uppercase cursor-pointer">
          Andrew
        </Link>

        {/* Middle: Links & Dropdowns */}
        <div className="hidden lg:flex gap-10 items-center text-textMuted text-sm font-sans tracking-widest uppercase relative z-10 h-full">
          
          <Link to="/" className="hover:text-white transition-colors">Home +</Link>

          {/* PORTFOLIO DROPDOWN */}
          <div className="relative group h-full flex items-center cursor-pointer">
            <span className="hover:text-white transition-colors">Portfolio +</span>
            
            {/* Dropdown Menu Box */}
            <div className="absolute top-24 left-0 w-56 bg-[#1a1c23] border border-textDark/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col shadow-2xl">
               <div className="px-6 py-4 text-white font-bold border-b border-textDark/30">
                 PORTFOLIO
               </div>
               <Link to="/portfolio" className="px-6 py-4 hover:bg-white/5 hover:text-white transition-colors">
                Portfolio Page
               </Link>
            </div>
          </div>

          {/* PAGE DROPDOWN */}
          <div className="relative group h-full flex items-center cursor-pointer">
            <span className="hover:text-white transition-colors">Page +</span>
            
            {/* Dropdown Menu Box */}
            <div className="absolute top-24 left-0 w-56 bg-[#1a1c23] border border-textDark/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col shadow-2xl py-2">
               <Link to="/about" className="px-6 py-3 hover:bg-white/5 hover:text-white transition-colors">About</Link>
               <Link to="/services" className="px-6 py-3 hover:bg-white/5 hover:text-white transition-colors">Services</Link>
               <Link to="/faq" className="px-6 py-3 hover:bg-white/5 hover:text-white transition-colors">FAQ</Link>
               <Link to="/pricing" className="px-6 py-3 hover:bg-white/5 hover:text-white transition-colors">Pricing</Link>
               <Link to="/contact-page" className="px-6 py-3 hover:bg-white/5 hover:text-white transition-colors">Contact</Link>

               
            </div>
          </div>

          <Link to="#news" className="hover:text-white transition-colors">News +</Link>
          <Link to="/contact-page" className="hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Mobile: Hamburger */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-textDark/40 text-white hover:border-brandBlue/60 transition-colors"
        >
          <span className="sr-only">Menu</span>
          <div className="flex flex-col gap-1.5">
            <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block h-0.5 w-6 bg-white transition-transform duration-300 ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`}></span>
          </div>
        </button>

        {/* Right: Email */}
        <div className="hidden md:flex items-center gap-3 text-textMuted font-sans hover:text-white cursor-pointer transition-colors relative z-10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <span className="tracking-wider">andrewkirwa320@gmail.com</span>
        </div>

      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <Motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="lg:hidden overflow-hidden border-t border-textDark/30 bg-darkBg/95 backdrop-blur-sm"
          >
            <div className="px-4 sm:px-6 py-6 flex flex-col gap-4 text-textMuted font-sans uppercase tracking-widest text-sm">
              <Link to="/" onClick={closeMenu} className="hover:text-white transition-colors">Home</Link>
              <Link to="/portfolio" onClick={closeMenu} className="hover:text-white transition-colors">Portfolio</Link>
              <Link to="/about" onClick={closeMenu} className="hover:text-white transition-colors">About</Link>
              <Link to="/services" onClick={closeMenu} className="hover:text-white transition-colors">Services</Link>
              <Link to="/faq" onClick={closeMenu} className="hover:text-white transition-colors">FAQ</Link>
              <Link to="/pricing" onClick={closeMenu} className="hover:text-white transition-colors">Pricing</Link>
              <Link to="/contact-page" onClick={closeMenu} className="hover:text-white transition-colors">Contact</Link>
              <Link to="#news" onClick={closeMenu} className="hover:text-white transition-colors">News</Link>
              <div className="pt-4 border-t border-textDark/30 text-xs tracking-wider text-textMuted">
                andrewkirwa320@gmail.com
              </div>
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
	    </Motion.nav>
  );
};

export default Navbar;
