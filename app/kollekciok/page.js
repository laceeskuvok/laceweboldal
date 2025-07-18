'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Header from '../../components/Header';

// --- MOCK DATA (Változatlan) ---
const collectionsData = [
  {
    id: '01',
    name: 'Klasszikus Romantika',
    description: 'Időtlen elegancia, finom vonalak és pasztell színek harmóniája, mely a hagyományos értékeket ünnepli.',
    items: [
      { name: 'Meghívó', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Menükártya', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Ültetőkártya', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Esküvői Hírlap', img: '/images/eskuvoihirlap.jpg' },
    ],
    bgColor: '#FAF7F6',
  },
  {
    id: '02',
    name: 'Modern Minimalista',
    description: 'Letisztult formák, merész tipográfia és a kevesebb-több elve. A modern párok stílusos választása.',
    items: [
      { name: 'Save the Date', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Meghívó', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Köszönőkártya', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Digitális Meghívó', img: '/images/eskuvoihirlap.jpg' },
    ],
    bgColor: '#F5EBEB',
  },
  {
    id: '03',
    name: 'Rusztikus Varázslat',
    description: 'Természetes textúrák, kézzel rajzolt motívumok és földszínek. Tökéletes választás egy természetközeli esküvőhöz.',
    items: [
      { name: 'Meghívó', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Itallap', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Ültetési Rend', img: '/images/eskuvoihirlap.jpg' },
      { name: 'Pecsét', img: '/images/eskuvoihirlap.jpg' },
    ],
    bgColor: '#F3F0E9',
  },
];

// === Fő Komponens (Változatlan) ===
export default function CollectionsPage() {
  return (
    <>
      <Header />
      <main className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
        {collectionsData.map((collection, index) => (
          <CollectionSection key={index} collection={collection} />
        ))}
      </main>
    </>
  );
}

// === Egy Kollekció Szekció Komponense (GOMB HOZZÁADVA) ===
function CollectionSection({ collection }) {
    const { id, name, description, items, bgColor } = collection;
    
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
  
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };
  
    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };
    
    const imagesForLightbox = items.map(item => ({ src: item.img }));
  
    return (
      <>
        <motion.section
          className="h-screen w-full snap-start flex items-center justify-center p-8 relative overflow-hidden"
          style={{ backgroundColor: bgColor }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative z-10">
              <motion.span variants={itemVariants} className="font-serif text-7xl lg:text-8xl text-brand-rose opacity-20">{id}</motion.span>
              <motion.h2 variants={itemVariants} className="font-serif text-5xl lg:text-6xl text-brand-text -mt-8">{name}</motion.h2>
              <motion.p variants={itemVariants} className="mt-4 text-lg text-gray-600 max-w-md leading-relaxed font-body">{description}</motion.p>
              <motion.div variants={itemVariants} className="mt-8 border-t border-brand-rose/30 pt-6">
                <h4 className="font-sans uppercase tracking-widest text-brand-text mb-4">Kollekció elemei</h4>
                <ul className="space-y-2">
                  {items.map((item, i) => (
                    <motion.li key={i} custom={i} variants={itemVariants} className="font-body text-gray-500">{item.name}</motion.li>
                  ))}
                </ul>
                {/* === ÚJ GOMB === */}
                <Link href={`/kapcsolat?kollekcio=${encodeURIComponent(name)}`} passHref>
                   <motion.a 
                      variants={itemVariants} 
                      className="inline-block mt-8 px-8 py-3 bg-brand-rose text-white font-sans font-bold uppercase tracking-widest rounded-full hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
                    >
                     Árajánlatot kérek
                   </motion.a>
                </Link>
              </motion.div>
            </div>
  
            <motion.div variants={containerVariants} className="relative h-[300px] lg:h-[500px] w-full">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-lg shadow-2xl overflow-hidden border-4 border-white cursor-pointer"
                        style={imagePositions[i % 4]}
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.03,
                          boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                          zIndex: 20,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        onClick={() => {
                          setIndex(i);
                          setOpen(true);
                        }}
                    >
                        <Image src={item.img} alt={item.name} layout="fill" objectFit="cover" />
                    </motion.div>
                ))}
            </motion.div>
          </div>
        </motion.section>
  
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={imagesForLightbox}
          index={index}
          styles={{ container: { backgroundColor: "rgba(0, 0, 0, .85)" } }}
        />
      </>
    );
  }

// Kép pozíciók (Változatlan)
const imagePositions = [
    { top: '5%', left: '10%', width: '60%', height: '80%', rotate: -8 },
    { top: '25%', left: '45%', width: '50%', height: '65%', rotate: 5 },
    { top: '50%', left: '5%', width: '45%', height: '45%', rotate: 10 },
    { top: '5%', left: '60%', width: '35%', height: '40%', rotate: -3 },
];