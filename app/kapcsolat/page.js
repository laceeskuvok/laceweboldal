'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';
import ContactForm from '../../components/ContactForm';
import Header from '../../components/Header';

export default function ContactPage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(0);

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
          speed: 0.5, // JAVÍTVA: A sebességet 1.2-ről 0.5-re csökkentettük
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
        
        <div className="relative z-10 w-full max-w-xl">
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* JAVÍTVA: A szövegek kaptak egy finom árnyékot a jobb olvashatóságért */}
            <h1 className="text-4xl md:text-5xl font-serif italic text-brand-text drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]">
              Kapcsolatfelvétel
            </h1>
            <p className="mt-4 text-lg text-gray-600 font-body drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
              Kérdésed van, vagy árajánlatot szeretnél kérni? Töltsd ki az űrlapot!
            </p>
          </motion.div>

          <motion.div 
            className="bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </main>
    </>
  );
}