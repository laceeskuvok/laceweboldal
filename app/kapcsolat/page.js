'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';
import ContactForm from '../../components/ContactForm';
import Header from '../../components/Header';

// --- TELJES, VÉGLEGES ADATLISTA ---
const collectionsData = [
  { id: "01", name: "Lace Gazette", description: "4 oldalas meghívó újság formában...", price: "29 900 Ft-tól" },
  { id: "02", name: "Lace Message", description: "Lepjétek meg vendégeiteket egy igazán modern, mégis meghitt gesztussal!...", price: "34 900 Ft-tól" },
  { id: "03", name: "Lace Portrait", description: "Ebben a kollekcióban a főszerep a fotóitoké...", price: "39 900 Ft-tól" },
  { id: "04", name: "Lace Pure", description: "A letisztultság és a minimalizmus kedvelőinek...", price: "32 000 Ft-tól" },
  { id: "05", name: "Lace Bloom", description: "A Lace Bloom kollekció azoknak szól, akik a merész mintákat és a különleges, látványos megjelenést keresik...", price: "Egyedi árazás" },
  // A korábbi 'otherCollections' és 'featuredCollections' itt egyesítve vannak
];

const extrasData = [
    { name: "Kollekcióhoz illeszkedő menükártyák", price: "Egyedi" },
    { name: "Esküvői weboldal a meghívó stílusában", price: "Egyedi" },
    { name: "1 db QR-kód videóüzenettel", price: "Egyedi" },
    // A korábbi 'extraCollection' items-ei alapján
];


// Wrapper komponens, ami kiolvassa az URL paramétereket
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
        <h1 className="font-serif text-4xl md:text-5xl italic text-brand-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
          Kapcsolatfelvétel
        </h1>
        <p className="mt-4 text-lg text-gray-600 font-body drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
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
    if (!vantaEffect && typeof window !== 'undefined') {
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
        <Suspense fallback={<div className="text-white">Betöltés...</div>}>
          <ContactPageContent />
        </Suspense>
      </main>
    </>
  );
}