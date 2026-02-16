import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ title, excerpt, date, readTime, slug }) => {
  return (
    <Link to={`/post/${slug}`}>
      <motion.article
        className="group relative overflow-hidden rounded-2xl glass-effect p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
        whileHover={{ 
          y: -8, 
          scale: 1.02,
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            <time dateTime={date}>{date}</time>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {title}
          </h2>

          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-3">
            {excerpt}
          </p>

          <motion.div
            className="mt-6 inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium"
            whileHover={{ x: 5 }}
          >
            Read more
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.div>
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </motion.article>
    </Link>
  );
};

export default BlogCard;
