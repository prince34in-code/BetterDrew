import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

import { faqData } from '@/data/faq';
import { prefersReducedMotion } from '@/utils/motion';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick, index }: AccordionItemProps) => {
  const itemNumber = String(index + 1).padStart(2, '0');

  return (
    <div className="faq-item-reveal overflow-hidden rounded-[28px] border border-drew-soft-border/60 bg-drew-cream shadow-[0_14px_34px_rgba(18,59,42,0.07)] transition-shadow duration-300 ease-out hover:shadow-[0_18px_40px_rgba(18,59,42,0.1)]">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-5 pb-4 pt-5 text-left sm:gap-6 sm:px-7 sm:pb-5 sm:pt-6 lg:px-8"
      >
        <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-drew-deep-green/10 bg-drew-soft-white text-xs font-bold leading-none text-drew-deep-green shadow-[inset_0_0_0_1px_rgba(18,59,42,0.04)] sm:h-11 sm:w-11 sm:text-sm">
          {itemNumber}
        </span>
        <span className="min-w-0 flex-1 text-base font-bold leading-snug text-drew-deep-green sm:text-xl lg:text-2xl">
          {question}
        </span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-drew-warm-ivory/80 text-drew-deep-green sm:h-11 sm:w-11"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2.25} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden text-drew-secondary-text"
          >
            <p className="px-5 pb-6 pl-[4.75rem] text-sm leading-7 sm:pl-[6.25rem] sm:pr-16 sm:text-base lg:pl-[6.75rem]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const headerElements = gsap.utils.toArray('.faq-header-reveal');
      const faqItems = gsap.utils.toArray('.faq-item-reveal');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // Start animation when 80% of the section is in view
          once: true, // Play the animation only once
        },
      });

      tl.from(headerElements, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      }).from(faqItems, {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');
    }, section);
    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="w-full bg-drew-warm-ivory py-8 px-4">
      <div className="max-w-[1400px] mx-auto bg-drew-soft-white rounded-3xl shadow-soft overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <div className="faq-header-reveal inline-block bg-muted-gold/20 text-muted-gold text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-medium">SUPPORT</div>
          <h2 className="faq-header-reveal mt-5 text-4xl font-bold tracking-tight text-forest-green sm:text-5xl lg:text-[52px] lg:leading-tight">Everything you need to know.</h2>
        </div>
        <div className="mx-auto max-w-5xl space-y-4 sm:space-y-5 lg:space-y-6">
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
