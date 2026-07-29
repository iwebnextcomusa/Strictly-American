import React from 'react';
import { Flag, ShieldCheck, MapPin, Award, CheckCircle2, Factory } from 'lucide-react';

export const MadeInUSAPage: React.FC = () => {
  const hubs = [
    {
      state: "Texas",
      title: "West Texas Cotton Farms",
      role: "Raw Organic Fiber Sourcing",
      image: "https://images.unsplash.com/photo-1595079672139-cee220783161?auto=format&fit=crop&w=800&q=80",
      description: "Sun-drenched extra-long staple organic cotton grown by multi-generational family farms."
    },
    {
      state: "North Carolina",
      title: "Raleigh & Greensboro Looms",
      role: "Heritage Shuttle Weaving",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80",
      description: "60-year-old vintage shuttle looms weaving heavy oxfords with finished self-edges."
    },
    {
      state: "California",
      title: "Los Angeles Garment District",
      role: "Precision Cut & Sewing",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      description: "Master patternmakers assembling raw selvage denim jackets and tailored trousers."
    },
    {
      state: "Pennsylvania",
      title: "Eastern PA Knit Works",
      role: "18oz Fleece Knitting",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      description: "Ultra-heavyweight French terry fleece knit to withstand harsh American winters."
    }
  ];

  return (
    <div className="py-16 bg-[#071322] min-h-screen text-white space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#162E4D] border border-[#2B4E7E] text-xs font-semibold text-[#E63946] uppercase tracking-widest">
            <Flag className="w-4 h-4 fill-[#E63946]" /> Uncompromising Standard
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight">
            Our 100% Made in the USA Guarantee
          </h1>
          <p className="text-slate-300 text-sm sm:text-base font-sans-clean leading-relaxed">
            At Strictly American, "Made in USA" is not a marketing tagline—it is our founding charter. We trace every thread, button, zipper, and stitch directly to domestic facilities.
          </p>
        </div>

        {/* Domestic Hubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hubs.map((hub, i) => (
            <div key={i} className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
              <div className="relative h-48">
                <img src={hub.image} alt={hub.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <span className="absolute top-3 left-3 bg-[#B22234] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
                  🇺🇸 {hub.state}
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                  {hub.role}
                </span>
                <h3 className="font-serif-display font-bold text-lg text-white">{hub.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-sans-clean">{hub.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Standards Box */}
        <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-8 space-y-6 max-w-4xl mx-auto shadow-2xl">
          <h2 className="font-serif-display text-2xl font-bold text-white text-center">
            FTC Compliance & Audit Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> All or Virtually All Standard
              </h3>
              <p>Under Federal Trade Commission guidelines, every single processing step—from raw fiber ginning to final button attachment—occurs in the United States.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Fair Domestic Wages
              </h3>
              <p>Our domestic garment workers earn dignified wages exceeding federal minimums, with healthcare benefits and safe, climate-controlled working conditions.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
