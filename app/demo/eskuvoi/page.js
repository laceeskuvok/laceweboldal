// app/demo/eskuvoi/page.js
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Menu, X, Play, Plus, Check, Gift, UploadCloud } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video"; 
import "yet-another-react-lightbox/styles.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const SpinnerIcon = () => ( <motion.svg className="w-5 h-5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></motion.svg> );

// === ÚJ, FELTURBÓZOTT HEADER KOMPONENS ===
const WeddingHeader = () => {
    const [hasScrolled, setHasScrolled] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const navLinks = [
        { name: "Rólunk", href: "#info" },
        { name: "Program", href: "#program" },
        { name: "Ajándéklista", href: "#ajandek" },
        { name: "Galéria", href: "#galeria" },
        { name: "Üzenj nekünk", href: "#uzenet" },
    ];

    useEffect(() => {
        const handleScroll = () => setHasScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleLinkClick = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={false}
                animate={hasScrolled || isMobileMenuOpen ? "scrolled" : "top"}
                variants={{
                    top: { backgroundColor: 'rgba(255, 255, 255, 0)', y: 0 },
                    scrolled: { backgroundColor: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', y: 0, boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-full z-50"
            >
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-brand-rose font-serif italic">Anna & Balázs</h1>
                    <nav className="hidden md:flex space-x-6 text-sm text-gray-700">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} onClick={(e) => handleLinkClick(e, link.href)} 
                               className="relative group">
                                {link.name}
                                <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-brand-rose transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"/>
                            </a>
                        ))}
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setMobileMenuOpen(true)} className="text-brand-text">
                            <Menu />
                        </button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-brand-background z-50 flex flex-col p-8"
                    >
                         <div className="flex justify-between items-center">
                            <h1 className="text-xl font-semibold text-brand-rose font-serif italic">Anna & Balázs</h1>
                            <button onClick={() => setMobileMenuOpen(false)}><X /></button>
                        </div>
                        <nav className="flex-grow flex items-center justify-center">
                            <ul className="text-center space-y-8">
                                {navLinks.map(link => (
                                    <li key={link.name}>
                                        <a href={link.href} onClick={(e) => handleLinkClick(e, link.href)} className="font-serif text-3xl text-brand-text">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// === ÚJ: Ajándék Foglaló Ablak ===
const ClaimGiftModal = ({ item, onClaim, onCancel }) => {
    const [name, setName] = useState('');
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center">
                <Gift className="mx-auto h-12 w-12 text-brand-rose" />
                <h2 className="mt-4 text-2xl font-serif text-gray-800">Ajándék lefoglalása</h2>
                <p className="mt-2 text-gray-600">Szeretnéd lefoglalni a következőt: <strong className="text-brand-text">{item.name}</strong>?</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="Neved (opcionális)"
                    className="w-full mt-4 border rounded px-4 py-2" />
                <div className="mt-6 flex justify-center gap-4">
                    <button onClick={onCancel} className="px-6 py-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300">Mégse</button>
                    <button onClick={() => onClaim(item.id, name)} className="px-6 py-2 rounded-full text-white bg-brand-rose hover:bg-opacity-80">Lefoglalom</button>
                </div>
            </motion.div>
        </motion.div>
    );
};

// === FELTURBÓZOTT: Ajándék Hozzáadó Ablak ===
const AddGiftModal = ({ onAdd, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const imageInputRef = useRef(null);

    const handleAddClick = () => {
        if (!name) {
            alert("Kérlek, add meg az ajándék nevét!");
            return;
        }
        setIsAdding(true);
        onAdd({ name, description, imageFile });
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
                className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center space-y-4">
                <Plus className="mx-auto h-12 w-12 text-brand-rose" />
                <h2 className="text-2xl font-serif text-gray-800">Új ajándékötlet</h2>
                
                <input type="file" ref={imageInputRef} onChange={(e) => setImageFile(e.target.files[0])} accept="image/*" className="hidden"/>
                <div onClick={() => imageInputRef.current.click()} className="mt-1 flex justify-center items-center w-full h-32 px-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50">
                    {imageFile ? <img src={URL.createObjectURL(imageFile)} className="h-full rounded-md object-contain p-2"/> : <div className="text-center"><UploadCloud className="mx-auto h-10 w-10 text-gray-400" /><p className="text-xs text-gray-500">Kép feltöltése (opcionális)</p></div>}
                </div>

                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ajándék neve (pl. Repülőjegy)" required className="w-full border rounded px-4 py-2 focus:ring-brand-rose focus:border-brand-rose" />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Rövid leírás (opcionális)" rows="2" className="w-full border rounded px-4 py-2 focus:ring-brand-rose focus:border-brand-rose"/>

                <div className="flex justify-center gap-4 pt-2">
                    <button onClick={onCancel} className="px-6 py-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300">Mégse</button>
                    <button onClick={handleAddClick} disabled={isAdding} className="px-6 py-2 rounded-full text-white bg-brand-rose hover:bg-opacity-80 flex items-center gap-2 disabled:opacity-70">
                        {isAdding && <SpinnerIcon />} Hozzáadás
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

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
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [messages, setMessages] = useState([]);
  const [countdown, setCountdown] = useState("");
  const [showAllMessages, setShowAllMessages] = useState(false);
  const displayedMessages = showAllMessages ? messages : messages.slice(0, 3);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [giftList, setGiftList] = useState([]);
  const [isLoadingGifts, setIsLoadingGifts] = useState(true);
  const [selectedGift, setSelectedGift] = useState(null);
  const [isAddGiftModalOpen, setAddGiftModalOpen] = useState(false);

  // Visszaszámláló logika
  useEffect(() => {
    const interval = setInterval(() => {
      const target = new Date("2026-06-10T15:00:00").getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('wedding_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) setMessages(data);
    };

    fetchMessages();
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

  const fetchGifts = async () => {
    const { data, error } = await supabase.from('ajandeklista').select('*').order('created_at');
    if (!error) setGiftList(data);
  };
  
  useEffect(() => { fetchGifts() }, []);

  const handleClaimGift = async (id, name) => {
    const { error } = await supabase
        .from('ajandeklista')
        .update({ is_claimed: true, claimed_by: name || 'Egy kedves vendég' })
        .eq('id', id);
    
    if (!error) {
        fetchGifts(); // Lista frissítése
        setSelectedGift(null); // Ablak bezárása
    } else {
        alert("Hiba történt a foglalás során.");
    }
  };

  // === ÚJ: Ajándék Hozzáadása Funkció ===
  const handleAddNewGift = async ({ name, description, imageFile }) => {
    try {
        let imageUrl = null;
        if (imageFile) {
            const fileName = `${Date.now()}_${imageFile.name}`;
            const { data, error: uploadError } = await supabase.storage
                .from('testimonials') // A meglévő, publikus tárolót használjuk
                .upload(`gifts/${fileName}`, imageFile);
            if (uploadError) throw uploadError;
            imageUrl = supabase.storage.from('testimonials').getPublicUrl(data.path).data.publicUrl;
        }

        const { error } = await supabase
            .from('ajandeklista')
            .insert([{ name, description, image_url: imageUrl }]);
        
        if (error) throw error;
        
        fetchGifts();
        setAddGiftModalOpen(false);
    } catch (error) {
        alert("Hiba történt a hozzáadás során.");
        console.error("Hozzáadási hiba:", error);
    }
  };

  return (
    <main className="min-h-screen bg-white text-gray-800 font-body">
      <WeddingHeader />

      <div className="pt-24" id="info">
        {/* Intro szekció - Látványosabb visszaszámlálóval */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center px-6 py-20 bg-gradient-to-b from-white to-rose-50"
        >
          <h2 className="text-5xl font-serif italic text-brand-rose mb-4">Anna & Balázs</h2>
          <p className="text-gray-600 text-lg mb-8">2026. Június 10. – Debrecen</p>
          
          <div className="flex justify-center gap-4 md:gap-8 mb-8">
            <div className="text-brand-text"><span className="text-4xl md:text-5xl font-serif">{countdown.days}</span><br/>Nap</div>
            <div className="text-brand-text"><span className="text-4xl md:text-5xl font-serif">{countdown.hours}</span><br/>Óra</div>
            <div className="text-brand-text"><span className="text-4xl md:text-5xl font-serif">{countdown.minutes}</span><br/>Perc</div>
            <div className="text-brand-text"><span className="text-4xl md:text-5xl font-serif">{countdown.seconds}</span><br/>Másodperc</div>
          </div>
          
          <Link href="#rsvp" className="btn-primary">RSVP küldése</Link>
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

        {/* Üzenetek Szekció - Felturbózva */}
            <div className="text-center">
                <h3 className="text-3xl font-semibold text-brand-rose mb-4">Jó Kívánságok</h3>
                <p className="text-gray-600 mb-8">Hagyjatok nekünk egy kedves üzenetet, amit az esküvő után is örömmel olvasunk majd vissza!</p>
            </div>
            
            {/* Üzenetek listája */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                {messages.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">Még nincs üzenet. Legyetek ti az elsők!</p>
                ) : (
                    displayedMessages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white border border-rose-100 rounded-lg p-5 shadow-sm"
                        >
                            <p className="font-semibold text-brand-rose">{msg.name}</p>
                            <p className="text-gray-700 mt-2 whitespace-pre-wrap">{msg.message}</p>
                            <p className="text-xs text-gray-400 mt-3 text-right">{new Date(msg.created_at).toLocaleString('hu-HU')}</p>
                        </motion.div>
                    ))
                )}
            </motion.div>

            {/* "Több üzenet" gomb */}
            {!showAllMessages && messages.length > 3 && (
                <div className="text-center mt-8">
                    <button onClick={() => setShowAllMessages(true)} className="text-brand-rose font-semibold hover:underline">
                        További üzenetek betöltése ({messages.length - 3} db)
                    </button>
                </div>
            )}

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

        {/* === FELTURBÓZOTT AJÁNDÉKLISTA === */}
        <motion.section
            id="ajandek"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="max-w-4xl mx-auto px-6 py-16"
          >
            <div className="text-center">
                <h3 className="text-3xl font-semibold text-brand-rose mb-4">Ajándékötletek</h3>
                <p className="text-gray-600 mb-10">Számunkra a legnagyobb ajándék, ha velünk ünnepeltek! Ha mégis szeretnétek meglepni minket valamivel, az alábbi listával szeretnénk segíteni nektek.</p>
            </div>
                <div className="space-y-4">
                    {giftList.map(item => (
                        <div key={item.id} className={`p-4 rounded-lg flex items-center gap-4 transition-all ${item.is_claimed ? 'bg-gray-100' : 'bg-rose-50'}`}>
                            {item.image_url && <img src={item.image_url} alt={item.name} className="w-16 h-16 rounded-md object-cover flex-shrink-0"/>}
                            <div className="flex-grow">
                                <p className={`font-semibold ${item.is_claimed ? 'text-gray-400 line-through' : 'text-brand-text'}`}>{item.name}</p>
                                {item.description && <p className={`text-sm ${item.is_claimed ? 'text-gray-400' : 'text-gray-500'}`}>{item.description}</p>}
                                {item.is_claimed && <p className="text-xs text-gray-500 mt-1">Lefoglalva ({item.claimed_by})</p>}
                            </div>
                            {!item.is_claimed && (
                                <button onClick={() => setSelectedGift(item)} className="w-10 h-10 flex-shrink-0 flex items-center justify-center border-2 border-brand-rose text-brand-rose rounded-full hover:bg-brand-rose/10 transition">
                                    <Check size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            <div className="text-center mt-8">
                <button onClick={() => setAddGiftModalOpen(true)} className="btn-primary text-sm">
                    + Új ajándékötlet hozzáadása
                </button>
            </div>
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

        {/* === ÚJ: VIDEÓ SZEKCIÓ === */}
        <motion.section
            id="video"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="py-20 bg-gradient-to-b from-rose-50 to-white"
          >
              <div className="max-w-4xl mx-auto px-6 text-center">
                  <h3 className="text-3xl font-semibold text-brand-rose mb-4">A Mi Történetünk</h3>
                  <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                      Egy rövid film a közös pillanatainkról, amit szeretettel készítettünk Nektek.
                  </p>
                  <motion.div 
                    whileHover={{ scale: 1.05 }} 
                    className="relative w-full max-w-2xl mx-auto aspect-video rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
                    onClick={() => setIsVideoOpen(true)}
                  >
                      <Image src="/images/wedding3.jpg" alt="Videó borítókép" layout="fill" objectFit="cover" className="group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                          <div className="w-20 h-20 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <Play className="w-10 h-10 text-white drop-shadow-lg ml-1" />
                          </div>
                      </div>
                  </motion.div>
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

        {/* === ÚJ: VIDEÓ LIGHTBOX === */}
        <Lightbox
            open={isVideoOpen}
            close={() => setIsVideoOpen(false)}
            plugins={[Video]}
            slides={[
                {
                type: "video",
                sources: [
                    { src: "/videos/video.mp4", type: "video/mp4" },
                ],
                width: 1280,
                height: 720,
                poster: "/images/wedding3.jpg", // opcionális borítókép
                },
            ]}
            />


        {/* Footer */}
        <footer className="bg-rose-100 text-center py-12 mt-20 text-brand-rose">
          <p className="text-xl font-serif italic">Köszönjük, hogy velünk ünnepelsz!</p>
          <p className="text-sm mt-2">Anna & Balázs esküvője – 2025</p>
        </footer>
      </div>
      <AnimatePresence>
        {selectedGift && <ClaimGiftModal item={selectedGift} onClaim={handleClaimGift} onCancel={() => setSelectedGift(null)} />}
        {isAddGiftModalOpen && <AddGiftModal onAdd={handleAddNewGift} onCancel={() => setAddGiftModalOpen(false)} />}
      </AnimatePresence>
    </main>
  );
}
