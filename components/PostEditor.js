'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { UploadCloud, ArrowLeft, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // A fenti fájlt importáljuk

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
  </motion.svg>
);

export default function PostEditor({ postToEdit }) {
  const router = useRouter();
  const [post, setPost] = useState({ title: '', slug: '', content: '', cover_image_url: '', is_published: false });
  
  // Képvágás state-ek
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
    
    // Slug automatikus generálása a címből, ha új poszt
    if (id === 'title' && !postToEdit) {
      newPost.slug = value.toLowerCase()
        .replace(/[áéíóöőúüű]/g, c => ({'á':'a','é':'e','í':'i','ó':'o','ö':'o','ő':'o','ú':'u','ü':'u','ű':'u'}[c]))
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
    setPost(newPost);
  };

  // Fájl kiválasztása -> olvasás -> vágó ablak megnyitása
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      // Reseteljük a korábbi vágást, ha újat választ
      setCroppedImageFile(null); 
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // Vágás véglegesítése
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      // Helyi előnézet frissítése
      setPost(prev => ({ ...prev, cover_image_url: croppedImage.url }));
      // Fájl mentése későbbi feltöltéshez
      setCroppedImageFile(croppedImage.file);
      // Vágó ablak bezárása
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
      
      // Ha van új, vágott képfájl, töltsük fel
      if (croppedImageFile) {
        const fileName = `${Date.now()}_cover.jpg`;
        // Fontos: Győződj meg róla, hogy a 'blog-images' bucket létezik a Supabase-en!
        const { data, error } = await supabase.storage
            .from('blog-images') 
            .upload(fileName, croppedImageFile, { upsert: true });
            
        if (error) throw error;
        
        // Publikus URL lekérése
        const publicUrlData = supabase.storage.from('blog-images').getPublicUrl(data.path);
        cover_image_url = publicUrlData.data.publicUrl;
      }

      const postData = { 
          title: post.title, 
          slug: post.slug, 
          content: post.content, 
          cover_image_url, 
          is_published: post.is_published,
          updated_at: new Date()
      };

      if (postToEdit) {
        const { error } = await supabase.from('blog').update(postData).eq('id', postToEdit.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog').insert([postData]);
        if (error) throw error;
      }
      
      router.push('/admin/blog');
      router.refresh();
      
    } catch (error) {
      console.error("Hiba a mentés során:", error);
      setStatus('error');
      alert("Hiba történt: " + error.message);
    }
  };

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result), false);
      reader.readAsDataURL(file);
    });
  }

  return (
    <>
      {/* Vissza gomb */}
      <div className="mb-6">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft size={20} /> Vissza a listához
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
        {/* Bal oldal: Élő előnézet (Sticky) */}
        <div className="lg:sticky top-8 h-fit order-2 lg:order-1">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 font-serif">Élő előnézet</h3>
          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
             {/* Kép */}
            <div className="relative aspect-video w-full bg-gray-100">
              {post.cover_image_url ? (
                <img src={post.cover_image_url} alt="Előnézet" className="w-full h-full object-cover" />
              ) : (
                <div className="h-full w-full flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon size={40} className="mb-2 opacity-50"/>
                    <span>Nincs borítókép</span>
                </div>
              )}
            </div>
            
            {/* Szöveg előnézet */}
            <div className="p-6">
                <h2 className="font-serif text-3xl text-[#5C5454] leading-tight mb-2 break-words">
                    {post.title || "Bejegyzés címe"}
                </h2>
                <div className="text-gray-500 text-sm mb-4">
                    {new Date().toLocaleDateString('hu-HU')}
                </div>
                <div className="text-gray-600 font-serif text-sm line-clamp-4 leading-relaxed">
                    {post.content || "Itt fog megjelenni a bejegyzésed szövege..."}
                </div>
            </div>
          </div>
        </div>

        {/* Jobb oldal: Szerkesztő */}
        <div className="bg-white rounded-xl shadow-md p-8 space-y-6 order-1 lg:order-2 h-fit">
          
          {/* Képfeltöltés */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Borítókép</label>
            <input type="file" ref={coverImageInputRef} onChange={onFileChange} accept="image/*" className="hidden" />
            <div 
                onClick={() => coverImageInputRef.current.click()} 
                className={`mt-1 flex flex-col justify-center items-center w-full h-40 px-6 border-2 border-dashed rounded-xl cursor-pointer transition-all ${post.cover_image_url ? 'border-brand-rose bg-rose-50' : 'border-gray-300 hover:bg-gray-50'}`}
            >
              {post.cover_image_url ? (
                  <div className="text-center">
                      <p className="text-brand-rose font-medium mb-1">Kép kiválasztva</p>
                      <p className="text-xs text-gray-500">Kattints a cseréhez</p>
                  </div>
               ) : (
                   <div className="text-center">
                       <UploadCloud className="mx-auto h-10 w-10 text-gray-400 mb-2" />
                       <p className="text-sm text-gray-500 font-medium">Kattints a feltöltéshez</p>
                   </div>
               )}
            </div>
          </div>

          {/* Cím */}
          <div className="relative">
            <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-1">Cím</label>
            <input 
                id="title" 
                value={post.title} 
                onChange={handleInputChange} 
                required 
                className="w-full h-12 border border-gray-300 rounded-lg px-4 focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose transition" 
                placeholder="Írd ide a címet..." 
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-bold text-gray-700 mb-1">Link (slug)</label>
            <input 
                type="text" 
                id="slug" 
                value={post.slug} 
                onChange={handleInputChange} 
                required 
                className="w-full h-10 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg px-4 focus:outline-none text-sm font-mono" 
            />
          </div>

          {/* Tartalom */}
          <div className="relative">
            <label htmlFor="content" className="block text-sm font-bold text-gray-700 mb-1">Tartalom</label>
            <textarea 
                id="content" 
                value={post.content} 
                onChange={handleInputChange} 
                required 
                rows="12" 
                className="w-full border border-gray-300 rounded-lg p-4 text-base font-mono focus:outline-none focus:border-brand-rose focus:ring-1 focus:ring-brand-rose transition leading-relaxed" 
                placeholder="# Címsor&#10;&#10;Itt kezdheted írni a bejegyzést..." 
            />
            <p className="text-xs text-gray-400 mt-2 text-right">Támogatott formátum: Markdown</p>
          </div>

          {/* Publikálás és Mentés */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <label className="flex items-center cursor-pointer">
              <input 
                id="is_published" 
                type="checkbox" 
                checked={post.is_published} 
                onChange={handleInputChange} 
                className="w-5 h-5 text-brand-rose border-gray-300 rounded focus:ring-brand-rose cursor-pointer" 
              />
              <span className="ml-2 text-sm font-medium text-gray-900">Publikálás azonnal</span>
            </label>
            
            <button type="submit" disabled={status === 'saving'} className="btn-primary flex items-center gap-2 px-6 py-2.5 shadow-lg">
              {status === 'saving' ? <SpinnerIcon /> : null}
              {status === 'saving' ? 'Mentés...' : 'Változások mentése'}
            </button>
          </div>
        </div>
      </form>

      {/* Képvágó Modális Ablak */}
      <AnimatePresence>
        {imageSrc && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl">
              <h3 className="font-serif text-2xl mb-4 text-gray-800">Kép igazítása</h3>
              <div className="relative h-[400px] w-full bg-gray-900 rounded-lg overflow-hidden">
                <Cropper 
                    image={imageSrc} 
                    crop={crop} 
                    zoom={zoom} 
                    aspect={16 / 9} // Szélesvásznú arány bloghoz
                    onCropChange={setCrop} 
                    onZoomChange={setZoom} 
                    onCropComplete={onCropComplete} 
                />
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                 <div className="flex-1">
                    <label className="text-xs text-gray-500 mb-1 block">Nagyítás</label>
                    <input
                      type="range"
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e) => setZoom(e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#B76E79]"
                    />
                 </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button 
                    onClick={() => { setImageSrc(null); setCroppedImageFile(null); }} 
                    className="px-6 py-2 rounded-full text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
                >
                    Mégse
                </button>
                <button 
                    onClick={showCroppedImage} 
                    className="px-8 py-2 rounded-full text-white bg-[#B76E79] hover:bg-[#a05a63] transition shadow-md"
                >
                    Kész, vágás
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}