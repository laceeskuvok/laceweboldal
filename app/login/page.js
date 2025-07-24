'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client'; 
import { motion } from 'framer-motion';

// --- SUPABASE INICIALIZÁLÁSA ---
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SpinnerIcon = () => ( <motion.svg className="w-5 h-5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></motion.svg> );

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    // Az új, helyes Supabase kliens használata
    const supabase = createClient();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Hibás e-mail cím vagy jelszó.");
            setIsLoading(false);
        } else {
            // A router.refresh() frissíti a szerver oldali állapotot, a middleware lefut újra
            router.refresh(); 
            router.push('/admin'); 
        }
    };

    return (
        <main className="min-h-screen bg-brand-background flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
            >
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl text-brand-text">Admin Bejelentkezés</h1>
                    <p className="text-gray-500 mt-2">Jelentkezz be a tartalom kezeléséhez.</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail cím</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-rose focus:border-brand-rose"/>
                    </div>
                     <div>
                        <label htmlFor="password">Jelszó</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-rose focus:border-brand-rose"/>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full btn-primary flex items-center justify-center gap-3 disabled:opacity-70">
                             {isLoading && <SpinnerIcon />}
                             {isLoading ? 'Belépés...' : 'Bejelentkezés'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </main>
    );
}