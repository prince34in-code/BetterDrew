import React from 'react';
import { Leaf, Zap, Droplets, Heart } from 'lucide-react';

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description }) => (
  <div className="bg-warm-white border border-drew-soft-border rounded-container-radius p-8 text-center group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
    <div className="flex justify-center mb-6">
      <div className="bg-soft-sand/50 rounded-full p-4 group-hover:bg-muted-gold/30 transition-colors duration-300">
        {icon}
      </div>
    </div>
    <h3 className="text-2xl font-bold text-forest-green mb-2">{title}</h3>
    <p className="text-near-black">{description}</p>
  </div>
);

const WhyLoveIt: React.FC = () => {
  const benefits = [
    {
      icon: <Leaf size={32} className="text-forest-green" />,
      title: '100% Natural',
      description: 'Sourced from the best coconuts, with no artificial flavors.',
    },
    {
      icon: <Zap size={32} className="text-forest-green" />,
      title: 'Rich Electrolytes',
      description: 'Naturally packed with potassium and minerals for ultimate hydration.',
    },
    {
      icon: <Droplets size={32} className="text-forest-green" />,
      title: 'Cold Extracted',
      description: 'Our gentle process keeps nutrients and flavor intact.',
    },
    {
      icon: <Heart size={32} className="text-forest-green" />,
      title: 'Zero Added Sugar',
      description: 'Enjoy the natural sweetness of coconut, and nothing else.',
    },
  ];

  return (
    <section className="bg-warm-white py-section-py-lg">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-green">Why You'll Love It</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefit.icon}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyLoveIt;
