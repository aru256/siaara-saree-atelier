import React, { useState, useEffect, useRef } from 'react';
import { HERO_SLIDES } from '../data/sarees';
import { Sparkles, ArrowRight, Calendar, ChevronLeft, ChevronRight, ChevronsDown } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const canvasRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isHoveredRef = useRef(false);

  // Auto-slide effect (5.5s per slide with loop back to first)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHoveredRef.current) {
        setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
      }
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  // Three.js 3D Silk Simulation initialization on canvasRef
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !window.THREE) return;

    let animationFrameId;
    const THREE = window.THREE;

    // Scene & Renderer
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

    // Optimized Fabric Geometry (24 x 16 segments for silky 60FPS fluid cloth)
    const geometry = new THREE.PlaneGeometry(6, 4.2, 24, 16);
    const pos = geometry.attributes.position;
    const initialZ = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      initialZ[i] = pos.getZ(i);
    }

    // Royal Silk Material (Rich Champagne/Gold undertones with high specular shine)
    const material = new THREE.MeshPhongMaterial({
      color: 0xFAF7F2,
      specular: 0xE4C58B,
      shininess: 90,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.38
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xE4C58B, 1.2);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x58111A, 1.0, 10);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Fluid sinusoidal silk wave dynamics
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const wave = Math.sin(u * 1.5 + elapsedTime * 1.8) * 0.28 +
                     Math.cos(v * 1.8 + elapsedTime * 1.4) * 0.22;
        pos.setZ(i, initialZ[i] + wave);
      }
      pos.needsUpdate = true;
      geometry.computeVertexNormals();

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
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

  // Slide navigation
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  // Mobile Touch Handlers
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
          nextSlide(); // swipe left -> next
        } else {
          prevSlide(); // swipe right -> prev
        }
      }
    }
  };

  const scrollTo = (id) => {
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="home"
      className="relative min-h-[92vh] sm:min-h-[96vh] flex items-center justify-center overflow-hidden pt-8 pb-20 px-4 sm:px-8"
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3D Silk Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Single Crisp Saree Slideshow (1 Photo At A Time, Loop Back To First) */}
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
                className="w-full h-full object-cover object-top filter brightness-[0.96] contrast-[1.02]"
                loading={index === 0 ? 'eager' : 'lazy'}
              />

              {/* Saree Look Identifier Badge */}
              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 bg-[#2B070D]/90 backdrop-blur-md text-[#E4C58B] border border-[#C59B51]/40 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold uppercase tracking-wider shadow-xl z-20">
                {slide.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Navigation Arrows (< and >) */}
      <button 
        onClick={prevSlide}
        className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F2]/90 hover:bg-[#58111A] text-[#58111A] hover:text-[#FAF7F2] border border-[#C59B51]/40 flex items-center justify-center transition-all z-30 shadow-lg hover:scale-110"
        aria-label="Previous Saree"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#FAF7F2]/90 hover:bg-[#58111A] text-[#58111A] hover:text-[#FAF7F2] border border-[#C59B51]/40 flex items-center justify-center transition-all z-30 shadow-lg hover:scale-110"
        aria-label="Next Saree"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Subtle Center Scrim (Background saree photo remains completely visible and unblurred) */}
      <div 
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(248, 245, 238, 0.90) 0%, rgba(248, 245, 238, 0.72) 45%, rgba(248, 245, 238, 0.20) 100%)'
        }}
      />

      {/* Center Editorial Card with Delicate Glass Backing */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center gap-6 sm:gap-7 bg-[#F8F5EE]/85 backdrop-blur-md border border-[#C59B51]/35 rounded-[32px] p-6 sm:p-10 shadow-2xl">
        
        {/* Luxury Monogram Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/40 text-[11px] font-semibold tracking-wider uppercase shadow-md">
          <Sparkles className="w-3.5 h-3.5 text-[#C59B51]" />
          <span>New 2026 Collection · Pure Handloom Sarees</span>
        </div>

        {/* Monumental Headline in Royal Maroon */}
        <h1 className="font-cormorant text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#58111A] leading-[1.04]">
          Handwoven with Love, <br/>
          <span className="font-italiana italic text-gold-gradient font-normal">Draped in Royalty.</span>
        </h1>

        {/* Clean, Light & Warm Indian English Narrative */}
        <p className="font-sans text-[#7C2335] text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed font-normal mx-auto">
          Discover pure silk sarees handcrafted by traditional master weavers across India. From shimmering <strong>Tissue Silks</strong> and royal <strong>Banarasi brocades</strong> to lightweight <strong>Malai Drapes</strong>—made for your most memorable celebrations.
        </p>

        {/* Royal Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
          <button 
            onClick={() => scrollTo('shop')}
            className="btn-luxury-primary shadow-xl"
          >
            <span>Shop Pure Silk Sarees</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button 
            onClick={() => scrollTo('contact')}
            className="btn-luxury-outline"
          >
            <Calendar className="w-4 h-4 text-[#C59B51]" />
            <span>Book Styling Call</span>
          </button>
        </div>

        {/* Hallmark Quality Indicators */}
        <div className="grid grid-cols-3 gap-4 sm:gap-12 pt-6 border-t border-[#C59B51]/20 w-full max-w-xl mx-auto mt-1">
          <div className="text-center">
            <span className="block text-xl sm:text-2xl font-cormorant font-bold text-[#58111A]">100% Silk</span>
            <span className="text-[9px] sm:text-[10px] text-[#7C2335] tracking-wider uppercase font-semibold">Silk Mark Certified</span>
          </div>
          <div className="text-center">
            <span className="block text-xl sm:text-2xl font-cormorant font-bold text-[#58111A]">Direct Looms</span>
            <span className="text-[9px] sm:text-[10px] text-[#7C2335] tracking-wider uppercase font-semibold">Fair Pay to Weavers</span>
          </div>
          <div className="text-center">
            <span className="block text-xl sm:text-2xl font-cormorant font-bold text-[#58111A]">Tested Zari</span>
            <span className="text-[9px] sm:text-[10px] text-[#7C2335] tracking-wider uppercase font-semibold">24K Real Gold Finish</span>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2 pt-2">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-[#58111A]' : 'w-2 bg-[#58111A]/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Minimalist Scroll Down Indicator */}
      <button 
        onClick={() => scrollTo('story')}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#7C2335] hover:text-[#C59B51] transition-colors z-10 text-[9px] uppercase tracking-[0.25em] font-semibold"
      >
        <span>Scroll</span>
        <ChevronsDown className="w-3.5 h-3.5 animate-bounce" />
      </button>
    </section>
  );
}

