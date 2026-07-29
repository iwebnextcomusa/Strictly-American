import React from 'react';
import { X, Heart, Trash2, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A2342] border-l border-[#1E3A5F] text-white flex flex-col shadow-2xl">
          
          <div className="p-5 bg-[#07172B] border-b border-[#1E3A5F] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#B22234] flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h2 className="font-serif-display text-lg font-bold">Saved Wishlist</h2>
                <p className="text-[10px] text-slate-400">{wishlistedProducts.length} items saved</p>
              </div>
            </div>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <Heart className="w-12 h-12 text-slate-600 mx-auto" />
                <h3 className="font-serif-display text-lg font-bold text-white">Your wishlist is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the heart icon on any 100% Made in USA product to save it for later.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((prod) => (
                <div key={prod.id} className="flex gap-4 p-3 rounded-xl bg-[#071322] border border-[#1C3A63] items-center">
                  <img src={prod.images[0]} alt={prod.name} className="w-16 h-20 object-cover rounded-lg" referrerPolicy="no-referrer" />
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-display text-sm font-bold text-white truncate">{prod.name}</h4>
                    <p className="text-xs text-slate-400 font-serif-display font-bold mt-0.5">${prod.price}</p>
                    <p className="text-[10px] text-red-400 font-semibold mt-0.5">🇺🇸 {prod.usaStateOfOrigin}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(prod)}
                      className="p-2 bg-[#B22234] hover:bg-red-700 text-white rounded-lg text-xs"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(prod.id)}
                      className="p-2 text-slate-500 hover:text-red-400 rounded-lg"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
