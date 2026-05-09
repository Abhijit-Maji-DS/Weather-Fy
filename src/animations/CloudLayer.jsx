import { motion } from "framer-motion";

const Cloud = ({ delay = 0, top = "20%", scale = 1, opacity = 0.4, dur = 80 }) => (
  <motion.div
    className="absolute"
    style={{ top, left: "-30%" }}
    initial={{ x: 0 }}
    animate={{ x: "150vw" }}
    transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
  >
    <svg
      width={420 * scale}
      height={180 * scale}
      viewBox="0 0 420 180"
      style={{ opacity, filter: "blur(2px)" }}
    >
      <defs>
        <radialGradient id={`cg${delay}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="100" rx="110" ry="55" fill={`url(#cg${delay})`} />
      <ellipse cx="220" cy="80" rx="120" ry="60" fill={`url(#cg${delay})`} />
      <ellipse cx="310" cy="105" rx="95" ry="48" fill={`url(#cg${delay})`} />
    </svg>
  </motion.div>
);

export default function CloudLayer({ density = 5, opacity = 0.4 }) {
  const items = Array.from({ length: density }).map((_, i) => ({
    delay: -Math.random() * 40,
    top: `${5 + Math.random() * 60}%`,
    scale: 0.7 + Math.random() * 1.2,
    opacity: opacity * (0.6 + Math.random() * 0.6),
    dur: 70 + Math.random() * 60,
    key: i,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((c) => (
        <Cloud key={c.key} {...c} />
      ))}
    </div>
  );
}
