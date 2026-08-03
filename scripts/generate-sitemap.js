// Generates sitemap.xml + rss.xml from Supabase posts table before deploy.
// Run automatically via `predeploy` hook. Falls back to static entries if Supabase is unreachable.
import { createClient } from '@supabase/supabase-js';
import { writeFileSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(__dirname, '..', 'public');

const SITE = 'https://0xrupeshsardar.github.io';
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

async function fetchSlugs() {
  if (!supabaseUrl || !supabaseKey) return [];
  try {
    const sb = createClient(supabaseUrl, supabaseKey);
    const { data } = await sb
      .from('posts')
      .select('slug, title, excerpt, date, tag')
      .eq('published', true)
      .order('date', { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

async function main() {
  const posts = await fetchSlugs();
  const staticUrls = [
    { loc: `${SITE}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${SITE}/blog`, priority: '0.8', changefreq: 'weekly' },
  ];
  const postUrls = posts.map(p => ({
    loc: `${SITE}/post/${p.slug}`,
    priority: '0.6',
    changefreq: 'monthly',
    lastmod: p.date,
  }));

  // sitemap.xml
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].map(u => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  writeFileSync(resolve(publicDir, 'sitemap.xml'), sitemap.trim() + '\n');
  console.log(`✓ sitemap.xml generated (${staticUrls.length + postUrls.length} URLs)`);

  // rss.xml
  const items = posts.map(p => `    <item>
      <title>${p.title}</title>
      <link>${SITE}/post/${p.slug}</link>
      <description>${p.excerpt || ''}</description>${p.tag ? `\n      <category>${p.tag}</category>` : ''}
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <guid>${SITE}/post/${p.slug}</guid>
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>0xRupesh — Security Research &amp; Insights</title>
    <link>${SITE}</link>
    <description>Security Researcher specializing in exploit development, reverse engineering, penetration testing, red teaming, and application security.</description>
    <language>en-us</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  writeFileSync(resolve(publicDir, 'rss.xml'), rss.trim() + '\n');
  console.log(`✓ rss.xml generated (${posts.length} posts)`);
}

main().catch(err => { console.error('sitemap generation failed:', err.message); process.exit(0); });