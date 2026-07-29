import React, { useState } from 'react';
import { Mail, Phone, MapPin, Flag, Send, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { PageTab } from '../types';

const brandLogo = "https://qeya9bjadi260nlt.public.blob.vercel-storage.com/Create_logo_for_Strictly_American_202607300052.jpeg";

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#0A2342] text-white border-t border-[#0A2342]/20">
      
      {/* Newsletter Section */}
      <div className="border-b border-white/10 bg-[#07182E] py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B22234]">
            Community & Inner Circle
          </span>
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white italic">
            Join the Strictly American Community
          </h3>
          <p className="text-xs sm:text-sm text-white/80 font-serif italic max-w-xl mx-auto">
            Subscribe for exclusive early access to limited Made in USA releases, craftsman spotlights, and patriotic heritage stories.
          </p>

          {subscribed ? (
            <div className="p-4 bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-semibold rounded-lg max-w-md mx-auto">
              ✓ Welcome to the Strictly American family! Check your inbox for your 10% welcome voucher.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded px-4 py-3 text-xs text-white placeholder-white/50 focus:outline-none focus:border-[#B22234]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#B22234] hover:bg-white hover:text-[#0A2342] text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded transition-colors shadow flex items-center justify-center gap-2"
              >
                Subscribe <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        
        {/* Brand Info */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={brandLogo}
              alt="Strictly American Logo"
              className="w-10 h-10 object-contain rounded-full border border-white/20 bg-white p-0.5 shadow"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-serif-display text-xl font-bold text-white block uppercase italic">
                STRICTLY AMERICAN
              </span>
              <span className="text-[9px] tracking-[0.3em] text-[#B22234] uppercase font-bold block">
                100% Made in the USA
              </span>
            </div>
          </div>

          <p className="text-xs text-white/70 font-light leading-relaxed pr-4">
            Dedicated to restoring domestic manufacturing, celebrating American craftsmanship, and crafting timeless luxury apparel built to endure for generations.
          </p>

          <div className="space-y-2 text-xs pt-2 text-white/80">
            <a href="tel:5302491368" className="flex items-center gap-2 hover:text-[#B22234] transition-colors">
              <Phone className="w-4 h-4 text-[#B22234]" />
              <span>530-249-1368</span>
            </a>
            <a href="mailto:conquestgd@gmail.com" className="flex items-center gap-2 hover:text-[#B22234] transition-colors">
              <Mail className="w-4 h-4 text-[#B22234]" />
              <span>conquestgd@gmail.com</span>
            </a>
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-4 h-4 text-[#B22234]" />
              <span>California Headquarters • USA Workshops</span>
            </div>
          </div>
        </div>

        {/* Quick Shop Links */}
        <div>
          <h4 className="font-serif-display text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">
            Shop Collections
          </h4>
          <ul className="space-y-2.5 text-xs text-white/80">
            <li><button onClick={() => onNavigate('shop')} className="hover:text-[#B22234] transition-colors">All Apparel</button></li>
            <li><button onClick={() => onNavigate('men')} className="hover:text-[#B22234] transition-colors">Men's Collection</button></li>
            <li><button onClick={() => onNavigate('women')} className="hover:text-[#B22234] transition-colors">Women's Collection</button></li>
            <li><button onClick={() => onNavigate('accessories')} className="hover:text-[#B22234] transition-colors">Leather & Accessories</button></li>
            <li><button onClick={() => onNavigate('made-in-usa')} className="hover:text-[#B22234] transition-colors text-[#B22234] font-bold">100% USA Made Promise</button></li>
          </ul>
        </div>

        {/* Customer Care Links */}
        <div>
          <h4 className="font-serif-display text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-xs text-white/80">
            <li><button onClick={() => onNavigate('faq')} className="hover:text-[#B22234] transition-colors">FAQ & Support</button></li>
            <li><button onClick={() => onNavigate('shipping')} className="hover:text-[#B22234] transition-colors">Shipping Policy</button></li>
            <li><button onClick={() => onNavigate('returns')} className="hover:text-[#B22234] transition-colors">30-Day Returns & Exchanges</button></li>
            <li><button onClick={() => onNavigate('contact')} className="hover:text-[#B22234] transition-colors">Contact Us</button></li>
            <li><button onClick={() => onNavigate('account')} className="hover:text-[#B22234] transition-colors">Track Your Order</button></li>
          </ul>
        </div>

        {/* Legal & Company */}
        <div>
          <h4 className="font-serif-display text-xs font-bold text-white uppercase tracking-[0.2em] mb-4 border-b border-white/10 pb-2">
            Legal & Company
          </h4>
          <ul className="space-y-2.5 text-xs text-white/80">
            <li><button onClick={() => onNavigate('story')} className="hover:text-[#B22234] transition-colors">Our Heritage Story</button></li>
            <li><button onClick={() => onNavigate('blog')} className="hover:text-[#B22234] transition-colors">Craftsmanship Journal</button></li>
            <li><button onClick={() => onNavigate('privacy')} className="hover:text-[#B22234] transition-colors">Privacy Policy</button></li>
            <li><button onClick={() => onNavigate('terms')} className="hover:text-[#B22234] transition-colors">Terms of Service</button></li>
          </ul>
        </div>

      </div>

      {/* Payment Badges & Trust Footer */}
      <div className="bg-[#051426] py-8 px-4 border-t border-white/10 text-center text-xs space-y-4">
        
        <div className="flex flex-wrap items-center justify-center gap-3 text-white/60 text-[10px] uppercase tracking-wider font-medium">
          <span className="px-3 py-1 rounded bg-white/5 border border-white/10">Credit Cards</span>
          <span className="px-3 py-1 rounded bg-white/5 border border-white/10">Apple Pay</span>
          <span className="px-3 py-1 rounded bg-white/5 border border-white/10">Google Pay</span>
          <span className="px-3 py-1 rounded bg-white/5 border border-white/10">PayPal</span>
          <span className="px-3 py-1 rounded bg-white/5 border border-white/10">Shop Pay</span>
        </div>

        <div className="text-white/60 text-xs">
          © {new Date().getFullYear()} Strictly American Inc. All rights reserved. 100% Made in the USA.
        </div>

        {/* Required Footer Attribution */}
        <div className="pt-2 text-xs text-white/80 font-serif">
          Developed by <a href="https://iwebnext.com" target="_blank" rel="noopener noreferrer" className="text-[#B22234] hover:underline font-bold">iWebNext</a>
        </div>

      </div>

    </footer>
  );
};
