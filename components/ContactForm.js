'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// === Ikonok az állapotjelzéshez ===
const SpinnerIcon = () => ( <motion.svg className="w-5 h-5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></motion.svg> );
const SuccessIcon = () => ( <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></motion.svg> );
const CheckIcon = (props) => ( <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> );

// === Fő Komponens ===
const ContactForm = ({ collections, extras, initialCollectionName }) => {
  const [formType, setFormType] = useState(null);
  const [step, setStep] = useState(1);
  const [selection, setSelection] = useState({ collection: null, extras: [] });
  const [status, setStatus] = useState('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    if (initialCollectionName) {
      const preselected = collections.find(c => c.name === initialCollectionName);
      if (preselected) {
        setFormType('quote');
        setSelection(prev => ({ ...prev, collection: preselected }));
        setStep(2); // Egyből a 2. lépésre ugrás: Extrák kiválasztása
      }
    }
  }, [initialCollectionName, collections]);

  const handleSelectFormType = (type) => {
    setFormType(type);
    setStep(1);
    setSelection({ collection: null, extras: [] });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCollectionSelect = (collection) => {
    setSelection({ collection, extras: [] });
    setStep(2);
  };
  
  const handleExtraToggle = (extra) => {
    setSelection(prev => ({
        ...prev,
        extras: prev.extras.some(e => e.name === extra.name) 
            ? prev.extras.filter(e => e.name !== extra.name) 
            : [...prev.extras, extra]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    let finalData;
    if (formType === 'quote') {
        const extrasList = selection.extras.map(e => `${e.name} (${e.price})`).join('\n- ');
        const finalMessage = `Tisztelt Cím!\n\nÉrdeklődnék a(z) "${selection.collection.name}" kollekcióval kapcsolatban.\n\nKiválasztott extrák:\n- ${extrasList || 'Nincs.'}\n\nÜzenetem: ${formData.message || ''}\n\nÜdvözlettel,\n${formData.name}`;
        finalData = { ...formData, message: finalMessage };
    } else {
        finalData = formData;
    }
    console.log("Elküldendő adat:", finalData);
    setTimeout(() => setStatus('success'), 2000);
  };
  
  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -30 },
  };

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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 min-h-[450px]">
        {/* Bal oldal: Összegző */}
        <div className="md:col-span-1 py-6 px-6 bg-brand-pale-pink/50 rounded-lg">
            <h3 className="font-sans uppercase tracking-wider text-brand-text border-b border-brand-rose/30 pb-2 mb-4">Választásod</h3>
            <div className="space-y-4">
                <div>
                    <p className="text-sm text-gray-500">Kollekció:</p>
                    <AnimatePresence>
                        {selection.collection && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold text-brand-rose">{selection.collection.name}</motion.p>}
                    </AnimatePresence>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Extrák:</p>
                    <ul className="mt-1 space-y-1">
                    <AnimatePresence>
                        {selection.extras.map(item => (
                            <motion.li key={item.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="text-sm text-gray-700 flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-brand-rose flex-shrink-0" /> <span>{item.name}</span>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                    </ul>
                </div>
            </div>
        </div>

        {/* Jobb oldal: Űrlap lépések */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
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
                        <button type="submit" disabled={status === 'sending'} className="btn-primary flex items-center justify-center ml-auto gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
                            {status === 'sending' ? <><SpinnerIcon /> Küldés...</> : 'Üzenet elküldése'}
                        </button>
                    </div>
                </motion.form>
            ) : (
              <motion.div key="quote-wizard" variants={stepVariants} initial="hidden" animate="visible" exit="exit">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-serif text-2xl text-brand-text">Árajánlatkérés</h3>
                    {!initialCollectionName && <button type="button" onClick={() => { setFormType(null); setStep(1); }} className="text-xs font-sans text-gray-500 hover:text-brand-text transition-colors">Vissza</button>}
                </div>
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
                        <h4 className="font-serif text-xl text-brand-text mb-4">2. Válassz extrákat</h4>
                        <div className="space-y-3">
                            {extras.map(extra => (
                                <button type="button" key={extra.name} onClick={() => handleExtraToggle(extra)}
                                className={`w-full text-left p-3 border rounded-lg transition-all flex justify-between items-center ${selection.extras.some(e => e.name === extra.name) ? 'bg-brand-rose/10 border-brand-rose ring-2 ring-brand-rose/50' : 'border-brand-rose/30 hover:bg-brand-rose/10'}`}>
                                    <span className="font-medium text-brand-text">{extra.name}</span>
                                    <span className="text-sm text-gray-500">{extra.price}</span>
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
                        <h4 className="font-serif text-xl text-brand-text mb-4">3. Személyes adatok</h4>
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
                            <button type="submit" disabled={status === 'sending'} className="btn-primary flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed">
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
    </div>
  );
};

export default ContactForm;