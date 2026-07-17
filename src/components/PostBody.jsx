import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { extractText, slugify } from '../utils/markdown';

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
