import React from 'react';

const NutritionFact: React.FC<{ label: string; value: string; isLast?: boolean }> = ({ label, value, isLast }) => (
  <div className={`flex justify-between items-center py-4 ${!isLast ? 'border-b border-drew-soft-border' : ''}`}>
    <span className="text-lg text-near-black">{label}</span>
    <span className="text-lg font-bold text-forest-green">{value}</span>
  </div>
);

const NutritionFacts: React.FC = () => {
  const facts = [
    { label: 'Calories', value: '45' },
    { label: 'Total Fat', value: '0g' },
    { label: 'Sodium', value: '65mg' },
    { label: 'Potassium', value: '600mg' },
    { label: 'Total Carbs', value: '11g' },
    { label: 'Total Sugars', value: '11g' },
    { label: 'Protein', value: '0g' },
  ];

  return (
    <section className="bg-warm-white py-section-py-lg">
      <div className="container mx-auto px-6 lg:px-8 flex justify-center">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-forest-green">Nutrition Facts</h2>
            <p className="text-lg text-near-black mt-2">Serving Size: 1 Bottle (500ml)</p>
          </div>
          <div className="bg-warm-white border border-drew-soft-border rounded-container-radius p-8 md:p-12 shadow-lg">
            {facts.map((fact, index) => (
              <NutritionFact
                key={index}
                label={fact.label}
                value={fact.value}
                isLast={index === facts.length - 1}
              />
            ))}
            <p className="text-sm text-muted-gold mt-6">* Not a significant source of other nutrients.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NutritionFacts;
