import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, MapPin, ArrowUpRight, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

export default function BespokeAppointment() {
  const { showToast } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    collection: 'Tissue Silk',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
    showToast('Styling appointment booked successfully! Our concierge will call you.', 'gold');
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#C59B51]/20">
      
      <div className="inquiry-editorial-card p-6 sm:p-12 lg:p-16 text-[#FAF7F2] relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#3B0910] via-[#58111A] to-[#2B070D] border border-[#C59B51]/45 shadow-2xl">
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Atelier Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF7F2]/10 text-[#E4C58B] border border-[#C59B51]/30 text-[10px] font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B51]" />
                <span>Personal Styling & Bridal Appointments</span>
              </div>

              <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-white leading-[1.02]">
                Every Saree Tells a Story, <br/>
                <span className="font-italiana italic text-gold-gradient font-normal">
                  Let Us Help You Choose Yours.
                </span>
              </h2>

              <p className="text-[#FAF7F2]/80 text-xs sm:text-sm mt-4 leading-relaxed font-normal">
                Need help choosing the right drape? Connect directly with our personal stylists. Whether you need custom bridal colors, blouse stitching measurements, or live video shopping, we are here for you.
              </p>
            </div>

            {/* Studio Visit Card */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-[#C59B51]/30 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C59B51] text-[#2B070D] flex items-center justify-center font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-cormorant text-base font-bold text-white">Flagship Hyderabad Atelier</h4>
                  <p className="text-[11px] text-[#FAF7F2]/70">Jubilee Hills, Road No. 36, Hyderabad — 500033</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/10 text-[#FAF7F2]/80">
                <span>Mon – Sat · 10:30 AM – 7:30 PM IST</span>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#E4C58B] font-bold hover:underline flex items-center gap-1"
                >
                  Directions <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* WhatsApp Concierge Bar */}
            <a 
              href="https://wa.me/919444416544?text=Hello%20कल्रा%20Kruti%20Atelier,%20I%20would%20like%20to%20inquire%20about%20your%20pure%20silk%20sarees"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 flex items-center justify-between transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">WhatsApp Atelier Concierge</span>
                  <span className="text-[10px] text-emerald-300">Live video shopping & swift custom orders</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-emerald-300" />
            </a>
          </div>

          {/* Right Column: Appointment Form */}
          <div className="lg:col-span-7 bg-white/95 text-[#2B070D] p-6 sm:p-10 rounded-3xl shadow-2xl text-left border border-[#C59B51]/30">
            {submitted ? (
              <div className="py-12 text-center space-y-3 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-cormorant text-2xl font-bold text-[#58111A]">Appointment Requested</h3>
                <p className="text-xs text-[#7C2335] max-w-sm mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our bridal concierge will reach out to you at {formData.phone} within 4 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-luxury-outline !py-2 !px-5 !text-xs mt-3"
                >
                  Book Another Appointment
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#58111A]">
                    Book a Video Styling Call or Studio Visit
                  </h3>
                  <p className="text-xs text-[#7C2335] mt-1">
                    Fill out the form below and our senior drapers will prepare an exclusive showcase for you.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 98490 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="radhika@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Collection of Interest
                    </label>
                    <select
                      value={formData.collection}
                      onChange={(e) => setFormData({ ...formData, collection: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                    >
                      <option value="Tissue Silk">Tissue Silk Sarees</option>
                      <option value="Banarasi Silk">Banarasi Katan Brocades</option>
                      <option value="Malai Silk">Malai Butter Silk</option>
                      <option value="Kanjivaram">Kanjivaram Temple Silk</option>
                      <option value="Organza">Organza & Festive Couture</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                    Special Notes or Occasion (Wedding, Reception, Sangeet)
                  </label>
                  <textarea 
                    rows={2}
                    placeholder="Tell us about the occasion, color preferences, or blouse styling needs..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                  />
                </div>

                <button 
                  type="submit"
                  className="btn-luxury-primary w-full !py-3 !text-xs flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Styling Appointment</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

    </section>
  );
}

