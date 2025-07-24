'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { UploadCloud } from 'lucide-react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SpinnerIcon = () => (
  <motion.svg className="w-5 h-5" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} viewBox="0 0 24 24" fill="none">
    <path d="M12 4.75V6.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17.1266 6.87347L16.0659 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M19.25 12L17.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M17.1266 17.1265L16.0659 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M12 17.75V19.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.87344 17.1265L7.9341 16.0659" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.25 12L4.75 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6.87344 6.87347L7.9341 7.93413" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </motion.svg>
);

export default function PostEditor({ postToEdit }) {
  const router = useRouter();
  const [post, setPost] = useState({ title: '', slug: '', content: '', cover_image_url: '', is_published: false });
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImageFile, setCroppedImageFile] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [status, setStatus] = useState('idle');
  const coverImageInputRef = useRef(null);

  useEffect(() => { if (postToEdit) setPost(postToEdit); }, [postToEdit]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    let newPost = { ...post, [id]: type === 'checkbox' ? checked : value };
    if (id === 'title') {
      newPost.slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    setPost(newPost);
  };

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setPost(prev => ({ ...prev, cover_image_url: croppedImage.url }));
      setCroppedImageFile(croppedImage.file);
      setImageSrc(null);
    } catch (e) {
      console.error(e);
    }
  }, [imageSrc, croppedAreaPixels]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    try {
      let cover_image_url = post.cover_image_url;
      if (croppedImageFile) {
        const fileName = `${Date.now()}_${croppedImageFile.name}`;
        const { data, error } = await supabase.storage.from('testimonials').upload(`blog-covers/${fileName}`, croppedImageFile, { upsert: true });
        if (error) throw error;
        cover_image_url = supabase.storage.from('testimonials').getPublicUrl(data.path).data.publicUrl;
      }

      const postData = { title: post.title, slug: post.slug, content: post.content, cover_image_url, is_published: post.is_published };

      if (postToEdit) {
        const { error } = await supabase.from('blog').update(postData).eq('id', postToEdit.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog').insert([postData]);
        if (error) throw error;
      }
      router.push('/admin/blog');
    } catch (error) {
      console.error("Hiba a mentés során:", error);
      setStatus('error');
      alert("Hiba történt a bejegyzés mentése közben.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:sticky top-8 h-fit">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Élő előnézet</h3>
          <div className="bg-white rounded-xl shadow-md p-6 border aspect-[4/3] flex flex-col">
            <div className="relative h-48 rounded-lg overflow-hidden mb-4 flex-shrink-0">
              {post.cover_image_url ? (
                <Image src={post.cover_image_url} alt="Előnézet" layout="fill" objectFit="cover" />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">Nincs borítókép</div>
              )}
            </div>
            <h2 className="font-serif text-3xl text-brand-text truncate">{post.title || "Bejegyzés címe"}</h2>
            <p className="mt-2 text-gray-600 font-body text-sm overflow-hidden text-ellipsis">{post.content || "Itt fog megjelenni a bejegyzésed szövege..."}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8 space-y-6">
          <div>
            <label>Borítókép</label>
            <input type="file" ref={coverImageInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
            <div onClick={() => coverImageInputRef.current.click()} className="mt-1 flex justify-center items-center w-full h-32 px-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
              {post.cover_image_url ? <img src={post.cover_image_url} className="h-full rounded-md object-contain p-2" /> : <div className="text-center"><UploadCloud className="mx-auto h-10 w-10 text-gray-400" /><p className="text-xs text-gray-500">Kattints a feltöltéshez</p></div>}
            </div>
          </div>

          {/* Modern Input - Cím */}
          <div className="relative">
            <input id="title" value={post.title} onChange={handleInputChange} required className="peer h-14 w-full border border-gray-300 rounded-xl px-4 pt-6 text-lg placeholder-transparent focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose transition" placeholder="Bejegyzés címe" />
            <label htmlFor="title" className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-rose">Bejegyzés címe</label>
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm text-gray-500 mb-1">Link (slug)</label>
            <input type="text" id="slug" readOnly value={post.slug} onChange={handleInputChange} required className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose transition" />
          </div>

          {/* Modern Textarea - Tartalom */}
          <div className="relative">
            <textarea id="content" value={post.content} onChange={handleInputChange} required rows="10" className="peer w-full border border-gray-300 rounded-xl px-4 pt-6 text-base font-mono placeholder-transparent focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose transition" placeholder="Tartalom" />
            <label htmlFor="content" className="absolute left-4 top-4 text-gray-500 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-brand-rose">Tartalom</label>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="is_published" type="checkbox" checked={post.is_published} onChange={handleInputChange} className="h-4 w-4 text-brand-rose border-gray-300 rounded focus:ring-brand-rose" />
              <label htmlFor="is_published" className="ml-2 text-sm text-gray-900">Publikálva</label>
            </div>
            <button type="submit" disabled={status === 'saving'} className="btn-primary flex items-center gap-2">
              {status === 'saving' ? <SpinnerIcon /> : null}
              {status === 'saving' ? 'Mentés...' : 'Változások mentése'}
            </button>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {imageSrc && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-2xl p-4 w-full max-w-lg">
              <h3 className="font-serif text-xl mb-4">Borítókép vágása</h3>
              <div className="relative h-96">
                <Cropper image={imageSrc} crop={crop} zoom={zoom} aspect={16 / 9} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} />
              </div>
              <div className="flex justify-end gap-4 mt-4">
                <button onClick={() => setImageSrc(null)} className="px-6 py-2 rounded-full text-gray-700 bg-gray-200">Mégse</button>
                <button onClick={showCroppedImage} className="px-6 py-2 rounded-full text-white bg-brand-rose">Kép vágása</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
