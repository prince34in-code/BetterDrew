import React from 'react';
import SitePageShell from '@/components/common/SitePageShell';

const nutrition = [
  ['Energy', '20 kcal'],
  ['Carbohydrates', '5 g'],
  ['Total sugar', '4 g'],
  ['Added sugar', '0 g'],
  ['Sodium', '40 mg'],
  ['Potassium', '265 mg'],
];

const ProductDetailsPage: React.FC = () => (
  <SitePageShell
    eyebrow="Product Details"
    title="Read the bottle, all the way through."
    description="The specification page for Betterdrew Young Coconut Water. Values below are listed per 100 ml."
    canonical="/product-details"
  >
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-3xl bg-drew-deep-green p-7 text-drew-cream shadow-soft sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-drew-lime-accent">Ingredients</p>
        <h2 className="mt-4 text-3xl font-bold">Tender coconut water + Vitamin C.</h2>
        <p className="mt-5 leading-8 text-drew-soft-white/75">That is the ingredient statement. Betterdrew contains no added sugar and no preservatives.</p>
        <div className="mt-10 border-t border-white/15 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-drew-lime-accent">FSSAI license</p>
          <p className="mt-2 text-2xl font-bold tracking-wide">22726441001001</p>
        </div>
      </section>
      <section className="rounded-3xl bg-drew-soft-white p-7 shadow-soft sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-drew-coconut-green">Nutrition facts</p>
        <h2 className="mt-4 text-3xl font-bold text-drew-deep-green">Per 100 ml</h2>
        <div className="mt-7 divide-y divide-drew-soft-border">
          {nutrition.map(([label, value]) => <div key={label} className="flex items-center justify-between py-4 text-drew-secondary-text"><span>{label}</span><strong className="text-drew-deep-green">{value}</strong></div>)}
        </div>
      </section>
    </div>
  </SitePageShell>
);

export default ProductDetailsPage;
