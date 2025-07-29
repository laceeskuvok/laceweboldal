'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Header from "../../components/Header";
import { CheckCircle, Gift, MessageSquare, MapPin, Check, Plus, PackageCheck } from "lucide-react";
import DemoDrawer from "../../components/DemoDrawer";
import { useMediaQuery } from "../../lib/useMediaQuery";
import { Dialog } from "@headlessui/react";


// === VÉGLEGES ADATSTRUKTÚRA ===
const collectionsData = [
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
    name: "Lace Page", 
    price: "49 900 Ft-tól", 
    description: "Minden információ egy helyen, a meghívótok stílusában! Egy személyre szabott esküvői weboldal a legelegánsabb és legkényelmesebb módja, hogy a vendégeitekkel minden fontos részletet megosszátok, a helyszíntől az ajándéklistáig.", 
    items: [ 
      { name: "Minden fontos információ egy helyen" }, { name: "Interaktív ajándéklista (backenddel)" },
      { name: "Online vendégkönyv és üzenőfal" }, { name: "Kép- és videógaléria" },
      { name: "Beágyazott térkép a helyszínhez" }
    ],
    notes: "Az ár tartalmazza a domain és a tárhely beállítását az első évre.",
    bgColor: "#F8F8FA" 
  },
  { id: "04", slug: "lace-portrait", name: "Lace Portrait", price: "39 900 Ft-tól", description: "Ebben a kollekcióban a főszerep a fotóitoké. Egy gyönyörűen megtervezett, kinyitható meghívó, ahol a képek mesélik el a történeteteket, minimális, de elegáns szöveggel kiegészítve. Boríték helyett finom szalaggal átkötve érkezik hozzátok.",notes: "Extraként menükártya is kérhető.", items: [ { name: "Kinyitható, képcentrikus meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Programkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Szalaggal átkötve", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" },

{ id: "05", slug: "lace-pure", name: "Lace Pure", price: "32 000 Ft-tól", description: "Ha szeretitek a minimalizmust és a letisztult elemeket, ez a csomag remek választás számotokra. Egyszerű, időtlen elegancia, ami sosem megy ki a divatból.", notes: "Extraként menükártya is kérhető.", items: [ { name: "Boríték", img: "/images/eskuvoihirlap.jpg" }, { name: "Meghívó", img: "/images/eskuvoihirlap.jpg" }, { name: "Ültetőkártya", img: "/images/eskuvoihirlap.jpg" }, { name: "Programkártya", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" },

{ id: "06", slug: "lace-bloom", name: "Lace Bloom", price: "32 000 Ft-tól", description: "A Lace Bloom kollekció azoknak szól, akik a merész mintákat és a különleges, látványos megjelenést keresik. A design középpontjában a gazdag grafika és az egyedi részletek állnak.", items: [ { name: "Extrém, mintás design", img: "/images/eskuvoihirlap.jpg" }, { name: "Látványos megjelenés", img: "/images/eskuvoihirlap.jpg" }, { name: "Egyedi részletek", img: "/images/eskuvoihirlap.jpg" }, { name: "Gazdag grafika", img: "/images/eskuvoihirlap.jpg" } ], img: "/images/eskuvoihirlap.jpg" },
];

const extraCollection = { id: "EX", slug: "extrak", name: "+ Extrák", description: "Tedd teljessé a nagy napot egyedi kiegészítőkkel!", items: [ { id: 'menu', name: "Kollekcióhoz illő menükártyák", img: "/images/eskuvoihirlap.jpg" }, { id: 'website', name: "Esküvői mini weboldal", img: "/images/eskuvoihirlap.jpg" }, { id: 'qr-code', name: "1 db QR-kód videóüzenettel", img: "/images/eskuvoihirlap.jpg" } ] };



export default function CollectionsPage() {
  const [selectedExtra, setSelectedExtra] = useState(null);
  const openDrawer = (extra) => setSelectedExtra(extra);
  const closeDrawer = () => setSelectedExtra(null);

  const featuredCollectionsData = collectionsData.filter(c => ['lace-gazette', 'lace-message'].includes(c.slug));
  const lacePageCollection = collectionsData.find(c => c.slug === 'lace-website');
  const otherCollectionsData = collectionsData.filter(c => !featuredCollectionsData.includes(c) && c.slug !== 'lace-website');

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
             <h1 className="font-serif text-5xl md:text-7xl italic text-brand-text">Kollekciók</h1>
             <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body">Találjátok meg a stílusotokhoz leginkább illő történetet!</p>
        </div>
        
        {featuredCollectionsData.map((collection, index) => (
            <CollectionSection key={collection.id} collection={collection} reverseLayout={index % 2 !== 0} />
        ))}

        {lacePageCollection && <LacePageSection collection={lacePageCollection} />}

        
        
        {otherCollectionsData.map((collection, index) => (
            <CollectionSection key={collection.id} collection={collection} reverseLayout={index % 2 !== 0} />
        ))}
      <ExtrasSection collection={extraCollection} onExtraClick={openDrawer} />
      <CustomPackageBuilder />
      </main>
    </>
  );
}

function CollectionSection({ collection, reverseLayout = false }) {
  const { id, name, description, items, bgColor, price, slug, notes } = collection;
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const imagePositions = [ { top: "5%", left: "10%", width: "60%", height: "80%", rotate: -8 }, { top: "25%", left: "45%", width: "50%", height: "65%", rotate: 5 }, { top: "50%", left: "5%", width: "45%", height: "45%", rotate: 10 }, { top: "60%", left: "60%", width: "35%", height: "40%", rotate: -3 }, ];

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

// === ÚJ, EGYEDI SZEKCIÓ A LACE PAGE-HEZ ===
function LacePageSection({ collection }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { id, name, description, items, bgColor, price, slug, notes } = collection;
  const websiteExtra = items.find(item => item.id === 'website');
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const closeDrawer = () => setIsDrawerOpen(false);

  const router = useRouter();

  return (
    <section id={slug} className="min-h-screen w-full flex items-center justify-center p-8" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        <div>
          <span className="font-serif text-7xl lg:text-8xl text-brand-rose opacity-20">{id}</span>
          <h2 className="font-serif text-5xl lg:text-6xl text-brand-text -mt-8">{name}</h2>
          <p className="mt-6 text-lg text-gray-600 max-w-md leading-relaxed font-body">{description}</p>
          <div className="mt-8 border-t border-brand-rose/30 pt-6">
            <h4 className="font-sans uppercase tracking-widest text-brand-text mb-4">A kollekció tartalma:</h4>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="font-body text-gray-700 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-rose flex-shrink-0" /><span>{item.name}</span>
                </li>
              ))}
            </ul>
            {notes && <p className="text-sm text-gray-500 mt-4">{notes}</p>}
            {price && (
              <Link href={`/kapcsolat?kollekcio=${encodeURIComponent(name)}`} passHref legacyBehavior>
                <a className="btn-primary mt-8">Árajánlatot kérek – {price}</a>
              </Link>
            )}
          </div>
          
        </div>

        <div className="relative w-full h-[550px]">
          {isMobile ? <MobileDemoCarousel /> : <DesktopDemoCollage />}
          {(() => {
            const websiteExtra = extraCollection.items.find(item => item.id === 'website');
            if (!websiteExtra) return null;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={() => router.push("/demo/eskuvoi")}
                  className="btn-primary -mt-5"
                >
                  Megtekintem a weboldal demot
                </button>
              </motion.div>
            );
          })()}
        </div>


      </div>

    </section>
    
  );
}

function MobileDemoCarousel() {
  const demos = [<InfoPageDemo />, <GuestbookDemo />, <GiftListDemo />];
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex((prev) => (prev + 1) % demos.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + demos.length) % demos.length);

  return (
    <div className="w-full h-full relative overflow-hidden rounded-2xl shadow-lg bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-0 left-0 w-full h-full p-4"
        >
          {demos[index]}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4">
        <button onClick={handlePrev} className="text-xs text-gray-500">⟵ Előző</button>
        <button onClick={handleNext} className="text-xs text-gray-500">Következő ⟶</button>
      </div>
    </div>
  );
}

