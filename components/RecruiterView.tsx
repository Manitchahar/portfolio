import React from 'react';
import { MANIT_PROFILE, SKILLS, PROJECTS, TIMELINE_DATA } from '../constants';
import { Mail, ExternalLink } from 'lucide-react';

const RecruiterView: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans p-6 md:p-16 selection:bg-blue-100 selection:text-blue-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="border-b-2 border-gray-900 pb-8 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 tracking-tight">{MANIT_PROFILE.name}</h1>
            <p className="text-xl text-blue-700 font-semibold tracking-wide uppercase">{MANIT_PROFILE.role}</p>
            <p className="text-gray-500 mt-1 font-medium">{MANIT_PROFILE.location}</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-3">
            <a 
                href={`mailto:${MANIT_PROFILE.email}`} 
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <Mail size={18} /> {MANIT_PROFILE.email}
            </a>
            <div className="flex gap-4 text-sm font-medium">
               <a href={MANIT_PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-blue-700 border-b border-transparent hover:border-blue-700 transition-all">LinkedIn</a>
               <span className="text-gray-300">|</span>
               <a href={MANIT_PROFILE.social.github} target="_blank" rel="noreferrer" className="text-gray-600 hover:text-black border-b border-transparent hover:border-black transition-all">GitHub</a>
            </div>
          </div>
        </header>

        {/* Summary */}
        <section className="mb-12">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Executive Summary</h2>
          <p className="text-xl text-gray-800 leading-relaxed max-w-3xl font-light">
            {MANIT_PROFILE.bio}
          </p>
        </section>

        {/* Skills Grid */}
        <section className="mb-16">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Technical Arsenal</h2>
          <div className="bg-gray-50 rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-12 border border-gray-100">
            <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Core Competencies</h3>
                <ul className="space-y-2">
                    {SKILLS.filter(s => s.category === 'core').map(s => (
                        <li key={s.name} className="flex items-center justify-between text-gray-700 border-b border-gray-200 pb-1 last:border-0">
                            <span>{s.name}</span>
                            <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">{s.level}%</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Frameworks & Infrastructure</h3>
                <ul className="space-y-2">
                    {SKILLS.filter(s => s.category !== 'core').map(s => (
                        <li key={s.name} className="flex items-center justify-between text-gray-700 border-b border-gray-200 pb-1 last:border-0">
                            <span>{s.name}</span>
                            <span className="font-mono text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-600">{s.level}%</span>
                        </li>
                    ))}
                </ul>
            </div>
          </div>
        </section>

        {/* Experience (Reversed Timeline) */}
        <section className="mb-16">
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Career Trajectory</h2>
          <div className="space-y-8 border-l-2 border-gray-200 ml-3 pl-8 relative">
            {[...TIMELINE_DATA].reverse().map((item, idx) => (
                <div key={idx} className="relative">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white border-4 border-gray-300"></div>
                    <div className="flex flex-col md:flex-row gap-2 md:gap-8 mb-2">
                        <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                        <div className="font-mono text-sm text-blue-600 font-bold pt-1 bg-blue-50 px-2 py-0.5 rounded self-start">
                            {item.year}
                        </div>
                    </div>
                    <p className="text-gray-600 max-w-2xl">{item.description}</p>
                </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-12">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Notable Deliverables</h2>
            <div className="grid grid-cols-1 gap-4">
                {PROJECTS.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors bg-white hover:shadow-md group">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-700 transition-colors">{project.title}</h3>
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors">
                                    <ExternalLink size={20} />
                                </a>
                            )}
                        </div>
                        <p className="text-gray-600 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map(t => (
                                <span key={t} className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-semibold text-gray-600 uppercase tracking-wide">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
        
        <footer className="text-center text-gray-400 text-sm mt-20 border-t border-gray-100 pt-8">
            <p>Generated from {window.location.host} • {new Date().toLocaleDateString()}</p>
        </footer>
      </div>
    </div>
  );
};

export default RecruiterView;