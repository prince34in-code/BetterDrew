import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-drew-soft-border">
      <button
        className="w-full flex justify-between items-center text-left py-6"
        onClick={onToggle}
      >
        <h3 className="text-xl font-semibold text-forest-green">{question}</h3>
        <ChevronDown
          size={24}
          className={`text-forest-green transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <p className="pb-6 text-near-black pr-8">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Is BetterDrew suitable for children?',
      a: "Yes, our coconut water is 100% natural and safe for all ages. It's a fantastic, healthy alternative to sugary drinks.",
    },
    {
      q: 'Where do you source your coconuts from?',
      a: 'We partner with sustainable farms in the tropical regions of Southeast Asia, known for their sweet and nutrient-rich coconuts.',
    },
    {
      q: 'How should I store the coconut water?',
      a: 'For the best taste and freshness, refrigerate after opening and consume within 3 days. Unopened bottles can be stored in a cool, dry place.',
    },
    {
      q: 'Is the packaging environmentally friendly?',
      a: 'Absolutely. Our bottles are made from 100% recycled materials and are fully recyclable. We are committed to protecting our planet.',
    },
    {
      q: 'What does "Cold Extracted" mean?',
      a: 'It means we use a high-pressure process without heat to extract the water. This preserves the delicate flavor and vital nutrients that are often lost in traditional pasteurization.',
    },
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-warm-white py-section-py-lg">
      <div className="container mx-auto px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-green">Frequently Asked Questions</h2>
          </div>
          <div className="border border-drew-soft-border rounded-container-radius p-4 sm:p-8">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
