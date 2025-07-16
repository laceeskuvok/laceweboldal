// src/app/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, Palette, PencilRuler } from "lucide-react";

// --- PORTFÓLIÓ ADATOK (FRISSÍTVE A TE KÉPEIDDEL) ---
const portfolioItems = [
  { 
    image: "/images/letisztultelegancia.jpg", 
    title: "Letisztult Elegancia", 
    category: "Esküvői Meghívó" 
  },
  { 
    image: "/images/szines_mockup.jpg", 
    title: "Színes & Modern", 
    category: "Teljes Kollekció" 
  },
  { 
    image: "/images/eskuvoihirlap.jpg", 
    title: "Esküvői Hírlap", 
    category: "Egyedi Kiegészítő" 
  },
  // A további 3 helyet fenntartottam a készülő terveidnek
  { 
    image: "/images/pinterest_placeholder_1.jpg", 
    title: "Virágos Akvarell", 
    category: "Esküvői Meghívó" 
  },
  { 
    image: "/images/pinterest_placeholder_2.jpg", 
    title: "Arany Fóliás", 
    category: "Köszönetkártya" 
  },
  { 
    image: "/images/pinterest_placeholder_3.jpg", 
    title: "Bohém Álmodozás", 
    category: "Teljes Kollekció" 
  },
];
// --------------------

// --- HEADER KOMPONENS ---
function Header() {
  const navItems = [
    { name: "Kezdőlap", href: "/" },
    { name: "Portfólió", href: "#portfolio" },
    { name: "Rólam", href: "#rolam" },
    { name: "Kapcsolat", href: "#kapcsolat" },
  ];
  return (
    <header className="absolute top-0 left-0 right-0 z-20 py-6">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          {/* A logót a /public mappába kell tenned! */}
          <Image src="/LACE_logo.png" alt="LACE Logo" width={100} height={100} priority />
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium text-brand-text hover:text-brand-rose-gold relative group">
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-rose-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}


// --- FŐOLDAL KOMPONENS ---
export default function HomePage() {
  return (
    <main>
      <Header />

      {/* HERO SZEKCIÓ */}
      <section className="relative h-screen flex items-center justify-center text-center bg-brand-light-pink">
        <motion.div 
          className="z-10 p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h1 className="text-4xl md:text-6xl font-serif text-brand-text">A Ti Történetetek,</h1>
          <h2 className="text-4xl md:text-6xl font-serif text-brand-rose-gold mt-2">Gyönyörűen Megtervezve</h2>
          <p className="mt-6 max-w-xl mx-auto text-brand-text/80">Egyedi esküvői meghívók és grafikai anyagok, amik örök emlékké teszik a nagy napot.</p>
        </motion.div>
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/letisztultelegancia.jpg" // FRISSÍTVE A TE KÉPEDRE!
            alt="Elegáns esküvői meghívó kompozíció"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
      </section>

      {/* RÓLAM SZEKCIÓ (ÍZELÍTŐ) */}
      <section id="rolam" className="py-20 md:py-32">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <Image 
              src="/images/rolam_placeholder.jpg" // IDE JÖN MAJD AZ ÉRTELMES KÉP RÓLAD :)
              alt="Vivi, a LACE Design tervezője"
              width={500}
              height={600}
              className="rounded-lg shadow-xl object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-4">Szia, Vivi vagyok!</h2>
            <p className="text-lg text-brand-text/90 mb-6">A szenvedélyem, hogy a szerelmes párok történetét életre keltsem gyönyörű, személyre szabott grafikákon keresztül. Hiszem, hogy egy meghívó több, mint egy papír – ez az első bepillantás az esküvőtök varázslatos világába.</p>
            <Link href="/rolam" className="font-bold text-brand-rose-gold hover:underline">
              Tudj meg többet rólam &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PORTFÓLIÓ SZEKCIÓ */}
      <section id="portfolio" className="py-20 md:py-32 bg-brand-light-pink">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-4">Kiemelt Munkáim</h2>
          <p className="text-lg max-w-2xl mx-auto text-brand-text/80 mb-12">Ízelítő a legkedvesebb projektjeimből, melyek mind egy-egy egyedi történetet mesélnek el.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div 
                key={index} 
                className="group relative overflow-hidden rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Image src={item.image} alt={item.title} width={600} height={750} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white text-left">
                  <span className="text-sm uppercase tracking-wider">{item.category}</span>
                  <h3 className="text-2xl font-serif mt-1">{item.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOLYAMAT SZEKCIÓ */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-12">A közös munka menete</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <MessageSquare className="w-10 h-10 text-brand-rose-gold"/>, title: "1. Ötletelés", text: "Egy laza beszélgetéssel kezdünk, ahol megismerem az álmaitokat és az elképzeléseiteket." },
              { icon: <Palette className="w-10 h-10 text-brand-rose-gold"/>, title: "2. Tervezés", text: "Megalkotom az első vázlatokat és a stílust, amit közösen finomítunk tökéletesre." },
              { icon: <PencilRuler className="w-10 h-10 text-brand-rose-gold"/>, title: "3. Megvalósítás", text: "A végleges terveket előkészítem a nyomtatásra, hogy minden tökéletes legyen." }
            ].map((step, index) => (
               <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center"
               >
                <div className="p-4 bg-brand-light-pink rounded-full mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-brand-text/80 max-w-xs">{step.text}</p>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KAPCSOLATFELVÉTEL (CTA) SZEKCIÓ */}
      <section id="kapcsolat" className="bg-brand-light-pink">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-brand-text mb-4">Valóra váltsuk az álmaitokat?</h2>
          <p className="text-lg max-w-xl mx-auto text-brand-text/80 mb-8">Ha egyedi és személyre szabott meghívót szeretnétek, ami igazán Rólatok szól, vegyétek fel velem a kapcsolatot!</p>
          <Link href="/contact" className="inline-block bg-brand-rose-gold text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-opacity-90 transition duration-300 transform hover:scale-105 shadow-lg">
            Ajánlatkérés
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6">
        <div className="container mx-auto px-6 text-center text-sm text-brand-text/60">
          <p>&copy; {new Date().getFullYear()} LACE Design & Events. Minden jog fenntartva.</p>
        </div>
      </footer>
    </main>
  );
}