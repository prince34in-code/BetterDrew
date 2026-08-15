import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

const platforms = [
  'Amazon',
  'Flipkart',
  'Blinkit',
  'Swiggy Instamart',
  'Zepto',
  'Flipkart Minutes',
];

gsap.registerPlugin(ScrollTrigger);

const PlatformCard: React.FC<{ name: string }> = ({ name }) => (
  <a href="#" target="_blank" rel="noopener noreferrer" className="gsap-retailer-tile group block">
    <div className="relative bg-drew-soft-white rounded-xl shadow-soft p-6 flex items-center justify-center h-24 border border-transparent transition-all duration-300 ease-out hover:shadow-md hover:border-drew-soft-border hover:-translate-y-1 hover:scale-[1.02]">
      <span className="text-lg font-semibold text-drew-deep-green">{name}</span>
      <div className="absolute bottom-3 right-3 w-6 h-6 bg-drew-soft-border/50 rounded-full flex items-center justify-center text-drew-secondary-text transition-all duration-300 group-hover:bg-drew-lime-accent group-hover:text-drew-deep-green group-hover:scale-110">
        <ArrowUpRight size={14} strokeWidth={2.5} />
      </div>
    </div>
  </a>
);

const WhereToBuy: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerElements = gsap.utils.toArray<HTMLElement>('.gsap-w2b-header', section);
      const tiles = gsap.utils.toArray<HTMLElement>('.gsap-retailer-tile', section);

      if (headerElements.length === 0 && tiles.length === 0) return;
      gsap.set([headerElements, tiles], { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      if (headerElements.length > 0) {
        tl.to(
          headerElements,
          { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' }
        );
      }
      if (tiles.length > 0) {
        tl.to(
          tiles,
          { y: 0, autoAlpha: 1, stagger: 0.07, duration: 0.6, ease: 'power2.out' },
          headerElements.length > 0 ? '-=0.5' : 0
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-drew-warm-ivory py-16 px-4">
      <div className="max-w-[1400px] mx-auto bg-blue-100/50 rounded-3xl p-8 md:p-12 lg:p-16 shadow-lg shadow-blue-200/20">
        <div className="text-center mb-10 sm:mb-12">
          <span className="gsap-w2b-header inline-block bg-drew-lime-accent/30 text-drew-deep-green text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
            WHERE TO FIND US
          </span>
          <h2 className="gsap-w2b-header mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-drew-deep-green max-w-2xl mx-auto">
            Available on your favorite platforms.
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {platforms.map(platform => (
            <PlatformCard key={platform} name={platform} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhereToBuy;