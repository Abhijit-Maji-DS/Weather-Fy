/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          950: "#0F172A",
          900: "#1E3A8A",
          700: "#2563EB",
          500: "#3B82F6",
          300: "#60A5FA",
          200: "#93C5FD",
        },
        glass: "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Space Grotesk'", "Inter", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      borderRadius: {
        "4xl": "32px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.37)",
        neon: "0 0 40px rgba(96,165,250,0.45)",
        "neon-strong": "0 0 80px rgba(96,165,250,0.6), 0 0 30px rgba(147,197,253,0.4)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.15)",
      },
      backgroundImage: {
        "cyber-gradient":
          "linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #2563EB 100%)",
        "aurora":
          "linear-gradient(120deg, rgba(96,165,250,0.4), rgba(147,197,253,0.2), rgba(59,130,246,0.3), rgba(30,58,138,0.4))",
        "mesh-1":
          "radial-gradient(at 20% 20%, rgba(96,165,250,0.35) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(59,130,246,0.3) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(30,58,138,0.4) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(37,99,235,0.3) 0px, transparent 50%)",
        "noise":
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.04)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
        aurora: {
          "0%, 100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(30px,-30px) scale(1.1)" },
          "66%": { transform: "translate(-20px,20px) scale(0.95)" },
        },
        "rain-fall": {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(120vh)" },
        },
        "snow-fall": {
          "0%": { transform: "translateY(-10%) translateX(0)" },
          "50%": { transform: "translateY(50vh) translateX(20px)" },
          "100%": { transform: "translateY(110vh) translateX(-10px)" },
        },
        "lightning-flash": {
          "0%, 100%": { opacity: "0" },
          "10%": { opacity: "1" },
          "12%": { opacity: "0.4" },
          "14%": { opacity: "0.9" },
          "20%": { opacity: "0" },
        },
        "cloud-drift": {
          "0%": { transform: "translateX(-20%)" },
          "100%": { transform: "translateX(120%)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(96,165,250,0.4)" },
          "50%": { boxShadow: "0 0 60px rgba(96,165,250,0.8)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.4)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        breathe: "breathe 4s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        aurora: "aurora 18s ease-in-out infinite",
        "lightning-flash": "lightning-flash 8s ease-in-out infinite",
        "cloud-drift": "cloud-drift 60s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
    },
  },
  plugins: [],
};
