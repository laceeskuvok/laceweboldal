'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

// --- Ikonok ---
const HamburgerIcon = (props) => ( <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg> );
const CloseIcon = (props) => ( <svg {...props} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> );

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  
  // Kosár adatok
  const { cartItems, setIsCartOpen } = useCart();
  const cartCount = cartItems.length;

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Link generáló logika
  const getLink = (href, anchorId) => {
    if (anchorId) {
        return pathname === '/' ? `#${anchorId}` : `/#${anchorId}`;
    }
    return href;
  };

  // --- ÚJ FÜGGVÉNY A SIMA GÖRGETÉSHEZ ---
  const handleLinkClick = (e, href) => {
    // 1. Mindig zárjuk be a mobil menüt kattintáskor
    setIsMenuOpen(false);

    // 2. Ellenőrizzük, hogy horgony linkről van-e szó (#) és a főoldalon vagyunk-e
    if (href.includes('#') && pathname === '/') {
        e.preventDefault(); // Megállítjuk a hirtelen ugrást
        
        // Kinyerjük az ID-t a linkből (pl. "/#kapcsolat" -> "kapcsolat")
        const targetId = href.replace('/#', '').replace('#', '');
        const elem = document.getElementById(targetId);

        if (elem) {
            // Sima görgetés az elemhez
            elem.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
  };

  const menuItems = [
    { name: "Főoldal", href: "/", anchor: null },
    { name: "Rendelési infó", href: "/info", anchor: "rendelesi-info" }, 
    { name: "Blog", href: "/blog", anchor: null },
    { name: "Kapcsolat", href: "/kapcsolat", anchor: "kapcsolat" },
  ];

  // === MOBIL MENÜ HÁTTÉR ===
  const mobileVantaRef = useRef(null);
  const [mobileVantaEffect, setMobileVantaEffect] = useState(0);

  useEffect(() => {
    if (isMenuOpen && !mobileVantaEffect) {
      setMobileVantaEffect(FOG({
          el: mobileVantaRef.current,
          THREE: THREE,
          mouseControls: false, touchControls: false, gyrocontrols: false,
          minHeight: 200.0, minWidth: 200.0,
          highlightColor: 0xffffff, midtoneColor: 0xfdfcf8,
          lowlightColor: 0xe8dcc4, baseColor: 0xffffff,
          blurFactor: 0.8, speed: 0.3, zoom: 0.8
        }));
    }
    return () => { if (mobileVantaEffect) mobileVantaEffect.destroy(); };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        animate={hasScrolled ? "scrolled" : "top"}
        variants={{
          top: { backgroundColor: 'rgba(253, 252, 248, 0)', borderBottomColor: 'rgba(0,0,0,0)' },
          scrolled: { backgroundColor: 'rgba(253, 252, 248, 0.9)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', borderBottomColor: 'rgba(0,0,0,0.05)' }
        }}
        className="fixed top-0 left-0 w-full z-40 border-b transition-all duration-300"
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
            
            {/* BAL OLDAL: Menü */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((link) => {
                const finalHref = getLink(link.href, link.anchor);
                return (
                  <Link 
                    key={link.name}
                    href={finalHref}
                    onClick={(e) => handleLinkClick(e, finalHref)} // Itt hívjuk meg a görgetést
                    className="font-serif text-lg text-[#5C5454] hover:text-[#B76E79] transition-colors relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#B76E79] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              })}
            </nav>

            {/* KÖZÉP: Logó */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
               <Link href="/" className="group block text-center">
                  <span className="font-serif text-5xl text-[#5C5454] tracking-tight group-hover:text-[#B76E79] transition-colors duration-500">
                    Lace
                  </span>
               </Link>
            </div>

            {/* JOBB OLDAL: Kosár */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setIsCartOpen(true)}
                    className="font-serif text-lg text-[#5C5454] hover:text-[#B76E79] transition-colors flex items-center gap-2 group"
                >
                    <span className="hidden md:inline">Rendeléseim</span>
                    <div className="relative">
                        <ShoppingBag className="w-6 h-6 stroke-1" />
                        {cartCount > 0 && (
                            <motion.span 
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute -top-1 -right-2 bg-[#B76E79] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                            >
                                {cartCount}
                            </motion.span>
                        )}
                    </div>
                </button>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-[#5C5454]">
                    <HamburgerIcon />
                </button>
            </div>
        </div>
      </motion.header>

      {/* === MOBIL MENÜ === */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            ref={mobileVantaRef}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#FDFCF8] flex flex-col items-center justify-center"
          >
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-[#5C5454]">
                <CloseIcon className="w-8 h-8" />
            </button>
            <nav className="flex flex-col items-center gap-8">
                {menuItems.map((link) => {
                    const finalHref = getLink(link.href, link.anchor);
                    return (
                        <Link 
                            key={link.name}
                            href={finalHref}
                            onClick={(e) => handleLinkClick(e, finalHref)} // Mobilon is működjön a sima görgetés
                            className="font-serif text-3xl text-[#5C5454]"
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;