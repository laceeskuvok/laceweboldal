'use client';

import { motion } from 'framer-motion';
import { MapPin, Clock, Shirt, Camera, Mail, Gift, Car, BedDouble } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// === Fő Komponens ===
export default function WeddingInfoPage() {

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.2, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white text-gray-800 font-body">
      
      {/* === HERO SZEKCIÓ === */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0">
            <Image src="/images/wedding3.jpg" alt="Anna és Péter" layout="fill" objectFit="cover" className="opacity-40"/>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent"/>
        </div>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10"
        >
            <h1 className="text-6xl md:text-8xl mt-4 text-brand-rose" style={{ fontFamily: 'Great Vibes, cursive' }}>
                Anna & Péter
            </h1>
            <p className="text-3xl font-serif mt-4 text-brand-text">2025. szeptember 14.</p>
        </motion.div>
      </section>

      <motion.div 
        className="max-w-4xl mx-auto px-6 py-16 space-y-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={containerVariants}
    >
        {/* === RÓLUNK / TÖRTÉNETÜNK === */}
        <motion.section variants={itemVariants}>
            <h2 className="font-serif text-4xl text-center text-brand-text mb-12">A Mi Történetünk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-brand-rose">Anna szemszögéből</h3>
                    <p className="text-gray-600 leading-relaxed">"Sosem hittem volna, hogy egy esős kedd délután, egy kávézóban fogom megismerni a jövendőbeli férjemet. Péter épp egy könyvet olvasott, ami nekem is a kedvencem volt. Ez adta a bátorságot, hogy megszólítsam, és onnantól kezdve minden megváltozott..."</p>
                </div>
                <div className="space-y-4">
                    <h3 className="font-serif text-2xl text-brand-rose">Péter szemszögéből</h3>
                    <p className="text-gray-600 leading-relaxed">"Épp elmélyedtem a könyvemben, amikor egy hangot hallottam: 'Ezt én is olvastam!'. Felnéztem, és ott állt Anna. Azonnal tudtam, hogy ez több, mint egy véletlen. A lánykérés egy évvel később, ugyanannál az asztalnál történt, és a válasz egyértelmű 'Igen' volt."</p>
                </div>
            </div>
        </motion.section>
        
        {/* === ESKÜVŐ RÉSZLETEI === */}
        <motion.section variants={itemVariants}>
             <h2 className="font-serif text-4xl text-center text-brand-text mb-12">A Nagy Nap Részletei</h2>
             <div className="space-y-12">
                 {/* Helyszín */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="h-80 rounded-2xl shadow-xl overflow-hidden"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2715.524759844438!2d17.675460815586545!3d46.86782347914257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x474b17670be5a4f5%3A0x318394c34a790abe!2sLiszkay%20Borkúria!5e0!3m2!1shu!2shu!4v1699796490142!5m2!1shu!2shu" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy"></iframe></div>
                    <div className="space-y-4">
                        <h3 className="font-serif text-2xl text-brand-text flex items-center gap-2"><MapPin size={20}/> Helyszín</h3>
                        <p className="text-gray-700"><strong>Liszkay Pincészet, Monoszló</strong></p>
                        <p className="text-sm text-gray-500">Parkolási lehetőség a helyszínen biztosított.</p>
                        <a href="https://www.google.com/maps/dir//Liszkay+Pince,+Monoszló" target="_blank" rel="noopener noreferrer" className="btn-primary-outline text-xs">Útvonaltervezés</a>
                    </div>
                 </div>
                 {/* Program */}
                 <div>
                    <h3 className="font-serif text-2xl text-brand-text flex items-center gap-2 mb-4"><Clock size={20}/> Program</h3>
                    <ul className="space-y-2 text-gray-600 border-l-2 border-brand-pale-pink pl-6">
                        <li><strong>15:00</strong> – Szertartás a tónál</li>
                        <li><strong>16:00</strong> – Gratuláció és pezsgős koccintás</li>
                        <li><strong>17:30</strong> – Vacsora</li>
                        <li><strong>19:30</strong> – Nyitótánc és buli hajnalig</li>
                    </ul>
                 </div>
                 {/* Dress Code */}
                 <div>
                     <h3 className="font-serif text-2xl text-brand-text flex items-center gap-2"><Shirt size={20}/> Öltözködési javaslat</h3>
                     <p className="text-gray-600 mt-2">Kérünk, hogy öltözékeddel emeld az este fényét! A "garden formal" stílus tökéletes választás: a hölgyeknek egy csinos, lenge ruha, az uraknak pedig egy elegáns ing és zakó.</p>
                 </div>
             </div>
        </motion.section>

        {/* === UTAZÁS ÉS SZÁLLÁS === */}
        <motion.section variants={itemVariants}>
             <h2 className="font-serif text-4xl text-center text-brand-text mb-12">Utazás & Szállás</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-serif text-2xl text-brand-text flex items-center gap-2"><Car size={20}/> Transzfer</h3>
                    <p className="text-gray-600 mt-2">A szertartás és a vacsora helyszíne között telekocsi rendszer fog működni. Kérjük, jelezzétek az RSVP űrlapon, ha szükségetek van fuvarra!</p>
                </div>
                <div>
                     <h3 className="font-serif text-2xl text-brand-text flex items-center gap-2"><BedDouble size={20}/> Ajánlott Szállások</h3>
                     <ul className="text-sm text-gray-500 mt-2 list-disc list-inside">
                        <li><a href="#" className="hover:text-brand-rose">Panoráma Panzió, Zánka</a></li>
                        <li><a href="#" className="hover:text-brand-rose">Levendula Apartmanok, Köveskál</a></li>
                     </ul>
                </div>
             </div>
        </motion.section>
        
        {/* === AJÁNDÉK INFORMÁCIÓ === */}
        <motion.section variants={itemVariants}>
             <h2 className="font-serif text-4xl text-center text-brand-text mb-12">Ajándékötletek</h2>
             <div className="text-center max-w-2xl mx-auto">
                 <Gift className="w-12 h-12 mx-auto text-brand-rose" strokeWidth={1} />
                 <p className="mt-4 text-gray-600 leading-relaxed">Számunkra a legnagyobb ajándék, hogy velünk ünnepeltek! Ha mégis szeretnétek meglepni minket, a nászutunkhoz való hozzájárulást köszönettel fogadjuk. Ezt a helyszínen elhelyezett, lezárt dobozban tehetitek meg diszkréten.</p>
             </div>
        </motion.section>
    </motion.div>
    </main>
  );
}

