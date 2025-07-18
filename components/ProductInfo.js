"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const ProductInfo = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="info" className="relative py-20 px-4 overflow-hidden bg-white">
      {/* 1. Halvány háttérkép */}
      <Image
        src="/images/fokep2.jpg"
        alt="Finom textúra háttér"
        layout="fill"
        objectFit="cover"
        quality={80}
        className="z-0"
      />

      {/* Felső fehér átmenet */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white via-white/80 to-white/0 z-10" />

      {/* Alsó fehér átmenet */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white via-white/80 to-white/0 z-10" />

      {/* Tartalom */}
      <div className="relative z-20 max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6 font-body text-lg text-brand-text/80 leading-relaxed"
        >
          <motion.p custom={0} variants={textVariants}>
            A kollekció kiválasztásával az esküvőtök stílusához leginkább illő
            hangulatot kelthetitek életre.
          </motion.p>
          <motion.p custom={1} variants={textVariants}>
            A színek és a szövegek minden esetben személyre szabhatók, hogy
            igazán rólatok szóljon.
          </motion.p>
          <motion.p custom={2} variants={textVariants}>
            <strong className="font-semibold text-brand-text">
              A kollekciók tartalma:
            </strong>{" "}
            meghívó és a hozzá illő egyszerű boríték, ültetőkártya, esküvői
            program kártya (igény szerint menükártya).
          </motion.p>
          <motion.p custom={3} variants={textVariants}>
            A meghívókba rejtett QR-kódon keresztül személyes videóüzenetet is
            eljuttatható a vendégekhez - egy modern, mégis meghitt gesztus,
            amely még különlegesebbé teszi az élményt.
          </motion.p>
          <motion.p custom={4} variants={textVariants}>
            A LACE termékei nem csupán kiegészítik a nagy napotokat -{" "}
            <strong className="font-semibold text-brand-text">
              emlékké varázsolják azt.
            </strong>
          </motion.p>
          <motion.p custom={5} variants={textVariants}>
            Ha egyik stílus sem illik hozzátok igazán, lehetőségetek van egyedi
            megrendelés leadására is.
          </motion.p>
        </motion.div>

        {/* Gomb */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          className="mt-12"
        >
          <Link href="/kapcsolat?type=egyedi" passHref legacyBehavior>
            <a
              className="gradient-border-button 
                    w-full max-w-[300px] md:max-w-[400px] 
                    h-[70px] md:h-[100px] 
                    flex items-center justify-center 
                    bg-transparent text-[#4A4A4A] 
                    font-serif italic 
                    text-base md:text-xl 
                    tracking-wide rounded-full 
                    transition-all duration-300 
                    hover:shadow-xl hover:scale-105
                    mx-auto"
            >
              Egyedi megrendelést szeretnék
            </a>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductInfo;
