'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Instagram } from "lucide-react";
import emailjs from '@emailjs/browser';

// Egyedi input mező komponens lebegő címkével
const FloatingLabelInput = ({ id, label, type = "text", value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const isTextarea = type === "textarea";

  const labelClasses = "absolute left-3 transition-all duration-300 ease-in-out pointer-events-none";
  const activeLabelClasses = "top-0 -translate-y-1/2 text-xs bg-[#FDF8F7] px-1 text-brand-rose";
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
          className="w-full px-3 py-3 bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-rose transition-colors duration-300 h-32 resize-none"
          rows="4" required
        />
      ) : (
        <input id={id} type={type} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          className="w-full px-3 py-3 bg-transparent border-2 border-gray-300 rounded-lg focus:outline-none focus:border-brand-rose transition-colors duration-300"
          required
        />
      )}
    </motion.div>
  );
};

// A fő kapcsolat szekció
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // --- JAVÍTVA: EmailJS integrációval ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    const ownerTemplateParams = {
        user_name: formData.name,
        user_email: formData.email,
        collection_name: 'Általános üzenet a főoldalról',
        selected_extras: 'N/A', // Nincs extra ezen az űrlapon
        message: formData.message,
    };
    
    const customerTemplateParams = {
        user_name: formData.name,
        user_email: formData.email,
        collection_name: 'Általános érdeklődés',
    };

    try {
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
        
        await Promise.all([
            emailjs.send('service_o12cdtu', 'template_up0zvgm', ownerTemplateParams, publicKey),
            emailjs.send('service_o12cdtu', 'template_11w8l4y', customerTemplateParams, publicKey),
        ]);

        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Ürlap ürítése
    } catch (error) {
        console.error("EMAILJS HIBA A FŐOLDALON:", error);
        setStatus("error");
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
        <div className="text-center mb-12 md:mb-20">
          <h2 className="font-serif text-4xl md:text-5xl italic text-gray-800">Lépjünk kapcsolatba</h2>
          <p className="mt-4 text-lg text-gray-500 font-body max-w-2xl mx-auto">
            Kérdésed van, vagy egyedi elképzelésed? Írd meg, és hamarosan felveszem veled a kapcsolatot!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Bal oszlop: Információk */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-3xl font-serif text-gray-800">
              Elérhetőségeim
            </h3>
            <div className="space-y-4 font-body text-gray-600">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-brand-rose" />
                <span>hello@lacegrafika.hu</span>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-6 h-6 text-brand-rose" />
                <span>+36 (30) 123 4567</span>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="w-6 h-6 text-brand-rose" />
                <span>Budapest, Magyarország</span>
              </div>
            </div>
            <div className="pt-4">
                 <p>Kövess az Instagramon is a legfrissebb munkákért és inspirációkért!</p>
                 <motion.a href="#" target="_blank" className="inline-flex items-center gap-2 mt-4 text-brand-rose font-bold" whileHover={{scale: 1.05}}>
                    <Instagram />
                    @lace.grafika
                 </motion.a>
            </div>
          </motion.div>

          {/* Jobb oszlop: Űrlap */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <FloatingLabelInput id="name" label="Teljes neved" value={formData.name} onChange={handleChange} />
            <FloatingLabelInput id="email" label="E-mail címed" type="email" value={formData.email} onChange={handleChange} />
            <FloatingLabelInput id="message" label="Üzeneted" type="textarea" value={formData.message} onChange={handleChange} />

            <div className="text-right pt-2">
              <motion.button
                type="submit"
                className="inline-flex items-center gap-3 px-8 py-3 bg-brand-rose text-white font-bold rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-60"
                whileHover={{ scale: status !== 'sending' ? 1.05 : 1 }}
                whileTap={{ scale: status !== 'sending' ? 0.95 : 1 }}
                disabled={status === 'sending'}
              >
                {status === 'sending' ? (
                    <SpinnerIcon />
                ) : (
                    <Send className="w-5 h-5" />
                )}
                {status === 'sending' ? 'Küldés...' : 'Üzenet küldése'}
              </motion.button>
            </div>
            
            <AnimatePresence>
                {status === 'success' && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-green-600 text-center mt-4">Köszönöm az üzeneted! Hamarosan válaszolok.</motion.p>}
                {status === 'error' && <motion.p initial={{opacity:0}} animate={{opacity:1}} className="text-red-600 text-center mt-4">Hoppá, hiba történt. Kérlek, próbáld újra később.</motion.p>}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

// Itt kellene a SpinnerIcon definíciója, ha nincs globálisan importálva
const SpinnerIcon = () => ( <motion.svg className="w-5 h-5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></motion.svg> );

export default ContactSection;