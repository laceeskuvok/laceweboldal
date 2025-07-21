'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Check, Trash2, Image as ImageIcon, UserCircle } from 'lucide-react';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPage() {
    const [pendingReviews, setPendingReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchPendingReviews = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('velemenyek')
            .select('*')
            .eq('status', 'fuggoben')
            .order('created_at', { ascending: true });

        if (error) {
            console.error("Hiba a vélemények betöltésekor:", error);
        } else {
            setPendingReviews(data);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPendingReviews();
    }, []);

    const handleApprove = async (id) => {
        const { error } = await supabase
            .from('velemenyek')
            .update({ status: 'jovahagyva' })
            .eq('id', id);
        if (error) { alert("Hiba a jóváhagyás során!") } 
        else { fetchPendingReviews() }
    };
    
    const handleDelete = async (id) => {
        if (window.confirm("Biztosan törölni szeretnéd ezt a véleményt?")) {
            const { error } = await supabase
                .from('velemenyek')
                .delete()
                .eq('id', id);
            if (error) { alert("Hiba a törlés során!") } 
            else { fetchPendingReviews() }
        }
    };

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-serif text-gray-800">Admin Felület - Vélemények</h1>
                <p className="mt-2 text-gray-600">Itt láthatod a jóváhagyásra váró új véleményeket.</p>

                <div className="mt-8 bg-white rounded-xl shadow-md">
                    {isLoading ? <p className="p-6">Betöltés...</p> :
                     pendingReviews.length === 0 ? <p className="p-6">Nincs jóváhagyásra váró vélemény.</p> :
                     (
                        <ul className="divide-y divide-gray-200">
                            {pendingReviews.map(review => (
                                <li key={review.id} className="p-6 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            {review.profile_image_url ? (
                                                <img src={review.profile_image_url} alt="Profilkép" className="w-12 h-12 rounded-full object-cover"/>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                                                    <UserCircle size={24}/>
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-semibold">{review.name} <span className="text-sm text-gray-500 font-normal">- {review.email}</span></p>
                                                <p className="text-sm text-gray-600 mt-1">Kollekció: <span className="font-medium">{review.collection}</span></p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4 flex-shrink-0">
                                            <button onClick={() => handleApprove(review.id)} className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200"><Check className="w-5 h-5"/></button>
                                            <button onClick={() => handleDelete(review.id)} className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200"><Trash2 className="w-5 h-5"/></button>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="italic text-gray-700">"{review.review_text}"</p>
                                    </div>

                                    {/* === ÚJ: FELTÖLTÖTT KÉPEK SZEKCIÓ === */}
                                    {review.product_image_urls && review.product_image_urls.length > 0 && (
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="text-sm font-semibold text-gray-500 mb-2 flex items-center gap-2"><ImageIcon size={16}/> Feltöltött termékfotók:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {review.product_image_urls.map((url, index) => (
                                                    <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                                                        <img src={url} alt={`Termékfotó ${index + 1}`} className="w-20 h-20 rounded-md object-cover border hover:border-brand-rose transition-all"/>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
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