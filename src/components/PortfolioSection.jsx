import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { supabase } from '../supabase';

const PortfolioSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('Projects_2')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <section className="relative w-full py-32 bg-darkBg z-20 overflow-hidden border-t border-textDark/20">
      
      {/* Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-20 text-center">
          <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-sm font-bold mb-4">Selected Works</p>
          <h2 className="font-display font-extrabold text-5xl md:text-6xl uppercase tracking-tight text-metallic">
            Portfolio
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-brandBlue font-display text-xl uppercase tracking-widest animate-pulse">
            Loading Projects...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group relative bg-[#16181d] border border-textDark/30 hover:border-brandBlue/50 transition-colors duration-500 flex flex-col h-full"
              >
                {/* Project Image wrapped in a Link - ADDED bg-black/40 and flex centering */}
                <Link to={`/portfolio/${project.id}`} className="block w-full aspect-video overflow-hidden border-b border-textDark/30 cursor-pointer bg-black/40 flex items-center justify-center">
                  {/* CHANGED to object-contain and added p-4 */}
                  <img 
                    src={project.heroImage} 
                    alt={project.title} 
                    className="w-full h-full object-contain p-4 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                </Link>

                {/* Project Info */}
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex-grow">
                    <p className="text-brandBlue font-sans text-xs font-bold tracking-widest uppercase mb-2">
                      {project.techStack?.slice(0, 2).join(' + ')}
                    </p>
                    <Link to={`/portfolio/${project.id}`}>
                      <h3 className="text-white font-display text-2xl uppercase tracking-wide mb-6 group-hover:text-brandBlue transition-colors cursor-pointer">
                        {project.title}
                      </h3>
                    </Link>
                  </div>

                  {/* Action Buttons (CONDITIONALLY RENDERED) */}
                  {(project.githubLink || project.liveLink) && (
                    <div className="flex gap-4 pt-6 border-t border-textDark/30">
                      
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-darkBg transition-colors duration-300"
                          title="View Source Code"
                          aria-label="View Source Code"
                        >
                          <FaGithub className="text-lg sm:text-xl" />
                        </a>
                      )}

                      {project.liveLink && (
                        <a 
                          href={project.liveLink} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brandBlue flex items-center justify-center text-white hover:bg-blue-600 transition-colors duration-300"
                          title="View Live Site"
                          aria-label="View Live Site"
                        >
                          <FaExternalLinkAlt className="text-base sm:text-lg" />
                        </a>
                      )}

                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

        {/* 'View All' Button at the bottom */}
        <div className="mt-16 flex justify-center">
          <a href="#" className="text-white font-sans text-sm font-bold tracking-[0.2em] uppercase border-b border-brandBlue pb-1 hover:text-brandBlue transition-colors duration-300">
            Explore All Projects
          </a>
        </div>

      </div>
    </section>
  );
};

export default PortfolioSection;