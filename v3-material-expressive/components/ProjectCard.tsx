
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
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25; // Divide by 25 to dampen effect
    const y = (e.clientY - top - height / 2) / 25;
    
    // Apply 3D rotation
    setTransform(`perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div 
      ref={cardRef}
      className="project-card-anim group relative bg-[#151518] rounded-[2.5rem] cursor-pointer transition-all duration-200 ease-out opacity-0"
      style={{ transform, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow Effect behind card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-lime-500/20 to-cyan-500/20 rounded-[2.6rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

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
            <span className="px-3 py-1 rounded-full border border-white/10 text-[10px] font-bold text-lime-300 uppercase tracking-widest bg-lime-400/5">
                {project.category}
            </span>
        </div>
        
        <h3 className="text-3xl font-medium text-white mb-3 leading-tight group-hover:text-lime-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">
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
  );
};

export default ProjectCard;
    