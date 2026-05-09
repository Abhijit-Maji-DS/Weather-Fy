import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GlassCard from "./GlassCard";
import WeatherIcon from "./WeatherIcon";
import { FiChevronDown, FiSun, FiDroplet, FiWind } from "react-icons/fi";

export default function DailyForecast({ daily, units }) {
  const [open, setOpen] = useState(null);
  if (!daily?.length) return null;
  const u = units === "imperial" ? "°F" : "°C";
  const ws = units === "imperial" ? "mph" : "km/h";

  const allMin = Math.min(...daily.map((d) => d.min));
  const allMax = Math.max(...daily.map((d) => d.max));
  const range = Math.max(1, allMax - allMin);

  return (
    <GlassCard className="p-6 md:p-8" delay={0.2}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm uppercase tracking-[0.25em] text-white/60 font-medium">
          7-Day Forecast
        </h3>
        <span className="text-xs text-white/40">Tap to expand</span>
      </div>

      <div className="divide-y divide-white/5">
        {daily.map((d, i) => {
          const day =
            i === 0
              ? "Today"
              : new Date(d.date).toLocaleDateString([], { weekday: "long" });
          const left = ((d.min - allMin) / range) * 100;
          const width = ((d.max - d.min) / range) * 100;
          const isOpen = open === i;
          return (
            <motion.div
              key={d.date}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="py-3"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full grid grid-cols-[3fr_2fr_5fr_auto] md:grid-cols-[110px_44px_1fr_120px_24px] items-center gap-2 md:gap-3 text-left"
              >
                <span className="text-sm md:text-base text-white/85 truncate">{day}</span>
                <div className="flex justify-center">
                  <WeatherIcon main={d.cond.main} size={36} animated={false} color="#cfe5ff" />
                </div>
                <span className="text-xs text-white/50 truncate hidden md:block">
                  {d.cond.desc}
                </span>
                <div className="flex items-center justify-end gap-2 md:gap-3">
                  <span className="text-cyber-300 text-sm w-7 text-right">
                    {Math.round(d.min)}°
                  </span>
                  <div className="relative h-1.5 w-16 md:w-24 rounded-full bg-white/10 overflow-hidden hidden sm:block">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-cyber-300 via-amber-300 to-rose-400"
                      style={{ left: `${left}%`, width: `${width}%` }}
                    />
                  </div>
                  <span className="text-rose-200 text-sm w-7">
                    {Math.round(d.max)}°
                  </span>
                </div>
                <FiChevronDown
                  className={`text-white/50 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 text-sm">
                      <Detail icon={<FiSun />} label="UV index" value={d.uv?.toFixed?.(1) ?? "—"} />
                      <Detail icon={<FiDroplet />} label="Precip" value={`${d.pop}%`} />
                      <Detail icon={<FiWind />} label="Max wind" value={`${Math.round(d.wind)} ${ws}`} />
                      <Detail
                        icon={<FiSun />}
                        label="Sunrise"
                        value={new Date(d.sunrise).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </GlassCard>
  );
}

function Detail({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-white/5 border border-white/10">
      <span className="text-cyber-300">{icon}</span>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-white/45">{label}</div>
        <div className="text-sm text-white/90 font-medium">{value}</div>
      </div>
    </div>
  );
}
