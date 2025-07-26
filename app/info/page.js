'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Newspaper, QrCode, Sparkles, CheckCircle, GitMerge } from 'lucide-react';
import Header from '../../components/Header';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';

// === Fő Komponens ===
export default function InfoPage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    if (!vantaEffect && typeof window !== "undefined") {
      setVantaEffect(
        FOG({
          el: vantaRef.current, THREE: THREE, mouseControls: true, touchControls: true, gyrocontrols: false,
          minHeight: 200.0, minWidth: 200.0, highlightColor: 0xffffff, midtoneColor: 0xd9c4c4,
          lowlightColor: 0xf5ebeb, baseColor: 0xfaf7f6, blurFactor: 0.5, speed: 0.6, zoom: 0.6,
        })
      );
    }
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, [vantaEffect]);

  const processSteps = [
    { title: "Konzultáció", description: "Egy beszélgetes során megismerem az elképzeléseiteket és a nagy nap hangulatát." },
    { title: "Látványtervek", description: "A megbeszéltek alapján elkészitem az első vázlatokat." },
    { title: "Tökéletesítés", description: "Lehetőségetek van finomhangolni a részleteket (általában 2 körben), hogy minden pixel a helyére kerüljön." },
    { title: "A Kész Alkotás", description: "A jóváhagyott, végleges tervet prémium minőségben valósítjuk meg, hogy kézzelfogható emlékké váljon." },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  return (
    <>
      <Header />
      <main ref={vantaRef} className="relative">
        <FloatingShapes />
        <section className="h-[70vh] flex items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="relative z-10">
                <h1 className="font-serif text-5xl md:text-7xl italic text-brand-text drop-shadow-lg">A részletekben rejlő varázslat</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body drop-shadow-md">Ismerd meg, hogyan kelnek életre az álmaitok a LACE egyedi grafikai megoldásaival, a tervezés első pillanatától az utolsó simításig.</p>
            </motion.div>
        </section>

        <div className="relative z-10 px-4 pb-20 md:pb-32">
            <motion.div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl p-8 md:p-16 rounded-3xl border border-white/20 shadow-2xl space-y-28"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={containerVariants}>
                
                <motion.div variants={itemVariants} className="text-center">
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-text">Két Különleges Történet</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-body">Két zászlóshajónk, amelyek garantáltan egyedivé és felejthetetlenné teszik a nagy napotok bejelentését.</p>
                    {/* === JAVÍTVA: Egyszerűbb, egységes kártya stílus === */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Link href="/kollekciok#lace-gazette" className="block bg-brand-pale-pink/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                            <Newspaper className="w-12 h-12 text-brand-rose" strokeWidth={1}/>
                            <h3 className="font-serif text-3xl text-brand-text mt-4">Lace Gazette</h3>
                            <p className="mt-2 text-gray-600 leading-relaxed font-body">Egy valódi újság, tele a ti történeteitekkel, interjúkkal és a nagy nap programjával. Garantáltan minden vendég megőrzi majd!</p>
                        </Link>
                         <Link href="/kollekciok#lace-message" className="block bg-brand-rose text-white rounded-2xl p-8 text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                            <QrCode className="w-12 text-gray-700 h-12" strokeWidth={1}/>
                            <h3 className="font-serif text-3xl text-gray-700 mt-4">Lace Message</h3>
                            <p className="mt-2 text-gray-700 leading-relaxed font-body">Lepjétek meg a vendégeket egy személyes videóüzenettel, amit a meghívóba rejtett QR kód kelt életre. Egy modern, meghitt gesztus.</p>
                        </Link>
                    </div>
                </motion.div>

            {/* === AZ ALKOTÁS FOLYAMATA === */}
            <motion.div variants={itemVariants} className="text-center">
              <GitMerge className="w-12 h-12 mx-auto text-brand-rose" strokeWidth={1} />
              <h2 className="font-serif text-4xl md:text-5xl text-brand-text mt-4">Az álomból valóság: a közös munka lépései</h2>
              <div className="mt-16 relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200" />
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-brand-rose text-white rounded-full flex items-center justify-center font-serif text-xl z-10 shadow-lg">{index + 1}</div>
                      <h4 className="mt-6 font-serif text-2xl text-brand-text">{step.title}</h4>
                      <p className="mt-2 text-gray-500 font-body">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* === EGYÉB LEHETŐSÉGEK === */}
            <motion.div variants={itemVariants}>
                    <div className="text-center">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-text">További Lehetőségek</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-body">A kiemelt kollekciók mellett természetesen számos más stílusban is alkotunk, sőt, teljesen egyedi elképzeléseket is megvalósítunk.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                         <Link href="/kollekciok" className="block bg-brand-pale-pink/50 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                            <Sparkles className="w-12 h-12 text-brand-rose" strokeWidth={1}/>
                            <h3 className="font-serif text-3xl text-brand-text mt-4">További kollekciók</h3>
                            <p className="mt-2 text-gray-600 leading-relaxed font-body">Böngészd végig az összes elérhető stílust, a moderntől a rusztikusig.</p>
                        </Link>
                         <Link href="/kapcsolat?type=egyedi" className="block bg-brand-rose text-white rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                            <Sparkles className="w-12 text-gray-700 h-12" strokeWidth={1}/>
                            <h3 className="font-serif text-3xl text-gray-700 mt-4">Egyedi Megrendelés</h3>
                            <p className="mt-2 text-gray-700 leading-relaxed font-body">Valósítsuk meg együtt a teljesen egyedi elképzelésedet!</p>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </main>
    </>
  );
}

const InteractiveCard = ({
  icon,
  title,
  description,
  buttonHref,
  buttonText,
  isDark,
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl ${
        isDark ? "bg-gray-800 text-white" : "bg-brand-pale-pink/50"
      }`}
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="text-brand-rose"
      >
        {icon}
      </div>
      <h3
        style={{ transform: "translateZ(40px)" }}
        className={`font-serif text-3xl mt-4 drop-shadow ${
          isDark && "text-white"
        }`}
      >
        {title}
      </h3>
      <p
        style={{ transform: "translateZ(30px)" }}
        className={`mt-2 leading-relaxed font-body drop-shadow ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {description}
      </p>
      {buttonHref && (
        <div style={{ transform: "translateZ(20px)" }} className="mt-6">
          <Link href={buttonHref} passHref legacyBehavior>
            <a className={`btn-primary ${isDark && "!bg-brand-rose/80"}`}>
              {buttonText}
            </a>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

const FloatingShapes = () => {
  // JAVÍTVA: A useScroll most már nem okoz hibát, de stabilabb a main elemen
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[5%] w-24 h-24 bg-brand-rose/10 rounded-full"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[60%] right-[8%] w-32 h-32 bg-brand-pale-pink rounded-xl rotate-45"
      />
    </div>
  );
};
