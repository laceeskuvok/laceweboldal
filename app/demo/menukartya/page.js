"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Soup, Beef, Wine } from "lucide-react";

const MenuCardDetail = () => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const menuItems = [
    {
      icon: <Soup className="w-4 h-4" />,
      category: "Előétel",
      name: "Erdei gombakrémleves pirított mandulával",
    },
    {
      icon: <Beef className="w-4 h-4" />,
      category: "Főétel",
      name: "Rozmaringos kacsamell burgonyapürével és vörösboros mártással",
    },
    {
      icon: <Wine className="w-4 h-4" />,
      category: "Desszert & Italok",
      name: "Somlói galuska és válogatott borok a Liszkay Pincészetből",
    },
  ];

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-10">
      <div>
        <h3 className="font-serif text-2xl text-brand-text mb-3">Menükártya</h3>
        <p className="text-gray-600 leading-relaxed">
          Emeljétek az ünnepi asztal fényét egy, a meghívótok stílusához tökéletesen illeszkedő menükártyával! 
          Minden darab prémium papírra nyomtatva, a ti menütökkel és design elemeitekkel.
        </p>
      </div>

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        className="w-full max-w-sm mx-auto bg-rose-50 rounded-lg shadow-2xl p-8 border border-rose-100 aspect-[3/4] flex flex-col justify-between"
      >
        <div style={{ transform: "translateZ(40px)" }} className="text-center">
          <p className="text-sm tracking-widest text-gray-500">MENÜ</p>
          <h2
            className="text-4xl mt-2 text-brand-rose"
            style={{ fontFamily: "Great Vibes, cursive" }}
          >
            Anna & Bence
          </h2>
        </div>

        <div className="space-y-6" style={{ transform: "translateZ(30px)" }}>
          {menuItems.map((item) => (
            <div key={item.category}>
              <p className="text-xs uppercase tracking-widest text-gray-400 flex items-center gap-2">
                {item.icon} {item.category}
              </p>
              <p className="mt-1 text-brand-text">{item.name}</p>
            </div>
          ))}
        </div>

        <p style={{ transform: "translateZ(20px)" }} className="text-center text-xs text-gray-400">
          Jó étvágyat kívánunk!
        </p>
      </motion.div>

      <div className="pt-4 text-center">
        <Link href="/kapcsolat?kollekcio=Menükártya" passHref legacyBehavior>
          <a className="btn-primary">Érdekel az ajánlat</a>
        </Link>
      </div>
    </div>
  );
};

export default MenuCardDetail;
