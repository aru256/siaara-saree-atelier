# SIAARA ATELIER | Indian Haute Couture 3D Saree E-Commerce

A luxury Indian handloom fashion campaign and full-featured e-commerce platform featuring immersive **Three.js 3D fabric physics**, **GSAP ScrollTrigger cinematic pinned storytelling**, **Lenis smooth inertia scrolling**, and a comprehensive **Executive Admin Control Center**.

---

## 🌟 Key Highlights & Architectural Features

### 1. 3D WebGL Fabric Physics (Three.js)
- **Interactive Mulberry Silk Canvas**: Real-time undulating silk mesh with antique gold physical sheen (`MeshPhysicalMaterial`).
- **Dynamic Cursor Lighting**: Realistic point-light tracking that illuminates specular highlights across the gold threads as the user's cursor glides across the screen.
- **Micro-Ember Particles**: Lightweight floating gold-dust particles.
- **Smart Visibility Culling**: `IntersectionObserver` automatically pauses 3D rendering when the hero canvas is scrolled out of view, ensuring 0% GPU/CPU idle overhead throughout the rest of the site.

### 2. Cinematic Scroll Experience (GSAP + ScrollTrigger + Lenis)
- **Pinned Craftsmanship Storytelling**: Section pins on desktop while scrolling, scrubbing through a continuous 4-stage metier (Sericulture, 24K Tested Zari, Pit-Looms, Silk Mark Certification) with seamless image crossfades and live progress bars.
- **Image Curtain Reveals**: Silk-mask clip-path reveals (`inset(...)`) as imagery scrolls into view.
- **Ambient Lighting Transitions**: 3 persistent ambient gradient orbs that shift fluidly in the background on scroll, transitioning the mood between daytime ivory sections and midnight espresso couture salons.
- **Natural Parallax Depth**: Subtle multi-speed parallax on editorial visuals and staggered typography reveals.

### 3. Full-Featured E-Commerce & Customer Journey
- **Master Catalog**: Handcrafted Banarasi, Tissue Silk, Malai Silk, Kanjivaram, and Organza drapes with category filters and real-time search.
- **Cart & Wishlist Drawers**: Slide-out drawers with free shipping threshold progress, quantity controls, and instant summary calculations.
- **Real Checkout & Booking Modal**: Complete order placement with address capture, payment method selection (UPI, Card, COD), and instant order confirmation.
- **Live Order Tracking**: Customer portal to track handloom weaving and shipping stages using Order IDs (e.g. `SIA-88342`).
- **Bespoke Consultations**: Tabbed inquiry system for weave custom orders and WhatsApp video styling appointments.
- **Executive Admin Portal (`admin.html`)**: Real-time management of active orders, live product catalog publishing, and consultation tracking synchronized via `localStorage`.

---

## 🚀 Cloudflare Pages Deployment (Zero-Config)

This project is built with static web standards (HTML5, Tailwind CSS, Vanilla JS, Three.js, GSAP, Lucide), making it deployable on Cloudflare Pages with near-instant worldwide edge delivery:

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and go to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select your repository: `aru256/siaara-saree-atelier`.
3. Set the build settings:
   - **Framework preset**: `None`
   - **Build command**: `(leave empty)`
   - **Build output directory**: `.` (or root `/`)
4. Click **Save and Deploy**. Your website will be live globally with SSL and Cloudflare CDN caching!

---

## 💻 Local Development

Run a local HTTP server using Python:

```bash
# Python 3
python -m http.server 5173
```

Open your browser to:
- **Storefront**: `http://localhost:5173/`
- **Admin Center**: `http://localhost:5173/admin.html`

---

## 🎨 Design System & Palette

- **Base Colors**: Silk Beige (`#F8F5EE`), Ivory Cream (`#FAF7F2`), Sandstone (`#EFE8DA`)
- **Accents**: 24K Antique Zari Gold (`#C59B51`), Warm Champagne (`#E4C58B`), Terracotta (`#9B482E`)
- **Darks**: Royal Espresso (`#140B07`), Deep Mocha (`#24150E`)
- **Typography**: Cormorant Garamond, Cinzel Decorative, Italiana, Plus Jakarta Sans
