'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star, Layers, PlusCircle, Camera } from 'lucide-react';
import Header from '../../components/Header';
import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // === ADATOK BETÖLTÉSE SUPABASE-BŐL ===
    useEffect(() => {
        const fetchReviews = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('velemenyek')
                .select('*')
                .eq('status', 'jovahagyva') 
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Hiba a vélemények betöltésekor:', error);
            } else {
                setReviews(data);
            }
            setIsLoading(false);
        };
        fetchReviews();
    }, []);

    return (
        <>
            <Header />
            <main className="bg-brand-background py-24 px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
                    <h1 className="font-serif text-5xl md:text-7xl italic text-brand-text">Ügyféltörténetek</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body">Büszkék vagyunk rá, hogy ennyi csodálatos pár nagy napjának lehettünk részesei. Olvassátok el a történeteiket!</p>
                </motion.div>

                <div className="max-w-6xl mx-auto mt-16">
                    {isLoading ? <p className="text-center text-gray-500">Vélemények betöltése...</p> :
                     reviews.length === 0 ? <p className="text-center text-gray-500">Jelenleg nincsenek megjeleníthető vélemények.</p> :
                    (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                            {/* === JAVÍTVA: A 'reviews' változót használjuk a 'reviewsData' helyett === */}
                            {reviews.map((review, i) => (
                                 <motion.div 
                                    key={review.id} // ID-t használunk a key-hez
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                    className="bg-white p-6 rounded-xl shadow-lg break-inside-avoid flex flex-col"
                                 >
                                    <div className="flex items-center gap-4">
                                        {review.profile_image_url && <img src={review.profile_image_url} className="w-12 h-12 rounded-full object-cover"/>}
                                        <div>
                                            <p className="font-semibold text-brand-text">{review.name}</p>
                                            <div className="flex">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400"/>)}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-600 italic">"{review.review_text}"</p>
                                    
                                    {review.product_image_urls && review.product_image_urls.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-center gap-2 text-xs text-gray-400 mb-2"><Camera className="w-4 h-4"/><span>Feltöltött képek:</span></div>
                                            <div className="grid grid-cols-3 gap-2">
                                                {review.product_image_urls.map((imgUrl, idx) => (
                                                    <a href={imgUrl} target="_blank" rel="noopener noreferrer" key={idx} className="aspect-square rounded-md overflow-hidden block">
                                                        <img src={imgUrl} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" alt={`Termékfotó ${idx + 1}`}/>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    
                                    <div className="mt-5 pt-5 border-t border-gray-200/80">
                                        <div className="flex items-center gap-2">
                                            <Layers className="w-4 h-4 text-brand-rose"/>
                                            <p className="text-sm font-semibold text-brand-text">Választásuk: <span className="font-normal text-gray-600">{review.collection}</span></p>
                                        </div>
                                        {review.extras && review.extras.length > 0 && (
                                            <div className="flex items-start gap-2 mt-2">
                                                <PlusCircle className="w-4 h-4 text-brand-rose mt-0.5 flex-shrink-0"/>
                                                <div>
                                                    <p className="text-sm font-semibold text-brand-text">Extrák:</p>
                                                    <ul className="text-sm text-gray-600 list-disc list-inside">
                                                        {review.extras.map(extra => <li key={extra}>{extra}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}   
                </div>
                
                <div className="text-center mt-20">
                     <Link href="/velemeny-iras" passHref legacyBehavior>
                        <a className="btn-primary text-lg">
                            Oszd meg te is a történeted!
                        </a>
                    </Link>
                </div>
            </main>
        </>
    );
}