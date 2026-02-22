'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Smartphone, TableProperties, Bell } from 'lucide-react'; // Ikonok a felsoroláshoz

const AboutCard = () => {
  const profileImageUrl = '/images/polish_save.jpeg';

  return (
    <motion.section
      className="py-16 px-6 bg-gradient-to-b from-[#fefcfb] to-[#fdf8f7] overflow-hidden rounded-2xl"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-12 md:gap-20">
        
        {/* === Bal oldali Kép === */}
        <motion.div
          className="w-full md:w-5/12 flex justify-center sticky top-24"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="relative w-full aspect-[3/4] overflow-hidden shadow-2xl rounded-xl border-4 border-white"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={profileImageUrl}
              alt="Cseh Vivien, a LACE megálmodója"
              fill
              sizes="(max-width: 768px) 90vw, 500px"
              priority
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* === Jobb oldali Szöveg === */}
        <motion.div
          className="w-full md:w-7/12 text-gray-700"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Főcím */}
          <h2 className="text-4xl md:text-5xl font-serif italic mb-2 pt-20 text-brand-text">
            Lace - Elegáns design.
          </h2>
          <h2 className="text-4xl md:text-5xl font-serif italic mb-8 text-brand-rose">
            Okos megoldás.
          </h2>

          <div className="space-y-6 text-base md:text-lg leading-relaxed font-light font-body">
            <p className="font-medium text-xl text-gray-900">
              Sziasztok, Vivien vagyok!
            </p>
            <p>
              A Lace-nél hiszek abban, hogy a meghívó nemcsak egy szép papír, hanem az esküvőszervezés első hatékony eszköze. A hullámos stancolás és a lágy motívumok adják az első benyomást, a technikai háttér pedig segít, hogy a készülődés stresszmentes legyen.
            </p>

            {/* Alcím 1 */}
            <div className="pt-4">
                <h3 className="text-2xl font-serif text-brand-text mb-3">Hullámokba zárt egyediség</h3>
                <p>
                A meghívóim felismerhető védjegye a hullámos forma. A stancolt szélek és az ívek karaktert adnak minden darabnak. Ez a design azoknak készült, akik szeretik a letisztult vizuális megoldásokat.
                </p>
            </div>

            {/* Alcím 2 */}
            <div className="pt-4">
                <h3 className="text-2xl font-serif text-brand-text mb-3">Stílus, ami okos is</h3>
                <p className="mb-4">
                Tudom, hogy az esküvőszervezés egyik legnagyobb fejtörése a visszajelzések kezelése. Ki kér szállást? Van-e ételérzékeny vendég? Hányan érkeznek pontosan? A Lace meghívókkal ezt a terhet leveszem a válladról.
                </p>
                <p className="mb-6 font-medium text-gray-800 bg-brand-pale-pink/30 p-4 rounded-lg border-l-4 border-brand-rose">
                 Minden meghívóba egy QR-kódot integrálok, amely egy online űrlapra vezeti a vendégeidet.
                </p>

                {/* Lista */}
                <ul className="space-y-4 mt-4">
                    <li className="flex items-start gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-brand-rose">
                            <Bell className="w-5 h-5" />
                        </div>
                        <div>
                            <strong className="block text-gray-900">Azonnali értesítés</strong>
                            <span className="text-sm">Amint egy vendég kitölti az űrlapot, Ti azonnal e-mail értesítést kaptok róla.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-brand-rose">
                            <TableProperties className="w-5 h-5" />
                        </div>
                        <div>
                            <strong className="block text-gray-900">Élő táblázat</strong>
                            <span className="text-sm">A válaszok egy automatikusan frissülő táblázatba kerülnek, amihez csak Nektek van hozzáférésetek.</span>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <div className="bg-white p-2 rounded-full shadow-sm text-brand-rose">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                            <strong className="block text-gray-900">Valós idejű kontroll</strong>
                            <span className="text-sm">Bármikor, bárhonnan ránézhettek a listára a telefonotokon. Pontosan fogjátok tudni, hány fős a násznép és milyen különleges kéréseik vannak, anélkül, hogy egyetlen cetlit is el kellene tennetek.</span>
                        </div>
                    </li>
                </ul>
            </div>

            <p className="italic text-gray-600 pt-6 border-t border-gray-200 mt-6">
              A Lace meghívókkal az a célom, hogy a szervezés ne adminisztráció, hanem élmény legyen.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutCard;