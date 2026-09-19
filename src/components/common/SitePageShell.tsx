import React from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from '@/sections/Footer';

type SitePageShellProps = {
  title: string;
  eyebrow: string;
  description: string;
  canonical: string;
  children: React.ReactNode;
};

const SitePageShell: React.FC<SitePageShellProps> = ({ title, eyebrow, description, canonical, children }) => (
  <div className="bg-drew-warm-ivory">
    <Helmet>
      <title>{title} | Betterdrew</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://betterdrew.com${canonical}`} />
    </Helmet>
    <header className="bg-drew-deep-green px-4 pb-14 pt-32 text-drew-cream sm:pb-20">
      <div className="mx-auto max-w-[1200px]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-drew-lime-accent">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-drew-soft-white/75">{description}</p>
      </div>
    </header>
    <main className="mx-auto max-w-[1200px] px-4 py-8 sm:py-12">
      {children}
    </main>
    <Footer />
  </div>
);

export default SitePageShell;
