import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import TechBackground from '../components/TechBackground';
import StatCard from '../components/StatCard';

const Home = () => {
  const stats = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      label: 'Security',
      value: '98%',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      label: 'Performance',
      value: '99.9%',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      label: 'Projects',
      value: '24',
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      label: 'Quality',
      value: 'A+',
    },
  ];

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Modern Stack',
      description: 'React, Vite, Tailwind — fast & maintainable.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Security First',
      description: 'Best practices for reliable apps.',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Fast & Optimized',
      description: 'Code splitting, lazy loading.',
    },
  ];

  return (
    <Layout>
      <TechBackground />

      <div className="max-w-5xl mx-auto px-6">
        {/* Hero with GIF */}
        <motion.section
          className="pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col md:flex-row md:items-center md:justify-between gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex-1">
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-sm font-medium mb-6 border border-violet-200/50 dark:border-violet-700/50"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Building in public
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-zinc-900 dark:text-zinc-50">Hi, I'm </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 dark:from-violet-400 dark:via-fuchsia-400 dark:to-cyan-400">
                Rupesh
              </span>
            </h1>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 max-w-xl">
              Software engineer writing about development, security, and building things on the web.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/blog">
                <motion.button
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read blog
                </motion.button>
              </Link>
              <Link to="/about">
                <motion.button
                  className="px-6 py-3 border-2 border-violet-300/60 dark:border-violet-500/40 text-violet-700 dark:text-violet-300 font-medium rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  About me
                </motion.button>
              </Link>
            </div>
          </div>
          {/* Fun GIF */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
              <img
                src="https://media.giphy.com/media/Ll22OhMLAlVDb8UQWe/giphy.gif"
                alt="Coding"
                className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl object-cover border-2 border-white/20 dark:border-zinc-600/50 shadow-xl"
              />
            </div>
          </motion.div>
        </motion.section>

        {/* Stats with mini GIFs */}
        <motion.section
          className="py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <img src="https://media.giphy.com/media/13GIgrGdslD9oQ/giphy.gif" alt="" className="w-16 h-16 rounded-lg object-cover" />
            <img src="https://media.giphy.com/media/1msUUPpzwsguI/giphy.gif" alt="" className="w-16 h-16 rounded-lg object-cover" />
            <img src="https://media.giphy.com/media/l0HlNaQ6gWfllOxDO/giphy.gif" alt="" className="w-16 h-16 rounded-lg object-cover" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} delay={0.1 * i} />
            ))}
          </div>
        </motion.section>

        {/* Features */}
        <motion.section
          className="py-16 mb-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            What I focus on
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">Tech stack & philosophy</p>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => {
              const gifs = [
                'https://media.giphy.com/media/2Ygy0khwewLdMS3KHm/giphy.gif',
                'https://media.giphy.com/media/KEYQOgB5cL2Hi/giphy.gif',
                'https://media.giphy.com/media/3o7abKhOpu0NwenH3O/giphy.gif',
              ];
              return (
              <motion.div
                key={i}
                className="card-tech p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={gifs[i]} alt="" className="w-12 h-12 rounded-lg object-cover border border-violet-200/50" />
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400 border border-violet-200/50 dark:border-violet-500/20">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default Home;
