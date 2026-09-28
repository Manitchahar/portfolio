import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../types';
import { ArrowRight, Terminal } from 'lucide-react';
import { MANIT_PROFILE, HERO_ANIMATION_TITLES } from '../constants';
import AnimeGridBackground from './AnimeGridBackground';
import anime from 'animejs';

interface HeroProps {
  scrollToSection: (section: Section) => void;
}

const TokenStreamText = ({ text }: { text: string }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';
    
    // Create span for each character (simulating tokens)
    const chars = text.split('');
    const spans = chars.map(char => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.className = 'token-char';
      containerRef.current?.appendChild(span);
      return span;
    });

    // Animate opacity and color (Inference Effect)
    (anime as any)({
      targets: spans,
      opacity: [0, 1],
      translateY: [10, 0],
      color: ['#b026ff', '#ffffff'], // Neon purple to white
      delay: anime.stagger(50), // Token generation speed
      easing: 'easeOutExpo',
      duration: 800
    });

  }, [text]);

  return <span ref={containerRef} className="inline-block" />;
};

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % HERO_ANIMATION_TITLES.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Entrance Animation
  useEffect(() => {
    if (!heroRef.current) return;
    
    (anime as any)({
        targets: heroRef.current.querySelectorAll('.hero-element'),
        opacity: [0, 1],
        translateY: [20, 0],
        delay: anime.stagger(200, { start: 500 }),
        easing: 'easeOutExpo',
        duration: 1500
    });
  }, []);

  return (
    <section 
      id={Section.HERO} 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 pt-20"
    >
      {/* Anime.js Grid System */}
      <AnimeGridBackground />

      {/* Vignette & Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-[2] pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 text-center">
        
        <div className="hero-element opacity-0 mb-8 flex justify-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer group">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
                </span>
                <span className="text-xs font-mono text-gray-300 tracking-wider group-hover:text-white transition-colors">
                    SYSTEM ONLINE // READY FOR INFERENCE
                </span>
            </div>
        </div>

        <div className="hero-element opacity-0 mb-6 perspective-500">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-tight">
            <span className="block text-white drop-shadow-2xl mb-2">Architecting</span>
            <span className="block h-[1.2em] text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-fuchsia-500 to-neon-blue text-glow">
                <TokenStreamText text={HERO_ANIMATION_TITLES[titleIndex]} />
            </span>
            </h1>
        </div>

        <p className="hero-element opacity-0 text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto mb-12 font-light leading-relaxed">
          Hi, I'm <span className="text-white font-semibold">{MANIT_PROFILE.name}</span>. 
          I engineer <span className="text-neon-blue font-medium">Self-Corrective RAG</span> pipelines, 
          deploy <span className="text-neon-purple font-medium">Reasoning Models</span>, and build 
          automation that feels like magic.
        </p>

        <div className="hero-element opacity-0 flex flex-col md:flex-row items-center justify-center gap-6">
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
            className="flex items-center gap-2 px-8 py-4 bg-black/50 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-neon-purple/50 transition-all backdrop-blur-sm font-mono group hover:shadow-[0_0_20px_-5px_rgba(176,38,255,0.3)]"
            aria-label="Talk to Manit AI"
          >
            <Terminal size={20} className="text-neon-purple group-hover:text-neon-blue transition-colors" />
            Talk to Manit AI
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;