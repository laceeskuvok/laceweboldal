'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../components/Header';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function BlogPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('blog')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false });

            if (error) console.error("Hiba a bejegyzések betöltésekor:", error);
            else setPosts(data);
            setIsLoading(false);
        };
        fetchPosts();
    }, []);

    return (
        <>
            <Header />
            <main className="bg-brand-background py-24 px-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
                    <h1 className="font-serif text-5xl md:text-7xl italic text-brand-text">Inspirációk & Történetek</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto font-body">
                        Gondolatok, tippek és kulisszatitkok az esküvői grafika világából. Merítsetek ihletet a nagy napotokhoz!
                    </p>
                </motion.div>

                <div className="max-w-6xl mx-auto mt-16">
                    {isLoading ? <p className="text-center">Betöltés...</p> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, i) => (
                                <motion.div 
                                    key={post.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: i * 0.1 }}
                                >
                                    <Link href={`/blog/${post.slug}`} className="block bg-white rounded-xl shadow-lg overflow-hidden group">
                                        <div className="relative h-56 overflow-hidden">
                                            <Image src={post.cover_image_url || '/images/placeholder.jpg'} alt={post.title} layout="fill" objectFit="cover" className="group-hover:scale-105 transition-transform duration-500"/>
                                        </div>
                                        <div className="p-6">
                                            <h2 className="font-serif text-2xl text-brand-text group-hover:text-brand-rose transition-colors">{post.title}</h2>
                                            {/* Ide jöhetne egy rövid leírás is, ha lenne az adatbázisban */}
                                            <p className="text-sm text-brand-rose mt-4 font-semibold">Tovább olvasom →</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    }
                </div>
            </main>
        </>
    );
}