/**
 * SIAARA ATELIER - Master E-Commerce & Persistence Data Architecture
 * Synchronized across Customer Storefront and Executive Admin Panel
 */

const STORAGE_KEYS = {
  PRODUCTS: 'siaara_products',
  ORDERS: 'siaara_orders',
  BOOKINGS: 'siaara_bookings',
  CART: 'siaara_cart',
  WISHLIST: 'siaara_wishlist',
  USER: 'siaara_current_user'
};

// Luxury Curated Saree Catalog across Heritage Indian Weaves
const DEFAULT_PRODUCTS = [
  // 1. TISSUE SILK
  {
    id: 'saree-01',
    name: 'Aura Champagne Metallic Tissue Silk',
    collection: 'tissue-silk',
    collectionName: 'Tissue Silk',
    weaveType: 'Pit Loom Metallic Warp & Weft',
    price: 15800,
    originalPrice: 19500,
    color: 'Champagne Gold',
    colorHex: '#D4AF37',
    tag: 'Campaign Star',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 48,
    fabric: 'Pure Mulberry Silk with Tested Metallic Zari Weft',
    zariType: 'Antique Gold Micron Electroplated Zari',
    blousePiece: 'Unstitched running tissue blouse with scalloped border (0.9m)',
    length: '6.4 Meters',
    description: 'A sublime dialogue between spun gold filaments and fine silk threads. The Aura Tissue Silk captures ambient light with every step, exhibiting a radiant champagne glaze tailored for high-fashion wedding soirees.',
    variants: ['Champagne Gold', 'Rose Gold', 'Liquid Silver'],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'saree-02',
    name: 'Rose Quartz Glaze Metallic Tissue',
    collection: 'tissue-silk',
    collectionName: 'Tissue Silk',
    weaveType: 'Handwoven Scalloped Edge Tissue',
    price: 16900,
    originalPrice: 21000,
    color: 'Rose Gold & Blush',
    colorHex: '#B76E79',
    tag: 'Bridal Edit',
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 26,
    fabric: 'Fine Metallic Tissue Silk with Resham Floral Edge',
    zariType: 'Dual-tone Rose & Champagne Tested Zari',
    blousePiece: 'Embroidered tone-on-tone tissue blouse piece (0.85m)',
    length: '6.3 Meters',
    description: 'Refined opulence cast in a delicate rose-gold reflection. Featuring an ethereal metallic luster and hand-trimmed scalloped border designed for receptions and sangeet celebrations.',
    variants: ['Rose Gold & Blush', 'Sunset Peach'],
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
    ]
  },

  // 2. BANARASI SILK
  {
    id: 'saree-03',
    name: 'Imperial Kadwa Jangla Banarasi Silk',
    collection: 'banarasi-silk',
    collectionName: 'Banarasi Silk',
    weaveType: 'Varanasi Master Kadwa Brocade',
    price: 26500,
    originalPrice: 32000,
    color: 'Sandstone Gold & Beige',
    colorHex: '#C5A880',
    tag: 'Heirloom Masterpiece',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 64,
    fabric: 'Pure Katan Handloom Silk from Varanasi',
    zariType: 'Hand-woven Kadwa Sona-Rupa Brocade',
    blousePiece: 'Elaborate heavy brocade blouse piece included (1.0m)',
    length: '6.5 Meters with Shikargah grand pallu',
    description: 'Woven over 45 painstaking days on a traditional pit loom by generational Varanasi master weavers. The Kadwa technique leaves zero floats on the reverse side, accentuating delicate Mughal floral vines over warm sandstone katan silk.',
    variants: ['Sandstone Gold', 'Deep Ochre', 'Ivory Cream'],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'saree-04',
    name: 'Vermilion Royal Rangkat Banarasi Katan',
    collection: 'banarasi-silk',
    collectionName: 'Banarasi Silk',
    weaveType: 'Tilfi Multi-Color Handloom Katan',
    price: 28900,
    originalPrice: 35000,
    color: 'Vermilion & Crimson',
    colorHex: '#8C2626',
    tag: 'Royal Bridal',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 52,
    fabric: 'Hand-dyed Pure Katan Silk with Tilfi Weaves',
    zariType: '24K Micron Gold Electroplated Zari',
    blousePiece: 'Heavy brocade blouse piece with matching back motif',
    length: '6.5 Meters with bridal pallu',
    description: 'The crowning jewel of traditional Indian couture. An intense vermilion red canvas intricately hand-embellished with micro floral jaal and a dense temple border honoring centuries of sacred bridal craftsmanship.',
    variants: ['Vermilion Red', 'Deep Maroon', 'Ruby Crimson'],
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85'
    ]
  },

  // 3. MALAI SILK
  {
    id: 'saree-05',
    name: 'Royal Mocha Glaze Malai Silk',
    collection: 'malai-silk',
    collectionName: 'Malai Silk',
    weaveType: 'Ultra-Fine Butter Silk Weave',
    price: 11400,
    originalPrice: 14000,
    color: 'Mocha & Brown',
    colorHex: '#4A2F22',
    tag: 'Editorial Favorite',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 38,
    fabric: 'Featherlight Organic Malai Butter Silk',
    zariType: 'Subtle Matte Rose Gold Micro-Border',
    blousePiece: 'Contrast raw silk unstitched blouse piece (0.8m)',
    length: '6.3 Meters with fluid fall',
    description: 'Sensory luxury at its finest. Ultra-creamy and butter-soft to the touch, this drape contours effortlessly around the body, remaining completely crease-free and breathable from day rituals to evening celebrations.',
    variants: ['Mocha Brown', 'Caramel Beige', 'Espresso Dark'],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85'
    ]
  },
  {
    id: 'saree-06',
    name: 'Espresso Velvet Touch Malai Drape',
    collection: 'malai-silk',
    collectionName: 'Malai Silk',
    weaveType: 'High-Twist Micro Malai Silk',
    price: 12500,
    originalPrice: 15500,
    color: 'Espresso & Deep Brown',
    colorHex: '#281811',
    tag: 'New Season',
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 19,
    fabric: 'Organic Double-Woven Malai Silk',
    zariType: 'Antique Bronze Border Weave',
    blousePiece: 'Running blouse piece with subtle bronze piping',
    length: '6.3 Meters',
    description: 'Enigmatic, poised, and quietly commanding. Featuring a deep espresso coffee undertone with an exquisite velvety touch that cascades seamlessly like liquid satin.',
    variants: ['Espresso Deep', 'Chestnut Brown'],
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
    ]
  },

  // 4. KANJIVARAM SILK
  {
    id: 'saree-07',
    name: 'Kanakambaram Korvai Kanjivaram Silk',
    collection: 'kanjivaram-silk',
    collectionName: 'Kanjivaram Silk',
    weaveType: 'Authentic 3-Shuttle Korvai Interlock',
    price: 32000,
    originalPrice: 38500,
    color: 'Ochre Gold & Emerald',
    colorHex: '#B8860B',
    tag: 'Temple Heirloom',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 42,
    fabric: 'Heavyweight Mulberry Silk (3-ply)',
    zariType: 'Pure Silver Thread Electroplated in 24K Gold',
    blousePiece: 'Contrast emerald green blouse piece with temple border',
    length: '6.4 Meters with heavy Mayil (Peacock) pallu',
    description: 'Crafted in the sacred temple town of Kanchipuram using the authentic 3-shuttle Korvai interlock technique. Dense gold zari checks and mythological yali motifs render this drape an everlasting family treasure.',
    variants: ['Ochre Gold & Emerald', 'Copper & Royal Purple'],
    images: [
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85'
    ]
  },

  // 5. ORGANZA & FESTIVE
  {
    id: 'saree-08',
    name: 'Parijat Scalloped Sheer Organza Silk',
    collection: 'organza-silk',
    collectionName: 'Organza Silk',
    weaveType: 'Translucent Crisp Handloom Organza',
    price: 13800,
    originalPrice: 17000,
    color: 'Ivory Sandstone & Gold',
    colorHex: '#EADECF',
    tag: 'Runway Couture',
    isBestSeller: false,
    isFeatured: true,
    inStock: true,
    rating: 4.8,
    reviewsCount: 31,
    fabric: 'Pure Translucent Silk Organza with Zari Needlework',
    zariType: 'Fine Matte Champagne Cord Zari',
    blousePiece: 'Silk chanderi unstitched blouse piece (0.9m)',
    length: '6.2 Meters',
    description: 'A whisper-light composition of translucent silk organza crowned with hand-embroidered floral creepers and cutwork scalloped borders. Contemporary minimalist royalty at its peak.',
    variants: ['Ivory Sandstone', 'Powder Rose', 'Mint Whisper'],
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ]
  }
];

