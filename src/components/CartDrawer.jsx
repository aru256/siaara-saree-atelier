import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    cartOpen, 
    setCartOpen, 
    updateCartQty, 
    removeFromCart, 
    cartSubtotal, 
    formatPrice,
    setCheckoutOpen,
    showToast
  } = useStore();

  const [promoInput, setPromoInput] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!cartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (clean === 'ROYAL10') {
      setDiscountPercent(10);
      showToast('10% Royal Welcome Discount Applied!', 'gold');
    } else if (clean === 'BRIDAL20') {
      setDiscountPercent(20);
      showToast('20% Bridal Celebration Discount Applied!', 'gold');
    } else {
      showToast('Invalid coupon code. Try ROYAL10 or BRIDAL20', 'info');
    }
  };

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const finalTotal = cartSubtotal - discountAmount;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setCartOpen(false)}
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#C59B51]/25 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#58111A]" />
            <h3 className="font-cinzel text-base font-bold text-[#58111A] tracking-wider uppercase">
              Shopping Bag ({cart.length})
            </h3>
          </div>
          <button 
            onClick={() => setCartOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EFE8DA] text-[#58111A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF7F2] px-5 py-2.5 border-b border-[#C59B51]/15 text-left">
          <div className="flex items-center gap-1.5 text-xs text-[#58111A] font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B51]" />
            <span>Complimentary Pan-India Air Express Delivery Applied</span>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <ShoppingBag className="w-12 h-12 text-[#7C2335]/40 mx-auto" />
              <h4 className="font-cormorant text-2xl font-bold text-[#58111A]">Your Bag Is Empty</h4>
              <p className="text-xs text-[#7C2335]">Explore our pure handloom collections and find your dream drape.</p>
              <button 
                onClick={() => setCartOpen(false)}
                className="btn-luxury-primary !py-2 !px-5 !text-xs mt-2"
              >
                Browse Sarees
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div 
                key={`${item.product.id}-${item.variant}`}
                className="p-3.5 rounded-2xl bg-white border border-[#C59B51]/20 flex gap-3.5 shadow-sm text-left"
              >
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name}
                  className="w-20 h-24 object-cover rounded-xl bg-[#EFE8DA] shrink-0" 
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-cormorant text-sm font-bold text-[#58111A] leading-snug line-clamp-2">
                        {item.product.name}
                      </h4>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.variant)}
                        className="text-[#7C2335]/60 hover:text-red-700 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[10px] text-[#7C2335] block mt-0.5">
                      Tone: {item.variant}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-cormorant text-sm font-bold text-[#58111A]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>

                    {/* Quantity Selector */}
                    <div className="flex items-center border border-[#C59B51]/30 rounded-full bg-[#FAF7F2] px-2 py-0.5 gap-2">
                      <button 
                        onClick={() => updateCartQty(item.product.id, item.variant, -1)}
                        className="text-[#58111A] hover:text-[#C59B51] p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[#58111A] min-w-4 text-center">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateCartQty(item.product.id, item.variant, 1)}
                        className="text-[#58111A] hover:text-[#C59B51] p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#C59B51]/25 bg-white space-y-3.5 text-left">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input 
                type="text" 
                placeholder="Promo code (e.g. ROYAL10)" 
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-full border border-[#C59B51]/40 text-xs text-[#58111A] uppercase focus:outline-none focus:border-[#58111A] bg-[#FAF7F2]"
              />
              <button 
                type="submit" 
                className="px-3.5 py-1.5 rounded-full bg-[#58111A] text-white text-xs font-bold uppercase"
              >
                Apply
              </button>
            </form>

            <div className="space-y-1.5 text-xs text-[#7C2335]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#58111A]">{formatPrice(cartSubtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-800 font-semibold">
                  <span>Special Coupon ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Pan-India Delivery</span>
                <span className="font-semibold text-emerald-800 uppercase text-[10px]">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#58111A] pt-2 border-t border-[#C59B51]/20">
                <span>Total Amount</span>
                <span className="font-cormorant text-lg">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button 
              onClick={() => {
                setCartOpen(false);
                setCheckoutOpen(true);
              }}
              className="btn-luxury-primary w-full !py-3 !text-xs flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

