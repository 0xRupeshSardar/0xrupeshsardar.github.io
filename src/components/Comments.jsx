import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

const Comments = ({ postSlug }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!supabase) { setLoaded(true); return; }
    supabase
      .from('comments')
      .select('id, author, email, body, created_at, parent_id')
      .eq('post_slug', postSlug)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setComments(data || []); setLoaded(true); })
      .catch(() => setLoaded(true));
  }, [postSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;
    setSubmitting(true);
    setError(false);
    try {
      const { error: err } = await supabase.from('comments').insert({
        post_slug: postSlug,
        author: name.trim(),
        email: email.trim() || null,
        body: body.trim(),
        user_agent: navigator.userAgent,
      });
      if (err) throw err;
      setBody('');
      setEmail('');
      supabase
        .from('comments')
        .select('id, author, email, body, created_at, parent_id')
        .eq('post_slug', postSlug)
        .order('created_at', { ascending: false })
        .then(({ data }) => setComments(data || []));
    } catch {
      setError(true);
    }
    setSubmitting(false);
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '24px', fontFamily: 'var(--primary-font)' }}>
        Comments {comments.length > 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({comments.length})</span>}
      </h3>

      {/* Comment list */}
      {loaded && comments.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px', fontFamily: 'var(--secondary-font)' }}>
          No comments yet. Be the first to share your thoughts.
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {comments.map(c => (
            <div key={c.id} style={{ padding: '16px 20px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '28px', height: '28px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary-color), var(--gradient-color))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--primary-font)', fontSize: '0.75rem', fontWeight: 600, color: 'var(--bg-dark)',
                  }}>
                    {c.author.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontFamily: 'var(--primary-font)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-heading)' }}>{c.author}</span>
                  {c.email && <span style={{ fontFamily: 'var(--primary-font)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>· {c.email}</span>}
                </div>
                <span style={{ fontFamily: 'var(--primary-font)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{formatDate(c.created_at)}</span>
              </div>
              <p style={{ fontFamily: 'var(--secondary-font)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{c.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      {supabase && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '600px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <input
              className="form-input"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <input
              className="form-input"
              type="email"
              placeholder="Email (optional)"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ flex: 1 }}
            />
          </div>
          <textarea
            className="form-input"
            placeholder="Share your thoughts…"
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={3}
            style={{ resize: 'vertical' }}
            required
          />
          {error && <p style={{ fontSize: '0.8rem', color: '#ef4444' }}>Failed to post comment. Please try again.</p>}
          <button className="btn-primary-2" type="submit" disabled={submitting || !name.trim() || !body.trim()} style={{ opacity: !name.trim() || !body.trim() ? 0.5 : 1, alignSelf: 'flex-start' }}>
            {submitting ? 'Posting…' : 'Post Comment'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Comments;