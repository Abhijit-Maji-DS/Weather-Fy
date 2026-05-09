import { motion } from "framer-motion";
import { FiMapPin, FiArrowUp, FiArrowDown, FiWind, FiDroplet } from "react-icons/fi";
import WeatherIcon from "./WeatherIcon";
import AnimatedNumber from "./AnimatedNumber";

export default function HeroWeather({ data, place, units }) {
  if (!data) return null;
  const { current, daily } = data;
  const today = daily?.[0];
  const u = units === "imperial" ? "°F" : "°C";
  const ws = units === "imperial" ? "mph" : "km/h";

  return (
    <div className="relative">
      <div className="absolute -inset-x-20 -top-24 h-[420px] hero-glow pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className="relative grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center"
      >
        {/* Left: location + temp */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/80 border border-white/10"
          >
            <FiMapPin className="text-cyber-300" />
            <span className="font-medium">{place?.label || place?.name}</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">
              {new Date(current.time).toLocaleString(undefined, {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </motion.div>

          <div className="mt-6 flex items-end gap-4">
            <div className="font-display font-light leading-none glow-text"
              style={{ fontSize: "clamp(96px, 18vw, 220px)" }}
            >
              <AnimatedNumber value={current.temp} decimals={0} />
              <span className="text-white/60 text-[0.35em] align-top ml-2">{u}</span>
            </div>
          </div>

          <div className="-mt-4 text-2xl md:text-3xl font-display text-white/90">
            {current.cond.desc}
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-white/50">Feels like</span>
              <span className="font-medium">{Math.round(current.feels)}{u}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiArrowUp className="text-rose-300" />
              <span>{Math.round(today?.max ?? current.temp)}{u}</span>
              <FiArrowDown className="text-cyber-300 ml-2" />
              <span>{Math.round(today?.min ?? current.temp)}{u}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiWind className="text-white/60" />
              <span>{Math.round(current.wind)} {ws}</span>
            </div>
            <div className="flex items-center gap-2">
              <FiDroplet className="text-cyber-300" />
              <span>{current.humidity}%</span>
            </div>
          </div>
        </div>

        {/* Right: floating icon */}
        <div className="relative h-[320px] md:h-[420px]">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute w-[80%] h-[80%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(147,197,253,0.35) 0%, rgba(96,165,250,0.15) 40%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />
            <WeatherIcon
              main={current.cond.main}
              isDay={current.isDay}
              size={320}
              color="#fff"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
