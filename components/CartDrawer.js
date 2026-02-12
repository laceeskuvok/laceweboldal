'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { Trash2, X, Check } from 'lucide-react'; // Javítva: Check importálása innen
import emailjs from '@emailjs/browser';
import { createClient } from '@supabase/supabase-js'; // Supabase import
import { useToast } from '../context/ToastContext';

// Supabase kliens
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const CartDrawer = () => {
    const { isCartOpen, setIsCartOpen, cartItems, removeFromCart, clearCart } = useCart();
    const { showToast } = useToast();
    const [step, setStep] = useState('cart'); // 'cart' | 'checkout' | 'success'
    const [isSending, setIsSending] = useState(false);
    
    // Űrlap állapot
    const [formData, setFormData] = useState({
        billingName: '', zip: '', city: '', address: '', email: '', phone: '',
        shippingSame: false,
        shippingName: '', shippingZip: '', shippingCity: '', shippingAddress: '', note: ''
    });

    const handleOrderSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);

        // 1. Rendelés összesítése szövegesen
        const orderSummary = cartItems.map(item => {
            const qtyDetails = item.packageType === 'Teljes kollekció' 
                ? `(Meghívó: ${item.quantities.invite}, Menü: ${item.quantities.menu}, Ültető: ${item.quantities.place})`
                : `(${item.quantities.invite} db)`;
            return `- ${item.productName} [${item.packageType}] - Szín: ${item.color} ${qtyDetails}`;
        }).join('\n');

        try {
            // 2. MENTÉS ADATBÁZISBA (Itt generálódik az L26-1001 ID)
            const { data: orderData, error: dbError } = await supabase
                .from('orders')
                .insert([
                    {
                        customer_name: formData.billingName,
                        customer_email: formData.email,
                        billing_details: {
                            zip: formData.zip,
                            city: formData.city,
                            address: formData.address,
                            phone: formData.phone
                        },
                        shipping_details: formData.shippingSame ? 'Same as billing' : {
                            name: formData.shippingName,
                            zip: formData.shippingZip,
                            city: formData.shippingCity,
                            address: formData.shippingAddress
                        },
                        order_items: cartItems, // A teljes kosár tartalom JSON-ként
                        total_items_summary: orderSummary,
                        note: formData.note
                    }
                ])
                .select()
                .single();

            if (dbError) throw new Error('Adatbázis hiba: ' + dbError.message);

            // Megkaptuk a valódi ID-t a Supabase-től!
            const realOrderId = orderData.order_id; 

            // 3. EMAIL KÜLDÉS (A generált ID-val)
            const templateParams = {
                order_number: realOrderId, // L26-1001
                customer_name: formData.billingName,
                customer_email: formData.email,
                order_summary: orderSummary,
                billing_details: `${formData.billingName}, ${formData.zip} ${formData.city}, ${formData.address}, Tel: ${formData.phone}`,
                shipping_details: formData.shippingSame 
                    ? "Megegyezik a számlázásival" 
                    : `${formData.shippingName}, ${formData.shippingZip} ${formData.shippingCity}, ${formData.shippingAddress}`,
                note: formData.note || "Nincs megjegyzés"
            };

            const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
            const serviceID = 'service_o12cdtu';
            
            await Promise.all([
                emailjs.send(serviceID, 'template_up0zvgm', templateParams, publicKey),
                emailjs.send(serviceID, 'template_11w8l4y', templateParams, publicKey)
            ]);
            
            setStep('success');
            clearCart();
        } catch (error) {
            console.error("Rendelési hiba:", error);
            showToast("Hiba történt a rendelés leadásakor. Kérlek próbáld újra!", "error");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Háttér sötétítés */}
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/20 z-50 backdrop-blur-sm"
                    />
                    
                    {/* Oldalsáv */}
                    <motion.div 
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#FDFCF8] shadow-2xl z-50 overflow-y-auto border-l border-[#E8DCC4]"
                    >
                        <div className="p-6 min-h-full flex flex-col">
                            {/* Fejléc */}
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#E8DCC4]">
                                <h2 className="font-serif text-2xl text-[#5C5454]">
                                    {step === 'cart' ? 'Rendeléseim' : step === 'checkout' ? 'Adatok megadása' : 'Sikeres rendelés'}
                                </h2>
                                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* TARTALOM */}
                            {step === 'cart' && (
                                <>
                                    {cartItems.length === 0 ? (
                                        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                                            <p className="font-serif italic text-xl">A kosarad üres.</p>
                                        </div>
                                    ) : (
                                        <div className="flex-1 space-y-6">
                                            {cartItems.map((item) => (
                                                <div key={item.internalId} className="bg-white p-4 rounded-lg border border-[#E8DCC4] relative group">
                                                    <button 
                                                        onClick={() => removeFromCart(item.internalId)}
                                                        className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                    <h3 className="font-serif text-xl text-[#5C5454]">{item.productName}</h3>
                                                    <p className="text-sm text-[#B76E79] font-medium mb-2">{item.packageType}</p>
                                                    <p className="text-sm text-gray-600">Szín: {item.color}</p>
                                                    
                                                    <div className="mt-3 bg-gray-50 p-3 rounded text-sm text-gray-600">
                                                        {item.packageType === 'Csak meghívó' ? (
                                                            <p>Meghívó: <strong>{item.quantities.invite} db</strong></p>
                                                        ) : (
                                                            <div className="grid grid-cols-3 gap-2">
                                                                <p>Meghívó: <strong>{item.quantities.invite}</strong></p>
                                                                <p>Menü: <strong>{item.quantities.menu}</strong></p>
                                                                <p>Ültető: <strong>{item.quantities.place}</strong></p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    
                                    {cartItems.length > 0 && (
                                        <div className="mt-8 pt-6 border-t border-[#E8DCC4]">
                                            <button 
                                                onClick={() => setStep('checkout')}
                                                className="btn-primary w-full py-4 text-lg"
                                            >
                                                Tovább az adatokhoz
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}

                            {step === 'checkout' && (
                                <form onSubmit={handleOrderSubmit} className="flex-1 flex flex-col gap-6">
                                    {/* Számlázási Adatok */}
                                    <div className="space-y-4">
                                        <h3 className="font-serif text-lg text-[#B76E79] border-b border-[#E8DCC4] pb-1">Számlázási és Kapcsolattartási adatok</h3>
                                        <p className="text-xs text-gray-500">Ez szükséges a díjbekérő kiállításához.</p>
                                        
                                        <input required placeholder="Számlázási név" className="input-field" value={formData.billingName} onChange={e => setFormData({...formData, billingName: e.target.value})} />
                                        <div className="flex gap-4">
                                            <input required placeholder="Irsz." className="input-field w-24" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                                            <input required placeholder="Város" className="input-field flex-1" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                                        </div>
                                        <input required placeholder="Utca, házszám" className="input-field" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                                        <input required type="email" placeholder="E-mail cím" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        <input required type="tel" placeholder="Telefonszám" className="input-field" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                    </div>

                                    {/* Szállítási Adatok */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between border-b border-[#E8DCC4] pb-1">
                                             <h3 className="font-serif text-lg text-[#B76E79]">Szállítási adatok</h3>
                                        </div>
                                        
                                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                            <input type="checkbox" checked={formData.shippingSame} onChange={e => setFormData({...formData, shippingSame: e.target.checked})} className="rounded text-[#B76E79] focus:ring-[#B76E79]" />
                                            Megegyezik a számlázási adatokkal
                                        </label>

                                        {!formData.shippingSame && (
                                            <div className="space-y-4 pt-2">
                                                <input required placeholder="Szállítási név" className="input-field" value={formData.shippingName} onChange={e => setFormData({...formData, shippingName: e.target.value})} />
                                                <div className="flex gap-4">
                                                    <input required placeholder="Irsz." className="input-field w-24" value={formData.shippingZip} onChange={e => setFormData({...formData, shippingZip: e.target.value})} />
                                                    <input required placeholder="Város" className="input-field flex-1" value={formData.shippingCity} onChange={e => setFormData({...formData, shippingCity: e.target.value})} />
                                                </div>
                                                <input required placeholder="Utca, házszám" className="input-field" value={formData.shippingAddress} onChange={e => setFormData({...formData, shippingAddress: e.target.value})} />
                                            </div>
                                        )}
                                        
                                        <textarea placeholder="Megjegyzés a futárnak (pl. kapucsengő)..." rows="2" className="input-field" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})}></textarea>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-[#E8DCC4] flex gap-4">
                                        <button type="button" onClick={() => setStep('cart')} className="px-4 py-3 text-gray-500 hover:text-gray-800">Vissza</button>
                                        <button type="submit" disabled={isSending} className="btn-primary flex-1 py-3 text-lg disabled:opacity-70">
                                            {isSending ? 'Feldolgozás...' : 'Rendelés leadása'}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 'success' && (
                                <div className="flex-1 flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                        <Check className="w-10 h-10" />
                                    </div>
                                    <h3 className="font-serif text-3xl text-[#5C5454] mb-4">Köszönöm a rendelésed!</h3>
                                    <p className="text-gray-600 mb-8 max-w-xs">
                                        A visszaigazoló e-mailt hamarosan megkapod. A rendelésedet rögzítettük.
                                    </p>
                                    <button onClick={() => setIsCartOpen(false)} className="btn-primary px-8 py-3">Rendben</button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;