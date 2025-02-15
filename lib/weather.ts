import { create } from 'zustand';

export interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  icon: string;
}

export interface ForecastData extends WeatherData {
  date: string;
}

interface WeatherStore {
  currentWeather: WeatherData | null;
  forecast: ForecastData[];
  location: { lat: number; lon: number } | null;
  error: string | null;
  setLocation: (lat: number, lon: number) => void;
  fetchWeather: () => Promise<void>;
}

export const useWeather = create<WeatherStore>((set, get) => ({
  currentWeather: null,
  forecast: [],
  location: null,
  error: null,
  setLocation: (lat: number, lon: number) => {
    set({ location: { lat, lon }, error: null });
    get().fetchWeather();
  },
  fetchWeather: async () => {
    const { location } = get();
    if (!location) return;

    const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    if (!apiKey) {
      set({ error: 'API key not configured' });
      return;
    }

    try {
      // Current weather
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${apiKey}`
      );
      
      if (!weatherRes.ok) {
        throw new Error('Failed to fetch current weather');
      }
      
      const weatherData = await weatherRes.json();

      // 5-day forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${apiKey}`
      );
      
      if (!forecastRes.ok) {
        throw new Error('Failed to fetch forecast');
      }
      
      const forecastData = await forecastRes.json();

      set({
        currentWeather: {
          temp: Math.round(weatherData.main.temp),
          humidity: weatherData.main.humidity,
          description: weatherData.weather[0].description,
          icon: weatherData.weather[0].icon,
        },
        forecast: forecastData.list
          .filter((_: any, index: number) => index % 8 === 0) // One forecast per day
          .slice(0, 5)
          .map((day: any) => ({
            date: new Date(day.dt * 1000).toLocaleDateString(),
            temp: Math.round(day.main.temp),
            humidity: day.main.humidity,
            description: day.weather[0].description,
            icon: day.weather[0].icon,
          })),
        error: null
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      set({ 
        error: 'Failed to load weather data',
        currentWeather: null,
        forecast: []
      });
    }
  },
}));