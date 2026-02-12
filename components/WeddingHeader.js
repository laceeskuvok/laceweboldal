"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const WeddingHeader = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Rólunk", href: "#info" },
    { name: "Program", href: "#program" },
    { name: "Ajándéklista", href: "#ajandek" },
    { name: "Galéria", href: "#galeria" },
    { name: "Üzenj nekünk", href: "#uzenet" },
  ];

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={hasScrolled || isMobileMenuOpen ? "scrolled" : "top"}
        variants={{
          top: { backgroundColor: "rgba(255, 255, 255, 0)", y: 0 },
          scrolled: {
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(12px)",
            y: 0,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          },
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-brand-rose font-serif italic">
            Anna & Balázs
          </h1>
          <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="relative group"
              >
                {link.name}
                <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-brand-rose transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-brand-text"
            >
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-background z-50 flex flex-col p-8"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold text-brand-rose font-serif italic">
                Anna & Balázs
              </h1>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X />
              </button>
            </div>
            <nav className="flex-grow flex items-center justify-center">
              <ul className="text-center space-y-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="font-serif text-3xl text-brand-text"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeddingHeader;
