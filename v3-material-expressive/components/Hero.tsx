import React, { useEffect, useRef } from 'react';
import anime from 'animejs';
import { HERO_KEYWORDS } from '../constants';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const shapeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    // Staggered Text Reveal
    if (titleRef.current) {
      titleRef.current.innerHTML = titleRef.current.textContent!.replace(/\S/g, "<span class='letter inline-block'>$&</span>");
      
      anime({
        targets: '.letter',
        translateY: [100, 0],
        opacity: [0, 1],
        rotateZ: [10, 0],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(30)
      });
    }

    // Morphing Shape Animation
    const shapes = [
      'M42.7,-73.2C55.9,-67.1,67.3,-57.6,75.3,-46.2C83.4,-34.8,88.1,-21.5,86.3,-8.7C84.5,4.1,76.2,16.4,67.4,27.3C58.6,38.2,49.3,47.7,38.7,55.6C28.1,63.5,16.2,69.8,3.6,70.4C-9,71,-19.7,65.9,-29.6,59.1C-39.5,52.3,-48.6,43.8,-56.3,34C-64,24.2,-70.3,13.1,-72.2,1.1C-74.1,-10.9,-71.6,-23.8,-64.8,-34.6C-58,-45.4,-46.9,-54.1,-35.2,-60.9C-23.5,-67.7,-11.2,-72.6,2.2,-76.4C15.6,-80.2,31.2,-82.9,42.7,-73.2Z',
      'M45.7,-76.8C58.9,-69.3,69.1,-56.6,76.5,-42.9C83.9,-29.2,88.5,-14.6,86.3,-0.9C84.1,12.8,75.1,25.6,65.6,36.6C56.1,47.6,46.1,56.8,35.1,63.8C24.1,70.8,12,75.6,0.3,75.1C-11.4,74.6,-22.9,68.8,-33.8,61.6C-44.7,54.4,-55,45.8,-63.3,35.3C-71.6,24.8,-77.9,12.4,-78.6,-0.4C-79.3,-13.2,-74.4,-26.4,-65.5,-36.5C-56.6,-46.6,-43.7,-53.6,-31.6,-61.6C-19.5,-69.6,-8.2,-78.6,4.9,-87.1C18,-95.6,36,-103.6,45.7,-76.8Z'
    ];

    anime({
      targets: shapeRef.current,
      d: shapes,
      duration: 4000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine'
    });

  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden px-6 md:px-16 py-20">
      
      {/* Background Morphing Shape */}
      <div className="absolute right-[-10%] top-[10%] w-[80vh] h-[80vh] opacity-20 z-0 pointer-events-none">
         <svg viewBox="-100 -100 200 200" className="w-full h-full fill-lime-400 mix-blend-exclusion blur-3xl">
            <path ref={shapeRef} d="M42.7,-73.2C55.9,-67.1,67.3,-57.6,75.3,-46.2C83.4,-34.8,88.1,-21.5,86.3,-8.7C84.5,4.1,76.2,16.4,67.4,27.3C58.6,38.2,49.3,47.7,38.7,55.6C28.1,63.5,16.2,69.8,3.6,70.4C-9,71,-19.7,65.9,-29.6,59.1C-39.5,52.3,-48.6,43.8,-56.3,34C-64,24.2,-70.3,13.1,-72.2,1.1C-74.1,-10.9,-71.6,-23.8,-64.8,-34.6C-58,-45.4,-46.9,-54.1,-35.2,-60.9C-23.5,-67.7,-11.2,-72.6,2.2,-76.4C15.6,-80.2,31.2,-82.9,42.7,-73.2Z" />
         </svg>
      </div>

      <div className="z-10 max-w-6xl">
        <div className="inline-block mb-8 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-lime-400 font-mono text-xs tracking-widest uppercase">Available for Projects</span>
        </div>
        
        <h1 ref={titleRef} className="text-7xl md:text-9xl font-medium tracking-tight text-white leading-[0.9] mb-12 uppercase">
          MANIT<br />
          KUMAR
        </h1>
        
        <div className="flex flex-col md:flex-row items-start gap-8 mt-8">
           <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
             Generative AI Engineer specializing in <strong>Multi-Agent Systems</strong>, <strong>Model Context Protocols (MCP)</strong>, and <strong>Reasoning Models</strong>.
             <br/><br/>
             Designing self-corrective architectures and reducing MTTR with intelligent automation on Azure, AWS, and Google Vertex AI.
           </p>
           
           <button 
             onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
             className="group relative px-8 py-4 bg-lime-400 rounded-[2rem] text-slate-950 font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
             <span className="relative z-10">View Intelligence</span>
             <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
           </button>
        </div>
      </div>

      <div className="absolute bottom-12 right-12 hidden md:flex gap-4">
          {['MCP', 'RAG', 'Agents'].map((tag, i) => (
              <div key={i} className="w-32 h-32 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center transform transition-transform hover:-translate-y-2">
                  <span className="font-mono text-white/50">{tag}</span>
              </div>
          ))}
      </div>
    </div>
  );
};

export default Hero;