import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogCard = ({ title, excerpt, date, readTime, slug }) => {
  return (
    <Link to={`/post/${slug}`}>
      <motion.article
        className="group card-tech p-6 transition-all"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative z-10 flex gap-4">
          <img src="https://media.giphy.com/media/R03zWv5p1oNS4d61GR/giphy.gif" alt="" className="w-20 h-20 rounded-lg object-cover shrink-0 border border-violet-200/50" />
          <div className="min-w-0">
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            <time dateTime={date}>{date}</time>
            <span>•</span>
            <span>{readTime}</span>
          </div>

          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {title}
          </h2>

          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
            {excerpt}
          </p>

          <span className="mt-3 inline-flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 font-medium">
            Read more
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;
