import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X, ShieldCheck } from 'lucide-react';

import { betterdrewProduct } from '@/data/product';
import SugaryDrinkSilhouette from '@/assets/icons/sugary-drink-silhouette.svg';

gsap.registerPlugin(ScrollTrigger);

// The labels are kept to define the structure, but the values are placeholders
// as the original data was legacy and unverified for Betterdrew.
const comparisonData: ComparisonItem[] = [
    { label: 'Sugar', betterdrew: 4, others: 39, unit: 'g' },
    { label: 'Calories', betterdrew: 20, others: 140, unit: ' kcal' },
    { label: 'Natural Ingredients', betterdrew: 100, others: 0, unit: '%' },
    { label: 'Hydration', betterdrew: 'Excellent', others: 'Average' },
];

interface ComparisonItem {
  label: string;
  betterdrew: number | string;
  unit?: string;
  others: number | string;
}

const ComparisonRow = ({ item }: { item: ComparisonItem }) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const betterdrewBarRef = useRef<HTMLDivElement>(null);
    const othersBarRef = useRef<HTMLDivElement>(null);
    const betterdrewValueRef = useRef<HTMLDivElement>(null);
    const othersValueRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const row = rowRef.current;
        if (!row) return;

        const isNumeric = typeof item.betterdrew === 'number' && typeof item.others === 'number';
        let betterdrewWidth = 0;
        let othersWidth = 0;

        if (isNumeric) {
            const total = item.betterdrew + item.others;
            betterdrewWidth = total > 0 ? (item.betterdrew / (Math.max(item.betterdrew, item.others)) * 100) : 0;
            othersWidth = total > 0 ? (item.others / (Math.max(item.betterdrew, item.others)) * 100) : 0;
        } else {
            betterdrewWidth = item.betterdrew === 'Excellent' ? 100 : 0;
            othersWidth = item.others === 'Average' ? 50 : 0;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none',
            }
        });

        // Animate bars
        tl.fromTo(betterdrewBarRef.current, { width: '0%' }, { width: `${betterdrewWidth}%`, duration: 1.5, ease: 'power3.out' });
        tl.fromTo(othersBarRef.current, { width: '0%' }, { width: `${othersWidth}%`, duration: 1.5, ease: 'power3.out' }, '<');

        // Animate counters
        const animateCounter = (ref: React.RefObject<HTMLDivElement>, value: number) => {
            if (!ref.current) return;
            const el = ref.current;
            const counter = { value: 0 };
            tl.to(counter, {
                value: value,
                duration: 1.2,
                ease: 'power2.out',
                onUpdate: () => {
                    el.textContent = `${Math.round(counter.value)}${item.unit || ''}`;
                },
            }, "-=1.2");
        };

        if (isNumeric) {
            animateCounter(betterdrewValueRef, item.betterdrew as number);
            animateCounter(othersValueRef, item.others as number);
        }

    }, [item]);

    return (
        <div ref={rowRef} className="comparison-row invisible">
            <h4 className="text-base sm:text-lg font-semibold text-drew-dark-text mb-3">{item.label}</h4>
            <div className="space-y-2.5">
                {/* Betterdrew Bar */}
                <div className="flex items-center gap-4">
                    <div className="flex-grow h-2.5 rounded-full bg-drew-soft-border/60 shadow-inner overflow-hidden">
                        <div ref={betterdrewBarRef} className="h-full rounded-full bg-drew-lime-accent" />
                    </div>
                    <div ref={betterdrewValueRef} className="w-20 text-right text-sm font-bold text-drew-deep-green">
                        {typeof item.betterdrew === 'number' ? `0${item.unit || ''}` : item.betterdrew}
                    </div>
                </div>
                {/* Other Drinks Bar */}
                <div className="flex items-center gap-4">
                    <div className="flex-grow h-2.5 rounded-full bg-drew-soft-border/60 shadow-inner overflow-hidden">
                        <div ref={othersBarRef} className="h-full rounded-full bg-drew-secondary-text/50" />
                    </div>
                    <div ref={othersValueRef} className="w-20 text-right text-sm font-bold text-drew-secondary-text">
                        {typeof item.others === 'number' ? `0${item.unit || ''}` : item.others}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Comparison = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasVerifiedData = true; // Set to true to render the structure, data placeholders are handled internally.

  useEffect(() => {
    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 70%',
                toggleActions: 'play none none none',
            }
        });

        const headerElements = gsap.utils.toArray<HTMLElement>('.comparison-title, .comparison-subtitle');
        if (headerElements.length > 0) {
            tl.fromTo(headerElements, 
                { y: 20, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' }
            );
        }

        const columnElements = gsap.utils.toArray<HTMLElement>('.betterdrew-column, .others-column');
        if (columnElements.length > 0) {
            tl.fromTo(columnElements,
                { autoAlpha: 0 },
                { autoAlpha: 1, stagger: 0.2, duration: 1, ease: 'power2.out' },
                headerElements.length > 0 ? "-=0.5" : "0"
            );
        }

        const rows = gsap.utils.toArray<HTMLElement>('.comparison-row');
        if (rows.length > 0 && rows[0]) {
            gsap.fromTo(rows, { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.15, duration: 0.8, ease: 'power2.out', scrollTrigger: {
                trigger: rows[0], start: 'top 85%'
            }});
        }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-drew-warm-ivory py-8 px-4">
      <div className="max-w-[1400px] mx-auto bg-drew-soft-white rounded-3xl shadow-soft overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 lg:mb-16">
          <h2 className="comparison-title invisible text-4xl font-bold tracking-tight text-drew-deep-green sm:text-5xl lg:text-[52px] lg:leading-tight">
            Compare the Facts
          </h2>
          <p className="comparison-subtitle invisible mt-4 text-lg leading-relaxed text-drew-secondary-text sm:text-xl">
            Read beyond the buzzwords. See how we stack up.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-8 items-end mb-6 sm:mb-8 lg:mb-12">
            <div className="betterdrew-column invisible flex flex-col items-center gap-3 sm:gap-4">
                <img
                    src={betterdrewProduct.image}
                    alt={`${betterdrewProduct.brand} ${betterdrewProduct.name}`}
                    className="h-40 sm:h-56 md:h-64 lg:h-80 w-auto"
                    style={{ filter: 'drop-shadow(0px 15px 25px rgba(0, 0, 0, 0.1))' }}
                /><div className="flex items-center gap-2 px-3 py-1 bg-drew-lime-accent text-drew-deep-green rounded-full text-sm font-semibold"><Check className="w-4 h-4" /> Betterdrew</div>
            </div>
            <div className="others-column invisible flex flex-col items-center gap-3 sm:gap-4">
                <img
                    src={SugaryDrinkSilhouette}
                    alt="Other Sugary Drinks"
                    className="h-40 sm:h-56 md:h-64 lg:h-80 w-auto opacity-40"
                />
                <div className="flex items-center gap-2 px-3 py-1 bg-drew-soft-border/70 text-drew-secondary-text rounded-full text-sm font-semibold"><X className="w-4 h-4" /> Other Drinks</div>
            </div>
        </div>
        
        {hasVerifiedData ? (
          <div className="max-w-3xl mx-auto">
            {comparisonData.map((item, index) => (
              <ComparisonRow key={index} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-drew-secondary-text">Verified comparison data coming soon.</div>
        )}
      </div>
    </section>
  );
};

export default Comparison;
