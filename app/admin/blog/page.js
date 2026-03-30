'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlusCircle, Edit, Trash2, AlertTriangle, MessageSquare, LogOut, Eye, EyeOff, Globe, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Ezt a függvényt a Next.js automatikusan lefutatja a háttérben SEO generáláshoz
export async function generateMetadata({ params }) {
  const { slug } = params;

  // Lekérjük a cikket a Supabase-ből
  const { data: post } = await supabase
    .from('blog')
    .select('title, content, cover_image_url')
    .eq('slug', slug)
    .single();

  if (!post) {
    return { title: 'Bejegyzés nem található' };
  }

  // Csinálunk egy rövid kivonatot a tartalomból a description-höz (első 150 karakter)
  const plainTextDescription = post.content.replace(/[#*`_]/g, '').substring(0, 150) + '...';

  return {
    title: post.title,
    description: plainTextDescription,
    openGraph: {
      title: post.title,
      description: plainTextDescription,
      images: [
        {
          url: post.cover_image_url || '/images/default-blog.jpg',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
    },
  };
}

// --- SUPABASE ---
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

// === Törlési Modális ===
const DeleteConfirmationModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onCancel}>
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full text-center"
        >
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Törlés megerősítése</h2>
            <p className="mt-2 text-sm text-gray-600">A bejegyzés véglegesen törlődni fog. Folytatod?</p>
            <div className="mt-6 flex gap-3 justify-center">
                <button onClick={onCancel} className="px-4 py-2 rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 font-medium">Mégse</button>
                <button onClick={onConfirm} className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 font-medium">Törlés</button>
            </div>
        </motion.div>
    </div>
);

export default function AdminBlogPage() {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [togglingId, setTogglingId] = useState(null); // Melyik ID-n dolgozunk épp
    const [showDeleteModal, setShowDeleteModal] = useState(null);

    const fetchPosts = async () => {
        // NEM állítjuk az isLoading-et true-ra frissítéskor, hogy ne villogjon a lista
        const { data, error } = await supabase
            .from('blog')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error("Hiba:", error);
        else setPosts(data);
        setIsLoading(false);
    };

    useEffect(() => { fetchPosts(); }, []);
    
    // === ÚJ: Státusz váltás (Publikálás / Elrejtés) ===
    const toggleStatus = async (post) => {
        setTogglingId(post.id);
        const newStatus = !post.is_published;
        
        const { error } = await supabase
            .from('blog')
            .update({ is_published: newStatus })
            .eq('id', post.id);

        if (error) {
            alert("Hiba a módosításkor: " + error.message);
        } else {
            await fetchPosts(); // Lista újratöltése a friss státusszal
        }
        setTogglingId(null);
    };

    const handleDelete = async () => {
        if (!showDeleteModal) return;
        await supabase.from('blog').delete().eq('id', showDeleteModal);
        fetchPosts();
        setShowDeleteModal(null);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    // Megkeressük, melyik az az EGYETLEN bejegyzés, ami jelenleg látszik a főoldalon
    // (A legfrissebb dátumú, ami publikálva van)
    const activePostId = posts.find(p => p.is_published)?.id;

    return (
        <main className="min-h-screen bg-gray-50 p-6 md:p-10 font-sans">
            <div className="max-w-5xl mx-auto pt-20">
                {/* Fejléc */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-800">Blog Kezelése</h1>
                        <p className="text-gray-500 mt-1">
                            <span className="font-bold text-green-600">Aktív:</span> A legfrissebb publikált bejegyzés jelenik meg az oldalon.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/admin" className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition">
                            <MessageSquare size={18} /> Vélemények
                        </Link>
                        <button onClick={handleSignOut} className="p-2 text-gray-400 hover:text-red-600 transition" title="Kijelentkezés">
                            <LogOut size={20}/>
                        </button>
                    </div>
                </div>

                {/* Lista */}
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-700">Bejegyzések</h2>
                    <Link href="/admin/blog/new" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        <PlusCircle size={18} /> Új írása
                    </Link>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {isLoading && posts.length === 0 ? <div className="p-8 text-center text-gray-500">Betöltés...</div> :
                     posts.length === 0 ? <div className="p-8 text-center text-gray-500">Még nincs bejegyzés.</div> :
                     (
                        <ul className="divide-y divide-gray-100">
                            {posts.map(post => {
                                // Státusz logika
                                const isLive = post.id === activePostId; // Ez látszik a főoldalon
                                const isPublished = post.is_published;
                                const isProcessing = togglingId === post.id;
                                
                                return (
                                    <li key={post.id} className={`p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors ${isLive ? 'bg-green-50/60 border-l-4 border-green-500' : ''}`}>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                {isLive ? (
                                                    <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide flex items-center gap-1">
                                                        <Globe size={10} /> Jelenleg látható
                                                    </span>
                                                ) : isPublished ? (
                                                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                                                        Archivált (Publikus)
                                                    </span>
                                                ) : (
                                                    <span className="bg-yellow-100 text-yellow-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                                                        Rejtve / Piszkozat
                                                    </span>
                                                )}
                                                
                                                <span className="text-xs text-gray-400">
                                                    {new Date(post.created_at).toLocaleDateString('hu-HU')}
                                                </span>
                                            </div>
                                            <h3 className={`font-semibold text-lg ${isLive ? 'text-green-900' : 'text-gray-800'}`}>
                                                {post.title}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            {/* --- GYORS STÁTUSZ VÁLTÓ GOMB --- */}
                                            <button 
                                                onClick={() => toggleStatus(post)}
                                                disabled={isProcessing}
                                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                                                    isPublished 
                                                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                                                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                                                }`}
                                                title={isPublished ? "Elrejtés (Legyen Piszkozat)" : "Publikálás"}
                                            >
                                                {isProcessing ? <Loader2 size={16} className="animate-spin"/> : 
                                                 isPublished ? <EyeOff size={16}/> : <Eye size={16}/>
                                                }
                                                <span className="hidden md:inline">
                                                    {isPublished ? 'Elrejtés' : 'Publikálás'}
                                                </span>
                                            </button>

                                            <div className="w-px h-6 bg-gray-200 mx-1"></div>

                                            <Link href={`/admin/blog/edit/${post.id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="Szerkesztés">
                                                <Edit size={18}/>
                                            </Link>
                                            <button onClick={() => setShowDeleteModal(post.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition" title="Törlés">
                                                <Trash2 size={18}/>
                                            </button>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                     )
                    }
                </div>
            </div>
            
            <AnimatePresence>
                {showDeleteModal && <DeleteConfirmationModal onConfirm={handleDelete} onCancel={() => setShowDeleteModal(null)} />}
            </AnimatePresence>
        </main>
    );
}