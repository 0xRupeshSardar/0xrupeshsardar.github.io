import { supabase, isSupabaseEnabled } from './supabase';
import localPosts from '../data/posts';

// ── Blog Posts ──────────────────────────────────────────────
// Fetches published posts from Supabase, falls back to local posts.js if not configured

export async function fetchPosts() {
  if (!isSupabaseEnabled) return localPosts;
  const { data, error } = await supabase
    .from('posts')
    .select('slug, title, excerpt, date, read_time, tag, is_private, encrypted_src')
    .eq('published', true)
    .order('date', { ascending: false });
  if (error || !data || data.length === 0) return localPosts;
  // Map DB columns to the shape the frontend expects
  return data.map(p => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || '',
    date: p.date,
    readTime: p.read_time || '5 min',
    tag: p.tag || '',
    private: p.is_private || false,
    encryptedSource: p.encrypted_src || null,
  }));
}

export async function fetchPostContent(slug) {
  if (!isSupabaseEnabled) return null;
  const { data } = await supabase
    .from('posts')
    .select('content, is_private, encrypted_src')
    .eq('slug', slug)
    .eq('published', true)
    .single();
  return data;
}

// ── Comments ────────────────────────────────────────────────

export async function fetchComments(postSlug) {
  if (!isSupabaseEnabled) return [];
  const { data, error } = await supabase
    .from('comments')
    .select('id, author, body, created_at')
    .eq('post_slug', postSlug)
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function postComment(postSlug, author, body) {
  if (!isSupabaseEnabled) return { error: 'Comments require database setup' };
  const { error } = await supabase
    .from('comments')
    .insert({ post_slug: postSlug, author, body });
  return { error };
}

// ── Analytics ───────────────────────────────────────────────

export async function logPageView(path, slug = null) {
  if (!isSupabaseEnabled) return;
  try {
    await supabase.from('page_views').insert({ path, slug });
  } catch { /* analytics should never break the page */ }
}