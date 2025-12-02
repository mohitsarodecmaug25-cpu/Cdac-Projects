import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDark));
    document.body.className = isDark ? 'dark-theme' : 'light-theme';
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      primary: '#1a1a2e',
      secondary: '#16213e',
      background: isDark ? '#2d2d2d' : '#f8f9fa',
      surface: isDark ? '#404040' : '#ffffff',
      text: isDark ? '#f5f5f5' : '#1a1a2e',
      textMuted: isDark ? '#cccccc' : '#6c757d',
      border: isDark ? '#666666' : '#e0e0e0',
      accent: '#533483',
      success: '#2d5016',
      warning: '#8b4513',
      danger: '#722f37',
      info: '#2f4f4f'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};