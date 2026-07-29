import { useState, useEffect } from 'react';
import { fetchComments, postComment } from '../utils/api';
import { isSupabaseEnabled } from '../utils/supabase';

const Comments = ({ postSlug }) => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchComments(postSlug).then(setComments);
  }, [postSlug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !body.trim()) return;
    setSubmitting(true);
    setError(false);
    const { error } = await postComment(postSlug, name.trim(), body.trim());
    if (error) {
      setError(true);
    } else {
      setBody('');
      fetchComments(postSlug).then(setComments);
    }
    setSubmitting(false);
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid var(--border-color)' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '24px' }}>
        Comments {comments.length > 0 && <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>({comments.length})</span>}
      </h3>

      {/* Comment list */}
      {comments.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '24px' }}>
          {isSupabaseEnabled ? 'No comments yet. Be the first to share your thoughts.' : 'Comments are disabled (database not configured).'}
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          {comments.map(c => (
            <div key={c.id} style={{ padding: '16px 20px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontFamily: 'var(--primary-font)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-heading)' }}>{c.author}</span>
                <span style={{ fontFamily: 'var(--primary-font)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{formatDate(c.created_at)}</span>
              </div>
              <p style={{ fontFamily: 'var(--secondary-font)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{c.body}</p>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      {isSupabaseEnabled && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input
            className="form-input"
            placeholder="Your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={{ maxWidth: '300px' }}
          />
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