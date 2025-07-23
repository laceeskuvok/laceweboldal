'use client';

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Header from "../../components/Header";

// === FRISSÍTETT ADATSTRUKTÚRA ===
const featuredCollections = [
  { id: "01", slug: "eskuvoi-hirlap", name: "Esküvői hírlap", price: "29 900 Ft", description: "Egyedi esküvői hírlap a nagy nap legszebb pillanataival, tele személyes történetekkel, interjúkkal és a programmal. Garantáltan minden vendég megőrzi majd!", items: [ { name: "Esküvői hírlap borító", img: "/images/eskuvoihirlap.jpg" }, { name: "Páros interjú oldal", img: "/images/eskuvoihirlap.jpg" }, { name: "Programoldal", img: "/images/eskuvoihirlap.jpg" } ], bgColor: "#FAF7F6" },
  { id: "02", slug: "tortenetek-kepekben", name: "Történetek képekben (QR kóddal)", price: "34 900 Ft", description: "Lepjétek meg a vendégeket egy személyes videóüzenettel, amit a meghívóba rejtett, elegánsan elhelyezett QR kód kelt életre. Egy modern, meghitt gesztus.", items: [ { name: "Meghívó QR kóddal", img: "/images/szines_mockup.jpg" }, { name: "Idézetkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Ajándékkísérő", img: "/images/eskuvoihirlap.jpg" } ], bgColor: "#F5EBEB" },
];
const extraCollection = { id: "EX", slug: "extrak", name: "+ Extrák", description: "Tedd teljessé a nagy napot egyedi kiegészítőkkel, melyek tökéletesen illeszkednek a választott kollekció stílusához.", items: [ { name: "Egyedi menükártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Esküvői weboldal", img: "/images/eskuvoihirlap.jpg" }, { name: "Ajándékkísérő", img: "/images/eskuvoihirlap.jpg" }, { name: "Kézzel írt levél", img: "/images/eskuvoihirlap.jpg" } ] };
const otherCollections = [
    { id: "03", slug: "idotlen-romantika", name: "Időtlen romantika", price: "39 900 Ft", description: "Letisztult, elegáns stílusú kollekció örök emlékekkel.", items: [ { name: "Meghívó", img: "/images/eskuvoihirlap.jpg" } ] },
    { id: "04", slug: "vintage-varazs", name: "Vintage Varázs", price: "32 000 Ft", description: "Retro hangulatú kollekció klasszikus kerettel.", items: [ { name: "Vintage meghívó", img: "/images/eskuvoihirlap.jpg" } ] },
    { id: "05", slug: "modern-minimal", name: "Modern Minimal", price: "31 000 Ft", description: "Tiszta, modern dizájn a minimalizmus szerelmeseinek.", items: [ { name: "Minimal meghívó", img: "/images/eskuvoihirlap.jpg" } ] },
    { id: "06", slug: "boho-alom", name: "Boho álom", price: "36 500 Ft", description: "Szabad szellemű, természetes hangulatú kollekció.", items: [ { name: "Boho meghívó", img: "/images/eskuvoihirlap.jpg" } ] },
];

