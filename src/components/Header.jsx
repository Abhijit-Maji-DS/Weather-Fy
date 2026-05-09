import { motion } from "framer-motion";
import { FiThermometer } from "react-icons/fi";
import SearchBar from "./SearchBar";
import { useWeatherStore } from "../store/useWeatherStore";
import logo from "../assets/logo.png";

export default function Header({ onSelect }) {
  const { units, toggleUnits } = useWeatherStore();
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative z-30 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 px-5 md:px-8 pt-6 md:pt-8"
    >
      <div className="flex items-center justify-between w-full md:w-auto">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyber-300 to-cyber-700 flex items-center justify-center shadow-neon overflow-hidden">
            {/* Logo */}
            <img
            src={logo} // replace with your logo path
            alt="Logo"
            className="w-10 h-10 rounded-2xl object-cover shadow-neon"
          />
          </div>
          {/* Glow Effect */}
          <div className="absolute -inset-2 rounded-3xl bg-cyber-300/20 blur-xl -z-10" /></div>
          <div>
            <div className="font-display font-semibold tracking-wide text-lg leading-none">
              Weather-Fy
            </div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              Weather OS
            </div>
          </div>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={toggleUnits}
          className="flex md:hidden items-center justify-center gap-2 px-4 py-2.5 rounded-full glass border border-white/15 hover:bg-white/15 transition magnetic shrink-0 w-auto"
          title="Toggle units"
        >
          <FiThermometer className="text-cyber-300" />
          <span className="text-sm font-medium">
            {units === "metric" ? "°C" : "°F"}
          </span>
        </button>
      </div>

      <div className="flex-1 w-full flex justify-center">
        <SearchBar onSelect={onSelect} />
      </div>

      {/* Desktop Toggle Button */}
      <button
        onClick={toggleUnits}
        className="hidden md:flex items-center justify-center gap-2 px-4 py-2.5 rounded-full glass border border-white/15 hover:bg-white/15 transition magnetic shrink-0 w-auto"
        title="Toggle units"
      >
        <FiThermometer className="text-cyber-300" />
        <span className="text-sm font-medium">
          {units === "metric" ? "°C" : "°F"}
        </span>
      </button>
    </motion.header>
  );
}
