import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { extractText, slugify } from '../utils/markdown';

const ShareButtons = () => {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = typeof document !== 'undefined' ? document.title : '';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* ignore */ }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
      <span style={{ fontFamily: 'var(--primary-font)', fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Share</span>
      <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ padding: '6px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--primary-font)', fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}><path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>
        X
      </a>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" className="share-btn" style={{ padding: '6px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--primary-font)', fontSize: '0.78rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></svg>
        LinkedIn
      </a>
      <button type="button" onClick={copyLink} className="share-btn" style={{ padding: '6px 14px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--primary-font)', fontSize: '0.78rem', color: copied ? 'var(--primary-color)' : 'var(--text-secondary)', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
        {copied ? 'Copied!' : 'Copy link'}
      </button>
    </div>
  );
};

const PostBody = ({ content, older, newer }) => {
  return (
    <motion.article
      className="post-article"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="prose">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
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

      {/* Share buttons */}
      <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
        <ShareButtons />
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
  );
};

export default PostBody;
