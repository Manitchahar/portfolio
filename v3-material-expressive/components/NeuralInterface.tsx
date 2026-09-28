import React, { useState, useRef } from 'react';
import anime from 'animejs';
import { Send, Sparkles } from 'lucide-react';
import { chatWithOracle } from '../services/geminiService';

const NeuralInterface: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setResponse(null);

    const reply = await chatWithOracle(input);
    
    setLoading(false);
    setResponse(reply);
    setInput('');
  };

  return (
    <section className="py-32 px-6 flex justify-center">
      <div className="w-full max-w-2xl bg-[#1a1a1e] rounded-[3rem] p-8 md:p-12 relative overflow-hidden border border-white/5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center text-black">
                <Sparkles size={24} fill="currentColor" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white">Oracle v2.5</h3>
                <p className="text-slate-500 text-sm">Ask anything about the architecture.</p>
            </div>
        </div>

        {/* Response Area */}
        <div className="min-h-[160px] bg-black/20 rounded-[2rem] p-8 mb-6 flex items-center justify-center">
            {loading ? (
                 <div className="flex gap-2">
                    <div className="w-3 h-3 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-3 h-3 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-3 h-3 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                 </div>
            ) : response ? (
                <p className="text-lg text-slate-200 font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {response}
                </p>
            ) : (
                <p className="text-slate-600 italic">Awaiting input sequence...</p>
            )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="relative group">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your query..."
            className="w-full bg-white/5 border-none rounded-full py-5 px-8 pr-16 text-white text-lg focus:outline-none focus:ring-2 focus:ring-lime-400/50 transition-all placeholder-slate-600"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-2 top-2 bottom-2 w-12 h-12 bg-lime-400 rounded-full flex items-center justify-center text-black hover:scale-110 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </form>
        
        {/* Background Glow */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-lime-400/10 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
};

export default NeuralInterface;