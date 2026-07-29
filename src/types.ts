export interface Product {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Hats' | 'Hoodies' | 'T-Shirts' | 'Jackets' | 'Accessories';
  gender: 'Men' | 'Women' | 'Unisex';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  colorOptions: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  features: string[];
  materials: string;
  careInstructions: string;
  story: string;
  inStock: boolean;
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  usaStateOfOrigin: string; // e.g., "Texas", "North Carolina", "California", "Michigan"
  sku: string;
  weight: string;
}

export interface CartItem {
  product: Product;
  selectedColor: { name: string; hex: string };
  selectedSize: string;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userCity: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

export interface FilterState {
  category: string;
  gender: string;
  size: string;
  color: string;
  priceRange: [number, number];
  isNewOnly: boolean;
  isBestSellerOnly: boolean;
  searchQuery: string;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';
  usaState: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'In Transit';
  trackingNumber: string;
  carrier: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethod: string;
}

export type PageTab = 
  | 'home'
  | 'shop'
  | 'men'
  | 'women'
  | 'accessories'
  | 'story'
  | 'made-in-usa'
  | 'blog'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'shipping'
  | 'returns'
  | 'terms'
  | 'account'
  | 'admin'
  | 'checkout'
  | 'product-detail';
