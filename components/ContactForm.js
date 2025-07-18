'use client';

import { useState, useEffect } from 'react';
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
const ContactForm = ({ collections, initialCollectionName }) => {
  const [formType, setFormType] = useState(null); // null | 'general' | 'quote'
  const [step, setStep] = useState(1); // A többlépcsős varázslóhoz
  const [selection, setSelection] = useState({ collection: null, items: [] });
  const [status, setStatus] = useState('idle'); // idle | sending | success
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Kezeli, ha a felhasználó a kollekciók oldalról érkezik
  useEffect(() => {
    if (initialCollectionName) {
      const preselected = collections.find(c => c.name === initialCollectionName);
      if (preselected) {
        setFormType('quote');
        setSelection({ collection: preselected, items: [] });
        setStep(2); // Egyből a 2. lépésre ugrik
      }
    }
  }, [initialCollectionName, collections]);

  const handleSelectFormType = (type) => {
    setFormType(type);
    setStep(1);
    setSelection({ collection: null, items: [] });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCollectionSelect = (collection) => {
    setSelection({ collection, items: [] });
    setStep(2);
  };

  const handleItemToggle = (item) => {
    setSelection(prev => ({
      ...prev,
      items: prev.items.includes(item) ? prev.items.filter(i => i !== item) : [...prev.items, item],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    let finalData;

    if (formType === 'quote') {
      const finalMessage = `Tisztelt Cím!\n\nÉrdeklődnék a(z) "${selection.collection.name}" kollekcióval kapcsolatban.\nA következő elemekre szeretnék árajánlatot kérni:\n- ${selection.items.join('\n- ') || 'Nincs konkrét elem megjelölve.'}\n\nÜzenetem: ${formData.message || ''}\n\nÜdvözlettel,\n${formData.name}`;
      finalData = { ...formData, message: finalMessage };
    } else {
      finalData = formData;
    }
    
    console.log("Elküldendő adat:", finalData);
    // Ide jön az EmailJS vagy más emailküldő szolgáltatás logikája
    setTimeout(() => setStatus('success'), 2000); // Küldés szimulációja
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

  // Sikeres állapot
  if (status === 'success') {
    return (
      <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 flex flex-col items-center justify-center h-full min-h-[400px]">
        <SuccessIcon />
        <h3 className="text-2xl font-serif text-gray-800 mt-4">Köszönöm a megkeresésed!</h3>
        <p className="text-gray-600 mt-2">Hamarosan felveszem veled a kapcsolatot.</p>
      </motion.div>
    );
  }

  return (
    <div className="min-h-[450px]">
      <AnimatePresence mode="wait">
        
        {/* === 1. LÉPÉS: VÁLASZTÓ KÉPERNYŐ === */}
        {!formType ? (
          <motion.div key="type-selection" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
            <h3 className="font-serif text-2xl text-brand-text mb-6 text-center">Miben segíthetek?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button onClick={() => handleSelectFormType('quote')} className="p-6 border border-brand-rose/30 rounded-lg text-left hover:bg-brand-rose/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand-rose">
                <p className="font-semibold text-brand-text text-lg">Árajánlatkérés kollekcióra</p>
                <p className="text-sm text-gray-500 mt-1">Konkrét elképzelésed van egy meglévő kollekció alapján.</p>
              </button>
              <button onClick={() => handleSelectFormType('general')} className="p-6 border border-brand-rose/30 rounded-lg text-left hover:bg-brand-rose/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand-rose">
                <p className="font-semibold text-brand-text text-lg">Általános érdeklődés</p>
                <p className="text-sm text-gray-500 mt-1">Egyéb grafikai munkáról vagy kérdésről van szó.</p>
              </button>
            </div>
          </motion.div>
        
        /* === 2. LÉPÉS: ÁLTALÁNOS ÜZENETKÜLDŐ === */
        ) : formType === 'general' ? (
          <motion.form key="general-form" onSubmit={handleSubmit} variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
            <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl text-brand-text">Írd meg miben segíthetek</h3>
                <button type="button" onClick={() => handleSelectFormType(null)} className="text-xs font-sans text-gray-500 hover:text-brand-text transition-colors">Vissza</button>
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-brand-text mb-1">Név</label>
              <input type="text" name="name" id="name" required onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white/50 border border-brand-rose/50 rounded-lg focus:ring-brand-rose focus:border-brand-rose transition"/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brand-text mb-1">E-mail cím</label>
              <input type="email" name="email" id="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-white/50 border border-brand-rose/50 rounded-lg focus:ring-brand-rose focus:border-brand-rose transition"/>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-text mb-1">Üzenet</label>
              <textarea name="message" id="message" rows="5" required onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-white/50 border border-brand-rose/50 rounded-lg focus:ring-brand-rose focus:border-brand-rose transition"></textarea>
            </div>
            <div className="text-right pt-2">
              <button type="submit" disabled={status === 'sending'} className="gradient-border-button text-lg flex items-center justify-center ml-auto gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === 'sending' ? <><SpinnerIcon /> Küldés...</> : 'Üzenet elküldése'}
              </button>
            </div>
          </motion.form>

        /* === 3. LÉPÉS: ÁRAJÁNLATKÉRŐ VARÁZSLÓ === */
        ) : (
          <motion.div key="quote-wizard" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-serif text-2xl text-brand-text">Árajánlatkérés</h3>
                {!initialCollectionName && <button type="button" onClick={() => handleSelectFormType(null)} className="text-xs font-sans text-gray-500 hover:text-brand-text transition-colors">Vissza a választáshoz</button>}
            </div>
            {/* Folyamatjelző */}
            <div className="w-full bg-brand-pale-pink/50 rounded-full h-1.5 mb-6">
                <motion.div className="bg-brand-rose h-1.5 rounded-full" animate={{ width: `${(step / 3) * 100}%` }} transition={{ ease: "easeInOut", duration: 0.5 }} />
            </div>
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                    <h4 className="font-serif text-xl text-brand-text mb-4">1. Válassz kollekciót</h4>
                    <div className="space-y-3">
                        {collections.map(col => (
                            <button type="button" key={col.id} onClick={() => handleCollectionSelect(col)} className="w-full text-left p-4 border border-brand-rose/30 rounded-lg hover:bg-brand-rose/10 transition-all focus:outline-none focus:ring-2 focus:ring-brand-rose">
                                <p className="font-semibold text-brand-text">{col.name}</p>
                                <p className="text-sm text-gray-500">{col.description}</p>
                            </button>
                        ))}
                    </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                    <h4 className="font-serif text-xl text-brand-text mb-4">2. Milyen elemek érdekelnek?</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selection.collection.items.map(item => (
                            <button type="button" key={item} onClick={() => handleItemToggle(item)} className={`p-3 text-center rounded-lg border transition-all text-sm ${selection.items.includes(item) ? 'bg-brand-rose text-white border-brand-rose' : 'border-brand-rose/30 hover:bg-brand-rose/10'}`}>
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6">
                        <button type="button" onClick={() => setStep(1)} className="text-sm font-sans text-gray-500 hover:text-brand-text">Vissza</button>
                        <button type="button" onClick={() => setStep(3)} className="px-6 py-2 bg-brand-rose text-white font-sans text-sm rounded-full hover:bg-opacity-90 transition-opacity">Tovább</button>
                    </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.form key="step3" onSubmit={handleSubmit} variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-4">
                    <h4 className="font-serif text-xl text-brand-text mb-4">3. Személyes adatok és véglegesítés</h4>
                    
                    {/* === ÚJ: ÖSSZEGZŐ SZEKCIÓ === */}
                    <div className="p-4 bg-brand-pale-pink/50 rounded-lg border border-brand-rose/20 mb-6">
                        <p className="text-sm font-semibold text-brand-text">Választott kollekció: <span className="font-normal">{selection.collection.name}</span></p>
                        <div className="mt-2 text-sm text-brand-text">
                           <p className="font-semibold">Kiválasztott elemek:</p>
                           {selection.items.length > 0 ? (
                             <ul className="list-disc list-inside pl-2 text-gray-600">
                               {selection.items.map(item => <li key={item}>{item}</li>)}
                             </ul>
                           ) : (
                             <p className="text-gray-500 italic">Nincs elem kiválasztva.</p>
                           )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name-quote" className="block text-sm font-medium text-brand-text mb-1">Név</label>
                        <input type="text" name="name" id="name-quote" required onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-white/50 border border-brand-rose/50 rounded-lg focus:ring-brand-rose focus:border-brand-rose transition"/>
                    </div>
                    <div>
                        <label htmlFor="email-quote" className="block text-sm font-medium text-brand-text mb-1">E-mail cím</label>
                        <input type="email" name="email" id="email-quote" required onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-white/50 border border-brand-rose/50 rounded-lg focus:ring-brand-rose focus:border-brand-rose transition"/>
                    </div>
                    <div>
                        <label htmlFor="message-quote" className="block text-sm font-medium text-brand-text mb-1">Üzenet (opcionális)</label>
                        <textarea name="message" id="message-quote" rows="3" placeholder="Pl. darabszám, extra kérések..." onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 bg-white/50 border border-brand-rose/50 rounded-lg focus:ring-brand-rose focus:border-brand-rose transition"></textarea>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                         <button type="button" onClick={() => setStep(2)} className="text-sm font-sans text-gray-500 hover:text-brand-text">Vissza</button>
                        <button type="submit" disabled={status === 'sending'} className="gradient-border-button text-lg flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                            {status === 'sending' ? <><SpinnerIcon /> Küldés...</> : 'Árajánlatkérés elküldése'}
                        </button>
                    </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactForm;