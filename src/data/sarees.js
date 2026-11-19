/**
 * Authentic Saree Database & Constants for कल्रा KRUTI by Vyara
 */

export const SAREES_DATA = [
  // 1. TISSUE SILK
  {
    id: 'saree-01',
    name: 'Aura Metallic Tissue Silk Saree',
    collection: 'tissue-silk',
    collectionName: 'Tissue Silk',
    weaveType: 'Varanasi Metallic Warp Tissue',
    price: 18500,
    originalPrice: 23000,
    color: 'Champagne Gold',
    colorHex: '#D4AF37',
    tag: 'Haute Couture',
    isBestSeller: true,
    isFeatured: true,
    inStock: true,
    rating: 4.9,
    reviewsCount: 48,
    fabric: 'Pure Mulberry Silk with Metallic Zari Weft',
    zariType: 'Antique Gold Micron Electroplated Zari',
    blousePiece: 'Unstitched running tissue blouse with scalloped border (0.9m)',
    length: '6.4 Meters',
    description: 'A gorgeous blend of pure gold zari and fine silk threads. The Aura Tissue Silk captures the light beautifully with every step, giving a radiant champagne glow perfect for wedding receptions and festive celebrations.',
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
    description: 'Pure luxury in a delicate rose-gold tone. Features an elegant metallic shimmer with handcrafted scalloped borders, designed for cocktail parties and sangeet celebrations.',
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
    description: 'Handwoven over 45 days on a traditional pit-loom by master weavers in Varanasi. The authentic Kadwa technique ensures a neat finish with zero loose threads on the back, highlighting beautiful floral vines on rich katan silk.',
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
    description: 'A timeless bridal classic. A rich crimson red pure silk saree handwoven with delicate golden jaal work and a royal temple border, made for wedding days and sacred ceremonies.',
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
    description: 'Featherlight, butter-soft luxury that feels wonderful on the skin. Drapes gracefully without creasing, keeping you comfortable and stylish from morning pooja to evening receptions.',
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
    description: 'Soft and elegant in a rich deep coffee brown shade. The pure butter silk drapes smoothly like liquid satin with effortless, natural grace.',
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
    description: 'Handcrafted in Kanchipuram using the authentic 3-shuttle Korvai weaving method. Woven with heavy pure mulberry silk and tested gold zari checks, creating an heirloom saree for generations.',
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
    description: 'Featherlight translucent organza silk finished with delicate hand-cut floral scalloped borders and subtle sequin work. Perfect for modern bridesmaids and festive evening parties.',
    variants: ['Ivory Sandstone', 'Powder Rose', 'Mint Whisper'],
    images: [
      'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1200&q=85'
    ]
  }
];

export const HERO_SLIDES = [
  {
    id: 0,
    title: 'Look 01 · Shimmering Tissue Silk',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1920&q=88',
    collection: 'tissue-silk'
  },
  {
    id: 1,
    title: 'Look 02 · Royal Crimson Banarasi',
    image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1920&q=88',
    collection: 'banarasi-silk'
  },
  {
    id: 2,
    title: 'Look 03 · Featherlight Malai Silk',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1920&q=88',
    collection: 'malai-silk'
  },
  {
    id: 3,
    title: 'Look 04 · Pure Kanjivaram Bridal',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&w=1920&q=88',
    collection: 'kanjivaram-silk'
  },
  {
    id: 4,
    title: 'Look 05 · Handcrafted Festive Organza',
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=1920&q=88',
    collection: 'organza-silk'
  }
];

