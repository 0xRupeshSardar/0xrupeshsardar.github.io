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
      
      <div className="max-w-4xl mx-auto px-6">
        <motion.section
          className="pt-24 pb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8 mb-16">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border-2 border-violet-300/50 dark:border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400 text-2xl font-bold shrink-0">
                RS
              </div>
              <img src="https://media.giphy.com/media/Is1O1TWV0LEJn/giphy.gif" alt="" className="w-20 h-20 rounded-xl object-cover border border-violet-200/50 dark:border-violet-600/30 hidden sm:block" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-zinc-900 dark:text-zinc-50">About </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-cyan-500">me</span>
            </h1>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Hi, I'm <strong className="text-zinc-900 dark:text-zinc-50">Rupesh Sardar</strong>, a software engineer 
                building scalable, secure applications with modern technologies.
              </p>
            </div>
          </div>

          <motion.div
            className="card-tech p-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
              My Journey
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="card-tech p-5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {skill.name}
                  </span>
                  <span className="text-sm font-medium text-violet-600 dark:text-violet-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full"
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
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">
            Experience
          </h2>

          <div className="space-y-4">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                className="card-tech p-6"
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
          className="py-12 mb-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-tech p-8 text-center">
            <img src="https://media.giphy.com/media/l0MYt5jPR6QX5pnxG/giphy.gif" alt="" className="w-20 h-20 mx-auto mb-4 rounded-xl object-cover" />
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
              Let's connect
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-xl mx-auto">
              Interested in collaborating or just want to say hi?
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:hello@rupeshsardar.dev"
                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-medium rounded-xl hover:from-violet-500 hover:to-fuchsia-500 transition-all"
              >
                Get in Touch
              </a>
              
              <a
                href="https://github.com/0xRupeshSardar"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-violet-300/60 dark:border-violet-500/40 text-violet-700 dark:text-violet-300 font-medium rounded-xl hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </Layout>
  );
};

export default About;
