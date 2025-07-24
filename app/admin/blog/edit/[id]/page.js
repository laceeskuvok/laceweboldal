'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import PostEditor from '../../../../../components/PostEditor';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function EditPostPage() {
    const params = useParams();
    const { id } = params;
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;
            setIsLoading(true);
            const { data, error } = await supabase.from('blog').select('*').eq('id', id).single();
            if (error) console.error("Hiba:", error);
            else setPost(data);
            setIsLoading(false);
        };
        fetchPost();
    }, [id]);

    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-serif text-gray-800 mb-8">Bejegyzés Szerkesztése</h1>
                {isLoading ? <p>Betöltés...</p> : 
                 post ? <PostEditor postToEdit={post} /> : <p>Bejegyzés nem található.</p>}
            </div>
        </main>
    );
}