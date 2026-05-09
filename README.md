# Weather-Fy · Weather OS

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

## 🚀 Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

```bash
npm run build      # production build
npm run preview    # preview the build
```

## 🧩 Stack

| Layer | Library |
|---|---|
| Framework | React 19 + Vite |
| Styling | Tailwind CSS 3 (custom keyframes, gradients, shadows) |
| Motion | Framer Motion + CSS keyframes + Canvas particle systems |
| State | Zustand |
| Data | TanStack React Query + Axios |
| Charts | Recharts |
| Icons | React Icons (Feather + Weather Icons) |
| API | Open-Meteo (forecast + AQI + geocoding) |

## 🗂️ Architecture

```
src/
├── animations/
│   ├── WeatherBackgroundManager.jsx   ← orchestrator with smooth transitions
│   ├── RainBackground.jsx             ← canvas droplets + parallax + wet glass
│   ├── ThunderBackground.jsx          ← rain + lightning flashes
│   ├── SunnyBackground.jsx            ← sun core + ray crown + lens flare + heatwave
│   ├── SnowBackground.jsx             ← canvas snowflakes with depth
│   ├── NightSky.jsx                   ← stars + shooting stars + moon + aurora
│   ├── AuroraBackground.jsx           ← animated mesh gradients
│   ├── CloudyBackground.jsx           ← drifting clouds + ambient particles
│   ├── FogBackground.jsx              ← layered drifting fog
│   ├── CloudLayer.jsx                 ← reusable parallax cloud system
│   ├── LightningEffect.jsx            ← random flash + SVG bolt
│   └── FloatingParticles.jsx          ← canvas particle engine
├── api/weather.js                     ← Open-Meteo wrapper, WMO → condition mapping
├── components/
│   ├── Header.jsx                     ← logo + search + unit toggle
│   ├── SearchBar.jsx                  ← debounced + keyboard nav + geo
│   ├── HeroWeather.jsx                ← animated hero with glow halo
│   ├── HourlyForecast.jsx             ← Recharts area + snap cards
│   ├── DailyForecast.jsx              ← 7-day rows w/ range bars + accordion
│   ├── AQIRing.jsx                    ← animated circular gauge
│   ├── SunArc.jsx                     ← real-time SVG sun path
│   ├── StatGrid.jsx                   ← 8 metric tiles, staggered entrance
│   ├── InsightsAI.jsx                 ← contextual rule-based AI tips
│   ├── GlassCard.jsx                  ← reusable 3D-tilt glass shell
│   ├── WeatherIcon.jsx                ← animated weather icons
│   ├── AnimatedNumber.jsx             ← Framer Motion number counter
│   ├── CursorGlow.jsx                 ← spring-tracked cursor halo
│   └── LoadingScreen.jsx              ← orbital loader
├── store/useWeatherStore.js           ← Zustand: city, units, recents
├── App.jsx                            ← composition + React Query
├── main.jsx                           ← QueryClient provider
└── index.css                          ← Tailwind + custom utilities
```

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
