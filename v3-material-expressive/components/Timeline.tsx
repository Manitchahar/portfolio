import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { TIMELINE } from '../constants';
import { Disc, Circle, CircleDot } from 'lucide-react';

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting) {
          anime({
            targets: '.timeline-row',
            opacity: [0, 1],
            translateY: [50, 0],
            delay: anime.stagger(150),
            easing: 'cubicBezier(0.2, 0.0, 0.0, 1.0)',
            duration: 1000
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
       <h2 className="text-5xl font-medium mb-24 text-white">
        The Trajectory
      </h2>

      <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-16">
        {TIMELINE.map((event, index) => (
          <div 
            key={event.year} 
            className="timeline-row pl-12 md:pl-0 flex flex-col md:grid md:grid-cols-[200px_1fr] gap-8 relative group"
          >
             {/* Node */}
             <div className="absolute left-[-5px] md:left-[-5px] top-2 w-3 h-3 bg-slate-800 border border-slate-600 rounded-full group-hover:bg-lime-400 group-hover:border-lime-400 transition-colors duration-500 z-10">
                <div className="absolute inset-0 bg-lime-400 rounded-full opacity-0 group-hover:animate-ping" />
             </div>

             <div className="font-mono text-lime-400 text-xl pt-1">
                 {event.year}
             </div>
             
             <div className="pb-12 border-b border-white/5">
                 <h3 className="text-3xl font-medium text-white mb-4 group-hover:translate-x-2 transition-transform duration-500 ease-out">
                     {event.title}
                 </h3>
                 <p className="text-slate-400 leading-relaxed text-lg font-light max-w-2xl">
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