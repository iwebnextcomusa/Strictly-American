import React from 'react';
import { X, SlidersHorizontal, ShoppingBag, Trash2, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  comparedProducts: Product[];
  onRemoveCompare: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  comparedProducts,
  onRemoveCompare,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#0A2342] border border-[#1E3A5F] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col text-white">
        
        {/* Header */}
        <div className="p-5 bg-[#07172B] border-b border-[#1E3A5F] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif-display text-lg font-bold">Product Comparison Matrix</h2>
              <p className="text-[10px] text-slate-400">Comparing {comparedProducts.length} items side-by-side</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="flex-1 overflow-x-auto p-6">
          {comparedProducts.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <SlidersHorizontal className="w-12 h-12 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-300">No products selected for comparison yet.</p>
              <p className="text-xs text-slate-500">Click the sliders icon on any product card to compare specs.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comparedProducts.map((prod) => (
                <div key={prod.id} className="bg-[#071322] border border-[#1C3A63] rounded-xl p-4 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="relative h-48 rounded-lg overflow-hidden mb-3 border border-[#1E3A5F]">
                      <img src={prod.images[0]} alt={prod.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <button
                        onClick={() => onRemoveCompare(prod.id)}
                        className="absolute top-2 right-2 p-1.5 bg-black/70 hover:bg-red-600 rounded-full text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <span className="text-[10px] uppercase font-bold text-red-400 tracking-wider block mb-1">
                      {prod.category}
                    </span>

                    <h3 className="font-serif-display font-bold text-base text-white mb-2">
                      {prod.name}
                    </h3>

                    <div className="space-y-2 text-xs border-t border-[#1C3A63] pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Price:</span>
                        <span className="font-bold text-amber-300">${prod.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Rating:</span>
                        <span className="flex items-center gap-1 text-white"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {prod.rating}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Domestic Origin:</span>
                        <span className="text-emerald-400 font-semibold">🇺🇸 {prod.usaStateOfOrigin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Materials:</span>
                        <span className="text-slate-200 text-right truncate max-w-[140px]">{prod.materials}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Weight:</span>
                        <span className="text-slate-200">{prod.weight}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddToCart(prod)}
                    className="w-full py-2.5 bg-[#B22234] hover:bg-red-700 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