function DesktopDemoCollage() {
  return (
    <div className="relative w-full h-[550px] flex items-center justify-center">
      <DemoCard position="center"><InfoPageDemo /></DemoCard>
      <DemoCard position="topLeft"><GuestbookDemo /></DemoCard>
      <DemoCard position="bottomRight"><GiftListDemo /></DemoCard>
    </div>
    
  );
}

// === Új segédkomponensek a Demó Kollázshoz ===
const DemoCard = ({ children, position }) => {
  const positions = {
    center: 'z-20 scale-100 relative',
    topLeft: 'z-10 absolute top-5 left-5 scale-95',
    bottomRight: 'z-10 absolute bottom-5 right-5 scale-95',
  };

  return (
    <motion.div
      className={`bg-white/90 backdrop-blur-sm rounded-xl border border-gray-100 shadow-md w-72 h-80 overflow-hidden ${positions[position]}`}
      whileHover={{ scale: 1.04, zIndex: 30 }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
    >
      <div className="w-full h-full overflow-y-auto p-2 scrollbar-hide">{children}</div>
    </motion.div>
  );
};


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
  const name = item.name.toLowerCase();
  if (name.includes("weboldal") || name.includes("menükártyák")) {
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
          <a className="btn-primary mt-16">Kattints a részletekért!</a>
        </Link>
      </motion.div>
    </div>

    <DemoDrawer
  key={selectedExtra?.id || selectedExtra?.name} // <== ez fontos!
  isOpen={isDrawerOpen}
  onClose={closeDrawer}
  extra={selectedExtra}
/>

  </section>
);
}




