'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const AboutCard = () => {
  const profileImageUrl = '/images/cseh_vivien_portre.jpg';

  return (
    <motion.section
      className="py-16 px-6 bg-gradient-to-b from-[#fefcfb] to-[#fdf8f7] overflow-hidden shadow-2xl rounded-2xl"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        
        {/* === Bal oldali nagyobb körkép === */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="relative w-80 h-80 md:w-96 md:h-96 overflow-hidden shadow-xl border-4 border-white"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={profileImageUrl}
              alt="Cseh Vivien, a LACE megálmodója"
              fill
              sizes="(max-width: 768px) 80vw, 400px"
              priority
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* === Jobb oldali szöveg === */}
        <motion.div
          className="w-full md:w-1/2 text-gray-700"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-6 leading-snug text-gray-900">
            Szia, Cseh Vivien vagyok – a LACE megálmodója.
          </h2>
          <div className="space-y-5 text-base md:text-lg leading-relaxed font-light">
            <p>
              Mindig is két világ vonzott: az esküvőszervezés precíz eleganciája és a grafika alkotási szabadsága. Bár nehéz volt a választás, végül a kreativitás iránti szenvedélyem győzött.
            </p>
            <p>
              Így született meg a <strong className="font-medium text-gray-800">LACE</strong> – egy olyan tér, ahol az esküvők hangulata vizuális formát ölt, és ahol minden részlet a párról szól.
            </p>
            <p>
              <strong className="text-gray-800">A LACE különlegessége</strong> az egyedi stílusra szabott dizájn és az a személyes videóüzenet, amit egy QR-kód segítségével fedezhetnek fel a vendégek.
            </p>
            <p className="italic text-gray-600">
              A LACE nem csupán meghívó – egy történet, ami rólatok mesél.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutCard;
