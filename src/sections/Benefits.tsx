import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import benefitLandscape1 from '@/assets/benefits/benefit-landscape-1.webp';
import benefitLandscape2 from '@/assets/benefits/benefit-landscape-2.webp';
import benefitPortrait1 from '@/assets/benefits/benefit-portrait-1.webp';

gsap.registerPlugin(ScrollTrigger);

const gridCardsData = [
  {
    type: 'text',
    title: 'Hydration your body actually recognizes.',
    description: 'Coconut water carries the same electrolyte profile your cells lose through sweat — sodium, potassium, magnesium — in a ratio your body does not have to work to absorb.',
    className: 'md:order-2 md:col-start-2 md:col-span-2 md:row-start-1 md:h-[337px] bg-orange-100 text-drew-deep-green',
  },
  {
    type: 'image',
    imageUrl: benefitLandscape1,
    alt: 'Before the day starts',
    className: 'md:order-3 md:col-start-2 md:row-start-2 md:h-[337px]',
  },
  {
    type: 'text',
    title: 'One ingredient. That is the whole list.',
    description: 'No stabilizers, no flavor concentrate, no added sugar to mask anything — because there is nothing to mask.',
    className: 'md:order-5 md:col-start-1 md:col-span-3 md:row-start-3 md:h-[337px] bg-rose-200 text-drew-deep-green text-center',
  },
  {
    type: 'image',
    imageUrl: benefitLandscape2,
    alt: 'Between sets',
    className: 'md:order-6 md:col-start-1 md:row-start-2 md:h-[337px]',
  },
  {
    type: 'text',
    title: 'Every bottle, the same day it was opened.',
    description: 'We do not hold inventory for months. Each batch is cut, extracted, and bottled within hours — so what you drink is close to what you would get straight from the coconut.',
    className: 'md:order-1 md:col-start-1 md:row-start-1 md:h-[337px] bg-drew-deep-green text-drew-soft-white',
  },
  {
    type: 'image',
    imageUrl: benefitPortrait1,
    alt: 'After, not during',
    className: 'md:order-4 md:col-start-3 md:row-start-2 md:row-span-2 md:h-[674px]',
  },
];

const GridCard = ({
  card,
}: {
  card: (typeof gridCardsData)[number];
}) => {
  if (card.type === 'image') {
    return (
      <div className={`grid-card group relative min-h-[200px] sm:min-h-[240px] md:min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl shadow-soft ${card.className}`}>
        <img
          src={card.imageUrl}
          alt={card.alt}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
          decoding="async"
          width={card.alt === 'After, not during' ? 480 : 640}
          height={card.alt === 'After, not during' ? 640 : 360}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`grid-card relative flex min-h-[200px] flex-col overflow-hidden rounded-2xl sm:min-h-[240px] md:min-h-0 sm:rounded-3xl p-5 sm:p-8 shadow-soft transition-transform duration-300 ease-out hover:-translate-y-0.5 ${card.className}`}
    >
      <div>
        <div className="mb-4 h-1 w-10 rounded-full bg-current opacity-30 sm:mb-5" />
        
        <h3 className="whitespace-pre-line text-xl font-bold leading-tight tracking-tight sm:text-3xl">
          {card.title}
        </h3>

        <p className="mt-2 max-w-md text-base leading-relaxed opacity-80 sm:mt-3 sm:text-lg">
          {card.description}
        </p>
      </div>

      {(card.className.includes('bg-drew-deep-green') || card.className.includes('bg-orange-100')) && (
        <a
          href="/product"
          className={`mt-4 w-fit rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 sm:mt-6 ${
            card.className.includes('bg-drew-deep-green') ? 'bg-drew-warm-ivory text-drew-deep-green' : 'bg-drew-deep-green text-drew-soft-white'
          }`}
        >
          Learn More →
        </a>
      )}
    </div>
  );
};

const Benefits = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = gsap.utils.toArray<HTMLElement>('.grid-card', section);

    const mm = gsap.matchMedia(section);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      cards.forEach((card, index) => {
        const isImageCard = card.querySelector('img') !== null;
        const content = isImageCard ? card.querySelector('img') : card.querySelectorAll('h3, p, div:first-child');

        if (!content) return;

        // Define different "scatter" patterns
        const patterns = [
          { x: -20, y: 20, r: -3 },  // from top-left
          { x: 20, y: 20, r: 2 },   // from top-right
          { x: 0, y: 30, r: 0 },    // from top
          { x: -25, y: 0, r: -2 },  // from left
          { x: 25, y: -15, r: 3 },  // from bottom-right
          { x: 0, y: -25, r: 0 },   // from bottom
        ];
        const pattern = patterns[index % patterns.length];

        if (!isImageCard) {
          gsap.fromTo(card,
            {
              autoAlpha: 0,
              transformOrigin: 'center center',
            },
            {
              autoAlpha: 1,
              duration: 0.1,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              }
            }
          );
        }

        gsap.from(content, {
          x: pattern.x,
          y: pattern.y,
          scale: isImageCard ? 1.1 : 1,
          rotate: pattern.r,
          stagger: isImageCard ? 0 : 0.05,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        });
      });
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-drew-warm-ivory py-8 px-4"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-8">
          <span className="inline-block rounded-full bg-drew-lime-accent/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-drew-deep-green">
            Why It Works
          </span>
        </div>
        {/* Masonry */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {gridCardsData.map((card, index) => (
            <GridCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;