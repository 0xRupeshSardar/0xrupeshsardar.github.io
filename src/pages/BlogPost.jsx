import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import PostHeader from '../components/PostHeader';
import PostBody from '../components/PostBody';
import posts from '../data/posts';
import { decryptContent, encryptContent } from '../utils/crypto';
import 'highlight.js/styles/tokyo-night-dark.css';
import unlockedCache from '../data/unlockCache';

// In-memory password store — survives navigation but NOT reloads
const sessionPasswords = new Map();

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? (el.scrollTop / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="reading-progress" style={{ width: `${progress}%` }} />;
};

const CodeBlock = ({ children }) => {
  const [copied, setCopied] = useState(false);
  const ref = useRef(null);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ref.current?.innerText || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked — ignore */ }
  };
  return (
    <div className="code-block">
      <button type="button" className={`code-copy${copied ? ' copied' : ''}`} onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      <pre ref={ref}>{children}</pre>
    </div>
  );
};


const BlogPost = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [locked, setLocked] = useState(false);
  const [encryptedData, setEncryptedData] = useState(null);
  const [activeId, setActiveId] = useState('');

  /* eslint-disable react-hooks/set-state-in-effect -- fetch/decrypt on mount */
  useEffect(() => {
    if (!post) return;

    if (post.private) {
      const savedPassword = sessionPasswords.get(slug);

      const fetchAndDecrypt = (source, password) => {
        fetch(source)
          .then(r => r.text())
          .then(async (data) => {
            const enc = data.trim();
            setEncryptedData(enc);
            if (password) {
              const decrypted = await decryptContent(enc, password);
              if (decrypted) { setContent(decrypted); setLoading(false); return; }
              sessionPasswords.delete(slug);
              unlockedCache.delete(slug);
            }
            setLocked(true);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      };

      if (savedPassword && unlockedCache.has(slug)) {
        if (post.encryptedSource) {
          fetchAndDecrypt(post.encryptedSource, savedPassword);
        } else if (post.inlineEncrypted) {
          setEncryptedData(post.inlineEncrypted);
          decryptContent(post.inlineEncrypted, savedPassword).then(dec => {
            if (dec) { setContent(dec); setLoading(false); return; }
            sessionPasswords.delete(slug);
            unlockedCache.delete(slug);
            setLocked(true); setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } else if (post.encryptedSource) {
        fetchAndDecrypt(post.encryptedSource, null);
      } else if (post.inlineEncrypted) {
        setEncryptedData(post.inlineEncrypted);
        setLocked(true);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } else if (post.source) {
      fetch(post.source)
        .then(r => r.text())
        .then(text => { setContent(text); setLoading(false); })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug, post]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleUnlock = async (password) => {
    if (!encryptedData) { return false; }
    const decrypted = await decryptContent(encryptedData, password);
    if (decrypted) {
      setContent(decrypted);
      sessionPasswords.set(slug, password);
      unlockedCache.set(slug);
      setLocked(false);
      return true;
    }
    return false;
  };

  // Table of contents from markdown headings (h2/h3)
  const toc = useMemo(() => {
    if (!content) return [];
    const items = [];
    for (const line of content.split('\n')) {
      const m = line.match(/^(#{2,3})\s+(.+?)\s*#*$/);
      if (m) {
        const text = m[2].replace(/[*_`~]/g, '').trim();
        items.push({ level: m[1].length, text, id: slugify(text) });
      }
    }
    return items;
  }, [content]);

  // Scroll spy — highlight the TOC entry for the heading currently in view
  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveId(e.target.id); });
    }, { rootMargin: '-80px 0px -70% 0px' });
    toc.forEach((h) => { const el = document.getElementById(h.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [toc]);

  // Prev / next posts (by date)
  const { newer, older } = useMemo(() => {
    const sorted = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
    const idx = sorted.findIndex(p => p.slug === slug);
    return { newer: idx > 0 ? sorted[idx - 1] : null, older: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1] : null };
  }, [slug]);

  const formattedDate = post ? new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

  if (!post) {
    return (
      <Layout>
        <ReadingProgress />
        <div className="post-layout" style={{ gridTemplateColumns: '1fr', maxWidth: 860, textAlign: 'center' }}>
          <div className="post-article">
            <h2 style={{ marginBottom: '16px' }}>Post Not Found</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>The post you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn-primary-2">Back to Blog</Link>
          </div>
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout>
        <ReadingProgress />
        <div className="post-layout" style={{ gridTemplateColumns: '1fr', maxWidth: 900 }}>
          <div className="post-article" style={{ opacity: 0.55 }}>
            <div style={{ height: '20px', background: 'var(--bg-card)', borderRadius: '4px', width: '40%', marginBottom: '20px' }} />
            <div style={{ height: '44px', background: 'var(--bg-card)', borderRadius: '4px', width: '85%', marginBottom: '28px' }} />
            {[100, 100, 100, 92, 100, 78].map((w, i) => (
              <div key={i} style={{ height: '14px', background: 'var(--bg-card)', borderRadius: '4px', marginBottom: '14px', width: `${w}%` }} />
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (locked) {
    return (
      <Layout>
        <ReadingProgress />
        <div className="post-layout" style={{ gridTemplateColumns: '1fr', maxWidth: 860 }}>
          <div className="post-main">
            <PostHeader post={post} formattedDate={formattedDate} locked={true} onUnlock={handleUnlock} />
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ReadingProgress />
      <div className="post-layout">
        {toc.length > 0 && (
          <aside className="post-toc">
            <div className="post-toc-label">Contents</div>
            <nav>
              {toc.map(h => (
                <a key={h.id} href={`#${h.id}`} className={`post-toc-link${activeId === h.id ? ' active' : ''}`} style={h.level === 3 ? { paddingLeft: 24 } : {}}>{h.text}</a>
              ))}
            </nav>
          </aside>
        )}

        <div className="post-main">
          <PostHeader post={post} formattedDate={formattedDate} />
          <PostBody content={content} older={older} newer={newer} />
        </div>
      </div>
    </Layout>
  );
};

// Expose encryptContent on window for author use — dev only
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  window.encryptBlogPost = async (text, password) => {
    const encrypted = await encryptContent(text, password);
    console.log('--- Encrypted content ---');
    console.log(encrypted);
    console.log('--- Save this to a .enc file or use as inlineEncrypted ---');
    return encrypted;
  };
}

export default BlogPost;