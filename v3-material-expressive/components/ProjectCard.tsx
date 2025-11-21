import React, { useRef } from 'react';
import anime from 'animejs';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<Props> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleMouseEnter = () => {
    anime({
      targets: cardRef.current,
      scale: 0.98,
      duration: 400,
      easing: 'easeOutQuad'
    });
    anime({
      targets: imgRef.current,
      scale: 1.1,
      duration: 800,
      easing: 'easeOutQuad'
    });
  };

  const handleMouseLeave = () => {
    anime({
      targets: cardRef.current,
      scale: 1,
      duration: 400,
      easing: 'easeOutQuad'
    });
    anime({
      targets: imgRef.current,
      scale: 1,
      duration: 800,
      easing: 'easeOutQuad'
    });
  };

  return (
    <div 
      ref={cardRef}
      className="project-card-anim group relative bg-[#1a1a1e] rounded-[2.5rem] overflow-hidden cursor-pointer transition-shadow hover:shadow-2xl hover:shadow-lime-400/10 opacity-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image Container */}
      <div className="h-64 overflow-hidden m-2 rounded-[2rem] relative">
        <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:opacity-0" />
        <img 
          ref={imgRef}
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute top-4 right-4 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
           <ArrowUpRight className="text-white" size={24} />
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full border border-white/10 text-xs font-medium text-lime-300 uppercase tracking-wide">
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
            <span key={t} className="text-xs text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;