'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Instagram, Facebook } from "lucide-react";
import emailjs from '@emailjs/browser';
import { useToast } from '../context/ToastContext';

// ... (A FloatingLabelInput komponens marad változatlan) ...
const FloatingLabelInput = ({ id, label, type = "text", value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isTextarea = type === "textarea";

  const labelClasses = "absolute left-3 transition-all duration-300 ease-in-out pointer-events-none";
  const activeLabelClasses = "top-0 -translate-y-1/2 text-xs bg-[#FDF8F7] px-1 text-[#B76E79]";
  const inactiveLabelClasses = "top-1/2 -translate-y-1/2 text-gray-500";

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
    >
      <label htmlFor={id} className={`${labelClasses} ${isFocused || value ? activeLabelClasses : inactiveLabelClasses}`}>
        {label}
      </label>
      {isTextarea ? (
        <textarea id={id} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          className="w-full px-3 py-3 bg-white/50 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#B76E79] focus:ring-1 focus:ring-[#B76E79] transition-all duration-300 h-32 resize-none"
          rows="4" required
        />
      ) : (
        <input id={id} type={type} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          className="w-full px-3 py-3 bg-white/50 border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#B76E79] focus:ring-1 focus:ring-[#B76E79] transition-all duration-300"
          required
        />
      )}
    </motion.div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSending, setIsSending] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    // TRÜKK: A meglévő "Admin Rendelés" sablon mezőit töltjük ki az üzenet adataival
    // Így nem kell új template-et venni.
    const templateParams = {
        order_number: "ÜZENET",      // Ez jelenik meg a fejlécben: Rendelés részletei (#ÜZENET)
        customer_name: formData.name,
        customer_email: formData.email,
        order_summary: "Kapcsolatfelvételi űrlap üzenet", // Ez lesz a 'Rendelt tételek' helyén
        billing_details: "Weboldalról érkezett",          // 'Számlázási adatok' helyett
        shipping_details: "-",                            // 'Szállítási adatok' helyett
        note: formData.message                            // A 'Megjegyzés' mezőbe kerül a lényeg: az üzenet
    };
    
    try {
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        const serviceID = 'service_o12cdtu';
        
        // CSAK a 'Nekem' sablont használjuk (template_up0zvgm)
        // Az ügyfélnek itt nem küldünk automatikus választ (spórolunk a kérésekkel és a sablonokkal)
        await emailjs.send(serviceID, 'template_up0zvgm', templateParams, publicKey);

        showToast("Köszönöm az üzeneted! Hamarosan válaszolok.", "success");
        setFormData({ name: "", email: "", message: "" });
    } catch (error) {
        console.error("EMAILJS HIBA:", error);
        showToast("Hiba történt az üzenet küldésekor. Kérlek próbáld újra!", "error");
    } finally {
        setIsSending(false);
    }
  };

  return (
    <motion.section
      id="kapcsolat"
      className="py-20 md:py-28 bg-[#FDF8F7] overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-4xl md:text-5xl italic text-[#5C5454] mb-6">
            Lépjünk kapcsolatba
          </h2>
          <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
            Kérdésed van? Írd meg és hamarosan felveszem veled a kapcsolatot!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-start">
          
          {/* === Bal oszlop: Elérhetőségek === */}
          <motion.div
            className="space-y-10"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div>
                <h3 className="text-2xl font-serif text-[#5C5454] mb-6 border-b border-[#E8DCC4] pb-2 inline-block">
                Elérhetőségeim
                </h3>
                <div className="space-y-4 font-light text-gray-700">
                    <a href="mailto:laceeskuvok@gmail.com" className="flex items-center gap-4 group hover:text-[#B76E79] transition-colors">
                        <div className="bg-white p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                            <Mail className="w-5 h-5 text-[#B76E79]" />
                        </div>
                        <span className="text-lg">laceeskuvok@gmail.com</span>
                    </a>
                </div>
            </div>

            <div>
                <h3 className="text-2xl font-serif text-[#5C5454] mb-6 border-b border-[#E8DCC4] pb-2 inline-block">
                Kövess be!
                </h3>
                <div className="flex flex-col gap-4">
                     {/* Facebook */}
                    <a href="https://www.facebook.com/profile.php?id=61578992124566" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group hover:text-[#B76E79] transition-colors">
                        <div className="bg-white p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                            <Facebook className="w-5 h-5 text-[#B76E79]" />
                        </div>
                        <span className="text-lg">Lace esküvők</span>
                    </a>

                    {/* Instagram */}
                    <a href="#" target="_blank" className="flex items-center gap-4 group hover:text-[#B76E79] transition-colors">
                        <div className="bg-white p-3 rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                            <Instagram className="w-5 h-5 text-[#B76E79]" />
                        </div>
                        <span className="text-lg">@laceeskuvok</span>
                    </a>
                </div>
            </div>
          </motion.div>

          {/* === Jobb oszlop: Űrlap === */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-[#E8DCC4]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <FloatingLabelInput id="name" label="Teljes neved" value={formData.name} onChange={handleChange} />
            <FloatingLabelInput id="email" label="E-mail címed" type="email" value={formData.email} onChange={handleChange} />
            <FloatingLabelInput id="message" label="Üzeneted" type="textarea" value={formData.message} onChange={handleChange} />

            <div className="text-right pt-4">
              <motion.button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-3 bg-[#B76E79] text-white font-serif tracking-wide text-lg rounded-full shadow-lg hover:bg-[#a05a63] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                whileHover={{ scale: isSending ? 1 : 1.02 }}
                whileTap={{ scale: isSending ? 1 : 0.98 }}
                disabled={isSending}
              >
                {isSending ? (
                    <SpinnerIcon />
                ) : (
                    <Send className="w-5 h-5" />
                )}
                {isSending ? 'Küldés...' : 'Üzenet küldése'}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

// Spinner komponens
const SpinnerIcon = () => ( 
    <motion.svg 
        className="w-5 h-5 text-white" 
        animate={{ rotate: 360 }} 
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        <path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </motion.svg> 
);

export default ContactSection;