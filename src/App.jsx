import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import TornPageIntro from './components/TornPageIntro';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandStory from './components/BrandStory';
import CollectionsRunway from './components/CollectionsRunway';
import ShopCatalog from './components/ShopCatalog';
import Craftsmanship from './components/Craftsmanship';
import BestSellers from './components/BestSellers';
import Testimonials from './components/Testimonials';
import ProductDetailPage from './components/ProductDetailPage';
import AboutUsPage from './components/AboutUsPage';
import ContactUsPage from './components/ContactUsPage';
import MyOrdersPage from './components/MyOrdersPage';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistDrawer from './components/WishlistDrawer';
import ProductModal from './components/ProductModal';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';

function AppContent() {
  const { currentView, pageTransition } = useStore();

  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#58111A] flex flex-col font-sans selection:bg-[#C59B51] selection:text-[#2B070D]">
      
      {/* Cinematic Torn-Page Silk Opening Intro (Only plays once per session) */}
      <TornPageIntro />

      {/* Global Luxury Navbar */}
      <Navbar />

      {/* Dynamic Content: Dedicated Pages (Product, About Us, Contact Us, My Orders) OR Home Catalog with Pure Silk Fade */}
      <main className={`flex-1 transition-opacity duration-200 ease-out ${
        pageTransition === 'exiting' 
          ? 'opacity-0 pointer-events-none' 
          : 'opacity-100 pointer-events-auto'
      }`}>
        {currentView === 'product' && <ProductDetailPage />}
        {currentView === 'about' && <AboutUsPage />}
        {currentView === 'contact' && <ContactUsPage />}
        {currentView === 'orders' && <MyOrdersPage />}
        {currentView === 'home' && (
          <>
            <Hero />
            <BrandStory />
            <CollectionsRunway />
            <ShopCatalog />
            <Craftsmanship />
            <BestSellers />
            <Testimonials />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Interactive Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductModal />
      <CheckoutModal />
      <AuthModal />
      <Toast />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
