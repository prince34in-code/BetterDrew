import React, { useState, FC } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { betterdrewProduct, PackOption } from '@/data/product';
import { CheckCircle, Minus, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';


const ProductDetail: React.FC = () => {
  const [selectedPack, setSelectedPack] = useState<PackOption>(betterdrewProduct.packs[0]);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart(betterdrewProduct, selectedPack, quantity);
    setToastMessage(`${selectedPack.name} added to cart`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBuyNow = () => {
    addToCart(betterdrewProduct, selectedPack, quantity);
    navigate('/checkout');
  };

  const PackSelectorCard: React.FC<{ pack: PackOption }> = ({ pack }) => {
    const isSelected = selectedPack.id === pack.id;
    return (
      <div
        onClick={() => setSelectedPack(pack)}
        className={`relative w-full cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 flex flex-col justify-center items-center text-center h-full ${
          isSelected
            ? 'border-drew-deep-green bg-drew-deep-green/5 shadow-lg'
            : 'border-drew-soft-border bg-drew-soft-white hover:border-drew-deep-green/50'
        }`}
      >
        {pack.badge && (
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-drew-lime-accent px-3 py-0.5 text-xs font-bold text-drew-deep-green">
            {pack.badge}
          </div>
        )}
        <h3 className="text-md font-bold text-drew-deep-green">{pack.name}</h3>
        <p className="text-sm text-drew-secondary-text">{pack.bottles} bottles</p>
      </div>
    );
  };

  const AccordionItem: FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-drew-soft-border last:border-b-0">
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="w-full flex justify-between items-center py-5 text-left transition-colors hover:bg-drew-warm-ivory/50"
        >
          <span className="text-lg font-semibold text-drew-deep-green ml-4">{title}</span>
          <ChevronDown className={`w-5 h-5 text-drew-secondary-text transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden bg-drew-warm-ivory/60"
            >
              <div className="px-4 pb-5 pt-2 text-drew-secondary-text leading-relaxed">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-drew-warm-ivory py-8 px-4">
      <section className="w-full max-w-[1400px] mx-auto pt-24 sm:pt-32 pb-16 sm:pb-24">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-drew-secondary-text">
        <RouterLink to="/" className="hover:text-drew-deep-green">Home</RouterLink>
        <span className="mx-2">/</span>
        <RouterLink to="/product" className="hover:text-drew-deep-green">Product</RouterLink>
        <span className="mx-2">/</span>
        <span className="font-medium text-drew-deep-green">{betterdrewProduct.name}</span>
      </div>

      <div className="bg-drew-soft-white rounded-3xl shadow-soft p-8 md:p-12 lg:p-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Side: Image */}
          <div className="bg-drew-product-bg rounded-2xl flex items-center justify-center p-8 h-[400px] lg:h-auto">
            <img
              src={betterdrewProduct.image}
              alt={betterdrewProduct.name}
              className="max-h-full w-auto object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right Side: Details */}
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-drew-coconut-green mb-2 block">
              Our Signature Product
            </span>
            <h1 className="text-4xl md:text-[42px] font-extrabold text-drew-deep-green mb-4" style={{ fontFamily: '"General Sans", sans-serif' }}>
              {betterdrewProduct.name}
            </h1>
            <p className="text-lg text-drew-secondary-text max-w-md mb-6">
              {betterdrewProduct.description}
            </p>

            {/* Pack Selector */}
            <div className="mb-6">
              <p className="font-bold text-drew-deep-green mb-3">Pack Size</p>
              <div className="grid grid-cols-3 gap-3 h-24">
                {betterdrewProduct.packs.map(pack => <PackSelectorCard key={pack.id} pack={pack} />)}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-x-3 mb-6">
              <span className="text-4xl font-bold text-drew-deep-green">
                ₹{selectedPack.price.toFixed(0)}
              </span>
              {selectedPack.compareAtPrice && (
                <span className="text-xl text-drew-secondary-text line-through">
                  ₹{selectedPack.compareAtPrice.toFixed(0)}
                </span>
              )}
              {selectedPack.savings && (
                <span className="text-md font-semibold text-drew-lime-accent">
                  {selectedPack.savings}
                </span>
              )}
            </div>

            {/* Quantity & Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4 my-8">
              {/* Quantity */}
              <div className="flex items-center gap-2 rounded-full border border-drew-soft-border p-2">
                <button onClick={() => handleQuantityChange(-1)} className="p-2 rounded-full hover:bg-drew-warm-ivory disabled:opacity-50" disabled={quantity <= 1}>
                  <Minus className="w-5 h-5 text-drew-deep-green" />
                </button>
                <span className="w-10 text-center text-xl font-bold text-drew-deep-green">{quantity}</span>
                <button onClick={() => handleQuantityChange(1)} className="p-2 rounded-full hover:bg-drew-warm-ivory">
                  <Plus className="w-5 h-5 text-drew-deep-green" />
                </button>
              </div>
              {/* Buttons */}
              <div className="w-full flex-grow grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-4 bg-drew-soft-white border border-drew-soft-border text-drew-deep-green font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-drew-warm-ivory"
                >
                  Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full px-6 py-4 bg-drew-deep-green text-drew-soft-white font-bold text-lg rounded-full transition-all duration-300 ease-out hover:bg-drew-lime-accent hover:text-drew-deep-green"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Purchase Information */}
            <div className="mt-8 space-y-2 text-sm text-drew-secondary-text text-center sm:text-left">
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-drew-lime-accent" /> Secure checkout</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-drew-lime-accent" /> Fast delivery</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-drew-lime-accent" /> No added sugar</p>
              <p className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-drew-lime-accent" /> No preservatives</p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Information Accordion */}
      <div className="w-full mt-16 sm:mt-24 bg-drew-soft-white rounded-3xl shadow-soft overflow-hidden">
        <div className="p-2">
          <AccordionItem title="Product Details">
            <p>Our Young Coconut Water is sourced from the finest farms, ensuring every sip is packed with natural flavor and electrolytes. It's the perfect healthy alternative to sugary drinks, designed for a modern, health-conscious lifestyle.</p>
          </AccordionItem>
          <AccordionItem title="Ingredients">
            <p>Pure and simple: 100% Young Coconut Water.</p>
          </AccordionItem>
          <AccordionItem title="Nutrition">
            <p>Nutritional information is based on a standard 200ml serving. Values may vary slightly. Detailed nutritional panel coming soon.</p>
          </AccordionItem>
          <AccordionItem title="Shipping & Returns">
            <p>We offer fast and reliable shipping across India. If you're not completely satisfied with your purchase, please contact our support team for information on returns and exchanges. Your satisfaction is our priority.</p>
          </AccordionItem>
        </div>
      </div>

      {/* Add to Cart Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-drew-deep-green text-drew-soft-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 z-50 animate-fade-in-up">
          <CheckCircle className="w-5 h-5 text-drew-lime-accent" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}
      </section>
    </div>
  );
};

export default ProductDetail;