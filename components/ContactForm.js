'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// === Ikonok az állapotjelzéshez ===
const SpinnerIcon = () => (
  <motion.svg
    className="w-5 h-5"
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 4.75V6.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M17.1266 6.87347L16.0659 7.93413"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M19.25 12L17.75 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M17.1266 17.1265L16.0659 16.0659"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M12 17.75V19.25"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M6.87344 17.1265L7.9341 16.0659"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M6.25 12L4.75 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M6.87344 6.87347L7.9341 7.93413"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </motion.svg>
);

const SuccessIcon = () => (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 text-green-500"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2l4 -4" />
    </motion.svg>
);

// === Fő Komponens ===
const ContactForm = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Email küldés szimulációja
    setTimeout(() => {
        // Ide jön az EmailJS logikája. Ha sikeres:
        setStatus('success');
        // Ha hiba történik: setStatus('error');
        console.log(formData);
    }, 2000); // 2 másodperces késleltetés a "küldés" állapot bemutatására
  };

  const inputVariant = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence mode="wait">
        {status === 'success' ? (
            <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10"
            >
                <SuccessIcon />
                <h3 className="text-2xl font-serif text-gray-800 mt-4">Köszönöm a megkeresésed!</h3>
                <p className="text-gray-600 mt-2">Hamarosan felveszem veled a kapcsolatot.</p>
            </motion.div>
        ) : (
            <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial="initial"
                animate="animate"
                exit={{ opacity: 0, x: -50 }}
                transition={{ staggerChildren: 0.1 }}
            >
                <motion.div variants={inputVariant}>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-1">Név</label>
                    <input type="text" name="name" id="name" required onChange={handleChange} disabled={status === 'sending'}
                        className="w-full px-4 py-2 bg-white/50 border border-brand-rose rounded-lg focus:ring-brand-rose focus:border-brand-rose transition disabled:opacity-50" />
                </motion.div>
    
                <motion.div variants={inputVariant}>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-1">E-mail cím</label>
                    <input type="email" name="email" id="email" required onChange={handleChange} disabled={status === 'sending'}
                        className="w-full px-4 py-2 bg-white/50 border border-brand-rose rounded-lg focus:ring-brand-rose focus:border-brand-rose transition disabled:opacity-50" />
                </motion.div>
    
                <motion.div variants={inputVariant}>
                    <label className="block text-sm font-medium text-brand-text mb-2">Miben segíthetek?</label>
                    <div className="grid grid-cols-2 gap-4">
                        {['Esküvői meghívó', 'Grafikai munka', 'Árajánlatkérés', 'Egyéb'].map((service) => (
                            <div key={service}>
                                <input type="radio" name="service" id={service} value={service} onChange={handleChange} className="hidden peer" disabled={status === 'sending'} />
                                <label htmlFor={service}
                                    className="block p-3 text-center rounded-lg border border-brand-rose cursor-pointer transition-all peer-checked:bg-brand-rose peer-checked:text-white hover:bg-brand-rose/20">
                                    {service}
                                </label>
                            </div>
                        ))}
                    </div>
                </motion.div>
    
                <motion.div variants={inputVariant}>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-text mb-1">Üzenet</label>
                    <textarea name="message" id="message" rows="4" required onChange={handleChange} disabled={status === 'sending'}
                        className="w-full px-4 py-2 bg-white/50 border border-brand-rose rounded-lg focus:ring-brand-rose focus:border-brand-rose transition disabled:opacity-50"></textarea>
                </motion.div>
    
                <motion.div variants={inputVariant} className="text-center">
                    <button type="submit" className="gradient-border-button text-lg flex items-center justify-center mx-auto gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                        disabled={status === 'sending'}>
                        {status === 'sending' ? (
                            <>
                                <SpinnerIcon />
                                Küldés...
                            </>
                        ) : (
                            'Üzenet elküldése'
                        )}
                    </button>
                </motion.div>
            </motion.form>
        )}
    </AnimatePresence>
  );
};

export default ContactForm;