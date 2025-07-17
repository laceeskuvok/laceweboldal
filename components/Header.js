"use client"; // Ezt a sort add hozzá a fájl elejére a 'useState' használatához

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// --- Ikonok a mobil menühöz ---
const HamburgerIcon = (props) => (
  <svg
    {...props}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const CloseIcon = (props) => (
  <svg
    {...props}
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// --- Fő Komponens ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Főoldal", href: "/" },
    { name: "Kollekciók", href: "/kollekciok" },
    { name: "Termék információk", href: "#info" },
    { name: "Rendelés menete", href: "#rendeles" },
    { name: "Árak", href: "#arak" },
    { name: "Kapcsolat", href: "/kapcsolat" },
  ];

  return (
    // JAVÍTVA: A háttérszínt töröljük, hogy átlátszó legyen.
    // Hozzáadunk egy alsó, finom árnyékot, hogy elváljon a tartalomtól.
    <header className="relative z-50">
      {/* A felső díszcsík maradhat, jól néz ki */}
      <div className="h-1 bg-gradient-to-r from-brand-pale-pink via-brand-rose to-brand-pale-pink opacity-70"></div>

      {/* Asztali nézet (desktop) */}
      <div className="hidden md:flex flex-col items-center py-0">
        <Link href="/" className="mb-2">
          {" "}
          {/* Kisebb margó a logónak */}
          <Image
            src="/images/LACE_logo.png"
            alt="LACE logó"
            width={120} // Kicsit kisebb logó, hogy jobban illeszkedjen
            height={120}
            className="object-contain drop-shadow-lg" // Árnyék a jobb olvashatóságért
          />
        </Link>
        <nav className="py-2 px-6 bg-black/10 backdrop-blur-sm rounded-full">
          <ul className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="font-playfair italic text-wwhite-800 text-lg pb-2 tracking-wide"
                >
                  {link.name}
                </Link>
                <span
                  className="absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"
                  style={{
                    backgroundImage: `linear-gradient(
              to right,
              transparent 0%,
              #a65c6dc3 15%,
              #d5bfc0 50%,
              #a65c6dc3 65%,
              transparent 100%
            )`,
                  }}
                ></span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobil nézet */}
      {/* JAVÍTVA: A mobil ikon színe fehér lesz, hogy látszódjon a képen */}
      <div className="md:hidden flex items-center justify-between p-4">
        <Link href="/">
          {/* Mobil logó */}
          <Image
            src="/images/LACE_logo.png"
            alt="LACE logó"
            width={60}
            height={60}
            className="object-contain drop-shadow-lg"
          />
        </Link>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white drop-shadow-md z-50" // JAVÍTVA: Szín és árnyék
        >
          {isMenuOpen ? (
            <CloseIcon className="w-8 h-8" />
          ) : (
            <HamburgerIcon className="w-8 h-8" />
          )}
        </button>
      </div>

      {/* Mobil menü (ami megjelenik) */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-full bg-brand-background transform transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-1 bg-gradient-to-r from-brand-pale-pink via-brand-rose to-brand-pale-pink"></div>
        <nav className="flex flex-col items-center justify-center h-full">
          <ul className="text-center">
            {navLinks.map((link) => (
              <li key={link.name} className="my-6 relative group">
                {" "}
                {/* Itt: my-6, relative és group hozzáadva */}
                <Link
                  href={link.href}
                  className="font-sans text-2xl text-brand-text pb-2" // Itt: a hover effekt és transition törölve, pb-2 hozzáadva
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
                {/* Látványos animált aláhúzás a mobil menühöz */}
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-brand-pale-pink to-brand-rose transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
