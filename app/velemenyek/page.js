'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star } from 'lucide-react';
import Header from '../../components/Header';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('velemenyek')
                .select('*')
                .eq('status', 'jovahagyva') // Csak ami jóvá van hagyva!
                .order('created_at', { ascending: false });

            if (error) console.error('Hiba:', error);
            else setReviews(data);
            
            setIsLoading(false);
        };
        fetchReviews();
    }, []);

    return (
        <>
            <Header />
            <main className="bg-[#FDFCF8] min-h-screen py-24 px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <h1 className="font-serif text-5xl md:text-6xl italic text-[#5C5454]">Ügyféltörténetek</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-light">
                        Büszkeséggel tölt el minden egyes elkészült meghívó. Íme néhány gondolat azoktól, akik már a kezembe adták bizalmukat.
                    </p>
                </motion.div>

                <div className="max-w-7xl mx-auto">
                    {isLoading ? <p className="text-center text-[#B76E79]">Betöltés...</p> :
                     reviews.length === 0 ? <p className="text-center text-gray-500">Még nincsenek feltöltött vélemények.</p> :
                    (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.map((review, i) => (
                                 <motion.div 
                                    key={review.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8DCC4] flex flex-col h-full relative"
                                 >
                                    {/* Idézőjel díszítés */}
                                    <div className="absolute top-6 right-8 text-6xl font-serif text-[#E8DCC4]/40 font-bold leading-none">"</div>

                                    <div className="flex items-center gap-4 mb-6">
                                        {review.profile_image_url ? (
                                            <img src={review.profile_image_url} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"/>
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-[#B76E79] text-white flex items-center justify-center text-xl font-bold">
                                                {review.name.charAt(0)}
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-bold text-[#5C5454] text-lg">{review.name}</h3>
                                            <div className="flex text-yellow-400 text-sm">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="stroke-none"/>)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-grow">
                                        <p className="text-gray-600 italic leading-relaxed text-sm">
                                            {review.review_text}
                                        </p>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">
                                        <p className="text-xs text-[#B76E79] font-bold uppercase tracking-widest">
                                            {review.collection || "Egyedi tervezés"}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}   
                </div>
            </main>
        </>
    );
}