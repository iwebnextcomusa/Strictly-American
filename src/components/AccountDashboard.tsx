import React, { useState } from 'react';
import { Package, User, MapPin, Heart, Clock, Truck, ShieldCheck } from 'lucide-react';
import { Product } from '../types';

interface AccountDashboardProps {
  wishlistIds: string[];
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const AccountDashboard: React.FC<AccountDashboardProps> = ({
  wishlistIds,
  products,
  onAddToCart
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');

  const sampleOrders = [
    {
      id: 'SA-USA-849201',
      date: 'May 12, 2026',
      total: 298.00,
      status: 'Delivered',
      items: [
        { name: 'Heritage American Oxford Shirt', qty: 1, price: 148.00 },
        { name: 'Texas Cotton Graphic Tee', qty: 2, price: 75.00 }
      ],
      tracking: '1Z9999999999999999 (USPS Priority)'
    },
    {
      id: 'SA-USA-730192',
      date: 'April 02, 2026',
      total: 215.00,
      status: 'Delivered',
      items: [
        { name: '18oz Heavyweight American Fleece Hoodie', qty: 1, price: 215.00 }
      ],
      tracking: '1Z8888888888888888 (FedEx)'
    }
  ];

  const savedWishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="py-16 bg-[#071322] min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* User Greeting Profile Header */}
        <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#B22234] border-2 border-white flex items-center justify-center font-serif-display font-bold text-2xl text-white shadow-xl">
              JM
            </div>
            <div>
              <h1 className="font-serif-display text-2xl font-bold text-white">James Miller</h1>
              <p className="text-xs text-slate-300">Patriot Circle Member • Member since 2024</p>
              <span className="text-[10px] text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded border border-amber-800 font-semibold mt-1 inline-block">
                VIP Domestic Collector
              </span>
            </div>
          </div>

          <div className="flex gap-3 text-xs">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2.5 rounded-xl border font-semibold transition-all ${
                activeTab === 'orders' ? 'bg-[#B22234] border-[#B22234] text-white' : 'bg-[#071322] border-[#1E3A5F] text-slate-300'
              }`}
            >
              Order History
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`px-4 py-2.5 rounded-xl border font-semibold transition-all ${
                activeTab === 'addresses' ? 'bg-[#B22234] border-[#B22234] text-white' : 'bg-[#071322] border-[#1E3A5F] text-slate-300'
              }`}
            >
              Saved Addresses
            </button>
            <button
              onClick={() => setActiveTab('wishlist')}
              className={`px-4 py-2.5 rounded-xl border font-semibold transition-all ${
                activeTab === 'wishlist' ? 'bg-[#B22234] border-[#B22234] text-white' : 'bg-[#071322] border-[#1E3A5F] text-slate-300'
              }`}
            >
              Saved Wishlist ({savedWishlistProducts.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="font-serif-display text-xl font-bold text-white">Your Past Domestic Orders</h2>
            <div className="space-y-4">
              {sampleOrders.map((ord) => (
                <div key={ord.id} className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 space-y-4 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1E3A5F] pb-3 text-xs">
                    <div>
                      <span className="font-bold text-white text-sm block">{ord.id}</span>
                      <span className="text-slate-400">Placed on {ord.date}</span>
                    </div>
                    <span className="bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800 font-bold">
                      ✓ {ord.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-slate-300">
                        <span>{it.qty}x {it.name}</span>
                        <span className="font-bold text-white">${it.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t border-[#1E3A5F] pt-3 text-xs">
                    <span className="text-slate-400">Tracking Number: <span className="text-white font-mono">{ord.tracking}</span></span>
                    <span className="font-serif-display font-bold text-base text-amber-300">Total: ${ord.total.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 space-y-4 shadow-xl max-w-xl">
            <h2 className="font-serif-display text-xl font-bold text-white">Default Shipping Address</h2>
            <div className="bg-[#071322] border border-[#1E3A5F] p-4 rounded-xl text-xs space-y-1 text-slate-300">
              <p className="font-bold text-white">James Miller (Primary)</p>
              <p>1776 Freedom Way</p>
              <p>Austin, TX 78701</p>
              <p>United States</p>
              <p className="text-slate-500 pt-1">Phone: 530-249-1368</p>
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-4">
            <h2 className="font-serif-display text-xl font-bold text-white">Saved Favorites</h2>
            {savedWishlistProducts.length === 0 ? (
              <p className="text-xs text-slate-400">No saved items in your wishlist.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {savedWishlistProducts.map((p) => (
                  <div key={p.id} className="bg-[#0A2342] border border-[#1E3A5F] rounded-xl p-4 space-y-3">
                    <img src={p.images[0]} alt="" className="w-full h-40 object-cover rounded-lg" referrerPolicy="no-referrer" />
                    <h3 className="font-bold text-white text-sm line-clamp-1">{p.name}</h3>
                    <p className="text-amber-300 font-bold text-sm">${p.price}</p>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="w-full py-2 bg-[#B22234] text-white text-xs font-semibold rounded-lg"
                    >
                      Add to Bag
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
