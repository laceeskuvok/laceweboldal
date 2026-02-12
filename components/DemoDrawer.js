"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { X } from "lucide-react";

export default function DemoDrawer({ isOpen, onClose, extra }) {
    if (!extra) return null;

  const getIframeSrc = () => {
    if (!extra) return '';
  switch (extra.id) {
    case 'menu':
      return '/demo/menukartya';
    case 'website':
      return '/demo/eskuvoi_info';
    case 'qr-code':
      return '/demo/qrkod';
    default:
      return '';
  }
  };
  const headerTitle = useMemo(() => {
    if (!extra) return '';
    switch (extra.id) {
      case 'menu':
        return 'Menükártya demó';
      case 'website':
        return 'Esküvői weboldal demó';
    case 'qr-code':
        return 'QR kód demó';
      default:
        return 'Demó';
    }
  }, [extra]);

  const iframeSrc = getIframeSrc();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Háttér overlay */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel maga */}
          <motion.div
            className="fixed top-0 right-0 h-full w-full sm:w-[90vw] md:w-[70vw] lg:w-[60vw] bg-white z-50 shadow-2xl flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Dinamikus fejléc */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">{headerTitle}</h2>
              <button onClick={onClose} aria-label="Bezárás" className="text-gray-500 hover:text-gray-800">
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* „Böngésző” keret mockup */}
            <div className="bg-gray-100 px-4 py-2 flex gap-2 border-b border-gray-300">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <div className="w-3 h-3 bg-green-500 rounded-full" />
            </div>

            {/* Interaktív oldal iframe-ben */}
            <div className="flex-1 overflow-hidden">
            <iframe
                key={iframeSrc} // Ezt **mindenképp** add hozzá!
                src={iframeSrc}
                title={`${extra.name} demó`}
                className="w-full h-full border-0 block"
                loading="eager"
            />


            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
