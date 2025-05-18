'use client';

import { useState, useEffect } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import { useGeolocation } from './hooks/useGeolocation';
import { WeatherData } from './types/weather';
import LocationSearch from './components/LocationSearch';
import { useTheme } from '../../context/ThemeContext';

interface Location {
  name: string;
  country: string;
  lat: number;
  lon: number;
  state?: string;
}

export default function WeatherApp() {
  const { theme } = useTheme();
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mounted, setMounted] = useState<boolean>(false);
  const { coordinates, error: geoError } = useGeolocation();

  // Add fade-in effect after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!coordinates && !selectedLocation) {
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      const lat = selectedLocation?.lat ?? coordinates?.lat;
      const lon = selectedLocation?.lon ?? coordinates?.lon;
      
      if (!lat || !lon) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `/api/weather?lat=${lat}&lon=${lon}&units=${units}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        console.log('Weather data:', data);
        
        setWeatherData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [coordinates, selectedLocation, units]);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      if (!coordinates) return;
      
      try {
        const response = await fetch(
          `/api/reverse-geocode?lat=${coordinates.lat}&lon=${coordinates.lon}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch location data');
        }
        
        const data = await response.json();
        setCurrentLocation(data);
      } catch (error) {
        console.error('Error fetching location name:', error);
      }
    };

    fetchCurrentLocation();
  }, [coordinates]);

  return (
    <div className={`min-h-screen relative transition-opacity duration-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
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
      
      <div className="relative px-4 py-8 sm:px-6 lg:px-8 backdrop-blur-[2px]">
        <main className="max-w-5xl mx-auto">
          <LocationSearch
            currentLocation={selectedLocation || currentLocation || undefined}
            onLocationSelect={setSelectedLocation}
          />

          {geoError && (
            <div className="mb-8 bg-red-500/10 backdrop-blur-sm border border-red-500/20 
                         rounded-lg p-4 animate-fade-in">
              <p className="text-red-400 text-sm text-center">{geoError}</p>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 
                             border-2 border-slate-200 border-t-blue-500" />
                <div className="absolute inset-0 rounded-full 
                             animate-pulse-slow border-2 border-transparent" />
              </div>
            </div>
          ) : weatherData ? (
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8 animate-fade-in">
              <WeatherDisplay 
                weatherData={weatherData.current} 
                units={units}
                onUnitChange={setUnits}
              />
              <WeatherDetails 
                weatherData={weatherData} 
                units={units}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className={`text-slate-500 text-center`}>
                Please allow location access or search for a location to see weather information.
              </p>
            </div>
          )}
        </main>

        <footer className="mt-16 text-center">
          <p className={`text-sm ${
            theme === 'dark' 
              ? 'text-slate-500 hover:text-slate-400' 
              : 'text-slate-600 hover:text-slate-800'
            } transition-colors`}>
            Powered by OpenWeather API
          </p>
        </footer>
      </div>
    </div>
  );
}
