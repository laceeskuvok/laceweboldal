'use client';

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Header from "../../components/Header";
import { CheckCircle, ArrowRight, PackageCheck, Check, ArrowBigRightDash } from "lucide-react";
import DemoDrawer from "../../components/DemoDrawer";


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
      { name: "Esküvői program", img: "/images/eskuvoihirlap.jpg" },
      { name: "Interjú a párral", img: "/images/eskuvoihirlap.jpg" },
      { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" },
    ],
    notes: "Extraként feltűnthető benne a menü is.",
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
  {
    id: "03", 
    slug: "lace-website", 
    name: "Lace Website", 
    price: "49 900 Ft-tól", 
    description: "Minden információ egy helyen, a meghívótok stílusában! Egy személyre szabott esküvői weboldal a legelegánsabb és legkényelmesebb módja, hogy a vendégeitekkel minden fontos részletet megosszátok, a helyszíntől az ajándéklistáig.", 
    items: [ 
      { name: "Minden fontos információ egy helyen", img: "/images/eskuvoihirlap.jpg" },
      { name: "Interaktív ajándéklista (backenddel)", img: "/images/eskuvoihirlap.jpg" },
      { name: "Online vendégkönyv és üzenőfal", img: "/images/eskuvoihirlap.jpg" },
      { name: "Kép- és videógaléria", img: "/images/eskuvoihirlap.jpg" },
      { name: "Beágyazott térkép a helyszínhez", img: "/images/eskuvoihirlap.jpg" }
    ],
    notes: "Az ár tartalmazza a domain és a tárhely beállítását az első évre.",
    bgColor: "#F8F8FA" 
}
];

