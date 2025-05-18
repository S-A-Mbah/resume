"use client";

import Calculator from './components/Calculator';
import Link from 'next/link';
import { useTheme } from '../../context/ThemeContext';
import { useEffect, useState } from 'react';

export default function CalculatorPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Add mounted state to prevent initial layout shift
  useEffect(() => {
    // Simulate loading time for the calculator
    const timer = setTimeout(() => {
      setMounted(true);
    }, 300); // Short delay to ensure smooth transition
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative">
      <Link 
        href="/#projects" 
        className={`fixed top-4 left-4 flex items-center gap-2 px-4 py-2 rounded-full ${
          theme === 'dark' 
            ? 'bg-[#112240] text-[#64ffda] border border-[#64ffda]/20 hover:border-[#64ffda]/70 hover:shadow-[0_0_10px_rgba(100,255,218,0.3)]' 
            : 'bg-white text-blue-600 border border-blue-500/20 hover:bg-blue-50'
        } transition-all duration-300 shadow-md z-10`}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Resume
      </Link>
      
      <div className="text-center w-full mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Calculator</h1>
        
        {/* Loading spinner shown before calculator is mounted */}
        {!mounted && (
          <div className="flex justify-center items-center h-[400px]">
            <div className={`${theme === 'dark' ? 'text-[#64ffda]' : 'text-blue-500'}`}>
              <svg className="animate-spin h-12 w-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        )}

        {/* Calculator shown after component is mounted */}
        <div className={`flex justify-center transition-opacity duration-500 ease-in-out ${mounted ? 'opacity-100' : 'opacity-0 absolute pointer-events-none'}`}>
          <Calculator />
        </div>
      </div>
    </div>
  );
} 