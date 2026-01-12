
import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-zinc-900 dark:to-zinc-950 transition-all duration-500">
      <Calculator theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
};

export default App;
