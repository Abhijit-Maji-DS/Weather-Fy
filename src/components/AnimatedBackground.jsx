import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWeather } from '../context/WeatherContext.jsx';
import { getThemeGradient } from '../utils/weather.js';

export default function AnimatedBackground() {
  const { theme, darkMode } = useWeather();
  const gradient = getThemeGradient(theme, darkMode);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${theme}-${darkMode}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
          style={{ background: gradient }}
        />
      </AnimatePresence>

      {/* Floating orbs for depth */}
      <FloatingOrbs theme={theme} darkMode={darkMode} />

      {/* Weather particles */}
      {(theme === 'rainy' || theme === 'thunderstorm') && <RainParticles />}
      {theme === 'snow' && <SnowParticles />}
      {theme === 'night' && <Stars />}
    </div>
  );
}

function FloatingOrbs({ theme, darkMode }) {
  const orbs = useMemo(() => {
    const colors = {
      sunny: darkMode
        ? ['rgba(30,80,140,0.15)', 'rgba(20,60,120,0.1)']
        : ['rgba(255,255,255,0.08)', 'rgba(135,206,250,0.06)'],
      cloudy: darkMode
        ? ['rgba(40,55,70,0.15)', 'rgba(30,45,60,0.1)']
        : ['rgba(255,255,255,0.06)', 'rgba(200,210,220,0.05)'],
      rainy: darkMode
        ? ['rgba(20,40,60,0.15)', 'rgba(15,30,50,0.1)']
        : ['rgba(255,255,255,0.05)', 'rgba(120,160,200,0.04)'],
      night: darkMode
        ? ['rgba(30,20,60,0.2)', 'rgba(60,40,100,0.12)']
        : ['rgba(80,60,160,0.08)', 'rgba(120,80,200,0.06)'],
      snow: darkMode
        ? ['rgba(40,50,60,0.15)', 'rgba(30,40,55,0.1)']
        : ['rgba(255,255,255,0.1)', 'rgba(200,220,240,0.06)'],
      thunderstorm: darkMode
        ? ['rgba(20,15,40,0.2)', 'rgba(40,30,60,0.12)']
        : ['rgba(80,70,120,0.06)', 'rgba(60,50,100,0.05)'],
      mist: darkMode
        ? ['rgba(35,40,50,0.15)', 'rgba(25,30,40,0.1)']
        : ['rgba(255,255,255,0.08)', 'rgba(180,195,210,0.06)'],
    };
    const c = colors[theme] || colors.sunny;
    return [
      { x: '15%', y: '20%', size: 300, color: c[0], dur: 20 },
      { x: '70%', y: '60%', size: 250, color: c[1], dur: 25 },
      { x: '40%', y: '80%', size: 200, color: c[0], dur: 18 },
    ];
  }, [theme, darkMode]);

  return (
    <>
      {orbs.map((orb, i) => (
        <motion.div
          key={`${theme}-${darkMode}-${i}`}
          className="absolute rounded-full"
          style={{
            left: orb.x,
            top: orb.y,
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: orb.dur,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  );
}

function RainParticles() {
  const drops = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      height: 15 + Math.random() * 25,
      duration: 0.6 + Math.random() * 0.5,
      delay: Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {drops.map((d) => (
        <motion.div
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            width: 1.5,
            height: d.height,
            background: 'linear-gradient(to bottom, transparent, rgba(174,194,224,0.5))',
          }}
          initial={{ top: '-5%', opacity: 0 }}
          animate={{ top: '105%', opacity: [0, 0.6, 0] }}
          transition={{
            duration: d.duration,
            repeat: Infinity,
            delay: d.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function SnowParticles() {
  const flakes = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 5 + Math.random() * 8,
      delay: Math.random() * 6,
      xDrift: [0, (Math.random() - 0.5) * 60, (Math.random() - 0.5) * 80],
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {flakes.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full"
          style={{
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            background: 'rgba(255,255,255,0.7)',
            boxShadow: '0 0 4px rgba(255,255,255,0.3)',
          }}
          initial={{ top: '-3%', opacity: 0 }}
          animate={{
            top: '105%',
            opacity: [0, 0.8, 0.6, 0],
            x: f.xDrift,
          }}
          transition={{
            duration: f.duration,
            repeat: Infinity,
            delay: f.delay,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

function Stars() {
  const stars = useMemo(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 60,
      size: 1 + Math.random() * 2,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 3,
    })), []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: 'white',
          }}
          animate={{ opacity: [0.2, 0.9, 0.2] }}
          transition={{
            duration: s.duration,
            repeat: Infinity,
            delay: s.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
