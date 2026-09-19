import React from 'react';
import SitePageShell from '@/components/common/SitePageShell';
import FAQ from '@/sections/FAQ';

const FAQPage: React.FC = () => (
  <SitePageShell
    eyebrow="Support"
    title="Questions, answered plainly."
    description="The same product and process answers from the homepage, collected in one place."
    canonical="/faq"
  >
    <FAQ />
  </SitePageShell>
);

export default FAQPage;
