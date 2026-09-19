import React from 'react';
import SitePageShell from '@/components/common/SitePageShell';

const StoryPage: React.FC = () => (
  <SitePageShell
    eyebrow="Our Story"
    title="Start with what the label can prove."
    description="Betterdrew began with a simple question: why add more to a drink that already does the job?"
    canonical="/our-story"
  >
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <article className="rounded-3xl bg-drew-soft-white p-7 shadow-soft sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-drew-coconut-green">The beginning</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-drew-deep-green">One ingredient. A shorter distance between source and bottle.</h2>
        <div className="mt-6 space-y-5 leading-8 text-drew-secondary-text">
          <p>We started Betterdrew after seeing hydration products turn a useful drink into a long ingredient list. Young coconut water already carries the electrolytes people look for. We chose to keep that visible.</p>
          <p>Our process is built around speed. Each batch is cut, extracted, and bottled within hours. The bottle is made to stay close to the coconut, not to imitate it with flavors or concentrates.</p>
          <p>That standard gives us a clear test: if an ingredient does not belong in tender coconut water, it does not belong in Betterdrew.</p>
        </div>
      </article>
      <aside className="rounded-3xl bg-drew-deep-green p-7 text-drew-cream shadow-soft sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-drew-lime-accent">What we stand for</p>
        <ul className="mt-7 space-y-7">
          <li><strong className="block text-xl">Source clearly.</strong><span className="mt-2 block text-drew-soft-white/70">We name the ingredient and keep the claim checkable.</span></li>
          <li><strong className="block text-xl">Make less.</strong><span className="mt-2 block text-drew-soft-white/70">No added sugar. No preservatives. No flavoring.</span></li>
          <li><strong className="block text-xl">Bottle for real days.</strong><span className="mt-2 block text-drew-soft-white/70">The drink is designed for the commute, the workout, and the hours after.</span></li>
        </ul>
      </aside>
    </div>
  </SitePageShell>
);

export default StoryPage;
