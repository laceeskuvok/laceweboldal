'use client';

import PostEditor from "../../../../components/PostEditor";

export default function NewPostPage() {
    return (
        <main className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-serif text-gray-800 mb-8">Új Blog Bejegyzés</h1>
                <PostEditor />
            </div>
        </main>
    );
}