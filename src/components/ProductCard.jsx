import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Eye, Star, ShoppingBag } from 'lucide-react';

export default function ProductCard({ product }) {
  const { 
    isInWishlist, 
    toggleWishlist, 
    addToCart, 
    formatPrice, 
    setQuickViewProduct 
  } = useStore();

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="product-card group flex flex-col justify-between bg-white rounded-2xl border border-[#C59B51]/25 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div>
        {/* Saree Image Container */}
        <div 
          className="relative overflow-hidden aspect-[3/4] bg-[#EFE8DA] cursor-pointer"
          onClick={() => setQuickViewProduct(product)}
        >
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />

          {/* Tag Badge */}
          <span className="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 bg-[#2B070D]/90 text-[#E4C58B] border border-[#C59B51]/40 text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider shadow-md">
            {product.tag}
          </span>

          {/* Wishlist Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }} 
            className={`absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${
              isWishlisted ? 'bg-[#58111A] text-white' : 'bg-white/90 text-[#58111A] hover:bg-white'
            } flex items-center justify-center transition-all shadow-md`}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View Button (Desktop Hover) */}
          <div className="hidden sm:block absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              className="w-full py-2 rounded-full bg-white/95 text-[#2B070D] font-bold text-[11px] shadow-lg hover:bg-[#58111A] hover:text-[#FAF7F2] transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <Eye className="w-3.5 h-3.5" /> Quick View
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-3 sm:p-4 pb-2 text-left">
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] text-[#7C2335] mb-1 font-semibold uppercase tracking-wider">
            <span className="text-[#C59B51] font-bold">{product.collectionName}</span>
            <span className="flex items-center gap-0.5 text-amber-800 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[9px]">
              <Star className="w-2.5 h-2.5 fill-current text-amber-500" /> {product.rating}
            </span>
          </div>

          <h3 
            onClick={() => setQuickViewProduct(product)}
            className="font-cormorant text-sm sm:text-base font-bold text-[#58111A] hover:text-[#C59B51] transition-colors cursor-pointer truncate leading-snug"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Color Swatch Indicator */}
          <div className="flex items-center gap-1.5 mt-1 text-[9px] sm:text-[10px] text-[#7C2335] uppercase">
            <span 
              className="inline-block w-2.5 h-2.5 rounded-full border border-[#EFE8DA] shadow-xs" 
              style={{ backgroundColor: product.colorHex }}
            />
            <span className="truncate">{product.color}</span>
          </div>
        </div>
      </div>

      {/* Price & Action Button (Flipkart Shopping Standard) */}
      <div className="p-3 sm:p-4 pt-2 border-t border-[#C59B51]/15 flex items-end justify-between mt-auto gap-2">
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <span className="font-cormorant text-base sm:text-lg font-bold text-[#58111A] leading-none">
              {formatPrice(product.price)}
            </span>
            {discountPercent > 0 && (
              <span className="text-[9px] sm:text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1 py-0.2 rounded leading-none">
                {discountPercent}% OFF
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] text-[#7C2335]/60 line-through mt-0.5 leading-none">
            {formatPrice(product.originalPrice)}
          </span>
        </div>

        <button 
          onClick={() => addToCart(product.id)}
          className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#58111A] hover:bg-[#3B0910] text-[#FAF7F2] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1 shadow-sm shrink-0 hover:scale-105"
          title="Add to Shopping Bag"
        >
          <ShoppingBag className="w-3 h-3 text-[#E4C58B]" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}

