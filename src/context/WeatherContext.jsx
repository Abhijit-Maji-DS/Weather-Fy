import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { fetchCurrentWeather, fetchCurrentWeatherByCoords, fetchForecast, fetchForecastByCoords } from '../services/weatherApi.js';
import { getWeatherTheme, isNightTime } from '../utils/weather.js';

const WeatherContext = createContext(null);

export function WeatherProvider({ children }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState('sunny');
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aetherDarkMode');
      if (saved !== null) return JSON.parse(saved);
      return false;
    }
    return false;
  });
  const [unit, setUnit] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('aetherTempUnit') || 'celsius';
    }
    return 'celsius';
  });

  const updateTheme = useCallback((weather) => {
    const night = isNightTime(weather.dt, weather.sys.sunrise, weather.sys.sunset);
    setTheme(getWeatherTheme(weather.weather[0].id, night));
  }, []);

  const searchCity = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, forecastData] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city),
      ]);
      setCurrentWeather(weather);
      setForecast(forecastData);
      updateTheme(weather);
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [updateTheme]);

  const loadByCoords = useCallback(async (lat, lon) => {
    setLoading(true);
    setError(null);
    try {
      const [weather, forecastData] = await Promise.all([
        fetchCurrentWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ]);
      setCurrentWeather(weather);
      setForecast(forecastData);
      updateTheme(weather);
      localStorage.setItem('lastCity', weather.name);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [updateTheme]);

  const detectLocation = useCallback(() => {
    setLoading(true);
    if (!navigator.geolocation) {
      searchCity('London');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => loadByCoords(pos.coords.latitude, pos.coords.longitude),
      () => {
        const lastCity = localStorage.getItem('lastCity');
        searchCity(lastCity || 'New York');
      },
      { timeout: 8000 }
    );
  }, [loadByCoords, searchCity]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('aetherDarkMode', JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleUnit = useCallback(() => {
    setUnit((prev) => {
      const next = prev === 'celsius' ? 'fahrenheit' : 'celsius';
      localStorage.setItem('aetherTempUnit', next);
      return next;
    });
  }, []);

  useEffect(() => {
    detectLocation();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        forecast,
        loading,
        error,
        theme,
        darkMode,
        unit,
        searchCity,
        detectLocation,
        toggleDarkMode,
        toggleUnit,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) throw new Error('useWeather must be used within WeatherProvider');
  return context;
}
