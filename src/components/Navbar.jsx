import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, User, Menu, X, ChevronDown, ChevronUp, Sparkles, Truck, Info, Phone, LogIn } from 'lucide-react';
import { CURRENCY_CONFIG } from '../data/sarees';

export default function Navbar() {
  const { 
    cartTotalItems, 
    setCartOpen, 
    wishlist, 
    setWishlistOpen, 
    user, 
    setAuthOpen, 
    setAuthMode,
    currency, 
    setCurrency,
    currentView,
    goBackToCatalog,
    setSelectedCollection
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [collectionsDropdown, setCollectionsDropdown] = useState(true);

  // Lock background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      goBackToCatalog();
      setTimeout(() => {
        const elem = document.getElementById(id);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 transition-all shadow-md">
      {/* Top Announcement Bar (White / Ivory Cream Background as requested) */}
      <div className="bg-[#FAF7F2] text-[#58111A] border-b border-[#C59B51]/25 text-[10px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wider flex items-center justify-between sm:justify-center relative">
        <span className="hidden sm:inline-block">✨ Handwoven Pure Silk Couture · Silk Mark Certified & Tested 24K Zari</span>
        <span className="sm:hidden">✨ Pure Handloom Silk · Pan-India Free Delivery</span>

        {/* Currency Switcher */}
        <div className="relative sm:absolute sm:right-6">
          <button 
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="flex items-center gap-1 text-[10px] text-[#58111A] font-bold tracking-widest uppercase hover:text-[#C59B51] transition-colors bg-white border border-[#C59B51]/30 px-2.5 py-0.5 rounded-full shadow-xs cursor-pointer"
          >
            <span>{currency}</span>
            <ChevronDown className="w-3 h-3 text-[#C59B51]" />
          </button>

          {currencyOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-28 bg-[#FAF7F2] border border-[#C59B51]/40 rounded-xl shadow-2xl py-1 z-50">
              {Object.keys(CURRENCY_CONFIG).map((cur) => (
                <button
                  key={cur}
                  onClick={() => {
                    setCurrency(cur);
                    setCurrencyOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[11px] font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                    currency === cur ? 'bg-[#58111A] text-[#E4C58B]' : 'text-[#58111A] hover:bg-[#EFE8DA]'
                  }`}
                >
                  <span>{cur}</span>
                  <span className="text-[10px] opacity-70">{CURRENCY_CONFIG[cur].symbol}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Brand Navbar (Imperial Velvet Maroon Background as requested) */}
      <div className="bg-[#2B070D]/95 backdrop-blur-md border-b border-[#C59B51]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          
          {/* Brand Logo & Monogram (Lotus Emblem + कलाKruti by Vyara in Copperplate) */}
          <a 
            href="#home" 
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            className="flex items-center gap-3 sm:gap-4 group"
            id="navbar-brand-logo"
          >
            {/* Independent Floating Lotus Emblem (No Circle, Sized Prominently) */}
            <div className="flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <img 
                src="assets/brand-lotus-gold.png" 
                alt="कलाKruti Emblem" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
              />
            </div>
            
            {/* The Authentic Wordmark with BY VYARA in Copperplate sliding under Kruti */}
            <div className="flex flex-col text-left justify-center">
              <img 
                src="assets/klakruti-by-vyara-light.png" 
                alt="कलाKruti BY VYARA" 
                className="h-8 sm:h-10 w-auto object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] group-hover:brightness-110 transition-all"
              />
            </div>
          </a>

          {/* Desktop Navigation Links (Clean Pure White Text & Crisp Transitions) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-white uppercase">
            <button onClick={() => scrollTo('collections')} className="text-white hover:text-white/75 transition-colors py-1 cursor-pointer">
              Collections
            </button>
            <button onClick={() => scrollTo('story')} className="text-white hover:text-white/75 transition-colors py-1 cursor-pointer">
              Brand Story
            </button>
            <button onClick={() => scrollTo('shop')} className="text-white hover:text-white/75 transition-colors py-1 cursor-pointer">
              Shop Sarees
            </button>
            <button onClick={() => scrollTo('craftsmanship')} className="text-white hover:text-white/75 transition-colors py-1 cursor-pointer">
              Craftsmanship
            </button>
            <button onClick={() => scrollTo('track-order')} className="text-white hover:text-white/75 transition-colors py-1 cursor-pointer">
              Track Order
            </button>
            <button onClick={() => scrollTo('contact')} className="text-white hover:text-white/75 transition-colors py-1 cursor-pointer">
              Personal Styling
            </button>
          </nav>

          {/* Action Controls: User Account, Wishlist, Cart, Mobile Menu */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            
            {/* Customer Account Button */}
            <button 
              onClick={() => {
                setAuthMode(user ? 'account' : 'login');
                setAuthOpen(true);
              }}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full hover:bg-white/10 text-white transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title={user ? `Signed in as ${user.name}` : "Sign In / Customer Portal"}
            >
              <User className="w-4 h-4 text-white" />
              <span className="hidden md:inline-block text-white">
                {user ? user.name.split(' ')[0] : 'Account'}
              </span>
            </button>

            {/* Wishlist Heart Button */}
            <button 
              onClick={() => setWishlistOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 text-white relative transition-colors cursor-pointer"
              title="Saved Sarees"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'fill-white text-white' : 'text-white'}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white text-[#2B070D] text-[9px] font-bold flex items-center justify-center shadow-sm">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button (White Pill replacing previous Yellow Pill) */}
            <button 
              onClick={() => setCartOpen(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white hover:bg-white/90 text-[#2B070D] border border-white/80 transition-all flex items-center gap-2 shadow-md hover:scale-105 cursor-pointer"
              title="Open Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#2B070D]" />
              <span className="text-xs font-bold font-cinzel text-[#2B070D]">
                {cartTotalItems}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Hidden SVG Definition for Repeating Curve In / Curve Out Wave Clip Path */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <clipPath id="wavy-drawer-clip" clipPathUnits="objectBoundingBox">
            <path d="M 1 0 L 1 1 L 0.0800 1 C 0.1400 0.9700, 0.1400 0.9300, 0.0800 0.9000 C 0.0200 0.8700, 0.0200 0.8300, 0.0800 0.8000 C 0.1400 0.7700, 0.1400 0.7300, 0.0800 0.7000 C 0.0200 0.6700, 0.0200 0.6300, 0.0800 0.6000 C 0.1400 0.5700, 0.1400 0.5300, 0.0800 0.5000 C 0.0200 0.4700, 0.0200 0.4300, 0.0800 0.4000 C 0.1400 0.3700, 0.1400 0.3300, 0.0800 0.3000 C 0.0200 0.2700, 0.0200 0.2300, 0.0800 0.2000 C 0.1400 0.1700, 0.1400 0.1300, 0.0800 0.1000 C 0.0200 0.0700, 0.0200 0.0300, 0.0800 0.0000 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* ================= STYLISH MOBILE RIGHT-SIDE SLIDING DRAWER WITH REPEATING CURVES ================= */}
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 z-[120] lg:hidden transition-all duration-500 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Dim Backdrop with blur */}
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 cursor-pointer"
        />

        {/* Sculpted Drawer Panel Sliding from the Right with Repeating Curve In / Curve Out Edge */}
        <div 
          className={`absolute top-0 right-0 bottom-0 w-[88%] max-w-[340px] sm:max-w-[380px] h-[100dvh] bg-gradient-to-b from-[#2B070D] via-[#350A11] to-[#1A0307] text-[#FAF7F2] shadow-[-25px_0_60px_rgba(0,0,0,0.9)] flex flex-col justify-between overflow-y-auto transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 will-change-transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            WebkitClipPath: 'url(#wavy-drawer-clip)',
            clipPath: 'url(#wavy-drawer-clip)',
          }}
        >
          {/* Gleaming Golden Zari Wavy Border Overlay along the Repeating Curves */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none z-30 filter drop-shadow-[-2px_0_6px_rgba(228,197,139,0.4)]" 
            viewBox="0 0 1 1" 
            preserveAspectRatio="none"
          >
            <path 
              d="M 0.0800 0 C 0.0200 0.0300, 0.0200 0.0700, 0.0800 0.1000 C 0.1400 0.1300, 0.1400 0.1700, 0.0800 0.2000 C 0.0200 0.2300, 0.0200 0.2700, 0.0800 0.3000 C 0.1400 0.3300, 0.1400 0.3700, 0.0800 0.4000 C 0.0200 0.4300, 0.0200 0.4700, 0.0800 0.5000 C 0.1400 0.5300, 0.1400 0.5700, 0.0800 0.6000 C 0.0200 0.6300, 0.0200 0.6700, 0.0800 0.7000 C 0.1400 0.7300, 0.1400 0.7700, 0.0800 0.8000 C 0.0200 0.8300, 0.0200 0.8700, 0.0800 0.9000 C 0.1400 0.9300, 0.1400 0.9700, 0.0800 1.0000" 
              fill="none" 
              stroke="#E4C58B" 
              strokeWidth="2.5" 
              vectorEffect="non-scaling-stroke" 
            />
          </svg>

          {/* Top Brand Header & Close Button */}
          <div className="pt-6 pb-4 pl-14 pr-5 border-b border-[#C59B51]/25 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img 
                src="assets/brand-lotus-gold.png" 
                alt="कलाKruti" 
                className="w-7 h-7 object-contain drop-shadow"
              />
              <img 
                src="assets/klakruti-by-vyara-light.png" 
                alt="कलाKruti BY VYARA" 
                className="h-6 w-auto object-contain"
              />
            </div>

            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:rotate-90 cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Links Body */}
          <div className="py-5 pl-12 pr-4 flex-1 space-y-1 text-sm font-semibold tracking-wider uppercase overflow-y-auto">
            {/* 1. Home */}
            <button 
              onClick={() => scrollTo('home')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-white hover:text-[#E4C58B] hover:bg-white/5 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4C58B]"></span>
              <span>Home</span>
            </button>

            {/* 2. Shop */}
            <button 
              onClick={() => { setSelectedCollection('all'); scrollTo('shop'); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-white hover:text-[#E4C58B] hover:bg-white/5 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4C58B]"></span>
              <span>Shop</span>
            </button>

            {/* 3. New arrivals */}
            <button 
              onClick={() => scrollTo('collections')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-white hover:text-[#E4C58B] hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E4C58B]"></span>
                <span>New Arrivals</span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#E4C58B] text-[#2B070D] font-bold">NEW</span>
            </button>

            {/* 4. Collections with Sub-items */}
            <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden my-1">
              <button 
                onClick={() => setCollectionsDropdown(!collectionsDropdown)}
                className="w-full flex items-center justify-between px-3.5 py-2.5 text-white hover:bg-white/10 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E4C58B]"></span>
                  <span>Collections</span>
                </div>
                {collectionsDropdown ? (
                  <ChevronUp className="w-4 h-4 text-[#E4C58B]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-white/70" />
                )}
              </button>

              {collectionsDropdown && (
                <div className="pl-6 pr-3 pb-2 pt-0.5 space-y-1 lowercase text-xs font-medium">
                  <button 
                    onClick={() => { setSelectedCollection('tissue-silk'); scrollTo('shop'); }}
                    className="w-full text-left py-2 px-3 rounded-lg text-[#FAF7F2]/80 hover:text-[#E4C58B] hover:bg-white/5 transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <span className="text-[#E4C58B] text-sm leading-none">-</span>
                    <span className="capitalize">tissue silk</span>
                  </button>
                  <button 
                    onClick={() => { setSelectedCollection('malai-silk'); scrollTo('shop'); }}
                    className="w-full text-left py-2 px-3 rounded-lg text-[#FAF7F2]/80 hover:text-[#E4C58B] hover:bg-white/5 transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <span className="text-[#E4C58B] text-sm leading-none">-</span>
                    <span className="capitalize">malai silk</span>
                  </button>
                  <button 
                    onClick={() => { setSelectedCollection('banarasi-silk'); scrollTo('shop'); }}
                    className="w-full text-left py-2 px-3 rounded-lg text-[#FAF7F2]/80 hover:text-[#E4C58B] hover:bg-white/5 transition-colors flex items-center gap-2.5 cursor-pointer"
                  >
                    <span className="text-[#E4C58B] text-sm leading-none">-</span>
                    <span className="capitalize">banarsi silk</span>
                  </button>
                </div>
              )}
            </div>

            {/* 5. Wishlist */}
            <button 
              onClick={() => { setMobileMenuOpen(false); setWishlistOpen(true); }}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-white hover:text-[#E4C58B] hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E4C58B]"></span>
                <span>Wishlist</span>
              </div>
              {wishlist.length > 0 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#2B070D] font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* 6. Track order */}
            <button 
              onClick={() => scrollTo('track-order')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-white hover:text-[#E4C58B] hover:bg-white/5 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4C58B]"></span>
              <span>Track Order</span>
            </button>

            {/* 7. About us */}
            <button 
              onClick={() => scrollTo('story')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-white hover:text-[#E4C58B] hover:bg-white/5 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4C58B]"></span>
              <span>About Us</span>
            </button>

            {/* 8. Contact us */}
            <button 
              onClick={() => scrollTo('contact')}
              className="w-full text-left px-3.5 py-2.5 rounded-xl text-white hover:text-[#E4C58B] hover:bg-white/5 transition-all flex items-center gap-3 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4C58B]"></span>
              <span>Contact Us</span>
            </button>

            {/* 9. Login/ register */}
            <div className="pt-3">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthMode(user ? 'account' : 'login');
                  setAuthOpen(true);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-white/95 text-[#2B070D] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                <User className="w-4 h-4 text-[#2B070D]" />
                <span>{user ? `My Account (${user.name.split(' ')[0]})` : 'Login / Register'}</span>
              </button>
            </div>
          </div>

          {/* Footer inside Drawer */}
          <div className="p-5 pl-14 pr-5 border-t border-[#C59B51]/20 text-center">
            <span className="font-italiana italic text-xs text-[#E4C58B] tracking-wide block">
              Threads of Culture, Beads of Joy
            </span>
            <span className="text-[10px] text-white/50 tracking-wider uppercase mt-1 block">
              100% Certified Pure Silk
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
