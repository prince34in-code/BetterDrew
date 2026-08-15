import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { siteData } from '@/data/site';
import { CartProvider } from "@/context/CartContext";

import ScrollToTop from '../ScrollToTop';
import Navbar from '@/components/common/Navbar';
import Hero from '@/sections/Hero';
import BrandTicker from '@/sections/BrandTicker';
import Benefits from '@/sections/Benefits';
import ProductShowcase from '@/sections/ProductShowcase';
import Comparison from '@/sections/Comparison'; // 4.
import FAQ from '@/sections/FAQ'; // 5.
import Lifestyle from '@/sections/Lifestyle'; // 6.
import Footer from '@/sections/Footer'; // 7.
import WhereToBuy from '@/sections/WhereToBuy';
import ProductPage from '@/pages/ProductPage';
import AboutPage from '@/pages/AboutPage';
import CheckoutPage from '@/pages/CheckoutPage';
import ContactPage from '@/pages/ContactPage';
import CartPage from '@/pages/CartPage';

const HomePage = () => (
  <>
    <Hero />
    <BrandTicker />
    <Benefits />
    <ProductShowcase />
    <Comparison />
    <FAQ />
    <Lifestyle />
    <WhereToBuy />
    <Footer />
  </>
);

const NotFoundPage = () => (
  <>
    <main className="pt-24 min-h-screen">
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold">
          Page Not Found
        </h1>
        <p className="mt-4">
          The page you are looking for does not exist.
        </p>
      </div>
    </main>
    <Footer />
  </>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = 'en';
    document.title = siteData.brandName;
    document.body.classList.add(
      "bg-drew-warm-ivory",
      "text-drew-deep-green"
    );
    return () => {
      document.body.classList.remove(
        "bg-drew-warm-ivory",
        "text-drew-deep-green"
      );
    };
  }, []);

  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </CartProvider>
  )
}

export default App;
