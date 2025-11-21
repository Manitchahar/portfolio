
import React, { useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight, X } from 'lucide-react';
import { useViewMode } from './ViewModeContext';

interface Props {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<Props> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isRecruiterMode } = useViewMode();
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isRecruiterMode || isModalOpen) return;
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / 25) * -1; 
      const rotateY = (x - centerX) / 25;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || isRecruiterMode) return;
    const card = cardRef.current;
    
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        ref={cardRef}
        onClick={openModal}
        className={`project-card-anim group relative rounded-[2.5rem] cursor-pointer transition-all duration-500 ease-out opacity-0 select-none focus-within:ring-2 focus-within:ring-lime-400 ${isRecruiterMode ? 'hover:-translate-y-2' : ''}`}
        style={{ transformStyle: isRecruiterMode ? 'flat' : 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        role="article"
        aria-label={`View details for ${project.title}`}
      >
        {/* Spotlight Glow Layer (Disabled in Recruiter Mode) */}
        {!isRecruiterMode && (
          <div 
            className="absolute inset-0 rounded-[2.5rem] z-[-1] transition-opacity duration-500 opacity-0 group-hover:opacity-100 motion-reduce:hidden"
            style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(163, 230, 53, 0.6), transparent 40%)`
            }}
          />
        )}

        {/* Inner Card Background */}
        <div className={`relative h-full bg-[#151518] rounded-[2.5rem] p-[1px] overflow-hidden border ${isRecruiterMode ? 'border-white/10 hover:border-white/30' : 'border-white/5'}`}>
            
            {/* Inner Spotlight (Disabled in Recruiter Mode) */}
            {!isRecruiterMode && (
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100 motion-reduce:hidden"
                style={{
                    background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.06), transparent 40%)`
                }}
              />
            )}

            {/* Image Container */}
            <div className="h-64 overflow-hidden m-2 rounded-[2rem] relative translate-z-10" style={{ transform: isRecruiterMode ? 'none' : 'translateZ(20px)' }}>
              <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:opacity-0" />
              <img 
                src={project.image} 
                alt=""
                loading="lazy"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105"
              />
              <div className={`absolute top-4 right-4 z-20 p-3 rounded-full transition-opacity shadow-lg border ${isRecruiterMode ? 'bg-white text-black opacity-100' : 'bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 border-white/20'}`}>
                 <ArrowUpRight className={isRecruiterMode ? "text-black" : "text-white"} size={24} />
              </div>
            </div>

            {/* Content */}
            <div className="p-8 translate-z-20" style={{ transform: isRecruiterMode ? 'none' : 'translateZ(30px)' }}>
              <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${isRecruiterMode ? 'bg-white/10 border-white/20 text-white shadow-none' : 'border-white/10 text-lime-300 bg-lime-400/5 shadow-[0_0_10px_rgba(163,230,53,0.2)]'}`}>
                      {project.category}
                  </span>
              </div>
              
              <h3 className={`text-3xl font-medium text-white mb-3 leading-tight transition-colors ${isRecruiterMode ? 'group-hover:text-white' : 'group-hover:text-lime-400'}`}>
                {project.title}
              </h3>
              
              {/* Truncated Description for Clean Grid */}
              <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
                {project.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0,2).map(t => (
                    <span key={t} className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-white/5">
                      {t}
                    </span>
                  ))}
                  {project.tech.length > 2 && (
                    <span className="text-xs text-slate-500 px-2 py-1">+ {project.tech.length - 2}</span>
                  )}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider hover:underline ${isRecruiterMode ? 'text-white' : 'text-lime-400'}`}>
                  Read Analysis
                </span>
              </div>
            </div>
        </div>
      </div>

      {/* Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeModal} />
           
           <div className="relative w-full max-w-4xl bg-[#151518] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 flex flex-col md:flex-row max-h-[90vh]">
              <button onClick={closeModal} className="absolute top-6 right-6 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors">
                <X size={24} />
              </button>

              {/* Modal Image */}
              <div className="w-full md:w-2/5 h-64 md:h-auto relative">
                 <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#151518] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Modal Content */}
              <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto">
                 <span className={`inline-block px-3 py-1 rounded-full border mb-6 text-xs font-bold uppercase tracking-widest ${isRecruiterMode ? 'bg-white/10 border-white/20 text-white' : 'border-lime-400/30 text-lime-300 bg-lime-400/10'}`}>
                      {project.category}
                 </span>
                 
                 <h2 className="text-4xl md:text-5xl font-medium text-white mb-6">{project.title}</h2>
                 
                 <div className="grid grid-cols-2 gap-4 mb-8">
                    {project.stats.map((stat, i) => (
                       <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                          <p className="text-xl font-mono text-white">{stat.value}</p>
                       </div>
                    ))}
                 </div>

                 <h4 className="text-lg text-white font-medium mb-3">The Challenge & Solution</h4>
                 <p className="text-slate-300 leading-relaxed mb-8 text-lg">
                   {project.description}
                   <br/><br/>
                   This project required architecting a solution that could scale horizontally while maintaining low latency. By leveraging {project.tech[0]} and {project.tech[1]}, we achieved significant performance gains.
                 </p>

                 <h4 className="text-lg text-white font-medium mb-3">Tech Stack</h4>
                 <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(t => (
                      <span key={t} className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 text-sm text-slate-300">
                        {t}
                      </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
