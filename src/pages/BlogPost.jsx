import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Layout from '../components/Layout';
import ScrollProgress from '../components/ScrollProgress';
import CodeBlock from '../components/CodeBlock';
import 'highlight.js/styles/tokyo-night-dark.css';

const BlogPost = () => {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the markdown content
    fetch('/content/posts/sample-post.md')
      .then(response => response.text())
      .then(text => {
        setContent(text);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading blog post:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-6 py-24">
          <div className="animate-pulse">
            <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 mb-12"></div>
            <div className="space-y-4">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollProgress />
      
      <motion.article
        className="max-w-3xl mx-auto px-6 py-12 md:py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            <time dateTime="2026-02-16">February 16, 2026</time>
            <span>•</span>
            <span>8 min read</span>
          </div>
        </motion.div>

        <motion.div
          className="prose-custom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
            components={{
              pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
              img: ({ src, alt }) => (
                <motion.img
                  src={src}
                  alt={alt}
                  className="rounded-xl shadow-lg my-8 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  loading="lazy"
                />
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline underline-offset-4 transition-colors"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {children}
                </a>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>
        </motion.div>
      </motion.article>
    </Layout>
  );
};

export default BlogPost;
