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
}
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="faq-item-reveal group border-b border-drew-soft-border/70 last:border-b-0">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-6 py-4 text-left sm:py-5"
      >
        <span className={`min-w-0 flex-1 text-base font-bold leading-snug transition-colors duration-200 sm:text-lg lg:text-xl ${isOpen ? 'text-drew-lime-accent' : 'text-drew-deep-green group-hover:text-drew-lime-accent'}`}>
          {question}
        </span>
        <motion.span
          aria-hidden="true"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex h-5 w-5 flex-shrink-0 items-center justify-center text-drew-deep-green"
        >
          <ChevronDown className="h-4 w-4" strokeWidth={2} />
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
            <p className="pb-4 pr-8 text-sm leading-7 text-drew-secondary-text sm:pb-5 sm:pr-12 sm:text-base">
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
  const visibleFaqData = faqData.slice(0, 6);

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
    <section ref={sectionRef} className="w-full bg-drew-warm-ivory px-4 py-8">
      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[24px] bg-drew-soft-white px-6 py-10 shadow-soft sm:px-8 sm:py-12 md:px-12 md:py-16 lg:px-16">
        <div className="mb-8 text-center sm:mb-10">
          <div className="faq-header-reveal inline-block bg-drew-lime-accent text-drew-deep-green text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-medium">SUPPORT</div>
          <h2 className="faq-header-reveal mt-5 text-3xl font-bold tracking-tight text-drew-deep-green sm:text-4xl lg:text-5xl lg:leading-tight">Everything you need to know.</h2>
        </div>
        <div className="mx-auto max-w-4xl">
          {visibleFaqData.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
