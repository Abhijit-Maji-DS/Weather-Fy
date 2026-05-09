import { motion } from "framer-motion";
import { useMemo } from "react";
import AuroraBackground from "./AuroraBackground";

export default function NightSky() {
  const stars = useMemo(
    () =>
      Array.from({ length: 140 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.6 + 0.3,
        d: Math.random() * 4 + 2,
        o: 0.3 + Math.random() * 0.7,
      })),
    []
  );

  const shooting = useMemo(
    () =>
      Array.from({ length: 3 }).map((_, i) => ({
        delay: i * 6 + Math.random() * 4,
        top: `${10 + Math.random() * 40}%`,
        left: `${Math.random() * 60}%`,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 10%, #1e1b4b 0%, #0b1226 40%, #03050d 100%)",
        }}
      />

      <AuroraBackground />

      {/* Stars */}
      <svg className="absolute inset-0 w-full h-full">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="#fff"
            opacity={s.o}
          >
            <animate
              attributeName="opacity"
              values={`${s.o};${s.o * 0.2};${s.o}`}
              dur={`${s.d}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>

      {/* Shooting stars */}
      {shooting.map((s, i) => (
        <motion.div
          key={i}
          className="absolute w-[140px] h-[2px]"
          style={{
            top: s.top,
            left: s.left,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.95))",
            boxShadow: "0 0 8px rgba(255,255,255,0.8)",
            transform: "rotate(20deg)",
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: [0, 1, 0], x: [0, 240, 320] }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            repeatDelay: 9 + Math.random() * 8,
            delay: s.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Moon */}
      <motion.div
        className="absolute"
        style={{ top: "10%", right: "10%" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-[160px] h-[160px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #f5f3ff 0%, #cbd5e1 60%, #64748b 100%)",
            boxShadow:
              "0 0 80px rgba(203,213,225,0.5), 0 0 160px rgba(147,197,253,0.3)",
          }}
        />
      </motion.div>
    </div>
  );
}
