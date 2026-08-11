import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveRight, Image } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- 1. DATA STRUCTURE ---
// Defines all properties for the editorial layout
// This data will be used for the cards in the carousel.
const cardData = [
  {
    id: 'morning',
    category: 'MORNING ROUTINE',
    title: 'Start Your Day Pure',
    description: 'Hydration that elevates your daily wellness ritual.',
  },
  {
    id: 'gym',
    category: 'GYM RECOVERY',
    title: 'Peak Performance',
    description: 'Electrolytes for rapid recovery and sustained energy.',
  },
  {
    id: 'office',
    category: 'OFFICE FOCUS',
    title: 'Mindful Hydration',
    description: 'Clear your mind and boost productivity naturally.',
  },
  {
    id: 'adventure',
    category: 'WEEKEND ADVENTURE',
    title: 'Explore Naturally',
    description: 'The perfect companion for all your outdoor escapades.',
  },
];

// --- 2. CARD COMPONENT ---
// Renders the premium placeholder and its typography
const PremiumPlaceholderCard: React.FC<{ card: typeof cardData[0], isCenter: boolean }> = ({ card, isCenter }) => {
  const isHero = isCenter; // The center card is always the "hero"

  return (
    // Card container for layout and transform
    <div
      data-id={card.id}
      className="lifestyle-card absolute top-0 left-0 w-[400px] h-[533px] rounded-[32px] will-change-transform"
      style={{
        transformOrigin: 'center center',
      }}
    >
      {/* Inner container for styling (shadow, bg, etc.) */}
      <div className={`relative w-full h-full rounded-[32px] overflow-hidden p-6 md:p-8 flex flex-col justify-between aspect-[3/4] border border-drew-soft-white/10 bg-drew-deep-green shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]`}>
        {/* Premium Background Styling */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-stone-50/15 to-transparent opacity-80" /> {/* Gradient */}
        <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22noise%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.8%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3CfeColorMatrix%20type%3D%22saturate%22%20values%3D%220%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23noise)%22%2F%3E%3C%2Fsvg%3E')] opacity-3" /> {/* Noise/Grain */}
        <div className="absolute inset-0 w-full h-full bg-black/5" style={{ boxShadow: 'inset 0px 0px 60px 15px rgba(0,0,0,0.2)' }} /> {/* Vignette & Inner Shadow */}

        {/* Centered Image Icon */}
        <div className="absolute inset-0 flex items-center justify-center text-white/20">
          <Image className={isHero ? 'w-16 h-16' : 'w-10 h-10'} strokeWidth={1} />
        </div>

        {/* Typography */}
        <div className="relative z-10 text-white">
          <p className={`font-semibold uppercase tracking-[.25em] ${isHero ? 'text-sm' : 'text-xs'}`}>{card.category}</p>
        </div>
        <div className={`relative z-10 text-white ${isHero ? 'pb-4' : ''}`}>
          <h3 className={`font-bold ${isHero ? 'text-4xl' : 'text-2xl'} mb-2`}>{card.title}</h3>
          {isHero && <p className="text-white/80 max-w-sm">{card.description}</p>}
          {isHero && (
            // The `pt-6` here creates the necessary space between the description and the button,
            // addressing the overlap issue and improving content flow.
            <div className="group/button inline-flex items-center pt-6 font-semibold text-white/90 hover:text-white transition-colors duration-300">
              Learn More
              <MoveRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/button:translate-x-1" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// --- 3. MAIN COMPONENT & ANIMATION ORCHESTRATION ---
const LifestyleGallery: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalCards = cardData.length;

  // Function to update carousel positions
  const updateCarousel = useCallback((newIndex: number) => {
    const cards = gsap.utils.toArray<HTMLDivElement>('.lifestyle-card');
    const duration = 1.2;
    const ease = 'power3.inOut';

    cards.forEach((card, i) => {
      const position = (i - newIndex + totalCards) % totalCards;

      // Center card
      if (position === 0) {
        gsap.to(card, {
          x: 0,
          z: 0,
          scale: 1,
          rotationY: 0,
          opacity: 1,
          zIndex: 100,
          duration,
          ease,
        });
      } 
      // Cards to the right
      else if (position > 0 && position <= Math.floor(totalCards / 2)) {
        const distance = position;
        gsap.to(card, {
          x: 250 * distance,
          z: -300 * distance,
          scale: Math.max(0, 1 - 0.2 * distance),
          rotationY: -45,
          opacity: 1 - 0.3 * distance,
          zIndex: 100 - distance * 10,
          duration,
          ease,
        });
      } 
      // Cards to the left
      else {
        const distance = totalCards - position;
        gsap.to(card, {
          x: -250 * distance,
          z: -300 * distance,
          scale: Math.max(0, 1 - 0.2 * distance),
          rotationY: 45,
          opacity: 1 - 0.3 * distance,
          zIndex: 100 - distance * 10,
          duration,
          ease,
        });
      }
    });
  }, [totalCards]);

  // Initial setup and auto-play
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial positions without animation
      updateCarousel(currentIndex);

      // Auto-slide interval
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % totalCards);
      }, 3000);

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, [totalCards, updateCarousel]); // Run only once on mount

  // Trigger animation when currentIndex changes
  useEffect(() => {
    updateCarousel(currentIndex);
  }, []);

  useEffect(() => {
    updateCarousel(currentIndex);
  }, [currentIndex, updateCarousel]);

  return (
    <section className="bg-drew-lifestyle-bg py-section-py-lg overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-24 md:mb-32">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-green">Pure, Natural Hydration</h2>
          <p className="text-lg text-near-black mt-2 max-w-2xl mx-auto">
            BetterDrew is more than just a beverage; it's a perfect partner for a healthy, active, and mindful lifestyle.
          </p>
        </div>

        {/* 3D Coverflow Carousel */}
        <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center" style={{ perspective: '2000px' }}>
          <div className="relative w-[400px] h-[533px]" style={{ transformStyle: 'preserve-3d' }}>
            {cardData.map((card, index) => (
              <PremiumPlaceholderCard key={card.id} card={card} isCenter={index === currentIndex} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleGallery;
