import React, { useState } from 'react';
import { LayoutDashboard, Package, ShoppingCart, Tag, Plus, Trash2, DollarSign, Users, Flag, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';

interface AdminDashboardProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onAddProduct,
  onDeleteProduct
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'coupons'>('analytics');
  
  // Coupon generator state
  const [coupons, setCoupons] = useState([
    { code: 'USA10', discount: '10%', usageCount: 142, status: 'Active' },
    { code: 'HERITAGE20', discount: '20%', usageCount: 68, status: 'Active' }
  ]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [newCouponDiscount, setNewCouponDiscount] = useState('15');

  // Add product form state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState({
    name: 'New Patriotic Item',
    category: 'Men',
    gender: 'Men',
    price: 125,
    usaStateOfOrigin: 'North Carolina',
    materials: '100% Texas Organic Cotton',
    stockCount: 50,
    images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80']
  });

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCouponCode) {
      setCoupons([...coupons, {
        code: newCouponCode.toUpperCase(),
        discount: `${newCouponDiscount}%`,
        usageCount: 0,
        status: 'Active'
      }]);
      setNewCouponCode('');
    }
  };

  const handleCreateProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: `sa-${Date.now()}`,
      sku: `SA-PROD-${Math.floor(100 + Math.random() * 900)}`,
      name: newProd.name,
      category: newProd.category,
      gender: newProd.gender as any,
      price: Number(newProd.price),
      rating: 5.0,
      reviewsCount: 1,
      images: newProd.images,
      description: 'A newly added 100% Made in the USA product.',
      story: 'Crafted with premium domestic materials.',
      materials: newProd.materials,
      careInstructions: 'Machine wash cold with like colors.',
      weight: '12oz',
      usaStateOfOrigin: newProd.usaStateOfOrigin,
      colorOptions: [{ name: 'Navy', hex: '#0A2342' }],
      sizes: ['S', 'M', 'L', 'XL'],
      isNew: true,
      isBestSeller: false,
      inStock: true,
      stockCount: Number(newProd.stockCount),
      features: ['100% USA Made']
    };
    onAddProduct(created);
    setShowAddModal(false);
  };

  return (
    <div className="py-12 bg-[#071322] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Console Header */}
        <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <h1 className="font-serif-display text-2xl font-bold text-white">
                Strictly American Admin Control Console
              </h1>
            </div>
            <p className="text-xs text-slate-300">
              Manage domestic inventory, view live orders, track sales revenue, and issue coupons.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3.5 py-2 rounded-xl border font-semibold ${activeTab === 'analytics' ? 'bg-[#B22234] border-[#B22234]' : 'bg-[#071322] border-[#1E3A5F]'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-3.5 py-2 rounded-xl border font-semibold ${activeTab === 'products' ? 'bg-[#B22234] border-[#B22234]' : 'bg-[#071322] border-[#1E3A5F]'}`}
            >
              Inventory ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-3.5 py-2 rounded-xl border font-semibold ${activeTab === 'orders' ? 'bg-[#B22234] border-[#B22234]' : 'bg-[#071322] border-[#1E3A5F]'}`}
            >
              Order Logs
            </button>
            <button
              onClick={() => setActiveTab('coupons')}
              className={`px-3.5 py-2 rounded-xl border font-semibold ${activeTab === 'coupons' ? 'bg-[#B22234] border-[#B22234]' : 'bg-[#071322] border-[#1E3A5F]'}`}
            >
              Promotions
            </button>
          </div>
        </div>

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#0A2342] border border-[#1E3A5F] p-6 rounded-2xl shadow-xl space-y-1">
                <span className="text-xs text-slate-400 uppercase font-bold">Total Domestic Revenue</span>
                <p className="text-3xl font-serif-display font-bold text-amber-300">$148,920.00</p>
                <span className="text-[10px] text-emerald-400 font-semibold">+18.4% vs last month</span>
              </div>
              <div className="bg-[#0A2342] border border-[#1E3A5F] p-6 rounded-2xl shadow-xl space-y-1">
                <span className="text-xs text-slate-400 uppercase font-bold">Orders Processed</span>
                <p className="text-3xl font-serif-display font-bold text-white">1,240</p>
                <span className="text-[10px] text-emerald-400 font-semibold">100% Domestic USPS & FedEx</span>
              </div>
              <div className="bg-[#0A2342] border border-[#1E3A5F] p-6 rounded-2xl shadow-xl space-y-1">
                <span className="text-xs text-slate-400 uppercase font-bold">Active SKUs</span>
                <p className="text-3xl font-serif-display font-bold text-white">{products.length}</p>
                <span className="text-[10px] text-slate-400">Texas, NC, CA, PA Workshops</span>
              </div>
              <div className="bg-[#0A2342] border border-[#1E3A5F] p-6 rounded-2xl shadow-xl space-y-1">
                <span className="text-xs text-slate-400 uppercase font-bold">Top Buying State</span>
                <p className="text-3xl font-serif-display font-bold text-red-400">Texas & FL</p>
                <span className="text-[10px] text-slate-400">28% of total volume</span>
              </div>
            </div>
          </div>
        )}

        {/* Inventory Management Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="font-serif-display text-xl font-bold text-white">Product Catalog Management</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-[#B22234] hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New USA Item
              </button>
            </div>

            <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#07172B] text-slate-400 uppercase font-bold border-b border-[#1E3A5F]">
                    <tr>
                      <th className="p-4">Item</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Domestic Hub</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">In Stock</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E3A5F]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#071322]/50">
                        <td className="p-4 font-bold text-white flex items-center gap-3">
                          <img src={p.images[0]} alt="" className="w-10 h-12 object-cover rounded border border-[#1E3A5F]" referrerPolicy="no-referrer" />
                          <span>{p.name}</span>
                        </td>
                        <td className="p-4">{p.category} ({p.gender})</td>
                        <td className="p-4 text-emerald-400 font-semibold">🇺🇸 {p.usaStateOfOrigin}</td>
                        <td className="p-4 font-bold text-amber-300">${p.price}</td>
                        <td className="p-4 font-bold">{p.stockCount} units</td>
                        <td className="p-4">
                          <button
                            onClick={() => onDeleteProduct(p.id)}
                            className="p-1.5 bg-red-950 text-red-400 hover:bg-red-700 hover:text-white rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="font-serif-display text-xl font-bold text-white">Promotional Coupon Generator</h2>
            <form onSubmit={handleCreateCoupon} className="bg-[#0A2342] border border-[#1E3A5F] p-6 rounded-2xl space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FREEDOM15"
                    value={newCouponCode}
                    onChange={(e) => setNewCouponCode(e.target.value)}
                    className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Discount %</label>
                  <input
                    type="number"
                    required
                    value={newCouponDiscount}
                    onChange={(e) => setNewCouponDiscount(e.target.value)}
                    className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>
              <button type="submit" className="px-6 py-2.5 bg-[#B22234] text-white font-bold rounded-xl">
                Create Active Coupon
              </button>
            </form>

            <div className="bg-[#0A2342] border border-[#1E3A5F] p-6 rounded-2xl space-y-3">
              <h3 className="font-bold text-white text-sm">Active Promotion Codes</h3>
              {coupons.map((c, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-[#071322] rounded-xl text-xs">
                  <span className="font-mono font-bold text-amber-300">{c.code}</span>
                  <span className="text-white font-bold">{c.discount} Off</span>
                  <span className="text-slate-400">{c.usageCount} uses</span>
                  <span className="text-emerald-400 font-semibold">{c.status}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
            <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 max-w-md w-full space-y-4 text-xs text-white">
              <h3 className="font-serif-display font-bold text-lg">Add New 100% Made in USA Product</h3>
              <form onSubmit={handleCreateProductSubmit} className="space-y-3">
                <input
                  type="text"
                  required
                  placeholder="Product Title"
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-2.5"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    required
                    placeholder="Price ($)"
                    value={newProd.price}
                    onChange={(e) => setNewProd({ ...newProd, price: Number(e.target.value) })}
                    className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-2.5"
                  />
                  <input
                    type="number"
                    required
                    placeholder="Stock Count"
                    value={newProd.stockCount}
                    onChange={(e) => setNewProd({ ...newProd, stockCount: Number(e.target.value) })}
                    className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-2.5"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Domestic State of Origin (e.g. Texas)"
                  value={newProd.usaStateOfOrigin}
                  onChange={(e) => setNewProd({ ...newProd, usaStateOfOrigin: e.target.value })}
                  className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-2.5"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 py-2.5 bg-[#B22234] rounded-xl font-bold">Add Item</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2.5 bg-slate-700 rounded-xl">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
