import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import WeatherIcon from "./WeatherIcon";

export default function HourlyForecast({ hourly, units }) {
  if (!hourly?.length) return null;
  const u = units === "imperial" ? "°F" : "°C";
  const data = hourly.slice(0, 24).map((h) => ({
    name: new Date(h.time).toLocaleTimeString([], { hour: "2-digit" }),
    temp: Math.round(h.temp),
    pop: h.pop,
    cond: h.cond.main,
  }));

  return (
    <GlassCard className="p-6 md:p-8 w-full" delay={0.1}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm uppercase tracking-[0.25em] text-white/60 font-medium">
          Next 24 Hours
        </h3>
        <span className="text-xs text-white/40">Local time</span>
      </div>

      <div className="h-44 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 0, right: 0, top: 12, bottom: 0 }}>
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="rgba(255,255,255,0.4)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval={3}
            />
            <YAxis hide domain={["dataMin - 2", "dataMax + 2"]} />
            <Tooltip
              contentStyle={{
                background: "rgba(15,23,42,0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
                backdropFilter: "blur(20px)",
              }}
              labelStyle={{ color: "#93C5FD" }}
              itemStyle={{ color: "#fff" }}
              formatter={(v) => [`${v}${u}`, "Temp"]}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#93C5FD"
              strokeWidth={2.5}
              fill="url(#grad)"
              dot={{ r: 2, fill: "#fff" }}
              activeDot={{ r: 5, fill: "#fff", stroke: "#3B82F6", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-1">
        {hourly.slice(0, 24).map((h, i) => (
          <motion.div
            key={h.time}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.025 }}
            className="snap-start shrink-0 w-[88px] md:w-[96px] flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <div className="text-[11px] text-white/60 uppercase tracking-wider">
              {i === 0
                ? "Now"
                : new Date(h.time).toLocaleTimeString([], { hour: "2-digit" })}
            </div>
            <WeatherIcon main={h.cond.main} size={36} animated={false} color="#cfe5ff" />
            <div className="text-base font-semibold">{Math.round(h.temp)}°</div>
            <div className="text-[10px] text-cyber-200/80">💧 {h.pop}%</div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
