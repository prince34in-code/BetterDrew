import React, { useLayoutEffect, useRef, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { betterdrewProduct, Product } from '@/data/product';
import { CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductCardProps {
  product: Product;
  isComingSoon?: boolean;
}

const ProductCard: FC<ProductCardProps> = ({ product, isComingSoon = false }) => {
  const navigate = useNavigate();
  const basePrice = betterdrewProduct.packs[0]?.price || 900;
  const cardRef = useRef<HTMLDivElement>(null);

  const handleShopNow = () => {
    // Only navigate if the product is available
    if (!isComingSoon) {
      // Navigate to the main product page for now.
      navigate('/product');
    }
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const image = card.querySelector('.gsap-product-image');
    const eyebrow = card.querySelector('.gsap-product-eyebrow');
    const name = card.querySelector('.gsap-product-name');
    const price = card.querySelector('.gsap-product-price');
    const button = card.querySelector('.gsap-product-button');

    if (!image || !eyebrow || !name || !price || !button) return;

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
    <div ref={cardRef} className="relative flex h-full flex-col overflow-hidden bg-drew-product-bg rounded-[36px] p-6 sm:p-8 lg:p-10 shadow-soft">
      {/* Image Section */}
      <div className="relative flex w-full flex-shrink-0 items-center justify-center pt-6 pb-2">
        <div className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-drew-lime-accent/20 rounded-full blur-3xl" />
        <img
          src={product.image}
          alt={product.name}
          className={`gsap-product-image relative z-10 w-full h-44 object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.1)] ${isComingSoon ? 'opacity-60' : ''} invisible`}
        />
        <div className="absolute bottom-[40px] sm:bottom-[50px] w-[40%] h-[20px] bg-black/10 rounded-full blur-xl" />
      </div>

      {/* Content Section */}
      <div className="relative z-10 mt-4 flex flex-col items-center text-center">
        {isComingSoon ? (
          <span className="gsap-product-eyebrow mb-2 inline-block rounded-full bg-drew-deep-green/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-drew-deep-green">
            Coming Soon
          </span>
        ) : (
          <span className="gsap-product-eyebrow mb-2 text-sm font-bold uppercase tracking-widest text-drew-coconut-green">
            Our Signature Product
          </span>
        )}

        <h2 className="gsap-product-name text-xl font-extrabold text-drew-deep-green mb-2 line-clamp-2 h-[3.25rem]" style={{ fontFamily: '"General Sans", sans-serif' }}>
          {product.name}
        </h2>

        {!isComingSoon && (
          <div className="gsap-product-price flex items-baseline justify-center gap-x-2 mb-4 mt-1">
            <span className="text-3xl font-bold text-drew-deep-green leading-none">
              ₹{basePrice.toFixed(0)}
            </span>
            <span className="text-sm text-drew-secondary-text">
              for a 6-pack
            </span>
          </div>
        )}

        <div className="gsap-product-button w-full max-w-xs mt-auto">
          <button
            onClick={!isComingSoon ? handleShopNow : undefined}
            // The button text is already handled by the isComingSoon prop
            disabled={isComingSoon}
            className="w-full px-6 py-2.5 bg-drew-deep-green text-drew-soft-white font-bold text-base rounded-full transition-all duration-300 ease-out transform-gpu enabled:hover:bg-drew-lime-accent enabled:hover:text-drew-deep-green enabled:hover:scale-[1.02] enabled:hover:-translate-y-0.5 enabled:hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isComingSoon ? 'Coming Soon' : 'Shop Now →'}
          </button>
        </div>

      </div>
    </div>
  );
};

const ProductShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const comingSoonProduct: Product = {
    id: 'coming-soon',
    brand: 'Betterdrew',
    name: 'Strawberry & Lime',
    description: 'Something fresh is on the way.',
    status: 'coming-soon',
    image: betterdrewProduct.image, // Re-using image as a placeholder
  };

  return (
    <section ref={sectionRef} id="shop" className="w-full bg-drew-warm-ivory py-8 px-4">
      <div className="max-w-[1400px] mx-auto lg:bg-drew-product-bg rounded-3xl lg:p-8 lg:md:p-12 lg:p-16 lg:shadow-soft">
        <div className="text-center mb-8">
          <span className="inline-block bg-drew-lime-accent/30 text-drew-deep-green text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Featured Product
          </span>
        </div>
        {/* Mobile Carousel */}
        <div className="lg:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 -mx-4 px-4 pb-4 hide-scrollbar">
          <div className="flex-shrink-0 w-[74vw] snap-start">
            <ProductCard product={betterdrewProduct} isComingSoon={betterdrewProduct.status === 'coming-soon'} />
          </div>
          <div className="flex-shrink-0 w-[74vw] snap-start">
            <ProductCard product={comingSoonProduct} isComingSoon={comingSoonProduct.status === 'coming-soon'} />
          </div>
        </div>
        {/* Desktop Grid */}
        <div className="hidden lg:grid grid-cols-2 gap-8">
            <ProductCard product={betterdrewProduct} isComingSoon={betterdrewProduct.status === 'coming-soon'} />
            <ProductCard product={comingSoonProduct} isComingSoon={comingSoonProduct.status === 'coming-soon'} />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
