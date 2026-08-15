import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import HeroBackground from '@/assets/hero/background.webp';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    const contentElements = heroContentRef.current?.querySelectorAll('.gsap-hero-reveal');
    const bgImage = bgImageRef.current;
    const container = containerRef.current;

    if (!headline || !contentElements?.length || !bgImage || !container) return;

    const ctx = gsap.context(() => {
      // 1. Subtle background zoom for a cinematic feel
      gsap.fromTo(bgImage, 
        { scale: 1 }, 
        { scale: 1.05, duration: 10, ease: 'none' }
      );

      // 2. Staggered character reveal for the main headline
      const splitHeadline = new SplitType(headline, { types: 'chars' });
      
      // 3. Timeline for entrance animations
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(splitHeadline.chars, {
        y: 40,
        opacity: 0,
        skewX: -15,
        stagger: 0.03,
        duration: 0.8,
        ease: 'power3.out',
      })
      .fromTo(contentElements, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, '-=0.6');

    }, container);

    return () => ctx.revert();

  }, []);

  return (
    <section 
      ref={containerRef}
      id="home"
      className="w-full"
    >
      <div 
        className="relative w-full h-[80vh] lg:h-[90vh] overflow-hidden bg-drew-deep-green flex items-center justify-center rounded-3xl"
      >
        <div ref={bgImageRef}
        className="absolute inset-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${HeroBackground})`,
          backgroundPosition: 'center 50%'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div ref={heroContentRef} className="relative z-10 text-center text-drew-soft-white px-4">
        <div className="gsap-hero-reveal">
          <h1
            ref={headlineRef}
            className="text-4xl font-bold tracking-tight text-drew-soft-white sm:text-5xl lg:text-6xl max-w-[320px] mx-auto sm:max-w-none"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            Young Coconut Water
          </h1>
          <p className="gsap-hero-reveal mt-3 text-lg font-medium text-drew-soft-white sm:text-xl md:text-2xl max-w-[320px] mx-auto sm:max-w-none" style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}>
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
