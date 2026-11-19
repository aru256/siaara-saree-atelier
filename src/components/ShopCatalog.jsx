import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { Layers, Search, PackageSearch } from 'lucide-react';

const COLLECTION_TABS = [
  { id: 'all', label: 'All Weaves' },
  { id: 'tissue-silk', label: 'Tissue Silk' },
  { id: 'banarasi-silk', label: 'Banarasi Silk' },
  { id: 'malai-silk', label: 'Malai Silk' },
  { id: 'kanjivaram-silk', label: 'Kanjivaram' },
  { id: 'organza-silk', label: 'Organza' }
];

export default function ShopCatalog() {
  const { products, selectedCollection, setSelectedCollection } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by collection and search query
  const filteredProducts = products.filter(product => {
    const matchesCollection = selectedCollection === 'all' || product.collection === selectedCollection;
    const matchesSearch = !searchQuery.trim() || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.collectionName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  return (
    <section id="shop" className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#C59B51]/20">
      
      {/* Header & Category Filter Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 pb-6 border-b border-[#C59B51]/20">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Layers className="w-3.5 h-3.5 text-[#C59B51]" />
            <span>Authentic Loom Catalog</span>
          </div>
          <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#58111A]">
            The Saree Atelier
          </h2>
          <p className="text-xs text-[#7C2335] mt-1 font-normal">
            Showing <span className="font-bold text-[#58111A]">{filteredProducts.length}</span> handcrafted drapes
          </p>
        </div>

        {/* Search Bar + Filter Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Instant Search Bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C2335]/70" />
            <input 
              type="text" 
              placeholder="Search by color or weave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-full border border-[#C59B51]/40 bg-white text-xs text-[#58111A] placeholder-[#7C2335]/50 focus:outline-none focus:border-[#58111A] w-full sm:w-56 transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {COLLECTION_TABS.map(tab => {
              const isActive = selectedCollection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCollection(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#58111A] text-[#F8F5EE] border border-[#58111A] shadow-md' 
                      : 'bg-[#EFE8DA]/85 hover:bg-[#C59B51] hover:text-[#2B070D] text-[#58111A] border border-[#C59B51]/30'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* 2-Column Mobile, 4-Column Desktop Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center">
          <div className="w-14 h-14 rounded-full bg-[#EFE8DA]/80 text-[#7C2335] flex items-center justify-center mx-auto mb-3">
            <PackageSearch className="w-6 h-6" />
          </div>
          <h4 className="font-cormorant text-2xl font-bold text-[#58111A]">No Sarees Match Your Search</h4>
          <p className="text-xs text-[#7C2335] mt-1 font-normal">Try resetting the collection filter or clearing your search query.</p>
          <button 
            onClick={() => { setSelectedCollection('all'); setSearchQuery(''); }}
            className="btn-luxury-outline !py-2 !px-5 !text-xs mt-4"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </section>
  );
}

