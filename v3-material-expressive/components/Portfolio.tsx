import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import ProjectCard from './ProjectCard';
import { PROJECTS } from '../constants';

const Portfolio: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.project-card-anim',
              opacity: [0, 1],
              translateY: [100, 0],
              delay: anime.stagger(100),
              easing: 'cubicBezier(0.2, 0.0, 0.0, 1.0)', // Material Emphasized
              duration: 1000
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-40 px-6 md:px-16 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-8">
        <h2 className="text-6xl font-medium text-white">
          Key<br/>Projects
        </h2>
        <p className="text-slate-400 text-right max-w-xs mt-4 md:mt-0">
            A showcase of Multi-Agent Systems, RAG pipelines, and Enterprise Automation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Portfolio;