import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

import { useCart } from '@/context/CartContext';
const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [isOverDarkSurface, setIsOverDarkSurface] = useState(pathname === '/' || pathname === '/about');

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsNavbarVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollThreshold = 5; // To prevent flickering on minor scrolls
      const darkSurfaceHeight = pathname === '/' ? window.innerHeight * 0.8 : window.innerHeight * 0.5;

      setIsOverDarkSurface((pathname === '/' || pathname === '/about') && currentScrollY < darkSurfaceHeight);

      if (currentScrollY <= 80) {
        setIsNavbarVisible(true);
      } else if (currentScrollY > lastScrollY.current && Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
        setIsNavbarVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY.current && Math.abs(currentScrollY - lastScrollY.current) > scrollThreshold) {
        setIsNavbarVisible(true); // Scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen, pathname]);

  useEffect(() => {
    setIsOverDarkSurface(pathname === '/' || pathname === '/about');
  }, [pathname]);

  const navigationColor = isOverDarkSurface ? 'text-white' : 'text-drew-deep-green';
  const wordmarkShadow = isOverDarkSurface ? '0 2px 8px rgba(0,0,0,0.35)' : 'none';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Unified Navbar */}
      <nav className={`relative w-full grid grid-cols-3 items-center transition-colors duration-300 h-[64px] md:h-[68px] lg:h-[72px] px-4 md:px-6 lg:px-10 bg-transparent`}>
          <div className="flex justify-start">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`${navigationColor} z-10 relative p-2 -m-2`}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className="flex justify-center">
            <Link to="/" aria-label="Betterdrew Home" className="flex items-center justify-center">
              <div className={`relative whitespace-nowrap font-black tracking-[-0.08em] ${navigationColor} text-[18px] sm:text-[20px] md:text-[22px]`} style={{ textShadow: wordmarkShadow }}>
                BETTER DREW<span className="ml-1 tracking-[0.04em]">...</span>
              </div>
            </Link>
          </div>
          <div className="flex justify-end">
            <Link to="/cart" aria-label={`Cart, ${itemCount} items`} className={`relative ${navigationColor} p-2 -m-2`}>
                <ShoppingCart className="w-6 h-6" />
              {itemCount >= 0 && (
                  <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-drew-lime-accent text-xs font-bold text-drew-deep-green">
                    {itemCount}
                  </span>
                )}
            </Link>
          </div>
      </nav>

      {/* Unified Menu */}
      {isMobileMenuOpen && (
        <div className="fixed top-[64px] md:top-[68px] lg:top-[72px] right-4 z-40 w-[min(340px,calc(100vw-32px))] md:w-[360px] bg-white/75 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30">
          <div className="flex flex-col items-center space-y-4 p-6">
            <Link to="/" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/product" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Product</Link>
            <Link to="/about" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
            <Link to="/contact" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <Link to="/product" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Shop Now</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
