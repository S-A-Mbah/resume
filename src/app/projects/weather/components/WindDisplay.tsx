'use client';

import { FC } from 'react';
import { useTheme } from '../../../context/ThemeContext';

interface WindDisplayProps {
  speed: number;
  deg: number;
  gust?: number;
  units: 'metric' | 'imperial';
}

const WindDisplay: FC<WindDisplayProps> = ({ speed, deg, gust, units }) => {
  const { theme } = useTheme();
  
  const getWindDirection = (deg: number): string => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 
                       'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(deg / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Compass circle */}
      <div className={`relative w-20 h-20 flex items-center justify-center 
                    ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}
                    rounded-full border shadow-inner`}>
        {/* Cardinal direction markers */}
        <div className="absolute inset-0">
          <span className={`absolute top-2 left-1/2 -translate-x-1/2 text-[10px] ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>N</span>
          <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>S</span>
          <span className={`absolute left-2 top-1/2 -translate-y-1/2 text-[10px] ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>W</span>
          <span className={`absolute right-2 top-1/2 -translate-y-1/2 text-[10px] ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>E</span>
        </div>
        
        {/* Compass marks */}
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/2 w-[1px] h-2 -translate-x-1/2 ${
            theme === 'dark' ? 'bg-white/20' : 'bg-slate-200'
          }`}></div>
          <div className={`absolute bottom-0 left-1/2 w-[1px] h-2 -translate-x-1/2 ${
            theme === 'dark' ? 'bg-white/20' : 'bg-slate-200'
          }`}></div>
          <div className={`absolute left-0 top-1/2 w-2 h-[1px] -translate-y-1/2 ${
            theme === 'dark' ? 'bg-white/20' : 'bg-slate-200'
          }`}></div>
          <div className={`absolute right-0 top-1/2 w-2 h-[1px] -translate-y-1/2 ${
            theme === 'dark' ? 'bg-white/20' : 'bg-slate-200'
          }`}></div>
        </div>
        
        {/* Direction arrow */}
        <div 
          className="w-12 h-12 relative transform transition-transform duration-200"
          style={{ transform: `rotate(${deg}deg)` }}
        >
          <svg 
            viewBox="0 0 24 24" 
            className={`w-full h-full fill-current ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-500'
            }`}
          >
            <path d="M12 2L8 11H16L12 2Z" />
            <circle cx="12" cy="12" r="2" className={
              theme === 'dark' ? 'text-blue-300' : 'text-blue-400'
            } />
          </svg>
        </div>
      </div>

      {/* Wind information */}
      <div className="text-center">
        <div className={`font-medium text-lg ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          {Math.round(speed)} {units === 'metric' ? 'm/s' : 'mph'}
        </div>
        <div className={`text-sm ${
          theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
        }`}>
          {getWindDirection(deg)}
        </div>
        {gust && (
          <div className={`text-sm mt-1 ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Gusts up to {Math.round(gust)} {units === 'metric' ? 'm/s' : 'mph'}
          </div>
        )}
      </div>
    </div>
  );
};

export default WindDisplay; 