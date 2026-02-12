'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const HomePageBlog = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLatestPosts = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('blog')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false })
                .limit(3); // Csak a 3 legfrissebbet kérjük le

            if (error) {
                console.error("Hiba a főoldali bejegyzések betöltésekor:", error);
            } else {
                setPosts(data);
            }
            setIsLoading(false);
        };
        fetchLatestPosts();
    }, []);

    if (isLoading || posts.length === 0) {
        // Ne jelenítsünk meg semmit, amíg tölt vagy ha nincs bejegyzés
        return null;
    }

    return (
        <section className="bg-white py-20 md:py-28">
            <div className="max-w-6xl mx-auto px-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h2 className="font-serif text-4xl md:text-5xl italic text-brand-text">Inspirációk</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body">
                        Legújabb gondolataink, tippjeink és történeteink az esküvői grafika világából.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className="block bg-white rounded-xl shadow-lg overflow-hidden group">
                            <div className="relative h-56 overflow-hidden">
                                <Image 
                                    src={post.cover_image_url || '/images/placeholder.jpg'} 
                                    alt={post.title} 
                                    layout="fill" 
                                    objectFit="cover" 
                                    className="group-hover:scale-105 transition-transform duration-500 ease-in-out"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="font-serif text-2xl text-brand-text group-hover:text-brand-rose transition-colors duration-300">{post.title}</h3>
                                <p className="text-sm text-brand-rose mt-4 font-semibold">Tovább olvasom →</p>
                            </div>
                        </Link>
                    ))}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <Link href="/blog" passHref legacyBehavior>
                        <a className="btn-primary text-base">
                            Még több bejegyzés
                        </a>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default HomePageBlog;