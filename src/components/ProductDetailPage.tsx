import React, { useState } from 'react';
import { Star, ShieldCheck, Truck, RotateCcw, Heart, ShoppingBag, Share2, MapPin, Award, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import { Product, Review } from '../types';
import { FEATURED_REVIEWS } from '../data/reviews';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, size: string, colorName: string, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onToggleCompare,
  isCompared,
  onSelectProduct,
  onQuickView
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'story' | 'materials' | 'reviews'>('story');

  // New review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState<Review[]>(
    FEATURED_REVIEWS.filter(r => r.productId === product.id || r.productId === 'sa-001')
  );
  const [submittedReview, setSubmittedReview] = useState(false);

  const relatedProducts = allProducts.filter(p => p.id !== product.id && (p.category === product.category || p.gender === product.gender)).slice(0, 3);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (reviewName && reviewComment) {
      const newRev: Review = {
        id: Date.now().toString(),
        productId: product.id,
        userName: reviewName,
        userCity: reviewCity || 'USA Verified Buyer',
        rating: reviewRating,
        title: reviewTitle || 'Outstanding Quality',
        comment: reviewComment,
        date: 'Just now',
        verified: true
      };
      setReviewsList([newRev, ...reviewsList]);
      setSubmittedReview(true);
      setReviewName('');
      setReviewCity('');
      setReviewTitle('');
      setReviewComment('');
    }
  };

  return (
    <div className="py-12 bg-[#071322] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Main Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative h-[480px] sm:h-[560px] w-full rounded-2xl overflow-hidden border border-[#1E3A5F] bg-[#0A2342] shadow-2xl">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="bg-[#B22234] text-white text-xs font-bold px-3 py-1 rounded-full shadow flex items-center gap-1.5">
                  <span>🇺🇸</span> 100% Made in {product.usaStateOfOrigin}
                </span>
                {product.isBestSeller && (
                  <span className="bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow">
                    Best Seller
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-4 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === i ? 'border-[#B22234] scale-105' : 'border-[#1E3A5F] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column Product Details */}
          <div className="lg:col-span-5 bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="uppercase tracking-widest text-[#B22234] font-bold">
                  SKU: {product.sku} • {product.gender}
                </span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span className="font-bold text-sm text-white">{product.rating.toFixed(1)}</span>
                  <span className="text-slate-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif-display text-3xl font-bold text-white mb-3 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-white font-serif-display">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-base text-slate-400 line-through">${product.originalPrice}</span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-sans-clean leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Swatches */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-300 block mb-2">
                Color Option: <span className="text-white font-normal">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap items-center gap-3">
                {product.colorOptions.map((c, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-all ${
                      selectedColor === c.name
                        ? 'border-[#B22234] bg-[#16365E] text-white shadow'
                        : 'border-[#1E3A5F] bg-[#071322] text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-slate-600" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="text-xs uppercase font-bold text-slate-300 block mb-2">
                Select Size: <span className="text-white font-normal">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-12 h-11 rounded-xl text-xs font-bold border transition-all ${
                      selectedSize === s
                        ? 'bg-[#B22234] border-[#B22234] text-white shadow'
                        : 'bg-[#071322] border-[#1E3A5F] text-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity & Inventory */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <span className="text-xs uppercase font-bold text-slate-300">Quantity:</span>
                <div className="flex items-center bg-[#071322] border border-[#1E3A5F] rounded-lg text-xs">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 text-slate-300 hover:text-white">-</button>
                  <span className="px-3 py-1.5 font-bold text-white">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 text-slate-300 hover:text-white">+</button>
                </div>
              </div>

              <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800">
                ✓ {product.stockCount} In Stock
              </span>
            </div>

            {/* Add To Bag Actions */}
            <div className="space-y-3 pt-4 border-t border-[#1C3A63]">
              <div className="flex gap-3">
                <button
                  onClick={() => onAddToCart(product, selectedSize, selectedColor, quantity)}
                  className="flex-1 py-3.5 bg-[#B22234] hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag (${product.price * quantity})
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isWishlisted ? 'bg-[#B22234] border-[#B22234] text-white' : 'bg-[#071322] border-[#1E3A5F] text-slate-300'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Shipping Estimate & Guarantee Bar */}
              <div className="bg-[#071322] p-4 rounded-xl border border-[#1E3A5F] text-xs space-y-2 text-slate-300">
                <div className="flex items-center gap-2 text-white font-semibold">
                  <Truck className="w-4 h-4 text-amber-400" /> Free Domestic Shipping over $150
                </div>
                <p className="text-[11px] text-slate-400">Estimated delivery: 3-5 business days via USPS Priority Mail or FedEx Ground.</p>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs Section */}
        <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-8">
          
          <div className="flex border-b border-[#1E3A5F] gap-8">
            <button
              onClick={() => setActiveTab('story')}
              className={`pb-4 text-sm font-serif-display font-bold border-b-2 transition-colors ${
                activeTab === 'story' ? 'border-[#B22234] text-white' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Heritage & Craft Story
            </button>
            <button
              onClick={() => setActiveTab('materials')}
              className={`pb-4 text-sm font-serif-display font-bold border-b-2 transition-colors ${
                activeTab === 'materials' ? 'border-[#B22234] text-white' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Materials & Care Specs
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-4 text-sm font-serif-display font-bold border-b-2 transition-colors ${
                activeTab === 'reviews' ? 'border-[#B22234] text-white' : 'border-transparent text-slate-400 hover:text-white'
              }`}
            >
              Customer Reviews ({reviewsList.length})
            </button>
          </div>

          {activeTab === 'story' && (
            <div className="space-y-4 max-w-3xl">
              <h3 className="font-serif-display text-xl font-bold text-white">Behind the Stitches</h3>
              <p className="text-sm text-slate-300 font-sans-clean leading-relaxed">
                {product.story}
              </p>
              <ul className="space-y-2 pt-2 text-xs text-slate-200">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'materials' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-slate-300">
              <div className="bg-[#071322] p-5 rounded-xl border border-[#1E3A5F] space-y-2">
                <h4 className="font-bold text-white text-sm">Fabric Composition</h4>
                <p>{product.materials}</p>
                <p className="text-slate-400">Weight: {product.weight}</p>
              </div>
              <div className="bg-[#071322] p-5 rounded-xl border border-[#1E3A5F] space-y-2">
                <h4 className="font-bold text-white text-sm">Care Instructions</h4>
                <p>{product.careInstructions}</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              
              {/* Review List */}
              <div className="space-y-4">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="bg-[#071322] border border-[#1E3A5F] p-5 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{rev.userName}</span>
                        <span className="text-slate-400">({rev.userCity})</span>
                        {rev.verified && <span className="text-emerald-400 text-[10px] bg-emerald-950 px-2 py-0.5 rounded font-semibold">Verified Buyer</span>}
                      </div>
                      <div className="flex text-amber-400">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <h5 className="font-serif-display font-bold text-white text-sm">{rev.title}</h5>
                    <p className="text-slate-300">{rev.comment}</p>
                  </div>
                ))}
              </div>

              {/* Submit Review Form */}
              <div className="bg-[#07172B] p-6 rounded-xl border border-[#1E3A5F] space-y-4 max-w-2xl">
                <h4 className="font-serif-display font-bold text-base text-white">Write a Verified Buyer Review</h4>
                {submittedReview ? (
                  <p className="text-emerald-400 text-xs font-semibold">Thank you! Your review has been added.</p>
                ) : (
                  <form onSubmit={handleAddReview} className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="bg-[#071322] border border-[#1E3A5F] rounded-lg p-2.5 text-white"
                      />
                      <input
                        type="text"
                        placeholder="City, State (e.g. Austin, TX)"
                        value={reviewCity}
                        onChange={(e) => setReviewCity(e.target.value)}
                        className="bg-[#071322] border border-[#1E3A5F] rounded-lg p-2.5 text-white"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Review Headline"
                      value={reviewTitle}
                      onChange={(e) => setReviewTitle(e.target.value)}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-lg p-2.5 text-white"
                    />
                    <textarea
                      required
                      rows={3}
                      placeholder="Share your experience regarding craftsmanship, fit, and feel..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-lg p-2.5 text-white"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#B22234] text-white font-semibold rounded-lg text-xs"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="space-y-8 pt-8">
            <h2 className="font-serif-display text-2xl font-bold text-white text-center">
              You May Also Appreciate
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={isWishlisted}
                  onToggleCompare={onToggleCompare}
                  isCompared={isCompared}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
