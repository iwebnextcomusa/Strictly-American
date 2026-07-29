import React from 'react';
import { ArrowRight, ShieldCheck, Flag, Sparkles } from 'lucide-react';
import { PageTab } from '../types';

interface HeroSectionProps {
  onNavigate: (tab: PageTab) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#E5E2DD] text-[#0A2342]">
      
      {/* Background Editorial Image & Subtle Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=80"
          alt="Proudly Made in America Lifestyle Apparel"
          className="w-full h-full object-cover object-center opacity-25 scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FDFCFB]/90 via-[#F3F1EF]/70 to-[#FDFCFB]/90"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
        
        {/* Top Heritage Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FDFCFB] border border-[#0A2342]/20 text-[10px] uppercase tracking-[0.3em] font-bold text-[#0A2342] shadow-sm">
          <Flag className="w-3.5 h-3.5 fill-[#B22234] text-[#B22234]" /> 100% Domestic Sourcing & Craftsmanship
        </div>

        {/* Main Headline */}
        <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0A2342] leading-[1.1] italic">
          Proudly Made <br className="hidden sm:inline" />in America<span className="text-[#B22234]">.</span>
        </h1>

        {/* Subheadline */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-[#0A2342]/80 font-serif italic leading-relaxed">
          Premium apparel crafted in the USA for those who value quality, heritage, and domestic excellence. From Texas cotton fields to Los Angeles workshops.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('men')}
            className="px-8 py-3.5 bg-[#0A2342] hover:bg-[#B22234] text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all shadow-md flex items-center gap-2 group"
          >
            Shop Men
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('women')}
            className="px-8 py-3.5 border border-[#0A2342] hover:bg-[#F3F1EF] text-[#0A2342] text-[11px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-2 group"
          >
            Shop Women
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('shop')}
            className="px-8 py-3.5 bg-[#B22234] hover:bg-[#0A2342] text-white text-[11px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-2 shadow-md"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Shop Catalog
          </button>
        </div>

        {/* Trust Stat Highlights */}
        <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-[#0A2342]/15 text-left">
          <div className="p-3">
            <span className="text-2xl font-bold font-serif-display text-[#0A2342] italic block">100%</span>
            <span className="text-[10px] uppercase tracking-wider text-[#0A2342]/70 font-bold block">USA Sourced & Sewn</span>
          </div>
          <div className="p-3">
            <span className="text-2xl font-bold font-serif-display text-[#0A2342] italic block">18oz</span>
            <span className="text-[10px] uppercase tracking-wider text-[#0A2342]/70 font-bold block">Heavyweight Cotton Fleece</span>
          </div>
          <div className="p-3">
            <span className="text-2xl font-bold font-serif-display text-[#0A2342] italic block">$150+</span>
            <span className="text-[10px] uppercase tracking-wider text-[#0A2342]/70 font-bold block">Free Shipping Nationwide</span>
          </div>
          <div className="p-3">
            <span className="text-2xl font-bold font-serif-display text-[#0A2342] italic block">30-Day</span>
            <span className="text-[10px] uppercase tracking-wider text-[#0A2342]/70 font-bold block">Hassle-Free Returns</span>
          </div>
        </div>

      </div>
    </section>
  );
};
