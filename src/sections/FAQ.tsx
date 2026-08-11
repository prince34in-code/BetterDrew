import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

// This data is legacy and will be replaced by data from a central store.
const faqData = [
  {
    question: 'What is Betterdrew?',
    answer: 'Betterdrew is young coconut water made from tender coconuts, naturally refreshing and free from added sugar and preservatives.',
  },
  {
    question: 'What is in Betterdrew?',
    answer: 'Betterdrew contains young coconut water with vitamin C. It has no added sugar and no preservatives.',
  },
  {
    question: 'Does Betterdrew contain added sugar?',
    answer: 'No. Betterdrew contains 0g added sugar.',
  },
  {
    question: 'Is Betterdrew lactose and gluten free?',
    answer: 'Yes. Betterdrew is lactose free and gluten free.',
  },
  {
    question: 'Where can I buy Betterdrew?',
    answer: 'You can purchase Betterdrew directly through our website. Select your preferred pack size and continue to checkout.',
  },
  {
    question: 'How should I store Betterdrew?',
    answer: 'Store Betterdrew hygienically as directed on the package. For the best experience, serve chilled.',
  },
  {
    question: 'How long can I keep it after opening?',
    answer: 'Consume within 5 days of opening the pack, as stated on the product packaging.',
  },
  {
    question: 'Does Betterdrew contain preservatives?',
    answer: 'No. Betterdrew contains no preservatives.',
  },
];

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}
const AccordionItem: React.FC<AccordionItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-drew-soft-border/70">
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => { // @ts-ignore
        const headerElements = section.querySelectorAll('.faq-header-reveal');
        const accordionElement = section.querySelector('.faq-accordion-reveal');

        if (section) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 75%',
                    toggleActions: 'play none none none',
                },
            });

            if (headerElements.length > 0) {
                tl.fromTo(headerElements, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out' });
            }
            if (accordionElement) {
                tl.fromTo(accordionElement, { y: 20, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power2.out' }, headerElements.length > 0 ? "-=0.5" : 0);
            }
        }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={sectionRef} className="w-full bg-drew-warm-ivory py-8 px-4">
      <div className="max-w-[1400px] mx-auto bg-drew-soft-white rounded-3xl shadow-soft overflow-hidden p-8 md:p-12 lg:p-16">
        <div className="text-center mb-12 sm:mb-14 lg:mb-16">
          <div className="faq-header-reveal invisible inline-block bg-muted-gold/20 text-muted-gold text-sm font-semibold px-4 py-1.5 rounded-full uppercase tracking-medium">SUPPORT</div>
          <h2 className="faq-header-reveal invisible mt-5 text-4xl font-bold tracking-tight text-forest-green sm:text-5xl lg:text-[52px] lg:leading-tight">Everything you need to know.</h2>
        </div>
        <div className="faq-accordion-reveal invisible bg-drew-warm-ivory/80 backdrop-blur-sm rounded-2xl shadow-soft p-2 sm:p-4">
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
