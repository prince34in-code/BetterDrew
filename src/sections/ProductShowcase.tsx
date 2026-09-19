import React, { useRef, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { betterdrewProduct, Product } from '@/data/product';
import { prefersReducedMotion } from '@/utils/motion';

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
  isComingSoon?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ product, isComingSoon = false }) => {
  const navigate = useNavigate();
  const basePrice = betterdrewProduct.packs[0]?.price || 900;
  const cardRef = useRef<HTMLDivElement>(null);
  const showcaseDescription = isComingSoon
    ? 'Same coconut base. A fruit note, not a flavor mask.'
    : '100% natural young coconut water.';

  const handleShopNow = () => {
    // Only navigate if the product is available
    if (!isComingSoon) {
      // Navigate to the main product page for now.
      navigate('/product');
    }
  };

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const card = cardRef.current;
    if (!card) return;

    const image = card.querySelector('.gsap-product-image');
    const eyebrow = card.querySelector('.gsap-product-eyebrow');
    const name = card.querySelector('.gsap-product-name');
    const price = card.querySelector('.gsap-product-price');
    const button = card.querySelector('.gsap-product-button');

    if (!image || !eyebrow || !name || !button) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(image, { autoAlpha: 0, y: 20, scale: 0.95 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1, ease: 'power3.out' })
        .fromTo(eyebrow, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.8')
        .fromTo(name, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.6')
        .fromTo(price, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.5')
        .fromTo(button, { autoAlpha: 0, y: 15, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }, '-=0.5');

      // Parallax on product image
      gsap.to(image, {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Hover micro-interactions
      card.addEventListener('mouseenter', () => {
        if (image) gsap.to(image, { scale: 1.03, duration: 0.6, ease: 'power3.out' });
      });
      card.addEventListener('mouseleave', () => {
        if (image) gsap.to(image, { scale: 1, duration: 0.6, ease: 'power3.out' });
      });

    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <article ref={cardRef} className="group relative flex h-full flex-col text-drew-deep-green">
      {/* Image Section */}
      <div className="relative flex h-[270px] w-full flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-drew-soft-border/60 bg-drew-cream shadow-soft transition-shadow duration-300 group-hover:shadow-lg sm:h-[300px] md:h-[280px] lg:h-[330px]">
        <div className="absolute h-[210px] w-[210px] rounded-full bg-drew-lime-accent/20 blur-3xl sm:h-[250px] sm:w-[250px]" />
        <img
          src={product.image}
          alt={product.name}
          className={`gsap-product-image relative z-10 h-[92%] w-[72%] object-contain object-bottom drop-shadow-[0_20px_20px_rgba(18,59,42,0.18)] ${isComingSoon ? 'opacity-45 grayscale blur-[1px]' : ''}`}
        />
        <div className="absolute bottom-5 h-4 w-[35%] rounded-full bg-drew-deep-green/20 blur-xl transition-transform duration-500 group-hover:scale-110" />
        {isComingSoon && (
          <span className="absolute left-4 top-4 rounded-full bg-drew-deep-green px-3 py-1 text-xs font-bold uppercase tracking-widest text-drew-soft-white">
            New
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-1 flex-col pt-5">
        {isComingSoon ? (
          <span className="gsap-product-eyebrow mb-2 text-xs font-bold uppercase tracking-widest text-drew-coconut-green">
            Coming Soon
          </span>
        ) : (
          <span className="gsap-product-eyebrow mb-2 text-xs font-bold uppercase tracking-widest text-drew-coconut-green">
            Our Signature
          </span>
        )}

        <h2 className="gsap-product-name mb-1 text-2xl font-black tracking-tight text-drew-deep-green font-sans">
          {product.name}
        </h2>

        <p className="mb-5 max-w-sm text-sm leading-relaxed text-drew-coconut-green">
          {showcaseDescription}
        </p>

        <div className="mb-2 text-xs font-semibold text-drew-coconut-green">Select Size</div>
        <div className="mb-3 rounded-full bg-drew-cream px-4 py-3 text-sm font-semibold text-drew-deep-green">
          {isComingSoon ? 'Coming soon' : '200ml · 6 Pack'}
        </div>

        <div className="gsap-product-price mb-2 flex items-center justify-between rounded-full border border-drew-deep-green px-4 py-3 text-sm font-semibold">
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border-[4px] border-drew-deep-green" />
            One-Time Purchase
          </span>
          <span>{isComingSoon ? '—' : `₹${basePrice.toFixed(0)}`}</span>
        </div>

        <div className="mb-4 flex items-center justify-between rounded-full bg-drew-soft-white px-4 py-3 text-sm text-drew-coconut-green">
          <span className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full border border-drew-coconut-green" />
            Subscribe &amp; Save
          </span>
          <span>{isComingSoon ? 'Notify Me' : `₹${(basePrice * 0.9).toFixed(0)}`}</span>
        </div>

        <div className="gsap-product-button mt-auto w-full">
          <button
            onClick={!isComingSoon ? handleShopNow : undefined}
            // The button text is already handled by the isComingSoon prop
            disabled={isComingSoon}
            className="w-full rounded-full bg-drew-deep-green px-6 py-3 text-base font-bold text-drew-soft-white transition-all duration-300 ease-out transform-gpu enabled:hover:bg-drew-lime-accent enabled:hover:text-drew-deep-green enabled:hover:scale-[1.02] enabled:hover:-translate-y-0.5 enabled:hover:shadow-xl disabled:cursor-not-allowed disabled:bg-drew-soft-border disabled:text-drew-coconut-green"
          >
            {isComingSoon ? 'Notify Me' : 'Shop Now →'}
          </button>
        </div>

      </div>
    </article>
  );
};

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const comingSoonProduct: Product = {
    id: 'coming-soon',
    brand: 'Betterdrew',
    name: 'coconut & Lime',
    description: 'Same coconut base. A fruit note, not a flavor mask.',
    status: 'coming-soon',
    image: betterdrewProduct.image, // Re-using image as a placeholder
  };

  return (
    <section ref={sectionRef} id="shop" className="w-full bg-drew-warm-ivory px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 text-center sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.24em] text-drew-coconut-green">Featured Product</span>
          <h2 className="mt-3 text-5xl font-black uppercase leading-none tracking-tight text-drew-deep-green sm:text-6xl lg:text-7xl">
            Our Products
          </h2>
        </div>
        {/* Mobile Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-4 hide-scrollbar md:hidden">
          <div className="w-[min(82vw,420px)] flex-shrink-0 snap-start">
            <ProductCard product={betterdrewProduct} isComingSoon={betterdrewProduct.status === 'coming-soon'} />
          </div>
          <div className="w-[min(82vw,420px)] flex-shrink-0 snap-start">
            <ProductCard product={comingSoonProduct} isComingSoon={comingSoonProduct.status === 'coming-soon'} />
          </div>
        </div>
        {/* Desktop Grid */}
        <div className="hidden grid-cols-2 gap-6 md:grid lg:gap-10">
            <ProductCard product={betterdrewProduct} isComingSoon={betterdrewProduct.status === 'coming-soon'} />
            <ProductCard product={comingSoonProduct} isComingSoon={comingSoonProduct.status === 'coming-soon'} />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
