'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Newspaper, QrCode, Sparkles, CheckCircle, GitMerge, Gift, MessageSquare, MapPin, Check } from 'lucide-react';
import Header from '../../components/Header';
import FOG from 'vanta/dist/vanta.fog.min.js';
import * as THREE from 'three';

// === Fő Komponens ===
export default function InfoPage() {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    if (!vantaEffect && typeof window !== "undefined") {
      setVantaEffect(
        FOG({
          el: vantaRef.current, THREE: THREE, mouseControls: true, touchControls: true, gyrocontrols: false,
          minHeight: 200.0, minWidth: 200.0, highlightColor: 0xffffff, midtoneColor: 0xd9c4c4,
          lowlightColor: 0xf5ebeb, baseColor: 0xfaf7f6, blurFactor: 0.5, speed: 0.6, zoom: 0.6,
        })
      );
    }
    return () => { if (vantaEffect) vantaEffect.destroy(); };
  }, [vantaEffect]);

  const processSteps = [
    { title: "Konzultáció", description: "Egy beszélgetes során megismerem az elképzeléseiteket és a nagy nap hangulatát." },
    { title: "Látványtervek", description: "A megbeszéltek alapján elkészitem az első vázlatokat." },
    { title: "Tökéletesítés", description: "Lehetőségetek van finomhangolni a részleteket (általában 2 körben), hogy minden pixel a helyére kerüljön." },
    { title: "A Kész Alkotás", description: "A jóváhagyott, végleges tervet prémium minőségben valósítjuk meg, hogy kézzelfogható emlékké váljon." },
  ];

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  return (
    <>
      <Header />
      <main ref={vantaRef} className="relative">
        <FloatingShapes />
        <section className="h-[70vh] flex items-center justify-center text-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: 'easeOut' }} className="relative z-10">
                <h1 className="font-serif text-5xl md:text-7xl italic text-brand-text drop-shadow-lg">A részletekben rejlő varázslat</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body drop-shadow-md">Ismerd meg, hogyan kelnek életre az álmaitok a LACE egyedi grafikai megoldásaival, a tervezés első pillanatától az utolsó simításig.</p>
            </motion.div>
        </section>

        <div className="relative z-10 px-4 pb-20 md:pb-32">
            <motion.div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-2xl p-8 md:p-16 rounded-3xl border border-white/20 shadow-2xl space-y-28"
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} variants={containerVariants}>
                
                <motion.div variants={itemVariants} className="text-center">
                    <h2 className="font-serif text-4xl md:text-5xl text-brand-text">Két Különleges Történet</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-body">Két zászlóshajónk, amelyek garantáltan egyedivé és felejthetetlenné teszik a nagy napotok bejelentését.</p>
                    {/* === JAVÍTVA: Egyszerűbb, egységes kártya stílus === */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Link href="/kollekciok#lace-gazette" className="block bg-brand-pale-pink/50 rounded-2xl p-8 text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                            <Newspaper className="w-12 h-12 text-brand-rose" strokeWidth={1}/>
                            <h3 className="font-serif text-3xl text-brand-text mt-4">Lace Gazette</h3>
                            <p className="mt-2 text-gray-600 leading-relaxed font-body">Egy valódi újság, tele a ti történeteitekkel, interjúkkal és a nagy nap programjával. Garantáltan minden vendég megőrzi majd!</p>
                        </Link>
                         <Link href="/kollekciok#lace-message" className="block bg-brand-rose text-white rounded-2xl p-8 text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                            <QrCode className="w-12 text-gray-700 h-12" strokeWidth={1}/>
                            <h3 className="font-serif text-3xl text-gray-700 mt-4">Lace Message</h3>
                            <p className="mt-2 text-gray-700 leading-relaxed font-body">Lepjétek meg a vendégeket egy személyes videóüzenettel, amit a meghívóba rejtett QR kód kelt életre. Egy modern, meghitt gesztus.</p>
                        </Link>
                    </div>
                </motion.div>

            {/* === AZ ALKOTÁS FOLYAMATA === */}
            <motion.div variants={itemVariants} className="text-center">
              <GitMerge className="w-12 h-12 mx-auto text-brand-rose" strokeWidth={1} />
              <h2 className="font-serif text-4xl md:text-5xl text-brand-text mt-4">Az álomból valóság: a közös munka lépései</h2>
              <div className="mt-16 relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200" />
                <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-brand-rose text-white rounded-full flex items-center justify-center font-serif text-xl z-10 shadow-lg">{index + 1}</div>
                      <h4 className="mt-6 font-serif text-2xl text-brand-text">{step.title}</h4>
                      <p className="mt-2 text-gray-500 font-body">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <DigitalExtrasSection />

            {/* === EGYÉB LEHETŐSÉGEK === */}
            <motion.div variants={itemVariants}>
                    <div className="text-center">
                        <h2 className="font-serif text-4xl md:text-5xl text-brand-text">További Lehetőségek</h2>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-body">A kiemelt kollekciók mellett természetesen számos más stílusban is alkotunk, sőt, teljesen egyedi elképzeléseket is megvalósítunk.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                         <Link href="/kollekciok" className="block bg-brand-pale-pink/50 rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                            <Sparkles className="w-12 h-12 text-brand-rose" strokeWidth={1}/>
                            <h3 className="font-serif text-3xl text-brand-text mt-4">További kollekciók</h3>
                            <p className="mt-2 text-gray-600 leading-relaxed font-body">Böngészd végig az összes elérhető stílust, a moderntől a rusztikusig.</p>
                        </Link>
                         <Link href="/kapcsolat?type=egyedi" className="block bg-brand-rose text-white rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300">
                            <Sparkles className="w-12 text-gray-700 h-12" strokeWidth={1}/>
                            <h3 className="font-serif text-3xl text-gray-700 mt-4">Egyedi Megrendelés</h3>
                            <p className="mt-2 text-gray-700 leading-relaxed font-body">Valósítsuk meg együtt a teljesen egyedi elképzelésedet!</p>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </div>
      </main>
    </>
  );
}

