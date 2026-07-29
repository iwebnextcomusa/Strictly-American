import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, Search, X, Grid, List, Star, Filter } from 'lucide-react';
import { Product, FilterState } from '../types';
import { ProductCard } from './ProductCard';

interface ShopPageProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
  onToggleCompare: (product: Product) => void;
  comparedProducts: Product[];
  onSelectProduct: (product: Product) => void;
  initialCategory?: string;
  initialGender?: string;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onToggleCompare,
  comparedProducts,
  onSelectProduct,
  initialCategory = 'All',
  initialGender = 'All'
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    gender: initialGender,
    size: 'All',
    color: 'All',
    priceRange: [0, 500],
    isNewOnly: false,
    isBestSellerOnly: false,
    searchQuery: '',
    sortBy: 'featured',
    usaState: 'All'
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'Men', 'Women', 'Hats', 'Hoodies', 'T-Shirts', 'Jackets', 'Accessories'];
  const genders = ['All', 'Men', 'Women', 'Unisex'];
  const sizes = ['All', 'S', 'M', 'L', 'XL', 'XXL', '32', '34', '36'];
  const usaStates = ['All', 'North Carolina & Texas', 'California', 'Pennsylvania & Massachusetts', 'Vermont & New York', 'Illinois & Texas', 'Tennessee & Georgia', 'Maine', 'Michigan'];

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category filter
      if (filters.category !== 'All' && prod.category !== filters.category) return false;
      
      // Gender filter
      if (filters.gender !== 'All' && prod.gender !== filters.gender && prod.gender !== 'Unisex') return false;

      // Size filter
      if (filters.size !== 'All' && !prod.sizes.includes(filters.size)) return false;

      // State of Origin filter
      if (filters.usaState !== 'All' && !prod.usaStateOfOrigin.includes(filters.usaState)) return false;

      // Price filter
      if (prod.price < filters.priceRange[0] || prod.price > filters.priceRange[1]) return false;

      // New/Best seller toggles
      if (filters.isNewOnly && !prod.isNew) return false;
      if (filters.isBestSellerOnly && !prod.isBestSeller) return false;

      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(q);
        const matchesCat = prod.category.toLowerCase().includes(q);
        const matchesState = prod.usaStateOfOrigin.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesState) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low') return a.price - b.price;
      if (filters.sortBy === 'price-high') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0; // featured
    });
  }, [products, filters]);

  return (
    <div className="py-12 bg-[#FDFCFB] min-h-screen text-[#0A2342]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="bg-[#F3F1EF] border border-[#0A2342]/10 rounded-2xl p-8 sm:p-12 mb-10 text-center space-y-3 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B22234]">
            100% USA Made Catalog
          </span>
          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#0A2342] italic">
            Shop All American Apparel
          </h1>
          <p className="text-xs sm:text-sm text-[#0A2342]/70 font-serif italic max-w-2xl mx-auto">
            Discover precision tailoring, 18oz heavyweight fleece, raw selvage denim, and full-grain leather accessories built domestically.
          </p>
        </div>

        {/* Filter Controls & Search Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#0A2342]/10 mb-8">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="md:hidden px-4 py-2 bg-[#0A2342] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <Filter className="w-4 h-4 text-amber-300" /> Filters
            </button>
            <span className="text-xs text-[#0A2342]/70 font-serif italic">
              Showing <span className="font-bold text-[#0A2342]">{filteredProducts.length}</span> of {products.length} Products
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search catalog..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="w-full bg-white border border-[#0A2342]/15 rounded-xl pl-9 pr-4 py-2 text-xs text-[#0A2342] placeholder-[#0A2342]/50 focus:outline-none focus:border-[#B22234]"
              />
              <Search className="w-3.5 h-3.5 text-[#0A2342]/50 absolute left-3 top-3" />
            </div>

            {/* Sort Dropdown */}
            <select
              value={filters.sortBy}
              onChange={(e: any) => setFilters({ ...filters, sortBy: e.target.value })}
              className="bg-white border border-[#0A2342]/15 rounded-xl px-3 py-2 text-xs text-[#0A2342] focus:outline-none focus:border-[#B22234]"
            >
              <option value="featured">Sort by Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Releases</option>
            </select>
          </div>

        </div>

        {/* Main Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filter Panel */}
          <div className={`space-y-6 lg:block ${mobileFilterOpen ? 'block' : 'hidden'}`}>
            <div className="bg-white border border-[#0A2342]/10 rounded-2xl p-6 space-y-6 shadow-sm sticky top-24">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#0A2342]/10">
                <h3 className="font-serif font-bold text-base text-[#0A2342] flex items-center gap-2 italic">
                  <SlidersHorizontal className="w-4 h-4 text-[#B22234]" /> Catalog Filters
                </h3>
                <button
                  onClick={() => setFilters({
                    category: 'All',
                    gender: 'All',
                    size: 'All',
                    color: 'All',
                    priceRange: [0, 500],
                    isNewOnly: false,
                    isBestSellerOnly: false,
                    searchQuery: '',
                    sortBy: 'featured',
                    usaState: 'All'
                  })}
                  className="text-[11px] text-[#B22234] hover:underline font-semibold uppercase tracking-wider"
                >
                  Reset All
                </button>
              </div>

              {/* Category Filter */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#0A2342]/60 block mb-2.5">Category</label>
                <div className="space-y-1.5 text-xs">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilters({ ...filters, category: cat })}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                        filters.category === cat ? 'bg-[#0A2342] text-white font-semibold' : 'text-[#0A2342]/80 hover:bg-[#F3F1EF]'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Gender Filter */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#0A2342]/60 block mb-2.5">Gender / Fit</label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {genders.map((gen) => (
                    <button
                      key={gen}
                      onClick={() => setFilters({ ...filters, gender: gen })}
                      className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                        filters.gender === gen ? 'bg-[#0A2342] border-[#0A2342] text-white' : 'bg-[#F3F1EF] border-transparent text-[#0A2342]/70'
                      }`}
                    >
                      {gen}
                    </button>
                  ))}
                </div>
              </div>

              {/* State of Origin */}
              <div>
                <label className="text-[10px] uppercase font-bold tracking-[0.15em] text-[#0A2342]/60 block mb-2.5">Domestic Origin</label>
                <select
                  value={filters.usaState}
                  onChange={(e) => setFilters({ ...filters, usaState: e.target.value })}
                  className="w-full bg-[#F3F1EF] border border-[#0A2342]/10 rounded-xl px-3 py-2 text-xs text-[#0A2342] focus:outline-none"
                >
                  {usaStates.map((st) => (
                    <option key={st} value={st}>🇺🇸 {st}</option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-3 pt-3 border-t border-[#0A2342]/10 text-xs text-[#0A2342]">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={filters.isNewOnly}
                    onChange={(e) => setFilters({ ...filters, isNewOnly: e.target.checked })}
                    className="rounded bg-[#F3F1EF] border-[#0A2342]/20 text-[#B22234] focus:ring-0"
                  />
                  <span>New Releases Only</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={filters.isBestSellerOnly}
                    onChange={(e) => setFilters({ ...filters, isBestSellerOnly: e.target.checked })}
                    className="rounded bg-[#F3F1EF] border-[#0A2342]/20 text-[#B22234] focus:ring-0"
                  />
                  <span>Best Sellers Only</span>
                </label>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#0A2342]/10 rounded-2xl p-12 text-center space-y-4 shadow-sm">
                <p className="text-[#0A2342]/70 text-sm font-serif italic">No products matched your specified filter criteria.</p>
                <button
                  onClick={() => setFilters({
                    category: 'All',
                    gender: 'All',
                    size: 'All',
                    color: 'All',
                    priceRange: [0, 500],
                    isNewOnly: false,
                    isBestSellerOnly: false,
                    searchQuery: '',
                    sortBy: 'featured',
                    usaState: 'All'
                  })}
                  className="px-6 py-2.5 bg-[#0A2342] text-white hover:bg-[#B22234] transition-colors font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlistIds.includes(prod.id)}
                    onToggleCompare={onToggleCompare}
                    isCompared={comparedProducts.some(p => p.id === prod.id)}
                    onSelectProduct={onSelectProduct}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
