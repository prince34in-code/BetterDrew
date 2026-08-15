import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

import { lifestyleData, LifestyleItem } from '@/data/lifestyle';

gsap.registerPlugin(ScrollTrigger);

type LifestyleCardProps = LifestyleItem & {
  index: number;
};

const LifestyleCard = ({ category, title, description, imageUrl, index }: LifestyleCardProps) => {
  const isReversed = index % 2 !== 0; // For alternating image/text

  return (
    <div className={`lifestyle-card group relative flex flex-col md:flex-row w-full overflow-hidden rounded-3xl bg-drew-soft-white/80 shadow-lg`}>
      {/* Image Section */}
      <div className={`relative w-full md:w-1/2 h-56 sm:h-64 md:h-80 overflow-hidden ${isReversed ? 'md:order-2' : ''}`}>
        {/* This inner div is the one that will be scaled and moved */}
        <img
          src={imageUrl}
          alt={title}
          className="gsap-image-reveal h-full w-full object-cover"
          loading="lazy"
          width="640"
          height="360"
        />
        <div className="absolute inset-0 shadow-inner-light" />
      </div>

      {/* Content Section */}
      <div className={`flex w-full flex-col justify-center p-6 sm:p-8 md:w-1/2 lg:p-12 ${isReversed ? 'md:order-1' : ''}`}>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-drew-secondary-text">
          {category}
        </span>
        <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-drew-deep-green" style={{ fontWeight: 600 }}>
          {title}
        </h3>
        <p className="mt-3 text-base text-drew-secondary-text leading-relaxed">
          {description}
        </p>
        <a
          href="/about"
          className="group/cta mt-4 sm:mt-6 flex items-center font-semibold text-drew-deep-green transition-colors duration-300 hover:text-drew-coconut-green"
        >
          Learn More
          <div className="relative ml-2 flex h-4 w-4 items-center justify-center">
            <ArrowRight className="h-full w-full transition-transform duration-300 ease-out group-hover/cta:translate-x-1.5" />
            <ArrowRight className="absolute left-0 h-full w-full -translate-x-full scale-x-0 transform text-drew-coconut-green opacity-0 transition-all duration-300 ease-out group-hover/cta:translate-x-0 group-hover/cta:scale-x-100 group-hover/cta:opacity-100" />
          </div>
        </a>
      </div>
    </div>
  );
};

const Lifestyle = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia(container);

    mm.add("(min-width: 768px)", () => {
      const cards = gsap.utils.toArray<HTMLElement>('.lifestyle-card');
      cards.forEach((card, index) => {
        const image = card.querySelector('.gsap-image-reveal');
        const textContent = card.querySelectorAll('span, h3, p, a');

        if (!image || textContent.length === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 70%',
            scrub: true,
          }
        });

        const xPercent = index % 2 === 0 ? -5 : 5;

        tl.from(image, {
          scale: 1.08,
          xPercent: xPercent,
          clipPath: 'inset(0% 50% 0% 50%)',
          ease: 'power2.out',
        })
        .from(textContent, {
          y: 30,
          clipPath: 'inset(0% 0% 100% 0%)',
          stagger: 0.05,
          ease: 'power2.out',
        }, '<0.1');
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full bg-drew-warm-ivory py-8 px-4">
      <div className="max-w-[1400px] mx-auto bg-drew-warm-ivory rounded-3xl shadow-soft overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <div className="lifestyle-header-reveal inline-block bg-drew-lime-accent/30 text-drew-deep-green text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
            Lifestyle
          </div>
          <h2 className="lifestyle-header-reveal mt-5 text-4xl max-w-xs mx-auto sm:max-w-none sm:mx-0 sm:text-5xl lg:text-[52px] font-bold tracking-tight leading-tight text-drew-deep-green">
            Hydration For Every Moment.
          </h2>
          <p className="lifestyle-header-reveal hidden sm:block mt-4 max-w-2xl mx-auto text-lg leading-relaxed text-drew-secondary-text sm:text-xl">
            Pure young coconut water, naturally refreshing and thoughtfully made for everyday life.
          </p>
        </div>
        <div className="space-y-5 sm:space-y-6 lg:space-y-8">
          {lifestyleData.map((item, index) => (
            <LifestyleCard key={item.title} {...item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lifestyle;
