'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
    <footer className="bg-white relative z-10 border-t border-[#E8DCC4]">
      {/* Hullám Elválasztó (maradhat a dizájn részeként, átneveztem a színt, hogy passzoljon) */}
      <div className="relative -mt-1">
        <svg className="w-full h-auto" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1440 120H0V26.293C0 26.293 216.526 83.5857 720 83.5857C1223.47 83.5857 1440 26.293 1440 26.293V120Z" fill="#FDF8F7"/>
        </svg>
      </div>

      <motion.div
        className="bg-[#FDF8F7] pb-10 px-6 md:px-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-balance items-start pt-6">

          {/* 1. oszlop: ÚJ SZÖVEGES LOGÓ */}
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
             <Link href="/" className="group block">
                  <span className="font-serif text-6xl text-[#5C5454] tracking-tight group-hover:text-[#B76E79] transition-colors duration-500">
                    Lace
                  </span>
             </Link>
             {/* A logó alatti szöveget kérésedre töröltem */}
          </motion.div>

          {/* 2. oszlop: Navigáció */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="font-serif text-xl text-[#5C5454] tracking-wide italic mb-4">Hasznos linkek</h3>
            <ul className="space-y-3 font-serif text-lg">
              <li><Link href="/" className="text-gray-600 hover:text-[#B76E79] transition-colors">Főoldal</Link></li>
              <li><Link href="/#rendelesi-info" className="text-gray-600 hover:text-[#B76E79] transition-colors">Rendelési infó</Link></li>
              <li><Link href="/blog" className="text-gray-600 hover:text-[#B76E79] transition-colors">Blog</Link></li>
              <li><Link href="/#kapcsolat" className="text-gray-600 hover:text-[#B76E79] transition-colors">Kapcsolat</Link></li>
            </ul>
          </motion.div>

          {/* 3. oszlop: Kapcsolat & Social */}
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <h3 className="font-serif text-xl text-[#5C5454] tracking-wide italic mb-4">Kövess be!</h3>
            <p className="text-gray-600 font-light mb-6">
              Meríts inspirációt a legfrissebb munkáimból!
            </p>
            <div className="flex justify-center md:justify-start items-center gap-6">
              {/* Instagram */}
              <a href="https://www.instagram.com/laceeskuvok" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#B76E79] transition-colors duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61578992124566" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#B76E79] transition-colors duration-200">
                <Facebook className="w-6 h-6" />
              </a>
              {/* Email */}
              <a href="mailto:laceeskuvok@gmail.com" className="text-gray-500 hover:text-[#B76E79] transition-colors duration-200">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Alsó rész */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-[#E8DCC4] text-center text-sm text-gray-400 font-sans"
        >
          <p>&copy; {new Date().getFullYear()} Lace – Minden jog fenntartva.</p>
          <p className="mt-2">
            Az oldalt készítette: <a href="mailto:kapcsolat@kovacsbalintfoto.hu" className="text-gray-500 hover:text-[#B76E79] font-medium transition-colors">Kovács Bálint</a>
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;