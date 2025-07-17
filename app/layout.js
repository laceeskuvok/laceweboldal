import { Montserrat, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

// Betűtípusok beállítása
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '700'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-font-cormorant',
  weight: ['400', '600', '700'],
})

export const metadata = {
  title: 'Vivi Grafika - Portfólió',
  description: 'Esküvői meghívók és grafikai tervezés',
}

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={`${montserrat.variable} ${cormorant.variable}`}>
      <body className="bg-white text-dark-text">
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}