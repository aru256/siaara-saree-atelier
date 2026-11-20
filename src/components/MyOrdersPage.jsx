import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, ArrowLeft, Package, Truck, CheckCircle2, Clock, 
  Sparkles, FileText, RefreshCw, MessageSquare, 
  MapPin, ChevronRight, X, Printer, ShieldCheck, Download, 
  AlertCircle, Ban, RotateCcw, Copy, ExternalLink, Calendar
} from 'lucide-react';

export default function MyOrdersPage() {
  const { 
    orders, 
    updateOrder,
    navigatePage, 
    formatPrice, 
    addToCart, 
    showToast,
    openProductPage 
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [cancelModalOrder, setCancelModalOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('Ordered by mistake');
  const [returnModalOrder, setReturnModalOrder] = useState(null);
  const [returnType, setReturnType] = useState('refund'); // 'refund' | 'exchange'
  const [returnReason, setReturnReason] = useState('Color tone variation');
  const [copiedOrderId, setCopiedOrderId] = useState(null);

  // Active selected order if in detail view
  const activeDetailOrder = orders?.find(o => o.orderId === selectedOrderId);

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

  const handleConfirmCancel = () => {
    if (!cancelModalOrder) return;
    updateOrder(cancelModalOrder.orderId, {
      status: 'Cancelled',
      statusType: 'cancelled',
      cancellationReason: cancelReason,
      cancelledDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    setCancelModalOrder(null);
    showToast(`Order #${cancelModalOrder.orderId} cancelled. Full refund initiated.`, 'gold');
  };

  const handleConfirmReturn = () => {
    if (!returnModalOrder) return;
    updateOrder(returnModalOrder.orderId, {
      status: returnType === 'exchange' ? 'Exchange Requested · Reverse Pickup Scheduled' : 'Return Requested · Reverse Pickup Scheduled',
      statusType: 'return-requested',
      returnType,
      returnReason,
      returnRequestedDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    setReturnModalOrder(null);
    showToast(`Return request confirmed. BlueDart courier will pick up parcel tomorrow.`, 'gold');
  };

  // Helper to compute Flipkart 4-stage line progress
  const getLineProgressStage = (order) => {
    if (!order) return 1;
    if (order.statusType === 'cancelled') return 0; // cancelled
    if (order.statusType === 'delivered') return 4;
    if (order.statusType === 'out-for-delivery') return 3;
    if (order.statusType === 'in-transit') return 2;
    if (order.statusType === 'on-loom') return 1.5; // active pit-loom craft
    return 1; // Order Confirmed
  };

  // =========================================================================
  // VIEW A: DEDICATED FULL-LINE ORDER DETAILS PAGE (OPENED ON TAPPING ORDER)
  // =========================================================================
  if (activeDetailOrder) {
    const order = activeDetailOrder;
    const primaryItem = order.items?.[0] || {};
    const product = primaryItem.product || {};
    const sareeImage = product.images?.[0] || primaryItem.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80';
    const sareeName = product.name || primaryItem.name || order.sareeName || 'Authentic Silk Saree';
    const weaveType = product.weaveType || primaryItem.weaveType || 'Varanasi Master Handloom Weave';

    const currentStage = getLineProgressStage(order);
    const isCancelled = order.statusType === 'cancelled';
    const isDelivered = order.statusType === 'delivered';
    const isReturnRequested = order.statusType === 'return-requested';

    // Flipkart 4-Stage Full Line milestones
    const fullLineStages = [
      {
        id: 1,
        key: 'cnf',
        title: 'Order Confirmed',
        date: order.date || '16 Nov, 10:30 AM',
        desc: 'Pit-loom reservation confirmed at Kashi atelier',
        done: currentStage >= 1
      },
      {
        id: 2,
        key: 'transit',
        title: 'In Transit',
        date: currentStage >= 2 ? '19 Nov, 08:30 AM' : 'Expected in 1-2 Days',
        desc: 'Insured BlueDart Express Air cargo hub',
        done: currentStage >= 2
      },
      {
        id: 3,
        key: 'out',
        title: 'Out for Delivery',
        date: currentStage >= 3 ? 'Today by 11:00 AM' : order.expectedDelivery || 'Expected Tomorrow',
        desc: 'Courier agent assigned for doorstep handover',
        done: currentStage >= 3
      },
      {
        id: 4,
        key: 'del',
        title: 'Delivered',
        date: isDelivered ? (order.deliveredDate || '09 Nov, 01:20 PM') : 'Expected by 8:00 PM',
        desc: 'Silk Mark tamper-evident seal verified on receipt',
        done: currentStage >= 4
      }
    ];

    // Percentage for progress line fill (0%, 33.3%, 66.6%, 100%)
    const progressPercent = isCancelled 
      ? 15 
      : currentStage >= 4 ? 100 : currentStage >= 3 ? 67 : currentStage >= 2 ? 34 : currentStage >= 1.5 ? 20 : 0;

    return (
      <div className="min-h-screen bg-[#F8F5EE] text-[#58111A] pt-4 pb-24 text-left animate-in fade-in duration-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-8">
          
          {/* Breadcrumb Navigation & Back Button */}
          <div className="flex items-center justify-between py-3 border-b border-[#C59B51]/20 mb-6 text-xs text-[#7C2335]">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setSelectedOrderId(null)}
                className="flex items-center gap-1.5 text-[#58111A] font-bold hover:text-[#C59B51] transition-colors cursor-pointer bg-white px-3 py-1.5 rounded-full border border-[#C59B51]/30 shadow-xs"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to My Orders</span>
              </button>
              <span className="text-[#C59B51] font-bold">/</span>
              <span className="font-semibold text-[#58111A]">Order #{order.orderId}</span>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => handleCopyOrderId(order.orderId)}
                className="text-[11px] text-[#C59B51] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Copy className="w-3 h-3" />
                <span>{copiedOrderId === order.orderId ? 'Copied!' : 'Copy Order ID'}</span>
              </button>
            </div>
          </div>

          {/* Top Order Summary Banner */}
          <div className="bg-white rounded-3xl border border-[#C59B51]/30 p-6 sm:p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#C59B51]/20">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-[#58111A]">
                    Order #{order.orderId}
                  </h1>
                  
                  {isCancelled ? (
                    <span className="px-3 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold">
                      Order Cancelled
                    </span>
                  ) : isDelivered ? (
                    <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                    </span>
                  ) : isReturnRequested ? (
                    <span className="px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold flex items-center gap-1">
                      <RotateCcw className="w-3.5 h-3.5" /> Return In Progress
                    </span>
                  ) : (
                    <span className="px-3 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-300 text-xs font-bold flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> {order.status}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#7C2335]">
                  <span>Ordered on: <strong className="text-[#58111A]">{order.date}</strong></span>
                  <span>|</span>
                  <span>Total Amount: <strong className="text-[#58111A] font-cormorant text-base">{formatPrice(order.total || 0)}</strong></span>
                  <span>|</span>
                  <span>Payment: <strong className="text-[#58111A]">{order.paymentMethod || 'Prepaid'}</strong></span>
                </div>
              </div>

              {/* Top Quick Actions (Invoice & Help) */}
              <div className="flex flex-wrap items-center gap-2">
                <button 
                  onClick={() => setSelectedInvoiceOrder(order)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#58111A] hover:text-white border border-[#C59B51]/35 text-xs font-semibold text-[#58111A] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download Invoice</span>
                </button>

                <button 
                  onClick={() => setShowCertificateModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#58111A] hover:text-white border border-[#C59B51]/35 text-xs font-semibold text-[#58111A] flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C59B51]" />
                  <span>Silk Mark Certificate</span>
                </button>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* THE FLIPKART FULL-LINE STEPPER: ORDER CONFIRMED ─── IN TRANSIT ─── OUT FOR DELIVERY ─── DELIVERED */}
            {/* ========================================================================= */}
            <div className="pt-8 pb-4">
              <div className="mb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C2335] block">
                  Live Consignment Journey
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-[#58111A] mt-0.5">
                  {isCancelled 
                    ? 'Order Cancelled · Refund Initiated' 
                    : isDelivered 
                    ? 'Package Successfully Delivered to Resident' 
                    : `Tracking via ${order.courier || 'BlueDart Express Air'} (${order.awb || 'Air Cargo'})`}
                </h3>
              </div>

              {/* Full Horizontal Stepper Line */}
              <div className="relative my-10 px-2 sm:px-6">
                
                {/* Background Track Line */}
                <div className="absolute top-4 left-6 right-6 h-1 bg-[#FAF7F2] border-t border-b border-[#C59B51]/25 z-0" />

                {/* Active Colored Progress Line */}
                <div 
                  className={`absolute top-4 left-6 h-1 transition-all duration-700 ease-out z-0 ${
                    isCancelled ? 'bg-rose-500' : 'bg-[#58111A]'
                  }`}
                  style={{ width: `calc(${progressPercent}% * 0.88)` }}
                />

                {/* 4 Step Checkpoint Nodes */}
                <div className="relative z-10 flex items-start justify-between">
                  {fullLineStages.map((stg, i) => {
                    const isPassed = stg.done;
                    const isCurrent = !isCancelled && (
                      (stg.id === 1 && currentStage < 2) ||
                      (stg.id === 2 && currentStage >= 2 && currentStage < 3) ||
                      (stg.id === 3 && currentStage >= 3 && currentStage < 4) ||
                      (stg.id === 4 && currentStage >= 4)
                    );

                    return (
                      <div key={stg.id} className="flex flex-col items-center text-center max-w-[140px] sm:max-w-[180px]">
                        
                        {/* Node Circle */}
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-transform ${
                          isCancelled && stg.id > 1
                            ? 'bg-stone-200 text-stone-400 border border-stone-300'
                            : isPassed 
                            ? 'bg-[#58111A] text-[#E4C58B] border-2 border-[#E4C58B] shadow-md scale-105' 
                            : isCurrent
                            ? 'bg-[#E4C58B] text-[#2B070D] border-2 border-[#58111A] animate-pulse ring-4 ring-[#E4C58B]/30'
                            : 'bg-white text-stone-400 border-2 border-stone-200'
                        }`}>
                          {isPassed ? (
                            <CheckCircle2 className="w-5 h-5 text-[#E4C58B]" />
                          ) : (
                            <span>{stg.id}</span>
                          )}
                        </div>

                        {/* Title */}
                        <span className={`text-xs sm:text-sm font-bold mt-3 leading-snug ${
                          isPassed || isCurrent ? 'text-[#58111A]' : 'text-stone-400'
                        }`}>
                          {stg.title}
                        </span>

                        {/* Date / Timestamp */}
                        <span className={`text-[11px] font-semibold mt-0.5 ${
                          isPassed ? 'text-[#C59B51]' : 'text-stone-400'
                        }`}>
                          {stg.date}
                        </span>

                        {/* Micro-detail */}
                        <p className="text-[10px] text-[#7C2335]/70 mt-1 hidden sm:block leading-tight">
                          {stg.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cancellation Banner if Cancelled */}
              {isCancelled && (
                <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-xs text-rose-900">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Order Cancellation Confirmed</span>
                    <span>Reason: {order.cancellationReason || 'Requested by customer'}. Full refund of {formatPrice(order.total || 0)} is being processed to your original payment mode (2-3 business days).</span>
                  </div>
                </div>
              )}

              {/* Return Requested Banner */}
              {isReturnRequested && (
                <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-3 text-xs text-amber-900">
                  <RotateCcw className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Return & Exchange Request Logged</span>
                    <span>BlueDart reverse logistics courier representative will arrive at your address tomorrow between 10 AM - 4 PM. Please keep the saree safely folded in the royal muslin box with Silk Mark tag intact.</span>
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* DEDICATED FLIPKART ORDER MANAGEMENT ACTIONS (CANCEL, RETURN/EXCHANGE, REORDER) */}
            {/* ========================================================================= */}
            <div className="pt-6 border-t border-[#C59B51]/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Cancel Button (Available if active and not delivered) */}
                {!isCancelled && !isDelivered && (
                  <button 
                    onClick={() => setCancelModalOrder(order)}
                    className="px-5 py-2.5 rounded-xl border border-rose-400 text-rose-800 bg-rose-50/50 hover:bg-rose-100 transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Ban className="w-3.5 h-3.5 text-rose-700" />
                    <span>Cancel Order</span>
                  </button>
                )}

                {/* Return / Exchange Button (Available if delivered) */}
                {isDelivered && !isReturnRequested && (
                  <button 
                    onClick={() => setReturnModalOrder(order)}
                    className="px-5 py-2.5 rounded-xl border border-[#C59B51] text-[#58111A] bg-[#FAF7F2] hover:bg-[#58111A] hover:text-white transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Return / Exchange Saree</span>
                  </button>
                )}

                {/* Reorder Button */}
                <button 
                  onClick={() => handleReorder(primaryItem)}
                  className="px-5 py-2.5 rounded-xl bg-[#58111A] hover:bg-[#3B0910] text-white transition-colors text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-[#E4C58B]" />
                  <span>Buy Saree Again</span>
                </button>
              </div>

              {/* Concierge Chat Link */}
              <button 
                onClick={() => navigatePage('contact')}
                className="text-xs text-[#7C2335] hover:text-[#58111A] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-[#C59B51]" />
                <span>Need Styling or Delivery Help? Chat Concierge →</span>
              </button>
            </div>
          </div>

          {/* Bottom Grid: Item Details & Delivery Address */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Item Card (Cols 1-7) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#C59B51]/30 p-6 shadow-sm">
              <h3 className="font-cinzel text-xs font-bold text-[#58111A] uppercase tracking-wider mb-4 pb-2 border-b border-[#C59B51]/20">
                Handloom Item Specification
              </h3>

              <div className="flex gap-5 items-start">
                <div 
                  className="w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#C59B51]/30 shrink-0 cursor-pointer group"
                  onClick={() => product.id && openProductPage(product.id)}
                >
                  <img 
                    src={sareeImage} 
                    alt={sareeName} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#C59B51] uppercase tracking-wider block">
                    {weaveType}
                  </span>
                  <h4 
                    onClick={() => product.id && openProductPage(product.id)}
                    className="font-cormorant text-xl font-bold text-[#58111A] cursor-pointer hover:text-[#C59B51] transition-colors leading-snug"
                  >
                    {sareeName}
                  </h4>
                  <div className="text-xs text-[#7C2335] space-y-0.5">
                    <div>Variant / Shade: <strong className="text-[#58111A]">{primaryItem.variant || 'Standard Master Weave'}</strong></div>
                    <div>Quantity: <strong className="text-[#58111A]">{primaryItem.quantity || 1}</strong></div>
                    <div>Pure Silk Mark Serial: <strong className="text-[#58111A] font-cinzel">SM-CSB-88914</strong></div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-[#7C2335]">Unit Price:</span>
                    <span className="font-bold text-[#58111A] font-cormorant text-lg">
                      {formatPrice(primaryItem.price || order.total || 0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Calculation Breakup */}
              <div className="mt-6 pt-4 border-t border-[#C59B51]/20 space-y-2 text-xs">
                <div className="flex justify-between text-[#7C2335]">
                  <span>Item Base Value:</span>
                  <span>{formatPrice(Math.round((order.total || 0) / 1.05))}</span>
                </div>
                <div className="flex justify-between text-[#7C2335]">
                  <span>GST (5% Handloom Silk):</span>
                  <span>{formatPrice(Math.round((order.total || 0) - ((order.total || 0) / 1.05)))}</span>
                </div>
                <div className="flex justify-between text-[#7C2335]">
                  <span>Insured Express Air Shipping:</span>
                  <span className="text-emerald-800 font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between font-bold text-base text-[#58111A] pt-2 border-t border-[#C59B51]/20 font-cormorant">
                  <span>Grand Total Paid:</span>
                  <span>{formatPrice(order.total || 0)}</span>
                </div>
              </div>
            </div>

            {/* Delivery Details & Courier Card (Cols 8-12) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Shipping Address */}
              <div className="bg-white rounded-3xl border border-[#C59B51]/30 p-6 shadow-sm text-xs">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#C59B51]/20 font-cinzel font-bold text-[#58111A] uppercase tracking-wider">
                  <MapPin className="w-4 h-4 text-[#C59B51]" />
                  <span>Delivery Address</span>
                </div>

                <div className="space-y-1 text-[#7C2335]">
                  <span className="font-bold text-[#58111A] text-sm block">
                    {order.customer?.name}
                  </span>
                  <p className="leading-relaxed">
                    {order.customer?.address || 'Banjara Hills, Road 12, Hyderabad'}
                  </p>
                  <div>City: <strong className="text-[#58111A]">{order.customer?.city || 'Hyderabad, Telangana'}</strong></div>
                  <div>Phone: <strong className="text-[#58111A]">{order.customer?.phone || '+91 98490 12345'}</strong></div>
                </div>
              </div>

              {/* Carrier Logistics */}
              <div className="bg-white rounded-3xl border border-[#C59B51]/30 p-6 shadow-sm text-xs">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#C59B51]/20 font-cinzel font-bold text-[#58111A] uppercase tracking-wider">
                  <Truck className="w-4 h-4 text-[#C59B51]" />
                  <span>Consignment Logistics</span>
                </div>

                <div className="space-y-2 text-[#7C2335]">
                  <div className="flex justify-between">
                    <span>Carrier:</span>
                    <strong className="text-[#58111A]">{order.courier || 'BlueDart Express Air'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>AWB Tracking:</span>
                    <strong className="text-[#58111A] font-cinzel">{order.awb || 'BLR-9982410'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Insurance:</span>
                    <strong className="text-emerald-800">100% Transit Insured</strong>
                  </div>
                  <div className="pt-2 text-[11px] text-[#7C2335]">
                    Consignment packed in climate-controlled velvet box with tamper-evident seal.
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* MODAL 1: CANCEL ORDER MODAL */}
        {/* ========================================================================= */}
        {cancelModalOrder && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setCancelModalOrder(null)} />
            
            <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#C59B51]/40 shadow-2xl p-6 sm:p-7 z-10 text-left animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-[#C59B51]/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Ban className="w-5 h-5 text-rose-600" />
                  <h3 className="font-cinzel text-base font-bold text-[#58111A]">
                    Cancel Order #{cancelModalOrder.orderId}
                  </h3>
                </div>
                <button onClick={() => setCancelModalOrder(null)} className="p-1 hover:bg-[#FAF7F2] rounded-full text-stone-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#7C2335] mb-4">
                Are you sure you want to cancel this handloom saree order? Once cancelled, 100% of your payment will be refunded immediately.
              </p>

              <div className="space-y-3 mb-6">
                <label className="block text-xs font-bold text-[#58111A] uppercase tracking-wider">
                  Select Reason for Cancellation:
                </label>
                {[
                  'Ordered by mistake',
                  'Need to change shipping address',
                  'Want to change saree color or weave',
                  'Expected delivery date is too late',
                  'Found an alternative drape'
                ].map((reason) => (
                  <label key={reason} className="flex items-center gap-2.5 text-xs text-[#58111A] cursor-pointer">
                    <input 
                      type="radio" 
                      name="cancelReason" 
                      value={reason} 
                      checked={cancelReason === reason}
                      onChange={() => setCancelReason(reason)}
                      className="accent-[#58111A] cursor-pointer"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#C59B51]/20">
                <button 
                  onClick={() => setCancelModalOrder(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Don't Cancel
                </button>
                <button 
                  onClick={handleConfirmCancel}
                  className="px-5 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  Confirm Cancellation
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 2: RETURN & EXCHANGE MODAL */}
        {/* ========================================================================= */}
        {returnModalOrder && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setReturnModalOrder(null)} />
            
            <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#C59B51]/40 shadow-2xl p-6 sm:p-7 z-10 text-left animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-[#C59B51]/20 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-5 h-5 text-[#C59B51]" />
                  <h3 className="font-cinzel text-base font-bold text-[#58111A]">
                    7-Day Silk Mark Return / Exchange
                  </h3>
                </div>
                <button onClick={() => setReturnModalOrder(null)} className="p-1 hover:bg-[#FAF7F2] rounded-full text-stone-500">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex gap-3 mb-4">
                <button 
                  onClick={() => setReturnType('refund')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    returnType === 'refund' 
                      ? 'bg-[#58111A] text-white shadow-xs' 
                      : 'bg-[#FAF7F2] text-[#58111A] border border-[#C59B51]/30'
                  }`}
                >
                  100% Refund
                </button>
                <button 
                  onClick={() => setReturnType('exchange')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    returnType === 'exchange' 
                      ? 'bg-[#58111A] text-white shadow-xs' 
                      : 'bg-[#FAF7F2] text-[#58111A] border border-[#C59B51]/30'
                  }`}
                >
                  Exchange Saree
                </button>
              </div>

              <div className="space-y-3 mb-6">
                <label className="block text-xs font-bold text-[#58111A] uppercase tracking-wider">
                  Select Reason:
                </label>
                {[
                  'Color tone differs slightly from expectation',
                  'Prefer a heavier/lighter silk weave',
                  'Need different blouse piece scalloping',
                  'Fabric feel preference'
                ].map((reason) => (
                  <label key={reason} className="flex items-center gap-2.5 text-xs text-[#58111A] cursor-pointer">
                    <input 
                      type="radio" 
                      name="returnReason" 
                      value={reason} 
                      checked={returnReason === reason}
                      onChange={() => setReturnReason(reason)}
                      className="accent-[#58111A] cursor-pointer"
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#C59B51]/20">
                <button 
                  onClick={() => setReturnModalOrder(null)}
                  className="px-4 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleConfirmReturn}
                  className="btn-luxury-primary !py-2 !px-5 !text-xs cursor-pointer"
                >
                  Submit Return Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODAL 3: SILK MARK AUTHENTICITY CERTIFICATE MODAL */}
        {/* ========================================================================= */}
        {showCertificateModal && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/65 backdrop-blur-sm" onClick={() => setShowCertificateModal(false)} />
            
            <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-3xl border-2 border-[#C59B51] shadow-2xl p-7 z-10 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#58111A] text-[#E4C58B] mx-auto flex items-center justify-center mb-4 shadow-md">
                <ShieldCheck className="w-8 h-8 text-[#E4C58B]" />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C59B51] block mb-1">
                Central Silk Board of India · Ministry of Textiles
              </span>
              <h3 className="font-cormorant text-3xl font-bold text-[#58111A] mb-2">
                Certificate of Silk Mark Authenticity
              </h3>
              <p className="text-xs text-[#7C2335] max-w-md mx-auto leading-relaxed mb-6">
                This certifies that the saree associated with Order <strong className="text-[#58111A]">#{order.orderId}</strong> is handwoven from 100% natural Mulberry silk with certified tested 24K real gold zari.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-[#C59B51]/30 max-w-xs mx-auto text-xs text-left space-y-1.5 mb-6">
                <div>Certification ID: <strong className="font-cinzel text-[#58111A]">SM-CSB-88914-KLA</strong></div>
                <div>Loom Guild: <strong className="text-[#58111A]">Varanasi Pit-Loom Guild</strong></div>
                <div>Purity Guarantee: <strong className="text-emerald-800">100% Natural Silk</strong></div>
              </div>

              <button 
                onClick={() => setShowCertificateModal(false)}
                className="btn-luxury-primary !py-2.5 !px-8 !text-xs cursor-pointer"
              >
                Close Certificate
              </button>
            </div>
          </div>
        )}

        {/* Modal 4: Tax Invoice */}
        {selectedInvoiceOrder && (
          <TaxInvoiceModal 
            order={selectedInvoiceOrder} 
            formatPrice={formatPrice} 
            onClose={() => setSelectedInvoiceOrder(null)} 
          />
        )}

      </div>
    );
  }

  // =========================================================================
  // VIEW B: MAIN ORDERS LIST (TAPPING ANY CARD OPENS THE FULL-LINE DETAIL PAGE)
  // =========================================================================
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
              Tap any order to view the full Flipkart-style progress line (Order Confirmed → In Transit → Out for Delivery → Delivered), cancel or return.
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

        {/* Flipkart-Style Search & Filter Bar (Zero Overlap Guaranteed via style and input-with-icon) */}
        <div className="bg-white rounded-2xl border border-[#C59B51]/30 p-4 sm:p-5 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input with generous 52px padding - ZERO collision with icon */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#7C2335]/70 pointer-events-none z-10" />
              <input 
                type="text"
                placeholder="Search by Order ID (e.g. KLA-88342), saree name, or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: '3.25rem' }}
                className="w-full !pl-14 pr-10 py-3 rounded-xl border border-[#C59B51]/35 bg-[#FAF7F2] text-xs sm:text-sm text-[#58111A] placeholder-[#7C2335]/60 focus:outline-none focus:border-[#58111A] transition-all input-with-icon"
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

            {/* Orders Count */}
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
              { id: 'cancelled', label: 'Cancelled', count: (orders || []).filter(o => o.statusType === 'cancelled').length },
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
              const isCancelled = order.statusType === 'cancelled';

              return (
                <div 
                  key={order.orderId}
                  onClick={() => setSelectedOrderId(order.orderId)}
                  className="bg-white rounded-3xl border border-[#C59B51]/30 shadow-md hover:shadow-xl hover:border-[#C59B51] transition-all overflow-hidden text-left cursor-pointer group"
                >
                  {/* Top Bar: Order ID, Date, Amount, Status Badge */}
                  <div className="bg-[#FAF7F2] group-hover:bg-[#F3E5C8]/40 transition-colors px-6 py-4 border-b border-[#C59B51]/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#7C2335] uppercase font-semibold text-[10px] tracking-wider">Order ID:</span>
                        <span className="font-cinzel font-bold text-[#58111A] text-sm">{order.orderId}</span>
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
                      {isCancelled && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 font-bold text-[11px]">
                          <span>Cancelled</span>
                        </div>
                      )}
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
                        <div className="relative w-24 h-32 sm:w-28 sm:h-36 rounded-2xl overflow-hidden bg-[#FAF7F2] border border-[#C59B51]/30 shrink-0 shadow-inner">
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
                          <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#58111A] leading-snug group-hover:text-[#C59B51] transition-colors truncate">
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
                        </div>
                      </div>

                      {/* Right Status Banner & Tap-To-View Indicator (Cols 8-12) */}
                      <div className="lg:col-span-5 bg-[#FAF7F2] group-hover:bg-[#F8F5EE] p-4 sm:p-5 rounded-2xl border border-[#C59B51]/20 flex flex-col justify-between h-full space-y-3 transition-colors">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C2335] block">
                            Status Update
                          </span>
                          <span className="text-sm sm:text-base font-bold text-[#58111A] block mt-0.5">
                            {order.expectedDelivery || (isDelivered ? 'Delivered to resident' : isCancelled ? 'Order Cancelled' : 'In Transit via BlueDart')}
                          </span>
                          <p className="text-[11px] text-[#7C2335] mt-1 leading-relaxed">
                            {isCancelled
                              ? 'This order was cancelled. Refund has been initiated.'
                              : isDelivered 
                              ? 'Your certified handloom package has been handed over safely.'
                              : isOnLoom 
                              ? 'Artisan is weaving on the wooden pit-loom. Tested 24K zari assay in progress.'
                              : 'Your consignment is moving through BlueDart Express Air cargo hub.'}
                          </p>
                        </div>

                        {/* Interactive Tap CTA Pill */}
                        <div className="pt-2 flex items-center justify-between text-xs text-[#58111A] font-bold border-t border-[#C59B51]/20">
                          <span className="text-[#C59B51] group-hover:text-[#58111A] transition-colors flex items-center gap-1 font-semibold">
                            <span>Tap to view live progress line, cancel or return</span>
                          </span>
                          <ChevronRight className="w-4 h-4 text-[#C59B51] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Tax Invoice Modal */}
      {selectedInvoiceOrder && (
        <TaxInvoiceModal 
          order={selectedInvoiceOrder} 
          formatPrice={formatPrice} 
          onClose={() => setSelectedInvoiceOrder(null)} 
        />
      )}

    </div>
  );
}

// Subcomponent: Tax Invoice Modal
function TaxInvoiceModal({ order, formatPrice, onClose }) {
  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#C59B51]/40 shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto text-left animate-in zoom-in-95 duration-200">
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
            <button onClick={onClose} className="p-2 rounded-full hover:bg-[#FAF7F2] text-[#58111A] transition-colors cursor-pointer">
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
            <span className="font-semibold text-[#58111A]">{order.customer?.name}</span><br />
            <span>{order.customer?.address || 'India'}</span><br />
            <span>Contact: {order.customer?.phone}</span><br />
            <span>Invoice: INV-{order.orderId}</span>
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
              {(order.items || []).map((it, i) => (
                <tr key={i}>
                  <td className="py-3 px-4 font-medium">
                    {it.product?.name || it.name || order.sareeName}
                    <span className="block text-[10px] text-[#7C2335]">{it.variant || 'Pure Zari Weft'}</span>
                  </td>
                  <td className="py-3 px-3 text-center text-[#7C2335]">5007</td>
                  <td className="py-3 px-3 text-center">{it.quantity || 1}</td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {formatPrice(it.price || order.total)}
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
            <span>{formatPrice(Math.round((order.total || 0) / 1.05))}</span>
          </div>
          <div className="flex justify-between text-[#7C2335]">
            <span>IGST / CGST+SGST (5%):</span>
            <span>{formatPrice(Math.round((order.total || 0) - ((order.total || 0) / 1.05)))}</span>
          </div>
          <div className="flex justify-between text-[#7C2335]">
            <span>Doorstep Air Express:</span>
            <span className="text-emerald-800 font-bold">FREE</span>
          </div>
          <div className="flex justify-between text-base font-bold text-[#58111A] pt-2 border-t border-[#C59B51]/20 font-cormorant">
            <span>Grand Total:</span>
            <span>{formatPrice(order.total || 0)}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#C59B51]/20 flex items-center justify-between text-[11px] text-[#7C2335]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C59B51]" />
            <span>Silk Mark Scheme of Central Silk Board of India Authorized.</span>
          </div>
          <button onClick={onClose} className="btn-luxury-primary !py-2 !px-5 !text-xs cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
