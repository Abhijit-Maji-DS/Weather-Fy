import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import {
  FiWind,
  FiDroplet,
  FiEye,
  FiSun,
  FiActivity,
  FiThermometer,
  FiCloud,
  FiCompass,
} from "react-icons/fi";

function dirFromDeg(d) {
  const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return dirs[Math.round(d / 45) % 8];
}

export default function StatGrid({ current, units }) {
  if (!current) return null;
  const ws = units === "imperial" ? "mph" : "km/h";
  const u = units === "imperial" ? "°F" : "°C";
  const items = [
    { icon: <FiWind />, label: "Wind", value: `${Math.round(current.wind)} ${ws}`, sub: dirFromDeg(current.windDir) },
    { icon: <FiDroplet />, label: "Humidity", value: `${current.humidity}%`, sub: "Relative" },
    { icon: <FiThermometer />, label: "Feels like", value: `${Math.round(current.feels)}${u}` },
    { icon: <FiSun />, label: "UV index", value: current.uv?.toFixed(1) ?? "—", sub: uvLabel(current.uv) },
    { icon: <FiEye />, label: "Visibility", value: `${(current.visibility / 1000).toFixed(1)} km` },
    { icon: <FiActivity />, label: "Pressure", value: `${Math.round(current.pressure)} hPa` },
    { icon: <FiCloud />, label: "Cloud cover", value: `${current.cloud}%` },
    { icon: <FiCompass />, label: "Wind dir", value: `${current.windDir}°`, sub: dirFromDeg(current.windDir) },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {items.map((it, i) => (
        <motion.div
          key={it.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <GlassCard className="p-4 md:p-5" delay={0} hover>
            <div className="flex items-center justify-between">
              <span className="text-cyber-300 text-xl">{it.icon}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40">
                {it.label}
              </span>
            </div>
            <div className="mt-3 text-xl md:text-2xl font-display font-light">
              {it.value}
            </div>
            {it.sub && <div className="text-xs text-white/50 mt-0.5">{it.sub}</div>}
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}

function uvLabel(v) {
  if (v == null) return "";
  if (v < 3) return "Low";
  if (v < 6) return "Moderate";
  if (v < 8) return "High";
  if (v < 11) return "Very High";
  return "Extreme";
}
