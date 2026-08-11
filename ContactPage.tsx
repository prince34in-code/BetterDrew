import React from 'react';
import Footer from '@/sections/Footer';

const ContactPage: React.FC = () => {
  return (
    <div className="pt-24">
      <section className="w-full max-w-4xl mx-auto my-12 sm:my-16 lg:my-24 text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-drew-deep-green tracking-tight">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-drew-secondary-text max-w-2xl mx-auto">
          We're here to help with any questions you may have.
        </p>
        <div className="mt-12 text-lg text-drew-secondary-text">
          Contact information will be available soon.
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;