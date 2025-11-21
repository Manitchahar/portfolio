import React, { useState, useEffect } from 'react';
import { Menu, X, Cpu, Terminal } from 'lucide-react';
import { Section } from '../types';

interface NavbarProps {
  activeSection: Section;
  scrollToSection: (section: Section) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, scrollToSection }) => {
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
    { label: 'Stack', id: Section.STACK },
    { label: 'Projects', id: Section.PROJECTS },
    { label: 'Neural Link', id: Section.CHAT }, // Cool name for chat
  ];

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
          
          <button 
            onClick={() => scrollToSection(Section.CONTACT)}
            className="bg-white/10 hover:bg-neon-purple/20 border border-white/20 hover:border-neon-purple text-white px-6 py-2 rounded-full transition-all duration-300 font-mono text-sm backdrop-blur-sm"
          >
            HIRE_ME()
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
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
        <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col space-y-4 animate-in slide-in-from-top-5">
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