export default function CollectionsPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }
      }
    }
  }, []);

  return (
    <>
      <Header />
      <main className="w-full bg-white">
        <div className="text-center py-24 bg-brand-background">
             <h1 className="font-serif text-5xl md:text-7xl italic text-brand-text">Kollekcióink</h1>
             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body">Minden stílus, egy helyen. Találjátok meg a hozzátok leginkább illőt!</p>
        </div>
        
        {/* === KIEMELT KOLLEKCIÓK === */}
        {featuredCollections.map((collection, index) => (
            <CollectionSection key={collection.id} collection={collection} reverseLayout={index % 2 !== 0} />
        ))}

        {/* === EXTRÁK SZEKCIÓ === */}
        <ExtrasSection collection={extraCollection} />

        {/* === TOVÁBBI INSPIRÁCIÓK === */}
        <div id="tovabbi-kollekciok" className="py-24 bg-brand-background">
            <h2 className="text-center font-serif text-4xl md:text-5xl text-brand-text">További inspirációk</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body text-center">A kiemelt kollekciókon túlmenően az alábbi stílusokban is alkotunk, de lehetőség van teljesen egyedi elképzelések megvalósítására is.</p>
            <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 px-8">
                {otherCollections.map((collection, i) => (
                    <motion.div
                        key={collection.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                    >
                        <Link href={`#${collection.slug}`} className="block group">
                            <div className="overflow-hidden rounded-2xl shadow-xl">
                                <Image src={collection.items[0].img} alt={collection.name} width={800} height={600} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"/>
                            </div>
                            <h3 className="font-serif text-3xl mt-6 text-brand-text group-hover:text-brand-rose transition-colors">{collection.name}</h3>
                            <p className="text-gray-500 font-body mt-2">{collection.description}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
        
        {/* A "mellékes" kollekciók részletes nézete, a galériából ide ugrik */}
        {otherCollections.map((collection) => (
            <CollectionSection key={collection.id} collection={collection} />
        ))}
      </main>
    </>
  );
}

function CollectionSection({ collection, reverseLayout = false }) {
  const { id, name, description, items, bgColor, price, slug } = collection;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  const imagesForLightbox = items.map((item) => ({ src: item.img }));

  return (
    <>
      <section ref={ref} id={slug} className="min-h-screen w-full flex items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
        <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${reverseLayout ? 'lg:grid-flow-col-dense' : ''}`}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants} className={`relative z-10 ${reverseLayout ? 'lg:col-start-2' : ''}`}>
            <motion.span variants={itemVariants} className="font-serif text-7xl lg:text-8xl text-brand-rose opacity-20">{id}</motion.span>
            <motion.h2 variants={itemVariants} className="font-serif text-5xl lg:text-6xl text-brand-text -mt-8">{name}</motion.h2>
            <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-600 max-w-md leading-relaxed font-body">{description}</motion.p>
            <motion.div variants={itemVariants} className="mt-8 border-t border-brand-rose/30 pt-6">
              <h4 className="font-sans uppercase tracking-widest text-brand-text mb-4">Kollekció elemei</h4>
              <ul className="space-y-2">
                {items.map((item, i) => ( <motion.li key={i} variants={itemVariants} className="font-body text-gray-500">{item.name}</motion.li> ))}
              </ul>
              {price && (
                <Link href={`/kapcsolat?kollekcio=${encodeURIComponent(name)}`} passHref>
                  <motion.a variants={itemVariants} className="btn-primary mt-8">Megrendelem – {price}</motion.a>
                </Link>
              )}
            </motion.div>
          </motion.div>
          <div className={`relative h-[500px] w-full ${reverseLayout ? 'lg:col-start-1' : ''}`}>
            <motion.div style={{ y: imageY }} className="relative h-full w-full">
              {items.map((item, i) => (
                <motion.div key={i} className="absolute rounded-lg shadow-2xl overflow-hidden border-4 border-white cursor-pointer"
                  style={imagePositions[i % 4]} variants={itemVariants}
                  whileHover={{ scale: 1.05, zIndex: 20, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => { setIndex(i); setOpen(true); }}
                >
                  <Image src={item.img} alt={item.name} fill className="object-cover" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
      <Lightbox open={open} close={() => setOpen(false)} slides={imagesForLightbox} index={index} styles={{ container: { backgroundColor: "rgba(0, 0, 0, .85)" } }} />
    </>
  );
}

function ExtrasSection({ collection }) {
  const { name, description, items, slug } = collection;
  return (
    <section id={slug} className="py-24 bg-brand-text text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-5xl text-brand-rose">{name}</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-4 text-lg max-w-2xl mx-auto text-gray-300">{description}</motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }} className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-rose/50">
                <Image src={item.img} alt={item.name} width={100} height={100} className="object-cover"/>
              </div>
              <p className="text-sm text-center text-gray-400">{item.name}</p>
            </div>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
          <Link href={`/kapcsolat?kollekcio=${encodeURIComponent(name)}`} passHref legacyBehavior>
            <a className="btn-primary mt-12">Extrák megbeszélése</a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const imagePositions = [ { top: "5%", left: "10%", width: "60%", height: "80%", rotate: -8 }, { top: "25%", left: "45%", width: "50%", height: "65%", rotate: 5 }, { top: "50%", left: "5%", width: "45%", height: "45%", rotate: 10 }, { top: "60%", left: "60%", width: "35%", height: "40%", rotate: -3 }, ];