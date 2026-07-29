import React from 'react';
import { Flag, Heart, Award, Shield } from 'lucide-react';

export const StoryPage: React.FC = () => {
  return (
    <div className="py-16 bg-[#071322] min-h-screen text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#B22234] font-bold">
            Heritage & Mission
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight text-white">
            Our Story: Restoring American Mastery
          </h1>
        </div>

        {/* Editorial Image & Text */}
        <div className="relative h-96 rounded-2xl overflow-hidden border border-[#1E3A5F] shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1600&q=80"
            alt="Strictly American Heritage"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-[#071322]/40 to-transparent p-8 flex flex-col justify-end">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Founded in Pride</span>
            <p className="text-sm sm:text-base text-slate-200 font-serif-display max-w-2xl">
              "We refused to accept that quality apparel could no longer be built in the United States."
            </p>
          </div>
        </div>

        <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-8 sm:p-12 space-y-6 text-slate-300 font-sans-clean leading-relaxed shadow-2xl">
          <h2 className="font-serif-display text-2xl font-bold text-white">The Founding Vision</h2>
          <p>
            Strictly American was born out of a simple observation: for decades, clothing labels traded durability and craftsmanship for cheap mass production. In doing so, historical textile towns across the United States saw their shuttle looms quieted and skilled patternmakers displaced.
          </p>
          <p>
            We established Strictly American with a non-negotiable commitment: 100% domestic sourcing and manufacturing. We sought out the remaining heritage mills—Texas cotton farmers, North Carolina loom operators, Detroit leather artisans, and Los Angeles tailors—to create a luxury brand that represents true American craftsmanship.
          </p>
          <div className="p-6 bg-[#071322] border-l-4 border-[#B22234] rounded-r-xl space-y-2">
            <h3 className="font-serif-display font-bold text-white text-lg">Our Promise to You</h3>
            <p className="text-xs text-slate-300">
              When you wear Strictly American, you wear the labor, dignity, and skill of real American workers. Clothes designed not for one season, but for a lifetime of adventure.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
