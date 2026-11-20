import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, CheckCircle2, ShieldCheck, Truck, CreditCard, Banknote, Smartphone } from 'lucide-react';

export default function CheckoutModal() {
  const { 
    checkoutOpen, 
    setCheckoutOpen, 
    cart, 
    cartSubtotal, 
    clearCart, 
    formatPrice, 
    showToast,
    navigatePage,
    addNewOrder 
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    pincode: ''
  });
  const [placedOrder, setPlacedOrder] = useState(null);

  if (!checkoutOpen) return null;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) return;

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `KLA-${randomNum}`;

    const newOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      customer: formData,
      items: [...cart],
      paymentMethod: paymentMethod === 'cod' ? 'Cash on Delivery (Verified)' : paymentMethod === 'upi' ? 'UPI Payment (Prepaid)' : 'Card / NetBanking',
      total: cartSubtotal,
      status: 'Order Confirmed · Preparing on Looms',
      statusType: 'in-transit',
      courier: 'BlueDart Express Air (Consignment Initiated)',
      awb: `BLR-${Math.floor(1000000 + Math.random() * 9000000)}`,
      expectedDelivery: 'Expected in 3-4 Business Days',
      steps: [
        { label: 'Order Confirmed', date: 'Today', done: true, desc: 'Your bespoke handloom reservation is locked.' },
        { label: 'Silk Mark Certified Audit', date: 'Tomorrow', done: false, desc: 'Authenticity barcode verification.' },
        { label: 'Pit-Loom Press & Packaging', date: 'In 2 Days', done: false, desc: 'Hand-folded in royal muslin box.' },
        { label: 'Dispatched via Air Express', date: 'In 3 Days', done: false, desc: 'Insured BlueDart consignment dispatch.' },
        { label: 'Delivered to Doorstep', date: 'Expected Soon', done: false, desc: 'Handover with Silk Mark seal intact.' }
      ]
    };

    if (addNewOrder) {
      addNewOrder(newOrder);
    }
    setPlacedOrder(newOrder);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={() => setCheckoutOpen(false)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#C59B51]/35 shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col text-left animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-[#C59B51]/25 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C59B51]" />
            <h3 className="font-cinzel text-base font-bold text-[#58111A] tracking-wider uppercase">
              Secure Checkout · कला KRUTI
            </h3>
          </div>
          <button 
            onClick={() => setCheckoutOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EFE8DA] text-[#58111A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {placedOrder ? (
            <div className="py-10 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C59B51] font-bold">
                  Order Successfully Placed
                </span>
                <h3 className="font-cormorant text-3xl font-bold text-[#58111A] mt-1">
                  Thank You, {placedOrder.customer.name}!
                </h3>
                <p className="text-xs text-[#7C2335] mt-1">
                  We have received your handloom order. A confirmation SMS & WhatsApp message has been dispatched to {placedOrder.customer.phone}.
                </p>
              </div>

              {/* Order Reference Box */}
              <div className="p-5 rounded-2xl bg-white border border-[#C59B51]/30 max-w-sm mx-auto shadow-sm text-left space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7C2335]">Order Reference:</span>
                  <span className="font-bold text-[#58111A] font-cinzel text-sm">{placedOrder.orderId}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7C2335]">Payment Mode:</span>
                  <span className="font-semibold text-[#58111A] uppercase text-[10px]">{placedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#7C2335]">Amount Payable:</span>
                  <span className="font-bold text-[#58111A] font-cormorant text-base">{formatPrice(placedOrder.total)}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-1 border-t border-[#C59B51]/15">
                  <span className="text-[#7C2335]">Delivery:</span>
                  <span className="text-emerald-800 font-semibold flex items-center gap-1">
                    <Truck className="w-3 h-3" /> Complimentary Air Express
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button 
                  onClick={() => {
                    setCheckoutOpen(false);
                    navigatePage('orders');
                  }}
                  className="btn-luxury-primary !py-2.5 !px-6 !text-xs cursor-pointer"
                >
                  Track This Order
                </button>
                <button 
                  onClick={() => setCheckoutOpen(false)}
                  className="btn-luxury-outline !py-2.5 !px-5 !text-xs"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-5">
              
              {/* Order Summary Strip */}
              <div className="p-4 rounded-2xl bg-white border border-[#C59B51]/20 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[#58111A] block">
                    {cart.length} Saree Drape{cart.length > 1 ? 's' : ''} in Bag
                  </span>
                  <span className="text-[10px] text-[#7C2335]">
                    Free Air Express Shipping across India
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#7C2335] uppercase block">Total Due</span>
                  <span className="font-cormorant text-xl font-bold text-[#58111A]">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
              </div>

              {/* Shipping Address Inputs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-[#58111A] uppercase tracking-wider">
                  1. Shipping & Contact Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase mb-1">
                      Full Name *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Radhika Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase mb-1">
                      Phone Number *
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +91 98490 12345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-[#58111A] uppercase mb-1">
                    Street Address *
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="House/Flat No, Building, Street, Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase mb-1">
                      City *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Mumbai / Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase mb-1">
                      Pincode *
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="400001"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[10px] font-bold text-[#58111A] uppercase mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#C59B51]/40 text-xs text-[#58111A] bg-white focus:outline-none focus:border-[#58111A]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-[#58111A] uppercase tracking-wider">
                  2. Payment Method
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* COD */}
                  <label className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'cod' ? 'border-[#58111A] bg-white shadow-md' : 'border-[#C59B51]/30 bg-white/60'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <Banknote className="w-5 h-5 text-[#58111A]" />
                      <input 
                        type="radio" 
                        name="pay" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')} 
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#58111A] block">Cash on Delivery</span>
                      <span className="text-[10px] text-[#7C2335]">Pay when delivered</span>
                    </div>
                  </label>

                  {/* UPI */}
                  <label className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'upi' ? 'border-[#58111A] bg-white shadow-md' : 'border-[#C59B51]/30 bg-white/60'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <Smartphone className="w-5 h-5 text-[#58111A]" />
                      <input 
                        type="radio" 
                        name="pay" 
                        checked={paymentMethod === 'upi'} 
                        onChange={() => setPaymentMethod('upi')} 
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#58111A] block">UPI / GPay / PhonePe</span>
                      <span className="text-[10px] text-[#7C2335]">Instant 0-fee payment</span>
                    </div>
                  </label>

                  {/* Cards */}
                  <label className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    paymentMethod === 'card' ? 'border-[#58111A] bg-white shadow-md' : 'border-[#C59B51]/30 bg-white/60'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <CreditCard className="w-5 h-5 text-[#58111A]" />
                      <input 
                        type="radio" 
                        name="pay" 
                        checked={paymentMethod === 'card'} 
                        onChange={() => setPaymentMethod('card')} 
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#58111A] block">Cards & NetBanking</span>
                      <span className="text-[10px] text-[#7C2335]">256-bit encrypted</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Place Order CTA */}
              <div className="pt-3">
                <button 
                  type="submit"
                  className="btn-luxury-primary w-full !py-3 !text-xs flex items-center justify-center gap-2 shadow-xl"
                >
                  <ShieldCheck className="w-4 h-4 text-[#E4C58B]" />
                  <span>Place Order ({formatPrice(cartSubtotal)})</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

