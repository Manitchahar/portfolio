import React, { useRef, useState } from 'react';
import { PROJECTS } from '../constants';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectsProps {
  id: string;
}

const ProjectCard = ({ project }: { project: any }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setOpacity(1);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsFocused(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 spotlight-card transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-2"
      style={{
        '--mouse-x': `${position.x}px`,
        '--mouse-y': `${position.y}px`,
      } as React.CSSProperties}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        
        {/* Tech Stack Tags Floating */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {project.tech.map((t: string) => (
            <span key={t} className="text-xs font-mono bg-neon-purple/20 backdrop-blur-md border border-neon-purple/30 text-neon-blue px-2 py-1 rounded shadow-[0_0_10px_rgba(176,38,255,0.3)]">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-purple transition-colors flex items-center gap-2">
          {project.title}
          <span className="inline-block w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 min-h-[80px] group-hover:text-gray-300 transition-colors">
          {project.description}
        </p>

        <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <a href={project.link} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group/link">
              <Github size={16} className="group-hover/link:text-neon-blue transition-colors" /> Source
            </a>
            <a href={project.link} className="flex items-center gap-2 text-sm text-neon-green hover:text-white transition-colors group/link">
              Live Demo <ExternalLink size={16} className="group-hover/link:-translate-y-1 group-hover/link:translate-x-1 transition-transform" />
            </a>
        </div>
      </div>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ id }) => {
  return (
    <section id={id} className="py-24 bg-slate-950 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-neon-blue/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            System <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Outputs</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Deployment-ready applications bridging the gap between generative models and user value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;