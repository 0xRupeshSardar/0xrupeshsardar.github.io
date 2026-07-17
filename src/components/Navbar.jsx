import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Blog', path: '/blog' },
];

const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleContactClick = (e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close mobile menu on navigation
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const headingColor = 'var(--text-heading)';

  return (
    <header style={{ position: 'relative', zIndex: 999 }}>
      <div className="container" style={{ position: 'relative' }}>
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: scrolled ? '64px' : '72px',
          marginTop: '16px',
          padding: '0 24px',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          background: scrolled ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg)',
          backdropFilter: 'blur(20px)',
          transition: 'all 300ms ease',
          position: 'relative',
          width: '100%',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'var(--primary-font)',
              fontWeight: 600,
              fontSize: '1.1rem',
              color: headingColor,
            }}>
              0xRupesh
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="nav-desktop" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {navLinks.map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                style={{
                  fontFamily: 'var(--primary-font)',
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  color: location.pathname === path ? headingColor : 'var(--text-secondary)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.color = headingColor}
                onMouseLeave={e => {
                  if (location.pathname !== path) e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                {label}
              </Link>
            ))}
            <button onClick={toggleTheme} className="theme-toggle" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
            <a href="#contact" onClick={handleContactClick} style={{
              padding: '6px 16px',
              background: 'linear-gradient(135deg, var(--primary-color), var(--gradient-color))',
              color: 'var(--bg-dark)',
              borderRadius: 'var(--radius-sm)',
              fontFamily: 'var(--primary-font)',
              fontSize: '0.8rem',
              fontWeight: 500,
              transition: 'all 200ms ease',
              textDecoration: 'none',
              cursor: 'pointer',
            }}>
              Contact
            </a>
          </div>

          {/* Hamburger button */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: '5px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 1001,
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '2px',
                background: headingColor,
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: menuOpen && i === 0 ? 'rotate(45deg) translate(5px, 5px)' : menuOpen && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'var(--nav-mobile-overlay)',
        backdropFilter: 'blur(20px)',
        zIndex: 998,
        display: menuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
      }}>
        {navLinks.map(({ label, path }) => (
          <Link
            key={label}
            to={path}
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: 'var(--primary-font)',
              fontSize: '1.5rem',
              fontWeight: 500,
              color: location.pathname === path ? headingColor : 'var(--text-secondary)',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            {label}
          </Link>
        ))}
        <button onClick={toggleTheme} className="theme-toggle" style={{ padding: '10px', marginTop: '8px' }} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          <span style={{ marginLeft: '8px', fontSize: '0.9rem', fontFamily: 'var(--primary-font)' }}>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <a
          href="#contact"
          onClick={handleContactClick}
          style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg, var(--primary-color), var(--gradient-color))',
            color: 'var(--bg-dark)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--primary-font)',
            fontSize: '1rem',
            fontWeight: 500,
            textDecoration: 'none',
            marginTop: '8px',
            cursor: 'pointer',
          }}
        >
          Contact
        </a>
      </div>
    </header>
  );
};

export default Navbar;
