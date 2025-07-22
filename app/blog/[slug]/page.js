'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useParams } from 'next/navigation'; // <-- 1. LÉPÉS: Importáljuk a useParams hook-ot
import Header from '../../../components/Header';
import { createClient } from '@supabase/supabase-js';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Markdown szöveget HTML-lé alakító komponens
const MarkdownContent = ({ content }) => {
    const paragraphs = content.split('\n').filter(p => p.trim() !== '');
    return (
        <div className="prose lg:prose-lg max-w-full font-body text-gray-700 leading-relaxed space-y-6">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        </div>
    );
}

export default function BlogPostPage() {
    // 2. LÉPÉS: A 'params'-ot lecseréljük a useParams hook használatára
    const params = useParams();
    const { slug } = params;

    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            const fetchPost = async () => {
                setIsLoading(true);
                const { data, error } = await supabase
                    .from('blog')
                    .select('*')
                    .eq('slug', slug)
                    .single();

                if (error) console.error("Hiba a bejegyzés betöltésekor:", error);
                else setPost(data);
                setIsLoading(false);
            };
            fetchPost();
        }
    }, [slug]);

    if (isLoading) return <div className="h-screen flex items-center justify-center">Betöltés...</div>;
    if (!post) return <div className="h-screen flex items-center justify-center">Bejegyzés nem található.</div>;

    return (
        <>
            <Header />
            <main>
                <article>
                    <header className="relative h-[50vh] flex items-center justify-center text-center px-4">
                        <div className="absolute inset-0 z-0">
                            <Image src={post.cover_image_url || '/images/placeholder.jpg'} alt={post.title} layout="fill" objectFit="cover" className="opacity-30"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-brand-background/70 to-transparent"/>
                        </div>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10">
                            <h1 className="font-serif text-4xl md:text-6xl italic text-brand-text">{post.title}</h1>
                        </motion.div>
                    </header>

                    <div className="py-16 md:py-24">
                        <div className="max-w-3xl mx-auto px-4">
                            <MarkdownContent content={post.content} />
                        </div>
                    </div>
                </article>
            </main>
        </>
    );
}