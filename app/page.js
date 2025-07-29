'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';

import Header from '../components/Header';
import AboutCard from '../components/About';
import Collections from '../components/Collections';
import ContactSection from '../components/Contact';
import HomePageReviews from '../components/HomePageReviews';
import HomePageBlog from '../components/HomePageBlog';
import ScrollToTopButton from "../components/ScrollToTopButton"; 



// === FELTURBÓZOTT HERO SZEKCIÓ VANTA.JS HÁTTÉRREL ===
const HeroSection = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(0);

  // Vanta.js effekt inicializálása
  useEffect(() => {
    if (!vantaEffect) {
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
          zoom: 0.6
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  
  // Parallaxis effekt görgetéskor
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={targetRef} className="relative h-screen overflow-hidden">
      {/* 1. Vanta.js animált háttér */}
      <div ref={vantaRef} className="absolute inset-0 z-0" />
      
      {/* 2. Header komponens a háttér felett */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Header />
      </div>

      {/* 3. Központi tartalom parallaxis effekttel */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
      >
        <motion.h1 
          className="text-6xl md:text-[9rem] font-playfair tracking-wide flex justify-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-[#f1cdd6] via-[#d68fa1] to-[#a65c6d] text-transparent bg-clip-text">L</span>
          <span className="bg-gradient-to-r from-[#f1cdd6] via-[#d68fa1] to-[#a65c6d] text-transparent bg-clip-text">A</span>
          <span className="bg-gradient-to-r from-[#f1cdd6] via-[#d68fa1] to-[#a65c6d] text-transparent bg-clip-text">C</span>
          <span className="bg-gradient-to-r from-[#f1cdd6] via-[#d68fa1] to-[#a65c6d] text-transparent bg-clip-text">E</span>
        </motion.h1>
        <motion.p 
          className="font-dancing text-3xl italic text-black text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          A te történeted.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6, type: "spring" }}
            className="mt-8"
        >
            <Link href={`/kollekciok`} legacyBehavior>
                {/* JAVÍTVA: Az új, egységes 'btn-primary' osztály használata */}
                <a className="btn-primary mt-32">
                    Kollekciók megtekintése
                </a>
            </Link>
        </motion.div>
      </motion.div>



      
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-white to-transparent z-5" />
    </section>
  );
};


// --- Főoldal Komponens ---
export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="py-16 md:py-24 bg-white">
        <DividerWithTitle title="A LACE története" />
      </section>
      <AboutCard />

      <section id="kollekcios" className="py-16 md:py-24 bg-white">
        <DividerWithTitle title="Kollekciók" link="/kollekciok" />
      </section>
      <Collections />

      <section className="py-16 md:py-24 bg-white">
        <DividerWithTitle title="Vélemények" link="/velemenyek" />
      </section>
      <HomePageReviews />

      <section className="py-16 md:py-24 bg-white">
        <DividerWithTitle title="Blogok" link="/blog" />
      </section>
      <HomePageBlog />

      <ContactSection />
      <ScrollToTopButton />
    </>
  );
}

// === FELTURBÓZOTT DividerWithTitle és ShimmerLine ===

function DividerWithTitle({ title, link }) {
  const TitleTag = title === "Kollekciók" ? "h3" : "h2";
  const textClasses =
    title === "Kollekciók"
      ? "font-playfair text-3xl md:text-4xl italic text-gray-700 whitespace-nowrap"
      : "font-playfair text-3xl md:text-4xl italic text-gray-700 whitespace-nowrap";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.5,
      },
    },
  };

  const letterVariants = {
    hidden: { y: 0, color: "#5C5454" }, // brand-text
    visible: {
      y: [0, -8, 0],
      color: ["#5C5454", "#B76E79", "#5C5454"], // brand-text -> brand-rose-gold -> brand-text
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const letters = Array.from(title);

  return (
    <div className="flex items-center justify-center gap-6 px-4 relative">
      <ShimmerLine direction="right" />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={containerVariants}
      >
        {link ? (
          <Link href={link} className="hover:text-brand-rose transition-colors">
            <TitleTag className={textClasses} aria-label={title}>
              {letters.map((letter, index) => (
                <motion.span key={index} variants={letterVariants} className="inline-block">
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </TitleTag>
          </Link>
        ) : (
          <TitleTag className={textClasses} aria-label={title}>
            {letters.map((letter, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </TitleTag>
        )}
      </motion.div>

      <ShimmerLine direction="left" />
    </div>
  );
}

function ShimmerLine({ direction = "right" }) {
  return (
    <motion.div
      className="relative h-[2px] flex-1 max-w-[400px] bg-gradient-to-r from-brand-pale-pink via-brand-rose to-brand-pale-pink"
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      style={{ transformOrigin: direction }}
    />
  );
}
