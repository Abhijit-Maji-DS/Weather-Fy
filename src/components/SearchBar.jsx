import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiSearch, FiMapPin, FiClock, FiNavigation } from "react-icons/fi";
import { geocodeCity, reverseGeocode } from "../api/weather";
import { useWeatherStore } from "../store/useWeatherStore";

export default function SearchBar({ onSelect }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const recent = useWeatherStore((s) => s.recent);
  const ref = useRef();
  const debRef = useRef();

  useEffect(() => {
    if (debRef.current) clearTimeout(debRef.current);
    if (!q.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    debRef.current = setTimeout(async () => {
      try {
        const r = await geocodeCity(q.trim());
        setResults(r);
        setActive(0);
      } finally {
        setLoading(false);
      }
    }, 280);
    return () => clearTimeout(debRef.current);
  }, [q]);

  useEffect(() => {
    const onClick = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const choose = (r) => {
    onSelect(r);
    setQ("");
    setOpen(false);
    setResults([]);
  };

  const onKey = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(results.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && results[active]) {
      choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const useGeo = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const r = await reverseGeocode(pos.coords.latitude, pos.coords.longitude);
      choose(r);
    });
  };

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <div className="relative group">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyber-500/30 via-cyber-300/20 to-cyber-700/30 opacity-0 group-focus-within:opacity-100 blur-xl transition-opacity" />
        <div className="relative flex items-center gap-3 glass rounded-full px-5 py-3 border border-white/15">
          <FiSearch className="text-white/60 shrink-0" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKey}
            placeholder="Search any city in the world…"
            className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm sm:text-base"
          />
          {loading && (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          )}
          <button
            onClick={useGeo}
            className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white px-2.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition shrink-0"
          >
            <FiNavigation className="rotate-45 shrink-0" />
            <span className="hidden sm:inline">Locate</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-3 glass rounded-3xl border border-white/15 overflow-hidden z-50"
          >
            {results.length > 0 ? (
              <div className="py-2">
                {results.map((r, i) => (
                  <button
                    key={r.label + i}
                    onClick={() => choose(r)}
                    onMouseEnter={() => setActive(i)}
                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition ${
                      i === active ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    <FiMapPin className="text-cyber-300" />
                    <div>
                      <div className="text-sm text-white">{r.name}</div>
                      <div className="text-xs text-white/50">
                        {[r.admin, r.country].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : q.trim() ? (
              <div className="px-5 py-4 text-sm text-white/50">
                {loading ? "Searching…" : "No matches found"}
              </div>
            ) : (
              <div className="py-2">
                <div className="px-5 pt-2 pb-1 text-[11px] uppercase tracking-widest text-white/40">
                  Recent
                </div>
                {recent.map((r) => (
                  <button
                    key={r}
                    onClick={() => onSelect({ label: r, name: r })}
                    className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-white/5 text-left"
                  >
                    <FiClock className="text-white/50" />
                    <span className="text-sm text-white/85">{r}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