// === ÚJ, FELTURBÓZOTT CSOMAGÖSSZEÁLLÍTÓ ("Stílus-Keverő") ===
const packageOptions = {
  styles: [
    { name: 'Időtlen Romantika', description: 'Klasszikus, elegáns betűtípusok és finom vonalak.' },
    { name: 'Modern Minimalista', description: 'Letisztult formák, merész tipográfia, szellős elrendezés.' },
    { name: 'Rusztikus Varázslat', description: 'Természetes textúrák, kézzel rajzolt motívumok.' },
  ],
  formats: [
      { name: 'Klasszikus Meghívó', description: 'Kétoldalas kártya, prémium papíron.' },
      { name: 'Esküvői Hírlap', description: '4 oldalas, magazinszerű élmény a történetetekkel.' },
      { name: 'QR Kódos Meghívó', description: 'Interaktív megoldás videóüzenettel.' },
  ],
  addons: [
      { name: 'Ültetőkártya', description: 'Vendégek nevével ellátva' },
      { name: 'Menükártya', description: 'A vacsora fogásai elegánsan' },
      { name: 'Programkártya', description: 'A nagy nap menetrendje' },
      { name: 'Köszönőkártya', description: 'Személyes üzenet a vendégeknek' },
  ],
  finishes: [
      { name: 'Pecsét Monogrammal', description: 'Elegáns viaszpecsét a ti monogramotokkal a borítékra.' },
      { name: 'Esküvői Weboldal', description: 'Minden információ egy helyen, a választott stílusban. Késöbb teljesen testreszabható a részletekkel.' },
  ]
};

