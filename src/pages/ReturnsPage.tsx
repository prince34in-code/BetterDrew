import React from 'react';
import SitePageShell from '@/components/common/SitePageShell';

const ReturnsPage: React.FC = () => (
  <SitePageShell
    eyebrow="Help"
    title="Returns & Refunds"
    description="A clear starting point for damaged, incorrect, or undelivered orders. The final window and process need business confirmation."
    canonical="/returns-refunds"
  >
    <div className="rounded-3xl border-2 border-drew-lime-accent/60 bg-drew-lime-accent/15 p-5 text-drew-deep-green">
      <strong>Needs real content:</strong> Confirm the return window, support email, refund timing, and whether opened food or beverage products can be returned.
    </div>
    <div className="mt-8 space-y-6">
      {[
        ['Report a problem', 'Contact the Betterdrew team with your order number and a description of the issue. For damaged deliveries, include clear photos of the package and product.'],
        ['Eligible cases', 'Placeholder policy: incorrect, damaged, or materially compromised orders may qualify for replacement or refund after review.'],
        ['Refunds', 'Placeholder policy: approved refunds are sent to the original payment method after the review is complete. Confirm the expected processing time with the payment provider.'],
      ].map(([title, copy]) => <section key={title} className="rounded-3xl bg-drew-soft-white p-7 shadow-soft sm:p-9"><h2 className="text-2xl font-bold text-drew-deep-green">{title}</h2><p className="mt-4 max-w-3xl leading-8 text-drew-secondary-text">{copy}</p></section>)}
    </div>
  </SitePageShell>
);

export default ReturnsPage;
