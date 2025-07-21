"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Feather,
  GitMerge,
  QrCode,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Header from "../../components/Header";
import FOG from "vanta/dist/vanta.fog.min.js";
import * as THREE from "three";

// === Fő Komponens ===
export default function InfoPage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    if (!vantaEffect && typeof window !== "undefined") {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyrocontrols: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0xffffff,
          midtoneColor: 0xd9c4c4,
          lowlightColor: 0xf5ebeb,
          baseColor: 0xfaf7f6,
          blurFactor: 0.5,
          speed: 0.6,
          zoom: 0.6,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  const processSteps = [
    {
      title: "Konzultáció & Álmodozás",
      description:
        "Egy inspiráló beszélgetés során megismerem az elképzeléseiteket, stílusotokat és a nagy nap egyedi hangulatát.",
    },
    {
      title: "Az Első Varázslat",
      description:
        "A megbeszéltek alapján életre keltem az első, izgalmas látványterveket, amiket izgatottan küldök át nektek.",
    },
    {
      title: "Tökéletesítés",
      description:
        "Lehetőségetek van finomhangolni a részleteket (általában 2 körben), hogy minden pixel a helyére kerüljön.",
    },
    {
      title: "A Kész Alkotás",
      description:
        "A jóváhagyott, végleges tervet prémium minőségben valósítjuk meg, hogy kézzelfogható emlékké váljon.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <>
      <Header />
      <main ref={vantaRef} className="relative">
        <FloatingShapes />

        <section className="h-[70vh] flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative z-10"
          >
            <h1 className="font-serif text-5xl md:text-7xl italic text-brand-text drop-shadow-lg">
              A részletekben rejlő varázslat
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body drop-shadow-md">
              Ismerd meg, hogyan kelnek életre az álmaitok a LACE egyedi
              grafikai megoldásaival, a tervezés első pillanatától az utolsó
              simításig.
            </p>
          </motion.div>
        </section>

        <div className="relative z-10 px-4 pb-20 md:pb-32">
          <motion.div
            className="max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl p-8 md:p-16 rounded-3xl border border-white/20 shadow-2xl space-y-28"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="text-center">
              <AnimatedIcon>
                <Feather
                  className="w-12 h-12 text-brand-rose"
                  strokeWidth={1}
                />
              </AnimatedIcon>
              <h2 className="font-serif text-4xl md:text-5xl text-brand-text mt-4">
                Minden, amire szükségetek lehet
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-body">
                Minden kollekciónk egy gondosan összeállított csomag.
                Természetesen minden elem színvilága, betűtípusa és szövegezése
                teljes mértékben Rátok szabható, hogy a végeredmény igazán
                egyedi és személyes legyen.
              </p>
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                <InfoCard
                  title="Meghívó"
                  description="Kétoldalas, prémium minőségű, texturált papíron."
                />
                <InfoCard
                  title="Boríték"
                  description="A meghívó stílusához és színvilágához tökéletesen illeszkedő."
                />
                <InfoCard
                  title="Ültetőkártya"
                  description="A vendégek nevével ellátott, a kollekció dizájnjával megegyező."
                />
                <InfoCard
                  title="Program- vagy Menükártya"
                  description="Igény szerint, a nap menetrendjével vagy a vacsora fogásaival."
                />
              </div>
            </motion.div>

            {/* === AZ ALKOTÁS FOLYAMATA === */}

            <motion.div variants={itemVariants} className="text-center">
              <GitMerge
                className="w-12 h-12 mx-auto text-brand-rose"
                strokeWidth={1}
              />

              <h2 className="font-serif text-4xl md:text-5xl text-brand-text mt-4">
                Az álomból valóság: a közös munka lépései
              </h2>

              <div className="mt-16 relative">
                {/* Összekötő vonal */}

                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200" />

                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
                  {processSteps.map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-10 h-10 bg-brand-rose text-white rounded-full flex items-center justify-center font-serif text-xl z-10 shadow-lg">
                        {index + 1}
                      </div>

                      <h4 className="mt-6 font-serif text-2xl text-brand-text">
                        {step.title}
                      </h4>

                      <p className="mt-2 text-gray-500 font-body">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10"
            >
              <InteractiveCard
                icon={<QrCode size={48} strokeWidth={1} />}
                title="Az Extra Varázslat"
                description="Az egyedi QR-kódos videóüzenet egy felejthetetlen, interaktív élménnyé teszi a meghívást, amivel garantáltan lenyűgözitek a vendégeiteket."
              />
              <InteractiveCard
                icon={<Sparkles size={48} strokeWidth={1} />}
                title="Egyedi Megrendelés"
                description="Nem találtad meg, amit kerestél? Valósítsuk meg együtt a teljesen egyedi elképzelésedet, kompromisszumok nélkül!"
                buttonHref="/kapcsolat?type=egyedi"
                buttonText="Kapcsolatfelvétel"
                isDark
              />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}

// === ÚJRAHASZNÁLHATÓ ÉS FELTURBÓZOTT KOMPONENSEK ===

const AnimatedIcon = ({ children }) => {
  // JAVÍTVA: A hiba elkerülése érdekében itt már nincs 'useScroll'
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

const InfoCard = ({ title, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="flex flex-col items-center p-4"
  >
    <div className="w-20 h-20 rounded-full bg-brand-pale-pink flex items-center justify-center mb-5 shadow-inner transition-all duration-300 hover:shadow-lg">
      <CheckCircle className="w-10 h-10 text-brand-rose" strokeWidth={1.5} />
    </div>
    <h4 className="font-serif text-xl text-brand-text">{title}</h4>
    <p className="text-gray-500 mt-2 text-sm font-body">{description}</p>
  </motion.div>
);

const ProcessTimeline = ({ steps }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  return (
    <div ref={ref} className="mt-24 relative max-w-2xl mx-auto">
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-1/2 -ml-0.5 w-1 h-full bg-gradient-to-b from-brand-pale-pink via-brand-rose to-brand-pale-pink origin-top"
      />
      <div className="space-y-20">
        {steps.map((step, index) => {
          const side = index % 2 === 0;
          return (
            <motion.div
              key={index}
              className="flex items-center gap-8"
              initial={{ opacity: 0, x: side ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.8, once: true }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`w-1/2 ${
                  side ? "text-right pr-12" : "order-2 text-left pl-12"
                }`}
              >
                <h4 className="font-serif text-2xl text-brand-text">
                  {step.title}
                </h4>
                <p className="mt-2 text-gray-500 font-body">
                  {step.description}
                </p>
              </div>
              <motion.div
                whileInView={{
                  scale: [1, 1.25, 1],
                  transition: { duration: 0.8, delay: 0.4, ease: "circOut" },
                }}
                viewport={{ amount: 0.8, once: true }}
                className="w-16 h-16 bg-white border-4 border-brand-rose text-brand-rose rounded-full flex items-center justify-center font-serif text-2xl z-10 shadow-lg flex-shrink-0 order-1"
              >
                {index + 1}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

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
