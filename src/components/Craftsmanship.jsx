import React, { useState } from 'react';
import { CRAFT_STAGES } from '../data/sarees';
import { Scissors, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Craftsmanship() {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  const currentStage = CRAFT_STAGES[activeStageIndex];

  const scrollToShop = () => {
    const elem = document.getElementById('shop');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="craftsmanship" className="py-20 sm:py-28 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#C59B51]/20">
      
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider mb-3">
          <Scissors className="w-3.5 h-3.5 text-[#C59B51]" />
          <span>Pure Handloom Journey</span>
        </div>
        <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#58111A]">
          How a Masterpiece Is <span className="font-italiana italic text-gold-gradient font-normal">Handwoven</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#7C2335] mt-3 font-normal">
          See how our master weavers create each pure silk saree by hand, step by step.
        </p>
      </div>

      {/* Interactive Showcase Container */}
      <div className="relative rounded-[32px] overflow-hidden bg-[#FAF7F2] border border-[#C59B51]/30 shadow-2xl p-6 sm:p-12">
        
        {/* Top Stage Stepper Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#C59B51]/20 pb-6 mb-8">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#C59B51] animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#58111A]">
              Weaving Stages
            </span>
          </div>

          {/* Interactive Step Pills */}
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase font-bold tracking-wider">
            {CRAFT_STAGES.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              return (
                <button
                  key={stage.num}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full transition-all shadow-sm ${
                    isActive
                      ? 'border border-[#C59B51] bg-[#58111A] text-[#FAF7F2]'
                      : 'border border-[#C59B51]/30 text-[#7C2335] hover:border-[#C59B51] bg-white'
                  }`}
                >
                  {`0${idx + 1} ${stage.title.split('&')[0].trim().split(' ').slice(-2).join(' ')}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Visual & Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* Visual Frame */}
          <div className="lg:col-span-6 relative aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-[24px] overflow-hidden shadow-2xl bg-[#EFE8DA]">
            <img 
              src={currentStage.image} 
              alt={currentStage.title}
              className="w-full h-full object-cover transition-all duration-700" 
            />

            {/* Bottom Hallmark Tag */}
            <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-md py-3 px-5 rounded-2xl border border-[#C59B51]/30 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#C59B51]" />
                <span className="text-[11px] font-bold text-[#58111A] uppercase tracking-wider">
                  {currentStage.hallmark}
                </span>
              </div>
              <span className="text-xs font-cinzel font-bold text-[#C59B51]">
                {currentStage.counter}
              </span>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 text-left">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C59B51] font-bold">
                {currentStage.num}
              </span>
              <h3 className="font-cormorant text-3xl sm:text-5xl font-normal text-[#58111A] leading-tight">
                {currentStage.title}
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#7C2335] leading-relaxed font-normal">
                {currentStage.desc}
              </p>
            </div>

            {/* Technical Metric Cards */}
            <div className="grid grid-cols-2 gap-4 p-5 rounded-2xl bg-white border border-[#C59B51]/25 shadow-sm">
              <div>
                <span className="block text-[10px] text-[#7C2335] uppercase tracking-wider font-semibold">
                  Artisan Hallmark
                </span>
                <span className="font-cormorant text-2xl font-bold text-[#58111A]">
                  {currentStage.metric1}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-[#7C2335] uppercase tracking-wider font-semibold">
                  Durability
                </span>
                <span className="font-cormorant text-2xl font-bold text-[#C59B51]">
                  {currentStage.metric2}
                </span>
              </div>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-[#7C2335] font-semibold">
                <span>Stage Mastery</span>
                <span>{currentStage.progress}</span>
              </div>
              <div className="w-full bg-[#EFE8DA] h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#C59B51] via-[#E4C58B] to-[#C59B51] h-full rounded-full transition-all duration-300"
                  style={{ width: currentStage.progress }}
                />
              </div>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button 
                onClick={scrollToShop}
                className="btn-luxury-primary !py-2.5 !px-6 !text-xs"
              >
                <span>View Certified Pure Silk Sarees</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

