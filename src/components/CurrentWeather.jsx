import { motion } from 'framer-motion';
import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset } from 'lucide-react';
import { useWeather } from '../context/WeatherContext.jsx';
import { formatTemp, getWindDirection, getWeatherIcon, isNightTime } from '../utils/weather.js';

export default function CurrentWeather() {
  const { currentWeather, unit } = useWeather();
  if (!currentWeather) return null;

  const { main, weather, wind, visibility, sys, name, dt } = currentWeather;
  const night = isNightTime(dt, sys.sunrise, sys.sunset);
  const { icon } = getWeatherIcon(weather[0].id, night);

  const formatLocalTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="text-center"
    >
      {/* City + Country */}
      <motion.h1 variants={item} className="text-[22px] font-medium text-white tracking-wide">
        {name}
      </motion.h1>

      {/* Big Temperature */}
      <motion.div variants={item} className="mt-1 mb-0">
        <span className="text-[96px] sm:text-[112px] leading-none font-extralight text-white">
          {formatTemp(main.temp, unit)}
        </span>
      </motion.div>

      {/* Condition */}
      <motion.div variants={item} className="flex items-center justify-center gap-2 -mt-2">
        <span className="text-[28px]" role="img" aria-label={weather[0].description}>
          {icon}
        </span>
        <span className="text-[17px] text-white/90 font-light capitalize">
          {weather[0].description}
        </span>
      </motion.div>

      {/* High / Low / Feels */}
      <motion.p variants={item} className="text-white/50 text-[13px] font-light mt-1">
        H:{formatTemp(main.temp_max, unit)}  L:{formatTemp(main.temp_min, unit)}
        <span className="mx-2 text-white/20">|</span>
        Feels like {formatTemp(main.feels_like, unit)}
      </motion.p>

      {/* Detail Grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8 max-w-lg mx-auto"
      >
        <DetailCard
          icon={<Droplets className="w-[14px] h-[14px]" />}
          label="Humidity"
          value={`${main.humidity}%`}
        />
        <DetailCard
          icon={<Wind className="w-[14px] h-[14px]" />}
          label="Wind"
          value={`${Math.round(wind.speed * 3.6)} km/h ${getWindDirection(wind.deg)}`}
        />
        <DetailCard
          icon={<Eye className="w-[14px] h-[14px]" />}
          label="Visibility"
          value={`${(visibility / 1000).toFixed(1)} km`}
        />
        <DetailCard
          icon={<Gauge className="w-[14px] h-[14px]" />}
          label="Pressure"
          value={`${main.pressure} hPa`}
        />
        <DetailCard
          icon={<Sunrise className="w-[14px] h-[14px]" />}
          label="Sunrise"
          value={formatLocalTime(sys.sunrise)}
        />
        <DetailCard
          icon={<Sunset className="w-[14px] h-[14px]" />}
          label="Sunset"
          value={formatLocalTime(sys.sunset)}
        />
      </motion.div>
    </motion.div>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="glass-card p-3.5 cursor-default"
    >
      <div className="flex items-center gap-1.5 text-white/40 mb-2">
        {icon}
        <span className="text-[10px] uppercase tracking-[0.15em] font-medium">{label}</span>
      </div>
      <p className="text-white text-[15px] font-light">{value}</p>
    </motion.div>
  );
}
