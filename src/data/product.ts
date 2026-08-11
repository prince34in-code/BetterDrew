export interface Product {
  id: string;
  brand: string;
  name: string;
  image: string;
  description: string;
  // These properties are part of the base product but might be overridden by packs
  category?: string;
  packSize?: string;
  price?: number | null;
  ingredients?: string[] | null;
  nutrition?: Record<string, string> | null;
  verifiedClaims?: string[];
}

export interface PackOption {
  id: string;
  name: string;
  bottles: number;
  price: number;
  pricePerBottle: number;
  compareAtPrice?: number;
  badge?: string;
  savings?: string;
}

export interface ProductWithPacks extends Product {
  packs: PackOption[];
}

import BetterdrewBottleAsset from '@/assets/images/hero/hero-bottle.webp';

const baseProduct: Omit<ProductWithPacks, 'packs' | 'price'> = {
  id: 'betterdrew-coconut-water',
  brand: 'Betterdrew',
  name: 'Young Coconut Water',
  category: 'Beverage',
  packSize: '200ml',
  image: BetterdrewBottleAsset,
  description: '100% natural young coconut water with no added sugar or preservatives. Pure, crisp hydration sourced from young coconuts.',
};

const baseBottlePrice = 150;

const packOptions: PackOption[] = [
  { id: `${baseProduct.id}-6-pack`, name: '6 Pack', bottles: 6, price: baseBottlePrice * 6, pricePerBottle: baseBottlePrice },
  { id: `${baseProduct.id}-12-pack`, name: '12 Pack', bottles: 12, price: baseBottlePrice * 12 * 0.9, pricePerBottle: baseBottlePrice * 0.9, compareAtPrice: baseBottlePrice * 12, badge: 'Best Value', savings: 'Save 10%' },
  { id: `${baseProduct.id}-24-pack`, name: '24 Pack', bottles: 24, price: baseBottlePrice * 24 * 0.85, pricePerBottle: baseBottlePrice * 0.85, compareAtPrice: baseBottlePrice * 24, badge: 'Biggest Saving', savings: 'Save 15%' },
];

export const betterdrewProduct: ProductWithPacks = {
  ...baseProduct,
  packs: packOptions,
};