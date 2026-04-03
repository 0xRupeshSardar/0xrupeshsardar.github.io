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
      
      <div className="max-w-4xl mx-auto px-6">
        <motion.section
          className="pt-24 pb-12 flex flex-col md:flex-row md:items-center gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">Blog</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Thoughts on development, design, and technology.
            </p>
          </div>
          <img
            src="https://media.giphy.com/media/3o7TKsQ8MJHyTASOry/giphy.gif"
            alt="Code"
            className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border border-violet-200/50 dark:border-violet-600/30"
          />
        </motion.section>

        <motion.section
          className="pb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 gap-6">
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
              <img
                src="https://media.giphy.com/media/26n7b7PjSOZJwvAtW/giphy.gif"
                alt="Coding"
                className="w-32 h-32 mx-auto mb-6 rounded-2xl object-cover"
              />
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
