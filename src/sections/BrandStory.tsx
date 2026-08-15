import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { betterdrewProduct } from '@/data/product';

gsap.registerPlugin(ScrollTrigger);

const BrandStory = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const imageEl = section.querySelector('.gsap-story-image');
      const textItems = gsap.utils.toArray('.gsap-story-text-item');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        }
      });

      if (imageEl) {
        tl.from(imageEl, {
          autoAlpha: 0,
          y: 30,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out'
        });
      }

      if (textItems.length > 0) {
        tl.from(textItems, {
          autoAlpha: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out'
        }, imageEl ? "-=0.7" : 0);
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="story" className="w-full bg-drew-warm-ivory py-8 px-4">
      <div className="max-w-[1400px] mx-auto bg-drew-soft-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-10 lg:p-12 border border-drew-soft-border/50">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center">
          {/* Text Content - Left */}
          <div className="flex justify-center order-2 md:order-1">
            <div className="max-w-xl">
              <h2 className="gsap-story-text-item text-4xl sm:text-5xl font-bold text-drew-deep-green tracking-tight leading-tight">
                Hydration that keeps you moving.
              </h2>
              <div className="mt-8 space-y-4 text-lg text-drew-secondary-text">
                <p className="gsap-story-text-item leading-relaxed">
                  We believe better performance starts with better hydration. Made with young coconut water and natural electrolytes, BetterDrew keeps hydration simple, clean, and ready for whatever your day demands.
                </p>
                <p className="gsap-story-text-item !mt-6">Young coconut water.</p>
                <p className="gsap-story-text-item">Natural electrolytes.</p>
                <p className="gsap-story-text-item">Nothing unnecessary.</p>
              </div>
            </div>
          </div>
          {/* Image Content - Right */}
          <div className="gsap-story-image group relative h-[300px] sm:h-[400px] md:h-full w-full order-1 md:order-2">
            <img src={betterdrewProduct.image} alt="Betterdrew Product Bottle" className="h-full w-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-[1.03]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;