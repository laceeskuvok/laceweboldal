'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // useRouter importálása
import { PlusCircle, Edit, Trash2, AlertTriangle, MessageSquare, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// === Törlési Megerősítő Ablak (változatlan) ===
const DeleteConfirmationModal = ({ onConfirm, onCancel }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={onCancel}
    >
        <motion.div
            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center"
        >
            <AlertTriangle className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-4 text-2xl font-serif text-gray-800">Biztosan törlöd?</h2>
            <p className="mt-2 text-gray-600">A művelet nem vonható vissza. A bejegyzés véglegesen törlődni fog.</p>
            <div className="mt-6 flex justify-center gap-4">
                <button onClick={onCancel} className="px-6 py-2 rounded-full text-gray-700 bg-gray-200 hover:bg-gray-300 transition-colors">Mégse</button>
                <button onClick={onConfirm} className="px-6 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-colors">Igen, törlöm</button>
            </div>
        </motion.div>
    </motion.div>
);


export default function AdminBlogPage() {
    const router = useRouter(); // useRouter hook inicializálása
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    const fetchPosts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('blog')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error("Hiba a bejegyzések betöltésekor:", error);
        else setPosts(data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPosts();
    }, []);
    
    // === JAVÍTVA: Működő törlés funkció ===
    const handleDelete = async () => {
        if (!showDeleteModal) return;
        const { error } = await supabase.from('blog').delete().eq('id', showDeleteModal);
        if (error) { alert("Hiba a törlés során: " + error.message); }
        else { fetchPosts(); }
        setShowDeleteModal(null);
    };

     // === ÚJ: Kijelentkezés funkció ===
     const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <>
            <main className="min-h-screen bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto">
                    {/* === JAVÍTVA: Egységes admin fejléc === */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-serif text-gray-800">Admin Felület</h1>
                            <p className="mt-1 text-gray-600">Itt kezelheted a weboldal dinamikus tartalmait.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="btn-primary text-sm flex items-center gap-2">
                                <MessageSquare size={16} />
                                Vélemények
                            </Link>
                            <button onClick={handleSignOut} className="p-2 text-gray-500 hover:text-red-600" title="Kijelentkezés">
                                <LogOut size={20}/>
                            </button>
                        </div>
                    </div>

                    {/* === Blog Bejegyzések Szekció === */}
                    <div>
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-2xl font-serif text-gray-700">Blog Bejegyzések</h2>
                                <p className="mt-1 text-gray-600">Itt kezelheted a weboldalon megjelenő cikkeket.</p>
                            </div>
                            <Link href="/admin/blog/new" className="btn-primary flex items-center gap-2"><PlusCircle size={20} />Új Bejegyzés</Link>
                        </div>

                        <div className="mt-4 bg-white rounded-xl shadow-md">
                            {isLoading ? <p className="p-6">Betöltés...</p> :
                             posts.length === 0 ? <p className="p-6">Nincsenek még bejegyzések.</p> :
                             (
                                <ul className="divide-y divide-gray-200">
                                    {posts.map(post => (
                                        <li key={post.id} className="p-4 flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-gray-800">{post.title}</p>
                                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                    {post.is_published ? 'Publikálva' : 'Piszkozat'}
                                                </span>
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/admin/blog/edit/${post.id}`} className="p-2 text-gray-500 hover:text-blue-600"><Edit size={18}/></Link>
                                                <button onClick={() => setShowDeleteModal(post.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={18}/></button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                             )
                            }
                        </div>
                    </div>
                </div>
            </main>
            <AnimatePresence>
                {showDeleteModal && <DeleteConfirmationModal onConfirm={handleDelete} onCancel={() => setShowDeleteModal(null)} />}
            </AnimatePresence>
        </>
    );
}