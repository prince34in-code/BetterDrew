import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf } from 'lucide-react';
import HeroBackground from '@/assets/hero/background.webp';
import { prefersReducedMotion } from '@/utils/motion';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.type = 'image/webp';
    preload.href = HeroBackground;
    document.head.appendChild(preload);

    return () => {
      preload.remove();
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const headline = headlineRef.current;
    const contentElements = heroContentRef.current?.querySelectorAll('.gsap-hero-reveal:not(h1)');
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
    <>
    <section 
      ref={containerRef}
      id="home"
      className="w-full"
    >
      <div 
        className="relative flex h-auto min-h-0 w-full flex-col overflow-hidden bg-drew-deep-green min-[900px]:block min-[900px]:h-[90vh] min-[900px]:min-h-[720px]"
      >
        <div ref={bgImageRef}
        className="relative order-2 aspect-[16/9] h-auto w-full flex-none bg-cover bg-center bg-no-repeat will-change-transform min-[900px]:absolute min-[900px]:inset-y-0 min-[900px]:right-0 min-[900px]:order-none min-[900px]:aspect-auto min-[900px]:h-auto min-[900px]:w-[50%]"
        style={{
          backgroundImage: `url(${HeroBackground})`,
        }}
      />

      <div className="hidden min-[900px]:absolute min-[900px]:inset-y-0 min-[900px]:left-0 min-[900px]:z-10 min-[900px]:block min-[900px]:w-[50%] min-[900px]:bg-drew-deep-green" />
      <div className="hidden min-[900px]:absolute min-[900px]:inset-y-0 min-[900px]:left-0 min-[900px]:z-10 min-[900px]:block min-[900px]:w-[50%] min-[900px]:bg-gradient-to-r min-[900px]:from-drew-deep-green min-[900px]:via-drew-deep-green/95 min-[900px]:to-transparent" />

      <div ref={heroContentRef} className="relative order-1 flex h-auto min-h-0 w-full flex-none items-center px-5 pb-10 pt-24 sm:px-10 sm:pb-10 sm:pt-32 min-[900px]:z-20 min-[900px]:order-none min-[900px]:h-full min-[900px]:min-h-[720px] min-[900px]:w-[50%] min-[900px]:px-16 min-[900px]:py-24 xl:px-24">
        <div className="w-full max-w-[720px] text-left text-drew-soft-white">
          <div
            className="relative inline-block w-fit max-w-full translate-x-1 rounded-[6px]"
            style={{ transform: 'rotate(-1deg)' }}
          >
            <div className="absolute -bottom-2 -left-2 -right-1 -top-1 rounded-[6px] bg-drew-warm-ivory" aria-hidden="true" />
            <div className="relative z-10 rounded-[6px] bg-drew-cream px-6 py-7 shadow-[0_16px_32px_rgba(0,0,0,0.18)]">
              <h1
                ref={headlineRef}
                className="gsap-hero-reveal max-w-[720px] text-4xl font-black leading-[0.94] tracking-[-0.04em] text-drew-deep-green transition-[letter-spacing] duration-500 hover:tracking-[-0.01em] sm:text-5xl md:text-6xl min-[900px]:text-6xl xl:text-7xl"
                style={{ textShadow: 'none' }}
              >
                <span className="block">HYDRATION</span>
                <span className="block">FROM NATURE.</span>
              </h1>
            </div>
            <div className="absolute -right-3 -top-5 z-20 flex h-16 w-16 rotate-6 items-center justify-center rounded-full border border-drew-deep-green bg-drew-cream text-drew-deep-green shadow-[0_10px_20px_rgba(0,0,0,0.16)] sm:-right-4 sm:-top-6 sm:h-20 sm:w-20" aria-label="100% real coconut">
              <span className="absolute inset-1 flex items-start justify-center pt-1 text-[7px] font-bold uppercase tracking-[0.12em] leading-none">100% real</span>
              <Leaf className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.8} aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-1 text-center text-[7px] font-bold uppercase tracking-[0.12em] leading-none">coconut</span>
            </div>
          </div>
          <p className="gsap-hero-reveal mt-6 max-w-xl text-lg font-medium leading-relaxed text-drew-soft-white sm:text-xl md:text-2xl" style={{ textShadow: '0 1px 6px rgba(0, 0, 0, 0.5)' }}>
            Pure coconut water. Nothing unnecessary.
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
    </>
  );
};

export default Hero;
