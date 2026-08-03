import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';

const NotFound = () => {
  return (
    <Layout>
      <div className="container" style={{ padding: '160px 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{
            fontFamily: 'var(--primary-font)',
            fontSize: 'clamp(4rem, 12vw, 8rem)',
            fontWeight: 600,
            lineHeight: 1,
            background: 'linear-gradient(135deg, var(--primary-color), var(--gradient-color))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '16px',
          }}>404</div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 500, marginBottom: '12px' }}>Page Not Found</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '32px', fontFamily: 'var(--secondary-font)', fontSize: '0.9rem' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary-2">← Back to Home</Link>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;