import { Cormorant_Garamond, Playfair_Display, Lora, Montserrat, Great_Vibes, Dancing_Script } from 'next/font/google';

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['italic', 'normal'],
  variable: '--font-playfair',
  display: 'swap',
});

export const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['italic', 'normal'],
  variable: '--font-lora',
  display: 'swap',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const vibes = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-vibes',
  display: 'swap',
});

export const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-dancing',
  display: 'swap',
});
