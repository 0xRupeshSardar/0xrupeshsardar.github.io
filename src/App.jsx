import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import SolarSystem from './components/SolarSystem';

const BlogPostWrapper = () => {
  const { slug } = useParams();
  return <BlogPost key={slug} />;
};

function App() {
  return (
    <Router basename="/">
      <SolarSystem />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/post/:slug" element={<BlogPostWrapper />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
