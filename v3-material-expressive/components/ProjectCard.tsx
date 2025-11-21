
import React, { useRef, useState } from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<Props> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Spotlight CSS Variables
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
    
    // 3D Tilt Math
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / 20) * -1; 
    const rotateY = (x - centerX) / 20;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    if (cardRef.current) {
        // Move spotlight out of view/fade it on leave roughly
        cardRef.current.style.removeProperty('--mouse-x');
        cardRef.current.style.removeProperty('--mouse-y');
    }
  };

  return (
    <div 
      ref={cardRef}
      className="project-card-anim group relative rounded-[2.5rem] cursor-pointer transition-all duration-200 ease-out opacity-0 select-none"
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight Glow Layer (The Border) */}
      <div 
        className="absolute inset-0 rounded-[2.5rem] z-[-1] transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(163, 230, 53, 0.6), transparent 40%)`
        }}
      />

      {/* Inner Card Background */}
      <div className="relative h-full bg-[#151518] rounded-[2.5rem] p-[1px] overflow-hidden border border-white/5">
          
          {/* Inner Spotlight (Subtle surface shine) */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
            style={{
                background: `radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.06), transparent 40%)`
            }}
          />

          {/* Image Container */}
          <div className="h-64 overflow-hidden m-2 rounded-[2rem] relative translate-z-10" style={{ transform: 'translateZ(20px)' }}>
            <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:opacity-0" />
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 shadow-lg border border-white/20">
               <ArrowUpRight className="text-white" size={24} />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 translate-z-20" style={{ transform: 'translateZ(30px)' }}>
            <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-lime-300 uppercase tracking-widest bg-lime-400/5 shadow-[0_0_10px_rgba(163,230,53,0.2)]">
                    {project.category}
                </span>
            </div>
            
            <h3 className="text-3xl font-medium text-white mb-3 leading-tight group-hover:text-lime-400 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3 group-hover:text-slate-300 transition-colors">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0,3).map(t => (
                <span key={t} className="text-xs text-slate-300 bg-slate-800/80 px-3 py-1 rounded-full border border-white/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default ProjectCard;
