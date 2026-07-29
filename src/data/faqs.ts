export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    category: "Made in USA Certification",
    question: "Is every single component 100% Made in the USA?",
    answer: "Yes! At Strictly American, '100% Made in the USA' is our uncompromising standard. Our cotton is grown in Texas and Georgia, spun into yarn in South Carolina, woven in North Carolina, and cut and sewn in California, Pennsylvania, or Maine. Even our brass buttons, zippers, thread, and labels are domestically manufactured."
  },
  {
    category: "Shipping & Delivery",
    question: "How long does shipping take and what are the rates?",
    answer: "We offer FREE Standard Domestic Shipping on all US orders over $150. Standard shipping takes 3-5 business days via USPS Priority Mail or FedEx Ground. Expedited 2-Day Air shipping is available at checkout for $18."
  },
  {
    category: "Returns & Exchanges",
    question: "What is your return and exchange policy?",
    answer: "We stand behind the quality of every garment with our 30-Day Domestic Guarantee. If you are not completely satisfied with fit or feel, return or exchange unwashed, unworn items with tags attached within 30 days for a full refund or free size exchange."
  },
  {
    category: "Sizing & Fit",
    question: "How do Strictly American clothes fit?",
    answer: "Our menswear features a modern tailored fit—neither overly slim nor boxy. Our womenswear offers elegant, true-to-size structuring. Detailed size measurements are available on each product page with chest, sleeve, and shoulder dimensions."
  },
  {
    category: "Care & Maintenance",
    question: "How should I care for my raw selvage denim and oxford shirts?",
    answer: "For Oxford shirts and heavyweight tees, machine wash cold with like colors and line dry or tumble dry low. For raw selvage denim jackets, wear them for 3-6 months before first wash to establish natural fades, then hand-wash cold inside out."
  },
  {
    category: "Contact & Phone Support",
    question: "How can I speak with customer support directly?",
    answer: "Our American customer care team is located in California and available by phone at 530-249-1368 or by email at conquestgd@gmail.com Monday through Friday, 8:00 AM - 6:00 PM PST."
  }
];
