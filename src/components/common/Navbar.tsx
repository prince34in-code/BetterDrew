import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { siteData } from '@/data/site';

import { useCart } from '@/context/CartContext';
const Navbar = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsNavbarVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollThreshold = 5; // To prevent flickering on minor scrolls

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
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-out ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      {/* Unified Navbar */}
      <nav className={`relative w-full grid grid-cols-3 items-center transition-colors duration-300 h-[64px] md:h-[68px] lg:h-[72px] px-4 md:px-6 lg:px-10 bg-transparent`}>
          <div className="flex justify-start">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white z-10 relative p-2 -m-2">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
          <div className="flex justify-center">
            <Link to="/" aria-label="Betterdrew Home" className="flex items-center justify-center">
              <div className="relative flex flex-col items-center justify-center font-black tracking-tighter text-white w-[110px] h-[44px] md:w-[120px] md:h-[50px]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}>
                <span className="block text-[22px] md:text-[24px] leading-[0.9]">BETTER</span>
                <span className="block text-[22px] md:text-[24px] leading-[0.9] rotate-[-8deg] mt-1">
                  DREW<span className="ml-1 tracking-[0.1em]">...</span>
                </span>
              </div>
            </Link>
          </div>
          <div className="flex justify-end">
            <Link to="/cart" aria-label="View Cart" className="relative text-white p-2 -m-2">
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
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
            <Link to="/about" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
