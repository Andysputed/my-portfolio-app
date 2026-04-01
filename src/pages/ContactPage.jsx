import React from 'react';
import { motion  } from 'framer-motion';
// Optional: If you want icons, you can import them from react-icons
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Contact = () => {
  const socials = [
    { icon: <FaGithub size={20} />, link: "https://github.com/Andysputed" },
    { icon: <FaLinkedin size={20} />, link: "#" },
    { icon: <FaTwitter size={20} />, link: "#" },
  ];

  return (
    <section className="relative w-full min-h-screen pt-24 sm:pt-32 pb-20 bg-darkBg text-white overflow-hidden z-20">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 overflow-hidden items-center">
          
          {/* LEFT: Contact Info (Slides in from LEFT) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-sm font-bold mb-4">Get In Touch</p>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-7xl lg:text-6xl uppercase tracking-tight text-metallic mb-10 leading-none">
              Let's Talk <br/> Project.
            </h2>
            
            <div className="flex flex-col gap-10 font-sans mb-12">
              <div className="group cursor-pointer w-fit">
                <h4 className="text-textDark text-xs font-bold tracking-widest uppercase mb-2 group-hover:text-brandBlue transition-colors">Email</h4>
                <a href="mailto:andrewkirwa320@gmail.com" className="text-xl md:text-2xl text-white transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-brandBlue after:transition-all after:duration-300 group-hover:after:w-full">
                  andrewkirwa320@gmail.com
                </a>
              </div>
              <div className="group cursor-pointer w-fit">
                <h4 className="text-textDark text-xs font-bold tracking-widest uppercase mb-2 group-hover:text-brandBlue transition-colors">Phone</h4>
                <a href="tel:+254728704287" className="text-xl md:text-2xl text-white transition-colors relative after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-0 after:h-[2px] after:bg-brandBlue after:transition-all after:duration-300 group-hover:after:w-full">
                  +254 728 704 287
                </a>
              </div>
              <div>
                <h4 className="text-textDark text-xs font-bold tracking-widest uppercase mb-2">Location</h4>
                <p className="text-xl md:text-2xl text-textMuted">Eldoret, Kenya</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-6">
              {socials.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.link} 
                  className="w-12 h-12 rounded-full border border-textDark/30 flex items-center justify-center text-textMuted hover:text-white hover:border-brandBlue hover:bg-brandBlue/10 transition-all duration-300 hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Form (Slides in from RIGHT) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="bg-[#16181d] p-10 md:p-14 border border-textDark/30 relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
          >
            {/* Corner Accents for a tech/architectural feel */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-brandBlue/50 transition-colors duration-500 group-hover:border-brandBlue"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-brandBlue/50 transition-colors duration-500 group-hover:border-brandBlue"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-brandBlue/50 transition-colors duration-500 group-hover:border-brandBlue"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-brandBlue/50 transition-colors duration-500 group-hover:border-brandBlue"></div>

            <form className="flex flex-col gap-10 font-sans">
              <div className="relative group/input">
                <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-textDark/50 py-3 text-white focus:outline-none focus:border-brandBlue transition-colors placeholder:text-textDark peer" required />
              </div>
              <div className="relative group/input">
                <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-textDark/50 py-3 text-white focus:outline-none focus:border-brandBlue transition-colors placeholder:text-textDark peer" required />
              </div>
              <div className="relative group/input">
                <textarea rows="4" placeholder="Tell me about your project..." className="w-full bg-transparent border-b border-textDark/50 py-3 text-white focus:outline-none focus:border-brandBlue transition-colors placeholder:text-textDark resize-none peer" required></textarea>
              </div>
              <button type="submit" className="relative overflow-hidden bg-white text-black font-display uppercase tracking-widest text-sm py-4 px-8 transition-all duration-300 w-fit hover:text-white group/btn">
                <span className="relative z-10">Send Message</span>
                {/* Button Fill Animation */}
                <div className="absolute inset-0 bg-brandBlue translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