// Seed Real Verified Orders
const DEFAULT_ORDERS = [
  {
    orderId: 'SIA-94210',
    date: '2026-11-16T14:30:00Z',
    customerName: 'Ananya Deshmukh',
    customerPhone: '+91 98201 45890',
    customerEmail: 'ananya.deshmukh@gmail.com',
    shippingAddress: 'Villa 14, Whispering Palms, Jubilee Hills, Hyderabad - 500033',
    items: [
      {
        id: 'saree-01',
        name: 'Aura Champagne Metallic Tissue Silk',
        price: 15800,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 15800,
    shippingFee: 0,
    discount: 1580,
    total: 14220,
    paymentMethod: 'UPI (GPay)',
    paymentStatus: 'PAID',
    orderStatus: 'Delivered',
    trackingCourier: 'Bluedart Express',
    trackingNumber: 'BD-882910482',
    estimatedDelivery: 'Delivered on Nov 18, 2026'
  },
  {
    orderId: 'SIA-88342',
    date: '2026-11-17T10:15:00Z',
    customerName: 'Priyanka Reddy',
    customerPhone: '+91 99480 33211',
    customerEmail: 'priyanka.reddy@outlook.com',
    shippingAddress: 'Flat 402, Signature Towers, Indiranagar, Bengaluru - 560038',
    items: [
      {
        id: 'saree-03',
        name: 'Imperial Kadwa Jangla Banarasi Silk',
        price: 26500,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 26500,
    shippingFee: 0,
    discount: 0,
    total: 26500,
    paymentMethod: 'Credit Card (HDFC Infinia)',
    paymentStatus: 'PAID',
    orderStatus: 'Weaving & Finishing',
    trackingCourier: 'DHL Luxury Express',
    trackingNumber: 'DHL-IN-492019',
    estimatedDelivery: 'Est. Delivery by Nov 22, 2026'
  },
  {
    orderId: 'SIA-76129',
    date: '2026-11-18T09:40:00Z',
    customerName: 'Samyuktha Rao',
    customerPhone: '+91 91760 99824',
    customerEmail: 'samyuktha.rao@gmail.com',
    shippingAddress: '42, Poes Garden, Alwarpet, Chennai - 600018',
    items: [
      {
        id: 'saree-05',
        name: 'Royal Mocha Glaze Malai Silk',
        price: 11400,
        qty: 1,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=400&q=80'
      }
    ],
    subtotal: 11400,
    shippingFee: 0,
    discount: 1140,
    total: 10260,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'PENDING ON DELIVERY',
    orderStatus: 'Dispatched',
    trackingCourier: 'Bluedart Express',
    trackingNumber: 'BD-910482011',
    estimatedDelivery: 'Est. Delivery Tomorrow, Nov 19'
  }
];

// Seed Private Bridal Styling Bookings
const DEFAULT_BOOKINGS = [
  {
    id: 'BK-101',
    name: 'Meera Chidambaram',
    phone: '+91 98400 12345',
    email: 'meera.c@gmail.com',
    service: 'Bridal Trousseau Styling',
    preferredDate: '2026-11-20',
    preferredTime: '04:00 PM IST',
    collectionInterest: 'Banarasi Silk & Kanjivaram',
    status: 'Confirmed'
  },
  {
    id: 'BK-102',
    name: 'Kavita Singhal',
    phone: '+91 97110 54321',
    email: 'kavita.s@gmail.com',
    service: 'Custom Loom Weaving Consultation',
    preferredDate: '2026-11-21',
    preferredTime: '11:30 AM IST',
    collectionInterest: 'Custom Metallic Tissue Silk',
    status: 'Pending'
  }
];

// Unified Data & Sync Interface
const StoreDB = {
  getProducts() {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      return DEFAULT_PRODUCTS;
    }
    try {
      const parsed = JSON.parse(raw);
      // If old catalog length is less than current default, merge or update
      if (parsed.length < DEFAULT_PRODUCTS.length) {
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        return DEFAULT_PRODUCTS;
      }
      return parsed;
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  },

  getProductById(id) {
    return this.getProducts().find(p => p.id === id) || null;
  },

  saveProducts(products) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    window.dispatchEvent(new CustomEvent('siaara_products_updated', { detail: products }));
  },

  addProduct(productData) {
    const products = this.getProducts();
    const newProduct = {
      id: 'saree-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      inStock: true,
      isFeatured: true,
      variants: [productData.color || 'Standard'],
      ...productData
    };
    products.unshift(newProduct);
    this.saveProducts(products);
    return newProduct;
  },

  updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const idx = products.findIndex(p => p.id === id);
    if (idx !== -1) {
      products[idx] = { ...products[idx], ...updatedFields };
      this.saveProducts(products);
      return products[idx];
    }
    return null;
  },

  deleteProduct(id) {
    const products = this.getProducts().filter(p => p.id !== id);
    this.saveProducts(products);
    return true;
  },

  // Orders
  getOrders() {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(DEFAULT_ORDERS));
      return DEFAULT_ORDERS;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return DEFAULT_ORDERS;
    }
  },

  saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    window.dispatchEvent(new CustomEvent('siaara_orders_updated', { detail: orders }));
  },

  addOrder(orderData) {
    const orders = this.getOrders();
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const newOrder = {
      orderId: 'SIA-' + randomSuffix,
      date: new Date().toISOString(),
      orderStatus: 'Order Confirmed',
      trackingCourier: 'Bluedart Luxury Express',
      trackingNumber: 'BD-' + Math.floor(100000000 + Math.random() * 900000000),
      estimatedDelivery: 'Est. Delivery in 3-4 Business Days',
      ...orderData
    };
    orders.unshift(newOrder);
    this.saveOrders(orders);
    return newOrder;
  },

  updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      order.orderStatus = newStatus;
      if (newStatus === 'Delivered') {
        order.estimatedDelivery = 'Delivered Successfully';
      }
      this.saveOrders(orders);
      return order;
    }
    return null;
  },

  findOrderByQuery(query) {
    if (!query) return null;
    const cleanQuery = query.trim().toUpperCase();
    const orders = this.getOrders();
    return orders.find(o => 
      o.orderId.toUpperCase() === cleanQuery || 
      o.customerPhone.replace(/\D/g, '').includes(cleanQuery.replace(/\D/g, '')) ||
      o.trackingNumber.toUpperCase() === cleanQuery
    ) || null;
  },

  // Bookings / Consultations
  getBookings() {
    const raw = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(DEFAULT_BOOKINGS));
      return DEFAULT_BOOKINGS;
    }
    try {
      return JSON.parse(raw);
    } catch (e) {
      return DEFAULT_BOOKINGS;
    }
  },

  saveBookings(bookings) {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    window.dispatchEvent(new CustomEvent('siaara_bookings_updated', { detail: bookings }));
  },

  addBooking(bookingData) {
    const bookings = this.getBookings();
    const newBooking = {
      id: 'BK-' + Math.floor(100 + Math.random() * 900),
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      ...bookingData
    };
    bookings.unshift(newBooking);
    this.saveBookings(bookings);
    return newBooking;
  },

  // Cart Management
  getCart() {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('siaara_cart_updated', { detail: cart }));
  },

  addToCart(productId, qty = 1, selectedVariant = null) {
    const cart = this.getCart();
    const product = this.getProductById(productId);
    if (!product) return;

    const variantName = selectedVariant || (product.variants ? product.variants[0] : product.color);
    const cartItemId = `${productId}-${variantName.replace(/\s+/g, '')}`;

    const existing = cart.find(item => item.cartItemId === cartItemId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        cartItemId: cartItemId,
        id: product.id,
        name: product.name,
        price: product.price,
        collectionName: product.collectionName,
        variant: variantName,
        image: product.images[0],
        qty: qty
      });
    }
    this.saveCart(cart);
  },

  removeFromCart(cartItemId) {
    const cart = this.getCart().filter(item => item.cartItemId !== cartItemId && item.id !== cartItemId);
    this.saveCart(cart);
  },

  updateCartQty(cartItemId, qty) {
    let cart = this.getCart();
    if (qty <= 0) {
      this.removeFromCart(cartItemId);
      return;
    }
    const item = cart.find(i => i.cartItemId === cartItemId || i.id === cartItemId);
    if (item) {
      item.qty = qty;
      this.saveCart(cart);
    }
  },

  clearCart() {
    this.saveCart([]);
  },

  getCartTotals() {
    const cart = this.getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = subtotal >= 10000 || subtotal === 0 ? 0 : 450;
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    return { subtotal, shipping, count };
  },

  // Wishlist
  getWishlist() {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  },

  saveWishlist(wishlist) {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent('siaara_wishlist_updated', { detail: wishlist }));
  },

  toggleWishlist(productId) {
    let wishlist = this.getWishlist();
    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter(id => id !== productId);
    } else {
      wishlist.push(productId);
    }
    this.saveWishlist(wishlist);
    return wishlist.includes(productId);
  },

  isInWishlist(productId) {
    return this.getWishlist().includes(productId);
  },

  // User Authentication
  getCurrentUser() {
    const raw = localStorage.getItem(STORAGE_KEYS.USER);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  saveCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    window.dispatchEvent(new CustomEvent('siaara_user_updated', { detail: user }));
  },

  logoutUser() {
    localStorage.removeItem(STORAGE_KEYS.USER);
    window.dispatchEvent(new CustomEvent('siaara_user_updated', { detail: null }));
  }
};

// Indian Rupee Currency Formatter
const Currency = {
  format(val) {
    return '₹' + Number(val || 0).toLocaleString('en-IN');
  }
};

window.StoreDB = StoreDB;
window.Currency = Currency;
