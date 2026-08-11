import React from 'react';

function ProductHero() {
  return (
    // Using Warm Ivory for the section background
    <section className="bg-drew-warm-ivory text-center py-20 px-4">
      {/* Using Dark Text for the main heading */}
      <h1 className="text-5xl font-bold text-drew-dark-text mb-4">The Perfect Drink, Every Time</h1>
      <p className="text-xl text-drew-secondary-text mb-8">Experience the rich, smooth flavor of Better Drew.</p>
      {/* Button with Deep Green background, Soft White text, and a Lime Accent on hover */}
      <button className="bg-drew-deep-green text-drew-soft-white font-bold py-3 px-8 rounded-lg hover:bg-drew-lime-accent hover:text-drew-deep-green transition-colors">
        Shop Now
      </button>
    </section>
  );
}

export default ProductHero;