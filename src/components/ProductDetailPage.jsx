import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowLeft, Star, ShoppingBag, Zap, Heart, ShieldCheck, 
  Truck, RotateCcw, CheckCircle2, ChevronRight, Share2, Sparkles, MapPin
} from 'lucide-react';

export default function ProductDetailPage() {
  const { 
    products, 
    activeProductId, 
    goBackToCatalog, 
    addToCart, 
    isInWishlist, 
    toggleWishlist, 
    formatPrice, 
    setCheckoutOpen,
    showToast,
    openProductPage
  } = useStore();

  const product = products.find(p => p.id === activeProductId) || products[0];

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(product ? product.variants[0] : '');
  const [blouseOption, setBlouseOption] = useState('unstitched');
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedVariant(product.variants[0]);
      setActiveImgIdx(0);
    }
  }, [product]);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  // Blouse option additional cost
  const blouseExtraPrice = blouseOption === 'tailored' ? 1499 : (blouseOption === 'prepleated' ? 999 : 0);
  const finalPrice = product.price + blouseExtraPrice;

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length === 6 && /^\d+$/.test(pincode.trim())) {
      setPincodeStatus({
        valid: true,
        date: 'Delivery in 2 to 4 Days (By Saturday, 22 Nov)',
        cod: true
      });
      showToast('Delivery available for pincode ' + pincode, 'gold');
    } else {
      setPincodeStatus({
        valid: false,
        message: 'Please enter a valid 6-digit Indian pincode'
      });
    }
  };

  const handleBuyNow = () => {
    addToCart(product.id, selectedVariant, 1);
    setCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this handcrafted ${product.name} from कला KRUTI by Vyara · Threads of culture, Beads of joy`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Saree link copied to clipboard!', 'gold');
    }
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.collection === product.collection).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#58111A] pt-4 pb-20 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Flipkart-Style Breadcrumb Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-b border-[#C59B51]/20 mb-6 text-xs text-[#7C2335]">
          <div className="flex items-center gap-1.5 flex-wrap">
            <button 
              onClick={goBackToCatalog}
              className="flex items-center gap-1 text-[#58111A] font-bold hover:text-[#C59B51] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Sarees</span>
            </button>
            <span className="text-[#C59B51] font-bold">/</span>
            <span>Handloom Silk</span>
            <span className="text-[#C59B51] font-bold">/</span>
            <span className="font-semibold text-[#58111A]">{product.collectionName}</span>
            <span className="text-[#C59B51] font-bold">/</span>
            <span className="truncate max-w-[200px] text-[#7C2335]">{product.name}</span>
          </div>

          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs text-[#58111A] hover:text-[#C59B51] font-semibold transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>
        </div>

        {/* Main Two-Column Flipkart Product Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* ================= LEFT COLUMN: IMAGES & FLIPKART DUAL ACTION BUTTONS ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 self-start space-y-4">
            
            {/* Main Stage Image Frame */}
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[#C59B51]/30 shadow-lg group">
              <img 
                src={product.images[activeImgIdx] || product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Tag Badge */}
              <span className="absolute top-4 left-4 bg-[#2B070D]/90 text-[#E4C58B] border border-[#C59B51]/40 text-[9px] px-3 py-1 rounded-full font-semibold uppercase tracking-wider shadow-md">
                {product.tag}
              </span>

              {/* Wishlist Heart Button */}
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 w-9 h-9 rounded-full ${
                  isWishlisted ? 'bg-[#58111A] text-white' : 'bg-white/90 text-[#58111A] hover:bg-white'
                } flex items-center justify-center transition-all shadow-md`}
                title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Clickable Image Thumbnails Gallery */}
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-16 h-20 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImgIdx === idx ? 'border-[#58111A] scale-105 shadow-md' : 'border-[#C59B51]/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Flipkart-Style Dual Action Buttons (Desktop & Tablet) */}
            <div className="hidden sm:grid grid-cols-2 gap-3 pt-2">
              <button 
                onClick={() => addToCart(product.id, selectedVariant, 1)}
                className="py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#ECCF96] via-[#C59B51] to-[#8F6929] hover:brightness-105 text-[#2B070D] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-[#2B070D]" />
                <span>Add to Bag</span>
              </button>

              <button 
                onClick={handleBuyNow}
                className="py-3.5 px-6 rounded-xl bg-[#58111A] hover:bg-[#3B0910] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                <Zap className="w-4 h-4 text-[#E4C58B] fill-current" />
                <span>Buy Now</span>
              </button>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: PRODUCT SPECIFICATIONS & DETAILS ================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Brand Header */}
            <div>
              <div className="flex items-center gap-2 text-xs text-[#C59B51] font-bold uppercase tracking-widest mb-1.5">
                <span>कला KRUTI by Vyara</span>
                <span>·</span>
                <span>{product.weaveType}</span>
              </div>

              <h1 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold text-[#58111A] leading-tight">
                {product.name}
              </h1>

              {/* Star Rating Badge */}
              <div className="flex items-center gap-2.5 mt-2.5">
                <span className="flex items-center gap-1 bg-[#2B070D] text-[#E4C58B] text-xs font-bold px-2 py-0.5 rounded-md">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-current text-[#E4C58B]" />
                </span>
                <span className="text-xs text-[#7C2335] font-medium">
                  {product.reviewsCount} Ratings & 14 Customer Reviews
                </span>
                <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  In Stock · Ready to Ship
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="p-4 rounded-2xl bg-white border border-[#C59B51]/25 flex flex-col gap-1 shadow-sm">
              <div className="flex items-baseline gap-3">
                <span className="font-cormorant text-3xl sm:text-4xl font-bold text-[#58111A]">
                  {formatPrice(finalPrice)}
                </span>
                <span className="text-sm text-[#7C2335]/60 line-through">
                  {formatPrice(product.originalPrice + blouseExtraPrice)}
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  {discountPercent}% OFF
                </span>
              </div>
              <span className="text-[11px] text-[#7C2335]/80">
                Inclusive of all taxes · Free Pan-India Delivery
              </span>
            </div>

            {/* Flipkart-Style Special Offers Banner */}
            <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#C59B51]/30 space-y-2 text-xs text-[#58111A]">
              <div className="flex items-center gap-1.5 font-bold uppercase text-[11px] text-[#C59B51]">
                <Sparkles className="w-3.5 h-3.5 text-[#C59B51]" />
                <span>Available Exclusive Offers</span>
              </div>
              <p className="flex items-start gap-2">
                <span className="font-bold text-emerald-800 shrink-0">Special Price:</span>
                <span>Get flat 10% instant savings on checkout with coupon <strong>ROYAL10</strong>.</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="font-bold text-emerald-800 shrink-0">Bridal Gift:</span>
                <span>Complimentary certified Silk Mark seal & storage pouch included.</span>
              </p>
            </div>

            {/* Color / Variant Swatch Selector */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-[#58111A] uppercase tracking-wider">
                Select Saree Color / Tone: <span className="text-[#C59B51] font-semibold">{selectedVariant}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.variants.map((v) => {
                  const isSel = selectedVariant === v;
                  return (
                    <button
                      key={v}
                      onClick={() => setSelectedVariant(v)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                        isSel 
                          ? 'bg-[#58111A] text-white border-2 border-[#58111A] shadow-md' 
                          : 'bg-white text-[#58111A] border border-[#C59B51]/40 hover:border-[#58111A]'
                      }`}
                    >
                      {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-[#E4C58B]" />}
                      <span>{v}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blouse Customization Option (Flipkart Style Add-ons) */}
            <div className="space-y-2.5">
              <label className="block text-xs font-bold text-[#58111A] uppercase tracking-wider">
                Blouse Stitching & Drape Customization:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                
                <label className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  blouseOption === 'unstitched' ? 'border-[#58111A] bg-white shadow-sm' : 'border-[#C59B51]/30 bg-white/60'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#58111A]">Unstitched</span>
                    <input 
                      type="radio" 
                      name="blouse" 
                      checked={blouseOption === 'unstitched'} 
                      onChange={() => setBlouseOption('unstitched')} 
                    />
                  </div>
                  <span className="text-[10px] text-emerald-800 font-bold block">Included Free (0.9m)</span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  blouseOption === 'tailored' ? 'border-[#58111A] bg-white shadow-sm' : 'border-[#C59B51]/30 bg-white/60'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#58111A]">Custom Stitched</span>
                    <input 
                      type="radio" 
                      name="blouse" 
                      checked={blouseOption === 'tailored'} 
                      onChange={() => setBlouseOption('tailored')} 
                    />
                  </div>
                  <span className="text-[10px] text-[#58111A] font-bold block">+₹1,499 (Tailored to fit)</span>
                </label>

                <label className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  blouseOption === 'prepleated' ? 'border-[#58111A] bg-white shadow-sm' : 'border-[#C59B51]/30 bg-white/60'
                }`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#58111A]">Ready to Wear</span>
                    <input 
                      type="radio" 
                      name="blouse" 
                      checked={blouseOption === 'prepleated'} 
                      onChange={() => setBlouseOption('prepleated')} 
                    />
                  </div>
                  <span className="text-[10px] text-[#58111A] font-bold block">+₹999 (Pre-pleated)</span>
                </label>

              </div>
            </div>

            {/* Flipkart-Style Delivery Pincode Checker */}
            <div className="p-4 rounded-2xl bg-white border border-[#C59B51]/25 space-y-2">
              <label className="block text-xs font-bold text-[#58111A] uppercase tracking-wider">
                Check Delivery & COD Availability:
              </label>
              
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C2335]/60 pointer-events-none z-10" />
                  <input 
                    type="text" 
                    placeholder="Enter 6-digit Pincode (e.g. 400001)"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    style={{ paddingLeft: '3.25rem' }}
                    className="w-full !pl-14 pr-3 py-2.5 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-[#FAF7F2] focus:outline-none focus:border-[#58111A] input-with-icon"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#58111A] text-white text-xs font-bold uppercase hover:bg-[#3B0910] transition-colors"
                >
                  Check
                </button>
              </form>

              {pincodeStatus && (
                <div className="pt-1 text-xs">
                  {pincodeStatus.valid ? (
                    <div className="space-y-1 text-emerald-800 font-semibold">
                      <p className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5" />
                        <span>{pincodeStatus.date}</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-[11px] text-[#58111A]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Cash on Delivery is available for this location</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-red-700 font-medium">{pincodeStatus.message}</p>
                  )}
                </div>
              )}
            </div>

            {/* Saree Craft & Weave Specifications Table */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-[#58111A] uppercase tracking-wider">
                Product Details & Craft Specifications
              </h4>

              <div className="rounded-2xl border border-[#C59B51]/25 overflow-hidden bg-white text-xs text-[#58111A]">
                <div className="grid grid-cols-2 p-3 border-b border-[#C59B51]/15 bg-[#FAF7F2]/60">
                  <span className="text-[#7C2335] font-semibold">Fabric Material</span>
                  <span className="font-bold">{product.fabric}</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-[#C59B51]/15">
                  <span className="text-[#7C2335] font-semibold">Zari Type</span>
                  <span className="font-bold">{product.zariType}</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-[#C59B51]/15 bg-[#FAF7F2]/60">
                  <span className="text-[#7C2335] font-semibold">Weave Technique</span>
                  <span className="font-bold">{product.weaveType}</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-[#C59B51]/15">
                  <span className="text-[#7C2335] font-semibold">Total Saree Length</span>
                  <span className="font-bold">{product.length}</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-[#C59B51]/15 bg-[#FAF7F2]/60">
                  <span className="text-[#7C2335] font-semibold">Blouse Piece Included</span>
                  <span className="font-bold">{product.blousePiece}</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-[#C59B51]/15">
                  <span className="text-[#7C2335] font-semibold">Certification</span>
                  <span className="font-bold text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Silk Mark Guarantee
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-[#7C2335] font-semibold">Care Instructions</span>
                  <span className="font-medium text-[#7C2335]">Dry Clean Only · Store in Pure Cotton Saree Bag</span>
                </div>
              </div>
            </div>

            {/* Narrative Description */}
            <div className="p-4 rounded-2xl bg-white border border-[#C59B51]/20 space-y-2">
              <h4 className="text-xs font-bold text-[#58111A] uppercase tracking-wider">
                Weaver's Description
              </h4>
              <p className="text-xs sm:text-sm text-[#7C2335] leading-relaxed font-normal">
                {product.description}
              </p>
            </div>

            {/* Trust Badges Bar */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] sm:text-xs text-[#58111A] pt-2">
              <div className="p-3 rounded-xl bg-white border border-[#C59B51]/20">
                <ShieldCheck className="w-5 h-5 mx-auto text-[#C59B51] mb-1" />
                <span className="font-bold block">100% Silk Mark</span>
                <span className="text-[9px] text-[#7C2335]">Certified Pure Silk</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#C59B51]/20">
                <Truck className="w-5 h-5 mx-auto text-[#C59B51] mb-1" />
                <span className="font-bold block">Free Air Shipping</span>
                <span className="text-[9px] text-[#7C2335]">Across India</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#C59B51]/20">
                <RotateCcw className="w-5 h-5 mx-auto text-[#C59B51] mb-1" />
                <span className="font-bold block">7-Day Exchange</span>
                <span className="text-[9px] text-[#7C2335]">Hassle-Free Returns</span>
              </div>
            </div>

          </div>

        </div>

        {/* Similar / Related Sarees Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pt-10 border-t border-[#C59B51]/20">
            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#58111A] mb-6">
              You May Also Like from {product.collectionName}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map(rel => (
                <div 
                  key={rel.id}
                  onClick={() => openProductPage(rel.id)}
                  className="bg-white rounded-2xl border border-[#C59B51]/25 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer p-2.5 group"
                >
                  <div className="aspect-[3/4] rounded-xl overflow-hidden bg-[#EFE8DA] mb-2">
                    <img 
                      src={rel.images[0]} 
                      alt={rel.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  <h4 className="font-cormorant text-sm font-bold text-[#58111A] truncate group-hover:text-[#C59B51]">
                    {rel.name}
                  </h4>
                  <span className="text-xs font-bold text-[#58111A] block mt-0.5 font-cormorant">
                    {formatPrice(rel.price)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Mobile Sticky Bottom Action Bar (Flipkart Standard Mobile Experience) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#C59B51]/30 p-2.5 flex gap-2 shadow-2xl">
        <button 
          onClick={() => addToCart(product.id, selectedVariant, 1)}
          className="flex-1 py-3 rounded-xl bg-[#FAF7F2] border border-[#C59B51] text-[#58111A] font-bold text-xs uppercase flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4 text-[#C59B51]" />
          <span>Add to Bag</span>
        </button>

        <button 
          onClick={handleBuyNow}
          className="flex-1 py-3 rounded-xl bg-[#58111A] text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 shadow-md"
        >
          <Zap className="w-4 h-4 text-[#E4C58B] fill-current" />
          <span>Buy Now</span>
        </button>
      </div>

    </div>
  );
}