function CustomPackageBuilder() {
    const [step, setStep] = useState(1);
    const [selection, setSelection] = useState({ style: null, format: null, addons: [], finishes: [] });

    const handleSelect = (category, value) => {
        if (category === 'addons' || category === 'finishes') {
            setSelection(prev => ({
                ...prev,
                [category]: prev[category].includes(value) ? prev[category].filter(i => i !== value) : [...prev[category], value]
            }));
        } else {
            setSelection(prev => ({ ...prev, [category]: value }));
            setStep(prevStep => prevStep + 1);
        }
    };
    
    const canProceed = () => {
        if (step === 1) return selection.style;
        if (step === 2) return selection.format;
        return true;
    };
    
    const getSummary = () => {
        let summary = [];
        if (selection.style) summary.push({ name: selection.style.name, type: 'Stílus' });
        if (selection.format) summary.push({ name: selection.format.name, type: 'Formátum' });
        selection.addons.forEach(item => summary.push({ name: item.name, type: 'Kiegészítő' }));
        selection.finishes.forEach(item => summary.push({ name: item.name, type: 'Extra' }));
        return summary;
    };

    const summaryItems = getSummary();
    const customPackageQuery = new URLSearchParams({ type: 'custom', items: summaryItems.map(i => i.name).join(',') }).toString();

    return (
      <section className="py-24 bg-brand-background">
          <div className="max-w-7xl mx-auto px-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                  <h2 className="font-serif text-4xl md:text-5xl text-brand-text">Tervezd meg a saját kollekciódat!</h2>
                  <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto font-body">Nem találtad meg a tökéleteset? Nincs gond! Ezzel a három egyszerű lépéssel Te magad állíthatod össze az álomcsomagot.</p>
              </motion.div>

              <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <AnimatePresence mode="wait">
                        {step === 1 && <StepComponent key={1} title="1. Lépés: Mi legyen az alap stílus?" options={packageOptions.styles} selected={selection.style} onSelect={(val) => handleSelect('style', val)} />}
                        {step === 2 && <StepComponent key={2} title="2. Lépés: Milyen formátumban mesélitek el a történetet?" options={packageOptions.formats} selected={selection.format} onSelect={(val) => handleSelect('format', val)} />}
                        {step === 3 && <StepComponent key={3} title="3. Lépés: Válassz kiegészítőket és extrákat" options={[...packageOptions.addons, ...packageOptions.finishes]} selected={[...selection.addons, ...selection.finishes]} onSelect={(val) => val.price ? handleSelect('finishes', val) : handleSelect('addons', val)} isMultiSelect />}
                    </AnimatePresence>
                  </div>
                  
                  <div className="lg:sticky top-28 h-fit">
                        <div className="bg-white rounded-2xl shadow-xl p-8">
                            <h3 className="font-serif text-2xl text-brand-text flex items-center gap-3"><PackageCheck /> Összeállított csomagod</h3>
                            <div className="mt-6 border-t border-gray-200 pt-6 min-h-[200px]">
                                <AnimatePresence>
                                    {summaryItems.length > 0 ? (
                                        <motion.ul className="space-y-3">
                                            {summaryItems.map(item => (
                                                <motion.li key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="text-sm">
                                                    <span className="font-semibold text-gray-500 block">{item.type}</span>
                                                    <span className="text-gray-700">{item.name}</span>
                                                </motion.li>
                                            ))}
                                        </motion.ul>
                                    ) : (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-500 pt-12">Válogasd össze álmaid csomagját!</motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="flex items-center gap-4 mt-6">
                                {step > 1 && <button onClick={() => setStep(s => s - 1)} className="text-sm text-gray-500 hover:text-brand-text">Vissza</button>}
                                {step < 3 && <button onClick={() => setStep(s => s + 1)} disabled={!canProceed()} className="btn-primary flex-grow text-center disabled:opacity-50">Tovább</button>}
                                {step === 3 && <Link href={`/kapcsolat?${customPackageQuery}`} passHref legacyBehavior><a className="btn-primary w-full text-center">Árajánlatot kérek</a></Link>}
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </section>
  );
}

const StepComponent = ({ title, options, selected, onSelect, isMultiSelect = false }) => (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: 'spring', stiffness: 200, damping: 25 }}>
        <h3 className="font-serif text-2xl text-brand-text border-b border-brand-rose/30 pb-3 mb-6">{title}</h3>
        <div className={`grid grid-cols-1 ${isMultiSelect ? 'sm:grid-cols-2' : 'sm:grid-cols-3'} gap-4`}>
            {options.map(item => (
                <OptionCard key={item.name} item={item} onSelect={() => onSelect(item)} isSelected={isMultiSelect ? selected.some(s => s.name === item.name) : selected?.name === item.name} />
            ))}
        </div>
    </motion.div>
);

const OptionCard = ({ item, onSelect, isSelected }) => (
  <motion.div 
      onClick={onSelect}
      className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 h-full ${isSelected ? 'border-brand-rose bg-brand-pale-pink/50' : 'bg-white hover:border-brand-rose/50'}`}
      whileTap={{ scale: 0.97 }}
  >
      <div className="flex items-center justify-between">
          <h4 className="font-semibold text-brand-text">{item.name}</h4>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0 ${isSelected ? 'bg-brand-rose border-brand-rose' : 'border-gray-300'}`}>
              {isSelected && <Check className="w-4 h-4 text-white"/>}
          </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
  </motion.div>
);

