import { useState, useEffect } from 'react';
import { ThemeContext } from '../hooks/useTheme';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'light' ? '#e8ebf2' : '#8ecb00';
  }, [theme]);

  useEffect(() => {
    requestAnimationFrame(() => {
      document.documentElement.classList.add('transition-ready');
    });
  }, []);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};