import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

interface ChatInterfaceProps {
  id: string;
}

// Internal Typewriter Component for the "Godlike" effect
const Typewriter = ({ text, onUpdate, onComplete }: { text: string; onUpdate?: () => void; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    let index = 0;
    setIsComplete(false);
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        if (onUpdate) onUpdate();
      } else {
        clearInterval(interval);
        setIsComplete(true);
        if (onComplete) onComplete();
      }
    }, 20); // Fast, tech-y typing speed

    return () => clearInterval(interval);
  }, [text, onUpdate, onComplete]);

  // Split by newlines to preserve paragraph formatting
  const lines = displayedText.split('\n');

  return (
    <>
      {lines.map((line, i) => (
        <p key={i} className="mb-2 last:mb-0 min-h-[1em] break-words">
          {line}
          {/* Show cursor only on the last line while typing */}
          {!isComplete && i === lines.length - 1 && (
             <span className="inline-block w-2 h-4 ml-1 bg-neon-blue animate-pulse align-middle shadow-[0_0_8px_#00d4ff]" />
          )}
        </p>
      ))}
    </>
  );
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ id }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Greetings. I am Manit's digital consciousness. Ask me about his RAG architectures, fine-tuning experience, or why he's the perfect fit for your team.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Use container ref to control internal scrolling without hijacking window scroll
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      // Only scroll if content overflows the container
      if (scrollHeight > clientHeight) {
        chatContainerRef.current.scrollTo({
          top: scrollHeight,
          behavior: behavior
        });
      }
    }
  };

  // Scroll on new messages (initial render of message bubble)
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Prepare history for the API
    const historyForApi = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
    }));
    historyForApi.push({ role: 'user', parts: [{ text: userMsg.content }] });

    const responseText = await sendMessageToGemini(historyForApi, userMsg.content);

    const modelMsg: Message = {
      role: 'model',
      content: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
    
    // Re-focus input
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id={id} className="py-24 bg-black relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Neural <span className="text-neon-blue">Uplink</span></h2>
          <p className="text-gray-400">Query my digital twin. Powered by Gemini 2.5 Flash.</p>
        </div>

        {/* Chat Window Container */}
        <div className="bg-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-neon-purple/10 flex flex-col h-[600px]">
          
          {/* Header */}
          <div className="bg-black/60 px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs font-mono text-gray-500">manit_ai_agent.exe</div>
          </div>

          {/* Messages Area */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar font-mono text-sm"
          >
            {messages.map((msg, idx) => {
              const isLastMessage = idx === messages.length - 1;
              const isModel = msg.role === 'model';
              
              return (
                <div
                  key={idx}
                  className={`flex gap-4 ${!isModel ? 'flex-row-reverse' : ''}`}
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      isModel 
                        ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/50' 
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    {isModel ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  
                  <div 
                    className={`max-w-[80%] p-4 rounded-xl leading-relaxed shadow-lg ${
                      isModel
                        ? 'bg-white/5 border border-white/10 text-gray-200'
                        : 'bg-neon-blue/20 border border-neon-blue/30 text-white'
                    }`}
                  >
                    {isModel && isLastMessage ? (
                      <Typewriter 
                        text={msg.content} 
                        onUpdate={() => scrollToBottom('auto')} 
                      />
                    ) : (
                      msg.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2 last:mb-0 min-h-[1em]">{line}</p>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
            
            {isLoading && (
              <div className="flex gap-4 animate-pulse">
                 <div className="w-10 h-10 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/50 flex items-center justify-center shrink-0">
                   <Bot size={20} />
                 </div>
                 <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-xl flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-neon-blue" />
                    <span className="text-gray-400 text-xs">Computing tensor operations...</span>
                 </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-black/40 border-t border-white/5">
            <div className="relative flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask Manit AI about his coding style..."
                className="w-full bg-gray-800/50 border border-white/10 text-white rounded-lg pl-4 pr-12 py-4 focus:outline-none focus:border-neon-purple/50 focus:ring-1 focus:ring-neon-purple/50 transition-all font-mono placeholder-gray-600"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="absolute right-2 p-2 bg-neon-purple/20 hover:bg-neon-purple text-neon-purple hover:text-white rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
            {!process.env.API_KEY && (
                <div className="flex items-center gap-2 mt-2 text-yellow-500 text-xs font-mono">
                    <AlertCircle size={12} />
                    <span>Demo Mode: API Key required in environment for real responses.</span>
                </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatInterface;