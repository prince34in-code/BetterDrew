import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
        const headerElements = gsap.utils.toArray<HTMLElement>('.reveal-header');
        if (headerElements.length > 0) {
            gsap.fromTo(headerElements, 
                { y: 20, autoAlpha: 0 }, 
                { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: headerElements[0], start: 'top 85%' } }
            );
        }

        const cards = gsap.utils.toArray<HTMLElement>('.reveal-card');
        if (cards.length > 0) {
            ScrollTrigger.batch(cards, {
                start: 'top 90%',
                onEnter: batch => {
                    gsap.to(batch, { autoAlpha: 1, scale: 1, duration: 0.8, ease: 'power2.out', stagger: 0.1 });
                }
            });
        }

        const footerElement = section.querySelector('.reveal-footer');
        if (footerElement) {
            gsap.fromTo(footerElement, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: footerElement, start: 'top 95%' } });
        }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Per Phase 5 rules, this section is conditional and should not render without real reviews.
  // Returning null to hide it for now, while keeping the file and its animation logic for later.
  return null;

  return (
    <section ref={sectionRef} className="w-full max-w-7xl mx-auto my-6 sm:my-8 lg:my-10 px-4 sm:px-6">
      <div className="bg-drew-soft-white rounded-[36px] md:rounded-[40px] shadow-[0_12px_40px_rgba(0,0,0,0.08)] overflow-hidden p-6 sm:p-8 lg:p-12">
      <div className="text-center mb-8 sm:mb-10 lg:mb-12">
        <div className="reveal-header invisible inline-block bg-muted-gold/20 text-muted-gold text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-medium">
          Social Proof
        </div>
        <h2 className="reveal-header invisible mt-4 text-4xl sm:text-5xl font-bold text-forest-green">What Our Customers Say</h2>
        <p className="reveal-header invisible mt-3 sm:mt-4 text-base sm:text-lg text-forest-green/80 max-w-xl mx-auto">
          Real reviews from real people.
        </p>
      </div>
      </div>
    </section>
  );
};

export default Testimonials;
