// Image assets are already present in the project
import lifestyleImage1 from '@/assets/lifestyle/lifestyle-1.webp';
import lifestyleImage2 from '@/assets/lifestyle/lifestyle-2.webp';
import lifestyleImage3 from '@/assets/lifestyle/lifestyle-3.webp';
import lifestyleImage4 from '@/assets/lifestyle/lifestyle-4.webp';

export interface LifestyleItem {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
}

export const lifestyleData: LifestyleItem[] = [
  {
    category: 'MORNING RITUAL',
    title: 'Start before the coffee does',
    description: 'Electrolytes before caffeine — a gentler way to wake the body up.',
    imageUrl: lifestyleImage1,
  },
  {
    category: 'FITNESS & RECOVERY',
    title: 'What you lost, replaced',
    description: 'Sodium and potassium leave with your sweat. This is how they come back.',
    imageUrl: lifestyleImage2,
  },
  {
    category: 'WORK & PRODUCTIVITY',
    title: 'Clearer, without the crash',
    description: 'No sugar spike, no dip an hour later — just steady hydration through a long day.',
    imageUrl: lifestyleImage3,
  },
  {
    category: 'TRAVEL & ADVENTURE',
    title: 'Wherever the day takes you',
    description: "Light, portable, and built for a body that is on the move.",
    imageUrl: lifestyleImage4,
  },
];