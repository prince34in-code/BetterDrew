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
    title: 'Start Fresh',
    description: 'Begin your day with the pure, natural hydration that awakens your senses and sets a positive tone.',
    imageUrl: lifestyleImage1,
  },
  {
    category: 'FITNESS & RECOVERY',
    title: 'Elevate Performance',
    description: 'Replenish essential electrolytes and recover faster after every workout, naturally and effectively.',
    imageUrl: lifestyleImage2,
  },
  {
    category: 'WORK & PRODUCTIVITY',
    title: 'Natural Focus',
    description: 'Stay refreshed and hydrated through long days with clean, naturally refreshing coconut water.',
    imageUrl: lifestyleImage3,
  },
  {
    category: 'TRAVEL & ADVENTURE',
    title: 'Your Companion',
    description: 'A refreshing companion for everyday journeys, wherever the day takes you.',
    imageUrl: lifestyleImage4,
  },
];