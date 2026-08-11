import React from 'react';

const FinalCTA: React.FC = () => {
  return (
    <section className="bg-soft-sand">
      <div className="container mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-bold text-forest-green mb-8">
            Experience Pure Hydration
          </h2>
          <button className="bg-forest-green text-warm-white px-12 py-5 rounded-full font-semibold text-xl hover:bg-muted-gold hover:text-forest-green transition-all duration-300 transform hover:scale-105">
            Buy Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
