import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { prefersReducedMotion } from '@/utils/motion';

const Navbar: React.FC = () => {
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const [isLearnExpanded, setIsLearnExpanded] = useState(false);
  const lastScrollY = useRef(0);
  const { pathname } = useLocation();

  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  // Scroll listener to hide/show navbar on vertical scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsNavbarVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      const scrollThreshold = 6;

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

  // Lock body scroll and handle ESC key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  // Automatically close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsShopExpanded(false);
    setIsLearnExpanded(false);
  }, [pathname]);

  const reducedMotion = prefersReducedMotion();

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-out ${
          isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav
          aria-label="Main Navigation"
          className="relative w-full h-[64px] md:h-[68px] lg:h-[72px] px-4 md:px-8 lg:px-12 bg-drew-deep-green flex items-center justify-between shadow-sm"
        >
          {/* MOBILE LEFT: Hamburger Menu Button (hidden on >= 900px) */}
          <div className="flex items-center min-[900px]:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-panel"
              className="p-2 -ml-2 text-drew-soft-white hover:text-drew-lime-accent transition-colors focus:outline-none focus:ring-2 focus:ring-drew-lime-accent rounded-md"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* DESKTOP / MOBILE BRAND WORDMARK */}
          <div className="flex items-center">
            <Link
              to="/"
              aria-label="Betterdrew Home"
              className="flex items-center group focus:outline-none focus:ring-2 focus:ring-drew-lime-accent rounded"
            >
              <span className="font-black tracking-[-0.06em] text-drew-soft-white text-[19px] sm:text-[21px] md:text-[23px] whitespace-nowrap transition-colors group-hover:text-drew-cream">
                BETTER DREW<span className="ml-1 tracking-[0.04em] text-drew-lime-accent">...</span>
              </span>
            </Link>
          </div>

          {/* DESKTOP INLINE NAV LINKS (visible ONLY on min-[900px] and up) */}
          <div className="hidden min-[900px]:flex items-center justify-center space-x-8 lg:space-x-10">
            <Link
              to="/"
              className={`text-sm lg:text-[15px] font-semibold transition-colors duration-200 ${
                pathname === '/'
                  ? 'text-drew-lime-accent font-bold'
                  : 'text-drew-soft-white/75 hover:text-drew-soft-white hover:text-drew-lime-accent'
              }`}
            >
              Home
            </Link>
            <Link
              to="/product"
              className={`text-sm lg:text-[15px] font-semibold transition-colors duration-200 ${
                pathname === '/product'
                  ? 'text-drew-lime-accent font-bold'
                  : 'text-drew-soft-white/75 hover:text-drew-soft-white hover:text-drew-lime-accent'
              }`}
            >
              Shop
            </Link>
            <Link
              to="/our-story"
              className={`text-sm lg:text-[15px] font-semibold transition-colors duration-200 ${
                pathname === '/our-story' || pathname === '/about'
                  ? 'text-drew-lime-accent font-bold'
                  : 'text-drew-soft-white/75 hover:text-drew-soft-white hover:text-drew-lime-accent'
              }`}
            >
              Our Story
            </Link>
            <Link
              to="/faq"
              className={`text-sm lg:text-[15px] font-semibold transition-colors duration-200 ${
                pathname === '/faq'
                  ? 'text-drew-lime-accent font-bold'
                  : 'text-drew-soft-white/75 hover:text-drew-soft-white hover:text-drew-lime-accent'
              }`}
            >
              Learn
            </Link>
            <Link
              to="/contact"
              className={`text-sm lg:text-[15px] font-semibold transition-colors duration-200 ${
                pathname === '/contact'
                  ? 'text-drew-lime-accent font-bold'
                  : 'text-drew-soft-white/75 hover:text-drew-soft-white hover:text-drew-lime-accent'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* RIGHT: Cart Icon & Count Badge */}
          <div className="flex items-center justify-end">
            <Link
              to="/cart"
              aria-label={`Shopping Cart, ${itemCount} items`}
              className="relative p-2 -mr-2 text-drew-soft-white hover:text-drew-lime-accent transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-drew-lime-accent rounded-full"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {/* Show badge ONLY when itemCount > 0 */}
              {itemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-drew-lime-accent text-[11px] font-black text-drew-deep-green shadow-sm animate-scale-in"
                  aria-hidden="true"
                >
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* MOBILE / TABLET MENU (Full Redesign below ~900px) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, x: reducedMotion ? 0 : '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: reducedMotion ? 0 : '-100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[60] bg-[#FDFBF6] flex flex-col justify-between overflow-y-auto text-drew-deep-green min-[900px]:hidden"
          >
            {/* 1. TOP BAR: Close (X) top-left, Cart bag top-right on white/cream background */}
            <div className="h-[64px] sm:h-[68px] px-5 sm:px-8 flex items-center justify-between border-b border-[#E8E4D9] flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close navigation menu"
                className="p-2 -ml-2 text-drew-deep-green hover:text-drew-coconut-green transition-colors focus:outline-none focus:ring-2 focus:ring-drew-lime-accent rounded-full"
              >
                <X className="w-6 h-6" />
              </button>

              <span className="font-black text-sm tracking-tight text-drew-deep-green uppercase">
                Menu
              </span>

              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label={`Shopping Cart, ${itemCount} items`}
                className="relative p-2 -mr-2 text-drew-deep-green hover:text-drew-coconut-green transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-6 h-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-drew-lime-accent text-[11px] font-black text-drew-deep-green shadow-sm">
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* 2. NAV LIST: Large bold items (~25-26px, dark navy) with thin light-tan dividers */}
            <div className="px-6 sm:px-8 pt-4 pb-2">
              <nav aria-label="Mobile Menu Links" className="divide-y divide-[#E8E4D9]">
                {/* Row 1: Home (direct link) */}
                <div className="py-4">
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[25px] sm:text-[26px] font-black tracking-tight text-drew-deep-green hover:text-drew-coconut-green transition-colors"
                  >
                    Home
                  </Link>
                </div>

                {/* Row 2: Shop (expandable "+", lime-green icon — reveals Product page link) */}
                <div className="py-4">
                  <div className="flex items-center justify-between">
                    <Link
                      to="/product"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-[25px] sm:text-[26px] font-black tracking-tight text-drew-deep-green hover:text-drew-coconut-green transition-colors"
                    >
                      Shop
                    </Link>
                    <button
                      type="button"
                      onClick={() => setIsShopExpanded(prev => !prev)}
                      aria-expanded={isShopExpanded}
                      aria-label="Expand Shop submenu"
                      className="p-2 -mr-2 text-drew-lime-accent hover:text-drew-coconut-green transition-colors focus:outline-none"
                    >
                      {isShopExpanded ? (
                        <Minus className="w-6 h-6 text-drew-deep-green" strokeWidth={2.5} />
                      ) : (
                        <Plus className="w-6 h-6 text-drew-lime-accent" strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {isShopExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4 pt-2.5 space-y-2 text-base font-semibold text-drew-secondary-text"
                      >
                        <Link
                          to="/product"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block hover:text-drew-deep-green py-1"
                        >
                          → Young Coconut Water (Single &amp; Packs)
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Row 3: Our Story (direct link) */}
                <div className="py-4">
                  <Link
                    to="/our-story"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-[25px] sm:text-[26px] font-black tracking-tight text-drew-deep-green hover:text-drew-coconut-green transition-colors"
                  >
                    Our Story
                  </Link>
                </div>

                {/* Row 4: Learn (expandable "+", lime-green icon — reveals FAQ and Contact links) */}
                <div className="py-4">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setIsLearnExpanded(prev => !prev)}
                      className="text-[25px] sm:text-[26px] font-black tracking-tight text-drew-deep-green hover:text-drew-coconut-green text-left transition-colors"
                    >
                      Learn
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLearnExpanded(prev => !prev)}
                      aria-expanded={isLearnExpanded}
                      aria-label="Expand Learn submenu"
                      className="p-2 -mr-2 text-drew-lime-accent hover:text-drew-coconut-green transition-colors focus:outline-none"
                    >
                      {isLearnExpanded ? (
                        <Minus className="w-6 h-6 text-drew-deep-green" strokeWidth={2.5} />
                      ) : (
                        <Plus className="w-6 h-6 text-drew-lime-accent" strokeWidth={2.5} />
                      )}
                    </button>
                  </div>
                  <AnimatePresence initial={false}>
                    {isLearnExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-4 pt-2.5 space-y-2 text-base font-semibold text-drew-secondary-text"
                      >
                        <Link
                          to="/faq"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block hover:text-drew-deep-green py-1"
                        >
                          → Frequently Asked Questions
                        </Link>
                        <Link
                          to="/contact"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block hover:text-drew-deep-green py-1"
                        >
                          → Contact Us
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </nav>
            </div>

            {/* 3. LARGE EMPTY SPACE */}
            <div className="flex-grow min-h-[40px] pointer-events-none" />

            {/* 4. BOTTOM SECTION: Dual Buttons & Social Icons */}
            <div className="px-6 sm:px-8 pb-8 pt-4 space-y-6 flex-shrink-0">
              {/* Two side-by-side buttons: "Shop Now" and "Contact" */}
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/product"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 bg-[#EFECE1] hover:bg-drew-warm-ivory text-drew-deep-green font-bold text-center text-sm sm:text-base rounded-[6px] border border-[#E0DBCF] transition-all shadow-xs"
                >
                  Shop Now
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="py-3 px-4 bg-[#EFECE1] hover:bg-drew-warm-ivory text-drew-deep-green font-bold text-center text-sm sm:text-base rounded-[6px] border border-[#E0DBCF] transition-all shadow-xs"
                >
                  Contact
                </Link>
              </div>

              {/* Centered social icons row: Instagram, Facebook, X */}
              <div className="flex items-center justify-center gap-7 pt-2">
                <a
                  href="https://www.instagram.com/betterdrew.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Betterdrew on Instagram"
                  className="text-drew-deep-green hover:text-drew-coconut-green transition-transform hover:scale-110"
                >
                  <svg aria-hidden="true" className="w-[19px] h-[19px] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/betterdrew"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Betterdrew on Facebook"
                  className="text-drew-deep-green hover:text-drew-coconut-green transition-transform hover:scale-110"
                >
                  <svg aria-hidden="true" className="w-[19px] h-[19px] fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/betterdrew"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Betterdrew on X"
                  className="text-drew-deep-green hover:text-drew-coconut-green transition-transform hover:scale-110"
                >
                  <svg aria-hidden="true" className="w-[19px] h-[19px] fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
