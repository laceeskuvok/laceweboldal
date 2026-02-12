'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HomePageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopReviews = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('velemenyek')
                .select('name, rating, review_text, profile_image_url')
                .eq('status', 'jovahagyva')
                .order('created_at', { ascending: false })
                .limit(3); // Csak a 3 legfrissebbet kérjük le

            if (error) {
                console.error("Hiba a főoldali vélemények betöltésekor:", error);
            } else {
                setReviews(data);
            }
            setIsLoading(false);
        };
        fetchTopReviews();
    }, []);

    if (isLoading || reviews.length === 0) {
        // Ne jelenítsünk meg semmit, amíg tölt vagy ha nincs vélemény
        return null;
    }

    return (
        <section className="bg-brand-background py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="font-serif text-4xl md:text-5xl italic text-brand-text">Párok, akik már igent mondtak</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body">
                        Büszkék vagyunk rá, hogy részesei lehettünk ennyi csodálatos történetnek. Olvassátok el, mit mondtak rólunk!
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {reviews.map((review, i) => (
                        <div key={i} className="bg-white p-8 rounded-2xl shadow-lg flex flex-col">
                            <div className="flex items-center gap-4">
                                {review.profile_image_url && <img src={review.profile_image_url} className="w-14 h-14 rounded-full object-cover"/>}
                                <div>
                                    <p className="font-semibold text-brand-text">{review.name}</p>
                                    <div className="flex">
                                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400"/>)}
                                    </div>
                                </div>
                            </div>
                            <p className="mt-6 text-gray-600 italic flex-grow">"{review.review_text}"</p>
                        </div>
                    ))}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <Link href="/velemenyek" passHref legacyBehavior>
                        <a className="btn-primary text-base">
                            További vélemények
                        </a>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HomePageReviews;