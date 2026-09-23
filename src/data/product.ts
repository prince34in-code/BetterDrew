export interface Product {
  id: string;
  brand: string;
  name: string;
  image: string;
  description: string;
  category?: string;
  packSize?: string;
  price?: number | null;
  mrp?: number | null;
  status?: 'available' | 'coming-soon';
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

export interface VariantOption {
  id: string;
  name: string;
  shortName: string;
  color: string;
  status: 'available' | 'coming-soon';
  image: string;
  description: string;
}

export interface ProductWithPacks extends Product {
  packs: PackOption[];
  variants?: VariantOption[];
  gallery?: string[];
}

import BetterdrewBottleAsset from '@/assets/product-showcase/bottle-1.webp';

// Image gallery list (flagged: placeholder copies of bottle-1 will be replaced when alternate angle photos are delivered)
export const productGalleryImages: string[] = [
  BetterdrewBottleAsset,
  BetterdrewBottleAsset,
  BetterdrewBottleAsset,
  BetterdrewBottleAsset,
];

export const productVariants: VariantOption[] = [
  {
    id: 'young-coconut-water',
    name: 'Young Coconut Water',
    shortName: 'Coconut',
    color: '#315640',
    status: 'available',
    image: BetterdrewBottleAsset,
    description: '100% natural young coconut water with no added sugar or preservatives. Pure, crisp hydration sourced from young coconuts.',
  },
  {
    id: 'strawberry-lime',
    name: 'Strawberry & Lime',
    shortName: 'Strawberry',
    color: '#E06D82',
    status: 'coming-soon',
    image: BetterdrewBottleAsset,
    description: 'Same young coconut base paired with natural cold-pressed strawberry and a crisp splash of lime.',
  },
];

const baseProduct: Omit<ProductWithPacks, 'packs' | 'price'> = {
  id: 'betterdrew-coconut-water',
  brand: 'Betterdrew',
  name: 'Young Coconut Water',
  category: 'Beverage',
  packSize: '200ml',
  status: 'available',
  image: BetterdrewBottleAsset,
  description: '100% natural young coconut water with no added sugar or preservatives. Pure, crisp hydration sourced from young coconuts.',
  mrp: 50,
};

const packOptions: PackOption[] = [
  {
    id: `${baseProduct.id}-1-pack`,
    name: 'Single Bottle',
    bottles: 1,
    price: 39,
    pricePerBottle: 39,
    compareAtPrice: 50,
    savings: 'Save 22%',
  },
  {
    id: `${baseProduct.id}-6-pack`,
    name: '6 Pack',
    bottles: 6,
    price: 229,
    pricePerBottle: 38.16,
    compareAtPrice: 300,
    badge: 'Popular',
    savings: 'Save 24%',
  },
  {
    id: `${baseProduct.id}-12-pack`,
    name: '12 Pack',
    bottles: 12,
    price: 439,
    pricePerBottle: 36.58,
    compareAtPrice: 600,
    badge: 'Best Value',
    savings: 'Save 27%',
  },
  {
    id: `${baseProduct.id}-24-pack`,
    name: '24 Pack',
    bottles: 24,
    price: 849,
    pricePerBottle: 35.37,
    compareAtPrice: 1200,
    badge: 'Biggest Saving',
    savings: 'Save 29%',
  },
];

export const betterdrewProduct: ProductWithPacks = {
  ...baseProduct,
  price: 39,
  packs: packOptions,
  variants: productVariants,
  gallery: productGalleryImages,
};