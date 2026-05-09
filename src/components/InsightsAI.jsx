import GlassCard from "./GlassCard";
import { motion } from "framer-motion";
import { FiZap, FiUmbrella, FiSun, FiWind, FiAlertTriangle } from "react-icons/fi";

function buildInsights(d, units) {
  if (!d) return [];
  const u = units === "imperial" ? "°F" : "°C";
  const c = d.current;
  const list = [];

  if (c.cond.main === "Rain" || c.cond.main === "Drizzle") {
    list.push({
      icon: <FiUmbrella />,
      title: "Bring an umbrella",
      body: `Expect ${c.cond.desc.toLowerCase()} continuing through the next few hours.`,
      tone: "info",
    });
  }
  if (c.cond.main === "Thunderstorm") {
    list.push({
      icon: <FiAlertTriangle />,
      title: "Stay indoors if possible",
      body: "Active thunderstorm in your area — avoid open spaces and high ground.",
      tone: "warn",
    });
  }
  if (c.uv >= 6) {
    list.push({
      icon: <FiSun />,
      title: "High UV exposure",
      body: `UV index ${c.uv.toFixed(1)}. Wear SPF 30+ and sunglasses if heading out.`,
      tone: "warn",
    });
  }
  if (c.wind > (units === "imperial" ? 20 : 30)) {
    list.push({
      icon: <FiWind />,
      title: "Windy conditions",
      body: "Loose objects may shift. Cyclists and drivers should take care.",
      tone: "info",
    });
  }
  if (c.feels - c.temp >= 4) {
    list.push({
      icon: <FiZap />,
      title: "Feels much warmer",
      body: `Apparent temperature is ${Math.round(c.feels)}${u}, ${Math.round(c.feels - c.temp)}${u} above actual.`,
      tone: "info",
    });
  } else if (c.temp - c.feels >= 4) {
    list.push({
      icon: <FiZap />,
      title: "Feels colder",
      body: `Wind chill makes it feel ${Math.round(c.feels)}${u}. Layer up.`,
      tone: "info",
    });
  }
  const rainSoon = d.hourly?.slice(1, 6).find((h) => h.pop >= 60);
  if (rainSoon) {
    const t = new Date(rainSoon.time).toLocaleTimeString([], { hour: "2-digit" });
    list.push({
      icon: <FiUmbrella />,
      title: "Rain incoming",
      body: `${rainSoon.pop}% chance of precipitation around ${t}.`,
      tone: "info",
    });
  }
  if (list.length === 0) {
    list.push({
      icon: <FiSun />,
      title: "All clear",
      body: "Conditions are pleasant — a great window to head outside.",
      tone: "good",
    });
  }
  return list.slice(0, 4);
}

export default function InsightsAI({ data, units }) {
  const insights = buildInsights(data, units);

  return (
    <GlassCard className="p-6 md:p-8" delay={0.15}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm uppercase tracking-[0.25em] text-white/60 font-medium">
          Weather Insights · AI
        </h3>
        <span className="flex items-center gap-1.5 text-[11px] text-cyber-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyber-300" />
          </span>
          Live
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {insights.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
          >
            <div
              className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                it.tone === "warn"
                  ? "bg-amber-400/15 text-amber-300"
                  : it.tone === "good"
                  ? "bg-emerald-400/15 text-emerald-300"
                  : "bg-cyber-300/15 text-cyber-200"
              }`}
            >
              {it.icon}
            </div>
            <div>
              <div className="text-sm font-medium text-white/95">{it.title}</div>
              <div className="text-xs text-white/60 mt-0.5 leading-relaxed">{it.body}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
