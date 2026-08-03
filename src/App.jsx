import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Blog from './pages/Blog';
import SolarSystem from './components/SolarSystem';

// Lazy-load heavy pages — markdown/supabase code only loads when needed
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

const BlogPostWrapper = () => {
  const { slug } = useParams();
  return <BlogPost key={slug} />;
};

function App() {
  return (
    <Router basename="/">
      <SolarSystem />
      <AnimatePresence mode="wait">
        <Suspense fallback={<div style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/post/:slug" element={<BlogPostWrapper />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </Router>
  );
}

export default App;
