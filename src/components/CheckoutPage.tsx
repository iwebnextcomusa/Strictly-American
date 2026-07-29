import React, { useState } from 'react';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, ArrowRight, Truck, Flag, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  discountAmount: number;
  onClearCart: () => void;
  onNavigateHome: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cart,
  discountAmount,
  onClearCart,
  onNavigateHome
}) => {
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'googlepay' | 'paypal' | 'shoppay'>('card');
  const [orderNumber, setOrderNumber] = useState('');

  // Shipping form
  const [shippingForm, setShippingForm] = useState({
    firstName: 'James',
    lastName: 'Miller',
    email: 'james.miller@example.com',
    phone: '530-249-1368',
    address: '1776 Freedom Way',
    city: 'Austin',
    state: 'TX',
    zip: '78701',
  });

  // Card form
  const [cardForm, setCardForm] = useState({
    cardNumber: '•••• •••• •••• 4242',
    expDate: '12/28',
    cvv: '888',
    nameOnCard: 'James Miller'
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= 150 || subtotal === 0 ? 0 : 15;
  const tax = (subtotal - discountAmount) * 0.07;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping + tax);

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrderNum = `SA-USA-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(generatedOrderNum);
    setStep('confirmation');
    onClearCart();

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  if (step === 'confirmation') {
    return (
      <div className="py-20 bg-[#071322] min-h-screen text-white flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-8 sm:p-10 text-center space-y-6 shadow-2xl animate-fade-in">
          
          <div className="w-16 h-16 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto font-bold text-3xl shadow-xl">
            ✓
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-[#B22234] tracking-widest block">
              100% Made in the USA Order Confirmed
            </span>
            <h1 className="font-serif-display text-3xl font-bold text-white">
              Thank You for Supporting American Craftsmen!
            </h1>
            <p className="text-xs text-slate-300 font-sans-clean">
              Your order confirmation number is <span className="font-bold text-amber-300">{orderNumber}</span>.
            </p>
          </div>

          <div className="bg-[#071322] border border-[#1E3A5F] p-4 rounded-xl text-xs text-slate-300 text-left space-y-2">
            <p className="font-bold text-white">Order Details & Tracking:</p>
            <p>• Confirmation email sent to: <span className="text-white font-semibold">{shippingForm.email}</span></p>
            <p>• Estimated Delivery: <span className="text-emerald-400 font-semibold">3–5 Business Days (USPS Priority)</span></p>
            <p>• Ship To: {shippingForm.firstName} {shippingForm.lastName}, {shippingForm.address}, {shippingForm.city}, {shippingForm.state} {shippingForm.zip}</p>
          </div>

          <button
            onClick={onNavigateHome}
            className="w-full py-3.5 bg-[#B22234] hover:bg-red-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl shadow-xl transition-all"
          >
            Return to Homepage
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-[#071322] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#1E3A5F] pb-4">
          <button onClick={onNavigateHome} className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
            <ChevronLeft className="w-4 h-4" /> Back to Store
          </button>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <Lock className="w-4 h-4" /> 256-Bit SSL Encrypted Checkout
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Checkout Steps */}
          <div className="lg:col-span-7 bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Express Express Payment Options */}
            <div className="space-y-3 pb-6 border-b border-[#1E3A5F]">
              <span className="text-xs uppercase font-bold text-slate-300 block">Express Fast Checkout</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'applepay' ? 'bg-white text-black border-white' : 'bg-[#071322] border-[#1E3A5F] text-white hover:bg-white/10'
                  }`}
                >
                   Apple Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('googlepay')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'googlepay' ? 'bg-white text-black border-white' : 'bg-[#071322] border-[#1E3A5F] text-white hover:bg-white/10'
                  }`}
                >
                  G Pay
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'paypal' ? 'bg-amber-400 text-black border-amber-400' : 'bg-[#071322] border-[#1E3A5F] text-white hover:bg-white/10'
                  }`}
                >
                  PayPal
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('shoppay')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all ${
                    paymentMethod === 'shoppay' ? 'bg-purple-600 text-white border-purple-600' : 'bg-[#071322] border-[#1E3A5F] text-white hover:bg-white/10'
                  }`}
                >
                  Shop Pay
                </button>
              </div>
            </div>

            {/* Shipping Details */}
            <form onSubmit={handleCompleteOrder} className="space-y-6">
              <div>
                <h3 className="font-serif-display font-bold text-lg text-white mb-4">1. Domestic Shipping Address</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.firstName}
                      onChange={(e) => setShippingForm({ ...shippingForm, firstName: e.target.value })}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.lastName}
                      onChange={(e) => setShippingForm({ ...shippingForm, lastName: e.target.value })}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-slate-300 font-bold mb-1">Street Address</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.address}
                      onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.state}
                        onChange={(e) => setShippingForm({ ...shippingForm, state: e.target.value })}
                        className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Zip Code</label>
                      <input
                        type="text"
                        required
                        value={shippingForm.zip}
                        onChange={(e) => setShippingForm({ ...shippingForm, zip: e.target.value })}
                        className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Credit Card Details */}
              {paymentMethod === 'card' && (
                <div className="space-y-4 pt-4 border-t border-[#1E3A5F]">
                  <h3 className="font-serif-display font-bold text-lg text-white">2. Payment Card Details</h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        value={cardForm.nameOnCard}
                        onChange={(e) => setCardForm({ ...cardForm, nameOnCard: e.target.value })}
                        className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-bold mb-1">Card Number</label>
                      <input
                        type="text"
                        required
                        value={cardForm.cardNumber}
                        onChange={(e) => setCardForm({ ...cardForm, cardNumber: e.target.value })}
                        className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">Expiration</label>
                        <input
                          type="text"
                          required
                          value={cardForm.expDate}
                          onChange={(e) => setCardForm({ ...cardForm, expDate: e.target.value })}
                          className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-300 font-bold mb-1">CVV Security Code</label>
                        <input
                          type="text"
                          required
                          value={cardForm.cvv}
                          onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                          className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-[#B22234] hover:bg-red-700 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-2xl transition-all"
              >
                Place Order (${grandTotal.toFixed(2)})
              </button>
            </form>

          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-6 space-y-4 shadow-2xl">
              <h3 className="font-serif-display font-bold text-lg text-white border-b border-[#1E3A5F] pb-3">
                Order Summary ({cart.length} items)
              </h3>

              <div className="space-y-3 max-h-72 overflow-y-auto">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-3 text-xs">
                    <img src={item.product.images[0]} alt="" className="w-14 h-16 object-cover rounded border border-[#1E3A5F]" referrerPolicy="no-referrer" />
                    <div className="flex-1">
                      <h4 className="font-bold text-white line-clamp-1">{item.product.name}</h4>
                      <p className="text-slate-400">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                      <p className="text-emerald-400 font-semibold mt-0.5">🇺🇸 {item.product.usaStateOfOrigin}</p>
                    </div>
                    <span className="font-bold text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs border-t border-[#1E3A5F] pt-4 text-slate-300">
                <div className="flex justify-between"><span>Subtotal:</span><span className="text-white">${subtotal.toFixed(2)}</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-emerald-400"><span>Discount:</span><span>-${discountAmount.toFixed(2)}</span></div>}
                <div className="flex justify-between"><span>Domestic Shipping:</span><span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between"><span>Tax (7%):</span><span className="text-white">${tax.toFixed(2)}</span></div>
                <div className="flex justify-between text-base font-serif-display font-bold text-white pt-2 border-t border-[#1E3A5F]">
                  <span>Total Amount:</span>
                  <span className="text-amber-300">${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* FTC Guarantee badge */}
            <div className="bg-[#071322] border border-[#1E3A5F] p-4 rounded-xl text-xs space-y-2 text-slate-300">
              <div className="flex items-center gap-2 text-white font-bold">
                <Flag className="w-4 h-4 text-[#B22234]" /> 100% Made in USA FTC Guarantee
              </div>
              <p className="text-[11px] text-slate-400">All products strictly adhere to FTC domestic manufacturing standards.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
