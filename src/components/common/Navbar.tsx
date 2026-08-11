import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { siteData } from '@/data/site';
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  useEffect(() => {
    const handleScroll = () => {
      // A small threshold to prevent the effect from triggering on minor scrolls
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-4 py-2 rounded-full transition-all duration-300 text-drew-deep-green ${
      isActive 
        ? 'font-semibold bg-drew-deep-green/10' 
        : 'font-medium hover:bg-drew-deep-green/5'}`;

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 p-4"
    >
      <nav className={`relative h-[64px] w-[calc(100%-32px)] max-w-7xl mx-auto flex items-center justify-between px-6 rounded-full border transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-warm-white/80 backdrop-blur-lg shadow-xl border-warm-white/20' 
          : 'bg-warm-white/50 backdrop-blur-md shadow-lg border-warm-white/10'
      }`}>
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" aria-label="Betterdrew Home" className="text-2xl font-bold tracking-wider text-drew-deep-green">
            {siteData.brandName.toUpperCase()}
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center space-x-8">
          <NavLink to="/" end className={navLinkClass}>Home</NavLink>
          <NavLink to="/product" className={navLinkClass}>Product</NavLink>
          <Link to="/#story" className="relative px-4 py-2 rounded-full transition-all duration-300 text-drew-deep-green font-medium hover:bg-drew-deep-green/5">About</Link>
          <Link to="/#contact" className="relative px-4 py-2 rounded-full transition-all duration-300 text-drew-deep-green font-medium hover:bg-drew-deep-green/5">Contact</Link>
        </div>

        {/* Actions: Cart & Mobile Menu */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <div className="hidden md:block">
            <Link to="/cart" aria-label="View Cart" className="relative text-drew-deep-green hover:text-drew-lime-accent transition-colors duration-300">
                <ShoppingCart size={24} />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-drew-lime-accent text-xs font-bold text-drew-deep-green">
                    {itemCount}
                  </span>
                )}
            </Link>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-drew-deep-green z-10 relative">
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-4 left-4 right-4 mt-[80px] bg-warm-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-warm-white/20">
          <div className="flex flex-col items-center space-y-6 py-8">
            <Link to="/" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/product" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Product</Link>
            <Link to="/#story" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/#contact" className="text-drew-deep-green text-xl font-semibold" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            <div className="pt-4">
              <Link to="/cart" aria-label="View Cart" className="relative text-drew-deep-green" onClick={() => setIsMobileMenuOpen(false)}>
                  <ShoppingCart size={28} />
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-drew-lime-accent text-xs font-bold text-drew-deep-green">
                      {itemCount}
                    </span>
                  )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