const otherCollections = [
  { id: "04", slug: "lace-portrait", name: "Lace Portrait", price: "39 900 Ft-tól", description: "Ebben a kollekcióban a főszerep a fotóitoké. Egy gyönyörűen megtervezett, kinyitható meghívó, ahol a képek mesélik el a történeteteket, minimális, de elegáns szöveggel kiegészítve. Boríték helyett finom szalaggal átkötve érkezik hozzátok.",notes: "Extraként menükártya is kérhető.", items: [ { name: "Kinyitható, képcentrikus meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Programkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Szalaggal átkötve", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" }, 
  { id: "05", slug: "lace-pure", name: "Lace Pure", price: "32 000 Ft-tól", description: "Ha szeretitek a minimalizmust és a letisztult elemeket, ez a csomag remek választás számotokra. Egyszerű, időtlen elegancia, ami sosem megy ki a divatból.", notes: "Extraként menükártya is kérhető.", items: [ { name: "Boríték", img: "/images/eskuvoihirlap.jpg" }, { name: "Meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Programkártya", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" },
  { id: "06", slug: "lace-bloom", name: "Lace Bloom", price: "32 000 Ft-tól", description: "A Lace Bloom kollekció azoknak szól, akik a merész mintákat és a különleges, látványos megjelenést keresik. A design középpontjában a gazdag grafika és az egyedi részletek állnak.", items: [ { name: "Extrém, mintás design", img: "/images/eskuvoihirlap.jpg" }, { name: "Látványos megjelenés", img: "/images/eskuvoihirlap.jpg" }, { name: "Egyedi részletek", img: "/images/eskuvoihirlap.jpg" }, { name: "Gazdag grafika", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" },
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
                        <Link href={`#${collection.slug}`} className="block group rounded-xl">
                            <div className="overflow-hidden rounded-3xl shadow-xl">
                                <Image src={collection.img} alt={collection.name} width={800} height={600} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"/>
                            </div>
                            <h3 className="font-serif text-3xl mt-6 text-brand-text group-hover:text-brand-rose transition-colors">{collection.name}</h3>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
        
        {otherCollections.map((collection, index) => (
            <CollectionSection key={collection.id} collection={collection} reverseLayout={index % 2 !== 0} />
        ))}

        <CustomPackageBuilder />
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
                <motion.div key={i} className="absolute rounded-2xl shadow-2xl overflow-hidden border-4 border-white cursor-pointer"
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

// === JAVÍTOTT, INTERAKTÍV EXTRÁK SZEKCIÓ ===
function ExtrasSection({ collection }) {
const { name, description, items, slug } = collection;
const [isDrawerOpen, setIsDrawerOpen] = useState(false);
const [selectedExtra, setSelectedExtra] = useState(null);
const [showHint, setShowHint] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => setShowHint(true), 4000); // Első megjelenés 4 másodperc után
  const interval = setInterval(() => {
    setShowHint(true);
    setTimeout(() => setShowHint(false), 3000); // 3 másodpercig látszik
  }, 8000); // 8 másodpercenként újra megjelenik

  return () => {
      clearTimeout(timer);
      clearInterval(interval);
  }
}, []);

const handleExtraClick = (item) => {
  if (item.name.toLowerCase().includes("weboldal")) {
    setSelectedExtra(item);
    setIsDrawerOpen(true);
  } else {
    alert(`Részletek a "${item.name}" extráról hamarosan...`);
  }
};

const closeDrawer = () => setIsDrawerOpen(false);

return (
  <section id={slug} className="py-24 bg-brand-text text-white">
    <div className="max-w-4xl mx-auto text-center px-4">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-serif text-5xl text-brand-rose">{name}</motion.h2>
      <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="mt-4 text-lg max-w-2xl mx-auto text-gray-300">{description}</motion.p>
      
      <div className="relative mt-12">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-wrap justify-center items-start gap-x-8 gap-y-12"
          >
            {items.map((item) => (
              <motion.button key={item.name} onClick={() => handleExtraClick(item)}
                className="group flex flex-col items-center gap-3 w-36 text-center"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.div animate={{ scale: [1, 1.04, 1], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }} className="relative w-24 h-24 rounded-full">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-brand-rose/50">
                    <Image src={item.img} alt={item.name} width={100} height={100} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"/>
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-full">
                    <div className="text-white text-xs font-bold uppercase tracking-wider">Részletek</div>
                  </div>
                </motion.div>
                <p className="text-sm text-gray-400 group-hover:text-white transition-colors duration-300">{item.name}</p>
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence>
            {showHint && (
              <motion.div
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.9 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-[-280px] top-1/2 -translate-y-1/2 pointer-events-none"
              >
              </motion.div>
            )}
          </AnimatePresence>
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}>
        <Link href={`/kapcsolat?kollekcio=${encodeURIComponent(name)}`} passHref legacyBehavior>
          <a className="btn-primary mt-16">Részletekért kattínts a képekre!</a>
        </Link>
      </motion.div>
    </div>

    <DemoDrawer isOpen={isDrawerOpen} onClose={closeDrawer} extra={selectedExtra} />
  </section>
);
}


const imagePositions = [ { top: "5%", left: "10%", width: "60%", height: "80%", rotate: -8 }, { top: "25%", left: "45%", width: "50%", height: "65%", rotate: 5 }, { top: "50%", left: "5%", width: "45%", height: "45%", rotate: 10 }, { top: "60%", left: "60%", width: "35%", height: "40%", rotate: -3 }, ];

// === ÚJ, FELTURBÓZOTT CSOMAGÖSSZEÁLLÍTÓ KOMPONENS ===
const packageOptions = {
  basics: [
      { name: 'Meghívó', description: 'Kétoldalas, prémium papíron', price: '15 000 Ft-tól' },
      { name: 'Boríték', description: 'A meghívó stílusához illeszkedő', price: '5 000 Ft-tól' },
      { name: 'Ültetőkártya', description: 'Vendégek nevével ellátva', price: '8 000 Ft-tól' },
      { name: 'Menükártya', description: 'A vacsora fogásai elegánsan', price: '8 000 Ft-tól' },
  ],
  extras: [
      { name: 'Esküvői Hírlap', description: 'Egyedi újság a történetetekkel', price: '29 900 Ft-tól' },
      { name: 'QR Kódos Videóüzenet', description: 'Modern & meghitt gesztus', price: '15 000 Ft' },
      { name: 'Esküvői Weboldal', description: 'Minden infó egy helyen, stílusosan', price: '25 000 Ft-tól' },
      { name: 'Pecsét Monogrammal', description: 'Elegáns zárás a borítékokra', price: '10 000 Ft' },
  ]
};

function CustomPackageBuilder() {
  const [selectedItems, setSelectedItems] = useState([]);

    const handleToggleItem = (item) => {
        setSelectedItems(prev => 
            prev.some(p => p.name === item.name)
                ? prev.filter(p => p.name !== item.name)
                : [...prev, item]
        );
    };
    
    // === ÚJ: Dinamikus URL generálása a kiválasztott elemek alapján ===
    const customPackageQuery = new URLSearchParams({
        type: 'custom',
        items: selectedItems.map(item => item.name).join(','),
    }).toString();

  return (
      <section className="py-24 bg-brand-background">
          <div className="max-w-7xl mx-auto px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
                  <h2 className="font-serif text-4xl md:text-5xl text-brand-text">Állítsd össze egyedi csomagodat!</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto font-body">Nincs két egyforma esküvő, és a meghívóknak sem kell azoknak lenniük. Válogasd össze az elemeket, amikre valóban szükségetek van, és kérj egy személyre szabott árajánlatot!</p>
              </motion.div>

              <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Választó felület */}
                  <div className="lg:col-span-2 space-y-12">
                      <div>
                          <h3 className="font-serif text-2xl text-brand-text border-b border-brand-rose/30 pb-3 mb-6">Alapvető elemek</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {packageOptions.basics.map(item => (
                                  <OptionCard key={item.name} item={item} onSelect={handleToggleItem} isSelected={selectedItems.some(p => p.name === item.name)} />
                              ))}
                          </div>
                      </div>
                      <div>
                          <h3 className="font-serif text-2xl text-brand-text border-b border-brand-rose/30 pb-3 mb-6">Különleges extrák</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {packageOptions.extras.map(item => (
                                  <OptionCard key={item.name} item={item} onSelect={handleToggleItem} isSelected={selectedItems.some(p => p.name === item.name)} />
                              ))}
                          </div>
                      </div>
                  </div>
                  
                  {/* Összegző panel */}
                  <div className="lg:sticky top-28 h-fit">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h3 className="font-serif text-2xl text-brand-text flex items-center gap-3"><PackageCheck /> Összeállított csomagod</h3>
                            <div className="mt-6 border-t border-gray-200 pt-6 min-h-[150px]">
                                <AnimatePresence>
                                    {selectedItems.length > 0 ? (
                                        <motion.ul className="space-y-3">
                                            {selectedItems.map(item => (
                                                <motion.li key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="flex justify-between text-sm">
                                                    <span className="text-gray-700">{item.name}</span>
                                                    <span className="font-semibold text-gray-500">{item.price}</span>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    ) : (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 pt-8">Válassz elemeket a csomagod összeállításához!</motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            {/* === JAVÍTVA: A link most már a dinamikus URL-t használja === */}
                            <Link href={`/kapcsolat?${customPackageQuery}`} passHref legacyBehavior>
                                <a className={`btn-primary w-full mt-6 text-center ${selectedItems.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
                                    Megrendelem <ArrowRight className="inline ml-2 w-4 h-4"/>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
          </div>
      </section>
  );
}

const OptionCard = ({ item, onSelect, isSelected }) => (
  <motion.div 
      onClick={() => onSelect(item)}
      className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 ${isSelected ? 'border-brand-rose bg-brand-pale-pink/50' : 'bg-white hover:border-brand-rose/50'}`}
      whileTap={{ scale: 0.97 }}
  >
      <div className="flex items-center justify-between">
          <h4 className="font-semibold text-brand-text">{item.name}</h4>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-brand-rose border-brand-rose' : 'border-gray-300'}`}>
              {isSelected && <Check className="w-4 h-4 text-white"/>}
          </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
  </motion.div>
);