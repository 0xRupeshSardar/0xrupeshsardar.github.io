const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/rupesh-sardar',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></svg>,
  },
  {
    label: 'X',
    href: 'https://twitter.com/0xRupeshSardar',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}><path d="M4 4l11.733 16h4.267l-11.733 -16l-4.267 0" /><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" /></svg>,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/0xRupeshSardar',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/0xrupesh/',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
  },
];

import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ padding: '32px 24px', textAlign: 'center' }}>
        {/* Logo */}
        <div style={{ fontFamily: 'var(--primary-font)', fontWeight: 600, fontSize: '1.2rem', marginBottom: '16px' }}>
          0xRupesh
        </div>

        {/* Social Icons */}
        <div className="footer-social" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '24px' }}>
          {socialLinks.map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" title={label}>
              {icon}
            </a>
          ))}
        </div>

        {/* Navigation */}
        <div className="footer-nav" style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
          {navLinks.map(({ label, path }) => (
            <Link key={label} to={path}>{label}</Link>
          ))}
          <a href="#contact" onClick={(e) => {
            e.preventDefault();
            if (window.location.pathname === '/') {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            } else {
              window.location.href = '/#contact';
            }
          }}>Contact</a>
        </div>

        {/* Copyright */}
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--secondary-font)' }}>
          &copy; {currentYear} 0xRupesh. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
