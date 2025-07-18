/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-white': '#FFFFFF',
        'brand-background': '#F9F6F6', // Enyhén törtfehér háttér
        'brand-text': '#5C5454',       // A menüpontok szövegének színe
        'brand-rose': '#D9C4C4',       // A rose gold aláhúzáshoz és a logóhoz
        'brand-pale-pink': '#F5EBEB',  // A logó háttérszíne
      },
      fontFamily: {
        serif: ['var(--font-cormorant)'],
        dancing: ['var(--font-dancing)', 'cursive'],
        playfair_serif: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-lora)', 'serif'],
        sans: ['var(--font-montserrat)'],
        playfair: ['"Playfair Display"', 'serif'],
        vibes: ['"Great Vibes"', 'cursive'],
      },
    },
  },
  plugins: [],
}