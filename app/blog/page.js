'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Header from '../../components/Header';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Segédkomponens a szöveg formázásához
const MarkdownContent = ({ content }) => {
    if (!content) return null;
    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    return (
        <div className="prose lg:prose-xl max-w-full font-serif text-[#5C5454] leading-loose space-y-6">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
    );
};

export default function BlogPage() {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchLatestPost = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('blog')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false })
                .limit(1) // Csak a legfrissebbet kérjük le
                .single(); // Egyetlen objektumot várunk, nem tömböt

            if (error) {
                console.error("Hiba a bejegyzés betöltésekor:", error);
            } else {
                setPost(data);
            }
            setIsLoading(false);
        };
        fetchLatestPost();
    }, []);

    if (isLoading) {
        return (
            <>
                <Header />
                <div className="h-screen flex items-center justify-center bg-[#FDFCF8]">
                    <p className="font-serif text-xl text-[#B76E79] animate-pulse">Betöltés...</p>
                </div>
            </>
        );
    }

    if (!post) {
        return (
            <>
                <Header />
                <div className="h-screen flex items-center justify-center bg-[#FDFCF8]">
                    <p className="font-serif text-2xl text-[#5C5454]">Jelenleg nincs elérhető bejegyzés.</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <main className="bg-[#FDFCF8] min-h-screen pt-32 pb-20">
                <article className="max-w-4xl mx-auto px-6">
                    
                    {/* Cím és Dátum */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 0.8 }} 
                        className="text-center mb-12"
                    >
                        <h1 className="font-serif text-5xl md:text-7xl italic text-[#5C5454] mb-6 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-[#B76E79] font-sans text-sm tracking-widest uppercase">
                            {new Date(post.created_at).toLocaleDateString('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </p>
                    </motion.div>

                    {/* Borítókép (Ha van) */}
                    {post.cover_image_url && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative w-full aspect-video md:aspect-[2/1] rounded-2xl overflow-hidden shadow-sm mb-16 border border-[#E8DCC4]"
                        >
                            <Image 
                                src={post.cover_image_url} 
                                alt={post.title} 
                                fill 
                                className="object-cover"
                                priority
                            />
                        </motion.div>
                    )}

                    {/* Tartalom */}
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#E8DCC4]"
                    >
                        <MarkdownContent content={post.content} />
                    </motion.div>

                </article>
            </main>
        </>
    );
}