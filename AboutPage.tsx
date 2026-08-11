import React from 'react';
import BrandStory from '@/sections/BrandStory';
import Footer from '@/sections/Footer';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-drew-warm-ivory">
      <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4">
        {/* Reusing the existing BrandStory section for the About page content */}
        <BrandStory />
      </div>
      <Footer /> {/* Footer already has its own consistent padding */}
    </div>
  );
};

export default AboutPage;