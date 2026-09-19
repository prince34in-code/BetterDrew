import React from 'react';
import SitePageShell from '@/components/common/SitePageShell';

const PrivacyPolicyPage: React.FC = () => (
  <SitePageShell
    eyebrow="Legal"
    title="Privacy Policy"
    description="How Betterdrew handles information submitted through this site and its checkout flows."
    canonical="/privacy-policy"
  >
    <article className="rounded-3xl bg-drew-soft-white p-7 shadow-soft sm:p-10">
      <p className="text-sm text-drew-secondary-text">Last updated: September 2026</p>
      <div className="mt-8 space-y-8 text-drew-secondary-text leading-8">
        <section><h2 className="text-2xl font-bold text-drew-deep-green">Information we collect</h2><p className="mt-3">We collect information you submit when you subscribe, contact us, or place an order, including your name, email address, phone number, shipping address, message, and order details. Cart contents are stored in your browser’s local storage so they survive a refresh.</p></section>
        <section><h2 className="text-2xl font-bold text-drew-deep-green">How we use it</h2><p className="mt-3">We use submitted information to respond to requests, send newsletter updates when you opt in, process orders, provide delivery support, prevent payment abuse, and improve the site.</p></section>
        <section><h2 className="text-2xl font-bold text-drew-deep-green">Service providers</h2><p className="mt-3">Newsletter email addresses are sent to Resend. Contact form submissions are sent to Formspree. Payment details are handled by Razorpay; Betterdrew does not receive or store full card numbers. These providers process data under their own privacy terms.</p></section>
        <section><h2 className="text-2xl font-bold text-drew-deep-green">Cookies and analytics</h2><p className="mt-3">The site may use essential browser storage and cookies required for navigation, cart persistence, and third-party service operation. We do not use submitted email addresses for unrelated marketing without consent.</p></section>
        <section><h2 className="text-2xl font-bold text-drew-deep-green">Your choices</h2><p className="mt-3">You can request access, correction, or deletion of personal information by contacting Betterdrew. You can unsubscribe from newsletter messages using the link in the message or by contacting us.</p></section>
        <section className="rounded-3xl border-2 border-drew-lime-accent/60 bg-drew-lime-accent/15 p-5 text-drew-deep-green"><strong>Needs real content:</strong> Add the legal business name, registered address, privacy contact email, and applicable jurisdiction before this policy is treated as final legal text.</section>
      </div>
    </article>
  </SitePageShell>
);

export default PrivacyPolicyPage;
