/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this path is correct for your project
  ],
  theme: {
    extend: {
      colors: {
        // Centralized BetterDrew coconut-water palette
        'drew-deep-green': '#123B2A',
        'drew-coconut-green': '#315640',
        'drew-lime-accent': '#B5D900',
        'drew-warm-ivory': '#E6F2C8',
        'drew-hero-bg': '#DCEEB3',
        'drew-product-bg': '#EAF5D2',
        'drew-lifestyle-bg': '#D9EDB2',
        'drew-soft-white': '#F7FBEF',
        'drew-natural-sand': '#D9EDB2',
        'drew-dark-text': '#123B2A',
        'drew-secondary-text': '#315640',
        'drew-soft-border': '#C9DEA2',

        // Existing semantic aliases used throughout the site
        'forest-green': '#123B2A',
        'muted-gold': '#B5D900',
        'warm-white': '#F7FBEF',
        'soft-sand': '#EAF5D2',
        'coconut-cream': '#D9EDB2',
        'near-black': '#315640',
        'sand': '#D9EDB2',
      }
    },
    animation: {
      'marquee-to-left': 'marquee-to-left 35s linear infinite',
      'marquee-to-right': 'marquee-to-right 35s linear infinite',
    },
    keyframes: {
      'marquee-to-left': {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      'marquee-to-right': {
        '0%': { transform: 'translateX(-50%)' },
        '100%': { transform: 'translateX(0%)' },
      },
    },
  },
  plugins: [],
}
