import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase';

const PortfolioPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSingleProject = async () => {
      const { data, error } = await supabase
        .from('Projects_2')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching project:", error);
      } else {
        setProject(data);
      }
      setLoading(false);
    };

    fetchSingleProject();
    window.scrollTo(0, 0); 
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-darkBg flex items-center justify-center text-brandBlue font-display text-2xl uppercase tracking-widest">
        Loading Project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-darkBg flex items-center justify-center text-red-500 font-display text-2xl uppercase tracking-widest flex-col gap-6">
        <p>Project Not Found</p>
        <Link to="/" className="text-white text-sm border-b border-brandBlue hover:text-brandBlue transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-darkBg text-white overflow-hidden pb-24">
      
      {/* Background Grid Lines for Continuity */}
      <div className="fixed inset-0 pointer-events-none flex justify-center max-w-7xl mx-auto w-full z-0">
        <div className="w-1/4 h-full border-x border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
        <div className="w-1/4 h-full border-r border-textDark/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40">
        
        <Link to="/" className="text-textMuted hover:text-white transition-colors text-sm font-sans tracking-widest uppercase mb-10 inline-block">
          &larr; Back to Portfolio
        </Link>

        {/* 1. HEADER */}
        <div className="mb-16">
          <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-sm font-bold mb-4">Featured Case Study</p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-5xl uppercase tracking-tight text-white leading-tight">
            {project.title}
          </h1>
        </div>

        {/* 2. PROJECT META DATA */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-8 md:p-10 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] mb-20 font-sans">
          <div>
            <h4 className="text-textDark text-xs font-bold tracking-widest uppercase mb-2">Role</h4>
            {/* CHANGED: Dynamically loads the role here, falling back to Frontend Developer if none is set */}
            <p className="text-textMuted text-sm">{project.role || 'Frontend Developer'}</p>
          </div>
          
          {project.liveLink && (
            <div>
              <h4 className="text-textDark text-xs font-bold tracking-widest uppercase mb-2">Live Site</h4>
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-brandBlue transition-colors underline underline-offset-4">
                Visit Site ↗
              </a>
            </div>
          )}

          {project.githubLink && (
            <div>
              <h4 className="text-textDark text-xs font-bold tracking-widest uppercase mb-2">Source Code</h4>
              <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-white text-sm hover:text-brandBlue transition-colors underline underline-offset-4">
                View GitHub ↗
              </a>
            </div>
          )}
        </div>

        {/* 3. DYNAMIC TECH STACK PILLS */}
        <div className="mb-20">
          <h3 className="font-sans text-textDark text-sm font-bold tracking-widest uppercase mb-8 text-center md:text-left">Technologies Used</h3>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {project.techStack?.map((tech, index) => (
              <span key={index} className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-textMuted font-sans text-sm uppercase tracking-wider hover:bg-white/20 hover:text-white transition-all cursor-pointer">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 4. THE CHALLENGE & SOLUTION */}
        {(project.problem || project.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mb-24 font-sans bg-[#16181d] p-8 md:p-12 border border-textDark/30 rounded-2xl relative">
            {project.problem && (
              <div>
                <h3 className="text-brandBlue text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brandBlue"></span> The Challenge
                </h3>
                <p className="text-textMuted leading-relaxed text-sm md:text-base whitespace-pre-line">{project.problem}</p>
              </div>
            )}
            {project.solution && (
              <div>
                <h3 className="text-brandBlue text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-brandBlue"></span> The Solution
                </h3>
                <p className="text-textMuted leading-relaxed text-sm md:text-base whitespace-pre-line">{project.solution}</p>
              </div>
            )}
          </div>
        )}

        {/* 5. MAIN HERO IMAGE WITH CAPTION */}
        <div className="flex flex-col gap-10 md:gap-20">
          <div className="w-full aspect-video p-2 md:p-4 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] relative group">
            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-black/40 flex items-center justify-center">
              <img 
                src={project.heroImage} 
                alt={project.title} 
                className="w-full h-full object-contain p-4 opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.02]" 
              />
              
              {/* CAPTION OVERLAY */}
              {project.heroCaption && (
                <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-auto md:max-w-md bg-darkBg/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-xl translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <p className="text-white font-sans text-xs tracking-widest uppercase font-bold">{project.heroCaption}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 6. ADVANCED BENTO BOX GALLERY */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-24">
            <h3 className="font-sans text-textDark text-sm font-bold tracking-widest uppercase mb-10 text-center md:text-left">
              Project Gallery
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item, index) => (
                <div 
                  key={index} 
                  className={`w-full p-2 rounded-3xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl relative group overflow-hidden ${
                    index % 3 === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-video'
                  }`}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden relative bg-black/40 flex items-center justify-center">
                    <img 
                      src={item.url} 
                      alt={`${project.title} showcase ${index + 1}`} 
                      className="w-full h-full object-contain p-4 opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-[1.02]" 
                    />
                    
                    {/* CUSTOM CAPTION OVERLAY */}
                    <div className="absolute inset-0 bg-gradient-to-t from-darkBg/90 via-darkBg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                      <p className="text-white font-sans text-xs tracking-widest uppercase font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {item.caption || `${project.title} — View ${index + 1}`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default PortfolioPage;