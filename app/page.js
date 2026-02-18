'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js'; // Supabase import
import { Mail, Star, Quote, ArrowRight } from 'lucide-react'; // Ikonok bővítése

import Header from '../components/Header';
import AboutCard from '../components/About';
import ProductSelection from '../components/ProductSelection';
import ContactSection from '../components/Contact';
import CartDrawer from '../components/CartDrawer';

// --- SUPABASE CONFIG ---
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// === HERO SZEKCIÓ ===
const HeroSection = () => {
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
            <source src="/videos/video.mov" type="video/quicktime" />
            <source src="/videos/video.mov" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
      </div>
      
      {/* 2. Header */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>
      
      {/* 3. Központi tartalom */}
      <motion.div 
        className="relative z-10 w-full max-w-md px-6 md:max-w-2xl flex justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative w-full aspect-[3/4] md:aspect-[4/3]"
        >
             {/* IDE MAJD A SAJÁT KÉPED JÖN, JELENLEG ÜRES A TIÉD ALAPJÁN */}
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

// === DYNAMIC REVIEWS SECTION (FRISSÍTVE) ===
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopReviews = async () => {
            const { data, error } = await supabase
                .from('velemenyek')
                .select('*')
                .eq('status', 'jovahagyva')
                .order('created_at', { ascending: false })
                .limit(3); 

            if (!error && data) {
                setReviews(data);
            }
            setIsLoading(false);
        };

        fetchTopReviews();
    }, []);

    if (!isLoading && reviews.length === 0) return null; 

    return (
        <section className="py-24 bg-[#FDFCF8]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div 
                            key={review.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8DCC4] flex flex-col items-center text-center h-full relative group hover:shadow-lg transition-all duration-300"
                        >
                            {/* Dekorációs idézőjel (halványan a háttérben) */}
                            <Quote className="absolute top-4 right-6 w-8 h-8 text-[#E8DCC4]/30 fill-current" />

                            {/* 1. PROFILKÉP */}
                            <div className="mb-4 relative">
                                {review.profile_image_url ? (
                                    <img 
                                        src={review.profile_image_url} 
                                        alt={review.name}
                                        className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-[#B76E79]/10 text-[#B76E79] flex items-center justify-center text-2xl font-serif font-bold border-4 border-white shadow-md">
                                        {review.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            {/* 2. CSILLAGOK (NAGY ÉS SÁRGA) - FÓKUSZPONT */}
                            <div className="flex gap-1 text-[#FFD700] mb-4 drop-shadow-sm">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={22} fill="currentColor" className="stroke-none"/>
                                ))}
                            </div>

                            {/* 3. NÉV */}
                            <h3 className="font-bold text-[#5C5454] text-lg mb-4">{review.name}</h3>

                            {/* 4. SZÖVEG */}
                            <div className="flex-grow">
                                <p className="text-gray-600 italic text-sm leading-relaxed">
                                    "{review.review_text}"
                                </p>
                            </div>

                            {/* 5. KOLLEKCIÓ */}
                            <div className="mt-6 pt-4 border-t border-gray-100 w-full">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                    {review.collection || "Egyedi tervezés"}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* GOMB */}
                <div className="text-center mt-12">
                    <Link href="/velemenyek" className="inline-flex items-center gap-2 text-[#B76E79] font-medium hover:text-[#a05a63] transition-colors border-b border-[#B76E79] pb-0.5">
                        Összes vélemény elolvasása <ArrowRight size={16} />
                    </Link>
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
          <AboutCard />
      </section>

      <ProductSelection />
      
      <OrderInfo />
      
      {/* Dinamikus vélemények szekció */}
      <Reviews />
      
      <section id="kapcsolat">
        <ContactSection />
      </section>

      <CartDrawer />
    </>
  );
}