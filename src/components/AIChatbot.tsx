import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, RefreshCw, Phone, Mail } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to Strictly American! I am Liberty, your AI Brand Concierge. How can I assist you today with our 100% Made in the USA apparel, sizing, or domestic sourcing?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    const currentPrompt = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentPrompt, history })
      });

      const data = await res.json();
      const reply = data.reply || "Thank you for asking! Every item in our catalog is 100% Made in the USA. Feel free to contact our customer care team at 530-249-1368 or conquestgd@gmail.com for additional help!";

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I am having trouble connecting to the network right now. Please feel free to call us directly at 530-249-1368 or email conquestgd@gmail.com!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-5 py-3.5 bg-gradient-to-r from-[#0A2342] to-[#B22234] hover:from-[#0E2F59] hover:to-[#C92A3E] text-white rounded-full shadow-2xl transition-all duration-300 border border-white/20 hover:scale-105"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-amber-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="font-serif-display font-semibold text-sm tracking-wide">
            Liberty Concierge
          </span>
          <span className="hidden sm:inline-block bg-white/20 text-[10px] px-2 py-0.5 rounded-full font-sans-clean uppercase font-bold">
            AI Assistant
          </span>
        </button>
      )}

      {/* Chat Window Dialog */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[400px] h-[520px] bg-[#0A2342] border border-[#224A7A] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up text-white">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#07172B] to-[#122F54] border-b border-[#1E3E69] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#B22234] flex items-center justify-center shadow">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif-display font-bold text-sm text-white">
                    Liberty — AI Brand Concierge
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-slate-300 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> Powered by Gemini AI • 100% USA Made Expert
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Contact Bar */}
          <div className="bg-[#071322] px-4 py-1.5 text-[10px] text-slate-400 flex items-center justify-between border-b border-[#1A3352]">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-red-400" /> 530-249-1368</span>
            <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-red-400" /> conquestgd@gmail.com</span>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#071322]/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 text-xs ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[#B22234] flex-shrink-0 flex items-center justify-center text-white font-bold text-[10px]">
                    SA
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-2xl p-3 shadow ${
                    msg.role === 'user'
                      ? 'bg-[#B22234] text-white rounded-tr-none'
                      : 'bg-[#122E54] text-slate-200 border border-[#224A7A] rounded-tl-none font-sans-clean leading-relaxed'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                  <span className="text-[9px] text-slate-400 block mt-1 text-right">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-700 flex-shrink-0 flex items-center justify-center text-white">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-[#122E54] p-3 rounded-xl w-36 border border-[#224A7A]">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Liberty is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 bg-[#07172B] border-t border-[#1C3A63] flex gap-2">
            <input
              type="text"
              placeholder="Ask about products, sizing, Texas cotton..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[#122A4A] border border-[#224A7A] rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#B22234]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-[#B22234] hover:bg-red-700 disabled:opacity-50 text-white rounded-xl transition-colors shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}

    </div>
  );
};
