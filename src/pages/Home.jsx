import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import Typewriter from '../components/Typewriter';
import Counter from '../components/Counter';
import posts from '../data/posts';

const skills = [
  { file: 'aws', name: 'AWS', color: '#FF9900' },
  { file: 'caido', name: 'Caido', color: '#8ecb00' },
  { file: 'azure', name: 'Azure', color: '#0078D4' },
  { file: 'kali', name: 'Kali', color: '#367BF0' },
  { file: 'wireshark', name: 'Wireshark', color: '#00BFFF' },
  { file: 'postman', name: 'Postman', color: '#FF6C37' },
  { file: 'burp', name: 'Burp Suite', color: '#FF6633' },
  { file: 'python', name: 'Python', color: '#FFD43B' },
  { file: 'owasp-zap', name: 'OWASP ZAP', color: '#7CB342' },
  { file: 'nmap', name: 'Nmap', color: '#4FC3F7' },
  { file: 'linux', name: 'Linux', color: '#FCC624' },
  { file: 'ghidraa', name: 'Ghidra', color: '#C17A38' },
  { file: 'go', name: 'Go', color: '#00ADD8' },
  { file: 'docker', name: 'Docker', color: '#2496ED' },
  { file: 'tenb', name: 'Tenable', color: '#00A4E4' },
  { file: 'metasploite', name: 'Metasploit', color: '#E74C3C' },
  { file: 'mitmproxy', name: 'Mitmproxy', color: '#4CAF50' },
];

const heroTechs = ['AWS', 'GCP', 'Caido', 'Kali Linux', 'Wireshark', 'Postman', 'Burp Suite', 'Python', 'OWASP ZAP', 'Nmap', 'Linux', 'Ghidra', 'Go', 'Docker', 'Tenable', 'Metasploit', 'mitmproxy'];

const stats = [
  { value: 4, label: 'Years Experience' },
  { value: 9, label: 'Companies Hacked' },
  { value: 35, label: 'Vulnerabilities Discovered' },
  { value: 2, label: 'Certifications Achieved' },
  { value: 0, label: 'CVEs Assigned' },
];

