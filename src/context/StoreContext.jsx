import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAREES_DATA, CURRENCY_CONFIG, SAMPLE_ORDERS } from '../data/sarees';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
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

  // Order Tracking
  const trackOrder = (query) => {
    const cleaned = query.trim().toUpperCase();
    const found = SAMPLE_ORDERS.find(o => 
      o.orderId.toUpperCase() === cleaned || 
      o.phone.includes(query.trim())
    );
    return found || null;
  };

  return (
    <StoreContext.Provider value={{
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

