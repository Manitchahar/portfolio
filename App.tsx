import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import ChatInterface from './components/ChatInterface';
import NeuralBackground from './components/NeuralBackground';
import CustomCursor from './components/CustomCursor';
import RecruiterView from './components/RecruiterView';
import { Section } from './types';
import { Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { MANIT_PROFILE } from './constants';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(Section.HERO);
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  const scrollToSection = (section: Section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleViewMode = () => {
      setIsRecruiterMode(!isRecruiterMode);
      window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Spy on scroll to update active navigation
  useEffect(() => {
    if (isRecruiterMode) return;

    const handleScroll = () => {
      const sections = Object.values(Section);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -300 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isRecruiterMode]);

  // Recruiter Mode is a completely different layout (pure React component swap)
  if (isRecruiterMode) {
      return (
        <>
            <Navbar 
                activeSection={Section.HERO} 
                scrollToSection={() => {}} 
                isRecruiterMode={true}
                toggleViewMode={toggleViewMode}
            />
            <div className="pt-20">
                <RecruiterView />
            </div>
        </>
      );
  }

  return (
    <div className="bg-black min-h-screen text-white selection:bg-neon-purple selection:text-white relative">
      <NeuralBackground />
      <CustomCursor />
      
      <div className="relative z-10">
        <Navbar 
            activeSection={activeSection} 
            scrollToSection={scrollToSection} 
            isRecruiterMode={false}
            toggleViewMode={toggleViewMode}
        />
        
        <main>
          <Hero scrollToSection={scrollToSection} />
          
          <section id={Section.ABOUT} className="py-20 flex items-center justify-center relative">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold mb-6">About The <span className="text-neon-purple">Architect</span></h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                {MANIT_PROFILE.bio}
              </p>
            </div>
          </section>

          <Timeline id={Section.JOURNEY} />

          <Skills id={Section.STACK} />
          
          <Projects id={Section.PROJECTS} />
          
          <ChatInterface id={Section.CHAT} />

          <footer id={Section.CONTACT} className="py-16 bg-black/50 backdrop-blur-md border-t border-white/10 text-center relative overflow-hidden">
             {/* Footer ambient glow */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-neon-purple/10 blur-[100px] rounded-full pointer-events-none" />
             
              <div className="max-w-4xl mx-auto px-6 relative z-10">
                  <h2 className="text-4xl font-bold text-white mb-8">Ready to <span className="text-neon-green">Collaborate?</span></h2>
                  <p className="text-gray-400 mb-8">
                      I am currently open to opportunities at forward-thinking AI companies.
                  </p>
                  
                  <a 
                    href={`mailto:${MANIT_PROFILE.email}`} 
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neon-blue hover:text-white transition-all duration-300 mb-12 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)]"
                  >
                      <Mail size={20} />
                      Send Message
                  </a>

                  <div className="flex justify-center gap-8">
                      <a href={MANIT_PROFILE.social.github} className="text-gray-500 hover:text-white transition-colors hover:scale-125 transform duration-200"><Github size={24} /></a>
                      <a href={MANIT_PROFILE.social.linkedin} className="text-gray-500 hover:text-neon-blue transition-colors hover:scale-125 transform duration-200"><Linkedin size={24} /></a>
                      <a href={MANIT_PROFILE.social.twitter} className="text-gray-500 hover:text-neon-purple transition-colors hover:scale-125 transform duration-200"><Twitter size={24} /></a>
                  </div>
                  
                  <div className="mt-12 text-sm text-gray-700 font-mono">
                      &copy; {new Date().getFullYear()} MANIT.AI. All systems nominal.
                  </div>
              </div>
          </footer>
        </main>
      </div>
    </div>
  );
}