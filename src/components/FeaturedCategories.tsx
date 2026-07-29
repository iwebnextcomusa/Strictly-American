import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PageTab } from '../types';

interface FeaturedCategoriesProps {
  onSelectCategory: (categoryName: string, tab?: PageTab) => void;
}

interface CategoryCard {
  title: string;
  subtitle: string;
  image: string;
  count: string;
  targetTab?: PageTab;
  categoryFilter: string;
  originState: string;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  const categories: CategoryCard[] = [
    {
      title: "Men's Apparel",
      subtitle: "Tailored Oxfords, Field Jackets & Selvage Denim",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
      count: "24 Items",
      targetTab: 'men',
      categoryFilter: 'Men',
      originState: 'Texas & NC'
    },
    {
      title: "Women's Apparel",
      subtitle: "Merino Wool Blazers, Cable Sweaters & Dresses",
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80",
      count: "18 Items",
      targetTab: 'women',
      categoryFilter: 'Women',
      originState: 'Vermont & NY'
    },
    {
      title: "Hats & Headwear",
      subtitle: "Horween Leather Brim Caps & Melton Wool Caps",
      image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80",
      count: "12 Items",
      categoryFilter: 'Hats',
      originState: 'Illinois & Texas'
    },
    {
      title: "Heavyweight Hoodies",
      subtitle: "18oz Pennsylvania Fleece & Embroidered Crests",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
      count: "15 Items",
      categoryFilter: 'Hoodies',
      originState: 'Pennsylvania'
    },
    {
      title: "Graphic & Plain Tees",
      subtitle: "7.5oz Georgia Organic Cotton Heavyweight Tees",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
      count: "20 Items",
      categoryFilter: 'T-Shirts',
      originState: 'Georgia & TN'
    },
    {
      title: "Jackets & Outerwear",
      subtitle: "14.5oz Raw Selvage Denim & Leather Field Coats",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
      count: "10 Items",
      categoryFilter: 'Jackets',
      originState: 'California'
    },
    {
      title: "Leather Accessories",
      subtitle: "Detroit Full-Grain Steerhide Belts & Goods",
      image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80",
      count: "16 Items",
      targetTab: 'accessories',
      categoryFilter: 'Accessories',
      originState: 'Michigan'
    }
  ];

  return (
    <section className="py-20 bg-[#FDFCFB] border-b border-[#0A2342]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#B22234] font-bold">
            Domestic Collections
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0A2342] tracking-tight italic">
            Featured Categories
          </h2>
          <p className="text-[#0A2342]/70 text-sm font-serif italic">
            Explore our curated departments, every item tailored and constructed in certified American workshops.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(cat.categoryFilter, cat.targetTab)}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer border border-[#0A2342]/10 shadow-sm hover:border-[#B22234] hover:shadow-md transition-all duration-300"
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/90 via-[#0A2342]/30 to-transparent p-6 flex flex-col justify-end">
                
                {/* USA Origin Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold text-[#0A2342] border border-[#0A2342]/10 flex items-center gap-1 shadow-sm">
                  <span>🇺🇸</span> {cat.originState}
                </div>

                <span className="text-[10px] uppercase tracking-[0.2em] text-[#B22234] font-bold mb-1">
                  {cat.count}
                </span>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-amber-200 transition-colors italic">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-white/80 font-light mt-1">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-[#0A2342] text-white flex items-center justify-center group-hover:bg-[#B22234] transition-colors shadow">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
