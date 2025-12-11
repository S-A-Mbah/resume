'use client';

import { FC, useRef, useCallback } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import Image from 'next/image';

interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      icon: string;
      description: string;
    }>;
  }>;
}

interface DailyForecastProps {
  forecast: ForecastData;
  units: 'metric' | 'imperial';
}

const DailyForecast: FC<DailyForecastProps> = ({ forecast }) => {
  const { theme } = useTheme();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const containerWidth = scrollContainerRef.current.offsetWidth;
    const scrollAmount = containerWidth * 0.25;
    
    const newScrollPosition = scrollContainerRef.current.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount);
    
    scrollContainerRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  // Function to check if the scroll container has reached the end
  const isAtEnd = useCallback(() => {
    if (!scrollContainerRef.current) return false;
    const { scrollLeft, scrollWidth, offsetWidth } = scrollContainerRef.current;
    return Math.abs(scrollLeft + offsetWidth - scrollWidth) < 10; // Within 10px of the end
  }, []);

  const nextDayForecasts = (forecast?.list || [])
    .slice(0, 8)
    .map(item => {
      const date = new Date(item.dt * 1000);
      const now = new Date();
      const isToday = date.getDate() === now.getDate();
      const time = date.toLocaleTimeString([], { 
        hour: '2-digit',
        hour12: true 
      });
      const day = isToday ? 'Today' : date.toLocaleDateString([], { weekday: 'short' });
      
      return {
        ...item,
        displayTime: `${day} ${time}`
      };
    });

  return (
    <div className="mt-4 -mx-4">
      <h3 className={`font-medium mb-3 px-4 ${
        theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
      }`}>24-Hour Forecast</h3>
      <div className="relative group px-4">
        <div className="w-full overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-scroll scrollbar-hide gap-1 scroll-smooth pb-2"
          >
            {nextDayForecasts.map((item) => (
              <div 
                key={item.dt}
                className={`flex-none w-[calc(25%-3px)] min-w-[70px] max-w-[85px]
                         flex flex-col items-center p-1.5 rounded-lg border
                         ${theme === 'dark'
                           ? 'bg-slate-600/30 border-slate-500/50'
                           : 'bg-white/60 border-slate-200'}`}
              >
                <span className={`text-[10px] leading-tight whitespace-nowrap ${
                  theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
                }`}>
                  {item.displayTime}
                </span>
                <div className="relative w-8 h-8 my-0.5 flex items-center justify-center">
                  <div className={`absolute inset-0 rounded-full transition-colors duration-200 ${
                    theme === 'dark' ? 'bg-white/20' : 'bg-slate-700/10'
                  }`} />
                  <Image 
                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                    alt={item.weather[0].description || 'weather icon'}
                    width={50}
                    height={50}
                    unoptimized={true}
                    className="relative z-10 drop-shadow-sm scale-150"
                  />
                </div>
                <span className={`text-xs font-medium ${
                  theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {Math.round(item.main.temp)}°
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => scroll('left')}
          className={`absolute left-0 top-1/2 -translate-y-1/2
                   p-1 rounded-full shadow-lg border
                   opacity-0 group-hover:opacity-100 transition-opacity
                   disabled:opacity-0
                   ${theme === 'dark'
                     ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                     : 'bg-white/80 border-slate-200 hover:bg-white'
                   }`}
          disabled={scrollContainerRef.current?.scrollLeft === 0}
          aria-label="Scroll left"
        >
          <svg className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`} 
               xmlns="http://www.w3.org/2000/svg" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => scroll('right')}
          className={`absolute right-0 top-1/2 -translate-y-1/2
                   p-1 rounded-full shadow-lg border
                   opacity-0 group-hover:opacity-100 transition-opacity
                   disabled:opacity-0
                   ${theme === 'dark'
                     ? 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                     : 'bg-white/80 border-slate-200 hover:bg-white'
                   }`}
          disabled={isAtEnd()}
          aria-label="Scroll right"
        >
          <svg className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`} 
               xmlns="http://www.w3.org/2000/svg" 
               fill="none" 
               viewBox="0 0 24 24" 
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default DailyForecast; 