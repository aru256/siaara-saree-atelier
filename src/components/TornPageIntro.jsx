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

    // High performance sequenced intro
    // 0.3s: Golden tear begins down center seam
    const t1 = setTimeout(() => setStage('tearing'), 300);

    // 1.1s: Silk panels tear and glide open
    const t2 = setTimeout(() => setStage('opening'), 1100);

    // 1.9s: Center Lotus Woman emblem revealed with golden shimmer
    const t3 = setTimeout(() => setStage('logoRevealed'), 1900);

    // 3.1s: Logo glides smoothly towards navbar
    const t4 = setTimeout(() => setStage('gliding'), 3100);

    // 3.8s: Sequence completed
    const t5 = setTimeout(() => {
      setDismissed(true);
      sessionStorage.setItem('klakruti_intro_seen', 'true');
      if (onComplete) onComplete();
    }, 3800);

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
      className={`fixed inset-0 w-full h-[100dvh] overflow-hidden z-[9999] flex items-center justify-center transition-opacity duration-700 ${
        stage === 'gliding' ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
      style={{ perspective: '1200px' }}
    >
      {/* Deep Velvet Maroon Celestial Silk Stage Backdrop (From User Image) */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('assets/intro-bg.jpg')",
          backgroundColor: '#2B070D'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2B070D]/70 via-transparent to-[#2B070D]/70" />
      </div>

      {/* Left Silk Curtain Panel */}
      <div 
        className="absolute top-0 left-0 bottom-0 w-1/2 overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 will-change-transform"
        style={{
          transform: isTorn ? 'translate3d(-105%, 0, 0) rotateY(-8deg)' : 'translate3d(0%, 0, 0) rotateY(0deg)',
          transformOrigin: 'left center'
        }}
      >
        <div 
          className="w-[200%] h-full relative bg-cover bg-center"
          style={{
            backgroundImage: "url('assets/intro-bg.jpg')",
            backgroundColor: '#2B070D',
            boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.7)'
          }}
        >
          {/* Deckled Torn Edge Shadow & Gold Foil Sparkle */}
          <div 
            className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, rgba(197, 155, 81, 0.45))',
              filter: 'drop-shadow(3px 0 8px rgba(197, 155, 81, 0.5))'
            }}
          />
        </div>
      </div>

      {/* Right Silk Curtain Panel */}
      <div 
        className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] z-10 will-change-transform"
        style={{
          transform: isTorn ? 'translate3d(105%, 0, 0) rotateY(8deg)' : 'translate3d(0%, 0, 0) rotateY(0deg)',
          transformOrigin: 'right center'
        }}
      >
        <div 
          className="w-[200%] h-full relative -left-[100%] bg-cover bg-center"
          style={{
            backgroundImage: "url('assets/intro-bg.jpg')",
            backgroundColor: '#2B070D',
            boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.7)'
          }}
        >
          {/* Deckled Torn Edge Shadow & Gold Foil Sparkle */}
          <div 
            className="absolute top-0 left-0 bottom-0 w-8 pointer-events-none"
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
          <div className="w-full h-full bg-gradient-to-b from-transparent via-[#C59B51] to-transparent opacity-75" />
          
          {/* Traveling Golden Tear Tracer */}
          <div 
            className={`absolute top-0 w-6 h-6 -left-3 rounded-full bg-[#E4C58B] shadow-[0_0_25px_#C59B51] transition-all duration-1000 ease-in-out ${
              stage === 'tearing' ? 'top-full opacity-100 scale-125' : 'top-0 opacity-0 scale-75'
            }`}
          />
        </div>
      )}

      {/* Center Lotus Woman Emblem & Brand Typography (Exact User Design) */}
      <div 
        className={`absolute z-30 px-4 flex flex-col items-center text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          showLogo 
            ? isGliding
              ? 'scale-75 -translate-y-48 sm:-translate-y-64 opacity-0'
              : 'scale-100 translate-y-0 opacity-100'
            : 'scale-50 translate-y-6 opacity-0 pointer-events-none'
        }`}
      >
        {/* Lotus Blooming Woman Profile Emblem */}
        <div className="relative mb-3 sm:mb-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#C59B51]/25 blur-2xl rounded-full scale-125 pointer-events-none" />
          <img 
            src="assets/brand-lotus-gold.png" 
            alt="कलाKruti Emblem" 
            className="w-24 sm:w-36 h-auto object-contain drop-shadow-[0_0_25px_rgba(228,197,139,0.7)]"
          />
        </div>

        {/* Brand Wordmark: Exact कलाKruti with BY VYARA in Copperplate sliding under Kruti */}
        <div className="flex flex-col items-center justify-center">
          <img 
            src="assets/klakruti-by-vyara-light.png" 
            alt="कलाKruti BY VYARA" 
            className="w-56 sm:w-80 h-auto object-contain drop-shadow-[0_0_30px_rgba(250,247,242,0.6)]"
          />
        </div>

        {/* Tagline: Threads of Culture, Beads of Joy */}
        <span className="font-italiana italic text-xs sm:text-base text-[#E4C58B]/95 tracking-wider mt-3 sm:mt-4 drop-shadow-sm">
          Threads of Culture, Beads of Joy
        </span>
      </div>

      {/* Responsive Skip Intro Button */}
      <button 
        onClick={handleSkip}
        className="absolute bottom-6 right-5 sm:right-8 z-40 px-4 py-2 rounded-full bg-[#2B070D]/85 hover:bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/40 text-[10px] sm:text-xs uppercase tracking-widest transition-all shadow-xl pointer-events-auto active:scale-95 cursor-pointer"
      >
        Skip Intro ✕
      </button>
    </div>
  );
}
