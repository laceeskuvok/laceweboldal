'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';

// --- Ikonok ---
const HamburgerIcon = (props) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><motion.path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { d: "M3 12H21" }, open: { d: "M5 19L19 5" } }} /><motion.path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} /><motion.path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" variants={{ closed: { d: "M3 18H21" }, open: { d: "M5 5L19 19" } }} /></svg> );
const CloseIcon = (props) => ( <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );

// --- Fő Komponens ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  
  const [hoveredLink, setHoveredLink] = useState(pathname);

  // Görgetés figyelő
  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Aktív link figyelő
  useEffect(() => {
    setHoveredLink(pathname);
  }, [pathname]);

  const navLinks = [
    { name: "Főoldal", href: "/" },
    { name: "Kollekciók", href: "/kollekciok" },
    { name: "Termék infó", href: "/#info-section" },
    { name: "Kapcsolat", href: "/kapcsolat" },
  ];
  
  const navItemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } },
  };

  // === MOBIL MENÜ HÁTTÉR ANIMÁCIÓ ===
  const mobileVantaRef = useRef(null);
  const [mobileVantaEffect, setMobileVantaEffect] = useState(0);

  useEffect(() => {
    let effect = mobileVantaEffect;
    if (isMenuOpen && !effect) {
      effect = FOG({
          el: mobileVantaRef.current,
          THREE: THREE,
          mouseControls: false, touchControls: false, gyrocontrols: false,
          minHeight: 200.0, minWidth: 200.0,
          highlightColor: 0xffffff, midtoneColor: 0xd9c4c4,
          lowlightColor: 0xf5ebeb, baseColor: 0xf9f6f6,
          blurFactor: 0.7, speed: 0.4, zoom: 0.8
        });
      setMobileVantaEffect(effect);
    }
    
    return () => {
      if (effect) {
        effect.destroy();
        setMobileVantaEffect(0);
      }
    };
  }, [isMenuOpen]);


  return (
    <>
      <motion.header
        initial={false}
        animate={hasScrolled ? "scrolled" : "top"}
        variants={{
          top: { backgroundColor: 'rgba(255, 255, 255, 0)', boxShadow: 'none', borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
          scrolled: { backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', borderBottomColor: 'rgba(0, 0, 0, 0.05)' }
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-50 border-b"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="hidden md:flex items-center justify-between h-20">
            <Link href="/">
              <Image src="/images/LACE_logo.png" alt="LACE logó" width={65} height={65} className="object-contain" priority/>
            </Link>
            <nav>
              <ul className="flex items-center space-x-2" onMouseLeave={() => setHoveredLink(pathname)}>
                {navLinks.map((link) => (
                  <li key={link.name} className="relative" onMouseEnter={() => setHoveredLink(link.href)}>
                    {/* JAVÍTVA: A szöveg színe mostantól mindig a sötétebb 'brand-text' */}
                    <Link href={link.href} className="px-4 py-2 rounded-md text-sm font-medium transition-colors text-brand-text drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] relative z-10">
                      {link.name}
                    </Link>
                    {hoveredLink === link.href && (
                      <motion.div layoutId="magic-highlight" className="absolute inset-0 bg-brand-pale-pink rounded-md z-0"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }} />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="md:hidden flex items-center justify-between h-20">
            <Link href="/"><Image src="/images/LACE_logo.png" alt="LACE logó" width={55} height={55} className="object-contain"/></Link>
            <motion.button animate={isMenuOpen ? "open" : "closed"} onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50 text-brand-text">
              <HamburgerIcon />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsMenuOpen(false)} />
            
            <motion.div 
              ref={mobileVantaRef} // Ref az animált háttérhez
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed top-0 right-0 h-full w-4/5 max-w-sm shadow-2xl z-50 md:hidden overflow-hidden"
            >
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="flex justify-between items-center">
                    <span className="font-serif text-2xl text-brand-rose">Menü</span>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(false)} className="text-brand-text">
                        <CloseIcon className="w-8 h-8" />
                    </motion.button>
                </div>
                <motion.nav className="mt-12" initial="hidden" animate="visible" transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}>
                  <ul className="space-y-4">
                    {navLinks.map((link) => (
                      <motion.li key={link.name} variants={navItemVariants}>
                        <Link href={link.href} onClick={() => setIsMenuOpen(false)} className="block py-3 text-2xl font-serif text-brand-text hover:text-brand-rose transition-colors">
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;