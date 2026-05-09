import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloud,
  WiCloudy,
  WiRain,
  WiDayRain,
  WiNightAltRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiSprinkle,
} from "react-icons/wi";
import { motion } from "framer-motion";

export function pickIcon(main, isDay = true) {
  switch (main) {
    case "Clear":
      return isDay ? WiDaySunny : WiNightClear;
    case "Clouds":
      return isDay ? WiDayCloudy : WiNightAltCloudy;
    case "Rain":
      return isDay ? WiDayRain : WiNightAltRain;
    case "Drizzle":
      return WiSprinkle;
    case "Snow":
      return WiSnow;
    case "Thunderstorm":
      return WiThunderstorm;
    case "Fog":
      return WiFog;
    default:
      return WiCloud;
  }
}

export default function WeatherIcon({ main, isDay = true, className = "", size = 64, animated = true, color = "#fff" }) {
  const Icon = pickIcon(main, isDay);
  if (!animated) return <Icon size={size} color={color} className={className} />;
  return (
    <motion.div
      animate={{ y: [0, -6, 0], rotate: main === "Clear" && isDay ? [0, 6, 0] : [0, 0, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className={className}
      style={{ filter: "drop-shadow(0 8px 30px rgba(147,197,253,0.4))" }}
    >
      <Icon size={size} color={color} />
    </motion.div>
  );
}
