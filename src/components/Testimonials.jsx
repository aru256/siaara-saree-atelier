import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    stars: 5,
    quote: "The Aura Metallic Tissue is truly liquid gold. It draped with absolute structural crispness during my wedding reception in Udaipur.",
    name: "Aishwarya Singhania",
    location: "Bride · New Delhi"
  },
  {
    stars: 5,
    quote: "Finding genuine Kadwa Banarasi without machine shortcuts is rare today. कल्रा Kruti by Vyara’s pit-loom craftsmanship is a generational triumph.",
    name: "Radhika Kirloskar",
    location: "Textile Collector · Mumbai"
  },
  {
    stars: 5,
    quote: "The Malai silk feels like cool velvet against the skin. Zero wrinkles even after 8 hours of festive celebrations. Absolutely supreme.",
    name: "Dr. Nithya Sundaram",
    location: "Chennai"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#C59B51]/20">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider mb-3">
          <Star className="w-3.5 h-3.5 text-[#C59B51]" />
          <span>The Connoisseur Voice</span>
        </div>
        <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#58111A]">
          Worn by Modern Heirs, <br/>
          <span className="font-italiana italic text-gold-gradient font-normal">
            Celebrated by Couture.
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS.map((rev, i) => (
          <div 
            key={i}
            className="p-8 rounded-2xl bg-[#FAF7F2] border border-[#C59B51]/25 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="space-y-4">
              <div className="flex text-[#C59B51] gap-1">
                {[...Array(rev.stars)].map((_, si) => (
                  <Star key={si} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-cormorant text-xl italic text-[#58111A] leading-snug">
                "{rev.quote}"
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-[#C59B51]/15">
              <h4 className="font-sans text-xs font-bold text-[#58111A] uppercase tracking-wider">
                {rev.name}
              </h4>
              <span className="text-[10px] text-[#7C2335]">
                {rev.location}
              </span>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

