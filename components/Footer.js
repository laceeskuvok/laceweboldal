'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <footer className="bg-brand-background relative z-10">
      {/* Hullám Elválasztó */}
      <div className="relative">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1440 120H0V26.293C0 26.293 216.526 83.5857 720 83.5857C1223.47 83.5857 1440 26.293 1440 26.293V120Z" fill="#FDF8F7"/>
        </svg>
      </div>

      <motion.div
        className="bg-[#FDF8F7] pt-20 pb-10 px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-balance">

          {/* 1. oszlop: Logó + szöveg */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <div className="rounded-full">
              <Image src="/images/LACE_logo.png" alt="LACE logó" width={200} height={200} className="rounded-full" />
            </div>
            <p className=" text-gray-600 font-light text-center md:text-left max-w-xs leading-relaxed">
              Egyedi esküvői grafikák és meghívók, melyek a Ti történeteteket mesélik el.
            </p>
          </motion.div>

          {/* 2. oszlop: Navigáció */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="font-serif text-xl text-brand-text tracking-wide">Hasznos linkek</h3>
            <ul className="mt-4 space-y-2 font-body">
              <li><Link href="/kollekciok" className="text-gray-700 hover:text-brand-rose transition-colors">Kollekciók</Link></li>
              <li><Link href="/info" className="text-gray-700 hover:text-brand-rose transition-colors">Információk</Link></li>
              <li><Link href="/velemenyek" className="text-gray-700 hover:text-brand-rose transition-colors">Vélemények</Link></li>
              <li><Link href="/blog" className="text-gray-700 hover:text-brand-rose transition-colors">Blog</Link></li>
              <li><Link href="/kapcsolat" className="text-gray-700 hover:text-brand-rose transition-colors">Kapcsolat</Link></li>
            </ul>
          </motion.div>

          {/* 3. oszlop: Elérhetőségek */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="font-serif text-xl text-brand-text tracking-wide">Kapcsolat & Kövess minket</h3>
            <p className="mt-4 text-gray-600 font-light">
              Meríts inspirációt a legfrissebb munkáinkból!
            </p>
            <div className="flex justify-center md:justify-start items-center gap-4 mt-5">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-rose transition-colors duration-200">
                <Instagram className="w-5 h-5 hover:scale-110 transition-transform" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-brand-rose transition-colors duration-200">
                <Facebook className="w-5 h-5 hover:scale-110 transition-transform" />
              </a>
              <a href="mailto:hello@lacegrafika.hu" className="text-gray-600 hover:text-brand-rose transition-colors duration-200">
                <Mail className="w-5 h-5 hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Alsó rész */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-brand-rose/20 text-center text-sm text-gray-400 font-body"
        >
          <p>&copy; {new Date().getFullYear()} LACE Esküvők – Minden jog fenntartva.</p>
          <p className="mt-2">
            Az oldalt készítette: <a href="mailto:kapcsolat@kovacsbalintfoto.hu" className="text-gray-500 hover:text-brand-rose font-medium transition-colors">Kovács Bálint</a>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
