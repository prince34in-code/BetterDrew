import React from 'react';
import {
  ShieldCheck,
  Leaf,
  MilkOff,
  WheatOff,
  Zap,
  CirclePlus,
  Droplet,
  Activity,
  Wheat,
  Package,
} from 'lucide-react';

const row1Items = [
  { icon: ShieldCheck, label: 'Zero Preservatives' },
  { icon: Leaf, label: 'Zero Added Sugar' },
  { icon: MilkOff, label: 'Zero Dairy' },
  { icon: WheatOff, label: 'Zero Gluten' },
  { icon: Zap, label: 'Zero Concentrate' },
];

const row2Items = [
  { icon: CirclePlus, label: '265mg Potassium' },
  { icon: Droplet, label: '20 kcal per 200ml' },
  { icon: Activity, label: '5g Carbs' },
  { icon: Wheat, label: 'Vitamin C' },
  { icon: Package, label: 'Bottled Same-Day' },
];

const pillBackgroundColors = [
  'bg-drew-cream',
  'bg-drew-mint',
  'bg-drew-light-blue',
  'bg-drew-lavender',
];

const MarqueeRow: React.FC<{
  items: { icon: React.ElementType; label: string }[];
  direction?: 'left' | 'right';
}> = ({ items, direction = 'left' }) => (
  <div className="relative flex overflow-hidden group">
    <div
      className={`flex motion-safe:group-hover:[animation-play-state:paused] ${
        direction === 'left'
          ? 'motion-safe:animate-marquee-to-left'
          : 'motion-safe:animate-marquee-to-right'
      }`}
    >
      {[...items, ...items].map((item, index) => (
        <div
          key={index} // Key needs to be unique across all rendered items, not just within the original `items` array
          className={`flex items-center shrink-0 mx-3 px-6 py-3
            ${pillBackgroundColors[index % pillBackgroundColors.length]}
            border border-drew-soft-border rounded-full shadow-sm`}
          aria-hidden={index >= items.length}
        >
          <item.icon
            className="w-5 h-5 text-drew-lime-accent mr-3"
            strokeWidth={2}
          />
          <span className="text-md font-medium text-drew-deep-green whitespace-nowrap">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const BrandTicker: React.FC = () => {
  return (
    <section
      aria-label="Brand Values Marquee"
      className="w-full py-6 sm:py-8 bg-drew-product-bg/70"
    >
      <div className="space-y-4">
        <MarqueeRow items={row1Items} direction="left" />
        <MarqueeRow items={row2Items} direction="right" />
      </div>
    </section>
  );
};

export default BrandTicker;