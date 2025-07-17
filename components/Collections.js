"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const collections = [
  {
    title: "Esküvői hírlap",
    img: "/images/eskuvoihirlap.jpg",
  },
  {
    title: "Történetek képekben",
    img: "/images/szines_mockup.jpg",
  },
  {
    title: "Időtlen romantika",
    img: "/images/letisztultelegancia.jpg",
  },
];

export default function CollectionsSlider() {
  return (
    <section className="py-20 bg-[#FAF7F6]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Swiper Carousel */}
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
              <motion.div
                className="group bg-white rounded-xl shadow-md overflow-hidden cursor-pointer relative"
                whileHover={{
                  scale: 1.05,
                  rotateX: 5,
                  rotateY: -5,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <div className="relative h-[350px] md:h-[400px] overflow-hidden">
                  <motion.img
                    src={item.img}
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Fény csillanás effekt */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                </div>
                <div className="py-4 text-center font-serif italic text-lg text-gray-700">
                  {item.title}
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gomb */}
        <div className="flex justify-center mt-10">
          <div
            className="gradient-border-button 
          w-full max-w-[300px] md:max-w-[400px] 
          h-[70px] md:h-[100px]"
          >
            <Link href="#kollekciok" passHref legacyBehavior>
              <a
                className="gradient-inner 
          flex items-center justify-center 
          w-full h-full 
          font-serif italic 
          text-[#4A4A4A] 
          text-base md:text-xl 
          tracking-wide rounded-full"
              >
                Megnézem a kollekciót
              </a>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
