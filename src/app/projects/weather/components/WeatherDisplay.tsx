import { FC } from 'react';
import CircularGauge from './CircularGauge';
import WindDisplay from './WindDisplay';
import { useTheme } from '../../../context/ThemeContext';

interface WeatherDisplayProps {
  weatherData: {
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
      pressure: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    visibility: number;
    rain?: {
      "1h"?: number;
    };
  };
  units: 'metric' | 'imperial';
  onUnitChange: (unit: 'metric' | 'imperial') => void;
}

const WeatherDisplay: FC<WeatherDisplayProps> = ({ weatherData, units, onUnitChange }) => {
  const { theme } = useTheme();
  const { main, wind, weather, clouds, visibility, rain } = weatherData;
  
  const getWindDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  const formatVisibility = (visibility: number): string => {
    if (isNaN(visibility)) return 'Not available';
    
    const kmValue = visibility / 1000;
    return `${kmValue.toFixed(1)}km`;
  };

  const getVisibilityPercentage = (meters: number): number => {
    if (isNaN(meters)) return 0;
    
    const maxVisibility = 10000;
    const percentage = (meters / maxVisibility) * 100;
    return Math.min(Math.round(percentage), 100);
  };


  return (
    <div className={`backdrop-blur-md ${
      theme === 'dark' 
        ? 'bg-slate-700/70 border-slate-600/50 shadow-black/20 hover:bg-slate-700/80' 
        : 'bg-white/90 border-slate-200 hover:bg-white/95'
      } rounded-2xl p-6 border shadow-xl transition-colors duration-200`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className={`text-2xl font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>Current Weather</h2>
        <button
          onClick={() => onUnitChange(units === 'metric' ? 'imperial' : 'metric')}
          className={`px-4 py-2 ${
            theme === 'dark'
              ? 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/20'
              : 'bg-blue-100 text-blue-600 hover:bg-blue-200 border-blue-200'
          } rounded-full transition-colors duration-200 text-sm font-medium border`}
        >
          {units === 'metric' ? '°C' : '°F'}
        </button>
      </div>
      
      <div className="flex flex-col items-center gap-8">
        <div className={`text-7xl font-bold ${
          theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
        } tracking-tighter`}>
          {Math.round(main.temp)}°{units === 'metric' ? 'C' : 'F'}
        </div>
        <div className={theme === 'dark' ? 'text-slate-200' : 'text-slate-600'}>
          Feels like {Math.round(main.feels_like)}°{units === 'metric' ? 'C' : 'F'}
        </div>
        <div className={`flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          <div className={`flex items-center gap-3 px-4 py-2 rounded-full backdrop-blur-sm
                        ${theme === 'dark'
                          ? 'bg-slate-800/50 border-slate-700/50'
                          : 'bg-slate-100/80 border-slate-200/50'
                        } border shadow-sm`}>
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className={`absolute inset-0 ${
                theme === 'dark' ? 'bg-white/10' : 'bg-slate-700/10'
              } rounded-full transition-colors duration-200`} />
              <img 
                src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                alt={weather[0].description}
                width={48}
                height={48}
                className={`absolute inset-0 ${
                  theme === 'dark' ? 'bg-white/20' : 'bg-slate-700/10'
                } rounded-full transition-colors duration-200`}
              />
            </div>
            <span className={`capitalize font-medium tracking-tight ${
              theme === 'dark' ? 'text-slate-200' : 'text-slate-700'
            }`}>
              {weather[0].description}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <CircularGauge
            value={main.humidity}
            maxValue={100}
            label="Humidity"
            unit="%"
            colorClass="text-emerald-400"
            textColorClass={theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}
            tooltip={`Humidity is ${main.humidity}%. This represents the amount of water vapor in the air relative to what the air can hold. High humidity (>60%) can make it feel warmer and more uncomfortable.`}
          />
          <CircularGauge
            value={clouds.all}
            maxValue={100}
            label="Cloud Cover"
            unit="%"
            colorClass="text-blue-400"
            textColorClass={theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}
            tooltip={`Cloud coverage is ${clouds.all}%. This indicates how much of the sky is covered by clouds. 0% means clear sky, while 100% means completely overcast.`}
          />
          <CircularGauge
            value={getVisibilityPercentage(visibility)}
            maxValue={100}
            label="Visibility"
            unit="%"
            colorClass="text-indigo-400"
            textColorClass={theme === 'dark' ? 'text-slate-100' : 'text-slate-900'}
            tooltip={`Current visibility is ${formatVisibility(visibility)} (${getVisibilityPercentage(visibility)}% of maximum). Maximum visibility is typically 10km in clear conditions.`}
          />
        </div>

        <div className={`rounded-xl p-6 ${
          theme === 'dark'
            ? 'bg-slate-600/50 border-slate-500/50'
            : 'bg-slate-50/90 border-slate-200/50'
        }`}>
          <div className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-600'} text-sm mb-4 text-center`}>
            Wind
          </div>
          <WindDisplay 
            speed={wind.speed}
            deg={wind.deg}
            gust={wind.gust}
            units={units}
          />
        </div>
        
        {rain && rain['1h'] && (
          <div className={`rounded-xl p-4 ${
            theme === 'dark'
              ? 'bg-white/10 border-white/20'
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} text-sm`}>Precipitation</div>
            <div className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-medium mt-1`}>
              {rain['1h']} mm/h
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDisplay; 