import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, ArrowUp } from 'lucide-react';

export default function Footer() {
  const { navigatePage, setSelectedCollection, currentView } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCollectionClick = (collectionId) => {
    setSelectedCollection(collectionId);
    if (currentView !== 'home') {
      navigatePage('home');
      setTimeout(() => {
        const el = document.getElementById('shop');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 200);
    } else {
      const el = document.getElementById('shop');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#2B070D] text-[#FAF7F2] pt-16 pb-12 border-t border-[#C59B51]/30 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#C59B51]/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5 cursor-pointer" onClick={() => navigatePage('home')}>
              {/* Independent Floating Lotus Emblem */}
              <div className="flex items-center justify-center shrink-0">
                <img 
                  src="assets/brand-lotus-gold.png" 
                  alt="कला KRUTI by Vyara" 
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
                />
              </div>
              <div className="flex flex-col text-left justify-center">
                <img 
                  src="assets/klakruti-by-vyara-light.png" 
                  alt="कलाKruti BY VYARA" 
                  className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
                />
                <span className="font-italiana italic text-[11px] text-[#E4C58B]/90 tracking-wide mt-1">
                  Threads of Culture, Beads of Joy
                </span>
              </div>
            </div>

            <p className="text-xs text-[#FAF7F2]/75 leading-relaxed font-light">
              A sacred preservation of authentic Indian handlooms. Hand-knotted on traditional wooden pit-looms in Varanasi, Kanchipuram, and Chanderi with certified 100% pure silk and tested 24K real gold zari.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-[#E4C58B]">
              <ShieldCheck className="w-4 h-4 text-[#C59B51]" />
              <span>Silk Mark Certified · GI-Tagged Handlooms</span>
            </div>
          </div>

          {/* Signature Weaves */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#E4C58B] uppercase tracking-wider">
              Signature Weaves
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/75">
              <li>
                <button 
                  onClick={() => handleCollectionClick('tissue-silk')} 
                  className="hover:text-[#E4C58B] transition-colors cursor-pointer text-left"
                >
                  Tissue Silk Sarees
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCollectionClick('banarasi-silk')} 
                  className="hover:text-[#E4C58B] transition-colors cursor-pointer text-left"
                >
                  Banarasi Katan Brocades
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCollectionClick('malai-silk')} 
                  className="hover:text-[#E4C58B] transition-colors cursor-pointer text-left"
                >
                  Malai Butter Silk Drapes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCollectionClick('all')} 
                  className="hover:text-[#E4C58B] transition-colors cursor-pointer text-left"
                >
                  All Handloom Drapes
                </button>
              </li>
            </ul>
          </div>

          {/* Concierge & Assistance */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#E4C58B] uppercase tracking-wider">
              Client Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/75">
              <li>
                <button 
                  onClick={() => navigatePage('orders')} 
                  className="hover:text-[#E4C58B] transition-colors cursor-pointer text-left"
                >
                  Track Order / My Orders
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigatePage('about')} 
                  className="hover:text-[#E4C58B] transition-colors cursor-pointer text-left"
                >
                  About Our Heritage
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigatePage('contact')} 
                  className="hover:text-[#E4C58B] transition-colors cursor-pointer text-left"
                >
                  Contact & Styling Concierge
                </button>
              </li>
              <li>
                <a 
                  href="admin.html" 
                  className="hover:text-[#E4C58B] transition-colors inline-block"
                >
                  Executive Admin Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#E4C58B] uppercase tracking-wider">
              Privileged Previews
            </h4>
            <p className="text-xs text-[#FAF7F2]/75 leading-relaxed">
              Receive private invitations to new loom launches and seasonal trousseau editions.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to private previews!'); }} className="flex gap-2 pt-1">
              <input 
                type="email" 
                required
                placeholder="Enter email address"
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-[#C59B51]/40 text-xs text-white placeholder-white/50 focus:outline-none"
              />
              <button 
                type="submit"
                className="px-4 py-2 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/40 text-xs font-bold uppercase hover:bg-[#C59B51] hover:text-[#2B070D] transition-colors cursor-pointer"
              >
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF7F2]/60">
          <p>© 2026 कला KRUTI by Vyara. Threads of culture, Beads of joy. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-[#E4C58B] transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
