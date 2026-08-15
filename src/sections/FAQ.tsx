import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { faqData, FaqItem } from '@/data/faq';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }: AccordionItemProps) => {
  return (
    <div className="border-b border-drew-soft-border/70 faq-item-reveal">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left text-lg font-medium text-drew-deep-green py-5"
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <svg className="w-5 h-5 text-drew-secondary-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', marginTop: '8px' },
              collapsed: { opacity: 0, height: 0, marginTop: 0 },
            }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden text-drew-secondary-text"
          >
            <p className="pt-2 pb-4 pr-8">{answer}</p>
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
        <div className="bg-drew-warm-ivory/80 backdrop-blur-sm rounded-2xl shadow-soft p-2 sm:p-4">
          {faqData.map((item, index) => (
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