// Recent Activity is derived from blog posts — it updates automatically when a new post is added.
const activityFeed = posts
  .slice()
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 5)
  .map(p => ({
    slug: p.slug,
    date: new Date(p.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    text: `Published — ${p.title}`,
  }));

const expertise = [
  { title: 'API Security Testing', desc: 'In-depth testing to uncover vulnerabilities in APIs and secure data transmission.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}><path d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
  { title: 'Web Application Security', desc: 'Identifying and patching vulnerabilities like authentication bypasses and business logic flaws.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" /></svg> },
  { title: 'Network Security Audits', desc: 'Assessing network infrastructure to ensure robust security measures.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}><path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> },
  { title: 'Cloud Security', desc: 'Ensuring secure configurations and policies for cloud platforms like AWS and Azure.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}><path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg> },
  { title: 'Red Team Operations', desc: 'Simulating advanced attack scenarios to identify and strengthen weak points in systems.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
  { title: 'Vulnerability Assessment', desc: 'Comprehensive analysis of applications and systems to discover complex security risks.', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ width: 28, height: 28 }}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
];

const education = [
  { date: 'Early 2027', title: 'Offensive Security Certified Professional (OSCP)', org: 'Offensive Security', upcoming: true },
  { date: 'Sept 2026', title: 'Certified Penetration Testing Specialist (CPTS)', org: 'Hack The Box', upcoming: true },
  { date: 'Aug 2021 – Jul 2023', title: "Master's in Computer Science", org: 'Visva-Bharati' },
  { date: 'Jan 2017 – Dec 2020', title: "Bachelor's in Computer Science", org: 'Visva-Bharati' },
];

const experience = [
  {
    period: 'May 2025 - Present',
    title: 'Security Researcher (Contract · NDA)',
    bullets: [
      'Exploit development & vulnerability research',
      'Reverse engineering of proprietary binaries',
      'Full-scope penetration testing',
      'Red team operations & adversary simulation',
      'Secure code review & patch verification',
    ],
  },
  {
    period: 'Apr 2024 - Aug 2024',
    title: 'Malware Analyst (Contract · NDA)',
    bullets: [
      'Malware reverse engineering & triage',
      'YARA rule authoring & detection tuning',
      'Threat actor TTP identification',
    ],
  },
  {
    period: 'Jul 2020 - Oct 2021',
    title: 'Security Engineer',
    bullets: [
      'Full-time penetration testing & security assessments',
      'Web application & API vulnerability assessments',
      'Security advisory & remediation guidance',
    ],
  },
];

const socialLinksContact = [
  { label: 'GitHub', handle: '@0xRupeshSardar', href: 'https://github.com/0xRupeshSardar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 26, height: 26 }}><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg> },
  { label: 'LinkedIn', handle: '@rupesh-sardar', href: 'https://linkedin.com/in/rupesh-sardar', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 26, height: 26 }}><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></svg> },
  { label: 'X (Twitter)', handle: '@0xRupesh', href: 'https://x.com/0xRupesh', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 26, height: 26 }}><path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg> },
  { label: 'Instagram', handle: '@0xrupesh', href: 'https://www.instagram.com/0xrupesh/', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 26, height: 26 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg> },
];

// ASCII profile art (shown until a real profile photo is added at /images/profile.webp)
const ASCII_ART = `................................-----+++++++++++++-.................................................
.....................................----+++++++++++++--............................................
...........................................---+++++++++++++--.......................................
........................................---..-.--+++++++++++++++-...................................
.....................................-+++++####++++######++++++++++---..............................
..................................--+######################+++++++++++++--..........................
..............................-+-+###########################++++++++++++++++--.....................
............................+---########++------------+++#######+-----+++++++++++---..............--
...........................-++########+------..-----------++#######......----++++++++---.......--+++
........................-.-+#+######++--........-...-------+++#####++.........-----++++++++---+++++-
......................-.-+++########---...........-..-------++#####+++-............---++++++++++--..
....................-++#+##########+--................------+++######++.................---++--.....
.....................--+-######+###+--..................-----+++#######+............................
..................---++-+++########+--...................-----++####+##+............................
.................-+++----##########---................---++--+++####+##+#---........................
.................-+-+---++#########+-+++++----....---++####++-+++#######+-..........................
.................-------##########+-----+++++------+++++-+###+-++########++-........................
.................+.--..++########++#-..-.----#+++++#-------+-++-#########+---.......................
.................--.--+++########-----#++-++..----+-++------+++-+#########++-.......................
..................-.--++#########-----++++----#---++----+-------+#########++--......................
-.......--.......-..+#+++########+---------..-+...-+------------++##++######+-......................
.........--....-.----+++#########+-..........+......#-----......-+##+#####++++-.-...................
..........-...-..+-..+++#########++.........-.........-#++##...--###########+---....................
........--.....---...+++#########+---.....-..--.---+#----......--###########++--....................
...............-+-.--++#####+##+##+--.......--..-------.......-+-#########+-+#++.--.-...............
.........-......---++#############+--.........-+---+---......---+##########++#-++-..-...............
.........-.....-++++++#############+--.....------++++--++-------############++--++....-.............
.........-...---+---++##############+---+++-++++++++++#++++----#############++-+++.-....-...........
.........-..-++++##+++##############++----+------------------+######+#######++-..+---..-............
.............-.+-++++++##+++##########+---------+++++-------+###############+----+-.................
............---++##+#++++##############+-------------------+#######+########+##+-----...............
........-......++++#-++##################++--..----------+##############++###++++---.-..............
........-...-+++++######+#+++##########+++#------------++##################+#+++.---................
........-...+++.-+#++#################++++-+##+++################+###+#++####+#++...................
............-++--+-+#+#####+##########+++-----++++++++++###############+##+.##++-...--..............
...........--+++#+++++################+++------+++++++++##############+#++++++#+--..................
....-------++++#+++###################++++-------+++++++########+#######+#++##+++....--.............
..---+++++++++++++++###################+++-----------++##########+#++##++##++##++++--...............
---+++++++++#####+#++##++###############++-----------++################+#####+#+##+++---............
---+-+++++++++#+#####+##################+++++-------+###########+#########++##++##+#+-++--..........
+--+++++++####++#+#+####################++++#+++++####++#######+##############++##+#++#-++--........
+++-+-+++++##++++###+###++#####+++####+++++++++++++#+#+++++######+++########++++##+++#+++-+---......
+++++++++++###++##+##+#++#####-++++##++++++++++++++++##+++++######++####+##+###+###+##++++++----....
-+##++++++++##+-++#+##++-++###..++++#+++++++++++++++#++++++#####+##+##+#+++##++##+###++#++++++--....
-++#++++#++###++++--##++-.-+++..+-++++#++++++++-++++#++++++#+++####+##++-+--+#+#####++#++++++-------
++++#+#+#+++##++---#+++---+-+--+++++++#+#++++++++++++++++++#++++#+++##---.--+#++#####+++#++++-++----
+++++###+#+++#-...---........-.---#+++#++++++++++++#++++++#++++++#++##+--..--##########+++++++------
++++++##+#++##+-----.--.-.-..-.--+++++##++++++++++++++++++#+++++##++-##+-----#########++++++++-+----
++##+++###+++#----..--..-.--.-...-.#+++#++++++++++++++++++#+++++#++++##++++++#########+++++++++++++-
++#++#####+++#+..--.--.-......--..+##++#+++-++++++++++++++++++++##+++##++++++########+#+++++++++++++
+++++##+##++##+-..-----++++------++##+++####+##+#+++++++++#+++#+##+++##++++++########+++++++++++++++
+++++++###++##++-+++++-+------.--++###++#++#+#+##+#++++++++++++#+++++###++++##########++++++++++++++
+++#++####+###++-+++-++++-+-----++++##+++##+###++##+++++++##+#++++++###+++++#########+#+++++++++++++
++++##########+++-++++#+--.-..--++++###++######+#+#+++++##+####+#+++###+++++#############+++++++++++
+++++#########+++--++----+--.---+++++###++#####+###++-++#+####+++++####+++++#############+++++++++++
++++#+########+++.-+++.-....----++++++###+########++##++#+####+++++####++++################+++++++++
++++#++##########++.+........++------------##..###++++++.#####++++####+++++###############++++++++++
++++#############+++#+++++-++++++----------##....+-+-++###-+.+.-+#####+++######-++############+#++++
+++++############+###+++++++++-+++++++++++##....#++++...####+++++####+++++#####++++++######+++++++++
++++#################++++++++++++++++++++######++++++++#####++++####+++++######++++++-+#######++++++
++++################++++++++++++++++++++++####++++++++#####+++++#####+++++######+++---++#########+++

`;

const Home = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    // Replace with Formspree/API endpoint for real submission
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSent(false), 4000);
    }, 600);
  };

  return (
    <Layout>
      {/* ── HERO SECTION ── */}
      <section style={{ paddingTop: '16px', paddingBottom: '24px' }}>
        <div className="container">
          <div className="section-box">
            <div className="section-box-inner">
              <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '5fr 6fr', alignItems: 'end', padding: '48px 48px 48px 0' }}>
                {/* Image column — framed profile picture */}
                <div className="hero-image-col" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '48px' }}>
                  <div style={{ position: 'relative', width: 'clamp(220px, 26vw, 340px)', aspectRatio: '1 / 1' }}>
                    {/* Frame + image/placeholder */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-lg)',
                      overflow: 'hidden',
                      background: 'var(--bg-card)',
                      containerType: 'inline-size',
                    }}>
                      {!imgError ? (
                        <img
                          src="/images/profile.webp"
                          alt="0xRupesh"
                          onError={() => setImgError(true)}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(var(--primary-color-rgb),0.08), rgba(var(--primary-color-rgb),0.02))' }}>
                          <pre className="ascii-art" aria-label="0xRupesh ASCII art">{ASCII_ART}</pre>
                        </div>
                      )}
                    </div>
                    {/* Viewfinder corner brackets */}
                    {[
                      { top: -1, left: -1, borderTop: '2px solid var(--primary-color)', borderLeft: '2px solid var(--primary-color)', borderRadius: 'var(--radius-lg) 0 0 0' },
                      { top: -1, right: -1, borderTop: '2px solid var(--primary-color)', borderRight: '2px solid var(--primary-color)', borderRadius: '0 var(--radius-lg) 0 0' },
                      { bottom: -1, left: -1, borderBottom: '2px solid var(--primary-color)', borderLeft: '2px solid var(--primary-color)', borderRadius: '0 0 0 var(--radius-lg)' },
                      { bottom: -1, right: -1, borderBottom: '2px solid var(--primary-color)', borderRight: '2px solid var(--primary-color)', borderRadius: '0 0 var(--radius-lg) 0' },
                    ].map((s, i) => (
                      <span key={i} style={{ position: 'absolute', width: '24px', height: '24px', ...s }} />
                    ))}
                  </div>
                </div>

                {/* Content column */}
                <div style={{ padding: '0 48px' }}>
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="typewriter" style={{ marginBottom: '8px' }}>
                      <h1 style={{ fontSize: '0.95rem', fontWeight: 500 }}>Hey, I'm 0xRupesh</h1>
                    </div>

                    <div className="hero-typewriter" style={{ marginBottom: '20px' }}>
                      <h1 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontWeight: 500, lineHeight: 1.1 }}>
                        a <span className="text-gradient">{'{'}<Typewriter texts={['Security Researcher', 'Penetration Tester', 'Bug Bounty Hunter', 'Red Teamer', 'Kernel Security', 'Ethical Hacker', 'Cloud Security Analyst', 'Code Review', 'Vulnerability Researcher', 'Exploit Development']} speed={70} delay={2200} hideCursor />{'}'}</span><span className="flicker">_</span>
                      </h1>
                    </div>

                    <p style={{ fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '32px', maxWidth: '550px' }}>
                      I specialize in <span className="text-gradient">exploit development</span>, <span className="text-gradient">reverse engineering</span>, <span className="text-gradient">penetration testing</span>, <span className="text-gradient">red teaming</span>, and <span className="text-gradient">application security</span>. I'm passionate about vulnerability research, binary analysis, operating system internals, and offensive security.
                    </p>
                    <p style={{ fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '32px', maxWidth: '550px' }}>
                      This website contains my research, technical blogs, write-ups, tools, and experiments as I continue exploring cybersecurity and sharing what I learn.
                    </p>

                    {/* Mini tech typewriter */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                      <span style={{ fontSize: '0.9rem', color: 'var(--primary-color)', fontFamily: 'var(--primary-font)', fontWeight: 500 }}>$</span>
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontFamily: 'var(--primary-font)' }}>
                        <Typewriter texts={heroTechs} speed={80} delay={1500} />
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <div className="section-box" style={{ position: 'relative' }}>
            <div className="stats-row">
              {stats.map((stat, i) => (
                <motion.div key={i} className="stat-item" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <svg className="stat-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <div className="stat-number">
                    <Counter end={stat.value} />{stat.value > 0 && <span className="stat-plus">+</span>}
                  </div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </div>
            <div className="bg-overlay" />
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGIES / SKILLS ── */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <div className="section-box" style={{ position: 'relative', background: 'var(--bg-dark)' }}>
            <div style={{ position: 'relative', zIndex: 1, padding: '48px 0' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div className="section-label" style={{ justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <span>Technologies</span>
                </div>
                <h3 style={{ fontWeight: 500 }}>My Skills</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                <div className="marquee-track" style={{ borderTop: 'none', borderBottom: 'none', padding: '12px 0', width: '100%' }}>
                  <div className="marquee-content">
                    {[...skills.slice(0, 9), ...skills.slice(0, 9), ...skills.slice(0, 9)].map((s, i) => (
                      <span key={i} className="skill-marquee-item" style={{ boxShadow: `inset 2px 0 0 ${s.color}` }}><img src={`/images/${s.file}.png`} alt={s.name} />{s.name}</span>
                    ))}
                  </div>
                </div>
                <div className="marquee-track" style={{ borderTop: 'none', borderBottom: 'none', padding: '12px 0', width: '85%', margin: '0 auto' }}>
                  <div className="marquee-content">
                    {[...skills.slice(9), ...skills.slice(9), ...skills.slice(9)].map((s, i) => (
                      <span key={i} className="skill-marquee-item" style={{ boxShadow: `inset 2px 0 0 ${s.color}` }}><img src={`/images/${s.file}.png`} alt={s.name} />{s.name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AREAS OF EXPERTISE ── */}
      <section style={{ padding: '48px 0' }}>
        <div className="container">
          <div className="section-box">
            <div className="section-box-inner" style={{ padding: '40px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div className="section-label" style={{ justifyContent: 'center' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <span>Areas of Expertise</span>
                </div>
                <h3 style={{ fontWeight: 500 }}>
                  Explore my key areas of<br />
                  <span style={{ color: 'var(--text-muted)' }}>cybersecurity knowledge</span>
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {expertise.map((item, i) => (
                  <motion.div key={i} className="service-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    {item.icon}
                    <h6>{item.title}</h6>
                    <p>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION & EXPERIENCE ── */}
      <section style={{ padding: '32px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Education & Certifications */}
            <div className="section-box" style={{ position: 'relative' }}>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 28, height: 28, color: 'var(--primary-color)' }}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" /></svg>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 500, margin: 0 }}>Education & Certifications</h2>
                </div>
                <div className="timeline">
                  {education.map((item, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-date">{item.date}{item.upcoming ? ' · Upcoming' : ''}</div>
                      <div className="timeline-title" style={item.upcoming ? { color: 'var(--text-muted)' } : {}}>{item.title}</div>
                      <div className="timeline-subtitle">{item.org}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-overlay" />
            </div>

            {/* Experience */}
            <div className="section-box" style={{ position: 'relative' }}>
              <div style={{ padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 28, height: 28, color: 'var(--primary-color)' }}><path d="M10 2l2 4 4 .5-3 3 .75 4.5L10 12l-3.75 2L7 9.5l-3-3L8 6z" /><path d="M5.5 14l-2 2" /><path d="M18.5 14l2 2" /><path d="M12 18v4" /></svg>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 500, margin: 0 }}>Experience</h2>
                </div>
                <div className="timeline">
                  {experience.map((item, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-title">{item.title}</div>
                      <div className="timeline-date" style={{ marginBottom: '6px' }}>{item.period}</div>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        {item.bullets.map((b, j) => (
                          <li key={j} style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--secondary-font)', lineHeight: 1.45, display: 'flex', gap: '8px', paddingLeft: '2px' }}>
                            <span style={{ color: 'var(--primary-color)' }}>›</span> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-overlay" />
            </div>
          </div>
        </div>
      </section>

      {/* ── RECENT ACTIVITY ── */}
      <section style={{ padding: '32px 0 64px' }}>
        <div className="container">
            <div className="section-box" style={{ position: 'relative' }}>
              <div style={{ padding: '32px' }}>
                <div className="section-label" style={{ marginBottom: '24px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}><path d="M12 8v4l3 3M12 21a9 9 0 100-18 9 9 0 000 18z" /></svg>
                  <span>Recent Activity</span>
                </div>
                <div className="timeline">
                  {activityFeed.map((item, i) => (
                    <Link key={i} to={`/post/${item.slug}`} className="timeline-item activity-link">
                      <div className="timeline-date">{item.date}</div>
                      <div className="timeline-subtitle">{item.text}</div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-overlay" />
            </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '64px 0', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '48px', alignItems: 'start' }}>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <h3 style={{ color: 'var(--primary-color)', marginBottom: '24px', fontWeight: 500, fontSize: '1.3rem' }}>Let's connect</h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-heading)' }}>Name</label>
                  <input className="form-input" placeholder="Your Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-heading)' }}>Email</label>
                  <input className="form-input" type="email" placeholder="Your Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
                </div>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-heading)' }}>Subject</label>
                <input className="form-input" placeholder="Subject" value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '8px', color: 'var(--text-heading)' }}>Message</label>
                <textarea className="form-input" rows={3} placeholder="Your Message" style={{ resize: 'vertical' }} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} required />
              </div>
              <button className="btn-primary-2" type="submit" disabled={sending} style={{ opacity: sending ? 0.7 : 1 }}>
                {sent ? 'Sent!' : sending ? 'Sending...' : 'Send Message'}
                {!sent && !sending && <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>}
              </button>
            </form>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {socialLinksContact.map(({ label, handle, href, icon }) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'} className="social-card">
                  <div className="social-card-icon">{icon}</div>
                  <div>
                    <div className="social-card-label">{label}</div>
                    <div className="social-card-handle">{handle}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
