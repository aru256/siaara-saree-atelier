import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { SAREES_DATA, CURRENCY_CONFIG, SAMPLE_ORDERS } from '../data/sarees';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Navigation & Page View ('home' | 'product' | 'about' | 'contact' | 'orders')
  const [currentView, setCurrentView] = useState('home');
  const [activeProductId, setActiveProductId] = useState(null);
  const [pageTransition, setPageTransition] = useState('entered'); // 'entered' | 'exiting'

  // Preserved Catalog Scroll Position for seamless return
  const savedCatalogScrollY = useRef(0);

  // Products
  const [products] = useState(SAREES_DATA);
  const [selectedCollection, setSelectedCollection] = useState('all');

  // Currency
  const [currency, setCurrency] = useState('INR');

  // Modals & Drawers state
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Orders state persisted to localStorage (initializes with luxury sample orders)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('siaara_orders');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load orders', e);
    }
    return [
      {
        orderId: 'KLA-88342',
        date: '16 Nov 2026',
        customer: {
          name: 'Ananya Sharma',
          phone: '+91 98490 12345',
          email: 'ananya.sharma@example.com',
          address: 'Banjara Hills, Road 12, Hyderabad, 500034'
        },
        items: [
          {
            product: SAREES_DATA[2] || SAREES_DATA[0],
            variant: 'Royal Crimson & Antique Gold',
            quantity: 1,
            price: 24500
          }
        ],
        total: 24500,
        paymentMethod: 'Cash on Delivery (Verified)',
        status: 'In Transit · Express Air',
        statusType: 'in-transit',
        courier: 'BlueDart Express Air',
        awb: 'BLR-9982410',
        expectedDelivery: 'Tomorrow, 21 Nov by 8:00 PM',
        steps: [
          { label: 'Order Confirmed & Payment Verified', date: '16 Nov, 10:30 AM', done: true, desc: 'Pit-loom reservation confirmed at Kashi atelier.' },
          { label: 'Mulberry Silk & 24K Zari Authenticated', date: '17 Nov, 02:15 PM', done: true, desc: 'Govt. Silk Mark certification barcode assigned.' },
          { label: 'Master Weaver Press & Luxury Packaging', date: '18 Nov, 11:00 AM', done: true, desc: 'Folded in muslin cloth and packed in royal maroon box.' },
          { label: 'Dispatched via BlueDart Express Air', date: '19 Nov, 08:30 AM', done: true, desc: 'Departed Varanasi Cargo Hub (AWB: BLR-9982410).' },
          { label: 'Out for Doorstep Delivery', date: 'Expected Tomorrow', done: false, desc: 'Courier representative will call prior to delivery.' },
          { label: 'Delivered to Customer', date: 'Expected 21 Nov', done: false, desc: 'Silk Mark tamper-evident seal verified on receipt.' }
        ]
      },
      {
        orderId: 'KLA-76129',
        date: '14 Nov 2026',
        customer: {
          name: 'Meera Nambiar',
          phone: '+91 99480 33211',
          email: 'meera.nambiar@example.com',
          address: 'Indiranagar 100ft Road, Bengaluru, 560038'
        },
        items: [
          {
            product: SAREES_DATA[3] || SAREES_DATA[1],
            variant: 'Sunset Vermilion & Peacock Teal',
            quantity: 1,
            price: 22800
          }
        ],
        total: 22800,
        paymentMethod: 'UPI / NetBanking (Prepaid)',
        status: 'Crafting on Pit-Loom',
        statusType: 'on-loom',
        courier: 'Kanchipuram Artisan Guild (Loom 07)',
        awb: 'KPM-LOOM-07',
        expectedDelivery: '26 Nov by 7:00 PM',
        steps: [
          { label: 'Bespoke Order Confirmed', date: '14 Nov, 04:00 PM', done: true, desc: 'Custom Korvai specifications logged with master weaver.' },
          { label: 'Pure Mulberry Silk Warping', date: '16 Nov, 09:30 AM', done: true, desc: 'Pure mulberry warp yarn stretched on handloom frame.' },
          { label: 'Korvai 3-Shuttle Weaving on Pit-Loom', date: 'Active on Loom 07', done: true, desc: 'Master artisan is actively weaving the pallu motifs.' },
          { label: 'Silk Mark Quality Audit & Zari Assay', date: 'Pending Weave Completion', done: false, desc: 'Quality audit scheduled for 22 Nov.' },
          { label: 'Air Express Doorstep Dispatch', date: 'Expected 24 Nov', done: false, desc: 'Dispatched with insured courier delivery.' }
        ]
      },
      {
        orderId: 'KLA-55190',
        date: '05 Nov 2026',
        customer: {
          name: 'Priya Deshmukh',
          phone: '+91 98201 44552',
          email: 'priya.deshmukh@example.com',
          address: 'Prabhadevi, Worli Sea Face, Mumbai, 400025'
        },
        items: [
          {
            product: SAREES_DATA[0],
            variant: 'Champagne Gold',
            quantity: 1,
            price: 18500
          }
        ],
        total: 18500,
        paymentMethod: 'Visa / Mastercard (Prepaid)',
        status: 'Delivered',
        statusType: 'delivered',
        courier: 'BlueDart Express Air (Signed by Resident)',
        awb: 'BOM-8874129',
        expectedDelivery: 'Delivered on 09 Nov 2026',
        steps: [
          { label: 'Order Confirmed', date: '05 Nov, 11:15 AM', done: true, desc: 'Order placed and payment captured.' },
          { label: 'Silk Mark Certified', date: '06 Nov, 03:00 PM', done: true, desc: 'Govt. Silk Mark verification completed.' },
          { label: 'Artisan Final Press & Packaging', date: '07 Nov, 10:00 AM', done: true, desc: 'Packed in bespoke silk box with certificate.' },
          { label: 'Dispatched via Air Express', date: '07 Nov, 06:45 PM', done: true, desc: 'In transit via Mumbai distribution hub.' },
          { label: 'Delivered at Doorstep', date: '09 Nov, 01:20 PM', done: true, desc: 'Successfully delivered and signed by Priya D.' }
        ]
      }
    ];
  });

  // Cart state persisted to localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('siaara_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: SAREES_DATA[0],
          variant: SAREES_DATA[0].variants[0],
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('siaara_wishlist');
      return saved ? JSON.parse(saved) : ['saree-01', 'saree-04'];
    } catch {
      return [];
    }
  });

  // User auth state persisted to localStorage
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('siaara_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem('siaara_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Could not save orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('siaara_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('siaara_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Could not save wishlist', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('siaara_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('siaara_user');
      }
    } catch (e) {
      console.warn('Could not save user', e);
    }
  }, [user]);

  // Handle URL hash changes (e.g. #about, #contact, #orders, #product-saree-01 or browser back button)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#product-')) {
        const pId = hash.replace('#product-', '');
        if (currentView === 'home') {
          savedCatalogScrollY.current = window.scrollY || window.pageYOffset || 0;
        }
        setActiveProductId(pId);
        setCurrentView('product');
        window.scrollTo(0, 0);
      } else if (hash === '#about') {
        if (currentView === 'home') {
          savedCatalogScrollY.current = window.scrollY || window.pageYOffset || 0;
        }
        setCurrentView('about');
        window.scrollTo(0, 0);
      } else if (hash === '#contact') {
        if (currentView === 'home') {
          savedCatalogScrollY.current = window.scrollY || window.pageYOffset || 0;
        }
        setCurrentView('contact');
        window.scrollTo(0, 0);
      } else if (hash === '#orders' || hash === '#track-order') {
        if (currentView === 'home') {
          savedCatalogScrollY.current = window.scrollY || window.pageYOffset || 0;
        }
        setCurrentView('orders');
        window.scrollTo(0, 0);
      } else {
        if (currentView !== 'home' && !hash.startsWith('#collection') && !hash.startsWith('#shop')) {
          const returnY = savedCatalogScrollY.current || 0;
          setCurrentView('home');
          setActiveProductId(null);
          window.scrollTo(0, returnY);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentView]);

  // Dedicated Page Navigation with Pure Silk Fade Transition
  const navigatePage = (targetView) => {
    if (targetView === currentView) return;

    // 1. If currently on home, save exact scroll position
    if (currentView === 'home') {
      savedCatalogScrollY.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    }

    // 2. Pure silk fade-out (zero jarring jump)
    setPageTransition('exiting');

    setTimeout(() => {
      setCurrentView(targetView);
      if (targetView !== 'product') {
        setActiveProductId(null);
      }

      // 3. Update hash according to target view
      if (targetView === 'home') {
        try {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch {
          window.location.hash = '';
        }
        const returnY = savedCatalogScrollY.current || 0;
        window.scrollTo(0, returnY);
      } else {
        const hashTarget = targetView === 'orders' ? '#orders' : `#${targetView}`;
        try {
          history.replaceState(null, '', hashTarget);
        } catch {
          window.location.hash = hashTarget;
        }
        window.scrollTo(0, 0);
      }

      // 4. Smoothly fade in target page
      requestAnimationFrame(() => {
        setPageTransition('entered');
      });
    }, 180);
  };

  const openProductPage = (productId) => {
    // 1. Save exact scroll position where customer tapped the saree in catalog
    if (currentView === 'home') {
      savedCatalogScrollY.current = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    }

    // 2. Pure silk fade-out (zero scrolling motion)
    setPageTransition('exiting');

    // 3. Switch view after fade-out, anchor immediately at top
    setTimeout(() => {
      setActiveProductId(productId);
      setCurrentView('product');
      try {
        history.replaceState(null, '', `#product-${productId}`);
      } catch (e) {
        window.location.hash = `#product-${productId}`;
      }
      window.scrollTo(0, 0);

      // 4. Smoothly fade in product page
      requestAnimationFrame(() => {
        setPageTransition('entered');
      });
    }, 180);
  };

  const goBackToCatalog = () => {
    navigatePage('home');
  };

  // Toast Helper
  const showToast = (message, type = 'gold') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Cart actions
  const addToCart = (productId, variantName = null, qty = 1) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;

    const variant = variantName || prod.variants[0] || 'Standard';

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === productId && item.variant === variant);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += qty;
        return next;
      }
      return [...prev, { product: prod, variant, quantity: qty }];
    });

    showToast(`Added ${prod.name} to shopping bag`, 'gold');
    setCartOpen(true);
  };

  const updateCartQty = (productId, variant, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.variant === variant) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId, variant) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.variant === variant)));
    showToast('Item removed from shopping bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Order Placement
  const addNewOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Order #${newOrder.orderId} placed successfully!`, 'gold');
  };

  // Wishlist actions
  const toggleWishlist = (productId) => {
    const prod = products.find(p => p.id === productId);
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`Removed from wishlist`, 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast(`Added ${prod ? prod.name : 'saree'} to wishlist`, 'gold');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Currency Formatter
  const formatPrice = (inrPrice) => {
    const conf = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.INR;
    const converted = Math.round(inrPrice * conf.rate);
    return `${conf.symbol}${converted.toLocaleString('en-IN')}`;
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartTotalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Authentication
  const login = (email, name) => {
    const newUser = {
      email,
      name: name || email.split('@')[0],
      phone: '+91 98490 12345',
      address: 'Banjara Hills, Road 12, Hyderabad'
    };
    setUser(newUser);
    setAuthOpen(false);
    showToast(`Welcome back, ${newUser.name}!`, 'gold');
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of account', 'info');
  };

  // Order Tracking helper
  const trackOrder = (query) => {
    const cleaned = query.trim().toUpperCase();
    const found = orders.find(o => 
      o.orderId.toUpperCase() === cleaned || 
      o.customer?.phone?.includes(query.trim())
    );
    return found || null;
  };

  return (
    <StoreContext.Provider value={{
      currentView,
      activeProductId,
      pageTransition,
      navigatePage,
      openProductPage,
      goBackToCatalog,
      products,
      selectedCollection,
      setSelectedCollection,
      currency,
      setCurrency,
      cart,
      addToCart,
      updateCartQty,
      removeFromCart,
      clearCart,
      cartSubtotal,
      cartTotalItems,
      cartOpen,
      setCartOpen,
      wishlist,
      toggleWishlist,
      isInWishlist,
      wishlistOpen,
      setWishlistOpen,
      orders,
      addNewOrder,
      user,
      login,
      logout,
      authOpen,
      setAuthOpen,
      authMode,
      setAuthMode,
      checkoutOpen,
      setCheckoutOpen,
      quickViewProduct,
      setQuickViewProduct,
      formatPrice,
      trackOrder,
      toast,
      showToast
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
