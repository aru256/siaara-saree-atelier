import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const { 
    wishlist, 
    products, 
    wishlistOpen, 
    setWishlistOpen, 
    toggleWishlist, 
    addToCart, 
    formatPrice 
  } = useStore();

  if (!wishlistOpen) return null;

  const wishlistedProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setWishlistOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-[#C59B51]/25 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#58111A] fill-[#58111A]" />
            <h3 className="font-cinzel text-base font-bold text-[#58111A] tracking-wider uppercase">
              Wishlist ({wishlistedProducts.length})
            </h3>
          </div>
          <button 
            onClick={() => setWishlistOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EFE8DA] text-[#58111A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlistedProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Heart className="w-12 h-12 text-[#7C2335]/40 mx-auto" />
              <h4 className="font-cormorant text-2xl font-bold text-[#58111A]">No Sarees Saved Yet</h4>
              <p className="text-xs text-[#7C2335]">Click the heart icon on any saree to save it to your private wishlist.</p>
              <button 
                onClick={() => setWishlistOpen(false)}
                className="btn-luxury-primary !py-2 !px-5 !text-xs mt-2"
              >
                Explore Catalog
              </button>
            </div>
          ) : (
            wishlistedProducts.map(product => (
              <div 
                key={product.id}
                className="p-3.5 rounded-2xl bg-white border border-[#C59B51]/20 flex gap-3.5 shadow-sm text-left"
              >
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-20 h-24 object-cover rounded-xl bg-[#EFE8DA] shrink-0" 
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-cormorant text-sm font-bold text-[#58111A] leading-snug line-clamp-2">
                        {product.name}
                      </h4>
                      <button 
                        onClick={() => toggleWishlist(product.id)}
                        className="text-[#7C2335]/60 hover:text-red-700 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[10px] text-[#C59B51] font-bold block mt-0.5">
                      {product.collectionName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-cormorant text-sm font-bold text-[#58111A]">
                      {formatPrice(product.price)}
                    </span>

                    <button 
                      onClick={() => {
                        addToCart(product.id);
                        toggleWishlist(product.id);
                      }}
                      className="px-3 py-1 rounded-full bg-[#58111A] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 hover:bg-[#3B0910] transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#E4C58B]" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

