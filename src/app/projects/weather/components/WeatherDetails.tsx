import { FC } from 'react';
import DailyForecast from './DailyForecast';
import { useTheme } from '../../../context/ThemeContext';

interface WeatherDetailsProps {
  weatherData: {
    current: {
      main: {
        pressure: number;
        visibility: number;
        temp_min: number;
        temp_max: number;
        feels_like: number;
      };
      visibility: number;
      sys: {
        sunrise: number;
        sunset: number;
      };
      uvi?: number;
      dew_point?: number;
    };
    forecast: {
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
    };
  };
  units: 'metric' | 'imperial';
}

const WeatherDetails: FC<WeatherDetailsProps> = ({ weatherData, units }) => {
  const { theme } = useTheme();
  const { main, sys, uvi, dew_point, visibility } = weatherData.current;
  
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const getUVILevel = (uvi: number): { text: string; color: string } => {
    if (uvi <= 2) return { text: 'Low', color: 'text-green-500' };
    if (uvi <= 5) return { text: 'Moderate', color: 'text-yellow-500' };
    if (uvi <= 7) return { text: 'High', color: 'text-orange-500' };
    return { text: 'Very High', color: 'text-red-500' };
  };

  const formatVisibility = (visibility: number): string => {
    if (!visibility || isNaN(visibility)) return 'Not available';
    
    const kmValue = visibility / 1000;
    if (kmValue < 1) {
      return `${visibility}m`;
    }
    return `${kmValue.toFixed(1)}km`;
  };

  return (
    <div className={`backdrop-blur-md ${
      theme === 'dark' 
        ? 'bg-slate-700/70 border-slate-600/50 shadow-black/20 hover:bg-slate-700/80' 
        : 'bg-white/90 border-slate-200 hover:bg-white/95'
      } rounded-2xl p-6 border shadow-xl transition-colors duration-200`}>
      <h2 className={`text-2xl font-semibold ${
        theme === 'dark' ? 'text-white' : 'text-slate-900'
      } mb-8`}>Weather Details</h2>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className={theme === 'dark' ? 'text-slate-200' : 'text-slate-600'}>Pressure</div>
            <div className={`${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'} font-medium`}>{main.pressure} hPa</div>
          </div>
          <div>
            <div className={theme === 'dark' ? 'text-slate-200' : 'text-slate-600'}>Visibility</div>
            <div className={`${theme === 'dark' ? 'text-slate-100' : 'text-slate-900'} font-medium`}>
              {formatVisibility(visibility)}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>Sunrise</div>
            <div className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-medium`}>
              {formatTime(sys.sunrise)}
            </div>
          </div>
          <div>
            <div className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>Sunset</div>
            <div className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-medium`}>
              {formatTime(sys.sunset)}
            </div>
          </div>
        </div>

        <div className={`rounded-xl p-4 overflow-hidden ${
          theme === 'dark' 
            ? 'bg-slate-600/50 border-slate-500/50' 
            : 'bg-slate-50/90 border-slate-200/50'
        }`}>
          <h3 className={`${theme === 'dark' ? 'text-slate-200' : 'text-slate-600'} font-medium mb-3`}>Temperature Range</h3>
          <div className={`flex justify-between items-center ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-900'
          } mb-4`}>
            <span>Min: {Math.round(main.temp_min)}°{units === 'metric' ? 'C' : 'F'}</span>
            <span>Max: {Math.round(main.temp_max)}°{units === 'metric' ? 'C' : 'F'}</span>
          </div>
          
          <DailyForecast forecast={weatherData.forecast} units={units} />
        </div>

        {uvi && (
          <div className={`rounded-xl p-4 ${
            theme === 'dark' 
              ? 'bg-slate-600/50 border-slate-500/50' 
              : 'bg-slate-50/90 border-slate-200/50'
          }`}>
            <h3 className={`${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} font-medium mb-2`}>UV Index</h3>
            <div className={`font-medium ${getUVILevel(uvi).color}`}>
              {uvi.toFixed(1)} - {getUVILevel(uvi).text}
            </div>
          </div>
        )}

        {dew_point && (
          <div className={`rounded-xl p-4 ${
            theme === 'dark' 
              ? 'bg-slate-600/50 border-slate-500/50' 
              : 'bg-slate-50/90 border-slate-200/50'
          }`}>
            <div className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>Dew Point</div>
            <div className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-medium`}>
              {Math.round(dew_point)}°{units === 'metric' ? 'C' : 'F'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherDetails; 