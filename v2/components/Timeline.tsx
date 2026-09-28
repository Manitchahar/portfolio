import React, { useEffect, useRef } from 'react';
import { Section } from '../types';
import { TIMELINE_DATA } from '../constants';
import { Code, Cpu, Trophy, Zap } from 'lucide-react';
import anime from 'animejs';

interface TimelineProps {
  id: Section;
}

const TimelineIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'code': return <Code size={20} />;
    case 'cpu': return <Cpu size={20} />;
    case 'trophy': return <Trophy size={20} />;
    case 'zap': return <Zap size={20} />;
    default: return <Code size={20} />;
  }
};

const Timeline: React.FC<TimelineProps> = ({ id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate the central line
          if (lineRef.current) {
              (anime as any)({
                targets: lineRef.current,
                height: ['0%', '100%'],
                duration: 2000,
                easing: 'easeInOutQuad'
              });
          }

          // Animate Nodes: Scale Up with Spring
          (anime as any)({
            targets: '.timeline-node',
            scale: [0, 1],
            opacity: [0, 1],
            delay: anime.stagger(300, {start: 500}),
            easing: 'spring(1, 80, 10, 0)'
          });

          // Animate Content Cards: Slide In
          (anime as any)({
            targets: '.timeline-content',
            translateX: (el: HTMLElement) => {
                return el.classList.contains('left-card') ? [-50, 0] : [50, 0];
            },
            opacity: [0, 1],
            delay: anime.stagger(300, {start: 700}),
            easing: 'easeOutExpo'
          });

          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id={id} className="py-24 bg-black relative overflow-hidden">
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
      
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">Neural <span className="text-neon-green">Roadmap</span></h2>
          <p className="text-gray-400">The sequence of events leading to current state optimization.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Central Line Background */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 -translate-x-1/2 rounded-full" />
          
          {/* Central Line Active (Animated) */}
          <div 
            ref={lineRef}
            className="absolute left-[20px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-neon-purple via-neon-blue to-neon-green -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(0,212,255,0.5)] h-0"
          />

          <div className="space-y-12 md:space-y-24 relative">
            {TIMELINE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div 
                    key={index} 
                    className={`relative flex items-center gap-8 md:gap-0 ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                    {/* Spacer for desktop */}
                    <div className="hidden md:block w-1/2" />

                    {/* Node on the line */}
                    <div 
                        className="timeline-node absolute left-[20px] md:left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full border-4 bg-black border-neon-blue shadow-[0_0_20px_rgba(0,212,255,0.8)] flex items-center justify-center opacity-0 transform scale-0"
                    >
                        <div className="text-white">
                             <TimelineIcon type={item.icon} />
                        </div>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                        <div 
                            className={`timeline-content ${isEven ? 'left-card' : 'right-card'} p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm opacity-0`}
                        >
                            <div className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-mono bg-neon-blue/20 text-neon-blue">
                                {item.year}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 text-glow">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;