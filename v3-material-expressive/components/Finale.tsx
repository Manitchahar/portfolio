import React from 'react';

const Finale: React.FC = () => {
  return (
    <section className="py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
      <h2 className="text-[12vw] font-bold text-white leading-none tracking-tighter mb-12 opacity-5 select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap">
        MANIT KUMAR
      </h2>

      <div className="relative z-10">
         <p className="text-xl text-lime-400 font-mono mb-8">Ready to Collaborate?</p>
         
         <a 
            href="mailto:chaharmanit@gmail.com"
            className="group relative inline-flex items-center justify-center px-16 py-8 bg-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 duration-300"
         >
            <span className="relative z-10 text-black font-bold text-2xl tracking-tight">Initialize Connection</span>
            <div className="absolute inset-0 bg-lime-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-emphasized" />
         </a>
         
         <div className="mt-12 flex gap-8 justify-center">
            <a href="https://linkedin.com/in/manit-kumar-088b67197" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-lime-400 transition-colors">LinkedIn</a>
            <a href="https://github.com/manit-chahar" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-lime-400 transition-colors">GitHub</a>
         </div>
      </div>
      
      <footer className="mt-32 text-slate-600 text-sm font-mono">
         © {new Date().getFullYear()} Manit Kumar. Engineered with React & Gemini.
      </footer>
    </section>
  );
};

export default Finale;