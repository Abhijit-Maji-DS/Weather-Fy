import { WeatherProvider, useWeather } from './context/WeatherContext.jsx';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import SearchBar from './components/SearchBar.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import HourlyForecast from './components/HourlyForecast.jsx';
import DailyForecast from './components/DailyForecast.jsx';
import SettingsBar from './components/SettingsBar.jsx';
import LoadingSkeleton from './components/LoadingSkeleton.jsx';
import ErrorDisplay from './components/ErrorDisplay.jsx';
import { motion } from 'framer-motion';

function WeatherApp() {
  const { loading, error, currentWeather } = useWeather();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AnimatedBackground />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 min-h-screen px-4 sm:px-6 py-5 sm:py-8
          max-w-2xl mx-auto"
      >
        <SettingsBar />
        <SearchBar />

        <div className="mt-6 sm:mt-10">
          {loading && <LoadingSkeleton />}
          {!loading && error && <ErrorDisplay />}
          {!loading && !error && currentWeather && (
            <>
              <CurrentWeather />
              <HourlyForecast />
              <DailyForecast />

              <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-10 pb-6 text-center"
              >
                <p className="text-white/15 text-[10px] font-light tracking-wider">
                  Weather data by OpenWeatherMap using Weather-Fy-Abhi <br />
                  © {new Date().getFullYear()} Weather-Fy. All rights reserved.
                </p>
                
              </motion.footer>
            </>
          )}
        </div>
      </motion.main>
    </div>
  );
}

export default function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}
