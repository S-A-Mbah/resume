'use client';

import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function Loading() {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className={`fixed inset-0 bg-gradient-to-br ${
        theme === 'dark' 
          ? 'from-slate-800 via-slate-700 to-slate-800' 
          : 'from-white via-blue-50 to-white'
        } transition-colors duration-500`} />
      
      <div className="fixed inset-0">
        <div className={`absolute inset-0 bg-[url('/weather-pattern.png')] ${
          theme === 'dark' ? 'opacity-[0.04]' : 'opacity-[0.02]'
        }`} />
        <div className={`absolute inset-0 bg-gradient-to-b ${
          theme === 'dark'
            ? 'from-slate-800/50 to-transparent' 
            : 'from-white/50 to-transparent'
        }`} />
      </div>
      
      <motion.div 
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 
                         border-3 border-slate-200 border-t-blue-500" />
            <div className="absolute inset-0 rounded-full 
                         animate-pulse border-3 border-transparent" />
          </div>
        </div>
        
        <h2 className={`text-xl font-medium ${
          theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
        }`}>
          Loading Weather App
        </h2>
        <p className={`text-sm ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
        } mt-2`}>
          Fetching the latest weather data for you...
        </p>
      </motion.div>
    </div>
  );
} 