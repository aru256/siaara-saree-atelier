import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Search, ArrowRight, CheckCircle2, Clock, Truck } from 'lucide-react';

export default function OrderTracking() {
  const { trackOrder } = useStore();
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = trackOrder(query);
    setSearchResult(res);
    setSearched(true);
  };

  const fillSample = (code) => {
    setQuery(code);
    const res = trackOrder(code);
    setSearchResult(res);
    setSearched(true);
  };

  return (
    <section id="track-order" className="py-20 sm:py-32 px-4 sm:px-8 max-w-5xl mx-auto border-t border-[#C59B51]/20">
      <div className="p-8 sm:p-14 rounded-3xl bg-[#FAF7F2] border border-[#C59B51]/30 shadow-2xl">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#C59B51]" />
            <span>Doorstep Delivery Tracking</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-5xl font-normal text-[#58111A]">
            Track Your Saree Order
          </h2>
          <p className="text-xs text-[#7C2335] mt-2 font-normal">
            Enter your Order ID (try{' '}
            <button 
              onClick={() => fillSample('KLA-88342')} 
              className="font-bold text-[#58111A] underline cursor-pointer hover:text-[#C59B51]"
            >
              KLA-88342
            </button>
            {' '}or{' '}
            <button 
              onClick={() => fillSample('KLA-76129')} 
              className="font-bold text-[#58111A] underline cursor-pointer hover:text-[#C59B51]"
            >
              KLA-76129
            </button>
            ) or your phone number to check live status.
          </p>
        </div>

        {/* Tracking Search Form */}
        <form onSubmit={handleSearch} className="max-w-md mx-auto luxury-search-bar mb-6 flex items-center gap-2 bg-white p-1.5 rounded-full border border-[#C59B51]/40 shadow-sm">
          <Search className="w-4 h-4 ml-3 text-[#7C2335]/70 shrink-0" />
          <input 
            type="text" 
            placeholder="e.g. KLA-88342 or 9849012345" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-xs sm:text-sm text-[#58111A] font-medium pl-2 focus:outline-none bg-transparent" 
            required 
          />
          <button type="submit" className="btn-luxury-primary !py-2.5 !px-6 !text-xs shrink-0">
            <span>Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Tracking Output Result Box */}
        {searched && (
          <div className="pt-6 border-t border-[#C59B51]/20 animate-in fade-in duration-300">
            {searchResult ? (
              <div className="space-y-6 text-left">
                
                {/* Order Overview Header Card */}
                <div className="p-5 rounded-2xl bg-white border border-[#C59B51]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-sm text-[#58111A] font-cinzel">
                        Order #{searchResult.orderId}
                      </span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                        {searchResult.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#7C2335]">
                      {searchResult.customerName} · {searchResult.city}
                    </p>
                    <p className="text-xs font-semibold text-[#58111A] mt-1 font-cormorant">
                      {searchResult.sareeName}
                    </p>
                  </div>

                  <div className="text-left sm:text-right text-xs">
                    <span className="text-[10px] text-[#7C2335] uppercase tracking-wider block">Courier Logistics</span>
                    <span className="font-bold text-[#58111A] flex items-center gap-1 sm:justify-end mt-0.5">
                      <Truck className="w-3.5 h-3.5 text-[#C59B51]" />
                      {searchResult.courier}
                    </span>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#C59B51]/30">
                  {searchResult.steps.map((step, idx) => (
                    <div key={idx} className="relative flex items-start gap-4">
                      <div className={`absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
                        step.done ? 'bg-[#58111A] text-[#FAF7F2]' : 'bg-[#EFE8DA] text-[#7C2335]'
                      }`}>
                        {step.done ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#E4C58B]" />
                        ) : (
                          <Clock className="w-3 h-3 text-[#7C2335]" />
                        )}
                      </div>
                      <div>
                        <h5 className={`text-xs sm:text-sm font-bold ${
                          step.done ? 'text-[#58111A]' : 'text-[#7C2335]/70'
                        }`}>
                          {step.label}
                        </h5>
                        <p className="text-[10px] text-[#7C2335]/80 mt-0.5">
                          {step.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm font-bold text-[#58111A]">No order found matching "{query}"</p>
                <p className="text-xs text-[#7C2335] mt-1">Please double-check your Order ID or phone number.</p>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}

