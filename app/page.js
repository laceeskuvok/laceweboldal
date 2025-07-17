import Image from "next/image";
import Link from "next/link"; // Fontos: importáljuk a Link komponenst
import Header from "../components/Header";
import Portfolio from "../components/Portfolio";
import About from "../components/About";

// --- Új Hero Szekció Komponens ---
const HeroSection = () => {
  return (
    // A tartalmat balra igazítjuk és paddingot adunk neki
    <section className="relative h-screen flex items-center justify-start text-white px-8 md:px-16 lg:px-24">
      {/* 1. Háttérkép */}
      <Image
        src="/images/fokep2.jpg"
        alt="Lace gyűrű egy selyem anyagon"
        layout="fill"
        objectFit="cover"
        quality={90}
        className="-z-10"
      />

      {/* 2. Áttetsző sötétítő réteg */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* 3. Header komponens */}
      <div className="absolute top-0 left-0 w-full">
        <Header />
      </div>

      {/* 4. Központi tartalom - FRISSÍTVE */}
      <div className="mt-8 md:mt-60">
      <div className="absolute top-[30%] left-6 md:left-24 text-left z-10 px-4">
      {/* LACE felirat + A te történeted együtt, de középre igazítva egymáshoz képest */}
        <div className="inline-block">
          <h1 className="text-6xl md:text-[9rem] font-playfair tracking-wide flex justify-center gap-2">
            <span className="bg-gradient-to-r from-[#f1cdd6] via-[#d68fa1] to-[#a65c6d] text-transparent bg-clip-text">L</span>
            <span className="bg-gradient-to-r from-[#f1cdd6] via-[#d68fa1] to-[#a65c6d] text-transparent bg-clip-text">A</span>
            <span className="bg-gradient-to-r from-[#f1cdd6] via-[#d68fa1] to-[#a65c6d] text-transparent bg-clip-text">C</span>
            <span className="bg-gradient-to-r from-[#f1cdd6] via-[#d68fa1] to-[#a65c6d] text-transparent bg-clip-text">E</span>
          </h1>

          <p className="mt-2 text-xl md:text-4xl italic font-vibes text-black text-center">
            A te történeted.
          </p>
        </div>
      </div>

        <Link href="#kollekciok" passHref legacyBehavior>
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
                  mx-auto md:mx-0"
          >
            Megnézem a kollekciót
          </a>
        </Link>
      </div>

      {/* Opcionális "görgess le" ikon */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Portfolio />
      <About />
    </>
  );
}
