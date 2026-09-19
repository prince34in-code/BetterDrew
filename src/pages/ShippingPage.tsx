import React from 'react';
import SitePageShell from '@/components/common/SitePageShell';

const ShippingPage: React.FC = () => (
  <SitePageShell
    eyebrow="Help"
    title="Shipping & Delivery"
    description="What to expect after you place a Betterdrew order. Final timelines and charges still need business confirmation."
    canonical="/shipping-delivery"
  >
    <div className="rounded-3xl border-2 border-drew-lime-accent/60 bg-drew-lime-accent/15 p-5 text-drew-deep-green">
      <strong>Needs real content:</strong> Confirm the delivery regions, courier service, delivery promise, and shipping thresholds before publishing this policy as final.
    </div>
    <div className="mt-8 grid gap-6 md:grid-cols-3">
      {[
        ['Where we deliver', 'We currently plan to serve addresses across India where our delivery partners operate.'],
        ['When it arrives', 'Placeholder estimate: 3–7 business days after order confirmation. Remote locations may take longer.'],
        ['Shipping cost', 'Placeholder policy: shipping is calculated at checkout. Confirm whether a free-shipping threshold applies.'],
      ].map(([title, copy]) => <section key={title} className="rounded-3xl bg-drew-soft-white p-7 shadow-soft"><h2 className="text-xl font-bold text-drew-deep-green">{title}</h2><p className="mt-4 leading-7 text-drew-secondary-text">{copy}</p></section>)}
    </div>
  </SitePageShell>
);

export default ShippingPage;
