// app/sitemap.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function sitemap() {
  const baseUrl = 'https://laceeskuvok.hu/';

  // 1. Statikus oldalak
  const staticRoutes = [
    '',
    '/velemenyek',
    '/velemeny-iras',
    '/kapcsolat',
    '/info',
    '/blog'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // 2. Dinamikus blog bejegyzések lekérése
  const { data: posts } = await supabase
    .from('blog')
    .select('slug, updated_at, created_at')
    .eq('is_published', true);

  const blogRoutes = (posts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    // Ha beállítottuk az updated_at-et, használjuk azt, különben a created_at-et
    lastModified: post.updated_at || post.created_at || new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}