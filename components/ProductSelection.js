'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCart } from '../context/CartContext';
import { X, ChevronLeft, ChevronRight, ZoomIn, Check, Maximize2, Info } from 'lucide-react';
import { useToast } from '../context/ToastContext';

// === TERMÉK ADATOK (FRISSÍTVE AZ ÚJ SZÖVEGEKKEL ÉS MÉRETEKKEL) ===
const products = [
    {
        id: 'layered',
        title: 'The Layered',
        coverImage: '/images/kalacs.jpeg',
        description: '',
        details: {
            images: [
                { src: '/images/kalacs2.jpeg', label: 'Meghívó' },
                { src: '/images/kalacs3.jpeg', label: 'Menükártya' },
                { src: '/images/kalacs4.jpeg', label: 'Ültetőkártya' }
            ],
            description: "A The Layered meghívócsaládot azoknak a pároknak terveztem, akik szeretik a rendszerezettséget. Ez a kollekció három, egymásra épülő lapból áll, egy szegeccsel vagy szalaggal összefogva.",
            features: [
                { label: 'Rétegek száma', value: '3 lap, harmonikus egységben.' },
                { label: 'Interaktivitás', value: 'Egyedi QR-kód generálása a visszajelzésekhez (RSVP).' },
                { label: 'Papír', value: 'Prémium minőségű dekorpapír.' }
            ],
            sizes: {
                invite: 'Kb. 105 × 148 mm (A6)',
                menu: '148,5 × 210 mm (A5 - Félbehajtott, megáll az asztalon)',
                place: '90 × 50 mm (Sátorkártya fazon)'
            }
        }
    },
    {
        id: 'folded',
        title: 'The Folded',
        coverImage: '/images/kecske.jpeg',
        description: '',
        details: {
            images: [
                { src: '/images/kecske2.jpeg', label: 'Meghívó' },
                { src: '/images/kecske3.jpeg', label: 'Menükártya' },
                { src: '/images/kecske4.jpeg', label: 'Ültetőkártya' }
            ],
            description: "Egyszerű, mégis nagyszerű választás. Letisztult forma, amely minden lényeges információt elegánsan magában foglal, egyetlen finom ívre komponálva.",
            features: [
                { label: 'Kialakítás', value: 'Egyetlen, középen hajtott ív, rétegek nélkül.' },
                { label: 'Interaktivitás', value: 'Egyedi QR-kód generálása a visszajelzésekhez (RSVP).' },
                { label: 'Papír', value: 'Prémium minőségű dekorpapír.' }
            ],
            sizes: {
                invite: 'Összehajtva 105 × 148 mm (A6)',
                menu: '148,5 × 210 mm (A5 - Félbehajtott, megáll az asztalon)',
                place: '90 × 50 mm (Sátorkártya fazon)'
            }
        }
    }
];

