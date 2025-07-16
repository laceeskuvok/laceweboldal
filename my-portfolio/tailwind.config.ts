// tailwind.config.ts

import type { Config } from "tailwindcss";

const config: Config = {
  // Ez a legfontosabb rész: megmondja, hol keresse a stílusokat.
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Itt vannak a korábban beállított egyedi színeid és betűtípusaid
      colors: {
        'brand-background': '#FFFFFF',
        'brand-light-pink': '#FDF7F5',
        'brand-text': '#5C5451',
        'brand-rose-gold': '#B76E79',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;