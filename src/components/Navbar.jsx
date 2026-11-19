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
    setCurrency 
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F8F5EE]/95 backdrop-blur-md border-b border-[#C59B51]/20 transition-all">
      {/* Top Announcement Bar */}
      <div className="bg-[#2B070D] text-[#E4C58B] text-[10px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-wider flex items-center justify-between sm:justify-center relative">
        <span className="hidden sm:inline-block">✨ Handwoven Pure Silk Couture · Silk Mark Certified & Tested 24K Zari</span>
        <span className="sm:hidden">✨ Pure Handloom Silk · Pan-India Free Delivery</span>

        {/* Currency Switcher */}
        <div className="relative sm:absolute sm:right-6">
          <button 
            onClick={() => setCurrencyOpen(!currencyOpen)}
            className="flex items-center gap-1 text-[10px] text-[#E4C58B] font-bold tracking-widest uppercase hover:text-white transition-colors"
          >
            <span>{currency}</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {currencyOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-28 bg-[#2B070D] border border-[#C59B51]/40 rounded-xl shadow-2xl py-1 z-50">
              {Object.keys(CURRENCY_CONFIG).map((cur) => (
                <button
                  key={cur}
                  onClick={() => {
                    setCurrency(cur);
                    setCurrencyOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-[11px] font-semibold transition-colors flex items-center justify-between ${
                    currency === cur ? 'bg-[#58111A] text-[#E4C58B]' : 'text-[#FAF7F2]/80 hover:bg-[#58111A]/50'
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

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Brand Logo & Monogram */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
          className="flex items-center gap-3 group"
          id="navbar-brand-logo"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#58111A] border border-[#C59B51]/50 flex flex-col items-center justify-center p-1 shadow-md group-hover:scale-105 transition-transform">
            <span className="font-rozha text-sm sm:text-base font-bold text-[#E4C58B] leading-none">कल्रा</span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-cinzel text-base sm:text-xl font-bold tracking-[0.18em] text-[#58111A] leading-tight">
              कल्रा KRUTI
            </span>
            <span className="font-italiana italic text-[10px] sm:text-xs text-[#C59B51] font-normal tracking-wider -mt-0.5">
              by vyara
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-wider text-[#58111A] uppercase">
          <button onClick={() => scrollTo('collections')} className="hover:text-[#C59B51] transition-colors py-1">
            Collections
          </button>
          <button onClick={() => scrollTo('story')} className="hover:text-[#C59B51] transition-colors py-1">
            Brand Story
          </button>
          <button onClick={() => scrollTo('shop')} className="hover:text-[#C59B51] transition-colors py-1">
            Shop Sarees
          </button>
          <button onClick={() => scrollTo('craftsmanship')} className="hover:text-[#C59B51] transition-colors py-1">
            Craftsmanship
          </button>
          <button onClick={() => scrollTo('track-order')} className="hover:text-[#C59B51] transition-colors py-1">
            Track Order
          </button>
          <button onClick={() => scrollTo('contact')} className="hover:text-[#C59B51] transition-colors py-1">
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
            className="p-2 sm:px-3 sm:py-1.5 rounded-full hover:bg-[#EFE8DA] text-[#58111A] transition-all flex items-center gap-1.5 text-xs font-semibold"
            title={user ? `Signed in as ${user.name}` : "Sign In / Customer Portal"}
          >
            <User className="w-4 h-4 text-[#58111A]" />
            <span className="hidden md:inline-block">
              {user ? user.name.split(' ')[0] : 'Account'}
            </span>
          </button>

          {/* Wishlist Heart Button */}
          <button 
            onClick={() => setWishlistOpen(true)}
            className="p-2 rounded-full hover:bg-[#EFE8DA] text-[#58111A] relative transition-colors"
            title="Saved Sarees"
          >
            <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${wishlist.length > 0 ? 'fill-[#58111A] text-[#58111A]' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#58111A] text-white text-[9px] font-bold flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Shopping Bag Button */}
          <button 
            onClick={() => setCartOpen(true)}
            className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#58111A] hover:bg-[#3B0910] text-[#F8F5EE] border border-[#C59B51]/40 transition-all flex items-center gap-2 shadow-md hover:scale-105"
            title="Open Shopping Bag"
          >
            <ShoppingBag className="w-4 h-4 text-[#E4C58B]" />
            <span className="text-xs font-bold font-cinzel">
              {cartTotalItems}
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#58111A] hover:bg-[#EFE8DA] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF7F2] border-b border-[#C59B51]/30 px-6 py-6 flex flex-col gap-4 text-sm font-semibold tracking-wider text-[#58111A] uppercase shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <button onClick={() => scrollTo('collections')} className="text-left py-2 border-b border-[#C59B51]/15 hover:text-[#C59B51]">
            Collections Runway
          </button>
          <button onClick={() => scrollTo('story')} className="text-left py-2 border-b border-[#C59B51]/15 hover:text-[#C59B51]">
            Brand Heritage Story
          </button>
          <button onClick={() => scrollTo('shop')} className="text-left py-2 border-b border-[#C59B51]/15 hover:text-[#C59B51]">
            Shop All Pure Silk Sarees
          </button>
          <button onClick={() => scrollTo('craftsmanship')} className="text-left py-2 border-b border-[#C59B51]/15 hover:text-[#C59B51]">
            Handloom Craftsmanship
          </button>
          <button onClick={() => scrollTo('track-order')} className="text-left py-2 border-b border-[#C59B51]/15 hover:text-[#C59B51]">
            Track Delivery
          </button>
          <button onClick={() => scrollTo('contact')} className="text-left py-2 border-b border-[#C59B51]/15 hover:text-[#C59B51]">
            Personal Styling & Studio Visit
          </button>

          <div className="pt-2 flex flex-col gap-2.5">
            <a 
              href="admin.html" 
              className="w-full py-2.5 px-4 rounded-full border border-[#C59B51] text-[#58111A] text-center text-xs font-bold flex items-center justify-center gap-1.5 bg-[#EFE8DA]/60"
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

