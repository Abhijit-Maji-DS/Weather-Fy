import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import WeatherBackgroundManager from "./animations/WeatherBackgroundManager";
import CursorGlow from "./components/CursorGlow";
import Header from "./components/Header";
import HeroWeather from "./components/HeroWeather";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import AQIRing from "./components/AQIRing";
import SunArc from "./components/SunArc";
import StatGrid from "./components/StatGrid";
import InsightsAI from "./components/InsightsAI";
import LoadingScreen from "./components/LoadingScreen";

import { fetchWeather, geocodeCity, reverseGeocode } from "./api/weather";
import { useWeatherStore } from "./store/useWeatherStore";

export default function App() {
  const { units, setCity } = useWeatherStore();
  const [place, setPlace] = useState(null);

  // Initial: try geolocation, fallback to a default city
  useEffect(() => {
    let mounted = true;
    const fallback = async () => {
      const r = await geocodeCity("San Francisco");
      if (mounted && r[0]) setPlace(r[0]);
    };
    if (!navigator.geolocation) {
      fallback();
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const r = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
          if (mounted) setPlace(r);
        } catch {
          fallback();
        }
      },
      () => fallback(),
      { timeout: 5000 }
    );
    return () => {
      mounted = false;
    };
  }, []);

  const handleSelect = async (sel) => {
    let p = sel;
    if (!p.lat || !p.lon) {
      const r = await geocodeCity(sel.name || sel.label);
      if (r[0]) p = r[0];
    }
    setPlace(p);
    setCity(p.label || p.name);
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["weather", place?.lat, place?.lon, units],
    queryFn: () => fetchWeather({ lat: place.lat, lon: place.lon, units }),
    enabled: !!place?.lat && !!place?.lon,
  });

  const condition = data?.current?.cond?.main || "Clear";
  const isDay = data?.current?.isDay ?? true;

  const themeKey = useMemo(() => `${condition}-${isDay}`, [condition, isDay]);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden">
      <WeatherBackgroundManager condition={condition} isDay={isDay} />
      <CursorGlow />

      <Header onSelect={handleSelect} />

      <main className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-8 pt-6 md:pt-12 pb-20">
        {!data || isLoading ? (
          <LoadingScreen
            message={place ? "Loading atmospheric data…" : "Locating…"}
          />
        ) : (
          <motion.div
            key={themeKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 md:space-y-8"
          >
            {/* HERO */}
            <HeroWeather data={data} place={place} units={units} />

            {/* STATS */}
            <StatGrid current={data.current} units={units} />

            {/* MIDDLE GRID */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <HourlyForecast hourly={data.hourly} units={units} />
              </div>
              <AQIRing aqi={data.aqi} />
            </div>

            {/* LOWER GRID */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              <div className="lg:col-span-2">
                <DailyForecast daily={data.daily} units={units} />
              </div>
              <SunArc current={data.current} />
            </div>

            {/* INSIGHTS */}
            <InsightsAI data={data} units={units} />

            <footer className="pt-6 text-center text-xs text-white/40">
              Weather-Fy · Weather OS · Abhijit · Cinematic UI For Gen-z
              {isFetching && " · refreshing…"}
            </footer>
          </motion.div>
        )}
      </main>
    </div>
  );
}
