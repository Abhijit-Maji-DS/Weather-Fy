import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useWeather } from '../context/WeatherContext.jsx';
import { processDailyForecast, formatTemp, getWeatherIcon } from '../utils/weather.js';

export default function DailyForecast() {
  const { forecast, unit, currentWeather } = useWeather();
  if (!forecast || !currentWeather) return null;

  const daily = processDailyForecast(forecast);

  const allMin = Math.min(...daily.map((d) => d.tempMin));
  const allMax = Math.max(...daily.map((d) => d.tempMax));
  const range = allMax - allMin || 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
      className="mt-5 max-w-2xl mx-auto"
    >
      <div className="flex items-center gap-2 mb-3 px-1">
        <Calendar className="w-3.5 h-3.5 text-white/40" />
        <h2 className="text-[11px] uppercase tracking-[0.18em] text-white/40 font-medium">
          {daily.length}-Day Forecast
        </h2>
      </div>

      <div className="glass-card overflow-hidden">
        {daily.map((day, i) => {
          const leftPct = ((day.tempMin - allMin) / range) * 100;
          const widthPct = ((day.tempMax - day.tempMin) / range) * 100;
          const { icon } = getWeatherIcon(day.condition.id, false);

          return (
            <motion.div
              key={day.date}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.06 }}
              className="flex items-center gap-3 px-4 sm:px-5 py-3"
              style={{
                borderBottom: i < daily.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Day name */}
              <span className="text-white/80 text-[13px] font-medium w-11 flex-shrink-0">
                {day.dayName}
              </span>

              {/* Weather icon */}
              <span className="text-[18px] w-7 text-center flex-shrink-0" role="img" aria-label={day.condition.description}>
                {icon}
              </span>

              {/* Rain chance */}
              <span className="text-[11px] font-medium w-9 text-right flex-shrink-0"
                style={{ color: day.pop > 0.1 ? 'rgba(120,180,255,0.6)' : 'transparent' }}>
                {day.pop > 0.1 ? `${Math.round(day.pop * 100)}%` : ''}
              </span>

              {/* Min temp */}
              <span className="text-white/35 text-[13px] font-light w-8 text-right flex-shrink-0">
                {formatTemp(day.tempMin, unit)}
              </span>

              {/* Temperature bar */}
              <div className="flex-1 h-[4px] rounded-full relative min-w-[50px]"
                style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div
                  className="absolute h-full rounded-full"
                  style={{
                    left: `${leftPct}%`,
                    width: `${Math.max(widthPct, 6)}%`,
                    background: 'linear-gradient(90deg, #5B9BD5, #F4A940)',
                    boxShadow: '0 0 6px rgba(91,155,213,0.3)',
                  }}
                />
              </div>

              {/* Max temp */}
              <span className="text-white text-[13px] font-medium w-8 flex-shrink-0">
                {formatTemp(day.tempMax, unit)}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
