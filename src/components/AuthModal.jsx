import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, User, Lock, Mail, Phone, LogOut, Package } from 'lucide-react';

export default function AuthModal() {
  const { 
    authOpen, 
    setAuthOpen, 
    authMode, 
    setAuthMode, 
    user, 
    login, 
    logout 
  } = useStore();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!authOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    login(email, name);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={() => setAuthOpen(false)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl border border-[#C59B51]/35 shadow-2xl overflow-hidden z-10 text-left animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-[#C59B51]/25 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#58111A]" />
            <h3 className="font-cinzel text-base font-bold text-[#58111A] tracking-wider uppercase">
              {user ? 'My Client Profile' : (authMode === 'login' ? 'Customer Sign In' : 'Create Account')}
            </h3>
          </div>
          <button 
            onClick={() => setAuthOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EFE8DA] text-[#58111A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {user ? (
            <div className="space-y-5">
              <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-white border border-[#C59B51]/20">
                <div className="w-12 h-12 rounded-full bg-[#58111A] text-[#E4C58B] flex items-center justify-center font-cinzel text-lg font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-cormorant text-lg font-bold text-[#58111A]">{user.name}</h4>
                  <p className="text-xs text-[#7C2335]">{user.email}</p>
                  <span className="text-[10px] text-[#C59B51] font-semibold">Handloom Connoisseur Member</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setAuthOpen(false);
                    const elem = document.getElementById('track-order');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#C59B51]/30 hover:border-[#58111A] text-[#58111A] text-xs font-semibold flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-[#C59B51]" />
                    <span>Track Active Saree Orders</span>
                  </span>
                  <span className="text-[10px] font-bold text-[#C59B51]">View →</span>
                </button>
              </div>

              <button 
                onClick={logout}
                className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out of Account</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-xs text-[#7C2335] leading-relaxed mb-4">
                  Sign in to access your order tracking history, saved saree wishlists, and bespoke styling bookings.
                </p>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C2335]/60 pointer-events-none" />
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-3 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C2335]/60 pointer-events-none" />
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-3 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#58111A] uppercase tracking-wider mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C2335]/60 pointer-events-none" />
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-3 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="btn-luxury-primary w-full !py-2.5 !text-xs mt-2"
              >
                {authMode === 'login' ? 'Sign In to Portal' : 'Create My Account'}
              </button>

              {/* Mode Toggle */}
              <div className="pt-2 text-center text-xs text-[#7C2335]">
                {authMode === 'login' ? (
                  <p>
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => setAuthMode('register')}
                      className="font-bold text-[#58111A] underline cursor-pointer"
                    >
                      Register Now
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      onClick={() => setAuthMode('login')}
                      className="font-bold text-[#58111A] underline cursor-pointer"
                    >
                      Sign In
                    </button>
                  </p>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}

