'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, AlertCircle, X, Info } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Toast hozzáadása
  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Automatikus eltűnés 4 másodperc után
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* --- TOAST KONTÉNER (JAVÍTVA) --- */}
      {/* top-24 (96px) mobilon, top-32 (128px) desktopon -> Így biztosan a fejléc alatt lesz */}
      {/* z-[9999] -> Minden felett */}
      <div className="fixed top-24 md:top-32 left-0 right-0 z-[9999] flex flex-col items-center gap-3 pointer-events-none px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              layout
              className="pointer-events-auto min-w-[300px] max-w-md shadow-2xl rounded-lg overflow-hidden border border-[#E8DCC4] bg-[#FDFCF8]"
            >
              <div className="flex items-center p-4 gap-4">
                {/* Ikonok típus szerint */}
                <div className={`flex-shrink-0 p-2 rounded-full ${
                  toast.type === 'success' ? 'bg-green-100 text-green-600' :
                  toast.type === 'error' ? 'bg-red-100 text-red-600' :
                  'bg-blue-100 text-brand-rose'
                }`}>
                  {toast.type === 'success' && <Check className="w-5 h-5" />}
                  {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                  {toast.type === 'info' && <Info className="w-5 h-5" />}
                </div>

                <div className="flex-1">
                  <p className={`font-serif text-lg font-medium leading-tight ${
                    toast.type === 'error' ? 'text-red-800' : 'text-[#5C5454]'
                  }`}>
                    {toast.type === 'success' ? 'Siker!' : toast.type === 'error' ? 'Hiba' : 'Információ'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1 leading-snug">
                    {toast.message}
                  </p>
                </div>

                <button 
                  onClick={() => removeToast(toast.id)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Progress bar animáció */}
              <motion.div 
                initial={{ width: "100%" }} 
                animate={{ width: "0%" }} 
                transition={{ duration: 4, ease: "linear" }}
                className={`h-1 ${
                    toast.type === 'success' ? 'bg-green-500/30' :
                    toast.type === 'error' ? 'bg-red-500/30' :
                    'bg-brand-rose/30'
                }`}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);