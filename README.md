# Weather-Fy · Weather OS  ---  https://weather-fy-os.vercel.app/

A **next-generation, cinematic, fully animated weather dashboard** built with React + Vite + Tailwind + Framer Motion. Apple Weather × Tesla UI × Linear aesthetic with frosted glassmorphism, dynamic weather backgrounds, and immersive motion design.

## ✨ Features

- 🌧️ **6 cinematic animated backgrounds** — Rain, Thunderstorm, Sunny, Snow, Night Sky (aurora + shooting stars + moon), Cloudy/Fog. Smooth crossfades between weather states.
- 🪟 **Premium glassmorphism UI** — backdrop blur, layered transparency, mouse-follow glow, 3D card tilt, shimmer reflections, neon accents, animated mesh gradients.
- 📍 **Auto location detection** with browser Geolocation + reverse geocoding fallback.
- 🔍 **Smart search** with debounced suggestions, recent searches, keyboard navigation (↑ ↓ Enter Esc).
- 🌡️ **Hero panel** with animated temperature counter, floating weather icon, glow halo, dynamic status.
- ⏱️ **24-hour forecast** with Recharts area chart and horizontally scrollable, snapping cards.
- 📅 **7-day forecast** with animated min/max range bars and expandable details.
- 🌫️ **AQI dashboard** with animated progress ring, US AQI gradient, PM2.5 / PM10 / O₃ / NO₂ breakdown.
- ☀️ **Sun-arc visualization** — animated SVG path tracking real-time sun position between sunrise/sunset.
- 🤖 **AI Weather Insights** — dynamic contextual recommendations (rain incoming, UV warnings, wind chill…).
- 🎯 **Cursor glow**, magnetic buttons, breathing animations, ambient particles.
- 📱 **Fully responsive** — mobile, tablet, ultra-wide desktop. Touch-friendly snap scrolling.
- 🌐 **No API key required** — uses the free [Open-Meteo](https://open-meteo.com) API for weather + AQI + geocoding.


## 🎨 Design system

- **Primary**: `#0F172A`, `#1E3A8A`, `#2563EB`, `#3B82F6`
- **Accent**: `#60A5FA`, `#93C5FD`, `rgba(255,255,255,0.12)`
- **Radius**: `rounded-[32px]` everywhere
- **Glass**: `bg-white/[0.06] backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.37)]`
- **Typography**: Space Grotesk (display) + Inter (body)
- **Custom Tailwind**: `float`, `breathe`, `shimmer`, `aurora`, `lightning-flash`, `cloud-drift`, `pulse-glow`, `twinkle`, `gradient-x` keyframes; `mesh-1`, `aurora`, `noise` background images; `neon`, `neon-strong`, `glass`, `inner-glow` shadows.

## ⚡ Performance notes

- All particle systems use `requestAnimationFrame` + DPR-aware canvas sizing.
- Heavy animations are GPU-accelerated via `transform` / `opacity` only.
- Components memoize expensive arrays (stars, shooting stars).
- React Query caches weather for 5 minutes; background re-fetches are silent.
- Backgrounds crossfade with `AnimatePresence` so unmounted scenes stop their RAF loops.

## 🔁 Swap to OpenWeatherMap (optional)

The default uses Open-Meteo so it works out-of-the-box with **zero API key**. To switch to OpenWeatherMap, replace the contents of `src/api/weather.js` with their endpoints — the rest of the app consumes a unified shape (`current`, `hourly`, `daily`, `aqi`) so only that one file needs to change.

---

Built as a Dribbble-grade, award-winning, immersive Weather OS. Enjoy the atmosphere. 🌌
