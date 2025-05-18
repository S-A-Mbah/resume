import { useState, useEffect } from 'react';

interface Coordinates {
  lat: number;
  lon: number;
}

export function useGeolocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const success = (position: GeolocationPosition) => {
      setCoordinates({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
      setError(null);
    };

    const failure = (error: GeolocationPositionError) => {
      let errorMessage;
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Location access was denied. Please enable location services for accurate weather data.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Location information is unavailable.';
          break;
        case error.TIMEOUT:
          errorMessage = 'The request to get user location timed out.';
          break;
        default:
          errorMessage = 'An unknown error occurred when trying to get your location.';
      }
      
      setError(errorMessage);
    };

    navigator.geolocation.getCurrentPosition(success, failure, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    });
  }, []);

  return { coordinates, error };
}
