
import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

const Hero: React.FC = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [displayText, setDisplayText] = useState("MANIT KUMAR");
  const originalText = "MANIT KUMAR";
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";

  useEffect(() => {
    // Hacker Decode Effect
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iterations) return originalText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iterations >= originalText.length) clearInterval(interval);
      iterations += 1 / 3; // Speed of decoding
    }, 30);

    // Entrance Animations
    anime({
      targets: '.hero-fade-in',
      opacity: [0, 1],
      translateY: [50, 0],
      delay: anime.stagger(100, { start: 500 }),
      easing: 'easeOutExpo',
      duration: 1200
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-16 py-20">
      
      {/* Decorative huge blurred glow behind text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lime-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="z-10 max-w-6xl">
        <div className="hero-fade-in opacity-0 inline-block mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-lime-400 font-mono text-xs tracking-widest uppercase">System Online • v2.5.0</span>
        </div>
        
        <h1 ref={nameRef} className="text-7xl md:text-9xl font-medium tracking-tight text-white leading-[0.9] mb-12 uppercase font-mono">
          {displayText}
        </h1>
        
        <div className="flex flex-col md:flex-row items-start gap-8 mt-8">
           <div className="hero-fade-in opacity-0 max-w-xl">
             <p className="text-2xl text-white mb-6 font-light">
               Generative AI Engineer
             </p>
             <p className="text-lg text-slate-400 leading-relaxed">
               Architecting <span className="text-lime-300">Multi-Agent Systems</span> and <span className="text-lime-300">Self-Corrective RAG</span> pipelines. 
               Specializing in Model Context Protocols (MCP) and Reasoning Models (DeepSeek/o1) to bridge the gap between raw intelligence and enterprise utility.
             </p>
           </div>
           
           <button 
             onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
             className="hero-fade-in opacity-0 group relative px-8 py-4 bg-lime-400 rounded-[2rem] text-slate-950 font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
             <span className="relative z-10 flex items-center gap-2">
                Explore Nexus
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
             </span>
             <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
           </button>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 hidden md:flex gap-4 hero-fade-in opacity-0">
          {['MCP', 'Vertex AI', 'DeepSeek'].map((tag, i) => (
              <div key={i} className="px-6 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center transform transition-transform hover:-translate-y-1 cursor-default">
                  <span className="font-mono text-xs text-lime-400/70 tracking-wider">{tag}</span>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Hero;
    