import { motion } from 'framer-motion';
import { useState } from 'react';

const PostHeader = ({ post, formattedDate, locked, onUnlock }) => {
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
    <div className="post-header-card">
      <div className="post-meta">
        {post.tag && !post.private && <span className="post-tag">{post.tag}</span>}
        <time>{formattedDate}</time>
        <span>·</span>
        <span>{post.readTime} read</span>
        {locked && <><span>·</span><span style={{ color: 'var(--primary-color)' }}>Encrypted</span></>}
      </div>
      <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)', lineHeight: 1.15, margin: '8px 0 0' }}>
        {post.title}
      </h1>
      {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}

      {locked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginTop: '24px' }}
        >
          <div style={{
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 32px',
            maxWidth: '420px',
            width: '100%',
            textAlign: 'center',
            background: 'var(--bg-dark)',
            margin: '0 auto',
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
        </motion.div>
      )}
    </div>
  );
};

export default PostHeader;
