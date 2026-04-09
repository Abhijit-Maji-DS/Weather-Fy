import { motion } from 'framer-motion';
import { CloudOff, RefreshCw } from 'lucide-react';
import { useWeather } from '../context/WeatherContext.jsx';

export default function ErrorDisplay() {
  const { error, detectLocation } = useWeather();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-20"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <CloudOff className="w-8 h-8 text-white/40" />
      </motion.div>

      <h2 className="text-[18px] text-white/80 font-light mb-2">Something went wrong</h2>
      <p className="text-white/35 text-[13px] font-light mb-8 max-w-[260px] mx-auto leading-relaxed">
        {error || 'Unable to load weather data. Please try again.'}
      </p>

      <button
        onClick={detectLocation}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl
          text-white/80 text-[13px] font-medium
          transition-all duration-300 hover:scale-105 cursor-pointer"
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
        }}
      >
        <RefreshCw className="w-3.5 h-3.5" />
        Try again
      </button>
    </motion.div>
  );
}
