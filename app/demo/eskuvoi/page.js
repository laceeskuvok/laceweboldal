// app/demo/eskuvoi/page.js
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function WeddingWebsiteDemo() {
  const images = [
    "/images/wedding1.jpg",
    "/images/wedding2.webp",
    "/images/wedding3.jpg",
    "/images/wedding4.jpg",
    "/images/wedding5.jpg",
    "/images/wedding6.jpg",
    "/images/wedding7.jpg",
    "/images/wedding8.jpg",
  ];

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const target = new Date("2026-06-10T15:00:00").getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setCountdown("Az esküvő már elkezdődött!");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setCountdown(`${days} nap ${hours} óra ${minutes} perc van még az esküvőig!`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from("wedding_messages").insert({
      name,
      email,
      message,
    });

    if (!error) {
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }
    setSubmitting(false);
  }

  return (
    <main className="min-h-screen bg-white text-gray-800 font-body">
      {/* NAVIGÁCIÓS SÁV */}
      <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-brand-rose font-serif italic">Anna & Balázs</h1>
          <nav className="space-x-4 text-sm text-gray-600">
            <a href="#info" className="hover:text-brand-rose transition">Rólunk</a>
            <a href="#program" className="hover:text-brand-rose transition">Program</a>
            <a href="#ajandek" className="hover:text-brand-rose transition">Ajándéklista</a>
            <a href="#galeria" className="hover:text-brand-rose transition">Galéria</a>
            <a href="#uzenet" className="hover:text-brand-rose transition">Üzenj nekünk</a>
          </nav>
        </div>
      </header>

      <div className="pt-24" id="info">
        {/* Intro szekció */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 py-20 bg-gradient-to-b from-white to-rose-50"
        >
          <h2 className="text-5xl font-serif italic text-brand-rose mb-4">Anna & Balázs</h2>
          <p className="text-gray-600 text-lg mb-6">2026. Június 10. – Debrecen</p>
          <p className="text-brand-rose font-medium text-xl mb-4">{countdown}</p>
          <Link
            href="#rsvp"
            className="inline-block bg-brand-rose text-white px-6 py-2 rounded-full shadow hover:bg-brand-rose/80 transition"
          >
            RSVP küldése
          </Link>
        </motion.section>

        {/* Időpont és helyszín */}
        <motion.section
          id="rsvp"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto px-6 py-16 text-center"
        >
          <h3 className="text-3xl font-semibold text-brand-rose mb-2">Ceremónia helyszíne</h3>
          <p className="text-gray-700 mb-2">Szent Anna Templom – Debrecen</p>
          <p className="text-gray-500">2026. Június 10. – 15:00 kezdettel</p>
        </motion.section>

        {/* Program */}
        <motion.section
          id="program"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto px-6 py-16"
        >
          <h3 className="text-3xl font-semibold text-brand-rose mb-6 text-center">Esküvői Program</h3>
          <ul className="space-y-4 text-gray-700">
            <li>15:00 – Szertartás</li>
            <li>16:00 – Közös fotózás</li>
            <li>17:00 – Vacsora és beszédek</li>
            <li>19:00 – Nyitótánc</li>
            <li>20:00 – Élő zene és buli</li>
            <li>22:00 – Tortavágás</li>
          </ul>
        </motion.section>

        {/* Ajándéklista */}
        <motion.section
          id="ajandek"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="max-w-4xl mx-auto px-6 py-16 text-center"
        >
          <h3 className="text-3xl font-semibold text-brand-rose mb-4">Ajándékötletek</h3>
          <p className="text-gray-600 mb-6">Számunkra a legnagyobb ajándék, ha velünk ünnepelsz. Ha mégis meglepnél minket valamivel:</p>
          <ul className="text-gray-700 space-y-2">
            <li>– Élménykupon (wellness, színház, kirándulás)</li>
            <li>– Lakásdekoráció</li>
            <li>– Bor, pezsgő, gourmet csomag</li>
            <li>– Hozzájárulás nászútunkhoz</li>
          </ul>
        </motion.section>

        {/* Galéria */}
        <motion.section
          id="galeria"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="max-w-6xl mx-auto px-6 py-16"
        >
          <h3 className="text-3xl font-semibold text-brand-rose mb-8 text-center">Galéria</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((img, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="overflow-hidden rounded-xl shadow-lg"
              >
                <Image
                  src={img}
                  alt={`wedding-${index}`}
                  width={400}
                  height={300}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Üzenetküldés */}
        <motion.section
          id="uzenet"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="max-w-xl mx-auto px-6 py-20 text-center"
        >
          <h3 className="text-3xl font-semibold text-brand-rose mb-4">Üzenj nekünk!</h3>
          {submitted ? (
            <p className="text-green-600 font-medium">Köszönjük az üzeneted! ❤️</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Neved"
                className="w-full border rounded px-4 py-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email (opcionális)"
                className="w-full border rounded px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <textarea
                placeholder="Üzeneted..."
                className="w-full border rounded px-4 py-2"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>
              <button
                type="submit"
                disabled={submitting}
                className="bg-brand-rose text-white px-6 py-2 rounded shadow hover:bg-brand-rose/80 transition"
              >
                {submitting ? "Küldés..." : "Üzenet elküldése"}
              </button>
            </form>
          )}
        </motion.section>

        {/* Footer */}
        <footer className="bg-rose-100 text-center py-12 mt-20 text-brand-rose">
          <p className="text-xl font-serif italic">Köszönjük, hogy velünk ünnepelsz!</p>
          <p className="text-sm mt-2">Anna & Balázs esküvője – 2025</p>
        </footer>
      </div>
    </main>
  );
}
