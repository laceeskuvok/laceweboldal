'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, UploadCloud, Check } from 'lucide-react';
import Header from '../../components/Header';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SpinnerIcon = () => ( <motion.svg className="w-5 h-5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></motion.svg> );
const SuccessIcon = () => ( <motion.svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}><path stroke="none" d="M0 0h24v24H0z" fill="none" /><circle cx="12" cy="12" r="9" /><path d="M9 12l2 2l4 -4" /></motion.svg> );

const StarRating = ({ rating, setRating }) => (
    <div className="flex items-center gap-2">
        {[...Array(5)].map((_, i) => (
            <motion.div key={i+1} whileHover={{ scale: 1.2, y: -5 }} whileTap={{ scale: 0.9 }} onClick={() => setRating(i+1)}>
                <Star className={`w-8 h-8 cursor-pointer transition-colors ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}/>
            </motion.div>
        ))}
    </div>
);

export default function ReviewPage() {
    const [formData, setFormData] = useState({ name: '', email: '', collection: 'Egyedi felkérés' });
    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [status, setStatus] = useState('idle');
    const profileInputRef = useRef(null);
    
    // Fájlfeltöltés Supabase-be
    const handleFileUpload = async (file) => {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from('testimonials')
            .upload(`profiles/${fileName}`, file);

        if (error) return null;
        return supabase.storage.from('testimonials').getPublicUrl(data.path).data.publicUrl;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            let profileImageUrl = null;
            if (profileImage) {
                profileImageUrl = await handleFileUpload(profileImage);
            }

            const { error } = await supabase.from('velemenyek').insert([{ 
                name: formData.name,
                email: formData.email,
                collection: formData.collection,
                rating: rating,
                review_text: reviewText,
                profile_image_url: profileImageUrl,
                status: 'fuggoben', // Fontos: alapértelmezetten jóváhagyásra vár
            }]);

            if (error) throw error;
            setStatus('success');

        } catch (error) {
            console.error('Hiba:', error);
            setStatus('error');
        }
    };

    return (
        <>
            <Header />
            <main className="bg-brand-background min-h-screen py-24 px-4 flex items-center justify-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
                    className="max-w-2xl w-full bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-[#E8DCC4]">
                    {status === 'success' ? (
                        <div className="text-center py-10 flex flex-col items-center">
                            <SuccessIcon />
                            <h2 className="text-3xl font-serif mt-4 text-brand-text">Köszönjük a véleményed!</h2>
                            <p className="mt-2 text-gray-600">Nagyra értékeljük, hogy időt szántál a visszajelzésre. Hamarosan megjelenik az oldalon!</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="text-center mb-8">
                                <h1 className="font-serif text-4xl text-brand-text mb-2">Hogy tetszett a végeredmény?</h1>
                                <p className="text-gray-500">Oszd meg tapasztalataidat más párokkal is.</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" placeholder="Neved" required onChange={e => setFormData({...formData, name: e.target.value})} className="input-field"/>
                                <input type="email" placeholder="E-mail címed" required onChange={e => setFormData({...formData, email: e.target.value})} className="input-field"/>
                            </div>
                            
                            <input type="text" placeholder="Melyik kollekció volt? (pl. The Layered)" onChange={e => setFormData({...formData, collection: e.target.value})} className="input-field"/>

                            <div className="flex flex-col items-center py-4 bg-gray-50 rounded-lg">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hány csillagot adnál?</label>
                                <StarRating rating={rating} setRating={setRating} />
                            </div>

                            <textarea placeholder="Írd le a véleményed..." rows="5" required onChange={e => setReviewText(e.target.value)} className="input-field"></textarea>

                            {/* Csak Profilkép feltöltés */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Profilkép (opcionális)</label>
                                <input type="file" ref={profileInputRef} onChange={(e) => setProfileImage(e.target.files[0])} accept="image/*" className="hidden"/>
                                <div onClick={() => profileInputRef.current.click()} className="flex justify-center items-center h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition">
                                    {profileImage ? (
                                        <div className="flex items-center gap-3">
                                            <img src={URL.createObjectURL(profileImage)} className="h-16 w-16 rounded-full object-cover"/>
                                            <span className="text-sm text-green-600 font-medium">Kép kiválasztva</span>
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-400">
                                            <UploadCloud className="mx-auto h-8 w-8 mb-1" />
                                            <span className="text-xs">Kattints a feltöltéshez</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button type="submit" disabled={status === 'sending'} className="w-full btn-primary py-3 flex justify-center items-center gap-2">
                                {status === 'sending' ? <SpinnerIcon /> : null}
                                {status === 'sending' ? 'Küldés...' : 'Vélemény beküldése'}
                            </button>
                        </form>
                    )}
                </motion.div>
            </main>
        </>
    );
}