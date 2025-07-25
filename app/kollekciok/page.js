'use client';

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Header from "../../components/Header";
import { CheckCircle } from "lucide-react";


// === ÚJ, VÉGLEGES ADATSTRUKTÚRA ===
const featuredCollections = [
  { 
    id: "01", 
    slug: "lace-gazette", 
    name: "Lace Gazette", 
    price: "29 900 Ft-tól", 
    description: "4 oldalas meghívó újság formában. A címlapon természetesen ti szerepeltek, belül egy kedves interjú meséli el a szerelmetek történetét. A helyszín és a dátum kreatívan, játékos formában van elrejtve a sorok között, így az olvasás is élménnyé válik. Igény esetén a menü is helyet kap benne. Tökéletes választás, ha valami igazán különlegeset szeretnétek.", 
    items: [ 
      { name: "4 oldalas újság meghívó (színes/ff)", img: "/images/eskuvoihirlap.jpg" },
      { name: "Programot tartalmazza", img: "/images/eskuvoihirlap.jpg" },
      { name: "Interjú a párral", img: "/images/eskuvoihirlap.jpg" },
      { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" },
    ],
    notes: "Boríték nem tartozik hozzá. Extraként feltűnthető benne a menü is.",
    bgColor: "#FAF7F6" 
  },
  { 
    id: "02", 
    slug: "lace-message", 
    name: "Lace Message", 
    price: "34 900 Ft-tól", 
    description: "Lepjétek meg vendégeiteket egy igazán modern, mégis meghitt gesztussal! A meghívóba rejtett egyedi QR-kód egy személyes videóüzenetet kelt életre, amivel garantáltan felejthetetlen élménnyé teszitek a meghívást. A QR-kód bármelyik grafikai elemen elhelyezhető.",
    items: [
      { name: "Meghívó QR-kóddal", img: "/images/eskuvoihirlap.jpg" },
      { name: "Hozzá illő boríték", img: "/images/eskuvoihirlap.jpg" },
      { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" },
      { name: "Programkártya", img: "/images/eskuvoihirlap.jpg" },
    ],
    notes: "Extraként menükártya is kérhető.",
    bgColor: "#F5EBEB" 
  },
];

const otherCollections = [
  { id: "03", slug: "lace-portrait", name: "Lace Portrait", price: "39 900 Ft-tól", description: "Ebben a kollekcióban a főszerep a fotóitoké. Egy gyönyörűen megtervezett, kinyitható meghívó, ahol a képek mesélik el a történeteteket, minimális, de elegáns szöveggel kiegészítve. Boríték helyett finom szalaggal átkötve érkezik hozzátok.",notes: "Extraként menükártya is kérhető.", items: [ { name: "Kinyitható, képcentrikus meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Programkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Szalaggal átkötve", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" }, 
  { id: "04", slug: "lace-pure", name: "Lace Pure", price: "32 000 Ft-tól", description: "A letisztultság és a minimalizmus kedvelőinek. Egyszerű, mégis nagyszerű design, ahol a fókusz a gyönyörű tipográfián és a prémium papíron van. Időtlen elegancia, ami sosem megy ki a divatból.", notes: "Extraként menükártya is kérhető.", items: [ { name: "Boríték", img: "/images/eskuvoihirlap.jpg" }, { name: "Meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Programkártya", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" },
  { id: "05", slug: "lace-bloom", name: "Lace Bloom", price: "Egyedi árazás", description: "A Lace Bloom kollekció azoknak szól, akik a merész mintákat és a különleges, látványos megjelenést keresik. A design középpontjában a gazdag grafika és az egyedi részletek állnak. Kérjétek egyedi igényeitek szerint!", items: [ { name: "Extrém, mintás design", img: "/images/eskuvoihirlap.jpg" }, { name: "Látványos megjelenés", img: "/images/eskuvoihirlap.jpg" }, { name: "Egyedi részletek", img: "/images/eskuvoihirlap.jpg" }, { name: "Gazdag grafika", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" },
];

const extraCollection = { id: "EX", slug: "extrak", name: "+ Extrák", description: "Tedd teljessé a nagy napot egyedi kiegészítőkkel! Ezek a kiegészítők minden kollekcióhoz opcionálisan kérhetők, hogy minden apró részlet tökéletes összhangban legyen.", items: [ { name: "Kollekcióhoz illő menükártyák", img: "/images/eskuvoihirlap.jpg" }, { name: "Esküvői weboldal a meghívó stílusában", img: "/images/eskuvoihirlap.jpg" }, { name: "1 db QR-kód videóüzenettel", img: "/images/eskuvoihirlap.jpg" } ] };

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
             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body">Találjátok meg a stílusotokhoz leginkább illő történetet!</p>
        </div>
        
        {featuredCollections.map((collection, index) => (
            <CollectionSection key={collection.id} collection={collection} reverseLayout={index % 2 !== 0} />
        ))}

        <ExtrasSection collection={extraCollection} />

        <div id="tovabbi-kollekciok" className="py-24 bg-brand-background">
            <h2 className="text-center font-serif text-4xl md:text-5xl text-brand-text">További inspirációk</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body text-center">A kiemelt kollekciókon túlmenően az alábbi stílusokban is alkotunk, de lehetőség van teljesen egyedi elképzelések megvalósítására is.</p>
            <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-8">
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
                                <Image src={collection.img} alt={collection.name} width={800} height={600} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"/>
                            </div>
                            <h3 className="font-serif text-3xl mt-6 text-brand-text group-hover:text-brand-rose transition-colors">{collection.name}</h3>
                            <p className="text-gray-500 font-body mt-2">{collection.description}</p>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
        
        {otherCollections.map((collection, index) => (
            <CollectionSection key={collection.id} collection={collection} reverseLayout={index % 2 !== 0} />
        ))}
      </main>
    </>
  );
}

function CollectionSection({ collection, reverseLayout = false }) {
  const { id, name, description, items, bgColor, price, slug, notes } = collection;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
  
  // A Lightbox-hoz most már a kollekció elemeket kell átadni
  const imagesForLightbox = items.filter(item => item.img).map(item => ({ src: item.img }));

  return (
    <>
      <section ref={ref} id={slug} className="min-h-screen w-full flex items-center justify-center p-8 relative overflow-hidden" style={{ backgroundColor: bgColor }}>
        <div className={`max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${reverseLayout ? 'lg:grid-flow-col-dense' : ''}`}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} className={`relative z-10 ${reverseLayout ? 'lg:col-start-2' : ''}`}>
            <motion.span variants={itemVariants} className="font-serif text-7xl lg:text-8xl text-brand-rose opacity-20">{id}</motion.span>
            <motion.h2 variants={itemVariants} className="font-serif text-5xl lg:text-6xl text-brand-text -mt-8">{name}</motion.h2>
            <motion.p variants={itemVariants} className="mt-6 text-lg text-gray-600 max-w-md leading-relaxed font-body">{description}</motion.p>
            <motion.div variants={itemVariants} className="mt-8 border-t border-brand-rose/30 pt-6">
              <h4 className="font-sans uppercase tracking-widest text-brand-text mb-4">A kollekció tartalma:</h4>
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <motion.li key={i} variants={itemVariants} className="font-body text-gray-700 flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-rose flex-shrink-0" />
                    <span>{item.name}</span>
                  </motion.li>
                ))}
              </ul>
              {notes && <motion.p variants={itemVariants} className="text-sm text-gray-500 mt-4">{notes}</motion.p>}
              {price && (
                <Link href={`/kapcsolat?kollekcio=${encodeURIComponent(name)}`} passHref>
                  <motion.a variants={itemVariants} className="btn-primary mt-8">Árajánlatot kérek – {price}</motion.a>
                </Link>
              )}
            </motion.div>
          </motion.div>
          <div className={`relative h-[550px] w-full ${reverseLayout ? 'lg:col-start-1' : ''}`}>
            <motion.div style={{ y: imageY }} className="relative h-full w-full">
              {items.map((item, i) => (
                <motion.div key={i} className="absolute rounded-lg shadow-2xl overflow-hidden border-4 border-white cursor-pointer"
                  style={imagePositions[i % 4]} variants={itemVariants}
                  whileHover={{ scale: 1.05, zIndex: 20, boxShadow: "0px 20px 40px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  onClick={() => { setIndex(i); setOpen(true); }}
                >
                  {item.img && <Image src={item.img} alt={item.name} fill className="object-cover" />}
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
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-serif text-5xl text-brand-rose"
        >
          {name}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg max-w-2xl mx-auto text-gray-300"
        >
          {description}
        </motion.p>
        
        {/* === JAVÍTVA: Flexbox elrendezés a tökéletes középre igazításhoz === */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          // A grid helyett flex-et használunk, ami középre rendezi az elemeket
          className="mt-12 flex flex-wrap justify-center items-start gap-x-8 gap-y-12"
        >
          {items.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-3 w-36"> {/* Fix szélességet adunk a konzisztens tördelésért */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-rose/50">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>
              <p className="text-sm text-center text-gray-400">{item.name}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href={`/kapcsolat?kollekcio=${encodeURIComponent(name)}`}
            passHref
            legacyBehavior
          >
            <a className="btn-primary mt-12">Extrák megbeszélése</a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const imagePositions = [ { top: "5%", left: "10%", width: "60%", height: "80%", rotate: -8 }, { top: "25%", left: "45%", width: "50%", height: "65%", rotate: 5 }, { top: "50%", left: "5%", width: "45%", height: "45%", rotate: 10 }, { top: "60%", left: "60%", width: "35%", height: "40%", rotate: -3 }, ];