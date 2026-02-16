import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import BlogPost from './pages/BlogPost';

function App() {
  return (
    <Router basename="/">
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:slug" element={<BlogPost />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
