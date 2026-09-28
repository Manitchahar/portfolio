import React, { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../constants';
import { Section } from '../types';
import anime from 'animejs';

interface SkillsProps {
  id: Section;
}

const Skills: React.FC<SkillsProps> = ({ id }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // 1. Staggered Entrance
          (anime as any)({
            targets: '.skill-bar-container',
            opacity: [0, 1],
            translateX: [-50, 0],
            easing: 'easeOutExpo',
            duration: 800,
            delay: anime.stagger(100)
          });

          // 2. Fill Bars
          (anime as any)({
            targets: '.skill-fill',
            width: (el: HTMLElement) => el.getAttribute('data-level') + '%',
            easing: 'easeInOutQuad',
            duration: 1200,
            delay: anime.stagger(100, { start: 300 }),
            complete: () => {
                // 3. Energy Pulse for Mastery Skills (>90%)
                (anime as any)({
                  targets: '.skill-fill[data-level="95"], .skill-fill[data-level="98"], .skill-fill[data-level="99"]',
                  boxShadow: ['0 0 0px rgba(0, 212, 255, 0)', '0 0 20px rgba(0, 212, 255, 0.8)'],
                  filter: ['brightness(1)', 'brightness(1.3)'],
                  duration: 1000,
                  direction: 'alternate',
                  loop: true,
                  easing: 'easeInOutSine'
                });
            }
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
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} id={id} className="py-24 bg-black relative overflow-hidden">
       <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-neon-purple/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Text Content */}
          <div className="md:w-1/3">
            <h2 className="text-4xl font-bold text-white mb-6">
              Tech <span className="text-neon-purple">Arsenal</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I specialize in the modern AI stack. From training base models on TPU clusters to optimizing inference latency on edge devices. My toolkit is designed for high-velocity vibe coding.
            </p>
            <div className="p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h4 className="text-neon-green font-mono mb-2 text-sm relative z-10">CURRENT FOCUS</h4>
                <p className="text-white font-bold text-lg relative z-10">Agentic Workflows & Multi-Modal RAG</p>
            </div>
          </div>

          {/* Skill Bars */}
          <div className="md:w-2/3 grid grid-cols-1 gap-6">
            {SKILLS.map((skill, idx) => (
              <div key={skill.name} className="group skill-bar-container opacity-0">
                <div className="flex justify-between mb-2">
                  <span className="text-white font-mono font-medium">{skill.name}</span>
                  <span className="text-neon-blue font-mono text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
                  <div className="absolute inset-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]" />
                  
                  <div 
                    className="skill-fill h-full bg-gradient-to-r from-neon-purple to-neon-blue relative"
                    style={{ width: '0%' }}
                    data-level={skill.level}
                  >
                     <div className="absolute right-0 top-0 h-full w-1 bg-white opacity-50"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;