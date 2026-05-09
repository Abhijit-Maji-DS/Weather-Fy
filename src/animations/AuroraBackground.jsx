import { motion } from "framer-motion";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { c1: "rgba(96,165,250,0.5)", c2: "rgba(147,197,253,0.2)", x: "10%", y: "20%", d: 18 },
        { c1: "rgba(167,139,250,0.45)", c2: "rgba(59,130,246,0.2)", x: "60%", y: "10%", d: 22 },
        { c1: "rgba(34,211,238,0.4)", c2: "rgba(16,185,129,0.15)", x: "30%", y: "60%", d: 26 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className="absolute w-[60vw] h-[60vw] rounded-full"
          style={{
            top: b.y,
            left: b.x,
            background: `radial-gradient(circle, ${b.c1} 0%, ${b.c2} 40%, transparent 70%)`,
            filter: "blur(60px)",
            mixBlendMode: "screen",
          }}
          animate={{
            x: ["-5%", "5%", "-5%"],
            y: ["-5%", "5%", "-5%"],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
