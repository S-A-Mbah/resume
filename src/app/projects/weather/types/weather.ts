export interface WeatherData {
    current: {
      main: {
        temp: number;
        feels_like: number;
        humidity: number;
        pressure: number;
        temp_min: number;
        temp_max: number;
        visibility: number;
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
  } 