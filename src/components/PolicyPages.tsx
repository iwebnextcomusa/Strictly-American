import React from 'react';
import { Truck, RotateCcw, ShieldCheck, FileText } from 'lucide-react';

interface PolicyPageProps {
  type: 'privacy' | 'shipping' | 'returns' | 'terms';
}

export const PolicyPages: React.FC<PolicyPageProps> = ({ type }) => {
  const contentMap = {
    shipping: {
      icon: Truck,
      title: "Domestic Shipping Policy",
      subtitle: "Fast, reliable nationwide shipping via USPS Priority Mail and FedEx Ground.",
      body: [
        {
          heading: "Free Shipping Offer",
          text: "Strictly American offers FREE Standard Shipping on all domestic orders totaling $150 or more. Orders under $150 incur a flat-rate shipping fee of $15.00."
        },
        {
          heading: "Order Processing Time",
          text: "Every piece of apparel is inspected and packed at our California distribution hub. Orders placed before 2:00 PM PST Monday through Friday ship out the same business day."
        },
        {
          heading: "Delivery Options & Timelines",
          text: "• Standard Shipping (USPS / FedEx): 3–5 Business Days\n• Expedited Priority Shipping: 2 Business Days ($25.00)\n• Overnight Express: 1 Business Day ($45.00)"
        },
        {
          heading: "Military & APO/FPO Addresses",
          text: "We proudly ship to all US Military APO, FPO, and DPO addresses via USPS Priority Mail with standard domestic rates."
        }
      ]
    },
    returns: {
      icon: RotateCcw,
      title: "30-Day Hassle-Free Returns & Exchanges",
      subtitle: "We stand behind our American craftsmanship with an ironclad 30-day guarantee.",
      body: [
        {
          heading: "Return Eligibility",
          text: "If you are not 100% satisfied with your item, return it in unwashed, unworn condition with original tags attached within 30 days of purchase for a full refund or instant exchange."
        },
        {
          heading: "Prepaid Return Labels",
          text: "Exchanges and store credits receive complimentary prepaid return shipping. For standard refunds, a flat $7.00 return label fee is deducted from the refund amount."
        },
        {
          heading: "How to Initiate a Return",
          text: "1. Contact our California customer care team at conquestgd@gmail.com or call 530-249-1368 with your order number.\n2. Receive your printable prepaid return label.\n3. Drop off at any USPS post office or mailbox."
        }
      ]
    },
    privacy: {
      icon: ShieldCheck,
      title: "Privacy Policy",
      subtitle: "Your privacy and security are paramount at Strictly American.",
      body: [
        {
          heading: "Information Collection",
          text: "We collect personal information necessary to fulfill your orders, including your name, shipping address, email, and phone number. We NEVER sell, lease, or distribute your data to third parties."
        },
        {
          heading: "Payment Security",
          text: "All payment transactions are encrypted using 256-bit SSL encryption. Payment data is processed securely through PCI-DSS Level 1 compliant processors."
        }
      ]
    },
    terms: {
      icon: FileText,
      title: "Terms of Service",
      subtitle: "General terms and conditions governing the use of Strictly American.",
      body: [
        {
          heading: "100% Made in USA Standard",
          text: "Strictly American guarantees that all apparel listed under our primary catalog is manufactured entirely within the United States in compliance with FTC guidelines."
        },
        {
          heading: "Intellectual Property",
          text: "All brand assets, text content, photography, and design elements are protected by United States copyright laws."
        }
      ]
    }
  };

  const current = contentMap[type];
  const Icon = current.icon;

  return (
    <div className="py-16 bg-[#071322] min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0A2342] border border-[#1E3A5F] flex items-center justify-center mx-auto text-[#B22234]">
            <Icon className="w-6 h-6" />
          </div>
          <h1 className="font-serif-display text-3xl sm:text-4xl font-bold text-white">
            {current.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-sans-clean">
            {current.subtitle}
          </p>
        </div>

        <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-8 space-y-6 shadow-2xl">
          {current.body.map((sec, i) => (
            <div key={i} className="space-y-2 border-b border-[#1E3A5F] pb-6 last:border-0 last:pb-0">
              <h2 className="font-serif-display font-bold text-lg text-white">{sec.heading}</h2>
              <p className="text-xs sm:text-sm text-slate-300 font-sans-clean leading-relaxed whitespace-pre-wrap">
                {sec.text}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
