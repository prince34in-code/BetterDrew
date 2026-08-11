import React, { useLayoutEffect, useRef, FC } from 'react';
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

  const handleShopNow = () => {
    navigate('/product');
  };

  return (
    <div className="gsap-card-reveal invisible relative flex h-full flex-col overflow-hidden bg-drew-product-bg rounded-[36px] p-6 sm:p-8 lg:p-10 shadow-soft">
      {/* Image Section */}
      <div className="relative flex w-full flex-grow items-center justify-center pt-8 pb-4">
        <div className="absolute w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] bg-drew-lime-accent/20 rounded-full blur-3xl" />
        <img
          src={product.image}
          alt={product.name}
          className={`relative z-10 w-auto h-[300px] sm:h-[340px] drop-shadow-[0_25px_25px_rgba(0,0,0,0.1)] ${isComingSoon ? 'opacity-60' : ''}`}
        />
        <div className="absolute bottom-[40px] sm:bottom-[50px] w-[40%] h-[20px] bg-black/10 rounded-full blur-xl" />
      </div>

      {/* Content Section */}
      <div className="relative z-10 mt-4 flex flex-col items-center text-center">
        {isComingSoon ? (
          <span className="mb-2 inline-block rounded-full bg-drew-deep-green/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-drew-deep-green">
            Coming Soon
          </span>
        ) : (
          <span className="mb-2 text-sm font-bold uppercase tracking-widest text-drew-coconut-green">
            Our Signature Product
          </span>
        )}

        <h2 className="text-3xl md:text-4xl font-extrabold text-drew-deep-green mb-3" style={{ fontFamily: '"General Sans", sans-serif' }}>
          {product.name}
        </h2>

        <div className="h-20"> {/* Spacer to maintain card height consistency */}
          {!isComingSoon && (
            <div className="flex items-baseline justify-center gap-x-2 mb-6 mt-2">
              <span className="text-4xl font-bold text-drew-deep-green leading-none">
                ₹{basePrice.toFixed(0)}
              </span>
              <span className="text-base text-drew-secondary-text">
                for a 6-pack
              </span>
            </div>
          )}
        </div>

        <div className="w-full max-w-xs mt-auto">
          <button
            onClick={!isComingSoon ? handleShopNow : undefined}
            // The button text is already handled by the isComingSoon prop
            disabled={isComingSoon}
            className="w-full px-8 py-3 bg-drew-deep-green text-drew-soft-white font-bold text-base rounded-full transition-all duration-300 ease-out transform-gpu enabled:hover:bg-drew-lime-accent enabled:hover:text-drew-deep-green enabled:hover:scale-105 enabled:hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
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

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.gsap-card-reveal');
      gsap.fromTo(cards, {
        y: 40,
        autoAlpha: 0,
      }, {
        y: 0,
        autoAlpha: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        }
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const comingSoonProduct: Product = {
    id: 'coming-soon',
    brand: 'Betterdrew',
    name: 'Coming Soon',
    description: 'Something fresh is on the way.',
    image: betterdrewProduct.image, // Re-using image as a placeholder
  };

  return (
    <section ref={sectionRef} id="shop" className="w-full bg-drew-warm-ivory py-8 px-4">
      <div className="max-w-[1400px] mx-auto bg-drew-product-bg rounded-3xl p-8 md:p-12 lg:p-16 shadow-soft">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <span className="inline-block bg-drew-lime-accent/30 text-drew-deep-green text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Featured Product
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <ProductCard product={betterdrewProduct} />
          <ProductCard product={comingSoonProduct} isComingSoon />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
