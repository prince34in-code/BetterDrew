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
    title: 'Hydration that fits your day.',
    description: 'A clean source of natural electrolytes, made for everyday moments.',
    className: 'md:order-2 md:col-start-2 md:col-span-2 md:row-start-1 bg-orange-100 text-drew-deep-green md:h-[250px]',
  },
  {
    type: 'image',
    imageUrl: benefitLandscape1,
    alt: 'Woman smiling and holding a bottle of Betterdrew coconut water',
    className: 'md:order-3 md:col-start-2 md:row-start-2 md:h-[290px]',
  },
  {
    type: 'text',
    title: 'Simple ingredients.\nA better choice.',
    description: 'No added sugar. No preservatives. Just young coconut water.',
    className: 'md:order-5 md:col-start-2 md:col-span-2 md:row-start-3 bg-rose-200 text-drew-deep-green text-center md:h-[250px]',
  },
  {
    type: 'image',
    imageUrl: benefitLandscape2,
    alt: 'Woman meditating with a bottle of Betterdrew coconut water',
    className: 'md:order-6 md:col-start-1 md:row-start-3 md:h-[290px]',
  },
  {
    type: 'text',
    title: 'Better hydration.\nBetter every day.',
    description: 'Pure young coconut water, naturally refreshing and thoughtfully made.',
    className: 'md:order-1 md:col-start-1 md:row-start-1 md:row-span-2 bg-drew-deep-green text-drew-soft-white md:h-[560px]',
  },
  {
    type: 'image',
    imageUrl: benefitPortrait1,
    alt: 'Woman holding a bottle of Betterdrew coconut water after a workout',
    className: 'md:order-4 md:col-start-3 md:row-start-2 md:row-span-2 md:h-[560px]',
  },
];

const GridCard = ({
  card,
}: {
  card: (typeof gridCardsData)[number];
}) => {
  if (card.type === 'image') {
    return (
      <div className={`grid-card group relative min-h-[240px] md:min-h-0 overflow-hidden rounded-2xl sm:rounded-3xl shadow-soft ${card.className}`}>
        <img
          src={card.imageUrl}
          alt={card.alt}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
      </div>
    );
  }

  return (
    <div
      className={`grid-card relative flex min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-soft transition-transform duration-300 ease-out hover:-translate-y-0.5 ${card.className}`}
    >
      <div>
        <div className="mb-5 h-1 w-10 rounded-full bg-current opacity-30" />
        
        <h3 className="whitespace-pre-line text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
          {card.title}
        </h3>

        <p className="mt-3 max-w-md text-base leading-relaxed opacity-80 sm:text-lg">
          {card.description}
        </p>
      </div>

      {(card.className.includes('bg-drew-deep-green') || card.className.includes('bg-orange-100')) && (
        <button
          type="button"
          className={`mt-6 w-fit rounded-full px-5 py-2.5 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 ${
            card.className.includes('bg-drew-deep-green') ? 'bg-drew-warm-ivory text-drew-deep-green' : 'bg-drew-deep-green text-drew-soft-white'
          }`}
        >
          Learn More →
        </button>
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
        {/* Masonry */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:auto-rows-auto md:grid-rows-[250px_290px_1fr]">
          {gridCardsData.map((card, index) => (
            <GridCard key={index} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;