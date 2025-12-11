
// Mock data for fallback when API key is missing or requests fail

export const MOCK_CURRENT_WEATHER = {
  coord: { lon: -0.1257, lat: 51.5085 },
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  base: "stations",
  main: {
    temp: 20.5,
    feels_like: 19.8,
    temp_min: 18.9,
    temp_max: 22.1,
    pressure: 1012,
    humidity: 53,
    sea_level: 1012,
    grnd_level: 1009
  },
  visibility: 10000,
  wind: { speed: 3.6, deg: 180 },
  clouds: { all: 0 },
  dt: Date.now() / 1000,
  sys: {
    type: 1,
    id: 1414,
    country: "GB",
    sunrise: 1695620123,
    sunset: 1695664123
  },
  timezone: 3600,
  id: 2643743,
  name: "London",
  cod: 200
};

export const MOCK_FORECAST = {
  cod: "200",
  message: 0,
  cnt: 40,
  list: Array.from({ length: 40 }).map((_, i) => ({
    dt: Math.floor(Date.now() / 1000) + i * 10800, // Every 3 hours
    main: {
      temp: 18 + Math.sin(i) * 5, // Simulated temperature variance
      feels_like: 17 + Math.sin(i) * 5,
      temp_min: 16 + Math.sin(i) * 5,
      temp_max: 20 + Math.sin(i) * 5,
      pressure: 1012,
      humidity: 50 + (i % 20),
    },
    weather: [
      {
        id: i % 3 === 0 ? 500 : 800, // Mix of rain and clear
        main: i % 3 === 0 ? "Rain" : "Clear",
        description: i % 3 === 0 ? "light rain" : "clear sky",
        icon: i % 3 === 0 ? "10d" : "01d"
      }
    ],
    clouds: { all: i % 2 === 0 ? 20 : 0 },
    wind: { speed: 3 + Math.random() * 2, deg: 180 },
    visibility: 10000,
    pop: i % 3 === 0 ? 0.6 : 0,
    dt_txt: new Date(Date.now() + i * 10800 * 1000).toISOString().replace('T', ' ').substring(0, 19)
  })),
  city: {
    id: 2643743,
    name: "London",
    coord: { lat: 51.5085, lon: -0.1257 },
    country: "GB",
    population: 1000000,
    timezone: 3600,
    sunrise: 1695620123,
    sunset: 1695664123
  }
};

export const MOCK_LOCATIONS = [
  {
    name: "London",
    local_names: { en: "London" },
    lat: 51.5073219,
    lon: -0.1276474,
    country: "GB",
    state: "England"
  },
  {
    name: "Paris",
    local_names: { en: "Paris", fr: "Paris" },
    lat: 48.856614,
    lon: 2.3522219,
    country: "FR",
    state: "Ile-de-France"
  },
  {
    name: "New York",
    local_names: { en: "New York" },
    lat: 40.7127753,
    lon: -74.0059728,
    country: "US",
    state: "New York"
  },
  {
    name: "Tokyo",
    local_names: { en: "Tokyo", ja: "東京都" },
    lat: 35.6895,
    lon: 139.6917,
    country: "JP"
  },
  {
    name: "Sydney",
    local_names: { en: "Sydney" },
    lat: -33.8688,
    lon: 151.2093,
    country: "AU",
    state: "New South Wales"
  }
];

export const MOCK_REVERSE_GEOCODE = {
  name: "Mock City",
  local_names: { en: "Mock City" },
  lat: 0,
  lon: 0,
  country: "US",
  state: "Mock State"
};
