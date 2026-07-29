import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, colorName: string, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onGoToDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onGoToDetail
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#0A2342] border border-[#1E3A5F] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column Image Gallery */}
        <div className="md:w-1/2 p-6 bg-[#071322] flex flex-col justify-between">
          <div className="relative h-72 sm:h-80 w-full rounded-xl overflow-hidden mb-4 border border-[#1E3A5F]">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <span className="absolute top-3 left-3 bg-[#B22234] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow">
              🇺🇸 {product.usaStateOfOrigin}
            </span>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImage === i ? 'border-[#B22234]' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column Product Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
          
          <div>
            {/* Header Category & Rating */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="uppercase tracking-widest text-[#B22234] font-bold">
                {product.category} • {product.gender}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-sm text-white">{product.rating.toFixed(1)}</span>
                <span className="text-slate-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="font-serif-display text-2xl font-bold text-white mb-2">
              {product.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-white font-serif-display">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
              )}
              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                In Stock ({product.stockCount} available)
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-sans-clean leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-4">
              <label className="text-xs uppercase font-bold text-slate-300 block mb-2">
                Color: <span className="text-white font-normal">{selectedColor}</span>
              </label>
              <div className="flex items-center gap-3">
                {product.colorOptions.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(color.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedColor === color.name
                        ? 'border-[#B22234] bg-[#16365E] text-white shadow'
                        : 'border-[#1E3A5F] bg-[#071322] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-slate-600" style={{ backgroundColor: color.hex }} />
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="text-xs uppercase font-bold text-slate-300 block mb-2">
                Size: <span className="text-white font-normal">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap items-center gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-11 h-10 rounded-lg text-xs font-bold border transition-all ${
                      selectedSize === size
                        ? 'bg-[#B22234] border-[#B22234] text-white shadow'
                        : 'bg-[#071322] border-[#1E3A5F] text-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs uppercase font-bold text-slate-300">Quantity:</span>
              <div className="flex items-center bg-[#071322] border border-[#1E3A5F] rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-300 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 py-1.5 text-xs font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-300 hover:text-white"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-[#1C3A63]">
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                className="flex-1 py-3 bg-[#B22234] hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-[#B22234] border-[#B22234] text-white'
                    : 'bg-[#071322] border-[#1E3A5F] text-slate-300 hover:text-white'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            <button
              onClick={() => {
                onClose();
                onGoToDetail(product);
              }}
              className="w-full py-2 text-center text-xs text-slate-400 hover:text-white font-medium flex items-center justify-center gap-1"
            >
              View Full Product Story & Materials Specs <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
