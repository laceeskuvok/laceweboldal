'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminBlogPage() {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
    
    // Ide jön majd a törlés funkció
    const handleDelete = async (id) => {
        if(window.confirm("Biztosan törlöd ezt a bejegyzést?")){
            // ... törlési logika ...
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-serif text-gray-800">Blog Bejegyzések</h1>
                        <p className="mt-1 text-gray-600">Itt kezelheted a weboldalon megjelenő cikkeket.</p>
                    </div>
                    <Link href="/admin/blog/new" className="btn-primary flex items-center gap-2">
                        <PlusCircle size={20} />
                        Új Bejegyzés
                    </Link>
                </div>

                <div className="mt-8 bg-white rounded-xl shadow-md">
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
                                        <button className="p-2 text-gray-500 hover:text-blue-600"><Edit size={18}/></button>
                                        <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-500 hover:text-red-600"><Trash2 size={18}/></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                     )
                    }
                </div>
            </div>
        </main>
    );
}