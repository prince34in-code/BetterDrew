import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroBackground from '@/assets/hero/background.webp';
import { prefersReducedMotion } from '@/utils/motion';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

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

      // Keep the reveal at the element level so the semantic heading remains intact.
      const tl = gsap.timeline({ delay: 0.3 });
      tl.from(headline, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
      .fromTo(contentElements, { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' }, '-=0.6');

      gsap.to(headline, {
        letterSpacing: '0.01em',
        y: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

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
        className="relative w-full min-h-[640px] h-[78vh] overflow-hidden bg-drew-deep-green rounded-3xl sm:min-h-[680px] lg:h-[90vh] lg:min-h-[720px]"
      >
        <div ref={bgImageRef}
        className="absolute inset-y-0 right-0 z-0 w-[48%] bg-cover bg-center will-change-transform sm:w-[52%] lg:w-[68%]"
        style={{
          backgroundImage: `url(${HeroBackground})`,
        }}
      />

      <div className="absolute inset-y-0 left-0 z-10 w-[78%] bg-drew-deep-green sm:w-[72%] lg:w-[58%]" />
      <div className="absolute inset-y-0 left-0 z-10 w-[78%] bg-gradient-to-r from-drew-deep-green via-drew-deep-green/95 to-transparent sm:w-[72%] lg:w-[58%]" />

      <div ref={heroContentRef} className="relative z-20 flex min-h-[640px] h-full w-[78%] items-center px-5 py-20 sm:min-h-[680px] sm:w-[72%] sm:px-10 sm:py-24 lg:w-[58%] lg:px-16 xl:px-24">
        <div className="w-full max-w-[720px] text-left text-drew-soft-white">
          <h1
            ref={headlineRef}
            className="gsap-hero-reveal max-w-[720px] text-5xl font-black leading-[0.94] tracking-[-0.04em] text-drew-soft-white transition-[letter-spacing] duration-500 hover:tracking-[-0.01em] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            <span className="block">No factory.</span>
            <span className="block">No shortcuts.</span>
            <span className="block">Just coconut.</span>
          </h1>
          <p className="gsap-hero-reveal mt-6 max-w-xl text-lg font-medium leading-relaxed text-drew-soft-white sm:text-xl md:text-2xl" style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}>
            We don't concentrate it, add to it, or heat it. What's in the bottle is what came out of the coconut.
          </p>
          <Link
            to="/product"
            className="gsap-hero-reveal mt-8 inline-flex items-center px-8 py-3 bg-drew-deep-green text-drew-soft-white font-extrabold text-lg rounded-full transition-all duration-300 ease-out transform-gpu hover:bg-drew-lime-accent hover:text-drew-deep-green hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-xl"
          >
            Shop Now →
          </Link>
        </div>
      </div>
      </div>
      
      {/* Scroll Indicator */}
    </section>
  );
};

export default Hero;
