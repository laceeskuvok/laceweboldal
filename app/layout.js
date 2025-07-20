import { cormorant, playfair, lora, montserrat, vibes, dancing } from '../lib/fonts'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'


export const metadata = {
  title: 'LACE Esküvők',
  description: 'Esküvői meghívók és grafikai tervezés',
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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}