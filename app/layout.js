import { cormorant, playfair, lora, montserrat, vibes, dancing } from '../lib/fonts'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
// Fontos: A CartProvider-nek 'use client' direktívával kell rendelkeznie a saját fájljában!
import { CartProvider } from '../context/CartContext';
import { ToastProvider } from '../context/ToastContext';

export const metadata = {
  // 1. ALAP SEO ÉS CÍM (A te meglévő adataid kibővítve)
  metadataBase: new URL('https://laceeskuvok.hu/'), // FONTOS: Ezt cseréld le az élő weboldalad linkjére!
  title: {
    default: 'LACE Esküvők | Prémium Esküvői Meghívók',
    template: '%s | LACE Esküvők' // Így az aloldalak címe automatikusan ilyen lesz: "Kapcsolat | LACE Esküvők"
  },
  description: 'Esküvői meghívók, menükártyák, ültetőkártyák és teljes körű grafikai tervezés a nagy napra. Fedezd fel egyedi kollekcióinkat!',
  keywords: ['esküvői meghívó', 'prémium meghívó', 'esküvő 2026', 'grafikai tervezés', 'menükártya', 'ültetőkártya', 'Lace esküvő'],
  authors: [{ name: 'LACE Esküvők' }],
  creator: 'LACE Esküvők',

  // 2. OPEN GRAPH (Facebook, Instagram, iMessage megosztáshoz)
  openGraph: {
    title: 'LACE Esküvők | Prémium Esküvői Meghívók',
    description: 'Egyedi tervezésű, prémium minőségű esküvői meghívók és grafikai tervezés.',
    url: 'https://laceeskuvok.hu/',
    siteName: 'LACE Esküvők',
    images: [
      {
        url: '/images/romantic-wedding-by-lake.jpg', // Ez a kép jelenik meg, ha valakinek átküldöd a linket!
        width: 1200,
        height: 630,
        alt: 'LACE Esküvők',
      },
    ],
    locale: 'hu_HU',
    type: 'website',
  },

  icons: {
    icon: [
      { url: '/images/favicon.ico' },
      { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/images/apple-touch-icon.png',
    android: [
      { url: '/images/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/images/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/images/favicon.ico',
  },
}

const fontVariables = `${montserrat.variable} ${cormorant.variable} ${dancing.variable} ${playfair.variable} ${lora.variable} ${vibes.variable}`;

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={fontVariables}>
      <body className="bg-white text-dark-text">
        {/* A CartProvider "becsomagol" mindent, így a Header és az oldalak is elérik a kosarat */}
        <ToastProvider>
          <CartProvider>
              <Header />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}