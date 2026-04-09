import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MapPin, Navigation } from 'lucide-react';
import { searchCities } from '../services/weatherApi.js';
import { useWeather } from '../context/WeatherContext.jsx';

export default function SearchBar() {
  const { searchCity, detectLocation } = useWeather();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(undefined);

  const handleSearch = useCallback(async (q) => {
    if (q.length < 2) { setSuggestions([]); return; }
    try {
      const results = await searchCities(q);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } catch {
      setSuggestions([]);
    }
  }, []);

  const handleInputChange = (value) => {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => handleSearch(value), 300);
  };

  const handleSelect = (name) => {
    setQuery('');
    setShowSuggestions(false);
    searchCity(name);
    inputRef.current?.blur();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      searchCity(query.trim());
      setQuery('');
      setShowSuggestions(false);
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          animate={{
            boxShadow: focused
              ? '0 8px 40px rgba(0,0,0,0.2)'
              : '0 2px 16px rgba(0,0,0,0.1)',
          }}
          transition={{ duration: 0.3 }}
          className="relative flex items-center overflow-hidden glass-card-strong"
          style={{ borderRadius: 16 }}
        >
          <Search className="absolute left-4 w-[18px] h-[18px] text-white/50" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => { setFocused(true); if (suggestions.length) setShowSuggestions(true); }}
            placeholder="Search city..."
            aria-label="Search for a city"
            autoComplete="off"
            className="w-full py-3 pl-11 pr-24 bg-transparent text-white
              placeholder:text-white/40 text-[15px] font-light tracking-wide
              outline-none"
          />
          <div className="absolute right-2 flex items-center gap-0.5">
            {query && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                type="button"
                onClick={handleClear}
                className="p-1.5 rounded-full hover:bg-white/10 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-white/50" />
              </motion.button>
            )}
            <button
              type="button"
              onClick={detectLocation}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Detect my location"
            >
              <Navigation className="w-4 h-4 text-white/50" />
            </button>
          </div>
        </motion.div>
      </form>

      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 overflow-hidden glass-card-strong z-50"
            role="listbox"
          >
            {suggestions.map((s, i) => (
              <motion.li
                key={`${s.name}-${s.country}-${i}`}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <button
                  onClick={() => handleSelect(s.name)}
                  className="w-full px-4 py-3 text-left flex items-center gap-3
                    hover:bg-white/10 transition-colors
                    text-white/90 text-sm font-light"
                  role="option"
                >
                  <MapPin className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
                  <span>{s.name}</span>
                  <span className="text-white/30 text-xs ml-auto">{s.country}</span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
