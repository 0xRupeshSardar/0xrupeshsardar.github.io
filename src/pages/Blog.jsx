import { motion } from 'framer-motion';
import BlogCard from '../components/BlogCard';
import Layout from '../components/Layout';
import TechBackground from '../components/TechBackground';

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      title: 'Building Modern Web Applications with React and Tailwind CSS',
      excerpt: 'Explore the powerful combination of React and Tailwind CSS to build beautiful, responsive, and performant web applications. Learn best practices, design patterns, and optimization techniques.',
      date: 'February 16, 2026',
      readTime: '8 min read',
      slug: 'building-modern-web-apps'
    },
    // You can add more blog posts here
  ];

  return (
    <Layout>
      <TechBackground />
      
      <div className="max-w-6xl mx-auto px-6">
        {/* Header Section */}
        <motion.section
          className="py-16 md:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6 text-sm font-medium text-primary-600 dark:text-primary-400"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Technical Blog
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Latest{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Insights
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Thoughts on development, design, and technology. Deep dives into modern web development practices and innovations.
            </motion.p>
          </div>
        </motion.section>

        {/* Blog Posts Grid */}
        <motion.section
          className="py-12 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <BlogCard {...post} />
              </motion.div>
            ))}
          </div>

          {/* Empty State if no posts */}
          {blogPosts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-6">
                <svg className="w-10 h-10 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
                No posts yet
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Check back soon for new content!
              </p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </Layout>
  );
};

export default Blog;
