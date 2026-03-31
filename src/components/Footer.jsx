import React from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaArrowUp } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // <-- 1. Imported Link

const Footer = () => {
  // A smooth scrolling function to instantly take users back to the Hero
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-12 bg-darkBg border-t border-textDark/20 z-20 overflow-hidden">
      
      {/* Background Wireframe Grid */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-white font-display text-2xl font-bold tracking-[0.2em] uppercase">
            Andrew
          </span>
          {/* 🕵️‍♂️ 2. THE HIDDEN ADMIN LINK */}
          <Link 
            to="/admin" 
            className="text-textMuted font-sans text-xs tracking-widest uppercase cursor-default hover:text-textMuted"
          >
            &copy; {new Date().getFullYear()} All Rights Reserved.
          </Link>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-4">
          <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-textDark/30 flex items-center justify-center text-textMuted hover:bg-brandBlue hover:text-white hover:border-brandBlue transition-all duration-300" title="GitHub">
            <FaGithub className="text-sm" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-textDark/30 flex items-center justify-center text-textMuted hover:bg-brandBlue hover:text-white hover:border-brandBlue transition-all duration-300" title="LinkedIn">
            <FaLinkedinIn className="text-sm" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-textDark/30 flex items-center justify-center text-textMuted hover:bg-brandBlue hover:text-white hover:border-brandBlue transition-all duration-300" title="Twitter / X">
            <FaTwitter className="text-sm" />
          </a>
        </div>

        {/* Right: Back to Top Button */}
        <div className="flex items-center">
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-textMuted hover:text-white transition-colors duration-300 font-sans text-xs tracking-[0.2em] uppercase font-bold"
          >
            Back To Top
            <div className="w-10 h-10 rounded-full border border-textDark/30 flex items-center justify-center group-hover:bg-white group-hover:text-darkBg transition-all duration-300">
              <FaArrowUp className="text-sm" />
            </div>
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;