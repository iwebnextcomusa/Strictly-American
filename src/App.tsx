import React, { useState } from 'react';
import { PageTab, Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './data/products';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { ProductCard } from './components/ProductCard';
import { ThreeDSection } from './components/ThreeDSection';
import { WhyBuyAmerican } from './components/WhyBuyAmerican';
import { LifestyleSection } from './components/LifestyleSection';
import { QuickViewModal } from './components/QuickViewModal';
import { MiniCart } from './components/MiniCart';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CompareModal } from './components/CompareModal';

import { ShopPage } from './components/ShopPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { MadeInUSAPage } from './components/MadeInUSAPage';
import { StoryPage } from './components/StoryPage';
import { BlogPage } from './components/BlogPage';
import { ContactPage } from './components/ContactPage';
import { FAQPage } from './components/FAQPage';
import { PolicyPages } from './components/PolicyPages';
import { CheckoutPage } from './components/CheckoutPage';
import { AccountDashboard } from './components/AccountDashboard';
import { AdminDashboard } from './components/AdminDashboard';

import { AIChatbot } from './components/AIChatbot';
import { ScrollToTop } from './components/ScrollToTop';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['sa-001']);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  
  // Modals & Drawers
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Filters passed from Home/Header
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');
  const [selectedGenderFilter, setSelectedGenderFilter] = useState('All');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Navigation Helper
  const handleNavigate = (tab: PageTab, categoryFilter = 'All', genderFilter = 'All') => {
    setActiveTab(tab);
    setSelectedCategoryFilter(categoryFilter);
    setSelectedGenderFilter(genderFilter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (product: Product, size?: string, colorName?: string, quantity: number = 1) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = product.colorOptions.find(c => c.name === colorName) || product.colorOptions[0] || { name: 'Standard', hex: '#0A2342' };

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id && item.selectedSize === chosenSize && item.selectedColor.name === chosenColor.name);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize: chosenSize, selectedColor: chosenColor }];
      }
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (index: number, quantity: number) => {
    setCart(prev => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // Wishlist operations
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Compare operations
  const handleToggleCompare = (product: Product) => {
    setComparedProducts(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) {
        return prev.filter(p => p.id !== product.id);
      } else {
        if (prev.length >= 3) {
          alert('You can compare up to 3 items at a time.');
          return prev;
        }
        setIsCompareOpen(true);
        return [...prev, product];
      }
    });
  };

  // Product detail view trigger
  const handleSelectProduct = (product: Product) => {
    setSelectedProductDetail(product);
    setActiveTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin handlers
  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#0A2342] flex flex-col font-sans-clean selection:bg-[#B22234] selection:text-white">
      
      {/* Main Header Component */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        compareCount={comparedProducts.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenCompare={() => setIsCompareOpen(true)}
        products={products}
        onSelectProduct={handleSelectProduct}
      />

      {/* Main Page Router */}
      <main className="flex-1">
        
        {/* HOME PAGE */}
        {activeTab === 'home' && (
          <>
            <HeroSection onNavigate={handleNavigate} />
            
            <FeaturedCategories
              onSelectCategory={(catFilter, targetTab) => {
                if (targetTab) {
                  handleNavigate(targetTab, catFilter);
                } else {
                  handleNavigate('shop', catFilter);
                }
              }}
            />

            {/* Featured Best Sellers Section */}
            <section className="py-20 bg-[#F3F1EF] border-b border-[#0A2342]/10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-[0.3em] text-[#B22234] font-bold block mb-2">
                      American Classics
                    </span>
                    <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0A2342] italic">
                      Best Sellers Collection
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigate('shop')}
                    className="text-xs font-semibold uppercase tracking-widest text-[#0A2342] hover:text-[#B22234] transition-colors"
                  >
                    Explore Entire Catalog →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {bestSellers.map((prod) => (
                    <ProductCard
                      key={prod.id}
                      product={prod}
                      onQuickView={(p) => setQuickViewProduct(p)}
                      onAddToCart={(p) => handleAddToCart(p)}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={wishlistIds.includes(prod.id)}
                      onToggleCompare={handleToggleCompare}
                      isCompared={comparedProducts.some(p => p.id === prod.id)}
                      onSelectProduct={handleSelectProduct}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Why Buy American Section */}
            <WhyBuyAmerican />

            {/* Lifestyle & Craftsmanship Gallery */}
            <LifestyleSection />
          </>
        )}

        {/* SHOP PAGE */}
        {(activeTab === 'shop' || activeTab === 'men' || activeTab === 'women' || activeTab === 'accessories') && (
          <ShopPage
            products={products}
            onQuickView={(p) => setQuickViewProduct(p)}
            onAddToCart={(p) => handleAddToCart(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onToggleCompare={handleToggleCompare}
            comparedProducts={comparedProducts}
            onSelectProduct={handleSelectProduct}
            initialCategory={selectedCategoryFilter}
            initialGender={activeTab === 'men' ? 'Men' : activeTab === 'women' ? 'Women' : selectedGenderFilter}
          />
        )}

        {/* PRODUCT DETAIL PAGE */}
        {activeTab === 'product-detail' && selectedProductDetail && (
          <ProductDetailPage
            product={selectedProductDetail}
            allProducts={products}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProductDetail.id)}
            onToggleCompare={handleToggleCompare}
            isCompared={comparedProducts.some(p => p.id === selectedProductDetail.id)}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {/* MADE IN USA PAGE */}
        {activeTab === 'made-in-usa' && <MadeInUSAPage />}

        {/* OUR STORY PAGE */}
        {activeTab === 'story' && <StoryPage />}

        {/* BLOG JOURNAL PAGE */}
        {activeTab === 'blog' && <BlogPage />}

        {/* CONTACT PAGE */}
        {activeTab === 'contact' && <ContactPage />}

        {/* FAQ PAGE */}
        {activeTab === 'faq' && <FAQPage />}

        {/* POLICY PAGES */}
        {activeTab === 'privacy' && <PolicyPages type="privacy" />}
        {activeTab === 'shipping' && <PolicyPages type="shipping" />}
        {activeTab === 'returns' && <PolicyPages type="returns" />}
        {activeTab === 'terms' && <PolicyPages type="terms" />}

        {/* CHECKOUT FLOW */}
        {activeTab === 'checkout' && (
          <CheckoutPage
            cart={cart}
            discountAmount={appliedDiscount}
            onClearCart={() => setCart([])}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {/* USER ACCOUNT DASHBOARD */}
        {activeTab === 'account' && (
          <AccountDashboard
            wishlistIds={wishlistIds}
            products={products}
            onAddToCart={(p) => handleAddToCart(p)}
          />
        )}

        {/* ADMIN CONTROL PANEL */}
        {activeTab === 'admin' && (
          <AdminDashboard
            products={products}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}

      </main>

      {/* Floating Interactive Elements */}
      <AIChatbot />
      <ScrollToTop />

      {/* Slide-over MiniCart Drawer */}
      <MiniCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(discount) => {
          setAppliedDiscount(discount);
          handleNavigate('checkout');
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p)}
        onQuickView={(p) => setQuickViewProduct(p)}
      />

      {/* Product Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        comparedProducts={comparedProducts}
        onRemoveCompare={(id) => setComparedProducts(prev => prev.filter(p => p.id !== id))}
        onAddToCart={(p) => handleAddToCart(p)}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onGoToDetail={(p) => handleSelectProduct(p)}
      />

      {/* Footer Component */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
};

export default App;
