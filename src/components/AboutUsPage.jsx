import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, Award, Heart, Sparkles, ArrowRight, ArrowLeft, 
  CheckCircle2, Users, MapPin, Feather, Compass
} from 'lucide-react';

export default function AboutUsPage() {
  const { navigatePage, setSelectedCollection } = useStore();

  const handleExploreSarees = () => {
    setSelectedCollection('all');
    navigatePage('home');
    setTimeout(() => {
      const elem = document.getElementById('shop');
      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#58111A] pt-4 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 py-3 border-b border-[#C59B51]/20 mb-8 text-xs text-[#7C2335]">
          <button 
            onClick={() => navigatePage('home')}
            className="flex items-center gap-1 text-[#58111A] font-bold hover:text-[#C59B51] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
          <span className="text-[#C59B51] font-bold">/</span>
          <span className="font-semibold text-[#58111A]">About Us</span>
          <span className="text-[#C59B51] font-bold">/</span>
          <span className="text-[#7C2335]">Heritage & Loom Metier</span>
        </div>

        {/* Hero Banner with Velvet Maroon & Gold Flourish */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#2B070D] via-[#3B0910] to-[#1A0307] text-[#FAF7F2] p-8 sm:p-14 mb-16 shadow-2xl border border-[#C59B51]/30">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C59B51_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] border border-[#C59B51]/40 text-[#E4C58B] text-xs font-semibold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B51]" />
              <span>Two Generations of Pure Handloom Mastery</span>
            </div>

            <h1 className="font-cormorant text-4xl sm:text-6xl font-normal leading-tight text-[#FAF7F2] mb-4">
              Weaving Soul into Silk. <br />
              <span className="font-italiana italic text-[#E4C58B]">A Legacy Born on the Ghats of Kashi.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#FAF7F2]/80 font-light leading-relaxed mb-6 max-w-2xl">
              Founded on the belief that a handwoven saree is not merely fabric, but sacred living poetry. Every drape at <strong className="text-white font-medium">कलाKRUTI by Vyara</strong> carries the rhythmic heartbeat of wooden pit-looms in Varanasi, Kanchipuram, and Chanderi.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={handleExploreSarees}
                className="btn-luxury-primary !py-3 !px-7 !text-xs cursor-pointer shadow-lg hover:scale-105 transition-transform"
              >
                <span>Explore Saree Atelier</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button 
                onClick={() => navigatePage('contact')}
                className="btn-pill-gold !py-3 !px-7 !text-xs !bg-white/10 !text-[#FAF7F2] hover:!bg-white/20 !border-white/30 cursor-pointer"
              >
                <span>Book Concierge Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* Our Three Sacred Vows */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-[#7C2335] uppercase tracking-[0.25em] block mb-2">
              Uncompromising Authenticity
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl text-[#58111A]">
              The Three Sacred Vows of कलाKruti
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-[#C59B51]/25 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#58111A] text-[#E4C58B] flex items-center justify-center mb-5 shadow-md">
                <ShieldCheck className="w-6 h-6 text-[#E4C58B]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#58111A] mb-2 uppercase tracking-wide">
                100% Pure Silk Mark Certified
              </h3>
              <p className="text-xs text-[#7C2335] leading-relaxed">
                Every single saree carries the government-authorized Silk Mark label. We rigorously reject synthetic polyesters, art silks, and nylon blends. Only dense 3-ply Mulberry, Katan, and Tussar silks touch our looms.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#C59B51]/25 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#58111A] text-[#E4C58B] flex items-center justify-center mb-5 shadow-md">
                <Sparkles className="w-6 h-6 text-[#E4C58B]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#58111A] mb-2 uppercase tracking-wide">
                Tested 24K Real Gold Zari
              </h3>
              <p className="text-xs text-[#7C2335] leading-relaxed">
                Our brocades are spun with tested zari—authentic silver threads electroplated with genuine 24-karat gold finish. Unlike imitation metallic plastic, our zari will never tarnish, preserving bridal heirlooms for generations.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-[#C59B51]/25 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-[#58111A] text-[#E4C58B] flex items-center justify-center mb-5 shadow-md">
                <Heart className="w-6 h-6 text-[#E4C58B]" />
              </div>
              <h3 className="font-cinzel text-base font-bold text-[#58111A] mb-2 uppercase tracking-wide">
                Fair Living Pay to Weavers
              </h3>
              <p className="text-xs text-[#7C2335] leading-relaxed">
                By eliminating middlemen and retail cartels, we direct 100% of fair compensation to traditional weaver families in Varanasi and Kanchipuram, empowering master craftsmen and keeping the sacred loom art alive.
              </p>
            </div>
          </div>
        </div>

        {/* The Loom Heritage Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-white p-8 sm:p-14 rounded-3xl border border-[#C59B51]/25 shadow-sm">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-[11px] font-bold text-[#7C2335] uppercase tracking-[0.25em] block">
              Sacred Artisanal Metier
            </span>
            <h2 className="font-cormorant text-3xl sm:text-5xl text-[#58111A] leading-tight">
              A Drape That Takes Up to 180 Hours to Weave
            </h2>
            <p className="text-xs sm:text-sm text-[#7C2335] leading-relaxed font-light">
              In an era dominated by computerized power looms that churn out thousands of synthetic dupes an hour, we choose the deliberate, meditative path of patience.
            </p>
            <p className="text-xs sm:text-sm text-[#7C2335] leading-relaxed font-light">
              On a traditional hand-pit loom, two master weavers sit together in synchronous choreography. One manipulates the wooden warp shuttles while the other interlocks the real gold zari weft with fine needles. A single Jangla or Korvai bridal saree can take anywhere from 14 to 28 days of uninterrupted devotion.
            </p>

            <div className="pt-2 flex flex-col gap-2.5 text-xs text-[#58111A] font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B51]" />
                <span>GI-Tagged Authentic Varanasi & Kanchipuram Weaving Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B51]" />
                <span>Zero Machine Print · 100% Needle-Interlocked Weft</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C59B51]" />
                <span>Heirloom Longevity Guaranteed with Authenticity Certificate</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-md border border-[#C59B51]/20">
              <img 
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80" 
                alt="Pit Loom Weaving Master" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="rounded-2xl overflow-hidden aspect-[4/5] shadow-md border border-[#C59B51]/20 mt-6">
              <img 
                src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=80" 
                alt="24K Real Gold Zari Brocade" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>

        {/* Master Artisan Guild Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-3xl bg-[#2B070D] text-[#FAF7F2] border border-[#C59B51]/30 text-center mb-16">
          <div>
            <span className="font-cormorant text-4xl sm:text-5xl font-bold text-[#E4C58B] block mb-1">
              42+
            </span>
            <span className="text-[10px] sm:text-xs text-[#FAF7F2]/80 uppercase tracking-wider">
              Master Looms Supported
            </span>
          </div>
          <div>
            <span className="font-cormorant text-4xl sm:text-5xl font-bold text-[#E4C58B] block mb-1">
              100%
            </span>
            <span className="text-[10px] sm:text-xs text-[#FAF7F2]/80 uppercase tracking-wider">
              Silk Mark Certified
            </span>
          </div>
          <div>
            <span className="font-cormorant text-4xl sm:text-5xl font-bold text-[#E4C58B] block mb-1">
              24K
            </span>
            <span className="text-[10px] sm:text-xs text-[#FAF7F2]/80 uppercase tracking-wider">
              Tested Real Gold Zari
            </span>
          </div>
          <div>
            <span className="font-cormorant text-4xl sm:text-5xl font-bold text-[#E4C58B] block mb-1">
              4,800+
            </span>
            <span className="text-[10px] sm:text-xs text-[#FAF7F2]/80 uppercase tracking-wider">
              Cherished Brides Worldwide
            </span>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="text-center py-12 px-6 rounded-3xl bg-[#FAF7F2] border border-[#C59B51]/30">
          <span className="font-italiana italic text-base text-[#7C2335] block mb-2">
            Threads of Culture, Beads of Joy
          </span>
          <h2 className="font-cormorant text-3xl sm:text-5xl text-[#58111A] mb-4">
            Experience the Regal Touch of Authentic Handlooms
          </h2>
          <p className="text-xs text-[#7C2335] max-w-lg mx-auto mb-6">
            Complimentary doorstep shipping across India. Worldwide express delivery with insured packaging and authenticity certificates.
          </p>
          <button 
            onClick={handleExploreSarees}
            className="btn-luxury-primary !py-3 !px-8 !text-xs cursor-pointer shadow-lg hover:scale-105 transition-transform"
          >
            <span>Explore Handloom Sarees</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

