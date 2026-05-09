import { AnimatePresence, motion } from "framer-motion";
import RainBackground from "./RainBackground";
import ThunderBackground from "./ThunderBackground";
import SunnyBackground from "./SunnyBackground";
import SnowBackground from "./SnowBackground";
import NightSky from "./NightSky";
import CloudyBackground from "./CloudyBackground";
import FogBackground from "./FogBackground";

export default function WeatherBackgroundManager({ condition, isDay = true }) {
  const key = `${condition}-${isDay}`;

  const render = () => {
    switch (condition) {
      case "Thunderstorm":
        return <ThunderBackground />;
      case "Rain":
      case "Drizzle":
        return <RainBackground heavy={condition === "Rain"} />;
      case "Snow":
        return <SnowBackground />;
      case "Fog":
        return <FogBackground isNight={!isDay} />;
      case "Clouds":
        return <CloudyBackground isNight={!isDay} />;
      case "Clear":
        return isDay ? <SunnyBackground /> : <NightSky />;
      default:
        return isDay ? <SunnyBackground /> : <NightSky />;
    }
  };

  return (
    <div className="fixed inset-0 -z-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {render()}
        </motion.div>
      </AnimatePresence>
      {/* Global vignette + noise */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 120%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
