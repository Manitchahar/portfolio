
import React, { Suspense } from 'react';
import CustomCursor from './components/CustomCursor';
import BackgroundCanvas from './components/BackgroundCanvas';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Timeline from './components/Timeline';
import NeuralInterface from './components/NeuralInterface';
import Finale from './components/Finale';

// Error Boundary could be added here, but keeping it simple for the prompt
const App: React.FC = () => {
  return (
    <div className="relative w-full min-h-screen text-slate-200 selection:bg-cyan-500 selection:text-black">
      
      {/* Cinematic Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Immersive Elements */}
      <CustomCursor />
      <BackgroundCanvas />

      {/* Scroll Container */}
      <main className="relative z-10">
        <Hero />
        <Timeline />
        <Portfolio />
        <NeuralInterface />
        <Finale />
      </main>
      
    </div>
  );
};

export default App;
