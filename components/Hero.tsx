import React, { useState, useEffect } from 'react';
import { Section } from '../types';
import { ArrowRight, Terminal } from 'lucide-react';
import { MANIT_PROFILE, HERO_ANIMATION_TITLES } from '../constants';

interface HeroProps {
  scrollToSection: (section: Section) => void;
}

const HackerText = ({ text, className }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= text.length) {
        clearInterval(interval);
      }

      iterations += 2; // Faster resolve (was 0.5, then 1, now 2)
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % HERO_ANIMATION_TITLES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Throttle mouse events for performance
    requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePos({ x, y });
    });
  };

  return (
    <section 
      id={Section.HERO} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20 perspective-1000"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax Background Elements */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translate(calc(-50% + ${mousePos.x * -20}px), ${mousePos.y * -20}px)` }}
      />
      <div 
        className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-neon-blue/10 rounded-full blur-[100px] pointer-events-none transition-transform duration-100 ease-out"
        style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)` }}
      />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none transition-transform duration-75"
        style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
      />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 text-center">
        <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 animate-fade-in-up hover:bg-white/10 transition-colors cursor-pointer"
            style={{ transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)` }}
        >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
            </span>
            <span className="text-xs font-mono text-gray-300 tracking-wider">SYSTEM ONLINE // OPEN FOR OPPORTUNITIES</span>
        </div>

        <div 
            className="perspective-500 mb-6"
            style={{ transform: `rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)` }}
        >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-tight">
            <span className="block text-white drop-shadow-2xl mb-2">Architecting</span>
            <span className="block h-[1.2em] text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-fuchsia-500 to-neon-blue text-glow animate-gradient-x">
                <HackerText text={HERO_ANIMATION_TITLES[titleIndex]} />
            </span>
            </h1>
        </div>

        <p 
            className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 font-light leading-relaxed transition-transform duration-200"
            style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}
        >
          Hi, I'm <span className="text-white font-semibold">{MANIT_PROFILE.name}</span>. 
          I engineer <span className="text-neon-blue">Self-Corrective RAG</span> pipelines, 
          deploy <span className="text-neon-purple">Reasoning Models</span>, and build 
          automation that feels like magic.
        </p>

        <div 
            className="flex flex-col md:flex-row items-center justify-center gap-6"
            style={{ transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)` }}
        >
          <button 
            onClick={() => scrollToSection(Section.PROJECTS)}
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
            aria-label="View Projects"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
              View Projects <ArrowRight size={20} />
            </span>
          </button>

          <button 
            onClick={() => scrollToSection(Section.CHAT)}
            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-neon-purple/50 transition-all backdrop-blur-sm font-mono group hover:shadow-[0_0_20px_-5px_rgba(176,38,255,0.3)]"
            aria-label="Talk to Manit AI"
          >
            <Terminal size={20} className="text-neon-purple group-hover:text-neon-blue transition-colors" />
            Talk to Manit AI
          </button>
        </div>
      </div>

      {/* Decorative code snippet */}
      <div 
        className="absolute bottom-10 left-10 hidden xl:block opacity-30 font-mono text-xs text-neon-blue"
        style={{ transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)` }}
      >
        <pre>
{`class ManitEngineer(GenAI):
    def __init__(self):
        self.specialty = ["Multi-Agent", "MCP"]
        self.models = ["DeepSeek-R1", "Gemini-2.5"]
        
    def deploy_solution(self):
        return "MTTR_Reduced"`}
        </pre>
      </div>
    </section>
  );
};

export default Hero;