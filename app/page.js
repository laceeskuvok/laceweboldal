'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';

import Header from '../components/Header';
import AboutCard from '../components/About';
import ProductSelection from '../components/ProductSelection'; // A korábbi Collections helyett
import ContactSection from '../components/Contact';
import CartDrawer from '../components/CartDrawer';
import { Mail } from 'lucide-react';

// === HERO SZEKCIÓ (Főoldal teteje) ===
const HeroSection = () => {
  // Vanta.js ref és state TÖRÖLVE, már nem kell

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center">
      
      {/* 1. VIDEÓ HÁTTÉR */}
      <div className="absolute inset-0 z-0">
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
        >
            {/* Itt hivatkozunk a fájlra. Fontos: a 'public/videos' mappában kell lennie! */}
            <source src="/videos/video.mov" type="video/quicktime" />
            <source src="/videos/video.mov" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        
        {/* Opcionális: Egy nagyon finom fátyol réteg, hogy a videó ne legyen túl "nyers" */}
        {/* Ha sötét a videó, használj bg-black/20-at, ha világos, akkor bg-white/10-et */}
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
      </div>
      
      {/* 2. Header komponens (opcionális, ha globálisan van a layoutban, innen kivehető) */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>
      
      {/* 3. Központi tartalom: LEBEGŐ MEGHÍVÓ */}
      <motion.div 
        className="relative z-10 w-full max-w-md px-6 md:max-w-2xl flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Lebegő animáció konténer */}
        <motion.div
            animate={{ y: [0, -15, 0] }} // Fel-le mozgás
            transition={{ 
                duration: 6, 
                repeat: Infinity, 
                ease: "easeInOut" 
            }}
            className="relative w-full aspect-[3/4] md:aspect-[4/3]"
        >
        </motion.div>
      </motion.div>
    </section>
  );
};

// === RENDELÉSI INFÓ SZEKCIÓ ===
const OrderInfo = () => {
    const steps = [
        { num: '1', title: 'Kiválasztás és rendelés', desc: 'Válaszd ki a kollekciót, add meg a darabszámokat és az alapszínt. Automata visszaigazolást kapsz, majd 24 órán belül érkezik a díjbekérő.' },
        { num: '2', title: 'Adatbekérő űrlap', desc: 'A díjbekérő teljesítése után egy részletes űrlapon adhatod meg a meghívón szereplő neveket, helyszíneket és szövegezést.' },
        { num: '3', title: 'Látványtervezés', desc: '10 munkanapon belül elkészítem és e-mailben küldöm a személyre szabott látványterveket ellenőrzésre.' },
        { num: '4', title: 'Módosítás', desc: 'Az ár tartalmaz egy kör módosítást az esetleges elírások javítására vagy finomhangolásra.' },
        { num: '5', title: 'Gyártás és átadás', desc: 'A jóváhagyott tervet prémium minőségben legyártom, majd gondosan csomagolva küldöm el neked.' },
    ];

    return (
        <section id="rendelesi-info" className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="font-serif text-4xl text-center text-[#5C5454] italic mb-16">Rendelés menete</h2>
                <div className="grid md:grid-cols-5 gap-8">
                    {steps.map((step) => (
                        <div key={step.num} className="text-center group">
                            <div className="w-12 h-12 mx-auto bg-[#FDFCF8] border border-[#E8DCC4] rounded-full flex items-center justify-center text-[#B76E79] font-serif text-xl mb-4 group-hover:bg-[#B76E79] group-hover:text-white transition-colors">
                                {step.num}
                            </div>
                            <h3 className="font-serif text-lg text-[#5C5454] mb-3">{step.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// === GOOGLE REVIEWS PLACEHOLDER ===
const Reviews = () => {
    return (
        <section className="py-20 bg-[#FDFCF8]">
            <div className="max-w-4xl mx-auto px-6 text-center">
                 <div className="flex justify-center items-center gap-2 mb-8">
                    <span className="text-[#5C5454] font-bold text-xl">Google</span>
                    <div className="flex text-yellow-400">★★★★★</div>
                </div>
                {/* Itt később dinamikus Google Review widget lehet */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 italic text-gray-600">
                    "Csodálatos lett a meghívónk, minden vendégünk el volt ájulva tőle! Vivien nagyon segítőkész volt végig."
                    <div className="mt-4 font-bold text-[#B76E79] not-italic">- Anna & Péter</div>
                </div>
            </div>
        </section>
    );
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      <section className="py-16 md:py-24 bg-white">
          <AboutCard /> {/* A korábban javított AboutCard */}
      </section>

      <ProductSelection />
      
      <OrderInfo />
      
      <Reviews />
      <section id="kapcsolat">
        <ContactSection />
      </section>

      <CartDrawer /> {/* Ez mindig rejtve van, amíg meg nem nyitják */}
    </>
  );
}