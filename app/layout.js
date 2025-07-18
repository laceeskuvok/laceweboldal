import { cormorant, playfair, lora, montserrat, vibes, dancing } from '../lib/fonts'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'


export const metadata = {
  title: 'Vivi Grafika - Portfólió',
  description: 'Esküvői meghívók és grafikai tervezés',
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