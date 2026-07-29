import React from 'react';
import { Star, Heart, Eye, ShoppingBag, SlidersHorizontal, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size?: string, colorName?: string) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared,
  onSelectProduct
}) => {
  return (
    <div className="group relative bg-white border border-[#0A2342]/10 rounded-xl overflow-hidden shadow-sm hover:border-[#B22234] hover:shadow-md transition-all duration-300 flex flex-col h-full">
      
      {/* Top Badges */}
      <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1 items-start">
          {product.isNew && (
            <span className="bg-[#B22234] text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">
              New Release
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#0A2342] text-white text-[9px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full shadow-sm">
              Best Seller
            </span>
          )}
        </div>

        {/* Made in USA State Tag */}
        <span className="bg-white/90 backdrop-blur-md text-[#0A2342] text-[9px] uppercase tracking-wider font-bold px-2.5 py-0.5 rounded-full border border-[#0A2342]/10 flex items-center gap-1 shadow-sm">
          <span>🇺🇸</span> {product.usaStateOfOrigin}
        </span>
      </div>

      {/* Image Container */}
      <div 
        onClick={() => onSelectProduct(product)}
        className="relative h-72 w-full overflow-hidden bg-[#E8E6E3] cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Hover Image Overlay if multiple images exist */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate`}
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Floating Quick Action Overlay */}
        <div className="absolute inset-x-0 bottom-3 px-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="flex-1 py-2 bg-[#0A2342] hover:bg-[#B22234] text-white text-[10px] uppercase tracking-widest font-bold rounded shadow flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
            className={`p-2 rounded shadow transition-colors ${
              isWishlisted ? 'bg-[#B22234] text-white' : 'bg-white hover:bg-[#F3F1EF] text-[#0A2342]'
            }`}
            title="Add to Wishlist"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onToggleCompare(product); }}
            className={`p-2 rounded shadow transition-colors ${
              isCompared ? 'bg-[#0A2342] text-white' : 'bg-white hover:bg-[#F3F1EF] text-[#0A2342]'
            }`}
            title="Compare Item"
          >
            {isCompared ? <Check className="w-4 h-4" /> : <SlidersHorizontal className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#0A2342]/60 mb-1">
            <span className="uppercase tracking-[0.15em] text-[10px] font-bold text-[#0A2342]/60">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span className="font-bold text-xs text-[#0A2342]">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-[#0A2342]/50">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelectProduct(product)}
            className="font-serif text-lg italic text-[#0A2342] group-hover:text-[#B22234] transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Color Options Swatches */}
          <div className="flex items-center gap-1.5 mt-2">
            {product.colorOptions.map((c, i) => (
              <span
                key={i}
                className="w-3 h-3 rounded-full border border-[#0A2342]/20 inline-block"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Footer Price & Add To Cart Button */}
        <div className="pt-3 border-t border-[#0A2342]/10 flex items-center justify-between">
          <div>
            <span className="text-base font-bold text-[#B22234] font-serif tracking-normal">
              ${product.price}.00
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#0A2342]/40 line-through ml-2">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="px-3.5 py-1.5 bg-[#0A2342] hover:bg-[#B22234] text-white text-[10px] uppercase tracking-widest font-bold rounded transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add
          </button>
        </div>

      </div>

    </div>
  );
};
