import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { useWeather } from '../context/WeatherContext.jsx';
import { processHourlyForecast, formatTemp, getWeatherIcon } from '../utils/weather.js';

export default function HourlyForecast() {
  const { forecast, unit, currentWeather } = useWeather();
  const scrollRef = useRef(null);

  if (!forecast || !currentWeather) return null;

  const hourly = processHourlyForecast(forecast);
  const isNight = currentWeather.dt > currentWeather.sys.sunset || currentWeather.dt < currentWeather.sys.sunrise;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="mt-8 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-3 px-1">
        <Clock className="w-3.5 h-3.5 text-white/40" />
        <h2 className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-medium">
          Hourly Forecast
        </h2>
      </div>

      <div className="glass-card p-4">
        <div
          ref={scrollRef}
          className="flex gap-0 overflow-x-auto scrollbar-hide"
        >
          {hourly.map((h, i) => {
            const { icon } = getWeatherIcon(h.condition.id, isNight);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.05 }}
                className="flex flex-col items-center gap-2.5 min-w-[68px] flex-shrink-0 py-1"
              >
                <span className="text-white/50 text-[12px] font-light">
                  {i === 0 ? 'Now' : h.time}
                </span>
                <span className="text-[22px]" role="img" aria-label={h.condition.description}>
                  {icon}
                </span>
                <span className="text-white text-[14px] font-medium">
                  {formatTemp(h.temp, unit)}
                </span>
                {h.pop > 0.05 && (
                  <span className="text-[10px] font-medium" style={{ color: 'rgba(120,180,255,0.7)' }}>
                    {Math.round(h.pop * 100)}%
                  </span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
