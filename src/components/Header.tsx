import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  ChevronDown, 
  SlidersHorizontal,
  Layers,
  Sparkles,
  ShieldCheck,
  Award,
  Flag
} from 'lucide-react';
import { PageTab, Product } from '../types';

interface HeaderProps {
  currentTab?: PageTab;
  activeTab?: PageTab;
  setCurrentTab?: (tab: PageTab) => void;
  onNavigate?: (tab: PageTab) => void;
  cartCount: number;
  wishlistCount: number;
  compareCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  products?: Product[];
  onSelectProduct: (product: Product) => void;
  isAdmin?: boolean;
  setIsAdmin?: (admin: boolean) => void;
  searchQuery?: string;
  setSearchQuery?: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab: propCurrentTab,
  activeTab: propActiveTab,
  setCurrentTab: propSetCurrentTab,
  onNavigate: propOnNavigate,
  cartCount,
  wishlistCount,
  compareCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  products = [],
  onSelectProduct,
  isAdmin: propIsAdmin,
  setIsAdmin: propSetIsAdmin,
  searchQuery: propSearchQuery,
  setSearchQuery: propSetSearchQuery
}) => {
  const [internalSearchQuery, setInternalSearchQuery] = useState('');
  const [internalIsAdmin, setInternalIsAdmin] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [megaMenuTab, setMegaMenuTab] = useState<'none' | 'men' | 'women' | 'story'>('none');

  const currentTab = propCurrentTab ?? propActiveTab ?? 'home';
  const setCurrentTab = (tab: PageTab) => {
    if (propSetCurrentTab) propSetCurrentTab(tab);
    if (propOnNavigate) propOnNavigate(tab);
  };

  const isAdmin = propIsAdmin ?? internalIsAdmin;
  const setIsAdmin = (val: boolean) => {
    if (propSetIsAdmin) propSetIsAdmin(val);
    setInternalIsAdmin(val);
  };

  const searchQuery = propSearchQuery ?? internalSearchQuery;
  const setSearchQuery = (q: string) => {
    if (propSetSearchQuery) propSetSearchQuery(q);
    setInternalSearchQuery(q);
  };

  const queryTrimmed = (searchQuery || '').trim();

  const filteredSearchResults = queryTrimmed
    ? (products || []).filter(p => 
        p.name.toLowerCase().includes(queryTrimmed.toLowerCase()) ||
        p.category.toLowerCase().includes(queryTrimmed.toLowerCase()) ||
        p.usaStateOfOrigin.toLowerCase().includes(queryTrimmed.toLowerCase())
      ).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-40 bg-[#FDFCFB] border-b border-[#0A2342]/10 text-[#0A2342] shadow-sm">
      {/* Top Banner */}
      <div className="bg-[#0A2342] border-b border-[#0A2342]/20 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-medium">
            <span className="flex items-center gap-1.5 text-[#B22234] font-bold">
              <Flag className="w-3.5 h-3.5 fill-[#B22234]" /> 100% Made in the USA
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-white/80">Free Domestic Shipping on Orders $150+</span>
          </div>

          <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.15em] font-medium">
            <a href="tel:5302491368" className="flex items-center gap-1 hover:text-[#B22234] transition-colors">
              <Phone className="w-3.5 h-3.5 text-white/60" />
              <span>530-249-1368</span>
            </a>
            <a href="mailto:conquestgd@gmail.com" className="hidden sm:flex items-center gap-1 hover:text-[#B22234] transition-colors">
              <Mail className="w-3.5 h-3.5 text-white/60" />
              <span>conquestgd@gmail.com</span>
            </a>
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`px-2 py-0.5 rounded text-[9px] tracking-widest uppercase font-bold transition-colors ${
                isAdmin ? 'bg-[#B22234] text-white' : 'bg-white/10 text-white/80 hover:text-white'
              }`}
            >
              {isAdmin ? 'Admin Active' : 'Admin Portal'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="group text-left flex items-center gap-3"
            >
              {/* Custom Patriotic Crest Icon */}
              <div className="w-10 h-10 rounded-lg bg-[#0A2342] p-0.5 shadow-sm group-hover:bg-[#B22234] transition-colors">
                <div className="w-full h-full bg-[#0A2342] rounded-[7px] flex items-center justify-center border border-white/20">
                  <span className="font-serif-display text-lg font-bold text-white tracking-tighter italic">SA</span>
                </div>
              </div>
              <div>
                <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#0A2342] group-hover:text-[#B22234] transition-colors block uppercase italic">
                  STRICTLY AMERICAN
                </span>
                <span className="text-[9px] tracking-[0.3em] text-[#B22234] uppercase font-bold block -mt-1">
                  100% Made in the USA
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[11px] uppercase tracking-[0.2em] font-bold">
            <button
              onClick={() => setCurrentTab('home')}
              className={`transition-colors py-2 border-b-2 ${
                currentTab === 'home' ? 'border-[#B22234] text-[#B22234]' : 'border-transparent text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => setCurrentTab('shop')}
              className={`transition-colors py-2 border-b-2 ${
                currentTab === 'shop' ? 'border-[#B22234] text-[#B22234]' : 'border-transparent text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              Shop All
            </button>

            <button
              onClick={() => setCurrentTab('men')}
              onMouseEnter={() => setMegaMenuTab('men')}
              onMouseLeave={() => setMegaMenuTab('none')}
              className={`transition-colors py-2 border-b-2 flex items-center gap-1 ${
                currentTab === 'men' ? 'border-[#B22234] text-[#B22234]' : 'border-transparent text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              Men <ChevronDown className="w-3 h-3" />
            </button>

            <button
              onClick={() => setCurrentTab('women')}
              onMouseEnter={() => setMegaMenuTab('women')}
              onMouseLeave={() => setMegaMenuTab('none')}
              className={`transition-colors py-2 border-b-2 flex items-center gap-1 ${
                currentTab === 'women' ? 'border-[#B22234] text-[#B22234]' : 'border-transparent text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              Women <ChevronDown className="w-3 h-3" />
            </button>

            <button
              onClick={() => setCurrentTab('accessories')}
              className={`transition-colors py-2 border-b-2 ${
                currentTab === 'accessories' ? 'border-[#B22234] text-[#B22234]' : 'border-transparent text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              Accessories
            </button>

            <button
              onClick={() => setCurrentTab('made-in-usa')}
              className={`transition-colors py-2 border-b-2 flex items-center gap-1 text-[#B22234] font-bold ${
                currentTab === 'made-in-usa' ? 'border-[#B22234]' : 'border-transparent hover:text-[#0A2342]'
              }`}
            >
              <Award className="w-3.5 h-3.5" /> Made in USA
            </button>

            <button
              onClick={() => setCurrentTab('story')}
              className={`transition-colors py-2 border-b-2 ${
                currentTab === 'story' ? 'border-[#B22234] text-[#B22234]' : 'border-transparent text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              Our Story
            </button>

            <button
              onClick={() => setCurrentTab('blog')}
              className={`transition-colors py-2 border-b-2 ${
                currentTab === 'blog' ? 'border-[#B22234] text-[#B22234]' : 'border-transparent text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              Journal
            </button>

            <button
              onClick={() => setCurrentTab('contact')}
              className={`transition-colors py-2 border-b-2 ${
                currentTab === 'contact' ? 'border-[#B22234] text-[#B22234]' : 'border-transparent text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Action Icons & Predictive Search */}
          <div className="flex items-center gap-4">
            
            {/* Search Input Box */}
            <div className="relative hidden md:block w-48 lg:w-60">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search catalog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                  className="w-full bg-[#F3F1EF] border border-[#0A2342]/15 rounded-full pl-9 pr-4 py-1.5 text-xs text-[#0A2342] placeholder-[#0A2342]/50 focus:outline-none focus:border-[#B22234] focus:bg-white transition-all"
                />
                <Search className="w-3.5 h-3.5 text-[#0A2342]/60 absolute left-3 top-2.5" />
              </div>

              {/* Predictive Search Modal Dropdown */}
              {searchFocused && queryTrimmed.length > 0 && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-[#FDFCFB] border border-[#0A2342]/15 rounded-xl shadow-2xl p-3 z-50">
                  <div className="text-[10px] uppercase tracking-wider text-[#0A2342]/60 mb-2 px-2 font-bold">
                    Search Results ({filteredSearchResults.length})
                  </div>
                  {filteredSearchResults.length === 0 ? (
                    <div className="text-xs text-[#0A2342]/70 p-2 text-center">No products found matching "{searchQuery}"</div>
                  ) : (
                    <div className="space-y-1">
                      {filteredSearchResults.map((prod) => (
                        <button
                          key={prod.id}
                          onClick={() => {
                            onSelectProduct(prod);
                            setSearchQuery('');
                          }}
                          className="w-full text-left flex items-center gap-3 p-2 rounded-lg hover:bg-[#F3F1EF] transition-colors"
                        >
                          <img src={prod.images[0]} alt={prod.name} className="w-10 h-10 object-cover rounded border border-[#0A2342]/10" referrerPolicy="no-referrer" />
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-serif italic text-[#0A2342] truncate">{prod.name}</div>
                            <div className="text-[10px] text-[#0A2342]/70 flex items-center gap-2">
                              <span className="text-[#B22234] font-bold">${prod.price}</span>
                              <span>🇺🇸 {prod.usaStateOfOrigin}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                  <button 
                    onClick={() => { setCurrentTab('shop'); setSearchFocused(false); }}
                    className="w-full mt-2 pt-2 border-t border-[#0A2342]/10 text-center text-xs text-[#B22234] hover:underline font-semibold uppercase tracking-wider"
                  >
                    View All Catalog Results →
                  </button>
                </div>
              )}
            </div>

            {/* Compare Button */}
            <button
              onClick={onOpenCompare}
              title="Compare Products"
              className="relative p-2 text-[#0A2342] hover:text-[#B22234] transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
              {compareCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0A2342] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              title="Wishlist"
              className="relative p-2 text-[#0A2342] hover:text-[#B22234] transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B22234] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Account Dashboard Button */}
            <button
              onClick={() => setCurrentTab('account')}
              title="Customer Account"
              className={`p-2 transition-colors ${
                currentTab === 'account' ? 'text-[#B22234]' : 'text-[#0A2342] hover:text-[#B22234]'
              }`}
            >
              <User className="w-5 h-5" />
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 bg-[#0A2342] hover:bg-[#B22234] text-white rounded-full transition-all shadow-md flex items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B22234] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#0A2342] hover:text-[#B22234]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mega Menu Dropdowns */}
      {megaMenuTab !== 'none' && (
        <div 
          onMouseEnter={() => setMegaMenuTab(megaMenuTab)}
          onMouseLeave={() => setMegaMenuTab('none')}
          className="hidden lg:block bg-[#FDFCFB] border-b border-[#0A2342]/10 py-8 px-8 transition-all shadow-xl text-[#0A2342]"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#B22234] font-bold mb-4">Categories</h4>
              <ul className="space-y-2 text-xs uppercase tracking-wider font-medium text-[#0A2342]/80">
                <li><button onClick={() => { setCurrentTab('shop'); setMegaMenuTab('none'); }} className="hover:text-[#B22234]">All Apparel</button></li>
                <li><button onClick={() => { setCurrentTab('shop'); setMegaMenuTab('none'); }} className="hover:text-[#B22234]">Oxford Shirts & Tops</button></li>
                <li><button onClick={() => { setCurrentTab('shop'); setMegaMenuTab('none'); }} className="hover:text-[#B22234]">Heavyweight Hoodies</button></li>
                <li><button onClick={() => { setCurrentTab('shop'); setMegaMenuTab('none'); }} className="hover:text-[#B22234]">Raw Selvage Denim</button></li>
                <li><button onClick={() => { setCurrentTab('shop'); setMegaMenuTab('none'); }} className="hover:text-[#B22234]">Outerwear & Jackets</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#0A2342]/60 font-bold mb-4">Domestic Origins</h4>
              <ul className="space-y-2 text-xs uppercase tracking-wider font-medium text-[#0A2342]/80">
                <li className="flex items-center gap-2"><span className="text-[#B22234]">🇺🇸</span> Texas Organic Cotton</li>
                <li className="flex items-center gap-2"><span className="text-[#B22234]">🇺🇸</span> NC Vintage Loom Weaves</li>
                <li className="flex items-center gap-2"><span className="text-[#B22234]">🇺🇸</span> LA Tailored Stitching</li>
                <li className="flex items-center gap-2"><span className="text-[#B22234]">🇺🇸</span> Detroit Leathercraft</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.2em] text-[#0A2342]/60 font-bold mb-4">Quality Guarantee</h4>
              <div className="bg-[#F3F1EF] p-4 rounded-xl border border-[#0A2342]/10 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#0A2342]">
                  <ShieldCheck className="w-4 h-4 text-[#B22234]" />
                  100% US Certified
                </div>
                <p className="text-[#0A2342]/70 font-light">Every component from thread to hardware is produced domestically.</p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80" 
                alt="Made in USA Craftsmanship" 
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2342]/90 via-[#0A2342]/30 to-transparent p-4 flex flex-col justify-end">
                <span className="text-xs font-serif italic text-white">American Craftsmanship</span>
                <span className="text-[10px] text-white/80 uppercase tracking-wider font-light">Built to endure for generations</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FDFCFB] border-t border-[#0A2342]/10 px-4 pt-4 pb-8 space-y-4 text-[#0A2342]">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F3F1EF] border border-[#0A2342]/15 rounded-lg pl-9 pr-4 py-2 text-xs text-[#0A2342] placeholder-[#0A2342]/50 focus:outline-none"
            />
            <Search className="w-4 h-4 text-[#0A2342]/50 absolute left-3 top-3" />
          </div>

          <nav className="flex flex-col space-y-3 text-xs uppercase tracking-[0.2em] font-bold text-[#0A2342]">
            <button onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">Home</button>
            <button onClick={() => { setCurrentTab('shop'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">Shop All Apparel</button>
            <button onClick={() => { setCurrentTab('men'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">Men's Collection</button>
            <button onClick={() => { setCurrentTab('women'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">Women's Collection</button>
            <button onClick={() => { setCurrentTab('accessories'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">Accessories & Hats</button>
            <button onClick={() => { setCurrentTab('made-in-usa'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10 text-[#B22234] font-bold">100% Made in USA Promise</button>
            <button onClick={() => { setCurrentTab('story'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">Our Heritage & Story</button>
            <button onClick={() => { setCurrentTab('blog'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">Journal Articles</button>
            <button onClick={() => { setCurrentTab('contact'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">Contact Support</button>
            <button onClick={() => { setCurrentTab('account'); setMobileMenuOpen(false); }} className="text-left py-2 border-b border-[#0A2342]/10">My Account / Orders</button>
          </nav>
        </div>
      )}
    </header>
  );
};
