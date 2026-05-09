import { motion } from "framer-motion";

export default function FogBackground({ isNight = false }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: isNight
            ? "linear-gradient(180deg, #1e293b 0%, #334155 100%)"
            : "linear-gradient(180deg, #94a3b8 0%, #cbd5e1 100%)",
        }}
      />
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute h-[40%] w-[180%] -left-[40%]"
          style={{
            top: `${i * 22}%`,
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.35), transparent 70%)",
            filter: "blur(40px)",
          }}
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{
            duration: 30 + i * 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
