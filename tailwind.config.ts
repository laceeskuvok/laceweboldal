// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-background': '#FFFFFF',
        'brand-light-pink': '#FDF7F5',
        'brand-text': '#5C5451',
        'brand-rose-gold': '#B76E79',
      },
      fontFamily: {
        // Most már a CSS változókra hivatkozunk
        serif: ['var(--font-playfair-display)', 'serif'],
        sans: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;