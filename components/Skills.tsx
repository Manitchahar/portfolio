import React, { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../constants';
import { Section } from '../types';

interface SkillsProps {
  id: Section;
}

const Skills: React.FC<SkillsProps> = ({ id }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger animation once
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id={id} className="py-24 bg-black relative overflow-hidden">
       <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-neon-purple/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16">
          
          {/* Text Content */}
          <div className="md:w-1/3">
            <h2 
              className={`text-4xl font-bold text-white mb-6 transition-all duration-700 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              Tech <span className="text-neon-purple">Arsenal</span>
            </h2>
            <p 
              className={`text-gray-400 mb-8 leading-relaxed transition-all duration-700 delay-100 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              I specialize in the modern AI stack. From training base models on TPU clusters to optimizing inference latency on edge devices. My toolkit is designed for high-velocity vibe coding.
            </p>
            <div 
              className={`p-6 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-700 delay-200 transform ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
                <h4 className="text-neon-green font-mono mb-2 text-sm">CURRENT FOCUS</h4>
                <p className="text-white font-bold text-lg">Agentic Workflows & Multi-Modal RAG</p>
            </div>
          </div>

          {/* Skill Bars */}
          <div className="md:w-2/3 grid grid-cols-1 gap-6">
            {SKILLS.map((skill, idx) => (
              <div key={skill.name} className="group">
                <div className="flex justify-between mb-2">
                  <span className="text-white font-mono font-medium">{skill.name}</span>
                  <span className="text-neon-blue font-mono text-sm">{skill.level}%</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden relative">
                  {/* Background animated line */}
                  <div className="absolute inset-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')]" />
                  
                  <div 
                    className="h-full bg-gradient-to-r from-neon-purple to-neon-blue relative group-hover:brightness-125 transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible ? `${skill.level}%` : '0%',
                      transitionDelay: `${300 + (idx * 100)}ms`
                    }}
                  >
                     <div className="absolute right-0 top-0 h-full w-1 bg-white opacity-50 animate-pulse"></div>
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