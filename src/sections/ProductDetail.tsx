import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { betterdrewProduct, PackOption, productGalleryImages, productVariants, VariantOption } from '@/data/product';
import { CheckCircle, Minus, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

const ProductDetail: React.FC = () => {
  const [selectedVariant, setSelectedVariant] = useState<VariantOption>(productVariants[0]);
  const [selectedPack, setSelectedPack] = useState<PackOption>(betterdrewProduct.packs[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [variantTooltip, setVariantTooltip] = useState<string | null>(null);

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
    navigate('/cart');
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion(prev => (prev === id ? null : id));
  };

  const handleVariantClick = (variant: VariantOption) => {
    if (variant.status === 'coming-soon') {
      setVariantTooltip(`${variant.name} is coming soon!`);
      setTimeout(() => setVariantTooltip(null), 2500);
      return;
    }
    setSelectedVariant(variant);
  };

  // 4 thumbnail images; placeholders using bottle-1 asset until alternate-angle photography is delivered
  const galleryImages = betterdrewProduct.gallery || productGalleryImages;

  return (
    <div className="w-full bg-drew-warm-ivory py-6 sm:py-10 px-4">
      <section className="w-full max-w-[1320px] mx-auto pb-12 sm:pb-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6 text-xs sm:text-sm text-drew-secondary-text">
          <RouterLink to="/" className="hover:text-drew-deep-green transition-colors">Home</RouterLink>
          <span className="mx-2">/</span>
          <RouterLink to="/product" className="hover:text-drew-deep-green transition-colors">Shop</RouterLink>
          <span className="mx-2">/</span>
          <span className="font-semibold text-drew-deep-green">{selectedVariant.name}</span>
        </nav>

        {/* Product Card Container */}
        <div className="bg-drew-soft-white rounded-3xl shadow-soft p-5 sm:p-8 md:p-10 lg:p-12 border border-drew-soft-border/40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
            
            {/* LEFT COLUMN: Image Gallery */}
            <div className="flex flex-col gap-4 w-full">
              {/* Main Image Display */}
              <div className="relative w-full aspect-square max-h-[460px] sm:max-h-[500px] bg-drew-product-bg/80 rounded-2xl flex items-center justify-center p-6 sm:p-10 overflow-hidden border border-drew-soft-border/50">
                <motion.img
                  key={activeImageIndex}
                  src={galleryImages[activeImageIndex] || betterdrewProduct.image}
                  alt={`${selectedVariant.name} - View ${activeImageIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  loading="eager"
                  decoding="async"
                  width="500"
                  height="600"
                  className="max-h-full max-w-full object-contain drop-shadow-[0_16px_24px_rgba(16,27,51,0.18)]"
                />
                <span className="absolute top-3 left-3 rounded-full bg-drew-deep-green/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-drew-soft-white">
                  100% Young Coconut
                </span>
              </div>

              {/* Thumbnails Row (4 views) */}
              <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1" role="tablist" aria-label="Product thumbnails">
                {galleryImages.slice(0, 4).map((imgUrl, index) => {
                  const isActive = activeImageIndex === index;
                  return (
                    <button
                      key={index}
                      role="tab"
                      aria-selected={isActive}
                      aria-label={`View angle ${index + 1}`}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-drew-product-bg/90 p-1.5 transition-all duration-200 border-2 overflow-hidden flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-drew-lime-accent ${
                        isActive
                          ? 'border-drew-lime-accent ring-2 ring-drew-lime-accent/40 shadow-sm scale-[1.02]'
                          : 'border-transparent opacity-75 hover:opacity-100 hover:border-drew-soft-border'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`Thumbnail ${index + 1}`}
                        className="max-h-full max-w-full object-contain"
                        width="80"
                        height="80"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-drew-secondary-text/70 italic">
                * Real alternate-angle photography will replace thumbnail previews upon final photoshoot delivery.
              </p>
            </div>

            {/* RIGHT COLUMN: Details, Variants, Packs, CTA, Accordions */}
            <div className="flex flex-col w-full min-w-0">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-drew-coconut-green mb-2 block">
                Pure Young Coconut Water
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-black text-drew-deep-green leading-tight mb-3">
                {selectedVariant.name}
              </h1>
              <p className="text-sm sm:text-base text-drew-secondary-text leading-relaxed mb-6">
                {selectedVariant.description}
              </p>

              {/* 1. FLAVOR / VARIANT SELECTOR */}
              <div className="mb-6 pt-2 border-t border-drew-soft-border/50">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-drew-deep-green">
                    Flavor: <strong className="text-drew-coconut-green font-extrabold">{selectedVariant.name}</strong>
                  </span>
                  {variantTooltip && (
                    <span className="text-xs font-semibold text-drew-deep-green bg-drew-lime-accent px-2.5 py-0.5 rounded-full animate-fade-in">
                      {variantTooltip}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {productVariants.map(variant => {
                    const isSelected = selectedVariant.id === variant.id;
                    const isComingSoon = variant.status === 'coming-soon';
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => handleVariantClick(variant)}
                        aria-label={`${variant.name} ${isComingSoon ? '(Coming Soon)' : ''}`}
                        className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-full border-2 transition-all text-xs font-bold ${
                          isSelected
                            ? 'border-drew-deep-green bg-drew-deep-green text-drew-soft-white shadow-sm'
                            : isComingSoon
                            ? 'border-dashed border-drew-soft-border/80 bg-drew-soft-white/60 text-drew-deep-green/50 cursor-pointer opacity-70 hover:opacity-100'
                            : 'border-drew-soft-border bg-drew-soft-white text-drew-deep-green hover:border-drew-deep-green/40'
                        }`}
                      >
                        <span
                          className={`w-3.5 h-3.5 rounded-full flex-shrink-0 transition-transform ${isSelected ? 'ring-2 ring-drew-lime-accent' : ''}`}
                          style={{ backgroundColor: variant.color }}
                        />
                        <span>{variant.shortName}</span>
                        {isComingSoon && (
                          <span className="text-[10px] uppercase font-bold tracking-tight bg-drew-cream text-drew-deep-green px-1.5 py-0.2 rounded-full">
                            Soon
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. PACK SELECTOR */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-drew-deep-green">Select Pack Size</span>
                  <span className="text-xs font-semibold text-drew-secondary-text">₹{selectedPack.pricePerBottle.toFixed(2)} / bottle</span>
                </div>
                
                {/* 4 Responsive Pack Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {betterdrewProduct.packs.map(pack => {
                    const isSelected = selectedPack.id === pack.id;
                    return (
                      <button
                        key={pack.id}
                        type="button"
                        onClick={() => setSelectedPack(pack)}
                        className={`relative w-full cursor-pointer rounded-xl border-2 p-3 text-left transition-all duration-200 flex flex-col justify-between min-h-[92px] ${
                          isSelected
                            ? 'border-drew-deep-green bg-drew-deep-green/5 shadow-md ring-1 ring-drew-deep-green'
                            : 'border-drew-soft-border bg-drew-soft-white hover:border-drew-deep-green/40'
                        }`}
                      >
                        {pack.badge && (
                          <span className="absolute -top-2.5 right-2 rounded-full bg-drew-lime-accent px-2 py-0.5 text-[10px] font-black uppercase tracking-tight text-drew-deep-green shadow-xs">
                            {pack.badge}
                          </span>
                        )}
                        <div>
                          <p className="text-xs sm:text-sm font-bold text-drew-deep-green leading-snug">{pack.name}</p>
                          <p className="text-[11px] text-drew-secondary-text">{pack.bottles} {pack.bottles === 1 ? 'bottle' : 'bottles'}</p>
                        </div>
                        <div className="mt-2 flex items-baseline justify-between w-full">
                          <span className="text-sm font-extrabold text-drew-deep-green">₹{pack.price}</span>
                          {pack.savings && (
                            <span className="text-[10px] font-bold text-drew-coconut-green">{pack.savings}</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. PRICE DISPLAY */}
              <div className="flex items-baseline gap-x-3 mb-6 p-4 rounded-2xl bg-drew-cream/70 border border-drew-soft-border/40">
                <span className="text-3xl sm:text-4xl font-black text-drew-deep-green">
                  ₹{selectedPack.price.toFixed(0)}
                </span>
                {selectedPack.compareAtPrice && (
                  <span className="text-base sm:text-lg text-drew-secondary-text/75 line-through">
                    MRP ₹{selectedPack.compareAtPrice.toFixed(0)}
                  </span>
                )}
                {selectedPack.savings && (
                  <span className="rounded-full bg-drew-lime-accent px-2.5 py-0.5 text-xs font-bold text-drew-deep-green">
                    {selectedPack.savings}
                  </span>
                )}
                <span className="ml-auto text-xs text-drew-secondary-text font-medium hidden sm:inline">
                  Inclusive of all taxes
                </span>
              </div>

              {/* 4. QUANTITY & CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                {/* Stepper */}
                <div className="flex items-center justify-between sm:justify-start gap-2 rounded-full border-2 border-drew-soft-border px-3 py-1.5 bg-drew-soft-white w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                    className="p-2 rounded-full hover:bg-drew-warm-ivory text-drew-deep-green disabled:opacity-40 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center text-base font-bold text-drew-deep-green" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(1)}
                    aria-label="Increase quantity"
                    className="p-2 rounded-full hover:bg-drew-warm-ivory text-drew-deep-green transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 flex-grow">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="w-full py-3.5 px-4 rounded-full border-2 border-drew-deep-green bg-drew-soft-white text-drew-deep-green font-bold text-sm sm:text-base hover:bg-drew-warm-ivory transition-all active:scale-[0.98]"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-4 rounded-full bg-drew-deep-green text-drew-cream font-bold text-sm sm:text-base hover:bg-drew-lime-accent hover:text-drew-deep-green transition-all shadow-md active:scale-[0.98]"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Security & Quality Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-drew-secondary-text pt-2 pb-6 border-b border-drew-soft-border/50">
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-drew-lime-accent flex-shrink-0" /> Free shipping &gt; ₹499</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-drew-lime-accent flex-shrink-0" /> Zero added sugar</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-drew-lime-accent flex-shrink-0" /> Zero preservatives</span>
                <span className="flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-drew-lime-accent flex-shrink-0" /> 100% Young coconut</span>
              </div>

              {/* 5. ACCORDION SECTIONS (one open at a time, chevron rotates) */}
              <div className="mt-6 divide-y divide-drew-soft-border/60 border-t border-drew-soft-border/60">
                
                {/* Accordion 1: Product Details */}
                <div className="py-2">
                  <button
                    type="button"
                    aria-expanded={openAccordion === 'details'}
                    onClick={() => toggleAccordion('details')}
                    className="w-full flex justify-between items-center py-3 text-left group"
                  >
                    <span className="text-base font-bold text-drew-deep-green group-hover:text-drew-coconut-green transition-colors">
                      Product Details
                    </span>
                    <ChevronDown className={`w-5 h-5 text-drew-secondary-text transition-transform duration-300 ${openAccordion === 'details' ? 'rotate-180 text-drew-deep-green' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === 'details' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pt-1 text-sm text-drew-secondary-text leading-relaxed space-y-2">
                          <p>
                            BetterDrew Young Coconut Water is sourced directly from tender coconuts harvested at peak freshness. Bottled the very same day it is cracked, our process locks in pure crisp hydration without concentrates, added sugars, or chemical preservatives.
                          </p>
                          <p>
                            Ideal for daily hydration, athletic recovery, or clean replenishment anytime during your day.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 2: Nutrition Facts */}
                <div className="py-2">
                  <button
                    type="button"
                    aria-expanded={openAccordion === 'nutrition'}
                    onClick={() => toggleAccordion('nutrition')}
                    className="w-full flex justify-between items-center py-3 text-left group"
                  >
                    <span className="text-base font-bold text-drew-deep-green group-hover:text-drew-coconut-green transition-colors">
                      Nutrition Facts
                    </span>
                    <ChevronDown className={`w-5 h-5 text-drew-secondary-text transition-transform duration-300 ${openAccordion === 'nutrition' ? 'rotate-180 text-drew-deep-green' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === 'nutrition' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pt-1 text-sm text-drew-secondary-text leading-relaxed">
                          <p className="text-xs font-semibold uppercase tracking-wider text-drew-coconut-green mb-3">
                            Nutritional Values per 100 ml:
                          </p>
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-w-md bg-drew-cream/50 p-3.5 rounded-xl border border-drew-soft-border/50 text-xs sm:text-sm">
                            <div className="flex justify-between border-b border-drew-soft-border/40 pb-1">
                              <span>Energy</span><strong className="text-drew-deep-green">20 kcal</strong>
                            </div>
                            <div className="flex justify-between border-b border-drew-soft-border/40 pb-1">
                              <span>Carbohydrates</span><strong className="text-drew-deep-green">5 g</strong>
                            </div>
                            <div className="flex justify-between border-b border-drew-soft-border/40 pb-1">
                              <span>Total Sugar</span><strong className="text-drew-deep-green">4 g</strong>
                            </div>
                            <div className="flex justify-between border-b border-drew-soft-border/40 pb-1">
                              <span>Added Sugar</span><strong className="text-drew-deep-green">0 g</strong>
                            </div>
                            <div className="flex justify-between border-b border-drew-soft-border/40 pb-1">
                              <span>Sodium</span><strong className="text-drew-deep-green">40 mg</strong>
                            </div>
                            <div className="flex justify-between border-b border-drew-soft-border/40 pb-1">
                              <span>Potassium</span><strong className="text-drew-deep-green">265 mg</strong>
                            </div>
                          </div>
                          <div className="mt-3 space-y-1 text-xs text-drew-secondary-text">
                            <p><strong>Ingredients:</strong> Tender coconut water + Vitamin C (antioxidant).</p>
                            <p><strong>FSSAI License:</strong> 22726441001001</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Accordion 3: Shipping & Returns */}
                <div className="py-2">
                  <button
                    type="button"
                    aria-expanded={openAccordion === 'shipping'}
                    onClick={() => toggleAccordion('shipping')}
                    className="w-full flex justify-between items-center py-3 text-left group"
                  >
                    <span className="text-base font-bold text-drew-deep-green group-hover:text-drew-coconut-green transition-colors">
                      Shipping &amp; Returns
                    </span>
                    <ChevronDown className={`w-5 h-5 text-drew-secondary-text transition-transform duration-300 ${openAccordion === 'shipping' ? 'rotate-180 text-drew-deep-green' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openAccordion === 'shipping' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 pt-1 text-sm text-drew-secondary-text leading-relaxed space-y-2">
                          <p>
                            <strong>Shipping:</strong> We deliver across India with reliable courier partners. Orders above ₹499 qualify for Free Shipping. Standard delivery timeline is 3–7 business days.
                          </p>
                          <p>
                            <strong>Returns &amp; Refunds:</strong> Given the consumable nature of fresh coconut water, we replace or refund any shipment that arrives damaged or compromised. Simply reach out via our contact page within 24 hours of delivery.
                          </p>
                          <div className="flex gap-4 pt-1 text-xs font-semibold">
                            <RouterLink to="/shipping-delivery" className="text-drew-deep-green underline hover:text-drew-coconut-green">Full Shipping Details →</RouterLink>
                            <RouterLink to="/returns-refunds" className="text-drew-deep-green underline hover:text-drew-coconut-green">Returns Policy →</RouterLink>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Add to Cart Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-drew-deep-green text-drew-soft-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 z-50 border border-drew-lime-accent/40 animate-fade-in-up">
            <CheckCircle className="w-5 h-5 text-drew-lime-accent" />
            <span className="font-semibold text-sm">{toastMessage}</span>
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductDetail;