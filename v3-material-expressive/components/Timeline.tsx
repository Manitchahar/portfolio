
import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { TIMELINE } from '../constants';

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          anime({
            targets: '.timeline-row',
            opacity: [0, 1],
            translateX: [-50, 0],
            delay: anime.stagger(150),
            easing: 'easeOutExpo',
            duration: 1200
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.15 });

    if(containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 md:px-16 max-w-5xl mx-auto">
       <h2 className="text-5xl font-medium mb-24 text-white tracking-tight">
        Career Trajectory
      </h2>

      {/* Timeline Container */}
      <div className="relative ml-4 md:ml-0 space-y-20">
        
        {/* The Energy Beam (Vertical Line) */}
        <div className="absolute left-[5px] md:left-[105px] top-4 bottom-4 w-[2px] hidden md:block overflow-hidden rounded-full">
             {/* Static base */}
             <div className="absolute inset-0 bg-white/5" />
             {/* Flowing Beam */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-400 to-transparent animate-beam opacity-70" />
        </div>

        {TIMELINE.map((event, index) => (
          <div 
            key={event.year} 
            className="timeline-row pl-8 md:pl-0 flex flex-col md:grid md:grid-cols-[100px_1fr] gap-12 relative group opacity-0"
          >
             {/* Year / Node */}
             <div className="flex flex-col items-start md:items-end relative">
                 <span className="font-mono text-lime-400 text-xl font-bold group-hover:text-cyan-300 transition-colors duration-300">{event.year}</span>
                 {/* Node on desktop line */}
                 <div className="absolute right-[-53px] top-2 w-4 h-4 bg-[#0f0f11] border-2 border-lime-400 rounded-full hidden md:block z-10 group-hover:scale-150 group-hover:border-cyan-300 transition-all duration-300 shadow-[0_0_15px_rgba(163,230,53,0.5)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
             </div>
             
             <div className="bg-[#1a1a1e]/50 backdrop-blur-sm p-8 rounded-[2rem] border border-white/5 hover:border-lime-400/30 transition-all duration-500 group-hover:translate-x-2 group-hover:bg-[#1a1a1e]/80">
                 <h3 className="text-2xl font-bold text-white mb-2">
                     {event.title}
                 </h3>
                 <p className="text-slate-400 leading-relaxed text-base group-hover:text-slate-300 transition-colors">
                     {event.description}
                 </p>
             </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
