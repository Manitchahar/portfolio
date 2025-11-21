
import React, { useEffect, useRef, useState } from 'react';
import { Section } from '../types';
import { TIMELINE_DATA } from '../constants';
import { Code, Cpu, Trophy, Zap } from 'lucide-react';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate how much of the section has been scrolled through
      // Start counting when section top enters viewport
      const startOffset = windowHeight * 0.6; 
      const progress = Math.min(Math.max((startOffset - rect.top) / (sectionHeight * 0.8), 0), 1);
      
      setScrollProgress(progress);

      // Determine which items are active based on position
      const newActiveIndices: number[] = [];
      TIMELINE_DATA.forEach((_, index) => {
        // Simple logic: if overall progress passes a threshold proportional to item count
        if (progress > index / (TIMELINE_DATA.length - 0.5)) {
            newActiveIndices.push(index);
        }
      });
      setActiveIndices(newActiveIndices);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id={id} className="py-24 bg-black relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent" />
      
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-white mb-4">Neural <span className="text-neon-green">Roadmap</span></h2>
          <p className="text-gray-400">The sequence of events leading to current state optimization.</p>
        </div>

        <div ref={containerRef} className="relative max-w-4xl mx-auto">
          {/* Central Line Background */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-800 -translate-x-1/2 rounded-full" />
          
          {/* Central Line Active Progress */}
          <div 
            className="absolute left-[20px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-neon-purple via-neon-blue to-neon-green -translate-x-1/2 rounded-full transition-all duration-100 ease-out shadow-[0_0_15px_rgba(0,212,255,0.5)]"
            style={{ height: `${scrollProgress * 100}%` }}
          />

          <div className="space-y-12 md:space-y-24 relative">
            {TIMELINE_DATA.map((item, index) => {
              const isActive = activeIndices.includes(index);
              const isEven = index % 2 === 0;

              return (
                <div 
                    key={index} 
                    className={`relative flex items-center gap-8 md:gap-0 ${
                        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                >
                    {/* Spacer for desktop to push content to side */}
                    <div className="hidden md:block w-1/2" />

                    {/* Node on the line */}
                    <div 
                        className={`absolute left-[20px] md:left-1/2 -translate-x-1/2 z-10 w-10 h-10 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                            isActive 
                                ? 'bg-black border-neon-blue shadow-[0_0_20px_rgba(0,212,255,0.8)] scale-110' 
                                : 'bg-gray-900 border-gray-700'
                        }`}
                    >
                        <div className={`text-white transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                             <TimelineIcon type={item.icon} />
                        </div>
                    </div>

                    {/* Content Card */}
                    <div className={`flex-1 pl-12 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                        <div 
                            className={`p-6 rounded-xl border backdrop-blur-sm transition-all duration-700 transform ${
                                isActive 
                                    ? 'bg-white/5 border-neon-purple/30 translate-y-0 opacity-100 shadow-[0_0_30px_-10px_rgba(176,38,255,0.2)]' 
                                    : 'bg-black/40 border-white/5 translate-y-10 opacity-30 grayscale'
                            }`}
                        >
                            <div className={`inline-block mb-2 px-3 py-1 rounded-full text-xs font-mono ${
                                isActive ? 'bg-neon-blue/20 text-neon-blue' : 'bg-gray-800 text-gray-500'
                            }`}>
                                {item.year}
                            </div>
                            <h3 className={`text-xl font-bold text-white mb-2 ${isActive ? 'text-glow' : ''}`}>
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