const ProductSelection = () => {
    const { addToCart } = useCart();
    const { showToast } = useToast();
    
    // Állapotok
    const [selectedProduct, setSelectedProduct] = useState(null); 
    const [packageType, setPackageType] = useState('full'); 
    
    // Galéria állapotok
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Űrlap adatok
    const [formData, setFormData] = useState({
        color: '',
        inviteQty: '',
        menuQty: '',
        placeQty: ''
    });

    const handleProductSelect = (product) => {
        setSelectedProduct(product);
        setActiveImageIndex(0); // Reset gallery
        setPackageType('full');
        setFormData({ color: '', inviteQty: '', menuQty: '', placeQty: '' });
        
        setTimeout(() => {
            const element = document.getElementById('product-details-panel');
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleAddToCart = () => {
        if (!selectedProduct) return;

        // Validáció modern alerttel
        if (!formData.color) {
            showToast('Kérlek add meg a választott színvilágot!', 'error'); 
            return;
        }
        if (packageType === 'invite' && (!formData.inviteQty || formData.inviteQty < 15)) {
            showToast('A minimum rendelési mennyiség 15 db!', 'error'); 
            return;
        }
        if (packageType === 'full' && (!formData.inviteQty || !formData.menuQty || !formData.placeQty)) {
             showToast('Kérlek töltsd ki az összes mennyiséget!', 'error'); 
             return;
        }
        const item = {
            productName: selectedProduct.title,
            packageType: packageType === 'full' ? 'Teljes kollekció' : 'Csak meghívó',
            color: formData.color,
            quantities: packageType === 'full' ? {
                invite: formData.inviteQty,
                menu: formData.menuQty,
                place: formData.placeQty
            } : {
                invite: formData.inviteQty
            },
            totalPrice: 0 
        };

        addToCart(item);
        showToast(`${selectedProduct.title} sikeresen a kosárba került!`, 'success'); 
        setSelectedProduct(null); 
    };

    // --- NAVIGÁCIÓS LOGIKA ---
    const nextImage = (e) => {
        if(e) e.stopPropagation();
        if (selectedProduct) {
            setActiveImageIndex((prev) => (prev + 1) % selectedProduct.details.images.length);
        }
    };
    const prevImage = (e) => {
        if(e) e.stopPropagation();
        if (selectedProduct) {
            setActiveImageIndex((prev) => (prev - 1 + selectedProduct.details.images.length) % selectedProduct.details.images.length);
        }
    };

    return (
        <section className="py-20 bg-[#FDFCF8]">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="font-serif text-4xl text-center text-[#5C5454] italic mb-12">Válassz kollekciót</h2>
                
                {/* --- TERMÉK KÁRTYÁK --- */}
                <div className="grid md:grid-cols-2 gap-12">
                    {products.map((product) => (
                        <motion.div 
                            key={product.id}
                            className={`bg-white p-6 rounded-xl shadow-sm transition-all cursor-pointer border ${selectedProduct?.id === product.id ? 'border-[#B76E79] ring-1 ring-[#B76E79]' : 'border-[#E8DCC4] hover:shadow-md'}`}
                            whileHover={{ y: -5 }}
                            onClick={() => handleProductSelect(product)}
                        >
                            <div className="relative aspect-[4/3] mb-6 overflow-hidden rounded-lg">
                                <Image src={product.coverImage} alt={product.title} fill className="object-cover" />
                            </div>
                            <h3 className="font-serif text-3xl text-[#5C5454] mb-2">{product.title}</h3>
                            <p className="text-gray-500 font-light">{product.description}</p>
                            <button className="mt-4 text-[#B76E79] font-medium text-sm uppercase tracking-wide border-b border-[#B76E79] pb-0.5">
                                Kiválasztom
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* --- RÉSZLETEZŐ PANEL --- */}
                <AnimatePresence>
                    {selectedProduct && (
                        <motion.div 
                            id="product-details-panel"
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: 'auto', marginTop: 48 }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            className="overflow-hidden bg-white rounded-2xl shadow-xl border border-[#E8DCC4] max-w-6xl mx-auto"
                        >
                            <div className="flex flex-col lg:flex-row">
                                
                                {/* BAL OLDAL: GALÉRIA ÉS LEÍRÁS */}
                                <div className="lg:w-1/2 p-6 lg:p-10 bg-[#faf9f6] border-r border-[#E8DCC4]">
                                    
                                    {/* Nagy Kép Konténer */}
                                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-sm mb-6 group bg-white">
                                        <AnimatePresence mode='wait'>
                                            <motion.div
                                                key={activeImageIndex}
                                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                                transition={{ duration: 0.5 }} className="absolute inset-0"
                                            >
                                                <Image src={selectedProduct.details.images[activeImageIndex].src} alt={selectedProduct.title} fill className="object-cover" />
                                            </motion.div>
                                        </AnimatePresence>

                                        <div onClick={() => setIsLightboxOpen(true)} className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors cursor-zoom-in flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 bg-white/90 p-3 rounded-full shadow-lg">
                                                <Maximize2 className="w-6 h-6 text-[#5C5454]" />
                                            </div>
                                        </div>

                                        <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-[#5C5454] transition-all opacity-0 group-hover:opacity-100 z-10"><ChevronLeft className="w-5 h-5" /></button>
                                        <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md text-[#5C5454] transition-all opacity-0 group-hover:opacity-100 z-10"><ChevronRight className="w-5 h-5" /></button>
                                    </div>

                                    {/* Kis képek (Thumbnails) */}
                                    <div className="grid grid-cols-3 gap-4 mb-10">
                                        {selectedProduct.details.images.map((img, idx) => (
                                            <div key={idx} className={`relative aspect-square rounded-md overflow-hidden cursor-pointer transition-all duration-300 ${activeImageIndex === idx ? 'ring-2 ring-[#B76E79] ring-offset-2 opacity-100' : 'opacity-60 hover:opacity-100'}`} onMouseEnter={() => setActiveImageIndex(idx)} onClick={() => setActiveImageIndex(idx)}>
                                                <Image src={img.src} alt={img.label} fill className="object-cover" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Leírás, Jellemzők és Méretek */}
                                    <div className="space-y-8">
                                        <div>
                                            <h4 className="font-serif text-2xl text-[#5C5454] mb-4 border-b border-[#E8DCC4] pb-2 inline-block">A kollekcióról</h4>
                                            <p className="text-gray-600 font-light leading-relaxed text-justify mb-4">
                                                {selectedProduct.details.description}
                                            </p>
                                            <ul className="space-y-2 mt-4">
                                                {selectedProduct.details.features.map((feature, idx) => (
                                                    <li key={idx} className="text-sm text-gray-600 font-light">
                                                        <span className="font-medium text-[#5C5454]">{feature.label}:</span> {feature.value}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div>
                                            <h4 className="font-serif text-2xl text-[#5C5454] mb-4 border-b border-[#E8DCC4] pb-2 inline-block">Méretek</h4>
                                            <div className="space-y-0 bg-white border border-[#E8DCC4] rounded-lg overflow-hidden">
                                                <div className="flex justify-between items-center p-4 border-b border-[#E8DCC4] bg-[#FDFCF8]">
                                                    <span className="font-serif text-lg text-[#B76E79] font-medium">Meghívó</span>
                                                    <span className="text-gray-600 text-xs md:text-sm font-light text-right">{selectedProduct.details.sizes.invite}</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 border-b border-[#E8DCC4]">
                                                    <span className="font-serif text-lg text-[#B76E79] font-medium">Menükártya</span>
                                                    <span className="text-gray-600 text-xs md:text-sm font-light text-right max-w-[60%]">{selectedProduct.details.sizes.menu}</span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-[#FDFCF8]">
                                                    <span className="font-serif text-lg text-[#B76E79] font-medium">Ültetőkártya</span>
                                                    <span className="text-gray-600 text-xs md:text-sm font-light text-right">{selectedProduct.details.sizes.place}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* JOBB OLDAL: KONFIGURÁTOR */}
                                <div className="lg:w-1/2 p-6 lg:p-12 relative bg-white">
                                    <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-gray-400 hover:text-[#B76E79] transition-colors z-10">
                                        <X className="w-8 h-8" />
                                    </button>

                                    <h3 className="font-serif text-4xl text-[#5C5454] mb-2">{selectedProduct.title}</h3>
                                    <p className="text-[#B76E79] font-serif italic text-lg mb-8">Konfiguráld egyedi rendelésed</p>
                                    
                                    {/* 1. Csomag típus választás */}
                                    <div className="mb-8">
                                        <label className="block text-sm font-medium text-gray-500 mb-4 uppercase tracking-widest">Válassz csomagot</label>
                                        <div className="flex flex-col gap-4">
                                            <button 
                                                onClick={() => setPackageType('full')}
                                                className={`group flex items-center p-5 border rounded-xl text-left transition-all duration-300 relative overflow-hidden ${packageType === 'full' ? 'border-[#B76E79] shadow-md' : 'border-gray-200 hover:border-[#B76E79]/50'}`}
                                            >
                                                <div className={`absolute inset-0 bg-[#B76E79]/5 transition-opacity duration-300 ${packageType === 'full' ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                                                <div className="relative z-10 flex-1">
                                                    <span className={`block font-serif text-xl ${packageType === 'full' ? 'text-[#B76E79]' : 'text-[#5C5454]'}`}>Teljes kollekció</span>
                                                    <span className="text-sm text-gray-500 mt-1 block font-light">Tartalma: Meghívó, menükártya, ültetőkártya</span>
                                                </div>
                                                {packageType === 'full' && <div className="relative z-10 text-[#B76E79] bg-white rounded-full p-1 shadow-sm"><Check className="w-5 h-5"/></div>}
                                            </button>

                                            <button 
                                                onClick={() => setPackageType('invite')}
                                                className={`group flex items-center p-5 border rounded-xl text-left transition-all duration-300 relative overflow-hidden ${packageType === 'invite' ? 'border-[#B76E79] shadow-md' : 'border-gray-200 hover:border-[#B76E79]/50'}`}
                                            >
                                                <div className={`absolute inset-0 bg-[#B76E79]/5 transition-opacity duration-300 ${packageType === 'invite' ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                                                <div className="relative z-10 flex-1">
                                                    <span className={`block font-serif text-xl ${packageType === 'invite' ? 'text-[#B76E79]' : 'text-[#5C5454]'}`}>Csak meghívó</span>
                                                    <span className="text-sm text-gray-500 mt-1 block font-light">Kizárólag az esküvői meghívó kártya</span>
                                                </div>
                                                {packageType === 'invite' && <div className="relative z-10 text-[#B76E79] bg-white rounded-full p-1 shadow-sm"><Check className="w-5 h-5"/></div>}
                                            </button>
                                        </div>
                                    </div>

                                    {/* --- FONTOS TUDNIVALÓ (Csak ha teljes kollekció van kiválasztva) --- */}
                                    <AnimatePresence>
                                        {packageType === 'full' && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="mb-8 overflow-hidden"
                                            >
                                                <div className="bg-[#B76E79]/5 border border-[#B76E79]/20 p-4 rounded-xl flex gap-3">
                                                    <Info className="w-6 h-6 text-[#B76E79] flex-shrink-0 mt-0.5" />
                                                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                                                        <strong className="font-medium text-[#5C5454]">Fontos tudnivaló: </strong>
                                                        A Lace kollekciók tervezésekor tudom, hogy a menü és az ültetési rend az utolsó pillanatig változhat. Ha a teljes kollekciót választod, a meghívókat azonnal elkészítem, a <span className="font-medium">menükártyák és ültetők szövegezésére pedig ráérünk 8 héttel az esküvő előtt is visszatérni!</span>
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* 2. Adatok megadása */}
                                    <div className="space-y-8">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-widest">Színvilág</label>
                                            <input 
                                                type="text" 
                                                className="input-field py-4 text-lg" 
                                                placeholder="Pl. pasztell rózsaszín, olívazöld..."
                                                value={formData.color}
                                                onChange={(e) => setFormData({...formData, color: e.target.value})}
                                            />
                                        </div>

                                        {packageType === 'invite' ? (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-2 uppercase tracking-widest">Mennyiség (db) <span className="text-[#B76E79] normal-case tracking-normal text-xs ml-2">(Min. 15 db)</span></label>
                                                <input 
                                                    type="number" 
                                                    min="15"
                                                    className="input-field w-full md:w-1/2 py-4 text-lg" 
                                                    value={formData.inviteQty}
                                                    onChange={(e) => setFormData({...formData, inviteQty: e.target.value})}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-500 mb-4 uppercase tracking-widest">Rendelt mennyiségek</label>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                    <div>
                                                        <label className="text-xs text-[#B76E79] mb-1 block font-serif italic">Meghívó</label>
                                                        <input 
                                                            type="number" 
                                                            className="input-field text-center" 
                                                            value={formData.inviteQty}
                                                            onChange={(e) => setFormData({...formData, inviteQty: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-[#B76E79] mb-1 block font-serif italic">Menükártya</label>
                                                        <input 
                                                            type="number" 
                                                            className="input-field text-center" 
                                                            value={formData.menuQty}
                                                            onChange={(e) => setFormData({...formData, menuQty: e.target.value})}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-[#B76E79] mb-1 block font-serif italic">Ültetőkártya</label>
                                                        <input 
                                                            type="number" 
                                                            className="input-field text-center" 
                                                            value={formData.placeQty}
                                                            onChange={(e) => setFormData({...formData, placeQty: e.target.value})}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-12 pt-8 border-t border-gray-100">
                                        <button 
                                            onClick={handleAddToCart}
                                            className="btn-primary w-full py-4 text-xl font-serif tracking-wide shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                                        >
                                            Hozzáadás a rendeléshez
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* --- FULLSCREEN LIGHTBOX --- */}
                <AnimatePresence>
                    {isLightboxOpen && selectedProduct && (
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] bg-[#faf9f6]/95 flex items-center justify-center backdrop-blur-md"
                            onClick={() => setIsLightboxOpen(false)}
                        >
                            <button className="absolute top-6 right-6 text-[#5C5454] hover:text-[#B76E79] transition-colors p-2 z-50">
                                <X className="w-10 h-10" />
                            </button>
                            <button onClick={prevImage} className="absolute left-4 md:left-10 text-[#5C5454] hover:text-[#B76E79] hover:scale-110 transition-all p-4 z-50 bg-white/50 rounded-full shadow-sm"><ChevronLeft className="w-10 h-10" /></button>
                            <div className="relative w-full h-full max-w-6xl max-h-[85vh] p-4 flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                <motion.div
                                    key={activeImageIndex}
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }} className="relative w-full h-full"
                                >
                                    <Image src={selectedProduct.details.images[activeImageIndex].src} alt="Nagyított kép" fill className="object-contain drop-shadow-2xl" />
                                </motion.div>
                                <div className="absolute bottom-4 left-0 right-0 text-center">
                                    <span className="bg-white/90 px-6 py-2 rounded-full text-[#5C5454] text-xl font-serif italic shadow-md border border-[#E8DCC4]">
                                        {selectedProduct.details.images[activeImageIndex].label}
                                    </span>
                                </div>
                            </div>
                            <button onClick={nextImage} className="absolute right-4 md:right-10 text-[#5C5454] hover:text-[#B76E79] hover:scale-110 transition-all p-4 z-50 bg-white/50 rounded-full shadow-sm"><ChevronRight className="w-10 h-10" /></button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default ProductSelection;