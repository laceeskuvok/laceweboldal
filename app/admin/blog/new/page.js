'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { UploadCloud } from 'lucide-react';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SpinnerIcon = () => ( <motion.svg className="w-5 h-5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></motion.svg> );

export default function NewPostPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [content, setContent] = useState('');
    const [coverImageFile, setCoverImageFile] = useState(null); // <-- ÚJ: Fájl tárolása
    const [isPublished, setIsPublished] = useState(false);
    const [status, setStatus] = useState('idle');
    const coverImageInputRef = useRef(null); // <-- ÚJ: Ref a file inputhoz

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    };
    
    // --- ÚJ: KÉPFELTÖLTÉSI LOGIKA ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!coverImageFile) {
            alert("Kérlek, tölts fel egy borítóképet!");
            return;
        }
        setStatus('saving');

        try {
            // 1. Kép feltöltése
            const fileName = `${Date.now()}_${coverImageFile.name}`;
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('testimonials') // A meglévő tárolót használjuk
                .upload(`blog-covers/${fileName}`, coverImageFile); // De egy új mappába

            if (uploadError) throw uploadError;

            // 2. Publikus URL lekérése
            const { data: urlData } = supabase.storage
                .from('testimonials')
                .getPublicUrl(uploadData.path);

            // 3. Adatok mentése az adatbázisba
            const { error: insertError } = await supabase.from('blog').insert([{
                title,
                slug,
                content,
                cover_image_url: urlData.publicUrl,
                is_published: isPublished
            }]);

            if (insertError) throw insertError;

            setStatus('success');
            router.push('/admin/blog');
        } catch (error) {
            console.error("Hiba a mentés során:", error);
            setStatus('error');
            alert("Hiba történt a bejegyzés mentése közben. Részletek a konzolon.");
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-serif text-gray-800">Új Blog Bejegyzés</h1>
                <form onSubmit={handleSubmit} className="mt-8 bg-white rounded-xl shadow-md p-8 space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Cím</label>
                        <input type="text" id="title" value={title} onChange={handleTitleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-rose focus:border-brand-rose"/>
                    </div>
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Link (slug)</label>
                        <input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"/>
                    </div>
                     
                    {/* === JAVÍTVA: KÉPFELTÖLTŐ === */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Borítókép</label>
                        <input type="file" ref={coverImageInputRef} onChange={(e) => setCoverImageFile(e.target.files[0])} accept="image/*" className="hidden"/>
                        <div onClick={() => coverImageInputRef.current.click()} className="mt-1 flex justify-center items-center w-full h-48 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                            {coverImageFile ? (
                                <img src={URL.createObjectURL(coverImageFile)} alt="Borítókép előnézet" className="h-full rounded-md object-contain"/>
                            ) : (
                                <div className="space-y-1 text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                                    <p className="text-sm text-gray-600">Kattints a feltöltéshez vagy húzd ide a képet</p>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF max 10MB</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Tartalom (Markdown formátumban)</label>
                        <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} required rows="15" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-rose focus:border-brand-rose font-mono"/>
                    </div>
                    <div className="flex items-center justify-between">
                         <div className="flex items-center">
                            <input id="is_published" type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="h-4 w-4 text-brand-rose border-gray-300 rounded focus:ring-brand-rose"/>
                            <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">Azonnali publikálás</label>
                        </div>
                        <button type="submit" disabled={status === 'saving'} className="btn-primary flex items-center gap-2">
                            {status === 'saving' ? <SpinnerIcon /> : null}
                            {status === 'saving' ? 'Mentés...' : 'Bejegyzés mentése'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}