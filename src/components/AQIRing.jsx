import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

function aqiInfo(v) {
  if (v == null) return { label: "—", color: "#94a3b8" };
  if (v <= 50) return { label: "Good", color: "#4ade80" };
  if (v <= 100) return { label: "Moderate", color: "#facc15" };
  if (v <= 150) return { label: "Unhealthy (SG)", color: "#fb923c" };
  if (v <= 200) return { label: "Unhealthy", color: "#ef4444" };
  if (v <= 300) return { label: "Very Unhealthy", color: "#a855f7" };
  return { label: "Hazardous", color: "#7f1d1d" };
}

export default function AQIRing({ aqi }) {
  const v = aqi?.us ?? null;
  const info = aqiInfo(v);
  const pct = Math.min(1, (v ?? 0) / 300);
  const C = 2 * Math.PI * 70;

  return (
    <GlassCard className="p-6 md:p-7" delay={0.25}>
      <h3 className="text-sm uppercase tracking-[0.25em] text-white/60 font-medium mb-4">
        Air Quality
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-[160px] h-[160px] shrink-0">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 160 160">
            <defs>
              <linearGradient id="aqigrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={info.color} stopOpacity="1" />
                <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
            <motion.circle
              cx="80" cy="80" r="70" fill="none"
              stroke="url(#aqigrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={C}
              initial={{ strokeDashoffset: C }}
              animate={{ strokeDashoffset: C * (1 - pct) }}
              transition={{ duration: 1.6, ease: [0.2, 0.9, 0.3, 1] }}
              style={{ filter: `drop-shadow(0 0 10px ${info.color})` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-4xl font-display font-light glow-text">
              <AnimatedNumber value={v ?? 0} />
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/50 mt-1">US AQI</div>
          </div>
        </div>
        <div className="flex-1 w-full">
          <div
            className="text-2xl font-display font-medium text-center sm:text-left"
            style={{ color: info.color, textShadow: `0 0 20px ${info.color}66` }}
          >
            {info.label}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <Stat label="PM2.5" value={aqi?.pm25?.toFixed(1) ?? "—"} unit="µg/m³" />
            <Stat label="PM10" value={aqi?.pm10?.toFixed(1) ?? "—"} unit="µg/m³" />
            <Stat label="O₃" value={aqi?.o3?.toFixed(1) ?? "—"} unit="µg/m³" />
            <Stat label="NO₂" value={aqi?.no2?.toFixed(1) ?? "—"} unit="µg/m³" />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

function Stat({ label, value, unit }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 border border-white/10">
      <span className="text-white/50">{label}</span>
      <span className="text-white/90 font-medium">
        {value} <span className="text-white/40">{unit}</span>
      </span>
    </div>
  );
}
