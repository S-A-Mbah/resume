'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

export default function ClientNavbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleBackToResume = () => {
    // Use direct navigation instead of router.push
    window.location.href = '/';
  };

  return (
    <nav className={`relative z-50 border-b ${theme === 'dark' ? 'border-white/10 bg-slate-900' : 'border-slate-200 bg-white'}`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackToResume}
              className={`flex items-center text-sm font-medium transition-colors duration-200
                       ${theme === 'dark' ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <span className="mr-1">←</span> Back to Resume
            </button>
            <div className={`h-4 w-px ${theme === 'dark' ? 'bg-white/20' : 'bg-slate-300'} mx-2`}></div>
            <h1 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Weather Dashboard
            </h1>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className={`relative z-50 p-2 rounded-lg transition-colors duration-200 cursor-pointer
                     ${theme === 'dark' 
                       ? 'bg-white/10 text-white hover:bg-white/20' 
                       : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
} 