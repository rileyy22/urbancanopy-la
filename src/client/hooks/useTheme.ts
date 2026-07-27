import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

/**
 * Custom hook to determine the current theme setting based on user system preferences.
 *
 * @returns The current theme setting, either 'light' or 'dark'.
 */
const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );
    setTheme(darkModeMediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) =>
      setTheme(e.matches ? 'dark' : 'light');
    darkModeMediaQuery.addEventListener(
      'change',
      handleChange
    );

    return () => {
      darkModeMediaQuery.removeEventListener(
        'change',
        handleChange
      );
    };
  }, []);

  return theme;
};

export default useTheme;
