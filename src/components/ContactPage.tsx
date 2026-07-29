import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ShieldCheck } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'Order Inquiry', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-[#071322] min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs uppercase tracking-widest text-[#B22234] font-bold">
            Customer Care & Support
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold text-white">
            Contact Strictly American
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Have questions regarding domestic sizing, custom corporate orders, or order status? Our California customer care team is standing by.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-8 space-y-6 shadow-2xl">
            <h2 className="font-serif-display text-xl font-bold text-white border-b border-[#1E3A5F] pb-3">
              Direct Contact Channels
            </h2>

            <div className="space-y-5 text-xs text-slate-300">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#071322] border border-[#1E3A5F] rounded-xl text-red-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Customer Service Hotline</h3>
                  <a href="tel:5302491368" className="text-amber-300 font-bold text-base hover:underline block mt-0.5">
                    530-249-1368
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Mon–Fri: 8:00 AM – 6:00 PM PST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#071322] border border-[#1E3A5F] rounded-xl text-red-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Official Email Inbox</h3>
                  <a href="mailto:conquestgd@gmail.com" className="text-amber-300 font-semibold hover:underline block mt-0.5">
                    conquestgd@gmail.com
                  </a>
                  <p className="text-[11px] text-slate-400 mt-0.5">Response guaranteed within 24 business hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#071322] border border-[#1E3A5F] rounded-xl text-red-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Headquarters & Showroom</h3>
                  <p className="text-slate-200 mt-0.5">Strictly American Inc.</p>
                  <p className="text-slate-400 text-[11px]">California Corporate Facility, USA</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#071322] border border-[#1E3A5F] rounded-xl text-red-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Business Hours</h3>
                  <p className="text-slate-200 mt-0.5">Monday – Friday: 8:00 AM – 6:00 PM PST</p>
                  <p className="text-slate-200">Saturday: 9:00 AM – 3:00 PM PST</p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-44 rounded-xl overflow-hidden border border-[#1E3A5F] relative">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Showroom Map"
                className="w-full h-full object-cover brightness-75"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 text-center">
                <span className="bg-[#0A2342]/90 border border-white/20 px-3 py-1.5 rounded-lg text-xs font-semibold text-white">
                  📍 California Headquarters & USA Distribution
                </span>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-7 bg-[#0A2342] border border-[#1E3A5F] rounded-2xl p-8 shadow-2xl">
            <h2 className="font-serif-display text-xl font-bold text-white mb-6">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="p-8 bg-emerald-950/80 border border-emerald-800 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto font-bold text-xl">
                  ✓
                </div>
                <h3 className="font-serif-display text-xl font-bold text-white">Message Delivered</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Thank you for contacting Strictly American. A customer care representative will follow up via email at <span className="text-white font-bold">{form.email}</span> within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Miller"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none focus:border-[#B22234]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none focus:border-[#B22234]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="530-249-1368"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none focus:border-[#B22234]"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 font-bold mb-1">Subject</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none"
                    >
                      <option value="Order Inquiry">Order Status Inquiry</option>
                      <option value="Sizing Help">Sizing & Fitting Assistance</option>
                      <option value="Corporate / Wholesale">Corporate / Wholesale Orders</option>
                      <option value="General">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="How can our customer team assist you today?"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-[#071322] border border-[#1E3A5F] rounded-xl p-3 text-white focus:outline-none focus:border-[#B22234]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#B22234] hover:bg-red-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-xl flex items-center justify-center gap-2"
                >
                  Send Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
