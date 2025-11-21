import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Terminal, FileText, Zap } from 'lucide-react';
import { Section } from '../types';

interface NavbarProps {
  activeSection: Section;
  scrollToSection: (section: Section) => void;
  isRecruiterMode: boolean;
  toggleViewMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection, isRecruiterMode, toggleViewMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: Section.HERO },
    { label: 'About', id: Section.ABOUT },
    { label: 'Journey', id: Section.JOURNEY },
    { label: 'Stack', id: Section.STACK },
    { label: 'Projects', id: Section.PROJECTS },
    { label: 'Neural Link', id: Section.CHAT },
  ];

  // If in recruiter mode, we show a simplified navbar
  if (isRecruiterMode) {
      return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <div className="flex items-center space-x-2 text-gray-900">
                    <FileText size={24} className="text-blue-600" />
                    <span className="text-xl font-bold tracking-tight">MANIT_KUMAR<span className="font-normal text-gray-500">.RESUME</span></span>
                </div>
                <button 
                    onClick={toggleViewMode}
                    className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-md transition-all text-sm font-bold shadow-md hover:shadow-lg"
                >
                    <Zap size={16} className="text-yellow-400" />
                    SWITCH TO IMMERSIVE
                </button>
            </div>
        </nav>
      );
  }

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => scrollToSection(Section.HERO)}
        >
          <div className="relative">
            <Cpu className="w-8 h-8 text-neon-purple group-hover:text-neon-blue transition-colors duration-300" />
            <div className="absolute inset-0 bg-neon-purple blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
          </div>
          <span className="text-2xl font-bold font-mono tracking-tighter text-white">
            MANIT<span className="text-neon-blue">.AI</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`text-sm font-medium uppercase tracking-widest hover:text-neon-blue transition-colors relative group ${
                activeSection === item.id ? 'text-neon-blue' : 'text-gray-400'
              }`}
            >
              {item.label}
              <span className={`absolute -bottom-2 left-0 h-[2px] bg-neon-blue transition-all duration-300 ${
                 activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          ))}
          
          <div className="h-6 w-px bg-white/20 mx-2"></div>

          <button 
            onClick={toggleViewMode}
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-mono border border-white/10 px-3 py-1.5 rounded hover:bg-white/5"
            title="Switch to Recruiter View"
          >
            <FileText size={14} /> RECRUITER_MODE
          </button>

          <button 
            onClick={() => scrollToSection(Section.CONTACT)}
            className="bg-white/10 hover:bg-neon-purple/20 border border-white/20 hover:border-neon-purple text-white px-6 py-2 rounded-full transition-all duration-300 font-mono text-sm backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(176,38,255,0.4)]"
          >
            HIRE_ME()
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleViewMode}
            className="text-gray-400 hover:text-white"
          >
             <FileText size={20} />
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-neon-blue transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4 animate-in slide-in-from-top-5 shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                scrollToSection(item.id);
                setIsMobileMenuOpen(false);
              }}
              className="text-left text-lg font-mono text-gray-300 hover:text-neon-blue"
            >
              {item.label}
            </button>
          ))}
           <button 
            onClick={() => {
                scrollToSection(Section.CONTACT);
                setIsMobileMenuOpen(false);
            }}
            className="text-left text-lg font-mono text-neon-purple"
          >
            INITIATE_CONTACT
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;