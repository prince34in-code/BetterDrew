import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '@/data/site';

// Placeholder for the product label image. This asset needs to be created.
const ProductLabelImage = '/src/assets/product/label.png';

const Transparency = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo('.gsap-reveal', { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out' });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="transparency" className="w-full bg-drew-warm-ivory py-8 px-4">
      <div className="max-w-[1400px] mx-auto text-center">
        <h2 className="gsap-reveal text-4xl font-bold tracking-tight text-drew-deep-green sm:text-5xl lg:text-[52px] lg:leading-tight">{siteData.coreMessage}</h2>
        <p className="gsap-reveal mt-4 max-w-2xl mx-auto text-lg leading-relaxed text-drew-secondary-text sm:text-xl">
          We don't hide behind buzzwords. We believe you have the right to know exactly what's in your drink. Here are the facts.
        </p>
      </div>
    </section>
  );
};

export default Transparency;