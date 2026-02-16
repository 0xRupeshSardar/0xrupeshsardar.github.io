import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import TechBackground from '../components/TechBackground';

const About = () => {
  const skills = [
    { name: 'React & Next.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'Tailwind CSS', level: 92 },
    { name: 'System Design', level: 85 },
    { name: 'Cybersecurity', level: 87 },
  ];

  const experience = [
    {
      role: 'Senior Full Stack Developer',
      company: 'Tech Corp',
      period: '2024 - Present',
      description: 'Leading development of enterprise-scale applications with modern tech stack.',
    },
    {
      role: 'Software Engineer',
      company: 'StartupXYZ',
      period: '2022 - 2024',
      description: 'Built scalable web applications and contributed to architectural decisions.',
    },
    {
      role: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2020 - 2022',
      description: 'Created responsive and performant user interfaces for various clients.',
    },
  ];

  return (
    <Layout>
      <TechBackground />
      
      <div className="max-w-5xl mx-auto px-6">
        {/* Header Section */}
        <motion.section
          className="py-16 md:py-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              RS
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              About{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                Me
              </span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Hi, I'm <strong className="text-zinc-900 dark:text-zinc-50">Rupesh Sardar</strong>, a passionate software engineer 
              specializing in building exceptional digital experiences. I focus on creating scalable, 
              secure, and user-friendly applications using modern technologies.
            </motion.p>
          </div>

          {/* Bio */}
          <motion.div
            className="glass-effect rounded-2xl p-8 md:p-12 mb-16 border border-zinc-200/50 dark:border-zinc-800/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              My Journey
            </h2>
            <div className="space-y-4 text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <p>
                With over 5 years of experience in software development, I've had the privilege of working 
                on diverse projects ranging from enterprise applications to startup MVPs. My journey in tech 
                started with a curiosity about how things work, which evolved into a passion for creating 
                elegant solutions to complex problems.
              </p>
              <p>
                I believe in writing clean, maintainable code and staying updated with the latest industry 
                trends. When I'm not coding, you'll find me exploring new technologies, contributing to 
                open source, or sharing knowledge through technical writing.
              </p>
            </div>
          </motion.div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-xl p-6 border border-zinc-200/50 dark:border-zinc-800/50"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {skill.name}
                  </span>
                  <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-600 to-blue-600 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          className="mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
            Experience
          </h2>

          <div className="space-y-6">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-2xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Contact CTA */}
        <motion.section
          className="text-center py-16 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-effect rounded-2xl p-12 border border-zinc-200/50 dark:border-zinc-800/50">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
              Let's Connect
            </h2>
            <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl mx-auto">
              Interested in collaborating or just want to say hi? Feel free to reach out!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href="mailto:hello@rupeshsardar.dev"
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
              
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 glass-effect hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View GitHub
              </motion.a>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default About;
