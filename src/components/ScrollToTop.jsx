import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollUp}
          aria-label="Scroll to top"
          style={{
            position: 'fixed',
            bottom: '32px',
            right: '32px',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            border: '1px solid var(--border-color)',
            background: 'var(--scroll-btn-bg)',
            backdropFilter: 'blur(12px)',
            color: 'var(--primary-color)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 900,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 20, height: 20 }}><path d="M5 15l7-7 7 7" /></svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
