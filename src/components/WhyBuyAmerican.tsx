import React from 'react';
import { Flag, Users, Award, ShieldCheck, HeartHandshake, Sparkles } from 'lucide-react';

export const WhyBuyAmerican: React.FC = () => {
  const pillars = [
    {
      icon: Flag,
      title: "100% Made in USA",
      description: "Every single garment is designed, spun, woven, cut, and sewn right here on American soil with certified domestic components.",
      accent: "text-[#B22234]"
    },
    {
      icon: Users,
      title: "Supports American Workers",
      description: "Directly sustains fair living wages, healthcare, and safe working conditions for textile artisans in Texas, NC, California & PA.",
      accent: "text-[#0A2342]"
    },
    {
      icon: Award,
      title: "Premium Materials",
      description: "We source extra-long staple Texas organic cotton, Chicago Horween leather, Vermont merino wool, and Connecticut brass hardware.",
      accent: "text-[#B22234]"
    },
    {
      icon: ShieldCheck,
      title: "Ethical Manufacturing",
      description: "Strict environmental stewardship adhering to US EPA regulations. Zero toxic runoff and full supply-chain transparency.",
      accent: "text-[#0A2342]"
    },
    {
      icon: HeartHandshake,
      title: "Built to Last",
      description: "Heavyweight fabrics, double-stitched stress points, and preshrunk tailoring built to be handed down for generations.",
      accent: "text-[#B22234]"
    }
  ];

  return (
    <section className="py-20 bg-[#FDFCFB] border-b border-[#0A2342]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A2342] text-[10px] uppercase tracking-[0.2em] font-bold text-white shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Our Uncompromising Standard
          </div>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0A2342] tracking-tight italic">
            Why Buy American?
          </h2>
          <p className="text-[#0A2342]/70 text-sm sm:text-base font-serif italic leading-relaxed">
            Fast fashion created a disposable apparel industry. We chose a different path—one rooted in domestic pride, quality, and community.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white border border-[#0A2342]/10 hover:border-[#B22234] rounded-xl p-6 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F3F1EF] border border-[#0A2342]/10 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon className={`w-6 h-6 ${item.accent}`} />
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0A2342] mb-2 group-hover:text-[#B22234] transition-colors italic">
                  {item.title}
                </h3>

                <p className="text-xs text-[#0A2342]/70 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
