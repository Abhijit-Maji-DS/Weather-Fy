import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return (
    <motion.div
      className="pointer-events-none fixed z-[5] hidden md:block"
      animate={{ x: pos.x - 200, y: pos.y - 200 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.4 }}
    >
      <div
        className="w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(147,197,253,0.18), rgba(96,165,250,0.06) 40%, transparent 70%)",
          filter: "blur(20px)",
          mixBlendMode: "screen",
        }}
      />
    </motion.div>
  );
}
