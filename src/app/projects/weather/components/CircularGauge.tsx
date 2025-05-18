import { FC } from 'react';
import Tooltip from './Tooltip';
import { useTheme } from '../../../context/ThemeContext';

interface CircularGaugeProps {
  value: number;
  maxValue: number;
  label: string;
  unit: string;
  colorClass: string;
  textColorClass: string;
  tooltip: string;
}

const CircularGauge: FC<CircularGaugeProps> = ({
  value,
  maxValue,
  label,
  unit,
  colorClass,
  textColorClass,
  tooltip
}) => {
  const { theme } = useTheme();
  const percentage = (value / maxValue) * 100;
  const circumference = 2 * Math.PI * 32; // radius = 32
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-20 h-20">
        {/* Background circle */}
        <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
          <circle
            className={theme === 'dark' ? 'text-slate-700/50' : 'text-slate-200'}
            strokeWidth="8"
            stroke="currentColor"
            fill="none"
            r="32"
            cx="40"
            cy="40"
          />
          {/* Foreground circle */}
          <circle
            className={colorClass}
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="none"
            r="32"
            cx="40"
            cy="40"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 0.5s ease'
            }}
          />
        </svg>
        {/* Center text with tooltip */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Tooltip content={tooltip} width="max-w-[300px]">
            <span className={`text-sm font-semibold ${textColorClass} cursor-help
                          hover:opacity-80 transition-opacity`}>
              {Math.round(value)}{unit}
            </span>
          </Tooltip>
        </div>
      </div>
      {/* Label below without tooltip */}
      <span className={`mt-2 text-sm font-medium ${
        theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
      }`}>
        {label}
      </span>
    </div>
  );
};

export default CircularGauge; 