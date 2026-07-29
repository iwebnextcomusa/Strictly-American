import React from 'react';
import { Camera, MapPin } from 'lucide-react';

export const LifestyleSection: React.FC = () => {
  const stories = [
    {
      title: "American Landscapes",
      location: "Grand Teton Range, Wyoming",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
      description: "Tested against rugged mountain winds and open prairies."
    },
    {
      title: "Craftsmanship & Precision",
      location: "Greensboro Loom House, NC",
      image: "https://images.unsplash.com/photo-1595079672139-cee220783161?auto=format&fit=crop&w=1000&q=80",
      description: "Hand-guided shuttle looms weaving extra-heavyweight yarns."
    },
    {
      title: "Family & Heritage",
      location: "Bozeman, Montana",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1000&q=80",
      description: "Timeless clothing designed to be passed down through generations."
    },
    {
      title: "Small-Town America",
      location: "Main Street, Texas",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1000&q=80",
      description: "Supporting local economies and family-owned storefronts."
    }
  ];

  return (
    <section className="py-20 bg-[#F3F1EF] border-b border-[#0A2342]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B22234] font-bold block mb-2">
              Editorial Showcase
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0A2342] tracking-tight italic">
              The American Spirit
            </h2>
          </div>
          <p className="text-[#0A2342]/70 text-sm max-w-md font-serif italic">
            Our editorial gallery celebrates the landscapes, families, workshops, and small towns that define the American ethos.
          </p>
        </div>

        {/* Editorial Photo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, i) => (
            <div
              key={i}
              className="group relative h-96 rounded-xl overflow-hidden shadow-sm border border-[#0A2342]/10 hover:border-[#B22234] hover:shadow-md transition-all duration-500"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/90 via-[#0A2342]/30 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3 text-[#B22234]" /> {story.location}
                </span>

                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors italic">
                  {story.title}
                </h3>

                <p className="text-xs text-white/80 font-light leading-relaxed">
                  {story.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
