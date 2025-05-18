'use client';

import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { useTheme } from '../../../context/ThemeContext';

interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

interface LocationSearchProps {
  currentLocation?: Location;
  onLocationSelect: (location: Location) => void;
}

export default function LocationSearch({ currentLocation, onLocationSelect }: LocationSearchProps) {
  const { theme } = useTheme();
  const [search, setSearch] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  // Use the debounced search value to trigger the API call
  useEffect(() => {
    if (debouncedSearch) {
      searchLocations(debouncedSearch);
    } else {
      setLocations([]);
    }
  }, [debouncedSearch]);

  const searchLocations = async (query: string) => {
    if (!query || query.trim().length < 2) {
      setLocations([]);
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `/api/locations?q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location data');
      }
      
      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setLocations(data);
      } else {
        setLocations([]);
        if (data.length === 0) {
          setError('No locations found. Try a different search term.');
        }
      }
    } catch (error) {
      console.error('Error searching locations:', error);
      setError('Error searching locations. Please try again.');
      setLocations([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative z-50">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
        <div className={`flex-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
          <span className="mr-2">📍</span>
          {currentLocation ? (
            <span>
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {currentLocation.name}
              </span>
              {currentLocation.state && `, ${currentLocation.state}`}
              {currentLocation.country && `, ${currentLocation.country}`}
            </span>
          ) : (
            <span className="italic">Loading location...</span>
          )}
        </div>
        <div className="flex-1 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search other locations..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className={`w-full px-4 py-2 rounded-lg 
                     ${theme === 'dark' 
                       ? 'bg-white/10 text-white border-white/10'
                       : 'bg-white text-slate-900 border-slate-200'} 
                     border focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
      </div>

      {isLoading && (
        <div className={`absolute top-full mt-2 w-full p-4 rounded-lg shadow-lg z-50
                      ${theme === 'dark'
                        ? 'bg-slate-800 text-slate-300'
                        : 'bg-white text-slate-600'}`}>
          Searching...
        </div>
      )}

      {error && !isLoading && (
        <div className={`absolute top-full mt-2 w-full p-4 rounded-lg shadow-lg z-50
                      ${theme === 'dark'
                        ? 'bg-red-900/20 text-red-300 border border-red-900/30'
                        : 'bg-red-50 text-red-600 border border-red-200'}`}>
          {error}
        </div>
      )}

      {locations.length > 0 && (
        <div className={`absolute top-full mt-2 w-full rounded-lg shadow-lg
                      border max-h-60 overflow-auto z-50
                      ${theme === 'dark'
                        ? 'bg-slate-800 border-white/10'
                        : 'bg-white border-slate-200'}`}>
          {locations.map((location, index) => (
            <button
              key={`${location.lat}-${location.lon}-${index}`}
              onClick={() => {
                onLocationSelect(location);
                setSearch('');
                setLocations([]);
              }}
              className={`w-full px-4 py-2 text-left transition-colors
                       ${theme === 'dark'
                         ? 'text-white hover:bg-slate-700'
                         : 'text-slate-900 hover:bg-slate-50'}`}
            >
              {location.name}
              {location.state && `, ${location.state}`}
              {location.country && `, ${location.country}`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 