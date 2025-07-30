'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { GitMerge, ShoppingCart, ArrowRight } from 'lucide-react';
import Header from '../../components/Header';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';

// === Fő Komponens ===
export default function InfoPage() {
  const vantaRef = useRef(null);
  useEffect(() => {
    let vantaEffect;
    if (typeof window !== 'undefined') {
      vantaEffect = FOG({
        el: vantaRef.current, THREE: THREE, mouseControls: true, touchControls: true, gyrocontrols: false,
        minHeight: 200.0, minWidth: 200.0, highlightColor: 0xffffff, midtoneColor: 0xd9c4c4,
        lowlightColor: 0xf5ebeb, baseColor: 0xfaf7f6, blurFactor: 0.5, speed: 0.6, zoom: 0.6,
      });
    }
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, []);

  const processSteps = [
    { title: "Konzultáció", description: "Egy beszélgetés során megismerem az elképzeléseiteket és a nagy nap hangulatát." },
    { title: "Látványtervek", description: "A megbeszéltek alapján elkészítem látványterveket." },
    { title: "Tökéletesítés", description: "Lehetőségetek van finomhangolni a részleteket (általában 2 körben), hogy minden pixel a helyére kerüljön." },
    { title: "A Kész Alkotás", description: "A jóváhagyott, végleges tervet prémium minőségben valósítom meg, hogy kézzelfogható emlékké váljon." }
  ];

  const orderingSteps = [
    { title: "Válassz Kollekciót", description: "Böngészd végig a kész kollekciókat, vagy álmodd meg a sajátodat a csomagösszeállító segítségével." },
    { title: "Kérj Árajánlatot", description: "A kiválasztott kollekció oldalán, vagy a csomagösszeállító végén kattints az 'Árajánlatot kérek' gombra." },
    { title: "Add meg az adataidat", description: "Az űrlapon add meg a neved, email címed és az esetleges egyedi kéréseidet, darabszámokat." },
    { title: "Vedd fel a kapcsolatot", description: "Az elküldött ajánlatkérés után hamarosan felveszem veled a kapcsolatot a további részletekkel." },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } };
  const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  return (
    <>
      <Header />
      <main ref={vantaRef} className="relative">
        <FloatingShapes />
        <section className="h-[70vh] flex items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="relative z-10">
                <h1 className="font-serif text-5xl md:text-7xl italic text-brand-text drop-shadow-lg">A Közös Munka és Rendelés Menete</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body drop-shadow-md">Minden, amit tudnod kell az ötlettől a kész termékig. Egyszerű, átlátható lépések a tökéletes végeredményért.</p>
            </motion.div>
        </section>

        <div className="relative z-10 px-4 pb-20 md:pb-32">
            <motion.div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl p-8 md:p-16 rounded-3xl border border-white/20 shadow-2xl space-y-28"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={containerVariants}>
                
                <motion.div variants={itemVariants} className="text-center">
                    <AnimatedIcon><GitMerge className="w-12 h-12 text-brand-rose" strokeWidth={1} /></AnimatedIcon>
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-text mt-4">Az álomból valóság: a közös munka lépései</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-body">Hiszem, hogy a tökéletes végeredmény titka a gördülékeny és átlátható közös munka. Az alábbi négy egyszerű lépésen keresztül vezetlek végig titeket.</p>
                    <ProcessTimeline steps={processSteps} />
                </motion.div>

                <motion.div variants={itemVariants} className="text-center">
                    <AnimatedIcon><ShoppingCart className="w-12 h-12 text-brand-rose" strokeWidth={1} /></AnimatedIcon>
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-text mt-4">Hogyan tudsz rendelni?</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-body">Az árajánlatkérés egyszerűbb, mint gondolnád! Kövesd az alábbi lépéseket, és hamarosan a kezedben tarthatod álmaid meghívóját.</p>
                    <ProcessTimeline steps={orderingSteps} />
                </motion.div>

                <motion.div variants={itemVariants} className="text-center pt-10 border-t border-brand-rose/20">
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-text">Készen állsz belevágni?</h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-600 font-body">Nézd meg a kollekciókat, vagy ha már tudod, mit szeretnél, vedd fel velem a kapcsolatot.</p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/kollekciok" className="btn-primary w-full sm:w-auto">Kollekciók megtekintése</Link>
                        <Link href="/kapcsolat" className="btn-primary w-full sm:w-auto">Árajánlatot kérek</Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </main>
    </>
  );
}

// === ÚJRAHASZNÁLHATÓ KOMPONENSEK ===
const AnimatedIcon = ({ children }) => ( <motion.div initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.8 }}>{children}</motion.div> );

const FloatingShapes = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[5%] w-24 h-24 bg-brand-rose/10 rounded-full" />
      <motion.div style={{ y: y2 }} className="absolute top-[60%] right-[8%] w-32 h-32 bg-brand-pale-pink rounded-xl rotate-45" />
    </div>
  );
};

// === JAVÍTVA: ÚJ, VÍZSZINTES ProcessTimeline KOMPONENS ===
const ProcessTimeline = ({ steps }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
        },
    };

    return (
        <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="mt-16 flex flex-col md:flex-row items-stretch justify-center gap-x-8 gap-y-12"
        >
            {steps.map((step, index) => (
                <ProcessStep key={index} index={index + 1} title={step.title} description={step.description} isLast={index === steps.length - 1} />
            ))}
        </motion.div>
    );
};

const ProcessStep = ({ index, title, description, isLast }) => (
    <motion.div 
        className="flex md:flex-col items-center text-center relative md:flex-1 w-full"
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
    >
        <motion.div 
            whileHover={{ scale: 1.05, y: -5 }} 
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex flex-col items-center text-center p-4"
        >
            <div className="w-12 h-12 bg-white border-2 border-brand-rose text-brand-rose rounded-full flex items-center justify-center font-serif text-xl z-10 shadow-lg flex-shrink-0">
                {index}
            </div>
            <div className="ml-6 md:ml-0">
                <h4 className="mt-6 font-serif text-2xl text-brand-text">{title}</h4>
                <p className="mt-2 text-gray-500 font-body">{description}</p>
            </div>
        </motion.div>

        {/* Összekötő vonal */}
        {!isLast && <div className="hidden md:block absolute top-6 left-1/2 w-full h-px bg-gray-300" />}
    </motion.div>
);