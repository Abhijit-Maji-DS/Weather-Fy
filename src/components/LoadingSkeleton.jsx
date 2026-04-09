import { motion } from 'framer-motion';

export default function LoadingSkeleton() {
  return (
    <div className="text-center">
      {/* City name */}
      <div className="flex justify-center mb-3">
        <div className="h-6 w-32 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
      </div>

      {/* Temperature */}
      <div className="flex justify-center my-4">
        <div className="h-24 w-40 rounded-2xl animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Condition */}
      <div className="flex justify-center gap-3 mb-6">
        <div className="h-7 w-7 rounded-full animate-pulse" style={{ background: 'rgba(255,255,255,0.08)' }} />
        <div className="h-5 w-28 rounded-lg animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Detail cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8 max-w-lg mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.06 }}
            className="h-[72px] rounded-[20px] animate-pulse"
            style={{ background: 'rgba(255,255,255,0.06)' }}
          />
        ))}
      </div>

      {/* Hourly */}
      <div className="mt-8 max-w-2xl mx-auto">
        <div className="h-3 w-28 rounded mb-3 animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="h-[110px] rounded-[20px] animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
      </div>

      {/* Daily */}
      <div className="mt-5 max-w-2xl mx-auto">
        <div className="h-3 w-28 rounded mb-3 animate-pulse" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <div className="rounded-[20px] overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-11" style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }} />
          ))}
        </div>
      </div>

      {/* Loading text */}
      <motion.p
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="mt-10 text-white/25 text-[13px] font-light"
      >
        Loading weather data...
      </motion.p>
    </div>
  );
}
