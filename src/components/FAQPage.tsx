import React, { useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { FAQS } from '../data/faqs';

export const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = ['All', 'Made in USA Certification', 'Shipping & Delivery', 'Returns & Exchanges', 'Sizing & Fit', 'Care & Maintenance'];

  const filteredFaqs = FAQS.filter((faq) => {
    if (selectedCategory !== 'All' && faq.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="py-16 bg-[#071322] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B22234]">
            Frequently Asked Questions
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold">
            Customer Help Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Find immediate answers regarding domestic sourcing, shipping, sizing, and returns.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search questions (e.g. shipping, returns, Texas cotton)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0A2342] border border-[#1E3A5F] rounded-2xl pl-10 pr-4 py-3.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#B22234]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-4" />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-[#B22234] text-white shadow-lg'
                  : 'bg-[#0A2342] border border-[#1E3A5F] text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl overflow-hidden shadow-xl"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif-display font-bold text-sm sm:text-base text-white hover:text-amber-200 transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-red-400' : ''}`} />
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-[#1C3E6B] text-xs sm:text-sm text-slate-300 font-sans-clean leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
