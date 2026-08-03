// Encrypts a markdown file and inserts it as a private blog post in Supabase.
// Usage: node --env-file=.env scripts/publish-private-post.js <slug> <title> <markdown-file> <password>
// Example: node --env-file=.env scripts/publish-private-post.js my-private-post "My Secret Post" ./post.md hunter2

import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const [slug, title, markdownPath, password] = process.argv.slice(2);

if (!slug || !title || !markdownPath || !password) {
  console.error('Usage: node scripts/publish-private-post.js <slug> <title> <markdown-file> <password>');
  process.exit(1);
}

// AES-256-GCM encryption using Web Crypto API (via Node 22 global crypto)
const SALT = new TextEncoder().encode('0xrupesh-blog-salt-v1');
const ITERATIONS = 100000;

async function deriveKey(pass) {
  const keyMaterial = await crypto.subtle.importKey('raw', new TextEncoder().encode(pass), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: SALT, iterations: ITERATIONS, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt']
  );
}

async function encryptContent(plaintext, password) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(password);
  const encoded = new TextEncoder().encode(plaintext);
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);
  return Buffer.from(combined).toString('base64');
}

async function main() {
  const content = readFileSync(markdownPath, 'utf-8');
  const encrypted = await encryptContent(content, password);

  const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);

  const { data, error } = await supabase
    .from('posts')
    .upsert({
      slug,
      title,
      excerpt: 'This post is encrypted. Enter the password to read it.',
      content: null,
      is_private: true,
      encrypted_src: encrypted,
      published: true,
      tag: 'Private',
      date: new Date().toISOString().split('T')[0],
      read_time: '5 min',
    })
    .select('id');

  if (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }

  console.log('✓ Private post published successfully!');
  console.log(`  Slug: ${slug}`);
  console.log(`  Title: ${title}`);
  console.log(`  Encrypted content: ${encrypted.substring(0, 60)}...`);
  console.log(`  Password: ${password}`);
  console.log(`  URL: https://0xrupeshsardar.github.io/post/${slug}`);
}

main().catch(err => { console.error('Failed:', err.message); process.exit(1); });