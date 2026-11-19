import React from 'react';
import { useStore } from '../context/StoreContext';
import ProductCard from './ProductCard';
import { Award, ArrowRight } from 'lucide-react';

export default function BestSellers() {
  const { products, setSelectedCollection } = useStore();
  const bestSellers = products.filter(p => p.isBestSeller);

  const scrollToShop = () => {
    setSelectedCollection('all');
    const elem = document.getElementById('shop');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-8 max-w-7xl mx-auto border-t border-[#C59B51]/20">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-xs font-semibold uppercase tracking-wider mb-2.5">
            <Award className="w-3.5 h-3.5 text-[#C59B51]" />
            <span>Curated Icons</span>
          </div>
          <h2 className="font-cormorant text-4xl sm:text-6xl font-normal text-[#58111A]">
            Atelier Best Sellers
          </h2>
        </div>

        <button 
          onClick={scrollToShop}
          className="btn-luxury-outline !text-[11px] !py-2 !px-5 self-start md:self-auto"
        >
          View Full Archive <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {bestSellers.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
}

