import { useState, useCallback, useLayoutEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState('light');

  const onChangeTheme = useCallback(() => {
    const curTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(curTheme);
    localStorage.setItem('theme', curTheme);
  }, [theme]);

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  return { theme, onChangeTheme };
};
