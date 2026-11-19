import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Crown, ChevronLeft, ChevronRight, ArrowRight, ArrowDown } from 'lucide-react';

const RUNWAY_WEAVES = [
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
    title: 'Banarasi Katan Brocades',
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
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1000&q=85',
    metric1Label: 'Border Technique',
    metric1Val: '3-Shuttle Korvai',
    metric2Label: 'Silk Purity',
    metric2Val: '3-Ply Heavy Silk',
    filterKey: 'kanjivaram-silk'
  },
  {
    index: 4,
    tag: 'Look 05 · Scalloped Cutwork',
    loom: 'Jaipur Atelier',
    title: 'Organza & Festive Couture',
    subtitle: 'Delicate Sheer Charm & Handcrafted Borders',
    desc: 'Lightweight, sheer organza silk adorned with handcrafted floral scalloped borders, fine sequins, and delicate thread work—perfect for modern celebrations and cocktail events.',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1000&q=85',
    metric1Label: 'Border Work',
    metric1Val: 'Hand-Cut Floral Scallops',
    metric2Label: 'Drape Weight',
    metric2Val: 'Featherlight Sheer',
    filterKey: 'organza-silk'
  }
];

export default function CollectionsRunway() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setSelectedCollection } = useStore();

  const handleSelectWeave = (filterKey) => {
    setSelectedCollection(filterKey);
    const shopElem = document.getElementById('shop');
    if (shopElem) shopElem.scrollIntoView({ behavior: 'smooth' });
  };

  const nextWeave = () => {
    setActiveIndex(prev => (prev + 1) % RUNWAY_WEAVES.length);
  };

  const prevWeave = () => {
    setActiveIndex(prev => (prev - 1 + RUNWAY_WEAVES.length) % RUNWAY_WEAVES.length);
  };

  const current = RUNWAY_WEAVES[activeIndex];

  return (
    <section id="collections" className="relative overflow-hidden border-t border-[#C59B51]/20 bg-[#FAF7F2]/40 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Runway Header Bar */}
        <div className="w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider mb-2.5">
              <Crown className="w-3.5 h-3.5 text-[#C59B51]" />
              <span>Explore by Fabric · Signature Handloom Weaves</span>
            </div>
            <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#58111A]">
              The Five Signature <span className="font-italiana italic text-gold-gradient font-normal">Weaves</span>
            </h2>
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
                className="w-9 h-9 rounded-full bg-white hover:bg-[#58111A] hover:text-white text-[#58111A] border border-[#C59B51]/30 flex items-center justify-center transition-all shadow-sm"
                aria-label="Previous Weave"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={nextWeave}
                className="w-9 h-9 rounded-full bg-white hover:bg-[#58111A] hover:text-white text-[#58111A] border border-[#C59B51]/30 flex items-center justify-center transition-all shadow-sm"
                aria-label="Next Weave"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Runway Editorial Panel Card */}
        <div className="bg-[#FAF7F2] border border-[#C59B51]/30 rounded-[28px] p-6 sm:p-10 shadow-xl transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Column */}
            <div 
              className="md:col-span-6 aspect-[4/5] rounded-[22px] overflow-hidden shadow-2xl relative cursor-pointer group"
              onClick={() => handleSelectWeave(current.filterKey)}
            >
              <img 
                src={current.image} 
                alt={current.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B070D]/80 via-transparent to-transparent" />
              <span className="absolute top-4 left-4 bg-[#2B070D]/90 text-[#E4C58B] border border-[#C59B51]/40 text-[9px] px-2.5 py-1 rounded-full font-semibold uppercase tracking-wider">
                {current.tag}
              </span>
              <div className="absolute bottom-4 left-4 right-4 text-[#F8F5EE]">
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#E4C58B] block">
                  {current.loom}
                </span>
                <p className="text-xs text-[#FAF7F2]/80 italic">Direct from Master Artisans</p>
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className="md:col-span-6 flex flex-col justify-between space-y-5 text-left">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-bold text-[#C59B51] block mb-1">
                  Weave {activeIndex + 1} / 5
                </span>
                <h3 className="font-cormorant text-3xl sm:text-5xl font-bold text-[#58111A] leading-tight">
                  {current.title}
                </h3>
                <span className="font-italiana italic text-[#C59B51] text-lg block mt-1">
                  {current.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-[#7C2335] mt-3 font-normal leading-relaxed">
                  {current.desc}
                </p>
              </div>

              {/* Technical Specifications */}
              <div className="grid grid-cols-2 gap-4 py-3 border-y border-[#C59B51]/20 text-xs">
                <div>
                  <span className="text-[10px] text-[#7C2335] uppercase tracking-wider block font-semibold">
                    {current.metric1Label}
                  </span>
                  <span className="font-bold text-[#58111A]">{current.metric1Val}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7C2335] uppercase tracking-wider block font-semibold">
                    {current.metric2Label}
                  </span>
                  <span className="font-bold text-[#C59B51] font-cormorant text-base">{current.metric2Val}</span>
                </div>
              </div>

              <div className="pt-1">
                <button 
                  onClick={() => handleSelectWeave(current.filterKey)}
                  className="btn-luxury-primary !py-2.5 !px-6 !text-xs"
                >
                  <span>Explore {current.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Runway Footer Progress Bar */}
        <div className="w-full mt-6 flex items-center justify-between gap-6">
          <div className="flex-1 bg-[#EFE8DA]/80 h-1.5 rounded-full overflow-hidden border border-[#C59B51]/20">
            <div 
              className="bg-gradient-to-r from-[#C59B51] via-[#E4C58B] to-[#C59B51] h-full rounded-full transition-all duration-300"
              style={{ width: `${((activeIndex + 1) / 5) * 100}%` }}
            />
          </div>
          <button 
            onClick={() => handleSelectWeave('all')}
            className="btn-luxury-outline !py-2 !px-5 !text-[11px] shrink-0"
          >
            <span>View All Sarees</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#C59B51]" />
          </button>
        </div>

      </div>
    </section>
  );
}

