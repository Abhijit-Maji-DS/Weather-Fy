import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useWeather } from '../context/WeatherContext.jsx';

export default function SettingsBar() {
  const { darkMode, toggleDarkMode, unit, toggleUnit } = useWeather();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.4 }}
      className="flex items-center justify-between mb-5"
    >
      {/* Logo / Title */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.12)' }}>
        </div>
        <span className="text-white/70 text-[13px] font-medium tracking-wide">Weather-Fy</span>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="relative flex items-center w-[52px] h-[28px] rounded-full
            transition-all duration-500 cursor-pointer"
          style={{
            background: darkMode
              ? 'linear-gradient(135deg, #1e1b4b, #312e81)'
              : 'linear-gradient(135deg, #60a5fa, #38bdf8)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: darkMode
              ? '0 0 12px rgba(99,102,241,0.2), inset 0 1px 2px rgba(0,0,0,0.3)'
              : '0 0 12px rgba(56,189,248,0.2), inset 0 1px 2px rgba(0,0,0,0.1)',
          }}
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          role="switch"
          aria-checked={darkMode}
        >
          {/* Thumb */}
          <motion.div
            animate={{ x: darkMode ? 24 : 2 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="relative flex items-center justify-center rounded-full"
            style={{
              width: 24,
              height: 24,
              background: darkMode ? '#1e1b4b' : '#fef3c7',
              boxShadow: darkMode
                ? '0 2px 8px rgba(0,0,0,0.4), 0 0 0 1px rgba(129,140,248,0.3)'
                : '0 2px 8px rgba(0,0,0,0.15), 0 0 0 1px rgba(251,191,36,0.3)',
            }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: darkMode ? -30 : 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {darkMode ? (
                <Moon className="w-3 h-3" style={{ color: '#a5b4fc' }} />
              ) : (
                <Sun className="w-3 h-3" style={{ color: '#f59e0b' }} />
              )}
            </motion.div>
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}