export const CRAFT_STAGES = [
  {
    num: "Stage 01 / 04",
    title: "Pure Mulberry Silk & Botanical Washes",
    desc: "We handpick pure mulberry silk threads harvested from organic cocoons, treated in gentle botanical washes for natural shine, long-lasting strength, and wonderful softness.",
    hallmark: "Stage 01 · 100% Pure Mulberry Silk",
    counter: "01 / 04",
    metric1: "100% Pure Silk",
    metric2: "Natural Washed",
    progress: "25%",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85"
  },
  {
    num: "Stage 02 / 04",
    title: "Tested 24K Gold & Pure Silver Zari",
    desc: "Woven with certified tested zari electroplated with genuine 24K gold micron finish that retains its luminous golden shine for generations without tarnishing.",
    hallmark: "Stage 02 · 24K Gold Tested Zari",
    counter: "02 / 04",
    metric1: "24K Real Gold",
    metric2: "Tarnish-Resistant",
    progress: "50%",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=85"
  },
  {
    num: "Stage 03 / 04",
    title: "Traditional Wooden Pit-Loom Weaving",
    desc: "Skilled generational master weavers hand-knot every booti and border on traditional wooden pit-looms with zero loose threads on the back for a smooth, premium drape.",
    hallmark: "Stage 03 · 120+ Hours Pit-Loom Craft",
    counter: "03 / 04",
    metric1: "120+ Hand Hours",
    metric2: "Zero-Float Finish",
    progress: "75%",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85"
  },
  {
    num: "Stage 04 / 04",
    title: "Silk Mark Certified & Quality Inspection",
    desc: "Every finished saree undergoes thorough quality checks for weave tension, zari purity, and border alignment, and is certified with the government Silk Mark guarantee.",
    hallmark: "Stage 04 · Certified Silk Mark Guarantee",
    counter: "04 / 04",
    metric1: "Quality Checked",
    metric2: "Govt. Silk Mark",
    progress: "100%",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1200&q=85"
  }
];

export const CURRENCY_CONFIG = {
  INR: { symbol: '₹', rate: 1.0, decimals: 0 },
  USD: { symbol: '$', rate: 0.012, decimals: 0 },
  EUR: { symbol: '€', rate: 0.011, decimals: 0 },
  GBP: { symbol: '£', rate: 0.0095, decimals: 0 },
  AED: { symbol: 'AED ', rate: 0.044, decimals: 0 },
  SGD: { symbol: 'S$', rate: 0.016, decimals: 0 },
  AUD: { symbol: 'A$', rate: 0.018, decimals: 0 },
  CAD: { symbol: 'C$', rate: 0.016, decimals: 0 }
};

export const SAMPLE_ORDERS = [
  {
    orderId: 'KLA-88342',
    phone: '9849012345',
    customerName: 'Ananya Sharma',
    city: 'Mumbai, Maharashtra',
    sareeName: 'Imperial Kadwa Jangla Banarasi Silk',
    status: 'In Transit',
    courier: 'BlueDart Express Air (AWB: BLR-9982410)',
    progress: 80,
    steps: [
      { label: 'Order Confirmed', date: '16 Nov, 10:30 AM', done: true },
      { label: 'Silk Purity Verified', date: '17 Nov, 02:15 PM', done: true },
      { label: 'Artisan Final Press & Silk Mark', date: '18 Nov, 11:00 AM', done: true },
      { label: 'Dispatched via Air Express', date: '19 Nov, 08:30 AM', done: true },
      { label: 'Out for Doorstep Delivery', date: 'Expected Tomorrow', done: false }
    ]
  },
  {
    orderId: 'KLA-76129',
    phone: '9948033211',
    customerName: 'Meera Nambiar',
    city: 'Bengaluru, Karnataka',
    sareeName: 'Kanakambaram Korvai Kanjivaram Silk',
    status: 'On Handloom Pit-Loom',
    courier: 'Crafting in Kanchipuram Guild',
    progress: 45,
    steps: [
      { label: 'Bespoke Order Confirmed', date: '14 Nov', done: true },
      { label: 'Mulberry Silk Warping', date: '16 Nov', done: true },
      { label: 'Korvai 3-Shuttle Weaving', date: 'Active on Loom 07', done: true },
      { label: 'Quality Audit & Silk Mark', date: 'Pending Weave', done: false },
      { label: 'Doorstep Courier Dispatch', date: 'Expected 24 Nov', done: false }
    ]
  }
];

