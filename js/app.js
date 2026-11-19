/**
 * कल्रा KRUTI by Vyara (Klakruti by Vyara) - Master Motion & Interactive Commerce Engine
 * Powered by Lenis, GSAP ScrollTrigger, and Three.js
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Cinematic Saree Opening Intro (Scene 1 to Scene 5)
  initCinematicSareeIntro();

  // 1. Initialize Hero Single-Image Carousel
  initHeroSlider();

  // 2. Initialize Fluid Natural Scrolling
  initLenis();

  // 3. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 3. Render Catalog & Best Sellers (Flipkart-style 2-Column Responsive Grid)
  renderProducts();
  renderBestSellers();

  // 4. Update UI Counters & Profile State
  updateCartUI();
  updateWishlistUI();
  updateAuthUI();

  // 5. Initialize GSAP Scroll Sequences & Non-Intrusive Runway Controller
  initGSAPAnimations();
  initCollectionsRunwayController();

  // 6. Global Store Listeners
  window.addEventListener('siaara_products_updated', () => {
    renderProducts();
    renderBestSellers();
  });
  window.addEventListener('siaara_cart_updated', () => updateCartUI());
  window.addEventListener('siaara_wishlist_updated', () => updateWishlistUI());
  window.addEventListener('siaara_user_updated', () => updateAuthUI());
});

// ================= CINEMATIC TORN-PAGE SAREE OPENING INTRO (SCENES 1 TO 5) =================
function initCinematicSareeIntro() {
  const introOverlay = document.getElementById('cinematic-saree-intro');
  const curtainLeft = document.getElementById('intro-curtain-left');
  const curtainRight = document.getElementById('intro-curtain-right');
  const seam = document.getElementById('intro-seam');
  const tearTracer = document.getElementById('intro-tear-tracer');
  const centerSeal = document.getElementById('intro-center-seal');
  const travelingLogo = document.getElementById('intro-traveling-logo');
  const glow = document.getElementById('intro-glow');
  const navLogo = document.getElementById('navbar-brand-logo');
  const revealBackdrop = document.getElementById('intro-reveal-backdrop');

  if (!introOverlay) return;

  // Check if reduced motion is requested
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    introOverlay.style.display = 'none';
    if (navLogo) navLogo.style.opacity = '1';
    document.body.style.overflow = '';
    return;
  }

  const isMobile = window.innerWidth < 768 || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // On desktop only: lock briefly during initial seal breathing; NEVER lock on mobile touch devices
  if (!isMobile) {
    document.body.style.overflow = 'hidden';
    // Safety auto-unlock after 600ms so user can scroll naturally as soon as tear begins
    setTimeout(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 600);
  } else {
    // Ensure mobile body and html are 100% unlocked from the first millisecond
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  if (navLogo) navLogo.style.opacity = '0';

  // Position traveling logo in the exact center initially
  gsap.set(travelingLogo, {
    top: '50%',
    left: '50%',
    xPercent: -50,
    yPercent: -50,
    opacity: 0,
    scale: isMobile ? 1.05 : 1.15
  });

  const tl = gsap.timeline({
    defaults: { ease: 'power3.inOut' }
  });

  // Scene 1: Closed Parchment with Center Royal Loom Seal Breathing
  tl.fromTo(centerSeal, 
    { scale: 0.9, opacity: 0.88 }, 
    { scale: 1.05, opacity: 1, duration: 0.25, ease: 'power2.out' }
  );

  // Scene 2: Tearing the Page — Glowing rip tracer races down & torn deckled halves rip open in 3D
  if (tearTracer) {
    tl.to(tearTracer, {
      height: '100%',
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.08');
  }

  if (revealBackdrop) {
    tl.to(revealBackdrop, { opacity: 1, duration: 0.2 }, '<');
  }

  tl.to(centerSeal, { scale: 1.45, opacity: 0, duration: 0.25, ease: 'power2.in' }, '<+=0.04')
    .to(curtainLeft, { 
      xPercent: isMobile ? -112 : -116, 
      rotateZ: isMobile ? -3 : -4.5, 
      rotateY: isMobile ? -14 : -22, 
      duration: 0.65, 
      ease: 'power3.inOut' 
    }, '<')
    .to(curtainRight, { 
      xPercent: isMobile ? 112 : 116, 
      rotateZ: isMobile ? 3 : 4.5, 
      rotateY: isMobile ? 14 : 22, 
      duration: 0.65, 
      ease: 'power3.inOut' 
    }, '<')
    .to(introOverlay, { 
      backgroundColor: 'rgba(13, 7, 4, 0)', 
      duration: 0.5,
      onStart: () => {
        // As soon as the curtains begin tearing, make the intro overlay click-through/scroll-through
        if (introOverlay) introOverlay.style.pointerEvents = 'none';
      }
    }, '<');

  // Scene 3: Entering the Atelier & Royal Monogram Reveal through the Tear
  tl.to(glow, { opacity: 0.9, scale: 1.25, duration: 0.35, ease: 'power2.out' }, '-=0.35')
    .to(travelingLogo, { opacity: 1, scale: 1.0, duration: 0.35, ease: 'power2.out' }, '<+=0.05');

  // Scene 4: Logo Sets into Navbar & Smooth Transition Reveals the Website
  tl.add(() => {
    if (!navLogo) {
      finishCinematicIntro();
      return;
    }

    const navRect = navLogo.getBoundingClientRect();
    const curRect = travelingLogo.getBoundingClientRect();

    let deltaX = navRect.left - curRect.left;
    let deltaY = navRect.top - curRect.top;
    let targetScale = (curRect.height > 0) ? (navRect.height / curRect.height) : 0.7;

    // Safety fallback on mobile if nav is scrolled or zero
    if (navRect.width === 0 || navRect.height === 0) {
      deltaX = 20 - (window.innerWidth / 2);
      deltaY = 24 - (window.innerHeight / 2);
      targetScale = 0.7;
    }

    gsap.to(glow, { opacity: 0, duration: 0.25 });

    if (revealBackdrop) {
      gsap.to(revealBackdrop, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.45,
        ease: 'power2.out'
      });
    }

    gsap.to(travelingLogo, {
      x: `+=${deltaX}`,
      y: `+=${deltaY}`,
      scale: targetScale,
      transformOrigin: 'top left',
      duration: 0.45,
      ease: 'power3.inOut',
      onComplete: finishCinematicIntro
    });
  }, '+=0.1');

  window.skipCinematicIntro = function() {
    tl.kill();
    finishCinematicIntro();
  };

  window.replayCinematicIntro = function() {
    window.location.reload();
  };

  // Allow instant advance/dismiss on tap anywhere on mobile
  ['touchstart', 'pointerdown', 'click'].forEach(evt => {
    introOverlay.addEventListener(evt, (e) => {
      if (e.target.id !== 'skip-intro-btn') {
        window.skipCinematicIntro();
      }
    }, { passive: true });
  });

  // Safety watchdog: automatically finish and remove intro overlay after 1.4 seconds maximum
  setTimeout(() => {
    finishCinematicIntro();
  }, 1400);

  function finishCinematicIntro() {
    if (navLogo) navLogo.style.opacity = '1';

    // Completely clear all inline overflow properties on mobile and desktop
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    document.body.style.overflowY = '';
    document.documentElement.style.overflowY = '';
    document.body.style.removeProperty('overflow');
    document.documentElement.style.removeProperty('overflow');
    document.body.style.removeProperty('overflow-y');
    document.documentElement.style.removeProperty('overflow-y');

    if (introOverlay) {
      // Disable pointer events immediately so touches pass through with zero delay
      introOverlay.style.pointerEvents = 'none';
      introOverlay.style.touchAction = 'auto';

      gsap.to(introOverlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          introOverlay.style.display = 'none';
          if (introOverlay.parentNode) {
            introOverlay.parentNode.removeChild(introOverlay);
          }
        }
      });
    }
  }
}

// ================= HERO SINGLE-IMAGE SLIDESHOW (CRISP, VISIBLE SAREE CAROUSEL) =================
let currentHeroSlide = 0;
let heroSliderTimer = null;
const HERO_SLIDE_INTERVAL = 5500; // 5.5 seconds per slide

function initHeroSlider() {
  const slider = document.getElementById('hero-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.hero-slide');
  if (slides.length <= 1) return;

  // Start automatic sliding
  startHeroAutoSlide();

  // Mobile Touch Swipe Listener
  let touchStartX = 0;
  let touchStartY = 0;
  slider.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  slider.addEventListener('touchend', (e) => {
    if (e.changedTouches.length === 1) {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      const diffY = e.changedTouches[0].clientY - touchStartY;
      // If horizontal movement is greater than vertical and exceeds 40px
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          changeHeroSlide(1); // Swipe left -> Next slide
        } else {
          changeHeroSlide(-1); // Swipe right -> Previous slide
        }
      }
    }
  }, { passive: true });

  // Pause on desktop hover so customers can comfortably inspect the saree drape
  slider.addEventListener('mouseenter', stopHeroAutoSlide);
  slider.addEventListener('mouseleave', startHeroAutoSlide);
}

function startHeroAutoSlide() {
  stopHeroAutoSlide();
  heroSliderTimer = setInterval(() => {
    changeHeroSlide(1);
  }, HERO_SLIDE_INTERVAL);
}

function stopHeroAutoSlide() {
  if (heroSliderTimer) {
    clearInterval(heroSliderTimer);
    heroSliderTimer = null;
  }
}

function changeHeroSlide(direction) {
  const slides = document.querySelectorAll('#hero-slider .hero-slide');
  if (!slides || slides.length === 0) return;

  const total = slides.length;
  let nextIndex = (currentHeroSlide + direction) % total;
  if (nextIndex < 0) nextIndex = total - 1;

  goToHeroSlide(nextIndex);
}

function goToHeroSlide(index) {
  const slides = document.querySelectorAll('#hero-slider .hero-slide');
  const dots = document.querySelectorAll('#hero-slider-dots .slider-dot');
  if (!slides || slides.length === 0) return;

  const total = slides.length;
  if (index < 0 || index >= total) return;

  currentHeroSlide = index;

  // Switch active slide
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // Switch active pagination dot
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  // Reset timer on manual action
  startHeroAutoSlide();
}

window.initHeroSlider = initHeroSlider;
window.changeHeroSlide = changeHeroSlide;
window.goToHeroSlide = goToHeroSlide;

// ================= FLUID NATURAL SCROLL CONTROLLER (ZERO STICKY FRICTION) =================
let lenis = null;

function initLenis() {
  // Mobile touch devices: ALWAYS use 100% native momentum scrolling (Zero JS touch interception)
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 768);

  if (isTouchDevice) {
    window.lenis = null;
    document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-stopped');
    return;
  }

  if (window.Lenis) {
    try {
      lenis = new Lenis({
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        smoothTouch: false,
        wheelMultiplier: 1.0,
      });

      window.lenis = lenis;

      lenis.on('scroll', () => {
        if (window.ScrollTrigger) ScrollTrigger.update();
      });

      if (window.gsap) {
        gsap.ticker.add((time) => {
          lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      }
    } catch (e) {
      console.warn('Lenis smooth scroll bypassed:', e);
    }
  }

  // Direct native scroll hook for instant responsiveness on mobile & desktop
  window.addEventListener('scroll', () => {
    if (window.ScrollTrigger) ScrollTrigger.update();
  }, { passive: true });
}

// ================= GSAP SCROLL ANIMATIONS (NON-PINNED, NATURAL FLOW) =================
function initGSAPAnimations() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load'
  });

  // 1. Hero Entrance Sequence
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.0 } });
  heroTl.from('.hero-content > *', {
    y: 35,
    opacity: 0,
    stagger: 0.12,
    delay: 0.15
  });

  // 2. Hero Natural Scroll Parallax
  gsap.to('.hero-content', {
    y: -50,
    opacity: 0.15,
    ease: 'none',
    scrollTrigger: {
      trigger: '#home',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.0
    }
  });

  // 3. Section Headings Scroll Trigger
  gsap.utils.toArray('section h2').forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 32,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out'
    });
  });

  // 4. Staggered Product Cards
  ScrollTrigger.batch('.product-card', {
    onEnter: (batch) => {
      gsap.from(batch, {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.75,
        ease: 'power3.out'
      });
    },
    start: 'top 90%',
    once: true
  });

  // 5. Testimonials Staggered Reveal
  gsap.from('.testimonial-card', {
    scrollTrigger: {
      trigger: '.testimonial-card',
      start: 'top 85%',
      toggleActions: 'play none none none'
    },
    y: 36,
    opacity: 0,
    stagger: 0.14,
    duration: 0.85,
    ease: 'power2.out'
  });

  // 6. Natural Parallax on Editorial Visuals
  gsap.utils.toArray('.editorial-arch img, .img-curtain-wrap img').forEach((img) => {
    gsap.to(img, {
      yPercent: 6,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  });

  // 7. Ambient Background Lighting Orbs Natural Parallax (Flowing Atmosphere)
  if (document.getElementById('ambient-orb-1')) {
    gsap.to('#ambient-orb-1', {
      yPercent: 45,
      xPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.0
      }
    });
    gsap.to('#ambient-orb-2', {
      yPercent: -35,
      xPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.5
      }
    });
    gsap.to('#ambient-orb-3', {
      yPercent: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.8
      }
    });
  }

  // 8. Brand Story Editorial Parallax and Split Entrances
  const storySection = document.getElementById('story');
  if (storySection) {
    gsap.from('#story .img-curtain-wrap:first-child', {
      x: -35,
      opacity: 0,
      duration: 1.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#story',
        start: 'top 82%',
        toggleActions: 'play none none none'
      }
    });
    gsap.from('#story .img-curtain-wrap:last-child', {
      y: 45,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '#story',
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    gsap.to('#story .img-curtain-wrap:first-child img', {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#story',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
    gsap.to('#story .img-curtain-wrap:last-child img', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#story',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  }

  // 9. Horizontal Collection Runway Entrance (Pure Unpinned Natural Flow - Zero Scroll Hijacking)
  const collectionsSection = document.getElementById('collections');
  if (collectionsSection) {
    gsap.from('#collections .runway-panel', {
      scrollTrigger: {
        trigger: collectionsSection,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 28,
      opacity: 0,
      duration: 0.75,
      stagger: 0.08,
      ease: 'power3.out'
    });
  }

  // 10. Cinematic Image Mask & Curtain Reveals
  gsap.utils.toArray('.img-curtain-wrap').forEach((wrap) => {
    gsap.fromTo(wrap,
      { clipPath: 'inset(14% 0% 0% 0%)', opacity: 0.85 },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        opacity: 1,
        duration: 1.0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrap,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 11. Craftsmanship Section (Natural Fluid Scroll, Pure Heritage Metier)
  const craftWrap = document.getElementById('craftsmanship-pin-wrap');
  if (craftWrap) {
    gsap.from(craftWrap, {
      scrollTrigger: {
        trigger: craftWrap,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 35,
      opacity: 0,
      duration: 0.9,
      ease: 'power3.out'
    });
  }

  // 12. Initialize Interactive 3D Product Card Tilt
  initProductCard3DTilt();
}

// ================= HORIZONTAL COLLECTION RUNWAY CONTROLLER =================
function slideCollections(direction) {
  const track = document.getElementById('runway-track');
  if (!track) return;

  const panel = track.querySelector('.runway-panel');
  const panelWidth = panel ? panel.offsetWidth + 24 : 380;

  track.scrollBy({
    left: direction * panelWidth,
    behavior: 'smooth'
  });
}

function initCollectionsRunwayController() {
  const track = document.getElementById('runway-track');
  if (!track) return;

  const updateRunwayState = () => {
    const panels = track.querySelectorAll('.runway-panel');
    if (!panels.length) return;

    const scrollLeft = track.scrollLeft;
    const totalScroll = track.scrollWidth - track.clientWidth;
    const panelWidth = panels[0].offsetWidth + 24;

    const currentIdx = Math.min(panels.length, Math.max(1, Math.round(scrollLeft / panelWidth) + 1));

    const indexDisp = document.getElementById('runway-index-display');
    if (indexDisp) indexDisp.textContent = '0' + currentIdx;

    const progBar = document.getElementById('runway-progress-bar');
    if (progBar && totalScroll > 0) {
      const progressPercent = Math.min(100, Math.max(20, (scrollLeft / totalScroll) * 100));
      progBar.style.width = `${progressPercent}%`;
    }
  };

  track.addEventListener('scroll', updateRunwayState, { passive: true });
  updateRunwayState();
}

// ================= INTERACTIVE 3D PRODUCT CARD TILT (DESKTOP MOUSE ONLY) =================
function initProductCard3DTilt() {
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth < 768);
  if (isTouchDevice) return; // Prevent touchmove performance drag & scroll stutter on mobile

  const cards = document.querySelectorAll('.product-card');
  cards.forEach(card => {
    if (card.dataset.tiltInitialized) return;
    card.dataset.tiltInitialized = 'true';

    // Desktop Mouse Perspective Tilt
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

// ================= CRAFTSMANSHIP PINNED STORYTELLING CONTROLLER =================
const craftStages = [
  {
    num: "Stage 01 / 04",
    title: "Pure Mulberry Silk & Botanical Washes",
    desc: "We handpick pure mulberry silk threads harvested from organic cocoons, treated in gentle botanical washes for natural shine, long-lasting strength, and wonderful softness.",
    hallmark: "Stage 01 · 100% Pure Mulberry Silk",
    counter: "01 / 04",
    metric1: "100% Pure Silk",
    metric2: "Natural Washed",
    progress: "25%"
  },
  {
    num: "Stage 02 / 04",
    title: "Tested 24K Gold & Pure Silver Zari",
    desc: "Woven with certified tested zari electroplated with genuine 24K gold micron finish that retains its luminous golden shine for generations without tarnishing.",
    hallmark: "Stage 02 · 24K Gold Tested Zari",
    counter: "02 / 04",
    metric1: "24K Real Gold",
    metric2: "Tarnish-Resistant",
    progress: "50%"
  },
  {
    num: "Stage 03 / 04",
    title: "Traditional Wooden Pit-Loom Weaving",
    desc: "Skilled generational master weavers hand-knot every booti and border on traditional wooden pit-looms with zero loose threads on the back for a smooth, premium drape.",
    hallmark: "Stage 03 · 120+ Hours Pit-Loom Craft",
    counter: "03 / 04",
    metric1: "120+ Hand Hours",
    metric2: "Zero-Float Finish",
    progress: "75%"
  },
  {
    num: "Stage 04 / 04",
    title: "Silk Mark Certified & Quality Inspection",
    desc: "Every finished saree undergoes thorough quality checks for weave tension, zari purity, and border alignment, and is certified with the government Silk Mark guarantee.",
    hallmark: "Stage 04 · Certified Silk Mark Guarantee",
    counter: "04 / 04",
    metric1: "Quality Checked",
    metric2: "Govt. Silk Mark",
    progress: "100%"
  }
];

let activeCraftIndex = 0;

function setCraftStage(index) {
  if (index < 0 || index >= craftStages.length) return;
  activeCraftIndex = index;
  const stage = craftStages[index];

  // Update Navigation Buttons
  for (let i = 0; i < 4; i++) {
    const btn = document.getElementById(`craft-btn-${i}`);
    const img = document.getElementById(`craft-img-${i}`);
    if (btn) {
      if (i === index) {
        btn.className = "craft-nav-btn active px-3.5 py-1.5 rounded-full border border-brand-gold bg-brand-dark text-brand-sand transition-all shadow-sm";
      } else {
        btn.className = "craft-nav-btn px-3.5 py-1.5 rounded-full border border-brand-gold/30 text-brand-mocha hover:border-brand-gold transition-all";
      }
    }
    if (img) {
      if (i === index) {
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
      } else {
        img.style.opacity = "0";
        img.style.transform = "scale(1.05)";
      }
    }
  }

  // Smooth narrative text transition
  const textWrap = document.getElementById('craft-text-wrapper');
  if (textWrap && window.gsap) {
    gsap.fromTo(textWrap, { opacity: 0.35, y: 12 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
  }

  const numEl = document.getElementById('craft-stage-number');
  if (numEl) numEl.textContent = stage.num;
  const titleEl = document.getElementById('craft-stage-title');
  if (titleEl) titleEl.textContent = stage.title;
  const descEl = document.getElementById('craft-stage-desc');
  if (descEl) descEl.textContent = stage.desc;

  const hallmarkEl = document.getElementById('craft-hallmark-title');
  if (hallmarkEl) hallmarkEl.textContent = stage.hallmark;
  const counterEl = document.getElementById('craft-hallmark-counter');
  if (counterEl) counterEl.textContent = stage.counter;

  const m1 = document.getElementById('craft-stage-metric1');
  if (m1) m1.textContent = stage.metric1;
  const m2 = document.getElementById('craft-stage-metric2');
  if (m2) m2.textContent = stage.metric2;

  const progLabel = document.getElementById('craft-progress-label');
  if (progLabel) progLabel.textContent = stage.progress;
  const progFill = document.getElementById('craft-progress-fill');
  if (progFill) progFill.style.width = stage.progress;
}

// ================= RENDER PRODUCTS (CATALOG) =================
let currentCollectionFilter = 'all';

function renderProducts() {
  const container = document.getElementById('products-grid');
  if (!container) return;

  let products = StoreDB.getProducts();

  if (currentCollectionFilter !== 'all') {
    products = products.filter(p => p.collection === currentCollectionFilter);
  }

  const countLabel = document.getElementById('product-count-label');
  if (countLabel) countLabel.textContent = products.length;

  if (products.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-14 h-14 rounded-full bg-brand-sand/60 text-brand-mocha flex items-center justify-center mx-auto mb-3">
          <i data-lucide="package-search" class="w-6 h-6"></i>
        </div>
        <h4 class="font-cormorant text-2xl font-bold text-brand-espresso">No Weaves Match This Filter</h4>
        <p class="text-xs text-brand-mocha mt-1 font-light">Try resetting the collection selection.</p>
        <button onclick="filterByCollection('all')" class="btn-luxury-outline !py-2 !px-5 !text-xs mt-4">
          Reset Filter
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = products.map((product) => {
    const isWishlisted = StoreDB.isInWishlist(product.id);
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return `
      <div class="product-card group flex flex-col justify-between">
        <div>
          <!-- Image Container with Aspect Ratio & Reveal -->
          <div class="relative overflow-hidden aspect-[3/4] bg-brand-sand cursor-pointer img-curtain-wrap" onclick="openProductModal('${product.id}')">
            <img 
              src="${product.images[0]}" 
              alt="${product.name}" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            <!-- Tag Badge -->
            <span class="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 badge-luxury bg-brand-dark/90 text-brand-gold-light text-[8px] sm:text-[9px] px-2 py-0.5">
              ${product.tag}
            </span>

            <!-- Wishlist Button -->
            <button 
              onclick="event.stopPropagation(); toggleWishlistItem('${product.id}')" 
              class="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${isWishlisted ? 'bg-brand-terracotta text-white' : 'bg-white/90 text-brand-mocha hover:bg-white'} flex items-center justify-center transition-all shadow-md"
              title="Add to Wishlist"
            >
              <i data-lucide="heart" class="w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}"></i>
            </button>

            <!-- Quick View Overlay Bar (Desktop) -->
            <div class="hidden sm:block absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button onclick="event.stopPropagation(); openProductModal('${product.id}')" class="w-full py-2 rounded-full bg-white/95 text-brand-dark font-medium text-[11px] shadow-lg hover:bg-brand-gold hover:text-brand-dark transition-all flex items-center justify-center gap-1.5 uppercase tracking-wider">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i> Quick View
              </button>
            </div>
          </div>

          <!-- Product Details (Compact, Two-Column Optimized) -->
          <div class="p-3 sm:p-4 pb-2">
            <div class="flex items-center justify-between text-[9px] sm:text-[10px] text-brand-mocha mb-1 font-semibold uppercase tracking-wider">
              <span class="text-brand-gold font-bold">${product.collectionName}</span>
              <span class="flex items-center gap-0.5 text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[9px]">
                <i data-lucide="star" class="w-2.5 h-2.5 fill-current text-amber-500"></i> ${product.rating}
              </span>
            </div>

            <h3 onclick="openProductModal('${product.id}')" class="font-cormorant text-sm sm:text-base font-bold text-brand-espresso hover:text-brand-gold transition-colors cursor-pointer truncate leading-snug" title="${product.name}">
              ${product.name}
            </h3>

            <!-- Color Swatch Indicator -->
            <div class="flex items-center gap-1.5 mt-1 text-[9px] sm:text-[10px] text-brand-mocha uppercase">
              <span class="inline-block w-2.5 h-2.5 rounded-full border border-brand-sand shadow-xs" style="background-color: ${product.colorHex}"></span>
              <span class="truncate">${product.color}</span>
            </div>
          </div>
        </div>

        <!-- Price & Action Button (Flipkart Shopping Standard) -->
        <div class="p-3 sm:p-4 pt-2 border-t border-brand-gold/15 flex items-end justify-between mt-auto gap-2">
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-cormorant text-base sm:text-lg font-bold text-brand-espresso leading-none">
                ${Currency.format(product.price)}
              </span>
              ${discountPercent > 0 ? `<span class="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded leading-none">${discountPercent}% OFF</span>` : ''}
            </div>
            <span class="text-[10px] sm:text-[11px] text-brand-mocha/60 line-through mt-0.5 leading-none">
              ${Currency.format(product.originalPrice)}
            </span>
          </div>

          <button 
            onclick="handleAddToCart('${product.id}')" 
            class="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-brand-sand text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1 shadow-sm shrink-0"
            title="Add to Shopping Bag"
          >
            <i data-lucide="shopping-bag" class="w-3 h-3 text-brand-gold"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
  initProductCard3DTilt();
}

// ================= RENDER BEST SELLERS (FLIPKART-STYLE 2-COLUMN LUXURY) =================
function renderBestSellers() {
  const container = document.getElementById('bestsellers-grid');
  if (!container) return;

  const products = StoreDB.getProducts().filter(p => p.isBestSeller).slice(0, 4);

  container.innerHTML = products.map((product) => {
    const isWishlisted = StoreDB.isInWishlist(product.id);
    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

    return `
      <div class="product-card group flex flex-col justify-between">
        <div>
          <div class="relative overflow-hidden aspect-[3/4] bg-brand-sand cursor-pointer img-curtain-wrap" onclick="openProductModal('${product.id}')">
            <img src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
            <span class="absolute top-2.5 sm:top-3.5 left-2.5 sm:left-3.5 badge-luxury bg-brand-gold text-brand-dark text-[8px] sm:text-[9px] px-2 py-0.5 font-bold">
              Best Seller
            </span>
            <button 
              onclick="event.stopPropagation(); toggleWishlistItem('${product.id}')" 
              class="absolute top-2.5 sm:top-3.5 right-2.5 sm:right-3.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full ${isWishlisted ? 'bg-brand-terracotta text-white' : 'bg-white/90 text-brand-mocha hover:bg-white'} flex items-center justify-center transition-all shadow-md"
              title="Add to Wishlist"
            >
              <i data-lucide="heart" class="w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}"></i>
            </button>
          </div>
          <div class="p-3 sm:p-4 pb-2">
            <span class="text-[9px] sm:text-[10px] uppercase tracking-widest text-brand-gold font-bold block mb-1">${product.collectionName}</span>
            <h4 onclick="openProductModal('${product.id}')" class="font-cormorant text-sm sm:text-base font-bold text-brand-espresso hover:text-brand-gold transition-colors cursor-pointer truncate mt-0.5">
              ${product.name}
            </h4>
          </div>
        </div>
        <div class="p-3 sm:p-4 pt-2 border-t border-brand-gold/15 flex items-end justify-between mt-auto gap-2">
          <div class="flex flex-col">
            <div class="flex items-center gap-1.5">
              <span class="font-cormorant text-base sm:text-lg font-bold text-brand-espresso leading-none">
                ${Currency.format(product.price)}
              </span>
              ${discountPercent > 0 ? `<span class="text-[9px] sm:text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded leading-none">${discountPercent}% OFF</span>` : ''}
            </div>
            <span class="text-[10px] sm:text-[11px] text-brand-mocha/60 line-through mt-0.5 leading-none">
              ${Currency.format(product.originalPrice)}
            </span>
          </div>
          <button onclick="handleAddToCart('${product.id}')" class="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-brand-dark hover:bg-brand-gold hover:text-brand-dark text-brand-sand text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider transition-all flex items-center gap-1 shadow-sm shrink-0">
            <i data-lucide="shopping-bag" class="w-3 h-3 text-brand-gold"></i>
            <span>Add</span>
          </button>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
  initProductCard3DTilt();
}

// ================= FILTER CONTROLS =================
function filterByCollection(collectionKey) {
  currentCollectionFilter = collectionKey;

  document.querySelectorAll('.filter-tab-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  const activeTab = document.getElementById(`tab-${collectionKey}`);
  if (activeTab) {
    activeTab.classList.add('active');
  }

  renderProducts();

  const shopSec = document.getElementById('shop');
  if (shopSec) {
    shopSec.scrollIntoView({ behavior: 'smooth' });
  }
}

// ================= LIVE SEARCH MODAL =================
function openSearchModal() {
  const modal = document.getElementById('search-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
  const input = document.getElementById('catalog-search-input');
  if (input) {
    input.focus();
    handleSearchQuery(input.value);
  }
}

function closeSearchModal() {
  const modal = document.getElementById('search-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handleSearchQuery(query) {
  const container = document.getElementById('search-results-container');
  if (!container) return;

  const cleanQuery = query.toLowerCase().trim();
  const products = StoreDB.getProducts();

  const results = products.filter(p => 
    p.name.toLowerCase().includes(cleanQuery) ||
    p.collectionName.toLowerCase().includes(cleanQuery) ||
    p.color.toLowerCase().includes(cleanQuery) ||
    p.description.toLowerCase().includes(cleanQuery)
  );

  if (results.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center text-brand-mocha text-xs font-light">
        No heirloom drapes found matching "${query}".
      </div>
    `;
    return;
  }

  container.innerHTML = results.map(p => `
    <div onclick="closeSearchModal(); openProductModal('${p.id}')" class="flex items-center gap-4 p-3 rounded-xl bg-white hover:bg-brand-sand/40 border-hairline cursor-pointer transition-all">
      <img src="${p.images[0]}" alt="${p.name}" class="w-14 h-18 object-cover rounded-lg shrink-0" />
      <div class="flex-1 min-w-0">
        <span class="text-[9px] uppercase tracking-widest text-brand-gold font-bold">${p.collectionName}</span>
        <h5 class="font-cormorant text-base font-bold text-brand-espresso truncate">${p.name}</h5>
        <span class="font-cormorant text-base font-bold text-brand-gold">${Currency.format(p.price)}</span>
      </div>
      <i data-lucide="arrow-right" class="w-4 h-4 text-brand-gold shrink-0"></i>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// ================= CART DRAWER & LOGIC =================
function toggleCartDrawer(isOpen) {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-drawer-backdrop');
  if (isOpen) {
    renderCartItems();
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function handleAddToCart(productId, variant = null) {
  StoreDB.addToCart(productId, 1, variant);
  toggleCartDrawer(true);
}

function updateCartUI() {
  const { count, subtotal, shipping } = StoreDB.getCartTotals();

  const badge = document.getElementById('nav-cart-badge');
  if (badge) badge.textContent = count;

  const subtotalEl = document.getElementById('cart-subtotal');
  const shippingEl = document.getElementById('cart-shipping');
  const totalEl = document.getElementById('cart-total');

  if (subtotalEl) subtotalEl.textContent = Currency.format(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : Currency.format(shipping);
  if (totalEl) totalEl.textContent = Currency.format(subtotal + shipping);

  const progressBar = document.getElementById('shipping-progress-bar');
  const progressText = document.getElementById('shipping-progress-text');
  if (progressBar && progressText) {
    if (subtotal >= 10000) {
      progressBar.style.width = '100%';
      progressText.textContent = 'Complimentary Insured Delivery Unlocked!';
    } else {
      const pct = Math.min(100, Math.round((subtotal / 10000) * 100));
      progressBar.style.width = pct + '%';
      progressText.textContent = `Add ${Currency.format(10000 - subtotal)} more for Free Express Delivery`;
    }
  }

  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  if (!container) return;

  const cart = StoreDB.getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-14 h-14 rounded-full bg-brand-sand/60 text-brand-mocha flex items-center justify-center mx-auto mb-3">
          <i data-lucide="shopping-bag" class="w-6 h-6"></i>
        </div>
        <h4 class="font-cormorant text-2xl font-bold text-brand-espresso">Your Bag is Empty</h4>
        <p class="text-xs text-brand-mocha mt-1 font-light">Explore our curated Tissue, Banarasi & Kanjivaram drapes.</p>
        <button onclick="toggleCartDrawer(false)" class="btn-luxury-outline !py-2 !px-5 !text-xs mt-4">
          Discover Sarees
        </button>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="flex items-center gap-3.5 p-3 rounded-xl bg-white border-hairline shadow-sm">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-lg shrink-0" />
      <div class="flex-1 min-w-0">
        <span class="text-[9px] text-brand-gold uppercase tracking-widest font-bold">${item.collectionName}</span>
        <h5 class="text-xs font-serif font-bold text-brand-espresso truncate">${item.name}</h5>
        ${item.variant ? `<span class="text-[10px] text-brand-mocha block">Variant: ${item.variant}</span>` : ''}
        <span class="text-xs font-cormorant font-bold text-brand-gold block mt-0.5">${Currency.format(item.price)}</span>

        <div class="flex items-center gap-2 mt-2">
          <div class="flex items-center border border-brand-gold/30 rounded-full bg-brand-sand/40">
            <button onclick="StoreDB.updateCartQty('${item.cartItemId || item.id}', ${item.qty - 1})" class="w-6 h-6 rounded-full flex items-center justify-center text-brand-mocha hover:bg-brand-gold text-xs font-bold transition-colors">
              -
            </button>
            <span class="px-2 text-xs font-bold text-brand-espresso">${item.qty}</span>
            <button onclick="StoreDB.updateCartQty('${item.cartItemId || item.id}', ${item.qty + 1})" class="w-6 h-6 rounded-full flex items-center justify-center text-brand-mocha hover:bg-brand-gold text-xs font-bold transition-colors">
              +
            </button>
          </div>
          <button onclick="StoreDB.removeFromCart('${item.cartItemId || item.id}')" class="text-brand-terracotta hover:underline text-[11px] font-semibold ml-auto">
            Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// ================= WISHLIST DRAWER & LOGIC =================
function toggleWishlistDrawer(isOpen) {
  const drawer = document.getElementById('wishlist-drawer');
  const backdrop = document.getElementById('wishlist-drawer-backdrop');
  if (isOpen) {
    renderWishlistItems();
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function toggleWishlistItem(productId) {
  StoreDB.toggleWishlist(productId);
  renderProducts();
}

function updateWishlistUI() {
  const wishlist = StoreDB.getWishlist();
  const badge = document.getElementById('nav-wishlist-badge');
  if (badge) {
    badge.textContent = wishlist.length;
    badge.style.opacity = wishlist.length > 0 ? '1' : '0';
  }
  renderWishlistItems();
}

function renderWishlistItems() {
  const container = document.getElementById('wishlist-items-container');
  if (!container) return;

  const wishlist = StoreDB.getWishlist();
  const products = StoreDB.getProducts().filter(p => wishlist.includes(p.id));

  if (products.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-14 h-14 rounded-full bg-brand-sand/60 text-brand-mocha flex items-center justify-center mx-auto mb-3">
          <i data-lucide="heart" class="w-6 h-6"></i>
        </div>
        <h4 class="font-cormorant text-2xl font-bold text-brand-espresso">Wishlist is Empty</h4>
        <p class="text-xs text-brand-mocha mt-1 font-light">Tap the heart icon on any heirloom drape to save it here.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = products.map(item => `
    <div class="flex items-center gap-3.5 p-3 rounded-xl bg-white border-hairline shadow-sm">
      <img src="${item.images[0]}" alt="${item.name}" class="w-16 h-20 object-cover rounded-lg shrink-0" />
      <div class="flex-1 min-w-0">
        <span class="text-[9px] text-brand-gold uppercase tracking-widest font-bold">${item.collectionName}</span>
        <h5 class="text-xs font-serif font-bold text-brand-espresso truncate">${item.name}</h5>
        <span class="text-xs font-cormorant font-bold text-brand-gold block mt-0.5">${Currency.format(item.price)}</span>

        <div class="flex items-center gap-2 mt-2">
          <button onclick="handleAddToCart('${item.id}'); StoreDB.toggleWishlist('${item.id}')" class="btn-luxury-primary !py-1 !px-3 !text-[10px]">
            Move to Bag
          </button>
          <button onclick="StoreDB.toggleWishlist('${item.id}')" class="text-brand-terracotta hover:underline text-[11px] font-semibold ml-auto">
            Remove
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// ================= PRODUCT DETAIL / QUICK VIEW MODAL =================
let selectedModalVariant = null;

function openProductModal(productId) {
  const product = StoreDB.getProductById(productId);
  if (!product) return;

  selectedModalVariant = product.variants ? product.variants[0] : product.color;

  const modal = document.getElementById('product-detail-modal');
  const content = document.getElementById('product-modal-content');

  content.innerHTML = `
    <!-- Left Column: Image Gallery Carousel -->
    <div class="md:col-span-6 space-y-3">
      <div class="overflow-hidden rounded-2xl aspect-[3/4] bg-brand-sand border-hairline">
        <img id="modal-main-img" src="${product.images[0]}" alt="${product.name}" class="w-full h-full object-cover" />
      </div>
      <div class="flex gap-2">
        ${product.images.map((img, i) => `
          <button onclick="document.getElementById('modal-main-img').src = '${img}'" class="w-16 h-20 rounded-xl overflow-hidden border border-brand-gold/30 hover:border-brand-gold transition-all">
            <img src="${img}" class="w-full h-full object-cover" />
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Right Column: Product Specs & Actions -->
    <div class="md:col-span-6 flex flex-col justify-between h-full space-y-5 text-left">
      <div>
        <div class="flex items-center justify-between">
          <span class="badge-luxury badge-gold text-[9px]">${product.collectionName}</span>
          <span class="text-xs font-semibold text-emerald-800 flex items-center gap-1">
            <i data-lucide="check-circle" class="w-3.5 h-3.5"></i> Loom Fresh In Stock
          </span>
        </div>

        <h3 class="font-cormorant text-3xl font-bold text-brand-espresso mt-2">
          ${product.name}
        </h3>

        <div class="flex items-center gap-2 mt-1 text-xs text-brand-gold">
          <span class="flex items-center text-amber-500">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
            <i data-lucide="star" class="w-3.5 h-3.5 fill-current"></i>
          </span>
          <span class="text-brand-mocha font-light">(${product.reviewsCount} Connoisseur Reviews)</span>
        </div>

        <div class="mt-4 flex items-baseline gap-3">
          <span class="font-cormorant text-3xl font-bold text-brand-gold">
            ${Currency.format(product.price)}
          </span>
          <span class="text-xs text-brand-mocha/70 line-through">
            ${Currency.format(product.originalPrice)}
          </span>
          <span class="text-xs font-bold text-emerald-800">
            Save ${Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
          </span>
        </div>

        <p class="text-xs text-brand-mocha mt-3 leading-relaxed font-light">
          ${product.description}
        </p>

        <!-- Variants Selection -->
        ${product.variants && product.variants.length > 1 ? `
          <div class="mt-4">
            <span class="block text-[10px] uppercase font-bold tracking-wider text-brand-espresso mb-2">Select Shade Variant:</span>
            <div class="flex flex-wrap gap-2">
              ${product.variants.map((v, i) => `
                <button onclick="selectVariant(this, '${v}')" class="variant-chip px-3 py-1.5 rounded-full text-xs border ${i === 0 ? 'border-brand-dark bg-brand-dark text-white' : 'border-brand-gold/40 text-brand-espresso bg-white'} transition-all">
                  ${v}
                </button>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Technical Specifications Table -->
        <div class="mt-5 p-4 rounded-xl bg-brand-sand/40 border-hairline text-xs space-y-2">
          <div class="flex justify-between py-1 border-hairline-b">
            <span class="text-brand-mocha font-light">Fabric Composition:</span>
            <span class="font-bold text-brand-espresso">${product.fabric}</span>
          </div>
          <div class="flex justify-between py-1 border-hairline-b">
            <span class="text-brand-mocha font-light">Zari Purity:</span>
            <span class="font-bold text-brand-espresso">${product.zariType}</span>
          </div>
          <div class="flex justify-between py-1 border-hairline-b">
            <span class="text-brand-mocha font-light">Blouse Piece:</span>
            <span class="font-bold text-brand-espresso">${product.blousePiece}</span>
          </div>
          <div class="flex justify-between py-1">
            <span class="text-brand-mocha font-light">Drape Length:</span>
            <span class="font-bold text-brand-espresso">${product.length}</span>
          </div>
        </div>
      </div>

      <!-- Action CTAs -->
      <div class="space-y-3 pt-3">
        <button onclick="handleAddToCart('${product.id}', selectedModalVariant); closeProductModal()" class="btn-luxury-primary w-full text-xs font-bold tracking-widest uppercase !py-3.5">
          <i data-lucide="shopping-bag" class="w-4 h-4 text-brand-gold"></i>
          <span>Add to Atelier Bag</span>
        </button>
        <button onclick="instantBuy('${product.id}')" class="btn-luxury-gold w-full text-xs font-bold tracking-widest uppercase !py-3.5">
          <span>Instant Checkout (Buy Now)</span>
          <i data-lucide="arrow-right" class="w-4 h-4"></i>
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function selectVariant(btn, variantName) {
  selectedModalVariant = variantName;
  document.querySelectorAll('.variant-chip').forEach(b => {
    b.classList.remove('border-brand-dark', 'bg-brand-dark', 'text-white');
    b.classList.add('border-brand-gold/40', 'text-brand-espresso', 'bg-white');
  });
  btn.classList.add('border-brand-dark', 'bg-brand-dark', 'text-white');
  btn.classList.remove('border-brand-gold/40', 'text-brand-espresso', 'bg-white');
}

function closeProductModal() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function instantBuy(productId) {
  closeProductModal();
  StoreDB.clearCart();
  StoreDB.addToCart(productId, 1, selectedModalVariant);
  openCheckoutModal();
}

// ================= CHECKOUT & REAL BOOKING FLOW =================
function openCheckoutModal() {
  toggleCartDrawer(false);
  const { subtotal, shipping, count } = StoreDB.getCartTotals();
  if (count === 0) {
    alert('Please add at least one saree to your bag before proceeding to checkout.');
    return;
  }

  const modal = document.getElementById('checkout-modal');
  const totalDisplay = document.getElementById('checkout-total-display');
  if (totalDisplay) totalDisplay.textContent = Currency.format(subtotal + shipping);

  const user = StoreDB.getCurrentUser();
  if (user) {
    document.getElementById('order-customer-name').value = user.name || '';
    document.getElementById('order-customer-phone').value = user.phone || '';
    document.getElementById('order-customer-email').value = user.email || '';
    document.getElementById('order-customer-address').value = user.address || '';
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

function handlePlaceOrder(e) {
  e.preventDefault();

  const name = document.getElementById('order-customer-name').value.trim();
  const phone = document.getElementById('order-customer-phone').value.trim();
  const email = document.getElementById('order-customer-email').value.trim();
  const address = document.getElementById('order-customer-address').value.trim();
  const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

  const { subtotal, shipping } = StoreDB.getCartTotals();
  const cartItems = StoreDB.getCart();

  const newOrder = StoreDB.addOrder({
    customerName: name,
    customerPhone: phone,
    customerEmail: email,
    shippingAddress: address,
    items: cartItems,
    subtotal: subtotal,
    shippingFee: shipping,
    total: subtotal + shipping,
    paymentMethod: paymentMethod === 'UPI' ? 'UPI (GPay/PhonePe)' : (paymentMethod === 'Card' ? 'Credit/Debit Card' : 'Cash on Delivery (COD)'),
    paymentStatus: paymentMethod === 'COD' ? 'PENDING ON DELIVERY' : 'PAID'
  });

  StoreDB.clearCart();
  closeCheckoutModal();

  document.getElementById('confirmed-order-id').textContent = newOrder.orderId;
  const successModal = document.getElementById('order-success-modal');
  successModal.classList.add('active');
}

function closeSuccessModal() {
  document.getElementById('order-success-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function goToTrackOrderFromModal() {
  const orderId = document.getElementById('confirmed-order-id').textContent;
  closeSuccessModal();
  fillSampleTrack(orderId);
  const trackSec = document.getElementById('track-order');
  if (trackSec) trackSec.scrollIntoView({ behavior: 'smooth' });
}

// ================= LIVE ORDER TRACKING =================
function handleTrackOrder(e) {
  e.preventDefault();
  const query = document.getElementById('track-order-input').value.trim();
  const order = StoreDB.findOrderByQuery(query);
  renderTrackResult(order, query);
}

function fillSampleTrack(orderId) {
  document.getElementById('track-order-input').value = orderId;
  const order = StoreDB.findOrderByQuery(orderId);
  renderTrackResult(order, orderId);
}

function renderTrackResult(order, query) {
  const box = document.getElementById('track-result-box');
  if (!box) return;

  box.classList.remove('hidden');

  if (!order) {
    box.innerHTML = `
      <div class="text-center py-6 text-brand-mocha font-light">
        <i data-lucide="alert-circle" class="w-7 h-7 text-brand-terracotta mx-auto mb-2"></i>
        <h4 class="font-cormorant text-2xl font-bold text-brand-espresso">No Weave Order Found for "${query}"</h4>
        <p class="text-xs text-brand-mocha mt-1">Please verify your Order ID (e.g. SIA-88342) or mobile number.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  const stages = [
    'Order Confirmed',
    'Loom Allocated',
    'Weaving & Finishing',
    'Dispatched',
    'Delivered'
  ];

  let currentStageIdx = stages.indexOf(order.orderStatus);
  if (currentStageIdx === -1) currentStageIdx = 0;

  box.innerHTML = `
    <div class="space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border-hairline">
        <div>
          <span class="text-[9px] uppercase tracking-widest text-brand-gold font-bold">Authenticated Order</span>
          <h4 class="font-cormorant text-2xl font-bold text-brand-espresso">${order.orderId}</h4>
          <span class="text-xs text-brand-mocha font-light">Client: <strong>${order.customerName}</strong></span>
        </div>
        <div class="text-left sm:text-right">
          <span class="badge-luxury bg-brand-gold/20 text-brand-espresso border border-brand-gold/40 text-xs font-bold">
            ${order.orderStatus}
          </span>
          <span class="text-[11px] text-brand-mocha/80 block mt-1">${order.estimatedDelivery}</span>
        </div>
      </div>

      <!-- 5-Step Visual Progress Stepper -->
      <div class="py-4">
        <div class="grid grid-cols-5 gap-2 relative">
          <div class="absolute top-4 left-[10%] right-[10%] h-0.5 bg-brand-sand/80 -z-0">
            <div class="h-full bg-brand-gold transition-all duration-500" style="width: ${(currentStageIdx / (stages.length - 1)) * 100}%;"></div>
          </div>

          ${stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIdx;
            const isCurrent = idx === currentStageIdx;
            const isPending = idx > currentStageIdx;

            return `
              <div class="flex flex-col items-center text-center z-10">
                <div class="stepper-circle ${isCompleted ? 'completed' : (isCurrent ? 'active' : 'pending')} mb-2">
                  ${isCompleted ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : (idx + 1)}
                </div>
                <span class="text-[9px] sm:text-[11px] font-semibold ${isCurrent ? 'text-brand-gold font-bold' : (isCompleted ? 'text-brand-espresso' : 'text-brand-mocha/70')}">
                  ${stage}
                </span>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
        <div class="p-3.5 rounded-xl bg-brand-sand/40 border-hairline">
          <span class="text-brand-mocha block text-[9px] uppercase font-bold tracking-wider">Courier Logistics</span>
          <span class="font-bold text-brand-espresso text-sm">${order.trackingCourier}</span>
          <span class="text-brand-mocha block text-[11px]">Waybill: ${order.trackingNumber}</span>
        </div>
        <div class="p-3.5 rounded-xl bg-brand-sand/40 border-hairline">
          <span class="text-brand-mocha block text-[9px] uppercase font-bold tracking-wider">Destination</span>
          <span class="text-brand-espresso text-xs font-medium block truncate">${order.shippingAddress}</span>
          <span class="text-emerald-800 font-bold text-[11px]">Method: ${order.paymentMethod} (${order.paymentStatus})</span>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

// ================= INQUIRY TABS & FORMS =================
function switchInquiryTab(tab) {
  const msgForm = document.getElementById('inquiry-msg-form');
  const styleForm = document.getElementById('inquiry-style-form');
  const tabMsg = document.getElementById('inquiry-tab-msg');
  const tabStyle = document.getElementById('inquiry-tab-style');

  if (tab === 'message') {
    msgForm.classList.remove('hidden');
    styleForm.classList.add('hidden');
    tabMsg.classList.add('bg-brand-dark', 'text-brand-sand', 'shadow-sm');
    tabMsg.classList.remove('text-brand-mocha');
    tabStyle.classList.remove('bg-brand-dark', 'text-brand-sand', 'shadow-sm');
    tabStyle.classList.add('text-brand-mocha');
  } else {
    msgForm.classList.add('hidden');
    styleForm.classList.remove('hidden');
    tabStyle.classList.add('bg-brand-dark', 'text-brand-sand', 'shadow-sm');
    tabStyle.classList.remove('text-brand-mocha');
    tabMsg.classList.remove('bg-brand-dark', 'text-brand-sand', 'shadow-sm');
    tabMsg.classList.add('text-brand-mocha');
  }
  if (window.lucide) lucide.createIcons();
}

function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('contact-name').value;
  alert(`Thank you, ${name}! Your inquiry has reached our Jubilee Hills Flagship Atelier. Our concierge will connect via WhatsApp within 4 business hours.`);
  e.target.reset();
}

function handleBookingSubmit(e) {
  e.preventDefault();
  const name = (document.getElementById('style-name') || document.getElementById('book-name'))?.value.trim();
  const phone = (document.getElementById('style-phone') || document.getElementById('book-phone'))?.value.trim();
  const date = (document.getElementById('style-date') || document.getElementById('book-date'))?.value;
  const time = (document.getElementById('style-time') || document.getElementById('book-time'))?.value;
  const service = (document.getElementById('style-service') || document.getElementById('book-service'))?.value;

  StoreDB.addBooking({
    name, phone, email: 'concierge@klakruti.com', preferredDate: date, preferredTime: time, service
  });

  alert(`Thank you, ${name}! Your virtual drape appointment on ${date} at ${time} is registered in our private salon diary.`);
  e.target.reset();
}

function handleNewsletter(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value;
  alert(`Thank you! You are now subscribed to the private Atelier Journal (${email}).`);
  e.target.reset();
}

// ================= POLICY MODALS =================
const POLICY_TEXTS = {
  cancellation: {
    title: 'Cancellation & Return Policy',
    content: `
      <h4 class="font-cormorant text-lg font-bold text-brand-espresso">1. Order Cancellations</h4>
      <p>Because each heirloom saree is handpicked, quality-inspected, and allocated from traditional looms, cancellations are honored within <strong>24 hours</strong> of booking placement. Once an order enters the <em>Loom Allocated</em> or <em>Dispatched</em> status, cancellation is no longer possible prior to delivery.</p>

      <h4 class="font-cormorant text-lg font-bold text-brand-espresso mt-3">2. 7-Day Hassle-Free Returns</h4>
      <p>We take pride in our artisanal standards. If your delivered saree has any weaving irregularities, color discrepancies, or packaging transit damage, you may initiate a return within <strong>7 business days</strong> of doorstep delivery.</p>

      <h4 class="font-cormorant text-lg font-bold text-brand-espresso mt-3">3. Return Conditions</h4>
      <p>The saree must remain unused, unworn, unstitched (running blouse intact), with original Silk Mark certification tags and fabric presentation boxes undamaged.</p>

      <h4 class="font-cormorant text-lg font-bold text-brand-espresso mt-3">4. Complimentary Doorstep Pickup</h4>
      <p>Our concierge courier partners (Bluedart/DHL) will arrange a white-glove pickup from your shipping address at zero additional charge.</p>
    `
  },
  refund: {
    title: 'Refund & Exchange Policy',
    content: `
      <h4 class="font-cormorant text-lg font-bold text-brand-espresso">1. Refund Initiation</h4>
      <p>Upon receipt of the returned saree at our Jubilee Hills Flagship Atelier, our textile master draper conducts a physical inspection within <strong>48 business hours</strong>.</p>

      <h4 class="font-cormorant text-lg font-bold text-brand-espresso mt-3">2. Refund Timelines & Methods</h4>
      <p>Approved refunds are credited directly back to the original payment source:
        <br/>• <strong>UPI & Net Banking:</strong> 2 to 4 business days.
        <br/>• <strong>Credit/Debit Cards:</strong> 5 to 7 banking days.
        <br/>• <strong>Cash on Delivery (COD):</strong> Directly transferred to your provided bank account/NEFT/UPI within 3 business days.
      </p>

      <h4 class="font-cormorant text-lg font-bold text-brand-espresso mt-3">3. Exchange Policy</h4>
      <p>You may exchange your saree for any alternative weave in our <strong>Tissue Silk</strong>, <strong>Malai Silk</strong>, <strong>Banarasi</strong>, or <strong>Kanjivaram</strong> collections. If the exchange saree is of higher value, the difference can be settled via UPI; if lower, the surplus is promptly refunded.</p>
    `
  },
  privacy: {
    title: 'Privacy & Security Policy',
    content: `
      <h4 class="font-cormorant text-lg font-bold text-brand-espresso">1. Information We Collect</h4>
      <p>कल्रा KRUTI by Vyara collects only the essential customer information required to handcraft, book, and deliver your orders safely: recipient name, telephone/WhatsApp number, delivery destination, and billing coordinates.</p>

      <h4 class="font-cormorant text-lg font-bold text-brand-espresso mt-3">2. Payment Security & Encryption</h4>
      <p>We do not store complete credit card or debit card numbers on our local databases. All digital transactions are processed through RBI-compliant, 256-bit SSL encrypted payment gateways.</p>

      <h4 class="font-cormorant text-lg font-bold text-brand-espresso mt-3">3. Zero Data Sharing Guarantee</h4>
      <p>We strictly never rent, monetize, or disclose your personal details to third-party marketing entities. Your data is strictly used for order updates and atelier concierge communications.</p>
    `
  }
};

function openPolicyModal(policyKey) {
  const policy = POLICY_TEXTS[policyKey];
  if (!policy) return;

  document.getElementById('policy-modal-title').textContent = policy.title;
  document.getElementById('policy-modal-content').innerHTML = policy.content;

  const modal = document.getElementById('policy-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closePolicyModal() {
  document.getElementById('policy-modal').classList.remove('active');
  document.body.style.overflow = '';
}

// ================= CUSTOMER AUTH MODAL =================
function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (window.lucide) lucide.createIcons();
}

function closeAuthModal() {
  document.getElementById('auth-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('login-form');
  const regForm = document.getElementById('register-form');
  const tabLogin = document.getElementById('auth-tab-login');
  const tabReg = document.getElementById('auth-tab-register');

  if (tab === 'login') {
    loginForm.classList.remove('hidden');
    regForm.classList.add('hidden');
    tabLogin.classList.add('bg-brand-dark', 'text-brand-sand');
    tabLogin.classList.remove('text-brand-mocha');
    tabReg.classList.remove('bg-brand-dark', 'text-brand-sand');
    tabReg.classList.add('text-brand-mocha');
  } else {
    loginForm.classList.add('hidden');
    regForm.classList.remove('hidden');
    tabReg.classList.add('bg-brand-dark', 'text-brand-sand');
    tabReg.classList.remove('text-brand-mocha');
    tabLogin.classList.remove('bg-brand-dark', 'text-brand-sand');
    tabLogin.classList.add('text-brand-mocha');
  }
  if (window.lucide) lucide.createIcons();
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const name = email.split('@')[0].replace(/[._]/g, ' ');
  const user = {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    email: email,
    phone: '+91 99480 33211',
    address: 'Signature Towers, Bengaluru - 560038'
  };
  StoreDB.saveCurrentUser(user);
  closeAuthModal();
  alert(`Welcome back to the Atelier, ${user.name}!`);
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const user = { name, phone, email, address: '' };
  StoreDB.saveCurrentUser(user);
  closeAuthModal();
  alert(`Registration complete! Welcome to कल्रा KRUTI by Vyara, ${name}!`);
}

function updateAuthUI() {
  const user = StoreDB.getCurrentUser();
  const label = document.getElementById('nav-user-label');
  if (label) {
    label.textContent = user ? user.name.split(' ')[0] : 'Sign In';
  }
}

// ================= MOBILE DRAWER =================
function toggleMobileMenu(isOpen) {
  const drawer = document.getElementById('mobile-menu-drawer');
  if (isOpen) {
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
  }
}