// === MODAL: név bekérés foglaláshoz ===
const ClaimModal = ({ isOpen, onClose, onConfirm }) => {
  const [name, setName] = useState("");

  const handleConfirm = () => {
    if (name.trim()) {
      onConfirm(name.trim());
      setName("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="z-50 bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-sm"
          >
            <Dialog.Title className="text-lg font-bold text-gray-800 mb-3">Add meg a neved</Dialog.Title>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Pl. Nóri és Gergő"
              className="w-full p-2 border rounded-md mb-4 text-sm"
            />
            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-1 text-sm text-gray-500 hover:text-gray-700">Mégse</button>
              <button onClick={handleConfirm} disabled={!name.trim()} className="px-4 py-1 bg-brand-rose text-white rounded-md hover:bg-brand-rose/90 disabled:opacity-50 text-sm">
                Lefoglalom
              </button>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

// === FELTURBÓZOTT MINI-DEMÓ KOMPONENS ===
const GiftListDemo = () => {
  const initialGifts = [
    { id: 1, name: 'Wellness hétvége', is_claimed: true, claimed_by: 'Nóri & Gergő' },
    { id: 2, name: 'Repülőjegy', is_claimed: false },
  ];
  const [gifts, setGifts] = useState(initialGifts);
  const [newItem, setNewItem] = useState({ name: '', description: '', image: null });
  const [selectedGiftId, setSelectedGiftId] = useState(null);

  const selectedGift = gifts.find(g => g.id === selectedGiftId);

  const handleConfirmClaim = (name) => {
    setGifts(gifts.map(g => g.id === selectedGiftId ? { ...g, is_claimed: true, claimed_by: name } : g));
    setSelectedGiftId(null);
  };

  const handleAddItem = () => {
    if (!newItem.name.trim()) return;
    setGifts([...gifts, {
      id: Date.now(),
      name: newItem.name.trim(),
      description: newItem.description?.trim(),
      image: newItem.image,
      is_claimed: false
    }]);
    setNewItem({ name: '', description: '', image: null });
  };

  return (
    <div className="p-4 space-y-4 text-sm bg-gray-50 rounded-xl border border-gray-200">
      <div className="space-y-3">
        {gifts.map(gift => (
          <div key={gift.id} className={`p-3 rounded-lg flex items-center gap-4 transition-all ${gift.is_claimed ? 'bg-gray-100' : 'bg-white shadow-sm hover:shadow-md'}`}>
            {gift.image ? (
              <img src={gift.image} alt={gift.name} className="w-10 h-10 rounded object-cover" />
            ) : (
              <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                <Gift className="w-5 h-5 text-gray-400" />
              </div>
            )}
            <div className="flex-grow">
              <p className={`font-semibold ${gift.is_claimed ? 'text-gray-400 line-through' : 'text-brand-text'}`}>{gift.name}</p>
              {gift.is_claimed && (
                <p className="text-xs text-gray-500">Lefoglalva: <span className="italic">{gift.claimed_by}</span></p>
              )}
            </div>
            {!gift.is_claimed && (
              <button
                onClick={() => setSelectedGiftId(gift.id)}
                className="w-7 h-7 flex items-center justify-center border-2 border-brand-rose text-brand-rose rounded-full hover:bg-brand-rose/10 transition"
              >
                <Check size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-2">
        <input
          type="text"
          value={newItem.name}
          onChange={e => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Új ajándék neve (pl. Spa belépő)"
          className="w-full text-sm p-2 border rounded-md"
        />
        <button
          onClick={handleAddItem}
          className="w-full text-sm p-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
        >
          Hozzáadás a demóhoz
        </button>
      </div>

      {/* MODÁLIS ABLAK */}
      <ClaimModal
        isOpen={selectedGiftId !== null}
        onClose={() => setSelectedGiftId(null)}
        onConfirm={handleConfirmClaim}
      />
    </div>
  );
};

const GuestbookDemo = () => {
  const [messages, setMessages] = useState([
      { id: 1, name: 'Anna', text: 'Sok boldogságot kívánunk!' }
  ]);
  const [newMessage, setNewMessage] = useState({ name: '', text: ''});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
      e.preventDefault();
      if (!newMessage.name || !newMessage.text) return;
      setIsSubmitting(true);
      setTimeout(() => {
          setMessages(prev => [...prev, { id: Date.now(), ...newMessage }]);
          setNewMessage({ name: '', text: '' });
          setIsSubmitting(false);
      }, 500); // Szimulálunk egy kis késleltetést
  };

  return (
      <div className="p-2 space-y-3">
          <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
              <AnimatePresence>
                  {messages.map(msg => (
                      <motion.div 
                          key={msg.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="bg-white p-3 rounded-lg shadow-sm"
                      >
                          <p className="text-xs font-semibold text-brand-rose">{msg.name}</p>
                          <p className="text-sm text-gray-600">{msg.text}</p>
                      </motion.div>
                  ))}
              </AnimatePresence>
          </div>
          <form onSubmit={handleSubmit} className="pt-3 border-t border-gray-200 space-y-2">
              <input type="text" value={newMessage.name} onChange={e => setNewMessage({...newMessage, name: e.target.value})} placeholder="Neved..." className="w-full text-xs p-2 border rounded-md" required />
              <input type="text" value={newMessage.text} onChange={e => setNewMessage({...newMessage, text: e.target.value})} placeholder="Írj egy üzenetet..." className="w-full text-xs p-2 border rounded-md" required />
              <button type="submit" disabled={isSubmitting} className="w-full text-xs p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50">
                  {isSubmitting ? "Küldés..." : "Üzenet elküldése"}
              </button>
          </form>
      </div>
  );
};

const InfoPageDemo = () => {
  const locationName = "Liszkay Pincészet, Monoszló";
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2729.172491125211!2d17.62181891559899!3d46.840224979141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769a6d0f28a8d7d%3A0x86c6b229c13b2c1!2sLiszkay%20Pinc%C3%A9szet!5e0!3m2!1shu!2shu!4v1678886543210!5m2!1shu!2shu";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Liszkay+Pincészet+Monoszló";

  return (
      <div className="p-2 space-y-3">
          <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-brand-rose flex-shrink-0"/>
              <p className="text-sm font-semibold text-gray-700 truncate">{locationName}</p>
          </div>
          <div className="h-28 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
          </div>
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="w-full text-xs p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition block text-center">
              Útvonaltervezés
          </a>
      </div>
  );
};

// === ÚJ, FELTURBÓZOTT MENÜKÁRTYA DEMÓ KOMPONENS ===
const MenuCardDetail = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left) / rect.width - 0.5);
      y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const menuItems = [
      { icon: <Soup/>, category: 'Előétel', name: 'Erdei gombakrémleves pirított mandulával' },
      { icon: <Beef/>, category: 'Főétel', name: 'Rozmaringos kacsamell burgonyapürével és vörösboros mártással' },
      { icon: <Wine/>, category: 'Desszert & Italok', name: 'Somlói galuska és válogatott borok a Liszkay Pincészetből' },
  ];
  
  return (
      <div className="space-y-6">
          <div>
              <h3 className="font-serif text-xl text-brand-text mb-2">Egyedi Menükártya</h3>
              <p className="font-body text-gray-600 leading-relaxed">
                  Emeljétek az ünnepi asztal fényét egy, a meghívótok stílusához tökéletesen illeszkedő menükártyával! Minden darabot prémium papírra nyomtatunk, a ti egyedi menütökkel és design elemeitekkel.
              </p>
          </div>

          <motion.div
              ref={ref}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="w-full max-w-sm mx-auto bg-rose-50 rounded-lg shadow-2xl p-8 border border-rose-100 aspect-[3/4] flex flex-col justify-between"
          >
              <div style={{ transform: "translateZ(40px)" }} className="text-center">
                  <p className="text-sm tracking-widest text-gray-500">MENÜ</p>
                  <h2 className="text-4xl mt-2 text-brand-rose" style={{ fontFamily: 'Great Vibes, cursive' }}>Anna & Bence</h2>
              </div>
              
              <div className="space-y-6" style={{ transform: "translateZ(30px)" }}>
                  {menuItems.map(item => (
                      <div key={item.category}>
                          <p className="font-sans text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">{item.icon} {item.category}</p>
                          <p className="mt-1 text-brand-text">{item.name}</p>
                      </div>
                  ))}
              </div>

              <p style={{ transform: "translateZ(20px)" }} className="text-center text-xs text-gray-400">Jó étvágyat kívánunk!</p>
          </motion.div>

           <div className="pt-4 text-center">
               <Link href="/kapcsolat?kollekcio=Egyedi+menükártya" passHref>
                  <a className="btn-primary">Érdekel az ajánlat</a>
              </Link>
          </div>
      </div>
  );
};