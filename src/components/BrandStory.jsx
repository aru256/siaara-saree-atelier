import React from 'react';
import { Feather } from 'lucide-react';

export default function BrandStory() {
  return (
    <section id="story" className="pt-8 sm:pt-12 pb-16 sm:pb-24 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#C59B51]/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Large Editorial Visuals Layer */}
        <div className="lg:col-span-6 relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=85" 
                alt="Master Weaver at Loom" 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[3/4] shadow-lg translate-y-8">
              <img 
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=85" 
                alt="Handloom Silk Texture" 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Floating Master Quote Badge */}
          <div className="absolute -bottom-6 left-6 right-6 sm:right-auto bg-[#FAF7F2]/95 backdrop-blur-md p-5 rounded-2xl border border-[#C59B51]/30 max-w-sm shadow-xl">
            <span className="text-[9px] uppercase tracking-[0.25em] text-[#C59B51] font-bold block mb-1">
              Varanasi Looms Guild
            </span>
            <p className="font-cormorant text-base italic text-[#58111A] leading-snug">
              "We do not just weave silk threads. We weave the love, blessings, and hard work of our artisan families."
            </p>
          </div>
        </div>

        {/* Textual Narrative & Philosophy */}
        <div className="lg:col-span-6 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider">
            <Feather className="w-3.5 h-3.5 text-[#C59B51]" />
            <span>Our Heritage Story</span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#58111A] leading-[1.05]">
            Two Generations of Heritage, <br/>
            <span className="font-italiana italic text-gold-gradient font-normal">
              Handcrafted on Wooden Pit-Looms.
            </span>
          </h2>

          <p className="font-sans text-[#7C2335] text-sm sm:text-base leading-relaxed font-normal">
            Started with a deep passion for authentic Indian handlooms, <strong>कल्रा KRUTI by Vyara</strong> brings you pure silk sarees woven with love, patience, and generational artistry.
          </p>

          <p className="font-sans text-[#7C2335] text-sm sm:text-base leading-relaxed font-normal">
            Every saree is handwoven by master weavers in Varanasi, Kanchipuram, and Chanderi. We use only pure mulberry silk, tested 24K real gold zari, and gentle botanical washes—taking up to 45 days of careful handloom work for each drape.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#C59B51]/20">
            <div>
              <span className="block text-2xl font-cormorant font-bold text-[#C59B51]">45+</span>
              <span className="text-[10px] text-[#7C2335] uppercase tracking-wider font-semibold">Artisan Families</span>
            </div>
            <div>
              <span className="block text-2xl font-cormorant font-bold text-[#C59B51]">100%</span>
              <span className="text-[10px] text-[#7C2335] uppercase tracking-wider font-semibold">Silk Mark Certified</span>
            </div>
            <div>
              <span className="block text-2xl font-cormorant font-bold text-[#C59B51]">32+</span>
              <span className="text-[10px] text-[#7C2335] uppercase tracking-wider font-semibold">Countries Shipped</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

