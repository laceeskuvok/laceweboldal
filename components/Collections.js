"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";
import Image from "next/image";

// === JAVÍTVA: Frissített adatok és a kollekciok/page.js-hez igazított slug-ok ===
const collections = [
  {
    title: "Lace Gazette",
    img: "/images/eskuvoihirlap.jpg",
    preview: {
      images: ["/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg"],
      price: "29 900 Ft-tól",
      description: "Egy valódi újság, tele a ti történeteitekkel, interjúkkal és a nagy nap programjával.",
    },
    slug: "lace-gazette", // Megfelel a `kollekciok/page.js`-ben lévő ID-nak
  },
  {
    title: "Lace Message",
    img: "/images/szines_mockup.jpg",
    preview: {
      images: ["/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg"],
      price: "34 900 Ft-tól",
      description: "QR-kódos meghívó, amelyen keresztül videóüzenetet küldhettek a vendégeknek.",
    },
    slug: "lace-message", // Megfelel a `kollekciok/page.js`-ben lévő ID-nak
  },
  {
    title: "Lace Portrait",
    img: "/images/letisztultelegancia.jpg",
    preview: {
      images: ["/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg"],
      price: "39 900 Ft-tól",
      description: "Képcentrikus design, minimális szöveggel. Boríték helyett szalaggal összekötve érkezik.",
    },
    slug: "lace-portrait", // Megfelel a `kollekciok/page.js`-ben lévő ID-nak
  },
  {
    title: "Lace Pure",
    img: "/images/eskuvoihirlap.jpg",
    preview: {
      images: ["/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg"],
      price: "31 000 Ft-tól",
      description: "Minimalista design, egyszerű és letisztult szövegvilággal. Időtlen elegancia.",
    },
    slug: "lace-pure", // Megfelel a `kollekciok/page.js`-ben lévő ID-nak
  },
  {
    title: "Lace Bloom",
    img: "/images/eskuvoihirlap.jpg",
    preview: {
      images: ["/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg", "/images/eskuvoihirlap.jpg"],
      price: "Egyedi árazás",
      description: "Extrém design, merész minták és látványos megjelenés. Kérd egyedi igényeid szerint!",
    },
    slug: "lace-bloom", // Megfelel a `kollekciok/page.js`-ben lévő ID-nak
  },
];

export default function CollectionsSlider() {
  return (
    <section className="py-20 bg-[#FAF7F6]">
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 3 },
          }}
          className="pb-10"
        >
          {collections.map((item, index) => (
            <SwiperSlide key={index}>
              {/* JAVÍTVA: A Link komponens most már helyesen van használva */}
              <Link href={`/kollekciok#${item.slug}`} className="block">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="group bg-white rounded-xl shadow-md overflow-hidden relative cursor-pointer"
                >
                  <div className="relative h-[350px] md:h-[400px] overflow-hidden">
                    <motion.img
                      src={item.img}
                      alt={item.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                  </div>

                  <div className="py-4 text-center font-serif italic text-lg text-gray-700">
                    {item.title}
                  </div>

                  {/* Hover preview overlay */}
                  <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-4 flex flex-col justify-between rounded-xl">
                    <div>
                      <div className="flex gap-2 mb-3">
                        {item.preview.images.map((imgSrc, i) => (
                          <Image
                            key={i}
                            src={imgSrc}
                            alt="Preview"
                            width={80}
                            height={80}
                            className="rounded-md object-cover"
                          />
                        ))}
                      </div>
                      <p className="text-gray-800 font-semibold">
                        {item.preview.price}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        {item.preview.description}
                      </p>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="text-center mt-4"
                    >
                      <p className="text-gray-700 font-semibold hover:underline transition-colors duration-300">
                        Kattints a részletekért →
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
