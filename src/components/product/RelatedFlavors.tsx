import React from 'react';

interface FlavorCardProps {
  name: string;
  imageSrc: string;
  bgColor: string;
}

const FlavorCard: React.FC<FlavorCardProps> = ({ name, imageSrc, bgColor }) => (
  <a href="#" className="block group">
    <div className={`rounded-container-radius p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${bgColor}`}>
      <div className="relative h-64 mb-6">
        <img 
          src={imageSrc} 
          alt={name}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="text-2xl font-bold text-forest-green text-center">{name}</h3>
    </div>
  </a>
);

const RelatedFlavors: React.FC = () => {
  const flavors = [
    { name: 'Original', imageSrc: 'https://placehold.co/400x600/FDFBF5/0A2A29?text=Bottle', bgColor: 'bg-soft-sand/50' },
    { name: 'Strawberry', imageSrc: 'https://placehold.co/400x600/F472B6/FFFFFF?text=Bottle', bgColor: 'bg-pink-100' },
    { name: 'Mango', imageSrc: 'https://placehold.co/400x600/FBBF24/FFFFFF?text=Bottle', bgColor: 'bg-yellow-100' },
    { name: 'Lychee', imageSrc: 'https://placehold.co/400x600/FCA5A5/FFFFFF?text=Bottle', bgColor: 'bg-red-100' },
  ];

  return (
    <section className="bg-warm-white py-section-py-lg">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-forest-green">Explore Other Flavors</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {flavors.map((flavor, index) => (
            <FlavorCard
              key={index}
              name={flavor.name}
              imageSrc={flavor.imageSrc}
              bgColor={flavor.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedFlavors;