// === FELTURBÓZOTT DIGITÁLIS EXTRÁK KOMPONENS ===
const DigitalExtrasSection = () => {
    const features = [
        { icon: <Gift size={24} />, title: "Interaktív Ajándéklista", description: "Segítsetek a vendégeknek egy online, kattintható ajándéklistával, ami valós időben frissül. Elkerülhetitek a felesleges ajándékokat, és a násznép is magabiztosan választhat.", demo: <GiftListDemo /> },
        { icon: <MessageSquare size={24} />, title: "Online Vendégkönyv", description: "Gyűjtsétek a jókívánságokat egy helyen, amit az esküvő után is öröm lesz visszaolvasni. A távolabbi rokonok és barátok is hagyhatnak személyes üzenetet.", demo: <GuestbookDemo /> },
        { icon: <MapPin size={24} />, title: "Információs Mini-Oldal", description: "A legfontosabb infók (térkép, program, szállás) egy elegáns, mobilon is tökéletesen elérhető oldalon. Praktikus és kényelmes megoldás a vendégek számára.", demo: <InfoPageDemo /> },
        { icon: <Sparkles size={24} />, title: "A Teljes Esküvői Weboldal", description: "Az 'all-in-one' csomag a tökéletes digitális élményért. Tartalmazza az összes fenti funkciót, kiegészítve fotógalériával, videóval és online RSVP űrlappal.", demo: <div className="text-center p-8"><Link href="/demo/eskuvoi" target="_blank" className="btn-primary">Teljes Demó Megnyitása</Link></div> }
    ];

    return (
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="space-y-12">
            <div className="text-center">
                <h2 className="font-serif text-4xl md:text-5xl text-brand-text">A Ti Digitális Emléketek – Modulárisan</h2>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed font-body">Válasszátok csak azokat a digitális funkciókat, amikre valóban szükségetek van, vagy kérjétek a teljes csomagot a tökéletes online élményért!</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {features.map((feature, i) => (
                    <motion.div key={feature.title}
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                        className="bg-white/50 rounded-2xl shadow-lg border border-white/30 overflow-hidden flex flex-col">
                        <div className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-brand-rose text-white rounded-lg flex items-center justify-center flex-shrink-0">{feature.icon}</div>
                                <h3 className="font-serif text-2xl text-brand-text">{feature.title}</h3>
                            </div>
                            <p className="mt-4 text-sm text-gray-600 font-body leading-relaxed">{feature.description}</p>
                        </div>
                        <div className="bg-gray-100/70 p-4 border-t border-gray-200/80 mt-auto">
                            {feature.demo}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

// === FELTURBÓZOTT MINI-DEMÓ KOMPONENSEK ===
const GiftListDemo = () => {
    const initialGifts = [
        { id: 1, name: 'Wellness hétvége', is_claimed: true, claimed_by: 'Nóri & Gergő' },
        { id: 2, name: 'Repülőjegy', is_claimed: false },
    ];
    const [gifts, setGifts] = useState(initialGifts);
    const [newItem, setNewItem] = useState({ name: '', description: '', image: null });
    
    const handleClaim = (id) => {
        const name = prompt("Kérjük, add meg a neved a foglaláshoz:");
        if (name) {
            setGifts(gifts.map(g => g.id === id ? { ...g, is_claimed: true, claimed_by: name } : g));
        }
    };

    const handleAddItem = () => {
        if (!newItem.name) return;
        setGifts([...gifts, { id: Date.now(), name: newItem.name, description: newItem.description, image: newItem.image, is_claimed: false }]);
        setNewItem({ name: '', description: '', image: null });
    };

    return (
        <div className="p-2 space-y-3 text-sm">
            <div className="space-y-2">
                {gifts.map(gift => (
                    <div key={gift.id} className={`p-2 rounded-md flex items-center gap-3 transition-all ${gift.is_claimed ? 'bg-gray-200' : 'bg-white shadow-sm'}`}>
                        {gift.image && <img src={gift.image} className="w-8 h-8 rounded object-cover"/>}
                        <div className="flex-grow">
                            <p className={`font-semibold ${gift.is_claimed ? 'text-gray-400 line-through' : 'text-brand-text'}`}>{gift.name}</p>
                            {gift.is_claimed && <p className="text-xs text-gray-500">Lefoglalva ({gift.claimed_by})</p>}
                        </div>
                        {!gift.is_claimed && <button onClick={() => handleClaim(gift.id)} className="w-6 h-6 flex items-center justify-center border-2 border-brand-rose text-brand-rose rounded-full hover:bg-brand-rose/10 transition"><Check size={12} /></button>}
                    </div>
                ))}
            </div>
            <div className="pt-3 border-t border-gray-200">
                 <input type="text" value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} placeholder="Új ötlet neve..." className="w-full text-xs p-2 border rounded-md mb-2"/>
                 <button onClick={handleAddItem} className="w-full text-xs p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition">Hozzáadás a demóhoz</button>
            </div>
        </div>
    );
};

const GuestbookDemo = () => {
    const [messages, setMessages] = useState([
        { id: 1, name: 'Anna', text: 'Sok boldogságot kívánunk!' }
    ]);
    const [newMessage, setNewMessage] = useState({ name: '', text: ''});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newMessage.name || !newMessage.text) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now(), ...newMessage }]);
            setNewMessage({ name: '', text: '' });
            setIsSubmitting(false);
        }, 500); // Szimulálunk egy kis késleltetést
    };

    return (
        <div className="p-2 space-y-3">
            <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                <AnimatePresence>
                    {messages.map(msg => (
                        <motion.div 
                            key={msg.id}
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-white p-3 rounded-lg shadow-sm"
                        >
                            <p className="text-xs font-semibold text-brand-rose">{msg.name}</p>
                            <p className="text-sm text-gray-600">{msg.text}</p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <form onSubmit={handleSubmit} className="pt-3 border-t border-gray-200 space-y-2">
                <input type="text" value={newMessage.name} onChange={e => setNewMessage({...newMessage, name: e.target.value})} placeholder="Neved..." className="w-full text-xs p-2 border rounded-md" required />
                <input type="text" value={newMessage.text} onChange={e => setNewMessage({...newMessage, text: e.target.value})} placeholder="Írj egy üzenetet..." className="w-full text-xs p-2 border rounded-md" required />
                <button type="submit" disabled={isSubmitting} className="w-full text-xs p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition disabled:opacity-50">
                    {isSubmitting ? "Küldés..." : "Üzenet elküldése"}
                </button>
            </form>
        </div>
    );
};

const InfoPageDemo = () => {
    const locationName = "Liszkay Pincészet, Monoszló";
    const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2729.172491125211!2d17.62181891559899!3d46.840224979141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769a6d0f28a8d7d%3A0x86c6b229c13b2c1!2sLiszkay%20Pinc%C3%A9szet!5e0!3m2!1shu!2shu!4v1678886543210!5m2!1shu!2shu";
    const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Liszkay+Pincészet+Monoszló";

    return (
        <div className="p-2 space-y-3">
            <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-brand-rose flex-shrink-0"/>
                <p className="text-sm font-semibold text-gray-700 truncate">{locationName}</p>
            </div>
            <div className="h-28 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                    src={mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="w-full text-xs p-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition block text-center">
                Útvonaltervezés
            </a>
        </div>
    );
};


const InteractiveCard = ({
  icon,
  title,
  description,
  buttonHref,
  buttonText,
  isDark,
}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative p-8 md:p-12 rounded-2xl flex flex-col items-center justify-center text-center shadow-2xl ${
        isDark ? "bg-gray-800 text-white" : "bg-brand-pale-pink/50"
      }`}
    >
      <div
        style={{ transform: "translateZ(50px)" }}
        className="text-brand-rose"
      >
        {icon}
      </div>
      <h3
        style={{ transform: "translateZ(40px)" }}
        className={`font-serif text-3xl mt-4 drop-shadow ${
          isDark && "text-white"
        }`}
      >
        {title}
      </h3>
      <p
        style={{ transform: "translateZ(30px)" }}
        className={`mt-2 leading-relaxed font-body drop-shadow ${
          isDark ? "text-gray-300" : "text-gray-600"
        }`}
      >
        {description}
      </p>
      {buttonHref && (
        <div style={{ transform: "translateZ(20px)" }} className="mt-6">
          <Link href={buttonHref} passHref legacyBehavior>
            <a className={`btn-primary ${isDark && "!bg-brand-rose/80"}`}>
              {buttonText}
            </a>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

const FloatingShapes = () => {
  // JAVÍTVA: A useScroll most már nem okoz hibát, de stabilabb a main elemen
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], ["-10%", "100%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["50%", "-50%"]);
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        style={{ y: y1 }}
        className="absolute top-[10%] left-[5%] w-24 h-24 bg-brand-rose/10 rounded-full"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[60%] right-[8%] w-32 h-32 bg-brand-pale-pink rounded-xl rotate-45"
      />
    </div>
  );
};
