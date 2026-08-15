import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import BrandStory from '@/sections/BrandStory';
import Footer from '@/sections/Footer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from('.gsap-about-hero-item', {
        opacity: 0,
        y: 20,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2,
      });

      // Principles Animation
      gsap.from('.gsap-manifesto-item', {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.principles-section',
          start: 'top 75%',
          once: true,
        }
      });

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-drew-warm-ivory">
      <Helmet>
        <title>About Us | Betterdrew</title>
        <meta name="description" content="Learn about Betterdrew's mission to provide better hydration with nothing unnecessary. We believe in simple, natural, and everyday wellness." />
        <link rel="canonical" href="https://betterdrew.com/about" />
        <meta property="og:title" content="About Us | Betterdrew" />
        <meta property="og:description" content="Learn about Betterdrew's mission to provide better hydration with nothing unnecessary." />
        <meta property="og:url" content="https://betterdrew.com/about" />
      </Helmet>
      {/* 2. About Hero */}
      <section className="relative w-full h-[40vh] sm:h-[45vh] lg:h-[50vh] bg-drew-deep-green flex flex-col justify-center items-center text-center px-4">
        <div className="max-w-4xl">
          <h1 className="gsap-about-hero-item text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
            About Us
          </h1>
          <p className="gsap-about-hero-item mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Better Hydration.
            <br />
            Nothing Unnecessary.
          </p>
        </div>
      </section>

      <BrandStory />

      {/* 4. Why Betterdrew */}
      <section className="principles-section w-full py-8 px-4">
        <div className="max-w-[1400px] mx-auto bg-drew-soft-white rounded-3xl shadow-soft p-8 md:p-12 lg:p-16">
          {/* Section Header */}
          <div className="gsap-manifesto-item max-w-5xl mb-16 md:mb-24">
            <div className="w-fit">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-drew-secondary-text">
                Why Betterdrew
              </h2>
              <div className="w-1/2 h-px bg-drew-lime-accent/50 mt-2" />
            </div>
            <p className="mt-4 text-xl sm:text-2xl font-medium text-drew-deep-green max-w-md">
              Three things we believe in. <br/>Three things we never compromise on.
            </p>
          </div>

          {/* Principle Rows */}
          <div className="max-w-5xl mx-auto">
            {([
              { num: '01', title: 'NATURAL.', desc1: 'Young coconut water.', desc2: 'Pure hydration from nature.' },
              { num: '02', title: 'SIMPLE.', desc1: 'Nothing unnecessary.', desc2: 'Just what your body needs.' },
              { num: '03', title: 'EVERYDAY.', desc1: 'Made for active days.', desc2: 'Hydration you can rely on.' },
            ] as const).map((item, index) => (
              <div key={item.num} className="gsap-manifesto-item py-8 md:py-10">
                <div className="grid grid-cols-1 md:grid-cols-[auto_auto_1fr_auto] md:items-center gap-y-4 md:gap-x-8">
                  {/* Number (Mobile) */}
                  <span className="md:hidden text-5xl font-bold text-drew-deep-green/20">{item.num}</span>
                  {/* Title (Mobile) */}
                  <h3 className="md:hidden text-5xl sm:text-6xl font-bold text-drew-deep-green uppercase">{item.title}</h3>

                  {/* Number (Desktop) */}
                  <span className="hidden md:block text-7xl lg:text-8xl font-bold text-drew-deep-green/10">{item.num}</span>
                  {/* Vertical Divider (Desktop) */}
                  <div className="hidden md:block h-2/3 w-px bg-drew-soft-border" />
                  {/* Title (Desktop) */}
                  <h3 className="hidden md:block text-6xl lg:text-8xl font-bold text-drew-deep-green uppercase">{item.title}</h3>

                  {/* Description (Shared) */}
                  <div className="md:justify-self-end text-left md:text-right">
                    <div className="flex items-center gap-3 justify-start md:justify-end">
                      <div className="w-1.5 h-1.5 rounded-full bg-drew-deep-green/30" />
                      <div className="w-10 h-px bg-drew-deep-green/30" />
                    </div>
                    <div className="mt-3 text-base sm:text-lg text-drew-secondary-text leading-relaxed">
                      <p>{item.desc1}</p>
                      <p>{item.desc2}</p>
                    </div>
                  </div>

                </div>
                {index < 2 && <hr className="border-drew-soft-border/50" />}
              </div>
            ))}
          </div>
          
          {/* Bottom Brand Statement */}
          <div className="gsap-manifesto-item max-w-5xl mx-auto mt-12">
            <hr className="border-drew-soft-border" />
            <div className="flex items-center gap-4 py-6">
              {/* Placeholder for a leaf icon */}
              <div className="w-6 h-6 rounded-full bg-drew-lime-accent/30" />
              <p className="text-lg sm:text-xl font-semibold text-drew-deep-green tracking-tight">CLEAN. HONEST. ALWAYS.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Existing Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;