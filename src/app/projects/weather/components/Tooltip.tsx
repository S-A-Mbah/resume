'use client';

import { FC, ReactNode, useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface TooltipProps {
  children: ReactNode;
  content: string;
  width?: string;
}

const Tooltip: FC<TooltipProps> = ({ children, content, width = 'max-w-xs' }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block"
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}
         onFocus={() => setIsVisible(true)}
         onBlur={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-4  
                ${width} text-xs leading-relaxed min-w-[280px]
                ${theme === 'dark' 
                  ? 'bg-slate-800 text-slate-200 border-slate-700' 
                  : 'bg-white text-slate-600 border-slate-200'}
                rounded-md shadow-lg border backdrop-blur-sm z-50`}>
          {content}
          <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 
                        w-2 h-2 rotate-45 border-b border-r
                        ${theme === 'dark'
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-white border-slate-200'}`} />
        </div>
      )}
    </div>
  );
};

export default Tooltip; 