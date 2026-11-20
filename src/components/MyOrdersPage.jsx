import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, ArrowLeft, Package, Truck, CheckCircle2, Clock, 
  Sparkles, FileText, ExternalLink, RefreshCw, MessageSquare, 
  MapPin, ChevronRight, X, Printer, ShieldCheck, Download, AlertCircle
} from 'lucide-react';

export default function MyOrdersPage() {
  const { 
    orders, 
    navigatePage, 
    formatPrice, 
    addToCart, 
    showToast,
    openProductPage 
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [copiedOrderId, setCopiedOrderId] = useState(null);

  // Filter orders based on status tab and search query
  const filteredOrders = (orders || []).filter(order => {
    // 1. Status Filter Tab
    if (activeFilter === 'in-transit' && order.statusType !== 'in-transit') return false;
    if (activeFilter === 'on-loom' && order.statusType !== 'on-loom') return false;
    if (activeFilter === 'delivered' && order.statusType !== 'delivered') return false;
    if (activeFilter === 'cancelled' && order.statusType !== 'cancelled') return false;

    // 2. Search Query (Order ID, Saree Name, Phone, Customer Name)
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    const matchesId = order.orderId?.toLowerCase().includes(q);
    const matchesCustomer = order.customer?.name?.toLowerCase().includes(q);
    const matchesPhone = order.customer?.phone?.includes(q);
    const matchesItem = order.items?.some(it => 
      (it.product?.name || it.name || '').toLowerCase().includes(q) ||
      (it.variant || '').toLowerCase().includes(q)
    );

    return matchesId || matchesCustomer || matchesPhone || matchesItem;
  });

  const handleCopyOrderId = (id) => {
    navigator.clipboard?.writeText(id);
    setCopiedOrderId(id);
    showToast(`Order ID ${id} copied to clipboard`, 'gold');
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  const handleReorder = (item) => {
    if (item.product?.id) {
      addToCart(item.product.id, item.variant || null, 1);
    } else {
      showToast('Item added to shopping bag', 'gold');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#58111A] pt-4 pb-24 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">

        {/* Flipkart-Style Breadcrumb Navigation */}
        <div className="flex items-center gap-2 py-3 border-b border-[#C59B51]/20 mb-6 text-xs text-[#7C2335]">
          <button 
            onClick={() => navigatePage('home')}
            className="flex items-center gap-1 text-[#58111A] font-bold hover:text-[#C59B51] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </button>
          <span className="text-[#C59B51] font-bold">/</span>
          <span className="text-[#7C2335]">My Account</span>
          <span className="text-[#C59B51] font-bold">/</span>
          <span className="font-semibold text-[#58111A]">My Orders & Live Tracking</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#58111A] text-[#E4C58B] border border-[#C59B51]/30 text-[11px] font-semibold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B51]" />
              <span>Silk Mark India Authenticated Orders</span>
            </div>
            <h1 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#58111A]">
              My Orders & Consignment Tracking
            </h1>
            <p className="text-xs sm:text-sm text-[#7C2335] mt-1 max-w-2xl font-light">
              Track your handcrafted Banarasi, Kanjivaram, and Tissue silk sarees live from master wooden pit-looms to your doorstep.
            </p>
          </div>

          {/* Quick Support Badge */}
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#C59B51]/30 shadow-xs self-start md:self-auto">
            <div className="w-9 h-9 rounded-full bg-[#FAF7F2] border border-[#C59B51]/40 flex items-center justify-center text-[#58111A]">
              <MessageSquare className="w-4 h-4 text-[#C59B51]" />
            </div>
            <div className="text-xs">
              <span className="block font-bold text-[#58111A]">Need Concierge Help?</span>
              <button 
                onClick={() => navigatePage('contact')} 
                className="text-[11px] text-[#C59B51] font-semibold hover:underline cursor-pointer"
              >
                Chat with Master Draper →
              </button>
            </div>
          </div>
        </div>

        {/* Flipkart-Style Search & Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#C59B51]/30 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input with generous padding - NO collision with placeholder */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#7C2335]/70 pointer-events-none" />
              <input 
                type="text"
                placeholder="Search by Order ID (e.g. KLA-88342), saree name, or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 rounded-xl border border-[#C59B51]/35 bg-[#FAF7F2] text-xs sm:text-sm text-[#58111A] placeholder-[#7C2335]/60 focus:outline-none focus:border-[#58111A] transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7C2335]/60 hover:text-[#58111A] p-1 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Direct Order Track Button for quick query */}
            <div className="text-xs text-[#7C2335] shrink-0 font-medium hidden lg:block">
              <span>Showing <strong>{filteredOrders.length}</strong> orders</span>
            </div>
          </div>

          {/* Flipkart Status Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#C59B51]/15">
            {[
              { id: 'all', label: 'All Orders', count: (orders || []).length },
              { id: 'in-transit', label: 'In Transit', count: (orders || []).filter(o => o.statusType === 'in-transit').length },
              { id: 'on-loom', label: 'On Pit-Loom', count: (orders || []).filter(o => o.statusType === 'on-loom').length },
              { id: 'delivered', label: 'Delivered', count: (orders || []).filter(o => o.statusType === 'delivered').length },
              { id: 'cancelled', label: 'Cancelled', count: 0 },
            ].map(tab => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer flex items-center gap-1.5 ${
                    active 
                      ? 'bg-[#58111A] text-white shadow-xs' 
                      : 'bg-[#FAF7F2] text-[#58111A] hover:bg-[#EFE8DA] border border-[#C59B51]/20'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    active ? 'bg-white/20 text-white' : 'bg-[#58111A]/10 text-[#58111A]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Orders List Container */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#C59B51]/30 p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF7F2] border border-[#C59B51]/30 flex items-center justify-center mx-auto text-[#C59B51] mb-4">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="font-cormorant text-2xl font-bold text-[#58111A]">No Orders Found</h3>
            <p className="text-xs text-[#7C2335] mt-1 mb-6">
              {searchQuery 
                ? `No handloom orders match "${searchQuery}". Try searching by order ID like "KLA-88342" or phone "9849012345".`
                : "You do not have any orders matching this category."}
            </p>
            <div className="flex justify-center gap-3">
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#C59B51]/40 text-xs font-bold text-[#58111A] hover:bg-[#EFE8DA]"
                >
                  Clear Search
                </button>
              )}
              <button 
                onClick={() => navigatePage('home')}
                className="btn-luxury-primary !py-2.5 !px-6 !text-xs cursor-pointer"
              >
                Explore Saree Atelier
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const primaryItem = order.items?.[0] || {};
              const product = primaryItem.product || {};
              const sareeImage = product.images?.[0] || primaryItem.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
              const sareeName = product.name || primaryItem.name || order.sareeName || 'Authentic Silk Saree';
              const weaveType = product.weaveType || primaryItem.weaveType || 'Varanasi Master Handloom Weave';

              // Determine status styling
              const isDelivered = order.statusType === 'delivered';
              const isOnLoom = order.statusType === 'on-loom';
              const isInTransit = order.statusType === 'in-transit';

              return (
                <div 
                  key={order.orderId}
                  className="bg-white rounded-3xl border border-[#C59B51]/30 shadow-md hover:shadow-lg transition-shadow overflow-hidden text-left"
                >
                  {/* Top Bar: Order ID, Date, Amount, Status Badge */}
                  <div className="bg-[#FAF7F2] px-6 py-4 border-b border-[#C59B51]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#7C2335] uppercase font-semibold text-[10px] tracking-wider">Order ID:</span>
                        <span className="font-cinzel font-bold text-[#58111A] text-sm">{order.orderId}</span>
                        <button 
                          onClick={() => handleCopyOrderId(order.orderId)}
                          className="text-[10px] text-[#C59B51] hover:underline ml-1 cursor-pointer"
                          title="Copy Order ID"
                        >
                          {copiedOrderId === order.orderId ? 'Copied!' : 'Copy'}
                        </button>
                      </div>

                      <div className="hidden sm:block text-[#C59B51]">|</div>

                      <div>
                        <span className="text-[#7C2335]">Placed: </span>
                        <span className="font-semibold text-[#58111A]">{order.date}</span>
                      </div>

                      <div className="hidden sm:block text-[#C59B51]">|</div>

                      <div>
                        <span className="text-[#7C2335]">Total: </span>
                        <span className="font-bold text-[#58111A] font-cormorant text-base">
                          {formatPrice(order.total || 0)}
                        </span>
                      </div>
                    </div>

                    {/* Delivery Status Pill */}
                    <div className="flex items-center gap-2">
                      {isDelivered && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Delivered</span>
                        </div>
                      )}
                      {isInTransit && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-300 font-bold text-[11px] animate-pulse">
                          <Truck className="w-3.5 h-3.5 text-blue-700" />
                          <span>In Transit · Express Air</span>
                        </div>
                      )}
                      {isOnLoom && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                          <span>Crafting on Pit-Loom</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Main Flipkart Product Row */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      
                      {/* Product Thumbnail & Details (Cols 1-7) */}
                      <div className="lg:col-span-7 flex gap-4 sm:gap-6 items-start">
                        <div 
                          className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#C59B51]/30 shrink-0 shadow-inner group cursor-pointer"
                          onClick={() => product.id && openProductPage(product.id)}
                        >
                          <img 
                            src={sareeImage} 
                            alt={sareeName} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className="absolute bottom-1 right-1 text-[8px] px-1.5 py-0.5 rounded-full bg-[#2B070D]/80 text-[#E4C58B] font-bold">
                            Silk Mark
                          </span>
                        </div>

                        <div className="space-y-1.5 flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-[#C59B51] uppercase tracking-wider block">
                            {weaveType}
                          </span>
                          <h3 
                            className="font-cormorant text-xl sm:text-2xl font-bold text-[#58111A] leading-snug cursor-pointer hover:text-[#C59B51] transition-colors truncate"
                            onClick={() => product.id && openProductPage(product.id)}
                          >
                            {sareeName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7C2335]">
                            <span>Variant: <strong>{primaryItem.variant || 'Master Edition'}</strong></span>
                            <span>Qty: <strong>{primaryItem.quantity || 1}</strong></span>
                            <span>Payment: <strong>{order.paymentMethod || 'Prepaid'}</strong></span>
                          </div>

                          <div className="pt-2 text-xs">
                            <span className="text-[#7C2335]">Delivering to: </span>
                            <span className="font-semibold text-[#58111A]">
                              {order.customer?.name} ({order.customer?.city || order.customer?.address || 'India'})
                            </span>
                          </div>

                          {/* Carrier details */}
                          <div className="text-[11px] text-[#7C2335]/90 pt-1 flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-[#C59B51]" />
                            <span>Carrier: <strong>{order.courier || 'BlueDart Express Air'}</strong></span>
                            {order.awb && <span className="text-[#58111A] font-cinzel">({order.awb})</span>}
                          </div>
                        </div>
                      </div>

                      {/* Expected Delivery & Price Block (Cols 8-12) */}
                      <div className="lg:col-span-5 bg-[#FAF7F2] p-4 sm:p-5 rounded-2xl border border-[#C59B51]/20 flex flex-col justify-between h-full space-y-3">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C2335] block">
                            Delivery Status
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[#58111A] block mt-0.5">
                            {order.expectedDelivery || (isDelivered ? 'Delivered to resident' : 'Expected within 4-5 business days')}
                          </span>
                          <p className="text-[11px] text-[#7C2335] mt-1 leading-relaxed">
                            {isDelivered 
                              ? 'Your certified handloom package has been handed over safely.'
                              : isOnLoom 
                              ? 'Artisan is weaving on the wooden pit-loom. Tested 24K zari assay in progress.'
                              : 'Your consignment is moving through BlueDart Express Air cargo hub.'}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-[#C59B51]/20">
                          <button 
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="px-3.5 py-1.5 rounded-xl bg-white border border-[#C59B51]/40 text-[#58111A] hover:bg-[#58111A] hover:text-white transition-all text-xs font-semibold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Tax Invoice</span>
                          </button>

                          <button 
                            onClick={() => handleReorder(primaryItem)}
                            className="px-3.5 py-1.5 rounded-xl bg-[#58111A] text-white hover:bg-[#3B0910] transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Buy Again</span>
                          </button>

                          <button 
                            onClick={() => navigatePage('contact')}
                            className="px-3 py-1.5 rounded-xl hover:bg-[#EFE8DA] text-[#7C2335] hover:text-[#58111A] transition-colors text-xs font-medium cursor-pointer"
                          >
                            Need Help?
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Flipkart-Style Visual Stepper Progress Tracker */}
                    <div className="mt-8 pt-6 border-t border-[#C59B51]/20">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#58111A] flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-[#C59B51]" />
                          <span>Detailed Tracking Milestones</span>
                        </span>
                        <span className="text-[11px] text-[#7C2335]">
                          Live Status: <strong className="text-[#58111A]">{order.status}</strong>
                        </span>
                      </div>

                      {/* Step Progress Line */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 relative">
                        {(order.steps || []).map((step, idx) => {
                          return (
                            <div 
                              key={idx}
                              className={`p-3 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                                step.done 
                                  ? 'bg-[#FAF7F2] border-[#C59B51]/40 text-[#58111A]' 
                                  : 'bg-white/60 border-black/10 text-stone-400'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                  step.done 
                                    ? 'bg-[#58111A] text-[#E4C58B]' 
                                    : 'bg-stone-200 text-stone-500'
                                }`}>
                                  {step.done ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                                </div>
                                <span className={`text-[10px] font-semibold ${
                                  step.done ? 'text-[#C59B51]' : 'text-stone-400'
                                }`}>
                                  {step.date}
                                </span>
                              </div>

                              <span className={`text-xs font-bold leading-snug ${
                                step.done ? 'text-[#58111A]' : 'text-stone-500'
                              }`}>
                                {step.label}
                              </span>

                              {step.desc && (
                                <p className="text-[10px] text-[#7C2335]/80 mt-1 line-clamp-2 leading-tight">
                                  {step.desc}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ================= TAX INVOICE POPUP MODAL ================= */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/65 backdrop-blur-sm"
            onClick={() => setSelectedInvoiceOrder(null)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#C59B51]/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto text-left animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#C59B51]/20 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#58111A] text-[#E4C58B] flex items-center justify-center font-cinzel font-bold text-sm">
                  कला
                </div>
                <div>
                  <h3 className="font-cinzel text-base font-bold text-[#58111A] uppercase tracking-wider">
                    Official Tax Invoice
                  </h3>
                  <span className="text-[10px] text-[#7C2335]">Silk Mark Certified Indian Handloom</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => window.print()}
                  className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#58111A] transition-colors cursor-pointer"
                  title="Print Invoice"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#58111A] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Invoice Meta Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs text-[#7C2335] mb-6 p-4 rounded-2xl bg-[#FAF7F2] border border-[#C59B51]/20">
              <div>
                <span className="font-bold text-[#58111A] block mb-0.5">Sold By Atelier:</span>
                <span>कला KRUTI by Vyara Pvt. Ltd.</span><br />
                <span>Ghats of Varanasi & Mumbai Studio</span><br />
                <span>GSTIN: 09AABCK1234F1Z8</span><br />
                <span>HSN Code: 5007 (Pure Handloom Silk)</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#58111A] block mb-0.5">Billed & Shipped To:</span>
                <span className="font-semibold text-[#58111A]">{selectedInvoiceOrder.customer?.name}</span><br />
                <span>{selectedInvoiceOrder.customer?.address || 'India'}</span><br />
                <span>Contact: {selectedInvoiceOrder.customer?.phone}</span><br />
                <span>Invoice: INV-{selectedInvoiceOrder.orderId}</span>
              </div>
            </div>

            {/* Itemized Table */}
            <div className="border border-[#C59B51]/25 rounded-2xl overflow-hidden mb-6">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#FAF7F2] border-b border-[#C59B51]/25 text-[#58111A] uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4 font-bold">Item Description</th>
                    <th className="py-2.5 px-3 font-bold text-center">HSN</th>
                    <th className="py-2.5 px-3 font-bold text-center">Qty</th>
                    <th className="py-2.5 px-4 font-bold text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C59B51]/15 text-[#58111A]">
                  {(selectedInvoiceOrder.items || []).map((it, i) => (
                    <tr key={i}>
                      <td className="py-3 px-4 font-medium">
                        {it.product?.name || it.name || selectedInvoiceOrder.sareeName}
                        <span className="block text-[10px] text-[#7C2335]">{it.variant || 'Pure Zari Weft'}</span>
                      </td>
                      <td className="py-3 px-3 text-center text-[#7C2335]">5007</td>
                      <td className="py-3 px-3 text-center">{it.quantity || 1}</td>
                      <td className="py-3 px-4 text-right font-semibold">
                        {formatPrice(it.price || selectedInvoiceOrder.total)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Total Breakup */}
            <div className="space-y-1.5 text-xs text-right max-w-xs ml-auto mb-6">
              <div className="flex justify-between text-[#7C2335]">
                <span>Taxable Value:</span>
                <span>{formatPrice(Math.round((selectedInvoiceOrder.total || 0) / 1.05))}</span>
              </div>
              <div className="flex justify-between text-[#7C2335]">
                <span>IGST / CGST+SGST (5%):</span>
                <span>{formatPrice(Math.round((selectedInvoiceOrder.total || 0) - ((selectedInvoiceOrder.total || 0) / 1.05)))}</span>
              </div>
              <div className="flex justify-between text-[#7C2335]">
                <span>Doorstep Air Express:</span>
                <span className="text-emerald-800 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#58111A] pt-2 border-t border-[#C59B51]/20 font-cormorant">
                <span>Grand Total:</span>
                <span>{formatPrice(selectedInvoiceOrder.total || 0)}</span>
              </div>
            </div>

            {/* Silk Mark Seal Footer */}
            <div className="pt-4 border-t border-[#C59B51]/20 flex items-center justify-between text-[11px] text-[#7C2335]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C59B51]" />
                <span>Silk Mark Scheme of Central Silk Board of India Authorized.</span>
              </div>
              <button 
                onClick={() => setSelectedInvoiceOrder(null)}
                className="btn-luxury-primary !py-2 !px-5 !text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
