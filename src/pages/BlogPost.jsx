import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
/* rehype-raw removed for security — re-enable only with DOMPurify if raw HTML in markdown is needed */
import remarkGfm from 'remark-gfm';
import Layout from '../components/Layout';
import posts from '../data/posts';
import { decryptContent, encryptContent } from '../utils/crypto';
import 'highlight.js/styles/tokyo-night-dark.css';
import unlockedCache from '../data/unlockCache';

// In-memory password store — survives navigation but NOT reloads
const sessionPasswords = new Map();

const slugify = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

const extractText = (node) => {
  if (node == null || node === false) return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (typeof node === 'object' && node.props) return extractText(node.props.children);
  return '';
};

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

const PasswordGate = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const ok = await onUnlock(password);
    if (!ok) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px 0' }}>
      <div style={{
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px 32px',
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
        background: 'var(--bg-dark)',
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)', background: 'var(--bg-card)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 24, height: 24, color: 'var(--primary-color)' }}>
            <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 500, marginBottom: '8px' }}>Protected Post</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '28px' }}>
          This post is encrypted. Enter the password to decrypt.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            className="form-input"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ marginBottom: '16px', textAlign: 'center' }}
            autoFocus
          />
          {error && (
            <p style={{ fontSize: '0.8rem', color: '#ef4444', marginBottom: '12px' }}>Wrong password. Try again.</p>
          )}
          <button className="btn-primary-2" type="submit" disabled={loading || !password} style={{ width: '100%', justifyContent: 'center', opacity: !password ? 0.5 : 1 }}>
            {loading ? 'Decrypting...' : 'Unlock'}
          </button>
        </form>
      </div>
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
          <motion.div className="post-article" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="post-meta">
              <time>{formattedDate}</time>
              <span>·</span>
              <span>{post.readTime} read</span>
              <span>·</span>
              <span style={{ color: 'var(--primary-color)' }}>Encrypted</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', margin: '8px 0 4px', lineHeight: 1.15 }}>{post.title}</h1>
            <PasswordGate onUnlock={handleUnlock} />
          </motion.div>
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

        <motion.article className="post-article" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <header className="post-header" style={{ marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
            <div className="post-meta">
              {post.tag && !post.private && <span className="post-tag">{post.tag}</span>}
              <time>{formattedDate}</time>
              <span>·</span>
              <span>{post.readTime} read</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', lineHeight: 1.15, margin: '8px 0 0' }}>{post.title}</h1>
            {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
          </header>
          <div className="prose">
            {content ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  pre: CodeBlock,
                  h2: ({ children }) => <h2 id={slugify(extractText(children))}>{children}</h2>,
                  h3: ({ children }) => <h3 id={slugify(extractText(children))}>{children}</h3>,
                  img: ({ src, alt }) => (
                    <img src={src} alt={alt} style={{ borderRadius: 'var(--radius-lg)', margin: '32px 0', width: '100%', display: 'block' }} loading="lazy" />
                  ),
                  a: ({ href, children }) => (
                    <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>{children}</a>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            ) : (
              <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '48px 0' }}>Content coming soon.</p>
            )}
          </div>

          {(older || newer) && (
            <nav className="post-nav">
              {older ? (
                <Link to={`/post/${older.slug}`} className="post-nav-item prev">
                  <span className="post-nav-dir">← Older</span>
                  <span className="post-nav-title">{older.title}</span>
                </Link>
              ) : <span />}
              {newer ? (
                <Link to={`/post/${newer.slug}`} className="post-nav-item next">
                  <span className="post-nav-dir">Newer →</span>
                  <span className="post-nav-title">{newer.title}</span>
                </Link>
              ) : <span />}
            </nav>
          )}

          <div style={{ marginTop: '40px' }}>
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--primary-color)', fontWeight: 600, fontSize: '0.9rem' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </motion.article>
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