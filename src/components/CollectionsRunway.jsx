import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Crown, ChevronLeft, ChevronRight, ArrowRight, ArrowDown, Sparkles, Layers, MoveHorizontal } from 'lucide-react';

const CATEGORIES_DATA = [
  {
    index: 0,
    tag: 'Look 01 · Metallic Weft',
    loom: 'Loom 12 · Varanasi',
    title: 'Tissue Silk Sarees',
    subtitle: 'Golden Shimmer & Modern Festive Elegance',
    desc: 'Pure mulberry silk woven with tested 24K real gold and silver zari. Known for its crisp, royal drape that holds its shape beautifully throughout weddings, parties, and festive celebrations.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    metric1Label: 'Zari Quality',
    metric1Val: 'Tested 24K Real Zari',
    metric2Label: 'Drape Feel',
    metric2Val: 'Crisp & Royal',
    filterKey: 'tissue-silk'
  },
  {
    index: 1,
    tag: 'Look 02 · Kadwa Brocade',
    loom: 'Pit-Loom 04 · Varanasi',
    title: 'Banarasi Silk Brocades',
    subtitle: 'Timeless Royal Wedding Classics',
    desc: 'Traditional Kadwa bootis and royal Shikargah motifs handwoven on pure katan silk. Each saree takes up to 120 hours of master weaver dedication with a neat, smooth finish on the reverse.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    metric1Label: 'Weave Technique',
    metric1Val: 'Kadwa Handloom',
    metric2Label: 'Weaving Time',
    metric2Val: '120+ Dedicated Hours',
    filterKey: 'banarasi-silk'
  },
  {
    index: 2,
    tag: 'Look 03 · Butter Soft',
    loom: 'Chanderi Looms',
    title: 'Malai Butter Silk Drapes',
    subtitle: 'Featherlight Comfort & Graceful Drape',
    desc: 'Soft, wrinkle-resistant butter silk that drapes naturally and feels wonderful against the skin. Keeps you feeling elegant and comfortable even after 8+ hours of festive celebrations.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1000&q=85',
    metric1Label: 'Touch & Feel',
    metric1Val: 'Ultra Soft & Smooth',
    metric2Label: 'Wrinkle Resistance',
    metric2Val: 'Crease-Free Drape',
    filterKey: 'malai-silk'
  },
  {
    index: 3,
    tag: 'Look 04 · 3-Shuttle Korvai',
    loom: 'Kanchipuram Guild',
    title: 'Kanjivaram Temple Silks',
    subtitle: 'Pure South Indian Bridal Heritage',
    desc: 'Traditional temple borders handwoven using the authentic Korvai technique on heavy 3-ply mulberry silk, featuring tested gold zari for weddings and auspicious occasions.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
    metric1Label: 'Border Technique',
    metric1Val: '3-Shuttle Korvai',
    metric2Label: 'Silk Purity',
    metric2Val: '3-Ply Heavy Silk',
    filterKey: 'banarasi-silk'
  },
  {
    index: 4,
    tag: 'Look 05 · Scalloped Cutwork',
    loom: 'Jaipur Atelier',
    title: 'Organza & Festive Couture',
    subtitle: 'Delicate Sheer Charm & Handcrafted Borders',
    desc: 'Lightweight, sheer organza silk adorned with handcrafted floral scalloped borders, fine sequins, and delicate thread work—perfect for modern celebrations and cocktail events.',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1000&q=85',
    metric1Label: 'Border Work',
    metric1Val: 'Hand-Cut Floral Scallops',
    metric2Label: 'Drape Weight',
    metric2Val: 'Featherlight Sheer',
    filterKey: 'tissue-silk'
  }
];

