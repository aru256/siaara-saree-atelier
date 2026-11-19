import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Star, ShieldCheck, Check } from 'lucide-react';

export default function ProductModal() {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    formatPrice 
  } = useStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentVariant = selectedVariant || product.variants[0];
  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAdd = () => {
    addToCart(product.id, currentVariant);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl border border-[#C59B51]/35 shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 text-[#58111A] flex items-center justify-center hover:bg-[#58111A] hover:text-white transition-colors shadow-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left Column: Image Showcase & Thumbnails */}
        <div className="md:w-1/2 p-5 flex flex-col justify-between bg-white border-b md:border-b-0 md:border-r border-[#C59B51]/20">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#EFE8DA] shadow-inner mb-3">
            <img 
              src={product.images[activeImageIdx] || product.images[0]} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300" 
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`w-14 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                  activeImageIdx === idx ? 'border-[#58111A] scale-105 shadow-sm' : 'border-transparent opacity-70'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Saree Specs & Purchasing */}
        <div className="md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between text-left space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs text-[#7C2335] mb-1 font-semibold uppercase tracking-wider">
              <span className="text-[#C59B51] font-bold">{product.collectionName}</span>
              <span className="flex items-center gap-1 text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded">
                <Star className="w-3 h-3 fill-current text-amber-500" /> {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#58111A] leading-tight">
              {product.name}
            </h3>

            {/* Price Box */}
            <div className="flex items-baseline gap-2.5 mt-2">
              <span className="font-cormorant text-2xl font-bold text-[#58111A]">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs text-[#7C2335]/60 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              {discountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <p className="text-xs text-[#7C2335] leading-relaxed mt-3 font-normal">
              {product.description}
            </p>

            {/* Color / Variant Swatches */}
            <div className="mt-4 pt-3 border-t border-[#C59B51]/20">
              <label className="block text-[11px] font-bold text-[#58111A] uppercase tracking-wider mb-2">
                Available Tones:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const isSel = currentVariant === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSel 
                          ? 'bg-[#58111A] text-white border border-[#58111A]' 
                          : 'bg-white text-[#58111A] border border-[#C59B51]/40 hover:border-[#58111A]'
                      }`}
                    >
                      {isSel && <Check className="w-3 h-3 text-[#E4C58B]" />}
                      <span>{v}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Hallmark Specifications */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white border border-[#C59B51]/20 text-[11px] space-y-1.5 text-[#7C2335]">
              <div className="flex justify-between">
                <span className="font-semibold">Fabric:</span>
                <span className="text-[#58111A] font-medium">{product.fabric}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Zari Type:</span>
                <span className="text-[#58111A] font-medium">{product.zariType}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Blouse Piece:</span>
                <span className="text-[#58111A] font-medium">{product.blousePiece}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Length:</span>
                <span className="text-[#58111A] font-medium">{product.length}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 pt-3 border-t border-[#C59B51]/20">
            <button 
              onClick={handleAdd}
              className="btn-luxury-primary flex-1 !py-3 !text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4 text-[#E4C58B]" />
              <span>Add to Shopping Bag</span>
            </button>

            <button 
              onClick={() => toggleWishlist(product.id)}
              className={`p-3 rounded-full border border-[#C59B51]/40 ${
                isWishlisted ? 'bg-[#58111A] text-white' : 'bg-white text-[#58111A] hover:bg-[#EFE8DA]'
              } transition-colors shadow-sm`}
              title="Save to Wishlist"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

