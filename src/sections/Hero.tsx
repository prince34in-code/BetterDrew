import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import HeroBackground from '@/assets/images/hero/hero-background.webp';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Keep the subtle animated gradient background
    // This animation is brand-agnostic and can be preserved.
        gsap.to(containerRef.current, {
            '--gradient-angle': '360deg',
            duration: 20,
            ease: 'none',
            repeat: -1,
            // This targets a CSS variable for a background, which is not present.
            // The effect is benign if the variable isn't used. We'll keep the logic.
        });

    // New, refined animation for the Betterdrew Hero
    const headline = headlineRef.current;
    const contentElements = containerRef.current?.querySelectorAll('.gsap-hero-reveal');

    if (headline && contentElements) {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.fromTo(headline, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
      tl.fromTo(contentElements, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, '-=0.7');
    }

  }, []);

  return (
    <section 
      ref={containerRef}
      id="home"
      className="w-full bg-drew-warm-ivory py-8 px-4"
    >
      <div 
        className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden bg-drew-deep-green flex items-center justify-center rounded-3xl"
      >
        <div className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${HeroBackground})`,
          backgroundPosition: 'center 70%'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 text-center text-drew-soft-white px-4">
        <div className="gsap-hero-reveal">
          <h1
            ref={headlineRef}
            className="text-4xl font-bold tracking-tight text-drew-soft-white sm:text-5xl lg:text-6xl"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            Young Coconut Water
          </h1>
          <p className="gsap-hero-reveal mt-3 text-lg font-medium text-drew-soft-white sm:text-xl md:text-2xl" style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}>
            Pure by nature. Made for every day.
          </p>
        </div>
      </div>
      </div>
      
      {/* Scroll Indicator */}
    </section>
  );
};

export default Hero;
