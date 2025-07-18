'use client';

import { Suspense } from 'react'; // Suspense importálása
import { useSearchParams } from 'next/navigation'; // Hook importálása
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';
import ContactForm from '../../components/ContactForm';
import Header from '../../components/Header';

// --- MOCK DATA: Ezt ide is be kell másolnunk ---
const collectionsData = [
    {
      id: '01',
      name: 'Klasszikus Romantika',
      description: 'Időtlen elegancia, finom vonalak és pasztell színek harmóniája.',
      items: [ 'Meghívó', 'Menükártya', 'Ültetőkártya', 'Esküvői Hírlap', 'Köszönőkártya' ],
    },
    {
      id: '02',
      name: 'Modern Minimalista',
      description: 'Letisztult formák, merész tipográfia és a kevesebb-több elve.',
      items: [ 'Save the Date', 'Meghívó', 'Menükártya', 'Digitális Meghívó', 'Weboldal' ],
    },
    {
      id: '03',
      name: 'Rusztikus Varázslat',
      description: 'Természetes textúrák, kézzel rajzolt motívumok és földszínek.',
      items: [ 'Meghívó', 'Itallap', 'Ültetési Rend', 'Pecsét', 'Boríték' ],
    },
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
          highlightColor: 0xd9c4c4,
          midtoneColor: 0xb76e79,
          lowlightColor: 0xf5ebeb,
          baseColor: 0xf9f6f6,
          blurFactor: 0.6,
          speed: 0.5,
          zoom: 0.8
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