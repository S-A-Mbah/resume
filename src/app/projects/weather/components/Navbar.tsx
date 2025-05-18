'use client';

import { useTheme } from '../../../context/ThemeContext';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="border-b border-white/10 dark:bg-slate-900 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold dark:text-white text-slate-900">
              Weather Dashboard
            </h1>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg dark:bg-white/10 bg-slate-100 
                     dark:text-white text-slate-900 
                     dark:hover:bg-white/20 hover:bg-slate-200
                     transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 