import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import posts from '../data/posts';
import unlockedCache from '../data/unlockCache';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

// Gradient + icon placeholder shown where a post thumbnail would go
const PostGraphic = ({ post, size = 44 }) => (
  <div style={{
    width: '100%', height: '100%',
    background: post.private
      ? 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(239,68,68,0.02))'
      : 'linear-gradient(135deg, rgba(var(--primary-color-rgb),0.10), rgba(var(--primary-color-rgb),0.03))',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }}>
    {post.private ? (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} style={{ width: size, height: size, color: 'var(--text-muted)', opacity: 0.4 }}>
        <path d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1} style={{ width: size, height: size, color: 'var(--text-muted)', opacity: 0.4 }}>
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    )}
  </div>
);

const tagStyle = (post) => post.private && !unlockedCache.has(post.slug)
  ? { background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }
  : post.private && unlockedCache.has(post.slug)
    ? { background: 'rgba(var(--primary-color-rgb), 0.15)', border: '1px solid rgba(var(--primary-color-rgb), 0.3)' }
    : {};

const tagLabel = (post) => post.private ? (unlockedCache.has(post.slug) ? 'Unlocked' : 'Encrypted') : post.tag;

const Blog = () => {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');

  const tags = useMemo(() => {
    const set = new Set(posts.map(p => p.tag).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter(p => activeTag === 'All' || p.tag === activeTag)
      .filter(p => !q || p.title.toLowerCase().includes(q) || (p.excerpt || '').toLowerCase().includes(q));
  }, [query, activeTag]);

  const [featured, ...rest] = filtered;

  return (
    <Layout>
      <section style={{ paddingTop: '48px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="section-label" style={{ marginBottom: '8px' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>
            <span>Blog</span>
          </div>
          <h2 style={{ fontWeight: 500, fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '32px' }}>
            Security <span className="text-gradient">Insights</span> & Research
          </h2>

          {/* Search + tag filter */}
          <div style={{ marginBottom: '32px' }}>
            <input
              className="form-input blog-search"
              placeholder="Search posts…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <div className="blog-filter-chips">
              {tags.map(tag => (
                <button key={tag} className={`blog-chip ${activeTag === tag ? 'active' : ''}`} onClick={() => setActiveTag(tag)}>{tag}</button>
              ))}
            </div>
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)', fontFamily: 'var(--secondary-font)' }}>
              No posts found.
            </div>
          )}

          {/* Featured (newest) post */}
          {featured && (
            <Link to={`/post/${featured.slug}`} className="blog-featured">
              <div className="blog-featured-image"><PostGraphic post={featured} size={56} /></div>
              <div className="blog-featured-content">
                <span className="blog-tag-pill" style={tagStyle(featured)}>{tagLabel(featured)}</span>
                <div className="blog-card-date" style={{ marginTop: '12px' }}>{formatDate(featured.date)} · {featured.readTime}</div>
                <h3>{featured.title}</h3>
                <p className="blog-featured-excerpt">{featured.excerpt}</p>
                <span className="blog-card-readmore">Read more →</span>
              </div>
            </Link>
          )}

          {/* Remaining posts */}
          {rest.length > 0 && (
            <div className="blog-card-grid">
              {rest.map(post => (
                <Link to={`/post/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
                  <div className="blog-card">
                    <div className="blog-card-image">
                      <PostGraphic post={post} />
                      <div className="blog-card-tag" style={tagStyle(post)}>{tagLabel(post)}</div>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-card-date">{formatDate(post.date)} · {post.readTime}</div>
                      <div className="blog-card-title">{post.title}</div>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <span className="blog-card-readmore">Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;