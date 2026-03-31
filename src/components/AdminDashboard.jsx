import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../supabase';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [existingHero, setExistingHero] = useState(null);

  // ADDED: 'role' to the initial state
  const [projectData, setProjectData] = useState({ 
    title: '', role: '', tech: '', liveLink: '', githubLink: '',
    problem: '', solution: '', heroCaption: ''
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      if (session?.user) fetchProjects();
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
      if (session?.user) fetchProjects();
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('Projects_2')
      .select('*')
      .order('id', { ascending: false });
    if (!error) setProjects(data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
  };

  const handleLogout = async () => await supabase.auth.signOut();

  const handleChange = (e) => setProjectData({ ...projectData, [e.target.name]: e.target.value });
  const handleHeroImageChange = (e) => { if (e.target.files[0]) setImageFile(e.target.files[0]); };

  const handleGalleryAdd = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file), 
        caption: '',
        url: null 
      }));
      setGalleryItems((prev) => [...prev, ...newFiles]);
    }
  };

  const handleGalleryImageReplace = (index, e) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      const updated = [...galleryItems];
      updated[index].file = newFile;
      updated[index].preview = URL.createObjectURL(newFile); 
      setGalleryItems(updated);
    }
  };

  const handleCaptionChange = (index, value) => {
    const updated = [...galleryItems];
    updated[index].caption = value;
    setGalleryItems(updated);
  };

  const handleRemoveGalleryItem = (index) => {
    const updated = [...galleryItems];
    updated.splice(index, 1);
    setGalleryItems(updated);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to completely delete this project?")) return;
    const { error } = await supabase.from('Projects_2').delete().eq('id', id);
    if (!error) fetchProjects();
  };

  const handleEditClick = (project) => {
    setEditingId(project.id);
    setProjectData({
      title: project.title,
      role: project.role || '', // ADDED: Load role for editing
      tech: project.techStack?.join(', ') || '',
      liveLink: project.liveLink || '',
      githubLink: project.githubLink || '',
      problem: project.problem || '',
      solution: project.solution || '',
      heroCaption: project.heroCaption || ''
    });
    setExistingHero(project.heroImage);
    setGalleryItems(project.gallery || []);
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setProjectData({ title: '', role: '', tech: '', liveLink: '', githubLink: '', problem: '', solution: '', heroCaption: '' });
    setExistingHero(null);
    setImageFile(null);
    setGalleryItems([]);
    document.getElementById('hero-upload').value = "";
    document.getElementById('gallery-upload').value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!editingId && !imageFile) return alert("Please select a Hero image!");
    setIsSubmitting(true);

    try {
      let heroUrl = existingHero;

      if (imageFile) {
        const heroExt = imageFile.name.split('.').pop();
        const heroName = `hero-${Date.now()}.${heroExt}`;
        const { error: heroUploadError } = await supabase.storage.from('portfolio-images').upload(heroName, imageFile);
        if (heroUploadError) throw heroUploadError;
        const { data } = supabase.storage.from('portfolio-images').getPublicUrl(heroName);
        heroUrl = data.publicUrl;
      }

      const finalGallery = [];
      for (const item of galleryItems) {
        if (item.file) {
          const fileExt = item.file.name.split('.').pop();
          const fileName = `gallery-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
          const { error } = await supabase.storage.from('portfolio-images').upload(fileName, item.file);
          if (!error) {
            const { data } = supabase.storage.from('portfolio-images').getPublicUrl(fileName);
            finalGallery.push({ url: data.publicUrl, caption: item.caption });
          }
        } else if (item.url) {
          finalGallery.push({ url: item.url, caption: item.caption });
        }
      }

      const techArray = projectData.tech.split(',').map(item => item.trim());

      const payload = {
        title: projectData.title,
        role: projectData.role || 'Frontend Developer', // ADDED: Save role
        techStack: techArray,
        liveLink: projectData.liveLink,
        githubLink: projectData.githubLink,
        problem: projectData.problem,
        solution: projectData.solution,
        heroCaption: projectData.heroCaption,
        heroImage: heroUrl,
        gallery: finalGallery 
      };

      let dbError;
      if (editingId) {
        const { error } = await supabase.from('Projects_2').update(payload).eq('id', editingId);
        dbError = error;
      } else {
        const { error } = await supabase.from('Projects_2').insert([payload]);
        dbError = error;
      }

      if (dbError) throw dbError;

      alert(editingId ? "Project successfully updated!" : "Project successfully added!");
      cancelEdit();
      fetchProjects(); 

    } catch (error) {
      console.error("Error saving project:", error);
      alert(error.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-darkBg flex items-center justify-center px-6">
        <div className="bg-[#16181d] p-10 border border-textDark/30 shadow-2xl w-full max-w-md">
          <h2 className="font-display text-3xl text-white uppercase tracking-widest mb-8 text-center">Admin Access</h2>
          {authError && <p className="text-red-500 text-sm mb-4 text-center">{authError}</p>}
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-transparent border-b border-textDark/50 py-3 text-white focus:border-brandBlue outline-none transition-colors" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-transparent border-b border-textDark/50 py-3 text-white focus:border-brandBlue outline-none transition-colors" required />
            <button type="submit" className="bg-brandBlue text-white font-sans uppercase tracking-widest text-sm py-4 mt-4 hover:bg-white hover:text-black transition-colors">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full min-h-screen pt-32 pb-20 bg-darkBg text-white overflow-hidden z-20">
      <div className="relative z-10 max-w-4xl mx-auto px-6 mt-10">
        
        <div className="flex justify-between items-end mb-12 border-b border-textDark/30 pb-6">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-sans text-brandBlue tracking-[0.3em] uppercase text-xs font-bold mb-2">Secure Portal</p>
            <h2 className="font-display font-extrabold text-4xl uppercase tracking-tight text-metallic">Dashboard</h2>
          </motion.div>
          <button onClick={handleLogout} className="text-textMuted text-sm uppercase tracking-widest hover:text-white transition-colors">Logout ↗</button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#16181d] p-8 md:p-12 border border-textDark/30 shadow-2xl mb-20 relative">
          
          {editingId && (
             <div className="absolute top-0 left-0 w-full bg-brandBlue text-white text-center py-2 text-xs uppercase tracking-widest font-bold">
               Editing Project Mode
             </div>
          )}

          <form onSubmit={handleSubmit} className={`flex flex-col gap-8 font-sans ${editingId ? 'mt-6' : ''}`}>
            {/* CHANGED: Made this a 3-column grid to comfortably fit the Role input */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-textMuted text-xs tracking-widest uppercase">Project Title</label>
                <input type="text" name="title" value={projectData.title} onChange={handleChange} placeholder="e.g. Fintech App" className="bg-transparent border-b border-textDark/50 py-2 text-white focus:outline-none focus:border-brandBlue transition-colors" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-textMuted text-xs tracking-widest uppercase">Your Role</label>
                <input type="text" name="role" value={projectData.role} onChange={handleChange} placeholder="e.g. Frontend Developer" className="bg-transparent border-b border-textDark/50 py-2 text-white focus:outline-none focus:border-brandBlue transition-colors" required />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-textMuted text-xs tracking-widest uppercase">Tech Stack</label>
                <input type="text" name="tech" value={projectData.tech} onChange={handleChange} placeholder="React, Tailwind" className="bg-transparent border-b border-textDark/50 py-2 text-white focus:outline-none focus:border-brandBlue transition-colors" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-textMuted text-xs tracking-widest uppercase">Live Site URL (Optional)</label>
                <input type="url" name="liveLink" value={projectData.liveLink} onChange={handleChange} placeholder="https://..." className="bg-transparent border-b border-textDark/50 py-2 text-white focus:outline-none focus:border-brandBlue transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-textMuted text-xs tracking-widest uppercase">GitHub URL (Optional)</label>
                <input type="url" name="githubLink" value={projectData.githubLink} onChange={handleChange} placeholder="https://github.com/..." className="bg-transparent border-b border-textDark/50 py-2 text-white focus:outline-none focus:border-brandBlue transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label className="text-brandBlue text-xs font-bold tracking-widest uppercase">The Challenge / Problem (Optional)</label>
              <textarea name="problem" value={projectData.problem} onChange={handleChange} rows="3" placeholder="What problem were you trying to solve?" className="bg-darkBg/50 border border-textDark/50 p-4 text-white focus:outline-none focus:border-brandBlue transition-colors rounded-lg resize-none" />
            </div>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-brandBlue text-xs font-bold tracking-widest uppercase">The Solution / Process (Optional)</label>
              <textarea name="solution" value={projectData.solution} onChange={handleChange} rows="4" placeholder="How did you solve it?" className="bg-darkBg/50 border border-textDark/50 p-4 text-white focus:outline-none focus:border-brandBlue transition-colors rounded-lg resize-none" />
            </div>

            {/* HERO IMAGE */}
            <div className="flex flex-col gap-2 p-6 border border-dashed border-textDark/50 bg-darkBg/50 text-center">
              <label className="text-brandBlue text-xs font-bold tracking-widest uppercase mb-2">1. Main Hero Image</label>
              {editingId && <span className="text-[10px] text-textMuted mb-2 uppercase">Leave blank to keep existing image</span>}
              <input type="file" id="hero-upload" accept="image/*" onChange={handleHeroImageChange} className="text-xs text-textMuted mx-auto" />
              <input type="text" name="heroCaption" value={projectData.heroCaption} onChange={handleChange} placeholder="Image Caption (e.g. Dashboard View)" className="bg-transparent border-b border-textDark/50 py-2 text-white text-xs text-center focus:outline-none focus:border-brandBlue mt-4" />
            </div>

            {/* ADVANCED GALLERY MANAGER */}
            <div className="flex flex-col gap-4 p-6 border border-dashed border-textDark/50 bg-darkBg/50">
              <div className="text-center">
                <label className="text-brandBlue text-xs font-bold tracking-widest uppercase mb-2 block">2. Gallery Images & Captions</label>
                <span className="text-textMuted text-[10px] mb-4 uppercase tracking-widest block">Select multiple images, then add captions below</span>
                <input type="file" id="gallery-upload" multiple accept="image/*" onChange={handleGalleryAdd} className="text-xs text-textMuted mx-auto" />
              </div>

              {galleryItems.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 border-t border-textDark/30 pt-6">
                  {galleryItems.map((item, index) => (
                    <div key={index} className="flex flex-col gap-3 bg-[#1a1c23] p-4 rounded-lg border border-textDark/30 relative">
                      
                      <img src={item.preview || item.url} alt={`Gallery item ${index}`} className="w-full h-32 object-cover rounded-md border border-textDark/50" />
                      
                      <input 
                        type="text" 
                        placeholder="Type image caption here..." 
                        value={item.caption || ''} 
                        onChange={(e) => handleCaptionChange(index, e.target.value)} 
                        className="bg-transparent border-b border-textDark/50 py-2 text-white text-xs focus:outline-none focus:border-brandBlue transition-colors" 
                      />
                      
                      <div className="flex justify-between items-center mt-2">
                        
                        <label className="text-brandBlue hover:text-white text-xs uppercase tracking-widest font-bold transition-colors cursor-pointer">
                          Swap Image
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={(e) => handleGalleryImageReplace(index, e)} 
                          />
                        </label>

                        <button type="button" onClick={() => handleRemoveGalleryItem(index)} className="text-red-500 hover:text-red-400 text-xs uppercase tracking-widest font-bold transition-colors">
                          Remove
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-4">
              <button type="submit" disabled={isSubmitting} className="flex-1 bg-brandBlue text-white font-display uppercase tracking-widest text-sm py-4 px-8 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Saving Data...' : (editingId ? 'Update Project' : 'Publish Project')}
              </button>
              {editingId && (
                <button type="button" onClick={cancelEdit} className="flex-1 border border-textDark/50 text-textMuted font-display uppercase tracking-widest text-sm py-4 px-8 hover:bg-red-500/20 hover:text-red-500 hover:border-red-500 transition-all duration-300">
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Existing Projects List */}
        <div className="mt-20">
          <h3 className="font-display text-2xl uppercase tracking-widest text-white mb-8 border-b border-textDark/30 pb-4">Manage Projects</h3>
          <div className="flex flex-col gap-4">
            {projects.length === 0 ? (
              <p className="text-textMuted font-sans text-sm">No projects found. Add one above!</p>
            ) : (
              projects.map((proj) => (
                <div key={proj.id} className="bg-[#16181d] border border-textDark/30 p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-6 hover:border-brandBlue/50 transition-colors">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                    <img src={proj.heroImage} alt={proj.title} className="w-24 h-16 object-cover rounded border border-textDark/30" />
                    <div>
                      <h4 className="font-display text-xl uppercase tracking-wider text-white">{proj.title}</h4>
                      {/* Displays Role alongside Tech Stack inside the list preview! */}
                      <p className="font-sans text-xs text-textMuted uppercase tracking-widest">{proj.role || 'Frontend'} • {proj.techStack?.slice(0, 2).join(', ')}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    <button onClick={() => handleEditClick(proj)} className="flex-1 md:flex-none border border-textDark/50 text-white font-sans text-xs uppercase tracking-widest px-6 py-3 hover:bg-brandBlue hover:border-brandBlue transition-colors">Edit</button>
                    <button onClick={() => handleDelete(proj.id)} className="flex-1 md:flex-none bg-red-500/10 border border-red-500/50 text-red-500 font-sans text-xs uppercase tracking-widest px-6 py-3 hover:bg-red-500 hover:text-white transition-colors">Delete</button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AdminDashboard;