import React from 'react';
import SitePageShell from '@/components/common/SitePageShell';

const TermsPage: React.FC = () => (
  <SitePageShell
    eyebrow="Legal"
    title="Terms of Service"
    description="The rules for using Betterdrew.com and placing orders through the site."
    canonical="/terms-of-service"
  >
    <article className="rounded-3xl bg-drew-soft-white p-7 shadow-soft sm:p-10">
      <p className="text-sm text-drew-secondary-text">Last updated: September 2026</p>
      <div className="mt-8 space-y-8 text-drew-secondary-text leading-8">
        <section><h2 className="text-2xl font-bold text-drew-deep-green">Using the site</h2><p className="mt-3">Use this site lawfully and provide accurate information when submitting forms or ordering products. Do not interfere with site operation, attempt unauthorized access, or misuse payment flows.</p></section>
        <section><h2 className="text-2xl font-bold text-drew-deep-green">Products and orders</h2><p className="mt-3">Product descriptions, prices, availability, and delivery estimates may change. An order is accepted only when Betterdrew or its payment and fulfilment partners confirm it. We may contact you if an item or address requires clarification.</p></section>
        <section><h2 className="text-2xl font-bold text-drew-deep-green">Payments</h2><p className="mt-3">Payments are processed through Razorpay. Payment completion does not remove your rights under applicable consumer law. Orders may be cancelled or refunded when payment, stock, or delivery issues prevent fulfilment.</p></section>
        <section><h2 className="text-2xl font-bold text-drew-deep-green">Content and liability</h2><p className="mt-3">Site content is provided for general product and support information. To the extent permitted by law, Betterdrew is not responsible for indirect loss caused by interruptions, third-party services, or events outside its reasonable control.</p></section>
        <section className="rounded-3xl border-2 border-drew-lime-accent/60 bg-drew-lime-accent/15 p-5 text-drew-deep-green"><strong>Needs real content:</strong> Add the legal business name, registered address, support email, governing law, and dispute venue before publication as final terms.</section>
      </div>
    </article>
  </SitePageShell>
);

export default TermsPage;
