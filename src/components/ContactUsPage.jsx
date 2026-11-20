import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowLeft, MessageCircle, Phone, Mail, MapPin, Sparkles, 
  Clock, CheckCircle2, Send, Calendar, ShieldCheck
} from 'lucide-react';

export default function ContactUsPage() {
  const { navigatePage, showToast } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    celebration: 'Bridal Wedding Ceremony',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your styling appointment request has been scheduled with our Master Draper.', 'gold');
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#58111A] pt-4 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 py-3 border-b border-[#C59B51]/20 mb-8 text-xs text-[#7C2335]">
          <button 
            onClick={() => navigatePage('home')}
            className="flex items-center gap-1 text-[#58111A] font-bold hover:text-[#C59B51] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
          <span className="text-[#C59B51] font-bold">/</span>
          <span className="font-semibold text-[#58111A]">Contact Us</span>
          <span className="text-[#C59B51] font-bold">/</span>
          <span className="text-[#7C2335]">Styling Concierge & Atelier Visit</span>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B51]" />
            <span>Personal Silk Concierge</span>
          </div>
          <h1 className="font-cormorant text-4xl sm:text-6xl text-[#58111A] mb-3">
            Connect with Our Atelier
          </h1>
          <p className="text-xs sm:text-sm text-[#7C2335] font-light leading-relaxed">
            Whether selecting an heirloom drape for your wedding or commissioning custom zari borders from our Varanasi pit-looms, our master drapers are at your service.
          </p>
        </div>

        {/* Top 3 Direct Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* WhatsApp Direct */}
          <a 
            href="https://wa.me/919849012345?text=Hello%20कलाKruti%20Concierge,%20I%20would%20like%20assistance%20with%20pure%20silk%20sarees." 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-6 rounded-3xl bg-white border border-[#C59B51]/25 shadow-sm hover:shadow-xl transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-6 h-6 text-[#25D366]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#7C2335] uppercase tracking-wider block mb-0.5">
                Instant Chat & Video Call
              </span>
              <h3 className="font-cinzel text-sm font-bold text-[#58111A] mb-1">
                WhatsApp Concierge
              </h3>
              <p className="text-xs text-[#7C2335] leading-relaxed mb-2">
                Live HD draping preview, real zari closeups, and video consultations.
              </p>
              <span className="text-xs font-bold text-[#25D366] flex items-center gap-1 group-hover:underline">
                <span>Start Chat Now</span>
                <span className="text-sm">→</span>
              </span>
            </div>
          </a>

          {/* Phone Call */}
          <a 
            href="tel:+919849012345"
            className="p-6 rounded-3xl bg-white border border-[#C59B51]/25 shadow-sm hover:shadow-xl transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#58111A] text-[#E4C58B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Phone className="w-6 h-6 text-[#E4C58B]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#7C2335] uppercase tracking-wider block mb-0.5">
                Direct Line
              </span>
              <h3 className="font-cinzel text-sm font-bold text-[#58111A] mb-1">
                Atelier Helpline
              </h3>
              <p className="text-xs text-[#7C2335] leading-relaxed mb-2">
                +91 98490 12345 <br />
                Mon – Sat: 10:00 AM – 8:00 PM IST
              </p>
              <span className="text-xs font-bold text-[#58111A] flex items-center gap-1 group-hover:underline">
                <span>Call Concierge</span>
                <span className="text-sm">→</span>
              </span>
            </div>
          </a>

          {/* Email */}
          <a 
            href="mailto:concierge@klakruti.com"
            className="p-6 rounded-3xl bg-white border border-[#C59B51]/25 shadow-sm hover:shadow-xl transition-all flex items-start gap-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-[#C59B51]/40 text-[#58111A] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Mail className="w-6 h-6 text-[#C59B51]" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#7C2335] uppercase tracking-wider block mb-0.5">
                Bridal & Custom Orders
              </span>
              <h3 className="font-cinzel text-sm font-bold text-[#58111A] mb-1">
                concierge@klakruti.com
              </h3>
              <p className="text-xs text-[#7C2335] leading-relaxed mb-2">
                Replies within 4 hours with high-res catalogs and customized weaves.
              </p>
              <span className="text-xs font-bold text-[#58111A] flex items-center gap-1 group-hover:underline">
                <span>Send Email</span>
                <span className="text-sm">→</span>
              </span>
            </div>
          </a>
        </div>

        {/* Form & Studio Locations 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20 items-start">
          
          {/* Left Column: Video Styling Appointment Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-white border border-[#C59B51]/25 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#58111A] text-[#E4C58B] flex items-center justify-center shadow-md">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#58111A]">
                  Book a 1-on-1 Video Styling Session
                </h2>
                <p className="text-xs text-[#7C2335]">
                  Experience a private digital drape walkthrough with our senior sari curator.
                </p>
              </div>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#C59B51]/40 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#58111A] text-[#E4C58B] mx-auto flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-[#E4C58B]" />
                </div>
                <h3 className="font-cinzel text-lg font-bold text-[#58111A]">
                  Appointment Request Confirmed
                </h3>
                <p className="text-xs text-[#7C2335] max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name || 'Valued Customer'}</strong>. Our head stylist will connect with you on WhatsApp/Phone ({formData.phone}) before your scheduled session.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="btn-luxury-primary !py-2.5 !px-6 !text-xs cursor-pointer"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
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
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Phone Number (WhatsApp) *
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Celebration Occasion
                    </label>
                    <select
                      value={formData.celebration}
                      onChange={(e) => setFormData({ ...formData, celebration: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                    >
                      <option>Bridal Wedding Ceremony</option>
                      <option>Reception & Sangeet Evening</option>
                      <option>Festive Diwali / Puja Heirloom</option>
                      <option>Trousseau Collection Curation</option>
                      <option>Mother of the Bride / Groom</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Preferred Date
                    </label>
                    <input 
                      type="date" 
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                      Preferred Time Slot
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                    >
                      <option value="">Select Time Slot</option>
                      <option>11:00 AM – 12:00 PM IST</option>
                      <option>02:00 PM – 03:00 PM IST</option>
                      <option>04:30 PM – 05:30 PM IST</option>
                      <option>07:00 PM – 08:00 PM IST</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                    Specific Weave / Color Preferences (Optional)
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="e.g. Looking for pure tissue gold saree or royal red Kadwa Banarasi for winter wedding..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A]"
                  />
                </div>

                <button 
                  type="submit"
                  className="btn-luxury-primary w-full !py-3 !text-xs shadow-lg mt-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Confirm Styling Appointment</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Physical Atelier Studios */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white border border-[#C59B51]/25 shadow-sm space-y-6">
              <div className="border-b border-[#C59B51]/20 pb-4">
                <span className="text-[10px] font-bold text-[#7C2335] uppercase tracking-wider block mb-1">
                  Private Studio Visits
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-[#58111A]">
                  Our Flagship Ateliers
                </h3>
                <p className="text-xs text-[#7C2335] leading-relaxed">
                  Visit by prior appointment for bespoke bridal drapes and custom pit-loom weaving.
                </p>
              </div>

              {/* Varanasi */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#58111A]">
                  <MapPin className="w-4 h-4 text-[#C59B51]" />
                  <span>Varanasi Loom Heritage Quarter</span>
                </div>
                <p className="text-[#7C2335] pl-6 font-light">
                  Plot 14, Bunkar Colony, Madanpura Road, Varanasi, UP 221001
                </p>
                <p className="text-[11px] text-[#C59B51] pl-6 font-semibold">
                  Open Mon–Sat · Pit-Loom Weaving Demonstrations Available
                </p>
              </div>

              {/* Mumbai */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#58111A]">
                  <MapPin className="w-4 h-4 text-[#C59B51]" />
                  <span>Mumbai VIP Bridal Lounge</span>
                </div>
                <p className="text-[#7C2335] pl-6 font-light">
                  Suite 4B, Altamount Heritage, Cumballa Hill, Mumbai 400026
                </p>
                <p className="text-[11px] text-[#C59B51] pl-6 font-semibold">
                  By Exclusive Appointment Only
                </p>
              </div>

              {/* Delhi */}
              <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2 font-bold text-[#58111A]">
                  <MapPin className="w-4 h-4 text-[#C59B51]" />
                  <span>New Delhi Couture Atelier</span>
                </div>
                <p className="text-[#7C2335] pl-6 font-light">
                  Kala Mandir, Mehrauli Heritage Complex, New Delhi 110030
                </p>
                <p className="text-[11px] text-[#C59B51] pl-6 font-semibold">
                  Bridal Styling & Custom Blouse Measurements
                </p>
              </div>

              {/* Silk Mark Assurance */}
              <div className="pt-4 border-t border-[#C59B51]/20 flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-2xl">
                <ShieldCheck className="w-5 h-5 text-[#C59B51] shrink-0" />
                <span className="text-[11px] text-[#58111A] font-semibold">
                  All appointments include complimentary Silk Mark purity verification testing on-site.
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
