import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface MiniCartProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscount: number) => void;
}

export const MiniCart: React.FC<MiniCartProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const FREE_SHIPPING_THRESHOLD = 150;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.07;
  const total = subtotal - discountAmount + shipping + estimatedTax;

  const progressToFreeShipping = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    const code = promoCode.trim().toUpperCase();
    if (code === 'USA10' || code === 'LIBERTY10') {
      setDiscountPercent(10);
      setPromoSuccess('10% USA Patriot Discount Applied!');
    } else if (code === 'HERITAGE20') {
      setDiscountPercent(20);
      setPromoSuccess('20% Heritage Collector Discount Applied!');
    } else {
      setPromoError('Invalid coupon code. Try "USA10" or "HERITAGE20"');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A2342] border-l border-[#1E3A5F] text-white flex flex-col shadow-2xl">
          
          {/* Header */}
          <div className="p-5 bg-[#07172B] border-b border-[#1E3A5F] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#B22234] flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-serif-display text-lg font-bold">Shopping Bag</h2>
                <p className="text-[10px] text-slate-400">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
              </div>
            </div>

            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[#0D284B] p-3 border-b border-[#1C3E6B] text-xs">
            {remainingForFreeShipping > 0 ? (
              <p className="text-slate-300 font-medium mb-1.5 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-400" />
                Add <span className="font-bold text-white">${remainingForFreeShipping.toFixed(2)}</span> more for FREE Domestic Shipping!
              </p>
            ) : (
              <p className="text-emerald-300 font-bold mb-1.5 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                ✓ Congratulations! You unlocked FREE Standard Shipping!
              </p>
            )}
            <div className="w-full bg-[#071322] h-2 rounded-full overflow-hidden border border-[#1E3A5F]">
              <div
                className="bg-gradient-to-r from-amber-400 to-[#B22234] h-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#122E54] border border-[#224A7A] flex items-center justify-center mx-auto text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif-display text-lg font-bold text-white">Your bag is empty</h3>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Explore our 100% Made in the USA collection and discover timeless American craftsmanship.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#B22234] hover:bg-red-700 text-white font-semibold text-xs rounded-xl shadow"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div key={index} className="flex gap-4 p-3 rounded-xl bg-[#071322] border border-[#1C3A63]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg border border-[#1E3A5F]"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-display text-sm font-bold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-slate-500 hover:text-red-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-400 mt-1 space-y-0.5">
                        <p>Size: <span className="text-white font-medium">{item.selectedSize}</span> | Color: <span className="text-white font-medium">{item.selectedColor.name}</span></p>
                        <p className="text-red-400 font-semibold">🇺🇸 {item.product.usaStateOfOrigin}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center bg-[#0F2848] border border-[#1E3E69] rounded-lg text-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, Math.max(1, item.quantity - 1))}
                          className="px-2 py-1 text-slate-300 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-1 font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-1 text-slate-300 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif-display font-bold text-sm text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Promo Form */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#07172B] border-t border-[#1C3A63] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. USA10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-[#122A4A] border border-[#224A7A] rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#1C3E6B] hover:bg-[#B22234] text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoError && <p className="text-[10px] text-red-400">{promoError}</p>}
              {promoSuccess && <p className="text-[10px] text-emerald-400 font-semibold">{promoSuccess}</p>}

              {/* Totals Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300 border-t border-[#1A3352] pt-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Patriot Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Domestic Shipping</span>
                  <span className="text-white font-medium">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (7%)</span>
                  <span className="text-white font-medium">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-[#1C3A63] font-serif-display">
                  <span>Total</span>
                  <span className="text-amber-300">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout(discountAmount);
                }}
                className="w-full py-3 bg-[#B22234] hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 group"
              >
                Proceed to Secure Checkout
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
