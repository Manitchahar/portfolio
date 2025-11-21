
import React from 'react';
import { useViewMode } from './ViewModeContext';
import { Eye, Zap } from 'lucide-react';

const ModeToggle: React.FC = () => {
  const { isRecruiterMode, toggleMode } = useViewMode();

  return (
    <button
      onClick={toggleMode}
      className="fixed top-6 right-6 z-[60] flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-105 shadow-lg bg-white/10 border-white/10 hover:bg-white/20"
      aria-label={isRecruiterMode ? "Switch to Immersive Mode" : "Switch to Recruiter Mode"}
    >
      {isRecruiterMode ? (
        <>
          <Zap size={16} className="text-lime-400" />
          <span className="text-xs font-medium text-white">Enable FX</span>
        </>
      ) : (
        <>
          <Eye size={16} className="text-cyan-400" />
          <span className="text-xs font-medium text-white">Recruiter View</span>
        </>
      )}
    </button>
  );
};

export default ModeToggle;
