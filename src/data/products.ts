import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'sa-001',
    name: "The Patriot's Heavyweight Oxford Shirt",
    category: 'Men',
    gender: 'Men',
    price: 148,
    originalPrice: 175,
    rating: 4.9,
    reviewsCount: 124,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=80'
    ],
    colorOptions: [
      { name: 'Patriot Navy', hex: '#0A2342' },
      { name: 'Classic White', hex: '#FFFFFF' },
      { name: 'Heritage Blue', hex: '#2A4B7C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Crafted from 100% long-staple Texas organic cotton, this button-down oxford combines rugged American durability with refined sartorial elegance. Woven on historic shuttle looms in North Carolina.",
    features: [
      "100% Texas Long-Staple Organic Cotton",
      "Woven on vintage shuttle looms in North Carolina",
      "Genuine American mother-of-pearl buttons",
      "Double-stitched stress seams for a lifetime of wear",
      "Preshrunk fabric with tailored athletic cut"
    ],
    materials: "100% Heavyweight Organic Cotton (8 oz per sq yard)",
    careInstructions: "Machine wash cold with like colors. Hang dry or tumble dry low. Warm iron if needed.",
    story: "Every thread in this oxford represents our commitment to domestic revitalisation. Grown under the West Texas sun, ginned locally, and stitched by master tailors in Raleigh, NC.",
    inStock: true,
    stockCount: 42,
    isNew: true,
    isBestSeller: true,
    usaStateOfOrigin: "North Carolina & Texas",
    sku: "SA-OXF-001",
    weight: "0.85 lbs"
  },
  {
    id: 'sa-002',
    name: "Liberty Raw Selvage Denim Jacket",
    category: 'Jackets',
    gender: 'Men',
    price: 298,
    originalPrice: 340,
    rating: 5.0,
    reviewsCount: 88,
    images: [
      'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=1000&q=80'
    ],
    colorOptions: [
      { name: 'Raw Indigo', hex: '#1C2833' },
      { name: 'Washed Hickory', hex: '#34495E' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: "An iconic silhouette crafted from 14.5oz custom-loomed selvage denim. Hand-cut and sewn in Los Angeles with heavy brass hardware forged in Connecticut.",
    features: [
      "14.5 oz American Ring-Spun Selvage Denim",
      "Solid brass buttons custom cast in CT",
      "Red-line selvage ID on inner button placket",
      "Dual interior concealment pockets",
      "Reinforced copper riveted stress points"
    ],
    materials: "100% USA Cotton Selvage Denim",
    careInstructions: "Wear hard. Wash sparingly in cold water, turned inside out. Line dry.",
    story: "Built in memory of California's historic garment district. Each jacket develops a unique patina personal to your journey over years of continuous wear.",
    inStock: true,
    stockCount: 28,
    isBestSeller: true,
    usaStateOfOrigin: "California",
    sku: "SA-JKT-002",
    weight: "2.4 lbs"
  },
  {
    id: 'sa-003',
    name: "Heritage American Flag Crest Hoodie",
    category: 'Hoodies',
    gender: 'Unisex',
    price: 168,
    originalPrice: 195,
    rating: 4.8,
    reviewsCount: 210,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80'
    ],
    colorOptions: [
      { name: 'Strictly Navy', hex: '#0A2342' },
      { name: 'Crimson Red', hex: '#B22234' },
      { name: 'Heather Grey', hex: '#808B96' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "Ultra-heavyweight 18oz fleece hoodie knit in Pennsylvania. Features an intricately embroidered tonal American Flag patch crafted in Massachusetts.",
    features: [
      "18oz Heavyweight French Terry Fleece",
      "Double-lined hood with braided cotton drawstrings",
      "Ribbed side gussets for enhanced mobility",
      "High-density embroidery made in Boston, MA",
      "Kangaroo pocket with concealed interior key slot"
    ],
    materials: "90% USA Cotton, 10% USA Polyester",
    careInstructions: "Machine wash cold with like colors. Tumble dry medium.",
    story: "Knit in the historic textile mills of Eastern Pennsylvania using ring-spun yarns that offer warmth against harsh winter winds without sacrificing softness.",
    inStock: true,
    stockCount: 65,
    isNew: true,
    isBestSeller: true,
    usaStateOfOrigin: "Pennsylvania & Massachusetts",
    sku: "SA-HD-003",
    weight: "1.8 lbs"
  },
  {
    id: 'sa-004',
    name: "Freedom Tailored Wool Blazer",
    category: 'Women',
    gender: 'Women',
    price: 398,
    originalPrice: 450,
    rating: 4.9,
    reviewsCount: 46,
    images: [
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80'
    ],
    colorOptions: [
      { name: 'Navy Houndstooth', hex: '#1B2631' },
      { name: 'Charcoal Tweed', hex: '#2C3E50' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: "A commanding yet feminine blazer crafted from 100% fine American merino wool spun in Vermont. Fully lined in silk-blend satin with tailored notch lapels.",
    features: [
      "100% Vermont Virgin Merino Wool",
      "Hand-finished horn buttons from Maine",
      "Breathable silk-blend inner lining",
      "Structured shoulder architecture and slim waist contour",
      "Internal passport and phone pockets"
    ],
    materials: "100% Virgin Merino Wool Outer, 100% Bemberg Lining",
    careInstructions: "Dry clean only by environmentally conscious specialists.",
    story: "Spun in Vermont from sheep raised in the Green Mountains, this garment is hand-stitched in New York's garment district to empower women with timeless American style.",
    inStock: true,
    stockCount: 18,
    isNew: true,
    isBestSeller: false,
    usaStateOfOrigin: "Vermont & New York",
    sku: "SA-WZ-004",
    weight: "1.6 lbs"
  },
  {
    id: 'sa-005',
    name: "1776 Leather-Brim Wool Cap",
    category: 'Hats',
    gender: 'Unisex',
    price: 68,
    originalPrice: 85,
    rating: 4.9,
    reviewsCount: 312,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1521369984125-a4de2c421f72?auto=format&fit=crop&w=1000&q=80'
    ],
    colorOptions: [
      { name: 'Navy / Brown Leather', hex: '#0A2342' },
      { name: 'Charcoal / Dark Tan', hex: '#212F3D' }
    ],
    sizes: ['One Size (Adjustable)'],
    description: "Classic 6-panel ball cap made with structured melton wool and a full-grain Horween leather brim from Chicago. Finished with antique brass brass buckle slider.",
    features: [
      "Heavyweight American Melton Wool Crown",
      "Full-grain Horween Leather brim from Chicago, IL",
      "Custom stamped brass adjustment clasp",
      "Interior moisture-wicking headband",
      "Subtle '100% USA Made' debossed internal tag"
    ],
    materials: "80% USA Wool, 20% USA Nylon, 100% Horween Leather",
    careInstructions: "Spot clean only with soft damp cloth.",
    story: "Crafted in Texas in a family-owned cap facility operating since 1948. Uses Chicago's premier Horween leather for an unbeatable touch of luxury.",
    inStock: true,
    stockCount: 110,
    isBestSeller: true,
    usaStateOfOrigin: "Illinois & Texas",
    sku: "SA-HAT-005",
    weight: "0.4 lbs"
  },
  {
    id: 'sa-006',
    name: "The Pioneer Heavyweight Graphic Tee",
    category: 'T-Shirts',
    gender: 'Unisex',
    price: 62,
    originalPrice: 75,
    rating: 4.7,
    reviewsCount: 180,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=1000&q=80'
    ],
    colorOptions: [
      { name: 'Vintage Off-White', hex: '#F5F2EB' },
      { name: 'Deep Navy', hex: '#0A2342' },
      { name: 'Washed Black', hex: '#1C1C1C' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: "7.5oz combed cotton shirt screen-printed with eco-friendly water-based inks depicting the iconic American Bald Eagle and 100% Made in USA insignia.",
    features: [
      "7.5 oz Heavyweight Combed Ring-Spun Cotton",
      "Seamless collar and taped neck/shoulders",
      "Hand-screened in Tennessee with water-based non-toxic inks",
      "Garment-dyed for vintage softness",
      "Reinforced tubular knit construction"
    ],
    materials: "100% USA Grown Organic Cotton",
    careInstructions: "Machine wash cold inside out. Tumble dry low.",
    story: "Sourced from smallholder organic farms across Georgia, spun in South Carolina, and hand-printed in Nashville, Tennessee.",
    inStock: true,
    stockCount: 95,
    isNew: false,
    isBestSeller: true,
    usaStateOfOrigin: "Tennessee & Georgia",
    sku: "SA-TEE-006",
    weight: "0.5 lbs"
  },
  {
    id: 'sa-007',
    name: "American Heritage Cable Knit Sweater",
    category: 'Women',
    gender: 'Women',
    price: 248,
    originalPrice: 280,
    rating: 5.0,
    reviewsCount: 64,
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1574201635302-388dd92a4c3f?auto=format&fit=crop&w=1000&q=80'
    ],
    colorOptions: [
      { name: 'Cream White', hex: '#FFFDD0' },
      { name: 'Patriot Red', hex: '#B22234' },
      { name: 'Midnight Blue', hex: '#0A2342' }
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    description: "A lush, thick cable knit sweater knitted from organic cotton-cashmere blend in Maine. Designed with raglan sleeves and a relaxed yet elegant drape.",
    features: [
      "90% USA Cotton, 10% Domestic Alpaca Cashmere Blend",
      "Intricate hand-guided cable lattice stitching",
      "Ribbed crew collar and cuffs",
      "Naturally insulating and exceptionally soft against skin"
    ],
    materials: "90% Organic USA Cotton, 10% Domestic Alpaca Wool",
    careInstructions: "Hand wash cold or dry clean. Lay flat to dry.",
    story: "Crafted along the rocky coast of Maine by generational artisans, bringing warmth and enduring beauty to crisp autumn and winter days.",
    inStock: true,
    stockCount: 22,
    isNew: true,
    isBestSeller: false,
    usaStateOfOrigin: "Maine",
    sku: "SA-SWT-007",
    weight: "1.4 lbs"
  },
  {
    id: 'sa-008',
    name: "Detroit Leathercraft Pioneer Belt",
    category: 'Accessories',
    gender: 'Unisex',
    price: 98,
    originalPrice: 120,
    rating: 4.9,
    reviewsCount: 142,
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80'
    ],
    colorOptions: [
      { name: 'Bourbon Tan', hex: '#8B4513' },
      { name: 'Heritage Black', hex: '#1C1C1C' }
    ],
    sizes: ['32', '34', '36', '38', '40'],
    description: "Hand-cut 1.5-inch full-grain bridle leather strap finished with burnished edges and a heavy solid brass roller buckle.",
    features: [
      "10-12 oz Full-Grain American Steerhide Leather",
      "Solid brass roller buckle with Chicago screw fasteners",
      "Hand-waxed and hand-burnished edges",
      "Guaranteed for life under normal wear"
    ],
    materials: "100% US Steerhide Leather, Solid Cast Brass",
    careInstructions: "Condition with natural leather balm once a year.",
    story: "Cut and bevelled in Detroit, Michigan by master leatherworkers dedicated to reviving Motor City's craft heritage.",
    inStock: true,
    stockCount: 50,
    isBestSeller: true,
    usaStateOfOrigin: "Michigan",
    sku: "SA-ACC-008",
    weight: "0.6 lbs"
  }
];
