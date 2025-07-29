"use client";

import { useState, useEffect } from "react";

import { motion } from "framer-motion";

export default function WeddingCountdown() {
  const [countdown, setCountdown] = useState({
    days: "--",

    hours: "--",

    minutes: "--",

    seconds: "--",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const target = new Date("2026-06-10T15:00:00").getTime();

      const now = new Date().getTime();

      const difference = target - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),

          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),

          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),

          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center px-6 py-20 bg-gradient-to-b from-white to-rose-50"
    >
      <h2 className="text-5xl font-serif italic text-brand-rose mb-4">
        Anna & Balázs
      </h2>

      <p className="text-gray-600 text-lg mb-8">2026. Június 10. – Debrecen</p>

      <div className="flex justify-center gap-4 md:gap-8 mb-8">
        <div className="text-brand-text">
          <span className="text-4xl md:text-5xl font-serif">
            {countdown.days}
          </span>
          <br />
          Nap
        </div>

        <div className="text-brand-text">
          <span className="text-4xl md:text-5xl font-serif">
            {countdown.hours}
          </span>
          <br />
          Óra
        </div>

        <div className="text-brand-text">
          <span className="text-4xl md:text-5xl font-serif">
            {countdown.minutes}
          </span>
          <br />
          Perc
        </div>

        <div className="text-brand-text">
          <span className="text-4xl md:text-5xl font-serif">
            {countdown.seconds}
          </span>
          <br />
          Másodperc
        </div>
      </div>
    </motion.section>
  );
}
