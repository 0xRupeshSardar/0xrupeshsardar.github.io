/* eslint-disable react-refresh/only-export-components -- hook + context file, not a component module */
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
};

export { ThemeContext };