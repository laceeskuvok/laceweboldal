'use client';

import { Suspense } from 'react'; // Suspense importálása
import { useSearchParams } from 'next/navigation'; // Hook importálása
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';
import ContactForm from '../../components/ContactForm';
import Header from '../../components/Header';

// --- TELJES, FRISSÍTETT ADATLISTA ---
const collectionsData = [
  { id: "01", slug: "eskuvoi-hirlap", name: "Esküvői hírlap", price: "29 900 Ft", description: "Egyedi esküvői hírlap a nagy nap legszebb pillanataival.", items: [ { name: "Esküvői hírlap borító", img: "/images/eskuvoihirlap.jpg" }, { name: "Páros interjú oldal", img: "/images/eskuvoihirlap.jpg" }, { name: "Programoldal", img: "/images/eskuvoihirlap.jpg" } ], bgColor: "#FAF7F6", },
  { id: "02", slug: "tortenetek-kepekben", name: "Történetek képekben", price: "34 900 Ft", description: "Színes, történetmesélő képes kollekció személyre szabva.", items: [ { name: "Meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Idézetkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Ajándékkísérő", img: "/images/eskuvoihirlap.jpg" } ], bgColor: "#F5EBEB", },
  { id: "03", slug: "idotlen-romantika", name: "Időtlen romantika", price: "39 900 Ft", description: "Letisztult, elegáns stílusú kollekció örök emlékekkel.", items: [ { name: "Meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Asztalszám", img: "/images/eskuvoihirlap.jpg" } ], bgColor: "#F3F0E9", },
  { id: "04", slug: "vintage-varazs", name: "Vintage Varázs", price: "32 000 Ft", description: "Retro hangulatú kollekció klasszikus kerettel.", items: [ { name: "Vintage meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Asztalszám", img: "/images/eskuvoihirlap.jpg" } ], bgColor: "#EFEAE6", },
  { id: "05", slug: "modern-minimal", name: "Modern Minimal", price: "31 000 Ft", description: "Tiszta, modern dizájn a minimalizmus szerelmeseinek.", items: [ { name: "Minimal meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Köszönőkártya", img: "/images/eskuvoihirlap.jpg" } ], bgColor: "#F9F4F1", },
  { id: "06", slug: "boho-alom", name: "Boho álom", price: "36 500 Ft", description: "Szabad szellemű, természetes hangulatú kollekció.", items: [ { name: "Boho meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Természetes ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Kézzel írt üzenetkártya", img: "/images/eskuvoihirlap.jpg" } ], bgColor: "#F6EFE9", },
];

const extrasData = [
    { name: "Egyedi menükártya", price: "8 000 Ft" },
    { name: "Esküvői weboldal", price: "25 000 Ft" },
    { name: "Ajándékkísérő (20 db)", price: "5 000 Ft" },
    { name: "Kézzel írt levél", price: "12 000 Ft" },
    { name: "Ültetési rend tábla", price: "15 000 Ft" },
    { name: "Pecsét egyedi monogrammal", price: "10 000 Ft" },
];

// Wrapper komponens, ami kiolvassa az URL paramétereket
// Erre azért van szükség, mert a useSearchParams hook használatához Suspense "határ" kell
const ContactPageContent = () => {
  const searchParams = useSearchParams();
  const selectedCollection = searchParams.get('kollekcio');

  return (
    <div className="relative z-10 w-full max-w-4xl">
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-serif italic text-brand-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
          Kapcsolatfelvétel
        </h1>
        <p className="mt-4 text-lg text-gray-600 font-body drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
          {/* A szöveg dinamikusan változik, ha van kiválasztott kollekció */}
          {selectedCollection 
            ? `Érdeklődés a "${selectedCollection}" kollekcióról` 
            : 'Kérdésed van, vagy árajánlatot szeretnél kérni?'}
        </p>
      </motion.div>

      <motion.div 
        className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
      >
        {/* Átadjuk a teljes kollekció listát ÉS a kiválasztottat is */}
        <ContactForm 
          collections={collectionsData} 
          extras={extrasData} 
          initialCollectionName={selectedCollection} 
        />
      </motion.div>
    </div>
  );
};

// A fő oldal komponens, ami a hátteret és az elrendezést kezeli
export default function ContactPage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyrocontrols: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xffffff,
          midtoneColor: 0xd9c4c4,
          lowlightColor: 0xf5ebeb,
          baseColor: 0xfaf7f6,
          blurFactor: 0.5,
          speed: 0.6,
          zoom: 0.6
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <>
      <Header />
      <main ref={vantaRef} className="min-h-screen relative overflow-hidden flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div>Betöltés...</div>}>
          <ContactPageContent />
        </Suspense>
      </main>
    </>
  );
}