export default function CollectionsRunway() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setSelectedCollection } = useStore();

  // Drag / Swipe State
  const [dragStartX, setDragStartX] = useState(null);
  const [dragCurrentX, setDragCurrentX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleSelectWeave = (filterKey) => {
    setSelectedCollection(filterKey);
    const shopElem = document.getElementById('shop');
    if (shopElem) shopElem.scrollIntoView({ behavior: 'smooth' });
  };

  const nextWeave = () => {
    setActiveIndex(prev => (prev + 1) % CATEGORIES_DATA.length);
  };

  const prevWeave = () => {
    setActiveIndex(prev => (prev - 1 + CATEGORIES_DATA.length) % CATEGORIES_DATA.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setDragStartX(e.touches[0].clientX);
    setDragCurrentX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || dragStartX === null) return;
    setDragCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging || dragStartX === null || dragCurrentX === null) {
      setIsDragging(false);
      setDragStartX(null);
      setDragCurrentX(null);
      return;
    }
    const deltaX = dragCurrentX - dragStartX;
    const threshold = 40;
    if (deltaX < -threshold) {
      nextWeave();
    } else if (deltaX > threshold) {
      prevWeave();
    }
    setIsDragging(false);
    setDragStartX(null);
    setDragCurrentX(null);
  };

  // Mouse handlers for desktop click-drag
  const handleMouseDown = (e) => {
    // Only drag on left mouse click
    if (e.button !== 0) return;
    setDragStartX(e.clientX);
    setDragCurrentX(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || dragStartX === null) return;
    setDragCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging || dragStartX === null || dragCurrentX === null) {
      setIsDragging(false);
      setDragStartX(null);
      setDragCurrentX(null);
      return;
    }
    const deltaX = dragCurrentX - dragStartX;
    const threshold = 45;
    if (deltaX < -threshold) {
      nextWeave();
    } else if (deltaX > threshold) {
      prevWeave();
    }
    setIsDragging(false);
    setDragStartX(null);
    setDragCurrentX(null);
  };

  // Active drag delta in pixels
  const dragDelta = isDragging && dragStartX !== null && dragCurrentX !== null
    ? dragCurrentX - dragStartX
    : 0;
  const dragRatio = Math.max(-1, Math.min(1, dragDelta / 320));

  return (
    <section id="collections" className="relative overflow-hidden border-t border-[#C59B51]/20 bg-[#FAF7F2]/40 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Runway Header Bar */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Crown className="w-3.5 h-3.5 text-[#C59B51]" />
              <span>3D Curved Runway · Pure Silk Handloom Collections</span>
            </div>
            
            <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#58111A]">
              Shop by <span className="font-italiana italic text-gold-gradient font-normal">Categories</span>
            </h2>
            
            <p className="text-xs sm:text-sm text-[#7C2335] mt-1.5 max-w-xl font-light">
              Swipe sideways across our 3D cylindrical runway to rotate through signature weaves.
            </p>
          </div>

          {/* Gliding Controls: Counter & Arrows */}
          <div className="flex items-center gap-3 text-xs text-[#7C2335]">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EFE8DA]/80 border border-[#C59B51]/30 shadow-sm">
              <span className="font-cinzel text-base font-bold text-[#58111A]">
                0{activeIndex + 1}
              </span>
              <span className="text-[#C59B51] font-bold">/</span>
              <span className="text-[#7C2335]/70 text-xs font-bold">05</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button 
                onClick={prevWeave}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#58111A] hover:text-white text-[#58111A] border border-[#C59B51]/30 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                aria-label="Previous Category"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextWeave}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#58111A] hover:text-white text-[#58111A] border border-[#C59B51]/30 flex items-center justify-center transition-all shadow-sm cursor-pointer"
                aria-label="Next Category"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Category Pills Selection Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none no-scrollbar">
          {CATEGORIES_DATA.map((cat, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#58111A] text-[#E4C58B] shadow-md border border-[#E4C58B]/40 scale-105'
                    : 'bg-white hover:bg-[#EFE8DA] text-[#58111A] border border-[#C59B51]/25'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#E4C58B]' : 'bg-[#58111A]/40'}`} />
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3D CYLINDRICAL CURVED SCREEN RUNWAY (SWIPE 1 AND NEXT COMES FROM CURVE)   */}
        {/* ========================================================================= */}
        <div 
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-[580px] sm:h-[620px] my-4 flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing select-none"
          style={{ 
            perspective: '1300px',
            perspectiveOrigin: 'center center'
          }}
        >
          {CATEGORIES_DATA.map((weave, i) => {
            // Calculate circular offset relative to activeIndex
            let offset = i - activeIndex;
            const total = CATEGORIES_DATA.length;
            if (offset > total / 2) offset -= total;
            if (offset < -total / 2) offset += total;

            // Combine with live drag gesture for fluid touch response
            const effectiveOffset = offset + dragRatio;

            // 3D Curved Cylindrical Screen Geometry Calculations:
            // Center (0): flat, scale 1, zIndex 25
            // Right (1): curves inward (-26deg), translateX 72%, pushed back (-90px), scale 0.86, zIndex 10
            // Left (-1): curves inward (+26deg), translateX -72%, pushed back (-90px), scale 0.86, zIndex 10
            const translateX = effectiveOffset * 72; // percent
            const rotateY = effectiveOffset * -26;   // degrees curved screen rotation
            const translateZ = -Math.abs(effectiveOffset) * 90; // px
            const scale = Math.max(0.65, 1 - Math.abs(effectiveOffset) * 0.14);
            const opacity = Math.max(0, 1 - Math.abs(effectiveOffset) * 0.38);
            const zIndex = Math.round(25 - Math.abs(effectiveOffset) * 10);
            const isCenter = Math.abs(effectiveOffset) < 0.35;

            return (
              <div
                key={weave.title}
                onClick={() => {
                  if (offset === 1) nextWeave();
                  else if (offset === -1) prevWeave();
                }}
                style={{
                  transform: `translate3d(calc(-50% + ${translateX}%), 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                  transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease',
                  willChange: 'transform, opacity'
                }}
                className={`absolute left-1/2 top-0 bottom-0 w-[84%] sm:w-[480px] max-w-[500px] h-full transition-shadow duration-300 ${
                  isCenter ? 'pointer-events-auto shadow-2xl' : 'cursor-pointer hover:opacity-90 shadow-lg'
                }`}
              >
                {/* 3D Cylindrical Screen Card Surface */}
                <div className="w-full h-full bg-[#FAF7F2] border-2 border-[#C59B51]/35 rounded-[30px] overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-6 text-left relative">
                  
                  {/* Subtle Curved Screen Surface Sheen Reflection */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-[#C59B51]/10 pointer-events-none rounded-[30px]" />

                  {/* Visual Saree Runway Image */}
                  <div 
                    className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-md shrink-0 cursor-pointer group"
                    onClick={() => isCenter && handleSelectWeave(weave.filterKey)}
                  >
                    <img 
                      src={weave.image} 
                      alt={weave.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 pointer-events-none" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B070D]/85 via-black/20 to-transparent pointer-events-none" />
                    
                    {/* Look Tag Badge */}
                    <span className="absolute top-3 left-3 bg-[#2B070D]/90 text-[#E4C58B] border border-[#C59B51]/40 text-[9px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider backdrop-blur-xs">
                      {weave.tag}
                    </span>
                    
                    {/* Silk Mark Certified Badge */}
                    <span className="absolute top-3 right-3 bg-white/95 text-[#2B070D] text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5 text-[#C59B51]" /> Silk Mark
                    </span>

                    {/* Loom Guild Origin Bottom Caption */}
                    <div className="absolute bottom-3 left-3 right-3 text-[#F8F5EE]">
                      <span className="text-[10px] tracking-widest uppercase font-bold text-[#E4C58B] block">
                        {weave.loom}
                      </span>
                      <p className="text-[11px] text-[#FAF7F2]/90 italic font-light">Direct from Master Artisans</p>
                    </div>
                  </div>

                  {/* Editorial Runway Details */}
                  <div className="py-2.5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#C59B51]">
                          Category 0{i + 1} of 05
                        </span>
                        <span className="text-[10px] text-[#7C2335] font-semibold bg-[#EFE8DA] px-2 py-0.5 rounded-full">
                          Authentic Handloom
                        </span>
                      </div>

                      <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#58111A] leading-tight">
                        {weave.title}
                      </h3>
                      
                      <span className="font-italiana italic text-[#C59B51] text-xs sm:text-sm block mt-0.5">
                        {weave.subtitle}
                      </span>
                      
                      <p className="text-xs text-[#7C2335] mt-2 line-clamp-2 leading-relaxed font-light">
                        {weave.desc}
                      </p>
                    </div>

                    {/* Technical Specifications Strip */}
                    <div className="grid grid-cols-2 gap-3 py-2.5 my-2 border-y border-[#C59B51]/20 text-[11px]">
                      <div>
                        <span className="text-[9px] text-[#7C2335] uppercase tracking-wider block font-semibold">
                          {weave.metric1Label}
                        </span>
                        <span className="font-bold text-[#58111A]">{weave.metric1Val}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#7C2335] uppercase tracking-wider block font-semibold">
                          {weave.metric2Label}
                        </span>
                        <span className="font-bold text-[#C59B51] font-cormorant text-base">{weave.metric2Val}</span>
                      </div>
                    </div>

                    {/* Primary Category CTA Button */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectWeave(weave.filterKey);
                      }}
                      className="btn-luxury-primary w-full !py-2.5 !text-xs mt-1 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] transition-transform"
                    >
                      <span>Explore {weave.title}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Swipe Hint Indicator */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#7C2335] mt-2 mb-6">
          <MoveHorizontal className="w-4 h-4 text-[#C59B51] animate-pulse" />
          <span className="text-[11px] font-medium">Swipe sideways or tap side cards to rotate 3D curved categories</span>
        </div>

        {/* Runway Footer Progress Bar */}
        <div className="w-full mt-4 flex items-center justify-between gap-6">
          <div className="flex-1 bg-[#EFE8DA]/80 h-1.5 rounded-full overflow-hidden border border-[#C59B51]/20">
            <div 
              className="bg-gradient-to-r from-[#C59B51] via-[#E4C58B] to-[#C59B51] h-full rounded-full transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / 5) * 100}%` }}
            />
          </div>
          <button 
            onClick={() => handleSelectWeave('all')}
            className="btn-luxury-outline !py-2 !px-5 !text-[11px] shrink-0 cursor-pointer"
          >
            <span>View All Sarees</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C59B51]" />
          </button>
        </div>

      </div>
    </section>
  );
}
