'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Check, Trash2, UserCircle, LogOut, Plus, UploadCloud, MessageSquare } from 'lucide-react';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPage() {
    const router = useRouter();
    
    // Statek
    const [pendingReviews, setPendingReviews] = useState([]);
    const [approvedReviews, setApprovedReviews] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    
    // Manuális hozzáadás statek
    const [manualForm, setManualForm] = useState({ name: '', review_text: '', collection: 'Egyedi felkérés', rating: 5 });
    const [manualImage, setManualImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const manualFileInputRef = useRef(null);

    // --- ADATOK BETÖLTÉSE (JAVÍTVA: Mindkét listát frissíti) ---
    const fetchData = async () => {
        setIsLoading(true);
        
        // 1. Függőben lévők lekérése
        const { data: pendingData, error: pendingError } = await supabase
            .from('velemenyek')
            .select('*')
            .eq('status', 'fuggoben')
            .order('created_at', { ascending: true });

        // 2. Már elfogadott (publikus) vélemények lekérése
        const { data: approvedData, error: approvedError } = await supabase
            .from('velemenyek')
            .select('*')
            .eq('status', 'jovahagyva')
            .order('created_at', { ascending: false });

        if (pendingError) console.error("Hiba (pending):", pendingError);
        if (approvedError) console.error("Hiba (approved):", approvedError);

        setPendingReviews(pendingData || []);
        setApprovedReviews(approvedData || []); 
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- FÁJLFELTÖLTÉS LOGIKA ---
    const handleFileUpload = async (file) => {
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
            .from('testimonials') 
            .upload(`profiles/${fileName}`, file);

        if (error) {
            console.error('Hiba a képfeltöltéskor:', error);
            return null;
        }
        return supabase.storage.from('testimonials').getPublicUrl(data.path).data.publicUrl;
    };

    // --- MŰVELETEK ---
    const handleApprove = async (id) => {
        const { error } = await supabase.from('velemenyek').update({ status: 'jovahagyva' }).eq('id', id);
        if (error) {
            alert("Hiba a jóváhagyáskor: " + error.message);
        } else {
            fetchData(); // Lista frissítése
        }
    };
    
    // --- JAVÍTVA: Törlés hiba kezelése ---
    const handleDelete = async (id) => {
        if (window.confirm("Biztosan véglegesen törölni szeretnéd ezt a véleményt?")) {
            const { error } = await supabase.from('velemenyek').delete().eq('id', id);
            
            if (error) {
                console.error("Törlési hiba részletei:", error);
                alert("Hiba történt a törlés során: " + error.message);
            } else {
                // Ha sikeres, újratöltjük az adatokat, így eltűnik a listából
                fetchData(); 
            }
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    // --- MANUÁLIS BEKÜLDÉS ---
    const handleManualSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        let profileImageUrl = null;
        if (manualImage) {
            profileImageUrl = await handleFileUpload(manualImage);
        }

        const { error } = await supabase.from('velemenyek').insert([{
            name: manualForm.name,
            review_text: manualForm.review_text,
            collection: manualForm.collection,
            rating: manualForm.rating,
            profile_image_url: profileImageUrl,
            status: 'jovahagyva', 
            email: 'admin@upload.com'
        }]);

        if (error) {
            alert('Hiba a mentéskor: ' + error.message);
        } else {
            alert('Vélemény sikeresen hozzáadva!');
            setManualForm({ name: '', review_text: '', collection: 'Egyedi felkérés', rating: 5 });
            setManualImage(null);
            fetchData(); // JAVÍTVA: Lista frissítése mentés után
        }
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-gray-100 p-8 pt-32">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* BAL OSZLOP: VÉLEMÉNYEK LISTÁJA */}
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-serif text-gray-800">Admin Dashboard</h1>
                        <button onClick={handleSignOut} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1">
                            <LogOut size={16}/> Kilépés
                        </button>
                    </div>

                    {/* 1. JÓVÁHAGYÁSRA VÁRÓK */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-orange-200">
                        <div className="p-4 bg-orange-50 border-b border-orange-100">
                            <h2 className="font-semibold text-orange-800 flex items-center gap-2">
                                <MessageSquare size={18}/> Jóváhagyásra váró vélemények
                            </h2>
                        </div>
                        {isLoading ? <p className="p-6">Betöltés...</p> :
                         pendingReviews.length === 0 ? <p className="p-6 text-gray-500 italic">Nincs függőben lévő vélemény.</p> :
                         (
                            <ul className="divide-y divide-gray-200">
                                {pendingReviews.map(review => (
                                    <li key={review.id} className="p-6">
                                        <div className="flex items-start gap-4">
                                            {review.profile_image_url ? (
                                                <img src={review.profile_image_url} className="w-12 h-12 rounded-full object-cover"/>
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400"><UserCircle/></div>
                                            )}
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h3 className="font-bold text-gray-800">{review.name}</h3>
                                                    <span className="text-xs text-yellow-500 font-bold">{review.rating} ★</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mb-2">{review.email} | {review.collection}</p>
                                                <p className="text-sm text-gray-600 italic">"{review.review_text}"</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end gap-3 mt-4">
                                            <button onClick={() => handleDelete(review.id)} className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded border border-red-200">Elutasít</button>
                                            <button onClick={() => handleApprove(review.id)} className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"><Check size={14}/> Jóváhagy</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                         )
                        }
                    </div>

                    {/* 2. MÁR KÖZZÉTETT (AKTÍV) VÉLEMÉNYEK */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                            <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                                <Check size={18} className="text-green-600"/> Közzétett vélemények (Weboldalon látható)
                            </h2>
                        </div>
                        {isLoading ? <p className="p-6">Betöltés...</p> :
                         approvedReviews.length === 0 ? <p className="p-6 text-gray-500 italic">Még nincs közzétett vélemény.</p> :
                         (
                            <ul className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                                {approvedReviews.map(review => (
                                    <li key={review.id} className="p-4 hover:bg-gray-50 transition">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-3">
                                                 {review.profile_image_url ? (
                                                    <img src={review.profile_image_url} className="w-10 h-10 rounded-full object-cover"/>
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs"><UserCircle/></div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-gray-800 text-sm">{review.name}</p>
                                                    <p className="text-xs text-gray-500 truncate max-w-[200px]">{review.review_text}</p>
                                                </div>
                                            </div>
                                            
                                            {/* TÖRLÉS GOMB */}
                                            <button 
                                                onClick={() => handleDelete(review.id)} 
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition" 
                                                title="Vélemény törlése"
                                            >
                                                <Trash2 size={18}/>
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                         )
                        }
                    </div>
                </div>

                {/* JOBB OSZLOP: Manuális feltöltés */}
                <div>
                    <div className="bg-white rounded-xl shadow-md p-6 sticky top-32">
                        <h2 className="text-xl font-serif text-gray-800 mb-6 flex items-center gap-2">
                            <Plus size={20} className="text-brand-rose"/> Manuális hozzáadás
                        </h2>
                        <form onSubmit={handleManualSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ügyfél neve</label>
                                <input required type="text" value={manualForm.name} onChange={e => setManualForm({...manualForm, name: e.target.value})} className="w-full p-2 border rounded-lg"/>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kollekció</label>
                                    <input type="text" value={manualForm.collection} onChange={e => setManualForm({...manualForm, collection: e.target.value})} className="w-full p-2 border rounded-lg"/>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Értékelés (1-5)</label>
                                    <input type="number" min="1" max="5" value={manualForm.rating} onChange={e => setManualForm({...manualForm, rating: e.target.value})} className="w-full p-2 border rounded-lg"/>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Vélemény szövege</label>
                                <textarea required rows="4" value={manualForm.review_text} onChange={e => setManualForm({...manualForm, review_text: e.target.value})} className="w-full p-2 border rounded-lg"></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Profilkép (opcionális)</label>
                                <input type="file" ref={manualFileInputRef} onChange={(e) => setManualImage(e.target.files[0])} accept="image/*" className="hidden"/>
                                <div onClick={() => manualFileInputRef.current.click()} className="flex items-center gap-4 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                                    {manualImage ? (
                                        <img src={URL.createObjectURL(manualImage)} className="w-12 h-12 rounded-full object-cover"/>
                                    ) : (
                                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400"><UploadCloud size={20}/></div>
                                    )}
                                    <span className="text-sm text-gray-500">{manualImage ? manualImage.name : "Kép feltöltése..."}</span>
                                </div>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full btn-primary py-2 mt-2">
                                {isSubmitting ? 'Mentés...' : 'Vélemény hozzáadása'}
                            </button>
                        </form>
                        
                        {/* Navigációs linkek */}
                        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                            <Link href="/velemeny-iras" target="_blank" className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition">
                                <span className="block text-xs text-gray-500 mb-1">Ügyfél linkje</span>
                                <span className="text-sm font-semibold text-brand-rose">/velemeny-iras</span>
                            </Link>
                            <Link href="/admin/blog" className="p-3 bg-gray-50 rounded-lg text-center hover:bg-gray-100 transition">
                                <span className="block text-xs text-gray-500 mb-1">Tartalom</span>
                                <span className="text-sm font-semibold text-gray-700">Blog kezelése</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}