import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES } from '../data/sarees';
import { useStore } from '../context/StoreContext';
import { Sparkles, ArrowRight, Calendar, ChevronLeft, ChevronRight, ChevronsDown } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { products, openProductPage, setSelectedCollection } = useStore();
  const canvasRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Auto-slide effect (5 seconds per slide with loop back to first)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Three.js 3D Silk Ambient Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;

    let animationFrameId;
    const THREE = window.THREE;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.setSize(canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight);

    const geometry = new THREE.PlaneGeometry(6, 4.2, 24, 16);
    const pos = geometry.attributes.position;
    const initialZ = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      initialZ[i] = pos.getZ(i);
    }

    const material = new THREE.MeshPhongMaterial({
      color: 0xFAF7F2,
      specular: 0xE4C58B,
      shininess: 90,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.14
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xE4C58B, 1.2);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const wave = Math.sin(u * 1.5 + elapsedTime * 1.6) * 0.22 +
                     Math.cos(v * 1.8 + elapsedTime * 1.2) * 0.18;
        pos.setZ(i, initialZ[i] + wave);
      }
      pos.needsUpdate = true;
      geometry.computeVertexNormals();

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches.length === 1) {
      const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
      const diffY = e.changedTouches[0].clientY - touchStartYRef.current;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }
  };

  const handleShopSlide = (collectionKey) => {
    const matched = products.find(p => p.collection === collectionKey);
    if (matched) {
      openProductPage(matched.id);
    } else {
      setSelectedCollection(collectionKey);
      const elem = document.getElementById('shop');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTo = (id) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSlideData = HERO_SLIDES[currentSlide];

  return (
    <section 
      id="home"
      className="relative h-[48vh] min-h-[380px] max-h-[500px] sm:h-[50vh] sm:min-h-[420px] sm:max-h-[520px] lg:h-[52vh] lg:min-h-[440px] lg:max-h-[550px] w-full overflow-hidden bg-[#2B070D]"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Silk Ambient Canvas (Soft Subtle Overlay) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* High-Definition Saree Slideshow (Cropped Half-Screen Banner, 100% Crisp) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-[1]">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div 
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive ? 'opacity-100 pointer-events-auto z-[2]' : 'opacity-0 pointer-events-none z-[1]'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover object-[center_28%] filter brightness-[0.96] contrast-[1.02]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Arrows (< and >) */}
      <button 
        onClick={prevSlide}
        className="absolute left-2.5 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#2B070D]/75 hover:bg-[#58111A] text-[#E4C58B] hover:text-[#FAF7F2] border border-[#C59B51]/50 backdrop-blur-md flex items-center justify-center transition-all z-20 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Previous Saree"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-2.5 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#2B070D]/75 hover:bg-[#58111A] text-[#E4C58B] hover:text-[#FAF7F2] border border-[#C59B51]/50 backdrop-blur-md flex items-center justify-center transition-all z-20 shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
        aria-label="Next Saree"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dual Gradient Scrim: Left Vignette For Text Legibility + Subtle Bottom Fade */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-[#2B070D]/90 via-[#2B070D]/55 via-45% to-transparent pointer-events-none z-[3]" 
      />
      <div 
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#2B070D]/80 to-transparent pointer-events-none z-[3]" 
      />

      {/* Hero Content Container (Scaled Proportions for PC & Mobile) */}
      <div className="absolute inset-0 z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col justify-between pt-5 pb-3 sm:pt-7 sm:pb-5 pointer-events-auto text-left">
        
        {/* Top/Middle Left Column: Look Badge, Headline, Subtitle & Action CTAs */}
        <div className="space-y-2 sm:space-y-3 max-w-xl lg:max-w-2xl my-auto">
          {/* Saree Look Identifier Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:py-1 rounded-full bg-[#FAF7F2]/15 backdrop-blur-md text-[#E4C58B] border border-[#C59B51]/40 text-[9px] sm:text-xs font-semibold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C59B51]" />
            <span>{currentSlideData.title}</span>
          </div>

          {/* Monumental Headline */}
          <h1 className="font-cormorant text-2xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#FAF7F2] leading-[1.08] drop-shadow-md">
            Handwoven with Love, <br/>
            <span className="font-italiana italic text-gold-gradient font-normal">Draped in Royalty.</span>
          </h1>

          {/* Light & Friendly Indian English Narrative */}
          <p className="font-sans text-[#FAF7F2]/90 text-[11px] sm:text-xs lg:text-sm leading-relaxed font-normal max-w-lg line-clamp-2 sm:line-clamp-none drop-shadow-sm">
            Discover pure silk sarees handcrafted by traditional master weavers across India. Shimmering <strong>Tissue Silks</strong>, royal <strong>Banarasi brocades</strong>, and featherlight <strong>Malai Drapes</strong>.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
            <button 
              onClick={() => handleShopSlide(currentSlideData.collection)}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-[#C59B51] via-[#ECCF96] to-[#C59B51] hover:brightness-110 text-[#2B070D] font-bold text-[11px] sm:text-xs uppercase tracking-wider shadow-2xl flex items-center gap-1.5 sm:gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Shop This Saree</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2B070D]" />
            </button>

            <button 
              onClick={() => scrollTo('contact')}
              className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#FAF7F2]/10 hover:bg-[#FAF7F2]/20 text-[#FAF7F2] border border-[#C59B51]/40 backdrop-blur-md font-semibold text-[11px] sm:text-xs tracking-wider flex items-center gap-1.5 sm:gap-2 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C59B51]" />
              <span>Book Styling Call</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar: Center Scroll Down Indicator & Right Slide Counter/Dots */}
        <div className="w-full flex items-end justify-between pt-1">
          {/* Empty Left Placeholder to Balance Center Scroll Indicator */}
          <div className="w-16 hidden sm:block" />

          {/* Minimalist Scroll Down Indicator (Centered) */}
          <button 
            onClick={() => scrollTo('story')}
            className="flex flex-col items-center gap-0.5 text-[#E4C58B]/80 hover:text-[#E4C58B] transition-colors z-10 text-[9px] uppercase tracking-[0.25em] font-semibold mx-auto sm:mx-0 cursor-pointer"
          >
            <span>Scroll</span>
            <ChevronsDown className="w-3 h-3 animate-bounce" />
          </button>

          {/* Right Column: Slide Counter & Pagination Dots */}
          <div className="flex flex-col items-end gap-1.5">
            {/* Counter Badge */}
            <div className="flex items-center gap-1 text-[11px] sm:text-xs text-[#FAF7F2]/80 bg-[#2B070D]/70 backdrop-blur-md px-3 py-1 rounded-full border border-[#C59B51]/30 shadow-md">
              <span className="font-cinzel text-xs sm:text-sm font-bold text-[#E4C58B]">0{currentSlide + 1}</span>
              <span className="text-[#C59B51] font-bold">/</span>
              <span className="text-[10px] sm:text-xs font-semibold">0{HERO_SLIDES.length}</span>
            </div>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-1.5">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentSlide ? 'w-6 sm:w-7 bg-[#E4C58B]' : 'w-1.5 bg-[#FAF7F2]/40 hover:bg-[#FAF7F2]/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
