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
