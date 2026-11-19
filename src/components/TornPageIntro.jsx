import React, { useState, useEffect } from 'react';

export default function TornPageIntro({ onComplete }) {
  const [stage, setStage] = useState('sealed'); // 'sealed' -> 'tearing' -> 'opening' -> 'logoRevealed' -> 'gliding' -> 'done'
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // If user previously completed the intro in this tab session
    const seen = sessionStorage.getItem('klakruti_intro_seen');
    if (seen) {
      setDismissed(true);
      if (onComplete) onComplete();
      return;
    }

    // Sequence timing
    // 0.4s: Tearing starts (golden spark rips down center seam)
    const t1 = setTimeout(() => setStage('tearing'), 400);

    // 1.4s: Silk panels tear apart and glide left & right
    const t2 = setTimeout(() => setStage('opening'), 1400);

    // 2.2s: Center brand emblem revealed with golden glow
    const t3 = setTimeout(() => setStage('logoRevealed'), 2200);

    // 3.4s: Logo glides smoothly towards navbar
    const t4 = setTimeout(() => setStage('gliding'), 3400);

    // 4.2s: Sequence fully completed & dismissed
    const t5 = setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem('klakruti_intro_seen', 'true');
      if (onComplete) onComplete();
    }, 4200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setDismissed(true);
    sessionStorage.setItem('klakruti_intro_seen', 'true');
    if (onComplete) onComplete();
  };

  if (dismissed) return null;

  const isTorn = stage === 'opening' || stage === 'logoRevealed' || stage === 'gliding';
  const showLogo = stage === 'logoRevealed' || stage === 'gliding';
  const isGliding = stage === 'gliding';

  return (
    <div 
      className={`fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center transition-opacity duration-700 ${
        stage === 'gliding' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* Deep Velvet Maroon Stage Backdrop */}
      <div className="absolute inset-0 bg-[#2B070D]" />

      {/* Left Silk Curtain Panel */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-1/2 overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
        style={{
          transform: isTorn ? 'translateX(-105%) rotateY(-12deg)' : 'translateX(0%) rotateY(0deg)',
          transformOrigin: 'left center'
        }}
      >
        <div 
          className="w-[200%] h-full relative"
          style={{
            background: 'linear-gradient(135deg, #3B0910 0%, #58111A 45%, #2B070D 100%)',
            boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.6)'
          }}
        >
          {/* Subtle Golden Brocade Weave Texture */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#C59B51 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          {/* Organic Torn Rip Edge on Right Side of Left Panel */}
          <div 
            className="absolute top-0 right-0 bottom-0 w-12 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(197, 155, 81, 0.45))',
              filter: 'drop-shadow(3px 0 8px rgba(197, 155, 81, 0.5))'
            }}
          />
        </div>
      </div>

      {/* Right Silk Curtain Panel */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10"
        style={{
          transform: isTorn ? 'translateX(105%) rotateY(12deg)' : 'translateX(0%) rotateY(0deg)',
          transformOrigin: 'right center'
        }}
      >
        <div 
          className="w-[200%] h-full relative -left-[100%]"
          style={{
            background: 'linear-gradient(225deg, #3B0910 0%, #58111A 45%, #2B070D 100%)',
            boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.6)'
          }}
        >
          {/* Subtle Golden Brocade Weave Texture */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#C59B51 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />
          {/* Organic Torn Rip Edge on Left Side of Right Panel */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-12 pointer-events-none"
            style={{
              background: 'linear-gradient(to left, transparent, rgba(197, 155, 81, 0.45))',
              filter: 'drop-shadow(-3px 0 8px rgba(197, 155, 81, 0.5))'
            }}
          />
        </div>
      </div>

      {/* Center Golden Seam Line & Tear Tracer Spark */}
      {!isTorn && (
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 z-20 pointer-events-none flex flex-col items-center">
          <div className="w-full h-full bg-gradient-to-b from-transparent via-[#C59B51] to-transparent opacity-70" />
          
          {/* Traveling Golden Tear Tracer */}
          <div 
            className={`absolute top-0 w-6 h-6 -left-3 rounded-full bg-[#E4C58B] shadow-[0_0_25px_#C59B51] transition-all duration-1000 ease-in-out ${
              stage === 'tearing' ? 'top-full opacity-100 scale-125' : 'top-0 opacity-0 scale-75'
            }`}
          />
        </div>
      )}

      {/* Center Authentic कल्रा Brand Monogram Revealed */}
      <div 
        className={`absolute z-30 flex flex-col items-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showLogo 
            ? isGliding
              ? 'scale-75 -translate-y-64 opacity-0'
              : 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-8 opacity-0 pointer-events-none'
        }`}
      >
        {/* Luminous Antique Gold Monogram Seal */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#ECCF96] via-[#C59B51] to-[#8F6929] p-0.5 shadow-[0_0_50px_rgba(197,155,81,0.6)] mb-4 flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#2B070D] flex flex-col items-center justify-center p-2 border border-[#E4C58B]/40">
            <span className="font-rozha text-2xl sm:text-3xl font-bold text-[#E4C58B] leading-none">कल्रा</span>
            <span className="font-cinzel text-[8px] sm:text-[9px] tracking-[0.25em] text-[#C59B51] uppercase font-bold mt-0.5">KRUTI</span>
          </div>
        </div>

        <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#F8F5EE] tracking-[0.2em] uppercase">
          कल्रा KRUTI <span className="font-italiana italic text-[#C59B51] lowercase font-normal">by vyara</span>
        </h2>
        <span className="text-[10px] sm:text-xs text-[#E4C58B]/90 tracking-[0.3em] uppercase font-semibold mt-1">
          Pure Handloom Silk Atelier
        </span>
      </div>

      {/* Skip Intro Button */}
      <button 
        onClick={handleSkip}
        className="absolute bottom-6 right-6 z-40 px-4 py-1.5 rounded-full bg-[#2B070D]/80 hover:bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/40 text-[10px] uppercase tracking-widest transition-all shadow-lg pointer-events-auto"
      >
        Skip Intro ✕
      </button>
    </div>
  );
}

