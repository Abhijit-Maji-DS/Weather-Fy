import { motion } from "framer-motion";
import FloatingParticles from "./FloatingParticles";

export default function SunnyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #1e3a8a 0%, #2563eb 35%, #60a5fa 75%, #fde68a 100%)",
        }}
      />

      {/* Sun core */}
      <motion.div
        className="absolute"
        style={{ top: "12%", right: "12%" }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="w-[260px] h-[260px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, #fff7d6 0%, #fcd34d 30%, rgba(252,211,77,0.4) 55%, transparent 70%)",
            filter: "blur(2px)",
            boxShadow: "0 0 120px rgba(253,224,71,0.7), 0 0 240px rgba(253,224,71,0.4)",
          }}
        />
      </motion.div>

      {/* Rotating ray crown */}
      <motion.div
        className="absolute"
        style={{ top: "calc(12% - 60px)", right: "calc(12% - 60px)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <svg width="380" height="380" viewBox="0 0 380 380">
          {Array.from({ length: 16 }).map((_, i) => (
            <rect
              key={i}
              x="188"
              y="20"
              width="4"
              height="60"
              fill="rgba(255,247,214,0.4)"
              transform={`rotate(${(i * 360) / 16} 190 190)`}
              style={{ filter: "blur(3px)" }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Lens flare streaks */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(255,247,214,0.15) 50%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Heatwave shimmer near bottom */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/3"
        animate={{ backgroundPositionY: ["0px", "20px", "0px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "repeating-linear-gradient(180deg, transparent 0 18px, rgba(255,255,255,0.04) 18px 19px)",
          filter: "blur(2px)",
        }}
      />

      <FloatingParticles
        count={50}
        color="rgba(255,236,179,0.55)"
        size={[1, 3]}
        speed={[0.04, 0.18]}
      />
    </div>
  );
}
