'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutCard = () => {
  const profileImageUrl = '/images/cseh_vivien_portre.jpg'; // Ellenőrizd a kép nevét!

  // JAVÍTVA: A komponens most már csak a "kártyát" tartalmazza.
  return (
    <motion.section
      className="py-12 md:py-20 px-4 bg-[#FBECEC] shadow-xl overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-5xl mx-auto">
        {/* A CÍM ÉS A ZÁRÓ SZEKCIÓ INNEN KI LETT VÉVE */}

        {/* === Fő Tartalom (Két oszlop) === */}
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          
          {/* Bal Oszlop: Kép */}
          <motion.div
            className="w-full md:w-2/5 flex-shrink-0"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <motion.div
              className="relative w-full max-w-sm mx-auto aspect-square rounded-lg border-2 border-gray-200 shadow-lg"
              whileHover={{ scale: 1.05, shadow: "0px 15px 30px -10px rgba(0,0,0,0.2)" }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={profileImageUrl}
                alt="Cseh Vivien, a LACE megálmodója"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
            </motion.div>
          </motion.div>

          {/* Jobb Oszlop: Szöveg */}
          <motion.div
            className="w-full md:w-3/5"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <p className="font-body text-xl md:text-2xl font-bold text-gray-800 mb-6">
              Szia, Cseh Vivien vagyok – a LACE megálmodója.
            </p>
            <div className="font-body text-base md:text-lg text-gray-600 space-y-4 leading-relaxed">
              <p>
                Mindig is két világ vonzott: az esküvő szervezés precíz eleganciája és a grafika alkotási folyamata. Bár nehéz volt a választás, végül a kreativitás iránti szenvedélyem győzött. Mégis szerettem volna megőrizni mindkét hivatás szépségét, így született meg a LACE: egy olyan tér, ahol az esküvők hangulata vizuális formát ölt, és ahol minden részlet a párról szól.
              </p>
              <p>
                <strong className="text-gray-700">A LACE különlegessége</strong> az egyedi stílusra szabott dizájnban rejlik - és abban az apró, de jelentős újításban, amely még közelebb hozza a vendégeket az ifjú párhoz: a személyes QR-kód, amely egy különleges videóüzenet kapuját nyitja meg.
              </p>
              <p>
                A LACE nem csupán meghívó - egy történet, ami rólatok mesél.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutCard;