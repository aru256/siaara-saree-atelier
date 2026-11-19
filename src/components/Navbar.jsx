import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, User, Menu, X, ShieldCheck, ChevronDown } from 'lucide-react';
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
    goBackToCatalog
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

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
            className="flex items-center gap-2.5 sm:gap-3.5 group"
            id="navbar-brand-logo"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#58111A] border border-[#C59B51]/50 flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img 
                src="assets/brand-lotus-gold.png" 
                alt="कलाKruti Emblem" 
                className="w-full h-full object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-[#FAF7F2]/90 uppercase">
            <button onClick={() => scrollTo('collections')} className="hover:text-[#E4C58B] transition-colors py-1 cursor-pointer">
              Collections
            </button>
            <button onClick={() => scrollTo('story')} className="hover:text-[#E4C58B] transition-colors py-1 cursor-pointer">
              Brand Story
            </button>
            <button onClick={() => scrollTo('shop')} className="hover:text-[#E4C58B] transition-colors py-1 cursor-pointer">
              Shop Sarees
            </button>
            <button onClick={() => scrollTo('craftsmanship')} className="hover:text-[#E4C58B] transition-colors py-1 cursor-pointer">
              Craftsmanship
            </button>
            <button onClick={() => scrollTo('track-order')} className="hover:text-[#E4C58B] transition-colors py-1 cursor-pointer">
              Track Order
            </button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#E4C58B] transition-colors py-1 cursor-pointer">
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
              className="p-2 sm:px-3 sm:py-1.5 rounded-full hover:bg-white/10 text-[#FAF7F2] transition-all flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title={user ? `Signed in as ${user.name}` : "Sign In / Customer Portal"}
            >
              <User className="w-4 h-4 text-[#E4C58B]" />
              <span className="hidden md:inline-block">
                {user ? user.name.split(' ')[0] : 'Account'}
              </span>
            </button>

            {/* Wishlist Heart Button */}
            <button 
              onClick={() => setWishlistOpen(true)}
              className="p-2 rounded-full hover:bg-white/10 text-[#FAF7F2] relative transition-colors cursor-pointer"
              title="Saved Sarees"
            >
              <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'fill-[#E4C58B] text-[#E4C58B]' : 'text-[#FAF7F2]'}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E4C58B] text-[#2B070D] text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Button */}
            <button 
              onClick={() => setCartOpen(true)}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#E4C58B] hover:bg-[#C59B51] text-[#2B070D] border border-[#C59B51]/40 transition-all flex items-center gap-2 shadow-md hover:scale-105 cursor-pointer"
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
              className="lg:hidden p-2 rounded-lg text-[#FAF7F2] hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Velvet Maroon) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#2B070D] border-b border-[#C59B51]/30 px-6 py-6 flex flex-col gap-4 text-sm font-semibold tracking-wider text-[#FAF7F2] uppercase shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <button onClick={() => scrollTo('collections')} className="text-left py-2 border-b border-[#C59B51]/20 hover:text-[#E4C58B]">
            Collections Runway
          </button>
          <button onClick={() => scrollTo('story')} className="text-left py-2 border-b border-[#C59B51]/20 hover:text-[#E4C58B]">
            Brand Heritage Story
          </button>
          <button onClick={() => scrollTo('shop')} className="text-left py-2 border-b border-[#C59B51]/20 hover:text-[#E4C58B]">
            Shop All Pure Silk Sarees
          </button>
          <button onClick={() => scrollTo('craftsmanship')} className="text-left py-2 border-b border-[#C59B51]/20 hover:text-[#E4C58B]">
            Handloom Craftsmanship
          </button>
          <button onClick={() => scrollTo('track-order')} className="text-left py-2 border-b border-[#C59B51]/20 hover:text-[#E4C58B]">
            Track Delivery
          </button>
          <button onClick={() => scrollTo('contact')} className="text-left py-2 border-b border-[#C59B51]/20 hover:text-[#E4C58B]">
            Personal Styling & Studio Visit
          </button>

          <div className="pt-2 flex flex-col gap-2.5">
            <a 
              href="admin.html" 
              className="w-full py-2.5 px-4 rounded-full border border-[#C59B51] text-[#E4C58B] text-center text-xs font-bold flex items-center justify-center gap-1.5 bg-[#58111A]/60"
            >
              <ShieldCheck className="w-4 h-4 text-[#C59B51]" />
              <span>Open Executive Admin</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
