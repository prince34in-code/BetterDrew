import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Button from '@/components/ui/Button';

gsap.registerPlugin(ScrollTrigger);

const FinalCTA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const background = backgroundRef.current;
    const content = contentRef.current;

    if (container && background && content) {
      // Ken Burns effect on background
      gsap.to(background, {
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Content reveal animation
      gsap.from(content, {
        autoAlpha: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 60%',
        },
      });
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-soft-sand overflow-hidden py-32 sm:py-40 lg:py-48">
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900?jungle,lush')" }}
      />
      <div className="absolute inset-0 bg-forest-green/60" />

      <div className="relative h-full flex flex-col justify-end items-center text-center text-warm-white p-8">
        <div ref={contentRef}>
            <img 
                src="https://i.imgur.com/6bQpJyv.png" // Placeholder bottle image
                alt="BetterDrew Bottle"
                className="max-h-64 mx-auto mb-8"
            />
            <h2 className="text-5xl md:text-7xl font-bold">Ready for a Change?</h2>
            <p className="mt-4 text-xl opacity-90 max-w-2xl mx-auto">
                Embrace a healthier, more hydrated life. Your journey to purity starts now.
            </p>
            <div className="mt-12">
                <Button variant="outline">Find Your Drink</Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
